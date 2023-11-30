import style from "./AddFriends.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../constants/index.js";
import { Typography, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function AddFriends() {
  let [strangers, setStrangers] = useState([]);
  let [confirm, setConfirm] = useState([]);
  let [click, setClick] = useState(false);

  document.title = "Add Friends";
  useEffect(() => {
    async function handleFetch() {
      try {
        let res = await axios({
          method: "get",
          url: `${url}/users/AddFriends`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        setConfirm(res.data.requestSentBy);
        setStrangers([...res.data.requestSentTo, ...res.data.strangers]);
      } catch (err) {
        console.log(err);
      }
    }

    handleFetch();
  }, [click]);

  async function handleCofirmRequest(id) {
    
    try {
      let res = await axios({
        url: `${url}/users/friendRequestConfirm/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (res.status === 200) {
        setClick(!click);
        console.log("request Accepted");
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log("unauthorised");
      }

      if (err.response.status === 500) {
        console.log("Internal server error");
      }
    }
  }

  async function handleAddFriend(id) {
    try {
      let res = await axios({
        method: "PUT",
        url: `${url}/users/friendRequest/${id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (res.status === 200) {
        setClick(!click);
        console.log("Friend Request sent");
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log("Un authorized");
      } else {
        console.log("Inter nal server error");
      }
    }
  }

  return (
    <>
      <div className={`${style.Strangers}`}>
        <div className={`${style.strangerContainer}`}>
          <input type="text" placeholder="search strangers..." />
          <div className={`${style.users}`}>
            <h3>Requests:</h3>
            <div className={`${style.Requests}`}>
              {confirm.length === 0 ? (
                <span>No request available</span>
              ) : (
                confirm.map((item, index) => (
                  <div className={`${style.people}`} key={index}>
                    <div>
                      {" "}
                      <Typography component={"p"} color="dark">
                        {item.name}
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      onClick={() => handleCofirmRequest(item.id)}
                      color="primary"
                    >
                      Confirm Request
                    </Button>
                  </div>
                ))
              )}
            </div>

            <h3>Add Friends:</h3>
            <div className={`${style.addFriends}`}>
              {strangers.length === 0 ? (
                <span>All strangers is your friends :</span>
              ) : (
                strangers.map((item, index) => (
                  <div className={`${style.people}`} key={index}>
                    <div>
                      {" "}
                      <Typography component={"p"} color="dark">
                        {item.name}
                      </Typography>
                    </div>
                    <div>
                      {item.requestSent ? (
                        <Button variant="text" color="success" disabled>
                          Request Sent
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleAddFriend(item._id)}
                          sx={{
                            fontSize: "13px",
                            width: "12rem",
                            height: "3rem",
                          }}
                          endIcon={
                            <PersonAddIcon
                              color="info"
                              sx={{ marginBottom: "10px" }}
                            />
                          }
                        >
                          Add Friend
                        </Button>
                      )}{" "}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFriends;
