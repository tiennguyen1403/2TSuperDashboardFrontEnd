import React from "react";
import { ProjectDto } from "../Project.type";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  ModalProps,
  Select,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import { ModalType, validateMessages } from "src/helpers/constants";
import { projectStatusOptions } from "../constants";
import { ExportCurve } from "iconsax-react";

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

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CommonModal: React.FC<Props> = (props) => {
  const { open, title, okText, loading, projectDto, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const uploadProps: UploadProps = {
    accept: ".jpg,.png,.jpeg",
    multiple: false,
    maxCount: 1,
    beforeUpload: () => false,
  };

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
    maskClosable: false,
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
        <Form.Item<ProjectDto> label="Description" name="description" hasFeedback>
          <Input.TextArea autoSize={{ minRows: 4 }} placeholder="Enter Description ..." />
        </Form.Item>
        <Form.Item<ProjectDto> label="Start Date" name="startDate" hasFeedback>
          <DatePicker
            disabledDate={(currentDate) => {
              const endDate = form.getFieldValue("endDate");
              if (endDate && currentDate.isAfter(endDate)) return true;
              return false;
            }}
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            placeholder="Project's Start Date ..."
          />
        </Form.Item>
        <Form.Item<ProjectDto> label="End Date" name="endDate" hasFeedback>
          <DatePicker
            disabledDate={(currentDate) => {
              const startDate = form.getFieldValue("startDate");
              if (startDate && currentDate.isBefore(startDate)) return true;
              return false;
            }}
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            placeholder="Project's End Date ..."
          />
        </Form.Item>
        <Form.Item<ProjectDto> label="Status" name="status" hasFeedback>
          <Select options={projectStatusOptions} />
        </Form.Item>
        <Form.Item<ProjectDto> label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item<ProjectDto>
          label="Project Image"
          name="projectImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button block icon={<ExportCurve size={20} />}>
              Click to upload project image
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item<ProjectDto>
          label="Project Cover"
          name="projectCover"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button block icon={<ExportCurve size={20} />}>
              Click to upload project cover
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommonModal;
