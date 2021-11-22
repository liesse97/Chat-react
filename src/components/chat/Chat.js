 import React,{useRef,useState,useEffect} from 'react';
 import {useHistory}  from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import axios from 'axios';

 import './Chat.scss';

 //useAuth(a function created in usecontext which we are exporting of authcontext) is going to give us all the data from the context that we can found inside value object also user
 import {useAuth} from '../../contextInfos/AuthContext'

const Chat =()=>{
    const history= useHistory();
    const {user} = useAuth();
    const{loading,setLoading}= useState(true);
    console.log(user)


    const logOut = async () =>{
        await auth.signOut();
        history.push('/')

    }

    const getPicture = async (url) =>{
        const response = await fetch(url);
        //block any type of file like images that you want to transfer over in binary format
        const data = await response.blob();
        return new File ([data],"userPhoto.jpg",{type:'image/jpeg'})


    }
    //function that accept a callback
    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
//if user has already been created
        axios.get(
            'https://api.chatengine.io/users/me/',
            {
            headers:{
                "project-id":process.env.REACT_APP_CHAT_ENGINE_PROJECTID,
                "user-name":user.email,
                "user-secret":user.uid
            }}
        )
        .then (()=>{
            setLoading(false)
        })
        //if we don't already have a chat engine profile
        .catch(e =>{
            let newdata= new FormData();
            newdata.append('email',user.email);
            newdata.append('username',user.email);
            newdata.append('secret',user.uid);

            getPicture(user.photoURL)

            .then((avatar)=>{
                newdata.append('avatar',avatar,avatar.name)

                axios.post(
                    'https://api.chatengine.io/users/',
                newdata,
                { headers:{ "private-key": process.env.REACT_APP_CHAT_ENGINE_POSTKEY }
                }
                )
                .then(()=> setLoading (false))
                .catch((error)=>console.log(error))
                
                
            })


        })

    },[user, history])
    //email is going to be undifined before loading

    if(!user || loading ) return 'Loading... '


    return(
        <div className="chat-p">
            <div className="chat-menu">
                <div className ="logo">
                    MYCHAT
                </div>
                <div 
                onClick ={logOut} className="logout">
                    Log out

                </div>

            </div>
            <ChatEngine
            
            height="calc(100vh-66px)"
            // height="calc(100vh)"

            projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECTID}
            userName={user.email}
            userSecret={user.uid}
            />
           
           

        </div>
    )
}

export default Chat;