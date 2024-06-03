export interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserDto {
  id?: string;
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
  isActive?: boolean;
  avatar?: string;
}
