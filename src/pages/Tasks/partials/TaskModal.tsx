import React from "react";
import { ModalType, TaskDto, TaskGroup } from "../Task.type";
import { Form, FormProps, Input, Modal, ModalProps, Select, Switch } from "antd";
import { validateMessages } from "src/helpers/constants";
import { User } from "src/pages/Users/User.type";

type Props = {
  open: boolean;
  title?: string;
  okText?: string;
  taskDto: TaskDto;
  loading?: boolean;
  userOptions: User[];
  modalType: ModalType;
  onCancel: () => void;
  statusOptions: TaskGroup[];
  onSubmit: (taskDto: TaskDto) => void;
};

const TaskModal: React.FC<Props> = (props) => {
  const {
    open,
    title = "",
    okText = "",
    loading = false,
    taskDto,
    statusOptions,
    userOptions = [],
    onCancel,
    onSubmit,
  } = props;
  const [form] = Form.useForm();

  const onFinish = (values: TaskDto) => onSubmit({ ...values, id: taskDto.id });

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
    afterOpenChange: (open) => (open ? form.setFieldsValue(taskDto) : form.resetFields()),
  };

  return (
    <Modal {...modalProps}>
      <Form {...formProps}>
        <Form.Item<TaskDto> label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="Enter task title ..." />
        </Form.Item>
        <Form.Item<TaskDto> label="Description" name="description">
          <Input.TextArea autoSize={{ minRows: 4 }} placeholder="Enter task description ..." />
        </Form.Item>
        <Form.Item<TaskDto> label="Completed" name="isCompleted" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item<TaskDto> label="Status" name="status" rules={[{ required: true }]}>
          <Select
            allowClear
            placeholder="Select task status ..."
            options={statusOptions.map((status) => ({ label: status.name, value: status.id }))}
          />
        </Form.Item>
        <Form.Item<TaskDto> label="Assign for" name="assignedFor" rules={[{ required: true }]}>
          <Select
            allowClear
            placeholder="Assign task for ..."
            options={userOptions.map((status) => ({ label: status.fullName, value: status.id }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
