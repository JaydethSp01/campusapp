import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  AuthResponse,
} from "../../domain/entities/User";

export interface AuthService {
  register(userData: CreateUserRequest): Promise<AuthResponse>;
  login(credentials: LoginRequest): Promise<AuthResponse>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
  logout(userId: string): Promise<void>;
  validateToken(token: string): Promise<User | null>;
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean>;
  resetPassword(email: string): Promise<void>;
  verifyEmail(token: string): Promise<boolean>;
}

