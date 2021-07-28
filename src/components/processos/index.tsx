import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

import ListaProcesso from "./ListaProcesso";
import Processo from "./processo";

const Processos = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute exact path={path}>
        <ListaProcesso />
      </PrivateRoute>
      <PrivateRoute path={path + "/processo"}>
        <Processo />
      </PrivateRoute>
    </Switch>
  );
};

export default Processos;
