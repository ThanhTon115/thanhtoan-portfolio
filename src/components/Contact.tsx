import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { XCanvas } from "./canvas/XCanvas";
import { SectionWrapper } from "../HOC";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        // import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        // import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        "service_4mon8ea",
        "template_pf5j9oa",
        {
          from_name: form.name,
          to_name: "Tòn",
          from_email: form.email,
          to_email: "thanhtontran1152000@gmail.com",
          message: form.message,
        },
        "h-DhS-o9mpmACHTAI"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={` flex xl:flex-row flex-col-reverse gap-10 overflow-hidden m-auto items-center max-w-7xl`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-[#191919] p-8 rounded-2xl w-[80%] max-lg:w-full"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="py-4 px-6 placeholder:text-secondary bg-[#3a3a3a2f] text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="py-4 px-6 placeholder:text-secondary bg-[#3a3a3a2f] text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="py-4 px-6 placeholder:text-secondary bg-[#3a3a3a2f] text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:auto md:h-[750px] h-[550px] max-sm:h-[350px]  w-full xl:w-[50%]"
      >
        <EarthCanvas />
        {/* <XCanvas
          rotation={[2, 2, 1]}
          autoRotation={true}
          // distance={{ min: 200}}
          zoom={true}
          scale={{value: 0.04}}
          obj={{
            materialUrl: "./3d-models/cude-metrics/cude_metrics.mtl",
            objUrl: "./3d-models/cude-metrics/cude_metrics.obj",
          }}
        /> */}
      </motion.div>
      <StarsCanvas />
    </div>
  );
};

export default SectionWrapper(Contact, "");
