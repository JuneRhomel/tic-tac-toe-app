import styled, { keyframes } from "styled-components";

const zoomIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalContentStyle = styled.div`
  background: white;
  border-radius: 8px;
  position: relative;
  animation: ${zoomIn} 0.3s ease-out;
  box-shadow: 1px 2px 7px 2px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  margin: 0 10px
`;

export default ModalContentStyle;
