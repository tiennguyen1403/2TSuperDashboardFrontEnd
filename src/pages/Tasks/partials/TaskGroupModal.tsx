import React from "react";
import { ModalType, TaskGroupDto } from "../Task.type";
import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import { validateMessages } from "src/helpers/constants";

type Props = {
  open: boolean;
  title?: string;
  okText?: string;
  loading?: boolean;
  modalType: ModalType;
  onCancel: () => void;
  taskGroupDto: TaskGroupDto;
  onSubmit: (taskGroupDto: TaskGroupDto) => void;
};

const TaskGroupModal: React.FC<Props> = (props) => {
  const { open, taskGroupDto, title, okText, loading, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const onFinish = (values: TaskGroupDto) => onSubmit({ ...values, id: taskGroupDto.id });

  const formProps: FormProps = {
    form,
    onFinish,
    validateMessages,
    variant: "filled",
    layout: "vertical",
    clearOnDestroy: true,
  };

  const modalProps: ModalProps = {
    open,
    title,
    okText,
    onCancel,
    onOk: form.submit,
    maskClosable: false,
    confirmLoading: loading,
    afterOpenChange: (open) => (open ? form.setFieldsValue(taskGroupDto) : form.resetFields()),
  };

  return (
    <Modal {...modalProps}>
      <Form {...formProps}>
        <Form.Item<TaskGroupDto> label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter task group name ..." />
        </Form.Item>
        <Form.Item<TaskGroupDto> label="Description" name="description">
          <Input.TextArea
            placeholder="Enter task group description ..."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskGroupModal;
