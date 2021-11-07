import { FC } from "react";
import { NavBar } from "./cmps/navbar";

interface Props {

}

export const AppHeader: FC<Props> = () => {
  return <div className="app-header">
    <NavBar />
  </div>
}