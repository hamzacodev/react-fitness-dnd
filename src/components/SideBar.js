import React from "react";
import { useState, use } from "react";
import icon3 from "../asset/Icon-3.svg";
import icon33 from "../asset/Icon-33.svg";
import icon2 from "../asset/Icon-2.svg";
import icon22 from "../asset/Icon-22.svg";
import icon1 from "../asset/Icon-1.svg";
import icon11 from "../asset/Icon-11.svg";

import Content from "../asset/Content.svg";
import setting from "../asset/setting.svg";
import Avatar from "../asset/Avatar.svg";

const tabs = [
  {
    title: "General Info",

    icon: (
      <div className="">
        <img className="w-[18px]" src={icon11} />
      </div>
    ),
    AvtiveIcone: (
      <div>
        <img className="w-[18px]" src={icon1} />{" "}
      </div>
    ),
  },

  {
    title: "General Info",

    icon: (
      <div>
        {" "}
        <img className="w-[18px]" src={icon2} />{" "}
      </div>
    ),
    AvtiveIcone: (
      <div>
        {" "}
        <img className="w-[18px]" src={icon22} />{" "}
      </div>
    ),
  },

  {
    title: "General Info",

    icon: (
      <div>
        <img className="w-[18px]" src={icon3} />{" "}
      </div>
    ),
    AvtiveIcone: (
      <div>
        {" "}
        <img className="w-[18px]" src={icon33} />{" "}
      </div>
    ),
  },
];

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  const [selectTab, setselectTab] = useState("");

  return (
    <div className="">
      <div className="flex flex-col items-center bg-[#0B0B0B] h-[100vh] w-[100px] justify-between">
        <div>
          <div className="flex justify-center w-[100%] mt-4">
            <img src={Content} />
          </div>

          {tabs.map((tab, index) => (
            <div
              className="flex justify-center w-[100%]"
              key={index}
              onClick={() => {
                handleClick(index);
              }}
            >
              <div
                className={
                  index === activeTab
                    ? "flex p-[15px] w-[70px] h-[70px] mt-4 items-center rounded-[7px] bg-[#18181B] pointer"
                    : "flex p-[15px] w-[70px] h-[70px] mt-4 items-center rounded-[7px] hover:bg-[#18181B] pointer"
                }
              >
                {index === activeTab ? (
                  <>
                    {" "}
                    <div className="flex justify-center w-[100%]">
                      {tab.AvtiveIcone}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center w-[100%]">
                      {tab.icon}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="py-[15px]">
          <img className="mx-auto mb-[15px]" src={setting} />
          <img src={Avatar} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
