import style from "./profile.module.css";
// import {NavLink} from 'react-router-dom'
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { url } from "../../constants/index.js";
function Profile() {
  document.title = "Profile";
  let [data, setData] = useState({});
  useEffect(() => {
    async function fetchLoginData() {
      try {
        let res = await axios({
          method: "GET",
          url: `${url}/users/loginData`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (res.status === 200) {
          console.log("Data fetched");
          setData({
            Name: res.data.name,
            Posts: res.data.post,
            Friends: res.data.friends,
          });
        }
      } catch (err) {
        if (err.response.status === 500) {
          console.log("Internal server Error");
        }

        if (err.response.status === 401) {
          console.log("UnAUthorized");
        }
      }
    }

    fetchLoginData();
  }, []);
  return (
    <>
      <div className={`${style.profile}`}>
        <div className={`${style.coverImageContainer}`}>
          <div className={`${style.coverImage}`}>
            <div className={`${style.profileImage}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/4202/4202831.png"
                alt="profile pic"
              />
            </div>
          </div>
        </div>
        <div className={`${style.info}`}>
          <Typography component={"span"} color="primary" fontWeight="600">
            Name : {data.Name}
          </Typography>

          <Typography component={"span"} color="primary" fontWeight="600">
            Friends : {data.Friends}
          </Typography>
          <Typography component="span" color="primary" fontWeight="600">
            Posts : {data.Posts}
          </Typography>
          <Button variant={"contained"} color="primary">
            Add Post / Do you Have Something in Your Mind?
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
