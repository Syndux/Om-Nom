import React from "react";

import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

import aboutPic from "../assets/huey2.png";

const AboutTheDev = () => {
  return (
    <>
      <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
        <div className="flex flex-wrap justify-center">
          <div className="m-3 h-[calc(100dvh-135px)] w-full overflow-hidden overflow-y-scroll rounded-xl bg-main-bg p-5 dark:bg-main-dark-bg">
            <p className="mb-9 ml-2 text-2xl font-bold">About The Dev</p>
            <div className="flex w-full items-center justify-center">
              <div className="flex flex-col sm:flex-row sm:gap-10">
                <div>
                  <img
                    src={aboutPic}
                    alt="Huey's portfolio picture"
                    className="aspect-square h-auto w-52 max-w-full rounded-2xl sm:flex-none"
                  />
                </div>
                <div className="flex max-w-xl flex-col">
                  <h3 className="font-semibold leading-8 tracking-normal text-gray-700 dark:text-gray-200">
                    Huey Nguyen
                  </h3>
                  <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
                    Software Developer
                  </p>
                  <p className="mt-6 text-base text-gray-500 dark:text-gray-400">
                    A driven software developer on the brink of graduating from
                    AppAcademy, Huey has discovered a passion for the world of
                    coding. Originally trained as a computer engineer, Huey
                    decided to pivot from hardware engineering to software
                    development in 2022. From this, he has acquired proficiency
                    in popular development technologies such as JavaScript and
                    React, equipping him to create dynamic and innovative
                    solutions. Huey's commitment to honing his skills extends
                    beyond the screen, as he maintains a balanced lifestyle by
                    hitting the gym and enjoying boba outings with friends.
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
        </div>
      </div>
    </>
  );
};

export default AboutTheDev;
