import React from "react";
import { useDispatch } from "react-redux";
import { authLogout } from "../../actions/accounts/auth";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return <div>Logout (Este texto não deveria aparecer)</div>;
};

export default Logout;
