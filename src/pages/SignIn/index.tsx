import React from "react";
import Logo from "../../components/Logo";
import { Button, Checkbox, Divider, Flex, Form, FormProps, Input, notification } from "antd";
import { Facebook, Google, Twitch } from "iconsax-react";
import { SignInDto } from "./SignIn.type";
import useAuthStore from "../../store/useAuth";
import { Link, useNavigate } from "react-router-dom";

const initialValues: SignInDto = {
  username: "",
  password: "",
  rememberMe: true,
};

const validateMessages = {
  required: "${label} is required!", // eslint-disable-line
};

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, loading, error }: any = useAuthStore();

  const onSuccess = () => navigate("/");

  const onFailure = () => notification.error({ message: error });

  const onSignIn: FormProps<SignInDto>["onFinish"] = (signInDto) => {
    signIn(signInDto).then(onSuccess).catch(onFailure);
  };

  return (
    <div className="sign-in">
      <div className="sign-in-card">
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
        <p className="sign-in-header">Sign In with your email</p>
        <Form
          variant="filled"
          layout="vertical"
          autoComplete="off"
          onFinish={onSignIn}
          className="sign-in-form"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Form.Item<SignInDto>
            rules={[{ required: true }]}
            label="Username"
            name="username"
            hasFeedback
          >
            <Input size="large" placeholder="Username ..." />
          </Form.Item>
          <Form.Item<SignInDto>
            rules={[{ required: true }]}
            label="Password"
            name="password"
            hasFeedback
          >
            <Input.Password size="large" placeholder="Password ..." />
          </Form.Item>
          <Flex align="center" justify="space-between">
            <Form.Item<SignInDto> name="rememberMe" noStyle valuePropName="checked">
              <Checkbox>Keep me sign in</Checkbox>
            </Form.Item>
            <Button type="link" className="forgot-password-button">
              Forgot Password?
            </Button>
          </Flex>
          <Button
            block
            size="large"
            shape="round"
            type="primary"
            htmlType="submit"
            loading={loading}
            className="sign-in-button"
          >
            Sign In
          </Button>
        </Form>
        <Flex className="sign-in-footer" align="center" justify="space-between">
          <span>Don't have an Account?</span>
          <Link to="/sign-up">
            <Button type="link" className="create-account-button">
              Create Account
            </Button>
          </Link>
        </Flex>
      </div>
    </div>
  );
};

export default SignIn;
