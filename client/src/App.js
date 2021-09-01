import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { LoadingOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";

const Header = lazy(() => import("./components/nav/Header"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const CreateProduct = lazy(() => import("./pages/merchant/CreateProduct"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5 text-primary">
          __E-PRODUCT <LoadingOutlined className="h4 p-3 text-danger" /> ___BY
          SHIVANSH MEHTA
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/merchant/product" component={CreateProduct} />
        <Route exact path="/users/product/:id" component={SingleProduct} />
      </Switch>
    </Suspense>
  );
};

export default App;
