export const validateMessages = {
  required: "${label} is required!", //eslint-disable-line
  types: {
    email: "${label} is not a valid email!", //eslint-disable-line
    number: "${label} is not a valid number!", //eslint-disable-line
  },
  number: {
    range: "${label} must be between ${min} and ${max}", //eslint-disable-line
  },
};

export const passwordRegEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;

export enum ELoading {
  FETCH = "Fetch",
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

export enum ModalType {
  DEFAULT = "default",
  CREATE = "create",
  UPDATE = "update",
}
