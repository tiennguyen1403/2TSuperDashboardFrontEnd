import React from "react";
import { SignUpDto } from "./SignUp.type";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuth";
import { Button, Checkbox, Divider, Flex, Form, FormProps, Input, notification } from "antd";
import Logo from "../../components/Logo";
import { Facebook, Google, Twitch } from "iconsax-react";

const initialValues: SignUpDto = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  isAgreeTermAndCondition: false,
};

const validateMessages = {
  required: "${label} is required!", // eslint-disable-line
};

const passwordRegEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, loading, error }: any = useAuthStore();

  const onSuccess = () => navigate("/");

  const onFailure = () => notification.error({ message: error });

  const onSignUp: FormProps<SignUpDto>["onFinish"] = (signUpDto) => {
    signUp(signUpDto).then(onSuccess).catch(onFailure);
  };

  const validatePassword = () => ({
    validator: (_: any, value: string) => {
      return value.match(passwordRegEx)
        ? Promise.resolve()
        : Promise.reject("Password is invalid!");
    },
  });

  const validateConfirmPassword = ({ getFieldValue }: any) => ({
    validator: (_: any, value: string) => {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The new password that you entered do not match!"));
    },
  });

  return (
    <div className="sign-up">
      <div className="sign-up-card">
        <Logo />
        <Flex vertical gap="small" style={{ width: "100%" }}>
          <Button block shape="round">
            <Flex align="center" justify="center" gap="small">
              <Facebook size={22} variant="Bold" color="#1877F2" />
              <span>Sign In With Facebook</span>
            </Flex>
          </Button>
          <Button block shape="round">
            <Flex align="center" justify="center" gap="small">
              <Twitch size={22} color="#6441a5" variant="Bold" />
              <span>Sign In With Twitch</span>
            </Flex>
          </Button>
          <Button block shape="round">
            <Flex align="center" justify="center" gap="small">
              <Google size={22} color="#EA4335" variant="Bold" />
              <span>Sign In With Google</span>
            </Flex>
          </Button>
        </Flex>
        <Divider>OR</Divider>
        <p className="sign-up-header">Sign up with your email</p>
        <Form
          variant="filled"
          layout="vertical"
          autoComplete="off"
          onFinish={onSignUp}
          className="sign-up-form"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Form.Item<SignUpDto>
            rules={[{ required: true }]}
            label="Full name"
            name="fullName"
            hasFeedback
          >
            <Input size="large" placeholder="Full name ..." />
          </Form.Item>
          <Form.Item<SignUpDto>
            rules={[{ required: true }]}
            label="Email Address"
            name="email"
            hasFeedback
          >
            <Input size="large" placeholder="Email Address ..." />
          </Form.Item>
          <Form.Item<SignUpDto>
            rules={[{ required: true }]}
            label="Username"
            name="username"
            hasFeedback
          >
            <Input size="large" placeholder="Username ..." />
          </Form.Item>
          <Form.Item<SignUpDto>
            rules={[{ required: true }, validatePassword]}
            label="Password"
            name="password"
            hasFeedback
            extra={
              <Flex vertical>
                <span>Password must contain 1 number (0-9)</span>
                <span>Password must contain 1 uppercase letters</span>
                <span>Password must contain 1 lowercase letters</span>
                <span>Password must contain 1 non-alpha numeric number</span>
                <span>Password is 8-16 characters with no space</span>
              </Flex>
            }
          >
            <Input.Password size="large" placeholder="Password ..." />
          </Form.Item>
          <Form.Item<SignUpDto>
            rules={[{ required: true }, validateConfirmPassword]}
            label="Confirm Password"
            name="confirmPassword"
            hasFeedback
          >
            <Input.Password size="large" placeholder="Confirm Password ..." />
          </Form.Item>
          <Form.Item<SignUpDto> name="isAgreeTermAndCondition" noStyle valuePropName="checked">
            <Checkbox>I agree to all the Terms & Condition</Checkbox>
          </Form.Item>
          <Button
            block
            size="large"
            shape="round"
            type="primary"
            htmlType="submit"
            loading={loading}
            className="sign-up-button"
          >
            Sign up
          </Button>
        </Form>
        <Flex className="sign-up-footer" align="center" justify="space-between">
          <span>Already have an Account?</span>
          <Link to="/sign-in">
            <Button type="link" className="sign-in-button">
              Login here
            </Button>
          </Link>
        </Flex>
      </div>
    </div>
  );
};

export default SignUp;
