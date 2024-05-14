export interface SignUpDto {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  isAgreeTermAndCondition: boolean;
}
