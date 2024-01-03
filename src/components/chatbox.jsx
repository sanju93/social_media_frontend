import styles from "../pages/home/home.module.css";
import { useEffect ,useRef,useState} from "react";
import { io } from "socket.io-client";



function ChatBox({ id, setId }) {

  let socket = useRef(null);
  let [currentChat,setCurrentChat] = useState([]);
  let [chat,setChat] = useState("");

  useEffect(() => {
    socket.current = io("http://localhost:8000");

    socket.current.emit('fetching_socket_id',{
      online_user : JSON.parse(localStorage.getItem('token')),
      id
    })

    socket.current.on('joined room',(data) => {
      console.log(data);
    })

    socket.current.on('new',(data) => {
    
  
      setCurrentChat(prevMessage => [...prevMessage,{chat:data}])
    })



   

 

      
   
  }, [id]);


  useEffect(() => {
     console.log(currentChat);
  },[currentChat])



  
  


  function handleSubmit(e){
    e.preventDefault();


  
    socket.current.emit("newMessage",{chat})

  

  
  
    setChat("");

    
  }


  
  return (
    <>
      <div className={styles.chatBox}>
        <div className={styles.chatContainer}>
         {currentChat.map((item,index) => 
          <p style={{color : "black"}} key={index}>{item.chat}</p>
         )}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Type a message..." />
          <input type="submit" value="send"></input>
        </form>
      </div>
    </>
  );
}

export default ChatBox;
