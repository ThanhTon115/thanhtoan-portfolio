import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  vuejs,
  diva,
  smarthub,
  edu,
  wow,
  xcore,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  // {
  //   title: "Backend Developer",
  //   icon: backend,
  // },
  // {
  //   title: "Content Creator",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Vue JS",
    icon: vuejs,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
];

const experiences = [
  {
    title: "Vue.js Developer",
    company_name: "XCore",
    icon: xcore,
    iconBg: "#383E56",
    date: "September 2021 - November 2021",
    points: [
      "Supporting to fix bugs and resolving request from customer",
      "Developing the timekeeping feature",
      "Building up an new feature using Stringee",
      "Developing UI base on design with Vue2 and integrating API",
    ],
  },
  {
    title: "Vue.js Developer",
    company_name: "DKEdu",
    icon: edu,
    iconBg: "#E6DEDD",
    date: "November 2021 - May 2022",
    points: [
      "Building a management system applied to employee training",
      "Developing UI base on design with Vue2 and integrating API with GraphQL",
    ],
  },
  {
    title: "Vue.js Developer",
    company_name: "Smart Hub",
    icon: smarthub,
    iconBg: "#383E56",
    date: "June 2022 - 15 June 2022",
    points: [
      "Supporting to fix bug and build an feature",
      "Developing UI base on design with Vue3 and integrating API with GraphQL",
    ],
  },
  {
    title: "Vue.js Developer",
    company_name: "WOW",
    icon: wow,
    iconBg: "#E6DEDD",
    date: "15 June 2022 - September 2022",
    points: [
      "Building up management system that will be applied to the internal operations and customer management",
      "Co-operating with web designer and BA to improve UI",
      "Developing UI base on design with Vue3 and integrating API with GraphQL",
    ],
  },
  {
    title: "Vue.js Developer",
    company_name: "DIVA ERP",
    icon: diva,
    iconBg: "#E6DEDD",
    date: "September 2022 - Present",
    points: [
      "Building up management system that will be applied to the internal operations and customer management",
      "Co-operating with web designer and BA to improve UI",
      "Improving performance and offering solutions to feedback from customer and user",
      "Developing UI base on design with Vue3 and integrating API with GraphQL",
      "Supporting for internship",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

const CvUrl =
  "https://drive.google.com/file/d/1AG4ev1DQfDbNNffzmuIHcidjiJDg6HUf/view?usp=drive_link";
export { services, technologies, experiences, testimonials, projects, CvUrl };
