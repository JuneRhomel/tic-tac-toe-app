import React, { ReactNode, useState } from "react";
import ModalProviderInterface from "./interface/modal_provider.interface";
import ModalComponent from "../../../component/modal/modal.component";


let showModalFn: (content: ReactNode) => void;

export default function ModalProvider({ children }: ModalProviderInterface) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  showModalFn = (content: ReactNode) => {
    setModalContent(content);
  };

  const closeDialog = () => {
    setModalContent(null);
  };

  return (
    <>
      {children}
      {modalContent && (
        <ModalComponent onClose={closeDialog}>{modalContent}</ModalComponent>
      )}
    </>
  );
}

export const showModal = (content: ReactNode) => {
  showModalFn(content);
};

export const closeModal = () => {
  showModalFn(null);
};
