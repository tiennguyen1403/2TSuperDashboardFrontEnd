import { Form, FormProps, Input, Modal, ModalProps, Switch } from "antd";
import React from "react";
import { initialValues } from "../constants";
import { UserDto } from "../User.type";
import { passwordRegEx, validateMessages } from "src/helpers/constants";
import { RuleRender } from "antd/es/form";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (userDto: UserDto) => void;
  okText?: string;
  title?: string;
};

const CommonModal: React.FC<Props> = (props) => {
  const { open, okText, title, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  const validatePassword: RuleRender = () => ({
    validator: (_, value) => {
      if (!value || value.match(passwordRegEx)) return Promise.resolve();
      return Promise.reject(new Error("Password is not valid!"));
    },
  });

  const validateConfirmPassword: RuleRender = ({ getFieldValue }) => ({
    validator: (_, value) => {
      if (!value || getFieldValue("password") === value) return Promise.resolve();
      return Promise.reject(new Error("The new password that you entered do not match!"));
    },
  });

  const handleSubmit = (values: UserDto) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const formProps: FormProps = {
    form: form,
    initialValues,
    validateMessages,
    variant: "filled",
    layout: "vertical",
    autoComplete: "off",
    onFinish: handleSubmit,
  };

  const modalProps: ModalProps = {
    open,
    title,
    okText,
    onOk: form.submit,
    onCancel: handleCancel,
  };

  return (
    <Modal {...modalProps}>
      <Form {...formProps}>
        <Form.Item<UserDto>
          label="Full Name"
          name="fullName"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder="Enter Full Name ..." />
        </Form.Item>
        <Form.Item<UserDto>
          label="Username"
          name="username"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder="Enter Username ..." />
        </Form.Item>
        <Form.Item<UserDto>
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
          hasFeedback
        >
          <Input placeholder="Enter Email ..." />
        </Form.Item>
        <Form.Item<UserDto>
          label="Password"
          name="password"
          rules={[{ required: true }, validatePassword]}
          hasFeedback
          extra={
            <span>
              Password is 8-16 characters with no space and must contain at least 1 number, 1
              uppercase letters, 1 lowercase letters, 1 non-alpha numeric number.
            </span>
          }
        >
          <Input.Password placeholder="Enter Password ..." />
        </Form.Item>
        <Form.Item<UserDto>
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true }, validateConfirmPassword]}
          hasFeedback
        >
          <Input.Password placeholder="Retype Password ..." />
        </Form.Item>
        <Form.Item<UserDto> label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommonModal;
