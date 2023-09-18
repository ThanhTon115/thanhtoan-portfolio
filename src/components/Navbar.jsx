import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import "./styles.scss";
import { modules } from "../router";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-2 fixed top-0 z-20 ease-in duration-300 ${
        scrolled ? "bg-[#52bf90d7]" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-[56px] h-[56px] rounded-full border-solid border-2">
            <img
              src={logo}
              alt="logo"
              className="w-[56px] h-[56px] object-contain p-2 hover:-rotate-12 ease-in duration-300"
            />
          </div>
        </Link>

        {/* <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul> */}

        <div className="flex justify-end items-center">
          <div
            className={`cursor-pointer nav__menu ${
              toggle ? "close" : ""
            } relative z-10`}
            onClick={() => setToggle(!toggle)}
          >
            <span className="line line--st"></span>
            <span className="line line--nd"></span>
            <span className="line line--rd"></span>
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-0 right-0 bg-[#000000e7] h-[100vh] w-[100vw] z-3 justify-center items-center`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {modules.slice(1, 4).map((nav) => (
                <li
                  key={nav.name}
                  className={`font-poppins text-[56px] self-center  ${
                    active === nav.name ? "text-white" : "text-secondary"
                  }`}
                >
                  <div
                    className={`item-frontground z-10 relative cursor-pointer`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.name);
                      navigate(nav.path)
                    }}
                  >
                    {nav.title}
                  </div>
                  <div
                    className={`item-background text-[260px] transition-all absolute flex z-3 top-0 left-0 w-full h-full justify-center items-center opacity-0 tracking-[10rem] max-sm:rotate-45 max-sm:text-[180px]`}
                  >
                    {nav.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
