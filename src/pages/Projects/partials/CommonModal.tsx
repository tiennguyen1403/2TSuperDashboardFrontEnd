import React from "react";
import { ProjectDto } from "../Project.type";
import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { ModalType, validateMessages } from "src/helpers/constants";

type Props = {
  open: boolean;
  title?: string;
  okText?: string;
  loading: boolean;
  modalType: ModalType;
  onCancel: () => void;
  projectDto: ProjectDto;
  onSubmit: (projectDto: ProjectDto) => void;
};

const CommonModal: React.FC<Props> = (props) => {
  const { open, title, okText, loading, projectDto, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const formProps: FormProps = {
    form,
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
    afterOpenChange: (open) => (open ? form.setFieldsValue(projectDto) : form.resetFields()),
  };

  return (
    <Modal {...modalProps}>
      <Form {...formProps}>
        <Form.Item<ProjectDto> label="Name" name="name" rules={[{ required: true }]} hasFeedback>
          <Input placeholder="Enter Project Name ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommonModal;
