import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Home,
  Tech,
  Works,
} from "../components";
export const modules = [
  {
    path: "/",
    name: "home",
    title: "Home",
    component: () => <Home />,
  },
  {
    path: "/about",
    name: "about",
    title: "About",
    component: () => <About />,
  },
  // {
  //   path: "/works",
  //   name: "works",
  //   title: "Works",
  //   component: () => <Works />,
  // },
  {
    path: "/experience",
    name: "experience",
    title: "Experience",
    component: () => <Experience />,
  },
  {
    path: "/contact",
    name: "contact",
    title: "Contact",
    component: () => <Contact />,
  },
  {
    path: "/technical",
    name: "technical",
    title: "Technical",
    component: () => <Tech />,
  },
];
const RouteList = () => {
  const routeList = [...modules];
  return (
    <Routes>
      {routeList.map((r, index) => (
        <Route path={r.path} element={r.component()} key={index} />
      ))}
    </Routes>
  );
};
export default RouteList;
