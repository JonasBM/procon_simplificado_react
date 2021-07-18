import React from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { useAppSelector } from "../../hooks";

import Loading from "./Loading";
import NotAutorized from "./NotAutorized";

const AdminRoute = ({ component: Component, ...rest }: any) => {
  const auth = useAppSelector((state) => state.accounts.auth);
  const location = useLocation();
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading && auth.isAuthenticated != null) {
          if (auth.isAuthenticated) {
            if (auth.user && auth.user.is_staff) {
              return <Component {...props} />;
            } else {
              return <NotAutorized />;
            }
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

export default AdminRoute;
