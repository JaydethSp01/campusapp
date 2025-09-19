import { FileService } from "../../ports/services/FileService";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export class FileServiceImpl implements FileService {
  private uploadPath: string;

  constructor() {
    this.uploadPath = process.env.UPLOAD_PATH || "./uploads";
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory(): Promise<void> {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(
    file: Buffer,
    filename: string,
    mimetype: string
  ): Promise<string> {
    if (!this.validateFile(file, mimetype)) {
      throw new Error("Tipo de archivo no válido");
    }

    const fileExtension = path.extname(filename);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filepath = path.join(this.uploadPath, uniqueFilename);

    await fs.writeFile(filepath, file);

    return uniqueFilename;
  }

  async deleteFile(filepath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.uploadPath, filepath);
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFileUrl(filepath: string): string {
    return `${
      process.env.BASE_URL || "http://localhost:3000"
    }/uploads/${filepath}`;
  }

  validateFile(file: Buffer, mimetype: string): boolean {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || "5242880"); // 5MB

    if (!allowedTypes.includes(mimetype)) {
      return false;
    }

    if (file.length > maxSize) {
      return false;
    }

    return true;
  }
}

