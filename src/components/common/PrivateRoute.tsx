import React from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";

import Loading from "./Loading";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const auth = useAppSelector((state) => state.accounts.auth);
  const location = useLocation();
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading && auth.isAuthenticated != null) {
          if (auth.isAuthenticated) {
            return <Component {...props} />;
          } else {
            history.push(location.pathname);
            return <Redirect to="/login" />;
          }
        } else {
          return <Loading />;
        }
      }}
    />
  );
};

export default PrivateRoute;
