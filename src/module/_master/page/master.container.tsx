import React from "react";
import { Outlet } from "react-router-dom";


export default function MasterContainer() {

  const renderMasterContainer = () => (

    <div className="bg-blue-500 h-screen w-screen">
                {/* <img className=" fixed top-1  -left-28 blur " src="./assets/o_bg.png" alt="" />
                <img src="./assets/x_bg.png" className=" fixed bottom-0  -right-28 blur" alt="" /> */}
      <Outlet />
    </div>

  );

  return renderMasterContainer();
}
