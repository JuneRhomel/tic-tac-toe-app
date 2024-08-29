import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { createPortal } from "react-dom";
import ModalComponentParams from "./interface/modal_component.params";
import ModalOverlayStyle from "./style/modal_overlay.style";
import ModalContentStyle from "./style/modal_content.style";
import ModalHeaderStyle from "./style/modal_header.style";
import IconButtonComponent from "../icon_button/icon_button.component";

export default function ModalComponent({
  children,
  onClose,
}: ModalComponentParams) {
  return createPortal(
    <ModalOverlayStyle>
      <ModalContentStyle>
        <ModalHeaderStyle>
          <IconButtonComponent
            onClick={onClose}
            icon={<IoCloseOutline />}
          />
        </ModalHeaderStyle>

        {children}
      </ModalContentStyle>
    </ModalOverlayStyle>,
    document.body
  );
}
