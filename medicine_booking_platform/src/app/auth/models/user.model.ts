export interface User {
  id?: string;
  email: string;
  password?: string;
  fullName: string;
  phoneNumber: string;
  role: 'user' | 'store' | 'admin';
  createdAt?: Date;
  profileImage?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'user' | 'store' | 'admin';
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}