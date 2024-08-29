import { ReactNode } from "react";

export default interface IconButtonComponentParams {
  type?: "Primary" | "Warning";
  icon?: ReactNode;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: number;
}
