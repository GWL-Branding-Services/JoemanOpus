import React, { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import { Button, Modal, Table, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { Deletecategory_API } from "../../../API/API";
import { toast } from "react-toastify";
import { CreateCategory } from "../../Forms/Categories";
import { useDisclosure } from "@mantine/hooks";

function AllCategory() {
  const { category, getCategory } = useAuth();
  const [loader, setLoader] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();

  //   Handle delete
  const confirmDelete = (id) => {
    if (window.confirm("Do you want to delete")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    setLoader(true);
    try {
      // Send the form data to the server
      const response = await axios.post(Deletecategory_API, { categoryID: id });

      if (response.data.status === true) {
        toast.success(response.data.message);
        setLoader(false);
        setTimeout(() => {
          getCategory();
        }, 2500);
      } else {
        toast.error(response.data.message);
        console.log(response);
        setLoader(false);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.response.message)
        : toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  //
  //
  //
  //
  const ths = (
    <tr>
      <th style={{color: "white"}} >S/N</th>
      <th style={{color: "white"}} >Category </th>
      <th style={{color: "white"}} > Settings</th>
    </tr>
  );
  const rows =
    category &&
    category.map((cat, index) => (
      <tr
      className="hover:text-black "
        // hidden={index === 0 || index === 1 ? true : false}
        key={cat.category_id}
      >
        <td>{index + 1}</td>
        {/* <td>{index + 1}</td> */}
        <td className="w-5/12">
          <span className="flex items-center gap-x-3">{cat.category}</span>
        </td>

        <td className="">
          <Button
            disabled={index === 0   ? true : false}
            type=""
            onClick={() => {
              confirmDelete(cat.category_id);
            }}
            color="red"
            leftIcon={<IconTrash size={14} />}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  return (
    <div className=" max-w-7xl  mt-10  lg:px-8">
      <div className="md:flex px-6  flex-col lg:gap-5 justify-start  lg:items-start">
        <h2 className="text-2xl font-bold tracking-tight mt-5 mb-2 text-white sm:text-4xl">
          All Category
        </h2>
        <Button
          onClick={() => {
            open();
          }}
          type=""
          loading={loader}
          className="w-fit  bg-gwltheme-light hover:bg-gwltheme transition-all ease-in duration-150"
          // color="dark"
          leftIcon={<IconPlus size={14} />}
        >
          Create New Category
        </Button>
      </div>
      <div className="py-6 px-4 overflow-x-auto">
        <Table className="text-white  " highlightOnHover withColumnBorders>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        size={"md"}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        centered
      >
        <CreateCategory close={close} />
      </Modal>
    </div>
  );
}

export default AllCategory;
