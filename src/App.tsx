import { BrowserRouter } from "react-router-dom";
import {
  Navbar,
} from "./components";
import React from "react";
import RouteList from "./router";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="relative h-screen">
        <RouteList/>
        {/* <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
