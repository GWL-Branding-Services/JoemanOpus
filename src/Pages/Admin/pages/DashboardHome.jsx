import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { IconBoxAlignBottomFilled } from "@tabler/icons-react";
import { IconBox } from "@tabler/icons-react";
import { Center, RingProgress } from "@mantine/core";
import { buttonTheme } from "../../../Data/GeneralData";

function DashboardHome() {
  const { currentUser } = useAuth();
  return (
    <div className="mt-32 md:mt-10 px-20 flex flex-col justify-center items-center ">
      <div className="flex flex-col sm:flex-row w-full my-7 justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight   text-white sm:text-4xl">
          Dashboard
        </h2>
        <p className="text-lg font-thin tracking-tight   text-white ">
          Hello <b className="cursor-pointer" >{currentUser.first_name}</b>
        </p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-3 justify-center items-center">
        {/*  */}
        {/* pds, Cat, Admins, sbcat */}
        <InfoCard /> 
        <InfoCard />
        <InfoCard />
        <InfoCard />
        {/*  */}
        {/*  */}
      </div>
    </div>
  );
}

export default DashboardHome;

function InfoCard() {
  return (
    <div className=" relative cursor-pointer transition-all ease-in duration-300 hover:bg-slate-900/90 bg-slate-700/80 w-52 h-24 border-2 border-gwltheme-light overflow-hidden rounded-lg ">
      <div className="absolute z-50 flex h-full w-full gap-x-5  bg-emerald-100s justify-center items-center">
        <div className=" flex flex-col">
          <IconBox size={28} color="white" />
          <p className="text-white">Products</p>
        </div>
        <RingProgress
          size={60}
          thickness={5}
          label={<Center className="text-white">59</Center>}
          sections={[{ value: 5 * 3.33, color: buttonTheme.secondary }]}
        />
      </div>

      <div className=" w-full relative z-10 h-full blur-sm bg-gwltheme/40 p-5 ">
        <RingProgress
          size={160}
          thickness={3}
          label={<Center></Center>}
          sections={[{ value: 5 * 3.33, color: buttonTheme.secondary }]}
        />
      </div>
    </div>
  );
}

// export   {DashboardHome}
