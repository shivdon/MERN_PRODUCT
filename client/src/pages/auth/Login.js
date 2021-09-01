import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoginForm from "../../components/forms/LoginForm";
import { loginUser } from "../../functions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleBasedRedirect = (role) => {
    if (role === "merchant") {
      history.push("/merchant/product");
    } else {
      history.push("/user/products");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((res) => {
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          console.log(res);
          toast.success("Signed In Successfully");
          localStorage.setItem(
            "user",
            JSON.stringify({ email: res.data.email, role: res.data.role })
          );
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              role: res.data.role,
            },
          });
          setEmail("");
          setPassword("");
          roleBasedRedirect(res.data.role);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
};

export default Login;
