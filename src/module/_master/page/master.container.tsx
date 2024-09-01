import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { TbMusicOff } from "react-icons/tb";
import { TbMusic } from "react-icons/tb";

export default function MasterContainer() {


  return (
    <div className="bg-blue-500 h-screen w-screen">
      <Outlet />
    </div>
  );
}
