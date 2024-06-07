import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import React from "react";
import { UserDto } from "../User.type";
import { passwordRegEx, validateMessages } from "src/helpers/constants";
import { RuleRender } from "antd/es/form";
import _ from "lodash";
import { ExportCurve } from "iconsax-react";
import { ModalType } from "src/generalTypes";

const { CREATE } = ModalType;

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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CommonModal: React.FC<Props> = (props) => {
  const { open, okText, title, onSubmit, onCancel, userDto, loading, modalType } = props;
  const [form] = Form.useForm();

  const validatePassword: RuleRender = () => ({
    validator: (_, value) => {
      if (modalType === ModalType.CREATE) {
        if (!value) {
          return Promise.reject(new Error("Password is required!"));
        }
        if (value && !value.match(passwordRegEx)) {
          return Promise.reject(new Error("Password is not valid!"));
        }
        return Promise.resolve();
      }
      if (modalType === ModalType.UPDATE) {
        if (!value) {
          return Promise.resolve();
        }
        if (value && !value.match(passwordRegEx)) {
          return Promise.reject(new Error("Password is not valid!"));
        }
        return Promise.resolve();
      }
    },
  });

  const validateConfirmPassword: RuleRender = ({ getFieldValue }) => ({
    validator: (rule, value) => {
      const password = getFieldValue("password");
      const confirmPassword = value;

      if (modalType === ModalType.CREATE) {
        if (!confirmPassword) {
          return Promise.reject(new Error("Confirm Password is required!"));
        }
        if (confirmPassword && !password) {
          return Promise.resolve();
        }
        if (confirmPassword !== password) {
          return Promise.reject(new Error("The new password that you entered do not match!"));
        }

        return Promise.resolve();
      }

      if (modalType === ModalType.UPDATE) {
        if (!password) {
          return Promise.resolve();
        }
        if (password && !confirmPassword) {
          return Promise.reject(new Error("Confirm Password is required!"));
        }
        if (password !== confirmPassword) {
          return Promise.reject(new Error("The new password that you entered do not match!"));
        }

        return Promise.resolve();
      }
    },
  });

  const uploadProps: UploadProps = {
    accept: ".jpg,.png,.jpeg",
    multiple: false,
    maxCount: 1,
    beforeUpload: () => false,
  };

  const formProps: FormProps = {
    form: form,
    validateMessages,
    variant: "filled",
    layout: "vertical",
    onFinish: onSubmit,
    clearOnDestroy: true,
    onValuesChange: (changedValues) => {
      if (_.has(changedValues, "password")) form.validateFields(["confirmPassword"]);
      if (_.has(changedValues, "confirmPassword")) form.validateFields(["password"]);
    },
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
          rules={[validatePassword]}
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
          rules={[validateConfirmPassword]}
          label={modalType === CREATE ? "Confirm Password" : "Confirm New Password"}
        >
          <Input.Password
            placeholder={modalType === CREATE ? "Retype Password ..." : "Retype New Password ..."}
          />
        </Form.Item>
        <Form.Item<UserDto> label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item<UserDto>
          label="Avatar"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button block icon={<ExportCurve size={20} />}>
              Click to upload avatar
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommonModal;
