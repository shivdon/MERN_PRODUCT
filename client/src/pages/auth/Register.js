import React, { useState } from "react";
import { toast } from "react-toastify";
import LoginForm from "../../components/forms/LoginForm";
import { registerUser } from "../../functions/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(email, password)
      .then((res) => {
        if (res.data.message) {
          toast.error(res.data.message);
        } else {
          console.log(res);
          toast.success("Registered Successfully");
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
          history.push("/");
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
        buttonText={"Register"}
      />
    </div>
  );
};

export default Register;
