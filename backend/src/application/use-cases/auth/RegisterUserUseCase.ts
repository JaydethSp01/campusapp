import { UserRepository } from "../../../ports/repositories/UserRepository";
import { AuthService } from "../../../ports/services/AuthService";
import { CreateUserRequest, AuthResponse } from "../../../domain/entities/User";

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(userData: CreateUserRequest): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    return await this.authService.register(userData);
  }
}

