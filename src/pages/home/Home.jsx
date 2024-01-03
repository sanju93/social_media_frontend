import Login from "../../components/Login.jsx";
import style from "./home.module.css";
import { useContext, useEffect, useState } from "react";
import NavContext from "../../context/NavBar.Context.js";
import SignUp from "../../components/SignUp.jsx";
import axios from "axios";
import { url } from "../../constants/index.js";
import ChatBox from "../../components/chatbox.jsx";

function Home() {
  let context = useContext(NavContext);
  document.title = "Home";
  let [friends, setFriends] = useState([]);
  let [chat, setChat] = useState("");

  useEffect(() => {
    async function fetchFriends() {
      try {
        let res = await axios({
          method: "GET",
          url: `${url}/users/friends`,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });

        if (res.status === 200) {
          setFriends(res.data);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log("UnAuntorized");
        } else {
          console.log("Internal server error");
        }
      }
    }

    fetchFriends();
  }, [context]);

 

  return (
    <>
      <div className={`${style.container}`}>
        <div className={`${style.posts}`}>will contain all the posts</div>
        <div className={`${style.another}`}>
          {context.login ? (
            <>
              <div className={`${style.friendsContainer}`}>
                {friends.length === 0 ? (
                  <p>You Don't have any friends</p>
                ) : (
                  friends.map((item, index) => {
                    return (
                      <div
                        className={`${style.friend}`}
                        onClick={() => setChat(item.id)}
                        key={item.id}
                      >
                        <div>
                          {" "}
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
                            alt="avatar"
                          ></img>
                        </div>
                        <p>{item.name}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <>
              {context.loginBtn ? <Login /> : ""}
              {context.signUpBtn ? <SignUp /> : ""}
            </>
          )}
        </div>
        {chat ? <ChatBox id={chat} setId={setChat} /> : ""}
      </div>
    </>
  );
}

export default Home;
