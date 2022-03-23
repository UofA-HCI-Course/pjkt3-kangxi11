import { Divider, Typography } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import './Document.css';
import Glossary from './Glossary/Glossary';
import Summary from './Summary/Summary';
import Text from './Text/Text';

export default function Document() {

  let navigate = useNavigate();
  
  const [selected, setSelected] = useState("summary");

  const onSummaryClicked = () => {
    setSelected("summary");
  }

  const onTextClicked = () => {
    setSelected("text");
  }

  const onGlossaryClicked = () => {
    setSelected("glossary");
  }

  const onBookmarksClicked = () => {
    setSelected("bookmarks");
  }

  const onHomeClicked = () => {
    navigate("/pjkt3-kangxi11/home");
}

  return (
    <div className="document-root">
      <div className="document-left">
        <div className="logo-text">Document</div>
        <div
          className={selected === "summary" ? "document-menu-item document-menu-item-selected" : "document-menu-item"}
          onClick={onSummaryClicked}>
          Summary
        </div>
        <div
          className={selected === "text" ? "document-menu-item document-menu-item-selected" : "document-menu-item"}
          onClick={onTextClicked}>
          Text
        </div>
        <div
          className={selected === "glossary" ? "document-menu-item document-menu-item-selected" : "document-menu-item"}
          onClick={onGlossaryClicked}>
          Glossary
        </div>
        <div
          className={selected === "bookmarks" ? "document-menu-item document-menu-item-selected" : "document-menu-item"}
          onClick={onBookmarksClicked}>
          Bookmarks
        </div>
        <div>
          <button className="home-button" onClick={onHomeClicked}>Home</button>
      </div>
      </div>

      <div className="document-right">
        <Typography variant="h6">
          Title
        </Typography>
        <Typography variant="h4">
          Wealth of Nations
        </Typography>

        <Divider style={{ marginBlock: '16px' }} />

        {selected === "text" && <Text />}
        {selected === "glossary" && <Glossary/>}
        {selected === "summary" && <Summary />}
      </div>
    </div>
  )
}
