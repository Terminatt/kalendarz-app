export interface ModalState {
  isVisible: boolean;
  modalType: ModalType;
}

export enum ModalType {
  NONE,
  LOGIN_MODAL,
  REGISTER_MODAL,
}
