import {
  User,
  UserRole,
  Role,
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
} from "../../domain/entities/User";

export interface UserRepository {
  create(userData: CreateUserRequest): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, userData: UpdateUserRequest): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  assignRoles(userId: string, roleIds: number[]): Promise<void>;
  getUserRoles(userId: string): Promise<Role[]>;
  getAll(): Promise<User[]>;
  getByRole(roleId: number): Promise<User[]>;
}


