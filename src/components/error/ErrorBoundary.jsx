import { IconLoader2 } from "@tabler/icons-react";
import React, { Component } from "react";
import { FormButton } from "../buttons";  
import { buttonTheme } from "../../Data/GeneralData";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return (
        <div className="flex flex-col h-[40rem] items-center justify-center">
          <h1 className="text-3xl font-bold text-gwltheme" >Oops!</h1>
          <h1 className="text-xl" >Something went wrong.</h1>
          <p className="mb-5 text-xl" >Please try again.</p>
          <FormButton
            className="my-7"
            px={10}
            gradient={{
              from: buttonTheme.primary,
              to: buttonTheme.primary,
            }}
            text="Reload Page"
            variant="gradient" 
            leftIcon={<IconLoader2 />} 
            radius="lg"
            size={"sm"}
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      );
    }

    // Render the children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
