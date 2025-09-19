export interface FileService {
  uploadFile(file: Buffer, filename: string, mimetype: string): Promise<string>;
  deleteFile(filepath: string): Promise<boolean>;
  getFileUrl(filepath: string): string;
  validateFile(file: Buffer, mimetype: string): boolean;
}

