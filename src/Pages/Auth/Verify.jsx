import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Verify_API } from "../../API/API";

function Verify() {
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
 
  
  const handleSubmit = async () => {
    try {
      // Send the token in the URL
      const response = await axios.get(`${Verify_API}?token=${token}`);
  
      if (response.data.status === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      error.message === "Network Error"
        ? toast.error(error.message)
        : toast.error(error.response.data.message);
    }
  };
  

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <h2>Verify your Account</h2>
    </div>
  );
}

export default Verify;
