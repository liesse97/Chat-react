import React, { useContext,useState,useEffect} from 'react';
import {useHistory}  from 'react-router-dom';
import {auth} from '../components/firebase'

const AuthContext = React.createContext();

export const useAuth =()=> useContext(AuthContext)
//manage user data
// console.log(useAuth)

//children is going to render all the jsx that i passed of provider

export const AuthProvider=({children}) =>{
    const[loading,setLoading] = useState(true);
    const [user,setUser]= useState(null);

    //renavigate somewhere
    const history=useHistory();

    //we will call useffect when user and history changes(add user or renavigate)
    //grabbed user from firebase authincation
    useEffect(()=>{
        auth.onAuthStateChanged((user) =>{
            setUser(user);
            setLoading(false);
            if(user) history.push('/chat');
        })

    },[user,history]);

    const value = { user};
    return(
        <AuthContext.Provider value={value}>
            
            {!loading && children}

        </AuthContext.Provider>
    )
}



