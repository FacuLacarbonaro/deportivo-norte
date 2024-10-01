import { routerType } from "../types/router.types";
import Home from "./Home";
import Login from "./Login";
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
  {
    path: "login",
    element: <Login />,
    title: "login",
  },
];

export default pagesData;
