export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
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
  password?: string;
  confirmPassword?: string;
  isActive?: boolean;
  avatar?: any;
}
