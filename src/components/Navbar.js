import React from "react";
import icon1 from "../asset/11.png";

const Navbar = () => {
  return (
    <div className="bg-[#131316] h-[130px] p-[30px]">
      <div className="flex">
        <div className="my-auto">
          <img src={icon1} />
        </div>

        <i class="fa-solid fa-chevron-right mx-[15px] my-auto text-[13px]"></i>
        <p className="font-medium my-auto text-[14px]">Workout Templates</p>
        <i class="fa-solid fa-chevron-right mx-[15px] my-auto text-[13px]"></i>
        <i class="fa-solid fa-ellipsis my-auto"></i>
        <i class="fa-solid fa-chevron-right mx-[15px] my-auto text-[13px]"></i>
        <button className="bg-white text-[#131316] font-medium w-[54px] h-[28px] text-[14px] rounded-[6px]">
          Team
        </button>
      </div>
      <div className="between">
        <p className="font-medium my-auto text-[24px] text-white">Workout</p>
        <button className="bg-[#12B76A] text-[#131316] font-medium w-[100px] h-[40px] rounded-[7px] text-[14px]">
          Publish
        </button>
      </div>
    </div>
  );
};

export default Navbar;
