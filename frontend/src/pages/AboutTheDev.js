import React from "react";

import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

import aboutPic from "../assets/huey2.png";

const AboutTheDev = () => {
  return (
    <div className="flex flex-col m-3 h-[calc(100dvh-100px)] w-full overflow-hidden overflow-y-scroll rounded-xl bg-main-bg p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:bg-main-dark-bg dark:shadow-[rgba(233,_233,_224,_0.1)_0px_0px_16px]">
      <p className="mb-9 ml-2 text-2xl font-bold">About The Dev</p>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <div className="flex-shrink-0">
            <img
              src={aboutPic}
              alt="Huey smiling at the camera"
              className="w-96 rounded-2xl"
            />
          </div>
          <div className="flex max-w-xl flex-col">
            <h3 className="font-semibold leading-8 tracking-normal text-gray-700 dark:text-gray-200 m-0">
              Huey Nguyen
            </h3>
            <p className="text-base leading-7 text-gray-500 dark:text-gray-400 m-0 mt-2">
              Software Developer
            </p>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400 whitespace-break-spaces">
              A driven software developer on the brink of graduating from
              AppAcademy, Huey has discovered a passion for the world of coding.
              Originally trained as a computer engineer, Huey decided to pivot
              from hardware engineering to software development in 2022. From
              this, he has acquired proficiency in popular development
              technologies such as JavaScript and React, equipping him to create
              dynamic and innovative solutions. Huey's commitment to honing his
              skills extends beyond the screen, as he maintains a balanced
              lifestyle by hitting the gym and enjoying boba outings with
              friends.
            </p>
            <ul className="mt-6 flex gap-6">
              <li>
                <a
                  href="https://github.com/Syndux"
                  className="text-gray-500 dark:text-gray-400"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/huey-nguyen/"
                  className="text-gray-500 dark:text-gray-400"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheDev;
