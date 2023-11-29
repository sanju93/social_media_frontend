import { TextField, Button } from "@mui/material";
import style from "./login.module.css";
import { useState, useContext } from "react";
import NavContext from "../context/NavBar.Context";
import axios from "axios";
import { url } from "../constants";
import { toast } from "react-toastify";

function SignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirm_password, setConfirmPassword] = useState("");
  let context = useContext(NavContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === confirm_password) {
      try {
        let res = await axios({
          method: "POST",
          url: `${url}/users/create`,
          headers: {
            "Content-Type": ["application/json"],
          },
          data: { name, email, password },
        });

        if (res.status === 201) {
          toast.success("User Account Created");
          context.setSignUpBtn(false);
          context.setLoginBtn(true);
        }
      } catch (err) {
        if (err.response.data.email) {
          setEmail("");
        }
        if (err.response.data.password) {
          setPassword("");
          setConfirmPassword("");
          toast.error("password will contain atleast 4 charcter");
        }
        if (err.response.data.name) {
          toast.error(
            "Name will contain atleast 4 characters and atmost 10 characters"
          );
          setName("");
        }

        if (!err.response.data) {
          toast.error("something went wrong");
          setName("");
          setEmail("");
        }
      }
    } else {
      //pasword is not correct
      toast.error("pls Check the password");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`${style.SignUp}`}>
          <span>Name</span>
          <TextField
            label="Name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="write your name..."
            required
          />
        </div>

        <div className={`${style.SignUp}`}>
          <span>Email</span>
          <TextField
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="write your name..."
            required
          />
        </div>
        <div className={`${style.SignUp}`}>
          <span>Password</span>
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="write your password..."
            required
          />
        </div>

        <div className={`${style.SignUp}`}>
          <span>Confirm Password</span>
          <TextField
            label="Password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="write your confirm password..."
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
export default SignUp;
