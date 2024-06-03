import { Form, FormProps, Input, Modal, ModalProps, Switch } from "antd";
import React from "react";
import { ModalType, UserDto } from "../User.type";
import { passwordRegEx, validateMessages } from "src/helpers/constants";
import { RuleRender } from "antd/es/form";

const { Create } = ModalType;

type Props = {
  open: boolean;
  title?: string;
  okText?: string;
  loading: boolean;
  userDto: UserDto;
  modalType: ModalType;
  onCancel: () => void;
  onSubmit: (userDto: UserDto) => void;
};

const CommonModal: React.FC<Props> = (props) => {
  const { open, okText, title, onSubmit, onCancel, userDto, loading, modalType } = props;
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

  const formProps: FormProps = {
    form: form,
    validateMessages,
    variant: "filled",
    layout: "vertical",
    autoComplete: "off",
    onFinish: onSubmit,
    initialValues: userDto,
  };

  const modalProps: ModalProps = {
    open,
    title,
    okText,
    onCancel,
    onOk: form.submit,
    confirmLoading: loading,
    afterClose: form.resetFields,
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
          hasFeedback
          name="password"
          rules={[{ required: modalType === Create }, validatePassword]}
          label={modalType === Create ? "Password" : "New Password"}
          extra={
            <span>
              Password is 8-16 characters with no space and must contain at least 1 number, 1
              uppercase letters, 1 lowercase letters, 1 non-alpha numeric number.
            </span>
          }
        >
          <Input.Password
            placeholder={modalType === Create ? "Enter Password ..." : "Enter New Password ..."}
          />
        </Form.Item>
        <Form.Item<UserDto>
          hasFeedback
          name="confirmPassword"
          rules={[{ required: modalType === Create }, validateConfirmPassword]}
          label={modalType === Create ? "Confirm Password" : "Confirm New Password"}
        >
          <Input.Password
            placeholder={modalType === Create ? "Retype Password ..." : "Retype New Password ..."}
          />
        </Form.Item>
        <Form.Item<UserDto> label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommonModal;
