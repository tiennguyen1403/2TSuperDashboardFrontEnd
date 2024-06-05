import { Form, FormProps, Input, Modal, ModalProps, Switch } from "antd";
import React from "react";
import { UserDto } from "../User.type";
import { ModalType, passwordRegEx, validateMessages } from "src/helpers/constants";
import { RuleRender } from "antd/es/form";

const { CREATE, UPDATE } = ModalType;

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
    validator: (rule, value) => {
      // console.log("value :>> ", value);
      // console.log("password :>> ", getFieldValue("password"));
      // if (!value || getFieldValue("password") === value) return Promise.resolve();
      // if (modalType === Update && value !== getFieldValue("password"))
      //   return Promise.reject(new Error("The new password that you entered do not match!"));
      // return Promise.reject(new Error("The new password that you entered do not match!"));
      const password = getFieldValue("password");
      const confirmPassword = value;

      switch (modalType) {
        case CREATE: {
          if (!confirmPassword) return Promise.resolve();
          if (confirmPassword && confirmPassword === password) return Promise.resolve();
          return Promise.reject(new Error("The new password that you entered do not match!"));
        }
        case UPDATE: {
          if (!password) return Promise.resolve();
          if (!confirmPassword) return Promise.resolve();
          if (password && password === confirmPassword) return Promise.resolve();
          return Promise.reject(new Error("The new password that you entered do not match!"));
        }
        default: {
          return Promise.resolve();
        }
      }
    },
  });

  const formProps: FormProps = {
    form: form,
    validateMessages,
    variant: "filled",
    layout: "vertical",
    onFinish: onSubmit,
    clearOnDestroy: true,
  };

  const modalProps: ModalProps = {
    open,
    title,
    okText,
    onCancel,
    onOk: form.submit,
    destroyOnClose: true,
    confirmLoading: loading,
    afterOpenChange: (open) => (open ? form.setFieldsValue(userDto) : form.resetFields()),
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
          <Input placeholder="Enter Username ..." autoComplete="new-password" />
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
          rules={[{ required: modalType === CREATE }, validatePassword]}
          label={modalType === CREATE ? "Password" : "New Password"}
          extra={
            <span>
              Password is 8-16 characters with no space and must contain at least 1 number, 1
              uppercase letters, 1 lowercase letters, 1 non-alpha numeric number.
            </span>
          }
        >
          <Input.Password
            placeholder={modalType === CREATE ? "Enter Password ..." : "Enter New Password ..."}
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item<UserDto>
          hasFeedback
          name="confirmPassword"
          rules={[{ required: modalType === CREATE }, validateConfirmPassword]}
          label={modalType === CREATE ? "Confirm Password" : "Confirm New Password"}
        >
          <Input.Password
            placeholder={modalType === CREATE ? "Retype Password ..." : "Retype New Password ..."}
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
