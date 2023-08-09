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
import { Deletecustomer_API, Deleteproducts_API } from "../../../API/API";
import { toast } from "react-toastify";
import { UpdateProducts } from "../../Forms/Products";
import { useDisclosure } from "@mantine/hooks"; 

function AllCustomers() {
  const { allCustomers, getCustomers } = useAuth();
  const [loader, setLoader] = useState(false);
  const [customerId, setCustomerId] = useState(""); 
  const [currentCustomer, setCurrentCustomer] = useState([]);
  const [customerOrderTotal, setCustomerOrderTotal] = useState("");
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
      const response = await axios.post(Deletecustomer_API, { customerID: id });

      if (response.data.status === true) {
        toast.success(response.data.message);
        setLoader(false);
        setTimeout(() => {
          getCustomers();
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
      <th style={{ color: "white" }}>Customer name</th>
      <th style={{ color: "white" }}>Email</th>
      <th style={{ color: "white" }}>Phone Number</th>
      <th style={{ color: "white" }}>Order Date</th>
      <th style={{ color: "white" }}>Customer Settings</th>
    </tr>
  );
  const rows =
    allCustomers &&
    allCustomers
      .filter((u) =>
        u.name.toLowerCase().includes(form.values.Search.toLowerCase())
      )
      .map((customer, index) => (
        <tr className="hover:text-black" key={customer.customer_id}>
          <td>{index + 1}</td>
          <td
            onClick={() => {
              setCustomerId(customer.customer_id); 
              setCustomerOrderTotal(customer.total);
              setCurrentCustomer(customer); 

              open();
            }}
            className="cursor-pointer "
          >
            <span className="flex  items-center gap-x-3">{customer.name}</span>
          </td>
          <td className="">
            {" "}
            <a href={`mailto:${customer.email}`}>{customer.email}</a>{" "}
          </td>
          <td>
            {" "}
            <a href={`tel:+${customer.phone_number}`}>
              {customer.phone_number}
            </a>{" "}
          </td>
          <td>{customer.date}</td>

          <td className="">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  type=""
                  color="red"
                  rightIcon={<IconArrowDown size={14} />}
                >
                  Customer menu
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Customer Settings</Menu.Label>
                <Menu.Item
                  icon={<IconBox size={14} />}
                  onClick={() => {
                    setCustomerId(customer.customer_id); 
                    setCustomerOrderTotal(customer.total);
                    setCurrentCustomer(customer);

                    open();
                  }}
                >
                  View oder
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label color="red">Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => {
                    confirmDelete(customer.customer_id);
                  }}
                >
                  Delete Customer
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
          All Customers
        </h2>
        <FormInput
          // label="Search"
          type=""
          className={"w-56 "}
          icon={<IconSearch size="1rem" />}
          placeHolder="Search allCustomers"
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
        {/* <CustomerOrderPage
          close={close}
          currentCustomer={currentCustomer} 
          customerId={customerId} 
          total={customerOrderTotal}
        /> */}
      </Modal>
    </div>
  );
}

export default AllCustomers;
