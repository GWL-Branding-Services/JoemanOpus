import React, { useState } from "react";
import {
  IconArrowDown,
  IconPlus,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import {
  Accordion,
  Button,
  Menu,
  Modal,
  Table,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { Deletesubcategory_API } from "../../../API/API";
import { toast } from "react-toastify";
import { CreateSubCategory } from "../../Forms/Categories";
import { useDisclosure } from "@mantine/hooks";

function AllSubCategory() {
  const { category, subCategory, getSubCategory } = useAuth();
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
      const response = await axios.post(Deletesubcategory_API, {
        subcategoryID: id,
      });

      if (response.data.status === true) {
        toast.success(response.data.message);
        setLoader(false);
        setTimeout(() => {
          getSubCategory();
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
    <tr   >
      <th style={{color: "white"}} >S/N</th>
      <th style={{color: "white"}} >Sub-category</th>
      <th style={{color: "white"}} >Settings</th>
    </tr>
  );
  const rows =
    subCategory &&
    subCategory.map((subCat, index) => (
      <tr
      
        // hidden={index === 0 || index === 1 ? true : false}
        key={subCat.sub_id}
      >
        <td>{index + 1}</td>
        <td className="w-5/12">
          <span className="text-white flex items-center gap-x-3">
            {subCat.sub_category}
          </span>
        </td>

        <td className="">
          <Button
            type=""
            onClick={() => {
              confirmDelete(subCat.sub_id);
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
    <div className=" max-w-7xl mt-10  lg:px-8">
      <div className="md:flex px-6  flex-col lg:gap-5 justify-start  lg:items-start">
        <h2 className="text-2xl font-bold tracking-tight mt-5 mb-2 text-white sm:text-4xl">
          All Sub-category
        </h2>
        <Button
          onClick={() => {
            open();
          }}
          type=""
          loading={loader}
          className="w-fit bg-gwltheme-light hover:bg-gwltheme transition-all ease-in duration-150 "
          // color={"dark"}
          leftIcon={<IconPlus size={14} />}
        >
          Create New Sub-Category
        </Button>
      </div>
      {/* <div className="py-6 px-4 overflow-x-auto">
        <Table highlightOnHover withColumnBorders>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div> */}
      <div className="py-6 px-4 overflow-x-auto">
        {category &&
          category.map((Cat, index) => {
            return (
              <div key={Cat.category_id}>
                <Accordion
                  key={Cat.category_id}
                  className="text-white  my-3"
                  hidden={
                    index === 0  ? true : false
                  }
                  defaultValue={index === 0 ? String(Cat.category) : null}
                >
                  <Accordion.Item clas value={String(Cat.category)}>
                    <Accordion.Control  >
                      <p className=" text-white hover:text-black text-lg">
                        <b className=" mr-2">{index}.</b>
                        {/* <b className=" mr-2">{index + 1}.</b> */}
                        {Cat.category} category
                      </p>
                    </Accordion.Control>
                    <Accordion.Panel>
                      {/*  */}
                      <div className="">
                        <div>
                          <Table className="text-white hover:text-black" highlightOnHover withColumnBorders>
                            <thead >{ths}</thead>
                            <tbody>
                              {subCategory && subCategory
                                .filter(
                                  (subCategory) =>
                                    subCategory.category ===
                                    String(Cat.category)
                                )
                                .map((SubCat, index) => (
                                  <tr
                                  
                                    key={SubCat.sub_id}
                                  >
                                    <td>{index + 1}</td>
                                    <td>{SubCat.sub_category}</td>

                                    <td className="">
                                      <Button
                                        type=""
                                        onClick={() => {
                                          confirmDelete(SubCat.sub_id);
                                        }}
                                        color="red"
                                        leftIcon={<IconTrash size={14} />}
                                      >
                                        Delete
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                      {/*  */}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            );
          })}
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
        <CreateSubCategory close={close} />
      </Modal>
    </div>
  );
}

export default AllSubCategory;
