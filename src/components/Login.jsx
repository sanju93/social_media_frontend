import { TextField, Button } from "@mui/material";
import style from "./login.module.css";
import { useState, useEffect, useContext } from "react";
import { url } from "../constants/index.js";
import NavContext from "../context/NavBar.Context.js";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let context = useContext(NavContext);

  // useEffect(() => {
  //   async function auth() {
  //     try {
  //       let res = await axios({
  //         url: `${url}/users/auth`,
  //         method: "get",
  //         headers: {
  //           Authorization: `Bearer ${JSON.parse(
  //             localStorage.getItem("token")
  //           )}`,
  //         },
  //       });
  //       if (res.status === 200) {
  //         //user is logged IN already
  //         context.setLogin(!context.login);
  //       }
  //     } catch (err) {
  //       // token is invalid
  //       console.log(err);
  //     }
  //   }

  //   auth();
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios({
        url: `${url}/users/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
      });
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("login", JSON.stringify(res.data.user));
        context.setLogin(!context.login);
        toast.success("login successfully");
      }
    } catch (err) {
      if (err.response.status === 401) {
        if (err.response.data.data === "Password") {
          setPassword("");
          toast.error("Password is wrong pls check the password");
        } else {
          setEmail("");

          toast.error("Check your Email Id");
        }
      } else {
        toast.error("something went wrong pls try again");
      }
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${style.SignUp}`}>
          <span>Email</span>
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="write your name..."
            required
          />
        </div>
        <div className={`${style.SignUp}`}>
          <span>Password</span>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="write your password..."
            required
          />
        </div>

        <div className={`${style.SignUp}`}>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default Login;
