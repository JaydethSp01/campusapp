import { AuthService } from "../../../ports/services/AuthService";
import { LoginRequest, AuthResponse } from "../../../domain/entities/User";

export class LoginUserUseCase {
  constructor(private authService: AuthService) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(credentials);
  }
}

