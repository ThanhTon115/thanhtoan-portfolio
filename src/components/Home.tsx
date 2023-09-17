import React from "react";
import "./styles.scss";
import ReactTyped from "react-typed";
import { styles } from "../styles";
import { XCanvas } from "./canvas/XCanvas";
const Contact = () => {
  return (
    <>
      <div className="fixed bottom-0 w-full text-center flex items-center justify-center py-10 sm:hidden">
        <img
          className="h-[24px] mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="git hub link"
          src="./home-icon/git-hub.svg"
        />
        <img
          className="h-[20px] mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="email"
          src="./home-icon/email.svg"
        />
        <img
          className="h-[24px] mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="linkedin"
          src="./home-icon/linkedin.svg"
        />
        <img
          className="h-[24px] mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="phone"
          src="./home-icon/phone.svg"
        />
        <img
          className="h-[24px] mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="connect"
          src="./home-icon/connect.svg"
        />
      </div>
      <div className="max-sm:hidden">
        <div className="absolute left-0 bottom-0 h-screen px-10 flex flex-col justify-center">
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="git hub link"
            src="./home-icon/git-hub.svg"
          />
          <img
            className="h-[20px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="email"
            src="./home-icon/email.svg"
          />
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="linkedin"
            src="./home-icon/linkedin.svg"
          />
        </div>
        <div className="absolute right-0 bottom-0 h-screen px-10 flex flex-col justify-center">
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="phone"
            src="./home-icon/phone.svg"
          />
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="connect"
            src="./home-icon/connect.svg"
          />
        </div>
      </div>
    </>
  );
};
const Home = () => {
  return (
    <>
      <section className={`w-full h-[90vh] pt-[20vh]  max-sm:pt-[30vh]`}>
        <h1 className={`${styles.heroHeadText} text-center max-sm:text-[24px]  max-sm:px-2`}>
          Hello, I'm{" "}
          <ReactTyped
            style={{ color: "#52bf90" }}
            strings={["Thanh Toàn", "Front-end Developer"]}
            typeSpeed={100}
            loop
            backSpeed={20}
            cursorChar="|"
            showCursor={true}
          />
        </h1>
        <div className="h-[80%] max-sm:h-[60%] m-auto mt-5">
          <XCanvas
            rotation={[2, 2, 1]}
            autoRotation={true}
            // distance={{ min: 200}}
            zoom={true}
            obj={{
              materialUrl: "./3d-models/cude-metrics/cude_metrics.mtl",
              objUrl: "./3d-models/cude-metrics/cude_metrics.obj",
            }}
          />
        </div>
      </section>
      <Contact />
    </>
  );
};
export default Home;
