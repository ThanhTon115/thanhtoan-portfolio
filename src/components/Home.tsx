import React from "react";
import "./styles.scss";
import ReactTyped from "react-typed";
import { styles } from "../styles";
import { XCanvas } from "./canvas/XCanvas";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const handleContact = () => navigate("/contact");
  const handleViewGit = () => {
    window.open("https://github.com/ThanhTon115", "_blank");
  };
  const handleViewLinkedin = () =>
    window.open("https://www.linkedin.com/in/toan-tran-a9394b1b9/", "_blank");
  return (
    <>
      <div className="fixed bottom-0 w-full text-center flex items-center justify-center sm:hidden">
        <img
          className="h-[24px] my-5 mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="git hub link"
          src="./home-icon/git-hub.svg"
          onClick={handleViewGit}
        />
        <div className="flex flex-col home-icon">
          <img
            className="h-[20px] my-5 mx-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="email"
            src="./home-icon/email.svg"
          />
          <span className="absolute bottom-12 ml-[-28px]">
            thanhtontran115@gmail.com
          </span>
        </div>
        <img
          className="h-[24px] my-5 mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="linkedin"
          src="./home-icon/linkedin.svg"
          onClick={handleViewLinkedin}
        />
        <div className="flex flex-col home-icon">
          <img
            className="h-[24px] my-5 mx-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="phone"
            src="./home-icon/phone.svg"
          />
          <span className="absolute bottom-12 ml-[-12px]">0918021531</span>
        </div>
        <img
          className="h-[24px] my-5 mx-4 opacity-50 hover:opacity-100 cursor-pointer"
          alt="connect"
          src="./home-icon/connect.svg"
          onClick={handleContact}
        />
      </div>
      <div className="max-sm:hidden">
        <div className="absolute left-0 bottom-0 h-screen px-10 flex flex-col justify-center items-start">
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="git hub link"
            src="./home-icon/git-hub.svg"
            onClick={handleViewGit}
          />
          <div className="flex items-center home-icon">
            <img
              className="h-[20px] my-4 opacity-50 hover:opacity-100 cursor-pointer mr-2"
              alt="email"
              src="./home-icon/email.svg"
            />
            <span>thanhtontran115@gmail.com</span>
          </div>
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="linkedin"
            src="./home-icon/linkedin.svg"
            onClick={handleViewLinkedin}
          />
        </div>
        <div className="absolute right-0 bottom-0 h-screen px-10 flex flex-col justify-center items-end">
          <div className="flex items-center flex-row-reverse home-icon">
            <img
              className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer ml-2"
              alt="phone"
              src="./home-icon/phone.svg"
            />
            <span>0918021531</span>
          </div>
          <img
            className="h-[24px] my-4 opacity-50 hover:opacity-100 cursor-pointer"
            alt="connect"
            src="./home-icon/connect.svg"
            onClick={handleContact}
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
        <h1
          className={`${styles.heroHeadText} text-center max-sm:text-[20px]  max-sm:px-2`}
        >
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
