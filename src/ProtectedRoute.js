import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (sessionStorage.getItem("token") != null) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
