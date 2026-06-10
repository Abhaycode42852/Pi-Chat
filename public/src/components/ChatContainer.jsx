import React, {useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatIput from './ChatInput';
import axios from 'axios'
import { sendMessageRoutes , getAllMsgRoutes } from '../utills/apiRoutes';
import {v4 as uuidv4 } from "uuid";

export default function ChatContainer(props) {

  const [messages ,setMessages] = useState([]);
  const [arrivalMessage ,setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(()=>{const loadData = async() => {
    const response = await axios.post(getAllMsgRoutes , {
      from : props.currentUser._id,
      to : props.currentChat._id
    })
    setMessages(response.data);
  }
  loadData();
},[props.currentChat]);

  const handleSendMsg = async( msg ) => {
    await axios.post(sendMessageRoutes,{
      from: props.currentUser._id,
      to : props.currentChat._id,
      message : msg
    });
    props.socket.current.emit("send-msg",{
      to : props.currentChat._id,
      from : props.currentUser._id,
      message : msg
    });
    const msgs = [...messages];
    msgs.push({fromSelf : true , message : msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if (props.socket.current) {
      props.socket.current.on("msg-recieve", (msg)=>{
        setArrivalMessage({fromSelf : false , message : msg});
      })
    }
  },[]);

  useEffect(()=>{
    arrivalMessage && setMessages(
      [...messages , arrivalMessage]
    );
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior : "smooth"});
  },[messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
            <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${props.currentChat.avatarImage}`}
              alt=""
            />
                <div className="username">
                    <h3>{props.currentChat.username}</h3>
                </div>
            </div>
        </div>
      <Logout/>
      </div>
      <div className="chat-messages">
        {
          messages.map((message,index)=>{
             return (
              <div key={uuidv4()} ref={index === messages.length - 1 ? scrollRef : null} className={`message ${message.fromSelf ? "sended" : "recieved"}`} >
                <div className="content" >
                  {message.message}
                </div>
              </div>
             )
          })
        }
      </div>
        <ChatIput handleSendMsg = {handleSendMsg}/>
      
    </Container>
  )
}
const Container=styled.div`
 height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
    display:grid;
  grid-template-rows: 15% 70% 15%;
}
.chat-header {
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        display: flex;
        align-items: center;
        img {
          height: 3rem;
        }
      .username {
        h3 {
          color: white;
        }
      }
    }
}}

.chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
   flex: 1;
  gap: 1rem;
  overflow: auto;
    min-height: 0;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
}
`;
