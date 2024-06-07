export interface Pagination {
  page: number;
  size: number;
}

export interface ListResponse<T> {
  items: T[];
  totalItem: number;
  page: number;
  size: number;
}

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
