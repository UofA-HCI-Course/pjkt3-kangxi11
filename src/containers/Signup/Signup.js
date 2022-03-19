import React from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import '../Login/Login.css';

export default function Signup() {
    let navigate = useNavigate();

    const onSignupClicked = () => {
        navigate("/pjkt3-kangxi11/login");
    }
    
    return (
        <div className="login-container">
            <div className="app-wrapper">
                <div className="account-info">
                    <h2 className="title">
                        Sign Up
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
                <div>
                    <TextField
                        required
                        className="input"
                        name="password" 
                        label ="Re-enter Password"
                        type="password"
                        variant="standard"
                        margin="normal" 
                    />
                </div>
                <div className="link" onClick={onSignupClicked}>
                    {"Already have an account? Login"}
                </div>
                <div>
                    <button className="submit-button" onClick={onSignupClicked}>Sign Up</button>
                </div>
            </div>

        </div>
    )
}
