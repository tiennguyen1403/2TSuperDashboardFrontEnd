import { UserDto } from "./User.type";

export const initialValues: UserDto = {
  id: undefined,
  fullName: "",
  email: "",
  username: "",
  password: undefined,
  confirmPassword: undefined,
  avatar: "",
  isActive: true,
};
