export interface User {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  roles?: Role[];
}

export interface UserRole {
  usuarioId: string;
  rolId: number;
}

export interface Role {
  id: number;
  nombre: string;
}

export interface CreateUserRequest {
  nombre: string;
  email: string;
  password: string;
  roles: number[];
}

export interface UpdateUserRequest {
  nombre?: string;
  email?: string;
  activo?: boolean;
  roles?: number[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "passwordHash">;
  accessToken: string;
  refreshToken: string;
}

