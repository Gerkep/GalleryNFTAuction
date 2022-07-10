import React, { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {auth, registerWithEmailAndPassword, signInWithGoogle} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/MainNavbar";
import "../style/login.css"
import history from "../history";

const LoginPage = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <Navbar />
      <div className="login-container">
        <button className=" button login-btn login-google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;