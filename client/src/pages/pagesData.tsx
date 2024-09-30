import { routerType } from "../types/router.types";
import Home from "./Home";
import Players from "./Players";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "players",
    element: <Players />,
    title: "players",
  },
];

export default pagesData;
