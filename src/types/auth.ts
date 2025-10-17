export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  new_password: string;
}
