import style from "./profile.module.css";
// import {NavLink} from 'react-router-dom'
import { Button, Typography } from "@mui/material";
function Profile() {
  document.title = "Profile";
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
            Name : {}
          </Typography>

          <Typography component={"span"} color="primary" fontWeight="600">
            Friends : {}
          </Typography>
          <Typography component="span" color="primary" fontWeight="600">
            Posts : {}
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
