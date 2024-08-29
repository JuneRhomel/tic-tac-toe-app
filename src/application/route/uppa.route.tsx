import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MasterContainer from "../../module/_master/page/master.container";
import HomeContainer from "../../module/home/page/home.container";
import GameContainer from "../../module/game/page/game.container";
import PageNotFoundContainer from "../../module/page_not_found/page/page_not_found.container";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterContainer />,
    children: [
      {
        path: "/",
        element: <HomeContainer />
      },
      {
        path: "/game/:id",
        element: <GameContainer />
      },
      {
        path: "*",
        element: <PageNotFoundContainer />
      }
    ],
  }
]);

export default router;
