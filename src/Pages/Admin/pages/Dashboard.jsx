import { Accordion, Button, Tabs } from "@mantine/core";
import {
  IconBoxModel2,
  IconDashboard,
  IconGift,
  IconPhoto,
  IconRefresh,
  IconStepInto,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateProducts } from "../../Forms/Products";
import AllProducts from "./AllProducts";
import AllCategory from "./AllCategory"; 
import AllSubCategory from "./AllSubCategory";
import DashboardHome from "./DashboardHome";
import AllCustomers from "./AllCustomers";
import { useAuth } from "../../../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const { refreshSite } = useAuth();
  return (
    <Tabs
      value={tabValue}
      onTabChange={(value) => navigate(`/dashboard/${value}`)}
      orientation="vertical"
      defaultValue="1"
      variant="pills"
      className=" fixed w-screen"
      color="dark"
    >
      <Tabs.List
        className={`bg-gwltheme  shadow-lg  z-20  h-screen w-14 md:w-52  cursor-pointer  transition-all ease-in-out overflow-hidden hover:overflow-visible`}
      >
        <Button
          type=""
          color="green"
          onClick={() => {
            refreshSite();
          }}
          className="mx-3 mb-10 bg-whites w-fit p-1 rounded-md mt-28 md:mt-20"
        >
          <IconRefresh size="1.4rem" /> &nbsp;<p className="hidden md:flex" >Refesh</p>
        </Button>
        <Tabs.Tab
          value="1"
          className=" text-white   hover:text-slate-950"
          icon={<IconDashboard size="1.8rem" />}
        >
          <p className="hidden md:flex">Dashboard</p>
        </Tabs.Tab>
   
        {/*  */}
        {/*  */}
        {/*  */}
        <Tabs.Tab
          value="create-product"
          className="  text-white hover:text-slate-950"
          icon={<IconGift size="1.8rem" />}
        >
          <p className="hidden md:flex">Create Product</p>
        </Tabs.Tab>
        {/*  */}
        {/*  */}
        {/*  */}
        <Tabs.Tab
          value="products"
          className="  text-white hover:text-slate-950"
          icon={<IconBoxModel2 size="1.8rem" />}
        >
          <p className="hidden md:flex">All Products</p>
        </Tabs.Tab>
        {/*  */}
        {/*  */}
        {/*  */}
        {/* <Tabs.Tab
          value="category"
          className="  text-white hover:text-slate-950"
          icon={<IconStepInto size="1.8rem" />}
        >
          <p className="hidden md:flex">Category Manager</p>
        </Tabs.Tab> */}
        {/*  */}
        {/*  */}
        {/*  */}
         
      </Tabs.List>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/* FIRST TAB */}
      {/*  */}
      {/*  */}
      <Tabs.Panel
        className=" h-screen bg-slate-900 pb-52 overflow-y-auto "
        value="1"
      >
        <DashboardHome />
      </Tabs.Panel>
      {/*  */}
      {/*  */}
      {/* SECOND TAB */}
      {/*  */}
      {/*  */}
      <Tabs.Panel
        className="bg-slate-900d h-screen pb-52 overflow-y-auto "
        value="create-product"
      >
        <CreateProducts />
      </Tabs.Panel>
      {/*  */}
      {/*  */}
      {/* THIRD TAB */}
      {/*  */}
      {/*  */}
      <Tabs.Panel
        className="bg-slate-900 h-screen pb-52 overflow-y-auto "
        value="products"
      >
        <AllProducts />
      </Tabs.Panel>
      {/*  */}
      {/*  */}
      {/* FOURTH TAB */}
      {/*  */}
      {/*  */}
      <Tabs.Panel
        className="bg-slate-900 h-screen pt-20 md:pt-10 pb-52 overflow-y-auto  "
        value="category"
      >
        <div className=" grid mt-10 md:mt-5 gap-6 xl:grid-cols-2">
          <Accordion className=" " defaultValue="category">
            <Accordion.Item value="category">
              <Accordion.Control className="text-white">
                Categories
              </Accordion.Control>
              <Accordion.Panel>
                <AllCategory />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          {/*  */}
          {/*  */}
          {/*  */}
          <Accordion className=" " defaultValue="subcategory">
            <Accordion.Item value="subcategory">
              <Accordion.Control className="text-white">
                Sub-categories
              </Accordion.Control>
              <Accordion.Panel>
                <AllSubCategory />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </Tabs.Panel>
 
    </Tabs>
  );
}

export default Dashboard;
