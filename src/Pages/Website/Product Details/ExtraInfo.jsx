/* eslint-disable react/prop-types */
import { useState } from "react";
import { extraInfo } from "../../../Data/GeneralData";
import { IconAlignLeft, IconCaretRight  } from '@tabler/icons-react';

export default function ExtraInfo({ product }) {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(-1);

  const openSubMenu = (index) => {
    setOpenSubMenuIndex(index === openSubMenuIndex ? -1 : index);
  };

  const getSubMenuStyle = (index) => {
    return {
      transform:
        index === openSubMenuIndex ? "translateY(0)" : "translateY(-8px)",
      opacity: index === openSubMenuIndex ? "1" : "0",
      maxHeight: index === openSubMenuIndex ? "100%" : "0",
      transition: "opacity 500ms, transform 500ms",
    };
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };


  return (
    <div className="flex flex-col mt-10">
      {extraInfo.map((info, index) => (
        <div
          className="border-t-2 flex flex-col py-3"
          key={info.id}
          onClick={() => openSubMenu(index)}
        >
          <div className="flex gap-4 cursor-pointer">
            <IconAlignLeft className="w-7 h-7" />
            <div className="mt-[2px] uppercase font-semibold">
              {info.heading}
            </div>
          </div>

          {info.subMenu2 && (
            <div 
              className="ml-5 overflow-hidden"
              style={getSubMenuStyle(index)}
              onClick={stopPropagation}
            >
              {info.subMenu2.map((subItem) => (
                <div className="text-sm mt-3" key={subItem.id}>
                  {product.detail}
                </div>
              ))}
            </div>
          )}
         
        </div>
      ))}
    </div>
  );
}
