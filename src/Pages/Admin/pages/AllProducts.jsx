import React, { useEffect, useState } from "react";
import { FormInput } from "../../../components/inputs";
import {
  IconArrowDown,
  IconAward,
  IconBox,
  IconSearch,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "@mantine/form";
import {
  Badge,
  Button,
  Image,
  Menu,
  Modal,
  Table,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";
import { Deleteproducts_API } from "../../../API/API";
import { toast } from "react-toastify";
import { UpdateProducts } from "../../Forms/Products";
import { useDisclosure } from "@mantine/hooks";

function AllProducts() {
  const {
    products,
    getProduct,
    addToCart,
    cart,
    handleChange,
    removeFromCart,
    clearCart,
    getTotal,
    category,
    subCategory,
  } = useAuth();
  const [loader, setLoader] = useState(false);
  const [productId, setProductId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      Search: "",
    },
  });
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
      const response = await axios.post(Deleteproducts_API, { productID: id });

      if (response.data.status === true) {
        toast.success(response.data.message);
        setLoader(false);
        setTimeout(() => {
          getProduct();
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
  //
  const ths = (
    <tr>
      <th style={{ color: "white" }}>S/N</th>
      <th style={{ color: "white" }}>Product name</th>
      <th style={{ color: "white" }}>Price</th>
      <th style={{ color: "white" }}>Category</th>
      <th style={{ color: "white" }}>Sub Category</th>
      <th style={{ color: "white" }}>Stock</th>
      <th style={{ color: "white" }}>Product Settings</th>
    </tr>
  );
  const rows =
    products &&
    products
      .filter((u) =>
        u.name.toLowerCase().includes(form.values.Search.toLowerCase())
      )
      .map((product, index) => (
        <tr className="hover:text-black" key={product.products_id}>
          <td>{index + 1}</td>
          <td
            onClick={() => {
              setProductId(product.products_id);
              open();
            }}
            className="cursor-pointer w-5/12"
          >
            <span className="flex  items-center gap-x-3">
              <Image
                src={`${process.env.API_IMAGE_URL}${product.img}`}
                width={40}
                height={35}
                fit="contain"
              />{" "}
              {product.name}
            </span>
          </td>
          <td className="">
            ₦{Intl.NumberFormat("en-US").format(product.price)}
          </td>
          <td>{product.category}</td>
          <td>{product.sub_category}</td>
          <td>
            {product.inStock === "1" ? (
              <Badge className="cursor-pointer" color="green">
                In stock
              </Badge>
            ) : (
              <Badge className="cursor-pointer" color="red">
                Out of stock
              </Badge>
            )}
          </td>

          <td className="">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  type=""
                  color="red"
                  rightIcon={<IconArrowDown size={14} />}
                >
                  Product menu
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Product Settings</Menu.Label>
                <Menu.Item
                  icon={<IconBox size={14} />}
                  onClick={() => {
                    setProductId(product.products_id);
                    open();
                  }}
                >
                  Edit Product
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label color="red">Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => {
                    confirmDelete(product.products_id);
                  }}
                >
                  Delete Product
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      ));

  //
  //
  //

  //
  //
  //
  return (
    <div className=" max-w-7xl  mt-28 md:mt-10  lg:px-8">
      <div className="md:flex px-6 justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight mt-5 mb-2 md:mb-7 text-gwltheme-light sm:text-4xl">
          All Products
        </h2>
        <FormInput
          // label="Search"
          type=""
          className={"w-56 "} 
          icon={<IconSearch size="1rem" />}
          placeHolder="Search products"
          inputName="Search"
          formProps={form.getInputProps}
          required={true}
        />
      </div>

      <div className="py-6 px-4 overflow-x-auto">
        <Table
          className="text-white  hover:bg-gwltheme transition-all ease-in duration-200 "
          highlightOnHover
          withColumnBorders
        >
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
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
        <UpdateProducts
          close={close}
          productId={productId}
          products={products}
        />
      </Modal>
    </div>
  );
}

export default AllProducts;
