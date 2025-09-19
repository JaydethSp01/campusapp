import { AuthService } from "../../ports/services/AuthService";
import { UserRepository } from "../../ports/repositories/UserRepository";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  AuthResponse,
} from "../../domain/entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthServiceImpl implements AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: CreateUserRequest): Promise<AuthResponse> {
    // const { password, ...userInfo } = userData;
    const user = await this.userRepository.create(userData);

    // Obtener los roles del usuario
    const roles = await this.userRepository.getUserRoles(user.id);
    const userWithRoles = { ...user, roles };

    const accessToken = this.generateAccessToken(userWithRoles);
    const refreshToken = this.generateRefreshToken(userWithRoles);

    return {
      user: this.sanitizeUser(userWithRoles),
      accessToken,
      refreshToken,
    };
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new Error("Credenciales inválidas");
    }

    if (!user.activo) {
      throw new Error("Usuario inactivo");
    }

    // Obtener los roles del usuario
    const roles = await this.userRepository.getUserRoles(user.id);
    const userWithRoles = { ...user, roles };

    const accessToken = this.generateAccessToken(userWithRoles);
    const refreshToken = this.generateRefreshToken(userWithRoles);

    return {
      user: this.sanitizeUser(userWithRoles),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as { userId: string };
      const user = await this.userRepository.findById(decoded.userId);

      if (!user || !user.activo) {
        throw new Error("Token inválido");
      }

      // Obtener los roles del usuario
      const roles = await this.userRepository.getUserRoles(user.id);
      const userWithRoles = { ...user, roles };

      const newAccessToken = this.generateAccessToken(userWithRoles);
      const newRefreshToken = this.generateRefreshToken(userWithRoles);

      return {
        user: this.sanitizeUser(userWithRoles),
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error("Token inválido");
    }
  }

  async logout(_userId: string): Promise<void> {
    // En una implementación más robusta, aquí se invalidarían los tokens
    // Por simplicidad, solo retornamos void
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await this.userRepository.findById(decoded.userId);

      if (!user || !user.activo) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new Error("Contraseña actual incorrecta");
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_ROUNDS || "12")
    );

    const updatedUser = await this.userRepository.update(userId, {
      password: newPasswordHash,
    } as UpdateUserRequest);
    return updatedUser !== null;
  }

  async resetPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return;
    }

    // En una implementación real, aquí se enviaría un email con un token de reset
    // Por simplicidad, solo retornamos void
  }

  async verifyEmail(_token: string): Promise<boolean> {
    // En una implementación real, aquí se verificaría el token de email
    // Por simplicidad, retornamos true
    return true;
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } as jwt.SignOptions
    );
  }

  private generateRefreshToken(user: User): string {
    return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    } as jwt.SignOptions);
  }

  private sanitizeUser(user: User): Omit<User, "passwordHash"> {
    const { passwordHash, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}

