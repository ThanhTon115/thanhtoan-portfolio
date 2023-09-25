import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { CvUrl, services } from "../constants";
import { SectionWrapper } from "../HOC";
import { fadeIn, textVariant } from "../utils/motion";
import Tech from "./Tech";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#52bf90] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className=" w-full m-auto">
      <motion.div variants={textVariant()}>
        <p className="text-[56px] text-center">
          About <span className="text-[#52bf90]">Me</span>
        </p>
      </motion.div>

      <div className="flex gap-10 items-center max-md:flex-col-reverse">
        <div>
          <motion.p
            variants={fadeIn("left", "spring", 0.1, 1)}
            className="mt-4 text-[56px] max-md:text-[24px]"
          >
            I'm creative{" "}
            <span className="text-[#52bf90]">Front-end Web Developer</span>{" "}
            based in Ho Chi Minh
          </motion.p>
          <motion.p
            variants={fadeIn("left", "spring", 0.1, 1)}
            className="mt-4 text-[24px] max-md:text-[16px] text-justify"
          >
            I have experience in TypeScript and JavaScript, and expertise in
            frameworks like React and Vue. I'm a quick learner and collaborate
            closely with clients to create efficient, scalable, and
            user-friendly solutions that solve real-world problems. Let's work
            together to bring your ideas to life!
          </motion.p>
        </div>
        <motion.div
          variants={fadeIn("right", "spring", 0.5, 0.75)}
          className="w-full"
        >
          <img
            className="h-[360px] my-4 max-md:h-[200px] m-auto"
            src="/avatar.svg"
            alt="my pic"
          />
          <Tilt className="xs:w-[250px] w-full m-auto">
            <motion.div
              variants={fadeIn("bottom", "spring", 0.5, 0.75)}
              className="w-full p-[1px] rounded-[20px] shadow-card cursor-pointer"
              onClick={() => window.open(CvUrl, "_blank")}
            >
              <div
                options={{
                  max: 45,
                  scale: 1,
                  speed: 450,
                }}
                className="bg-[#52bf90] rounded-[20px] py-5 px-12 flex justify-evenly items-center flex-col"
              >
                <h3 className="text-white text-[20px] font-bold text-center">
                  View CV
                </h3>
              </div>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
      {/* <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> */}
      <motion.div variants={textVariant()} className="mt-[56px]">
        <p className="text-[56px] text-center">
          My <span className="text-[#52bf90]">Skills</span>
        </p>
      </motion.div>
      <Tech />
    </div>
  );
};

export default SectionWrapper(About, "");
