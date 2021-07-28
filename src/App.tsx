import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";

import { positions, Provider as AlertProvider } from "react-alert";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AdminRoute from "./components/common/AdminRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/common/NotFound";
import Login from "./components/accounts/Login";
import Logout from "./components/accounts/Logout";
import Perfil from "./components/perfil";
import Processos from "./components/processos";
import Admin from "./components/admin";

import Loading from "./components/common/Loading";

import "./loadInterceptor";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

import Alerts from "./components/layouts/alerts/Alerts";
import AlertTemplate from "./components/layouts/alerts/AlertTemplate";
import NotAutorized from "./components/common/NotAutorized";
import ModalFormTipoDeSituacao from "./components/Modals/ModalFormTipoDeSituacao";
import ModalFormSituação from "./components/Modals/ModalFormSituação";

import * as moment from "moment";
import "moment/locale/pt-br";
import ModalFormDocumento from "./components/Modals/ModalFormDocumento";
import ModalFormComentario from "./components/Modals/ModalFormComentario";
import ModalFormUsuario from "./components/Modals/ModalFormUsuario";
import { UserRetrieveUpdateAction } from "./actions/accounts/user";
import { ActionPayload } from "./actions/generics/mixins";

moment.locale("pt-br");

function App() {
  const alertOptions = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    containerStyle: {
      zIndex: 1070,
    },
  };

  useEffect(() => {
    store.dispatch(UserRetrieveUpdateAction.list() as unknown as ActionPayload);
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Alerts />
          <Header />
          <ModalFormTipoDeSituacao />
          <ModalFormSituação />
          <ModalFormDocumento />
          <ModalFormComentario />
          <ModalFormUsuario />
          <main role="main">
            <Switch>
              <Redirect exact path="/" to="/processos" />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/perfil" component={Perfil} />
              <PrivateRoute path="/processos" component={Processos} />
              <AdminRoute exact path="/admin" component={Admin} />
              <Route exact path="/loading" component={Loading} />
              <Route exact path="/NotAutorized" component={NotAutorized} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
