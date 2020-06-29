import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Authorize";



 const ProtectedRoute = ({

  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        if ((localStorage.getItem('auth')) == 1) {
          return <Component />;
        } else {
          return (
            <Redirect
            to={{
              pathname: "/"
            }}
            />
          )
            
            
          
        }
      }}
    />
  );
};
export default ProtectedRoute