import styled from "styled-components";

const IconButtonStyle = styled.button<Props>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  border-radius: 50%;
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
  display: grid;
  place-items: center;
  padding: 0;

  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.9);
  }
  &:hover,
  &:focus-visible {
    background-color: #e8e8e8;
  }
`;

interface Props {
  $size: number;
}

export default IconButtonStyle;
