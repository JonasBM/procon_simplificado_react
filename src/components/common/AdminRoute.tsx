import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { tryLoadUser } from "../../actions/accounts/auth";
import { useAppSelector } from "../../hooks";

import Loading from "./Loading";
import NotAutorized from "./NotAutorized";

const AdminRoute = ({ component: Component, ...rest }: any) => {
  const auth = useAppSelector((state) => state.accounts.auth);
  const dispatch = useDispatch();
  //has token but not authenticated => try login
  //dont has token => login page
  //has token and authenticated => open page

  useEffect(() => {
    if (!auth.isLoading && auth.token != null && auth.isAuthenticated != null) {
      if (!auth.isAuthenticated) {
        dispatch(tryLoadUser());
      }
    }
  }, [auth, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isLoading && auth.token != null && auth.isAuthenticated) {
          if (auth.user && auth.user.is_staff) {
            return <Component {...props} />;
          } else {
            return <NotAutorized />;
          }
        }
        if (!auth.isLoading && auth.token == null) {
          return <Redirect to="/login" />;
        }
        return <Loading />;
      }}
    />
  );
};

export default AdminRoute;
