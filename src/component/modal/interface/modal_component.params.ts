import { ReactNode } from "react";

export default interface ModalComponentParams {
  children: ReactNode;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
