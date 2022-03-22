import React, {useState} from 'react';

import './Home.css';

export default function Home() {

  const [selected, setSelected] = useState("documents");

  const onDocumentsClicked = () => {
    setSelected("documents");
  }

  const onCloudClicked = () => {
    setSelected("cloud");
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
      </div>
    </div>
  )
}
