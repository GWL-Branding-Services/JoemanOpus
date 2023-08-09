import { Dialog } from "@headlessui/react";
import { Image } from "@mantine/core";
import { IconMenu2, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { navigationLeft, navigationRight } from "../../Data/GeneralData";
import { ImageCollection } from "../../assets";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className=" shadow-md bg-gwltheme  w-screen -top-1 z-50  fixed mx-auto">
      <nav
        className="flex items-center justify-between p-6 lg:px-28"
        aria-label="Global"
      >
        {/* <div className="flex lg:flex-1">
          <div className="hidden  sm:gap-x-12  lg:flex">
            {navigationLeft.map((item) => (
              <motion.a
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 800, damping: 10 }}
                whileTap={{ scale: 0.9 }}
                key={item.name}
                href={item.href}
                className=" text-lg  hover:text-verdelight-10 font-light text-white  leading-6  "
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </div> */}
        <div className="lg:hidden">
          <span className="h-8 w-auto text-xl  text-white font-light">
            <Image src={ImageCollection.logo} width={100} />
            <p>Joseman Opus</p>
          </span>
        </div>
        <div className="hidden lg:flex lg:gap-x">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="h-8 w-auto text-xl  text-white font-light">
              <Image src={ImageCollection.logo} width={170} />
              <p>Joseman Opus</p>
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <IconMenu2 color="white" className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex gap-x-12 lg:flex-1 lg:justify-end">
          {navigationRight.map((item, index) => (
            <motion.a
              target={index === 2 ? "_blank" : null}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 800, damping: 10 }}
              whileTap={{ scale: 0.9 }}
              key={item.name}
              href={item.href}
              className="text-lg font-light    hover:text-verdelight-10  text-white"
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </nav>
      {/*  */}
      {/*  */}
      {/*  */}
      {/* Mobile */}
      {/*  */}
      {/*  */}
      {/*  */}

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed insset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gwltheme px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only "></span>
              <Image src={ImageCollection.logo} width={100} />
              <p>Joseman Opus</p>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <IconX color="white" className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* <div className="space-y-2 py-6">
                {navigationLeft.map((item) => (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 800, damping: 10 }}
                    whileTap={{ scale: 0.9 }}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-light leading-7 text-white hover:text-verdelight-10  "
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div> */}
              <div className="space-y-2 py-6">
                {navigationRight.map((item, index) => (
                  <motion.a
                    target={index === 2 ? "_blank" : null}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 800, damping: 10 }}
                    whileTap={{ scale: 0.9 }}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block  rounded-lg py-2 px-3 text-base font-light leading-7 text-white hover:text-verdelight-10  "
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavBar;
