import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
// import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import {AuthProvider} from "./contextInfos/AuthContext"
import Login from "./components/Login/Login";
import Chat from "./components/chat/Chat"

// obs: switch is not working!!!

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        < Switch>
        {/* <Route path= "/" component ={Login} /> */}
        <Route path= "/chat" component ={Chat} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
