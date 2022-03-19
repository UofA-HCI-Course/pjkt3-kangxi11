import React from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import './Login.css';

export default function Login() {
    let navigate = useNavigate();

    const onLoginClicked = () => {
        navigate("/home");
    }
    
    return (
        <div className="login-container">
            <div className="app-wrapper">
                <div className="account-info">
                    <h2 className="title">
                        Login
                    </h2>
                </div>
                <TextField
                    required
                    className="input"
                    type="username"
                    name="username" 
                    label ="username"
                    variant="standard"
                    margin="normal" 
                />
                <TextField
                    required
                    className="input"
                    name="password" 
                    label ="Password"
                    type="password"
                    variant="standard"
                    margin="normal" 
                />
                <div className="link">
                    <a href="/signup" >
                        {"Don't have an account? Sign Up"}
                    </a>
                    <br/>
                </div>
                <div>
                    <button className="submit-button" onClick={onLoginClicked}>Login</button>
                </div>
            </div>

        </div>
    )
}
