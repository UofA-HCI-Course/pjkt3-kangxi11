import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import './Home.css';

export default function Home() {

  let navigate = useNavigate();

  const [selected, setSelected] = useState("documents");

  const onDocumentsClicked = () => {
    setSelected("documents");
  }

  const onCloudClicked = () => {
    setSelected("cloud");
  }

  const onSettingsClicked = () => {
    navigate("/pjkt3-kangxi11/login");
  }

  const onLogoutClicked = () => {
    navigate("/pjkt3-kangxi11/login");
  }

  return (
    <div className="home-root">
      <div className="home-left">
        <div className="logo-text">Synthesizer</div>
        <div
          className={selected === "documents" ? "home-menu-item home-menu-item-selected" : "home-menu-item"}
          onClick={onDocumentsClicked}
        >
          Documents
        </div>
        <div
          className={selected === "cloud" ? "home-menu-item home-menu-item-selected" : "home-menu-item"}
          onClick={onCloudClicked}
        >
          Word Cloud
        </div>
        <div>
          <button className="settings-button" onClick={onSettingsClicked}>Settings</button>
        </div>
        <div>
          <button className="logout-button" onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    </div>
  )
}
