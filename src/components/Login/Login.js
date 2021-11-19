import{ GoogleOutlined,FacebookOutlined} from '@ant-design/icons'
// import "firebase/app";
import 'firebase/compat/app';
import firebase from 'firebase/compat/app'; //v9
import './Login.scss';

import {auth} from '../firebase';

export default function Login() {
    return (
        <div className="login">
            <h2> Welcome to MyChat !</h2>

<div className="login-google"
onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
>            
<GoogleOutlined /> Sign in with Google
</div>

<div className="login-facebook"
onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}

>            
<FacebookOutlined /> Sign in with Facebook
</div>
        </div>
    )
}

