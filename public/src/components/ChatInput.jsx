import {React , useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react'
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
export default function ChatIput({handleSendMsg}) {
  const [showEmojiPicker , setShowEmojiPicker] = useState(false);
  const [msg ,setMsg] = useState("");

  const handleEmojiPickerToggle = ()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (emoji , event)=>{
      let message = msg;
      message += emoji.emoji;
      setMsg(message);
  }

  const sendChat = (event) =>{
    event.preventDefault();
    if (msg.length > 0){
      handleSendMsg(msg);
      setMsg(""); 
    }
  } 

  
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerToggle}/>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendChat(e)}>
        <input type="text" placeholder='type your msg here' value={msg} onChange={(e)=>{setMsg(e.target.value)}} />
        <button className="submit">
            <IoMdSend/>
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
display : grid;
grid-template-columns : 5% 95%;
align-items : center;
background-color : #080420;
padding : 0 2rem;
padding-bottom : 0.3rem;

.button-container{
  display : flex;
  align-items : center;
  color : white;
  gap : 1rem;
  .emoji{
  positon : relative;  
  svg{
    font-size : 1.5rem;
    color : #ffff00c8;
    cursor : pointer;
    }
 .EmojiPickerReact {
 position : absolute;
 top : 170px;
  --epr-bg-color: #080420;
  --epr-category-label-bg-color: #080420;
  --epr-hover-bg-color: #9a86f3;
  --epr-search-input-bg-color: transparent;
  --epr-search-input-border-color: #9a86f3;
  --epr-text-color: #ffffff;

  box-shadow: 0 5px 10px #9a86f3;
  border: 1px solid #9a86f3;
}
  .EmojiPickerReact *::-webkit-scrollbar {
  width: 5px;
}

.EmojiPickerReact *::-webkit-scrollbar-thumb {
  background-color: #9a86f3;
  border-radius: 10px;
}

.EmojiPickerReact *::-webkit-scrollbar-track {
  background-color: #080420;
}
  }
}
  .input-container{
    width : 100%;
    border-radius : 2rem;
    display : flex;
    align-items : center;
    gap : 2rem;
    background-color : #ffffff34;
    input{
    width : 90%;
    height : 60%;
    background- color : transparent;
    color : White;
    border : none ;
    padding-left : 1rem;
    font-size : 1.2rem;
    &::selection{
    background-color : #9a86f3;
    }
    &:focus{
    outline : none;
    }
    }
  }
    .submit {
    padding : 0.3rem 2rem;
    border-radius : 2rem;
    display : flex;
    justify-content : center;
    align-items : center;
    background-color : #9a86f3;
    border : none;
    svg {
    font-size : 2rem;
    color : white;
    }
    }
`;
