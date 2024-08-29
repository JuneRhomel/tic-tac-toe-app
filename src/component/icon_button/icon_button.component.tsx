import React from "react";
import IconButtonComponentParams from "./interface/icon_button_component.params";
import IconButtonStyle from "./style/icon_botton.component.style";

export default function IconButtonComponent({
  icon,
  isLoading,
  onClick,
  size = 32,
}: IconButtonComponentParams) {
  const renderIcon = () => {
    if (icon === undefined) return undefined;

    return icon;
  };

  const renderIconButtonContent = () => {
    if (isLoading) return "Loading...";

    return <>{renderIcon()}</>;
  };

  return (
    <IconButtonStyle onClick={onClick} $size={size}>
      {renderIconButtonContent()}
    </IconButtonStyle>
  );
}
