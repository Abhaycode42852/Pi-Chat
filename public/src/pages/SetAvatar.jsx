import React,{useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Loader from '../assests/loader.gif';
import styled from 'styled-components';
import { Buffer } from "buffer";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoutes} from '../utills/apiRoutes';

export default function SetAvatar(){
    const api="https://api.multiavatar.com/45678945";
    const navigate= useNavigate();
    const [avatar,setAvatar]= useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [selectedAvatar, setSelectedAvatar]= useState(undefined);

    useEffect(()=>{
      if (!localStorage.getItem("chat-app-user")){
        navigate('/login')
      }
      // eslint-disable-next-line
    },[])


  const setProfilePicture=async()=>{
    if (selectedAvatar===undefined){
      toast.error("Please select an Avatar")
    }else{
      const user= await JSON.parse(localStorage.getItem('chat-app-user'))
      const {data}=await axios.post(`${setAvatarRoutes}/${user._id}`,{
        image: avatar[selectedAvatar],
        id: user._id
      })
      if(data.isSet){
        user.isAvatarImageSet=true
        user.avatarImage= data.image
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/')
      }else{
        toast.error("Error setting avatar, Please try again")
      }
    }
  }
  const avatarload=async ()=>{
    const data=[];
    for (let i=0;i<4;i++){
      const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
        const buffer =new Buffer(image.data);
        data.push(buffer.toString('base64'));
    };
setAvatar(data);
setIsLoading(false);
  }

  useEffect( ()=>{
    avatarload()
  },[]);

  return (
    <>{
      isLoading?<Container>
        <img src={Loader} alt='Loader'className='Loader'/>
      </Container>:<>

    <Container>
      <div className="title-conatiner">
            <h1>Pick an Avatar as your profile Picture</h1>

      </div>
      <div className="avatars">{
        avatar.map((avatar, index) => {
          return (
            <div
            className={`avatar ${
              selectedAvatar === index ? "selected" : ""
            }`}
            >
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                key={avatar}
                onClick={() => setSelectedAvatar(index)}
                />
            </div>
          );
        })}
      
      </div>
      <button className='submit-btn' onClick={setProfilePicture}>set as profile</button>

    </Container>
    <ToastContainer/>
    </>
  }
    </>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }`