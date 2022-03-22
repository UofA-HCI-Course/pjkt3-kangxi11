import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

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

  function createData(title, subtitle, dateViewed) {
    return { title, subtitle, dateViewed };
  }

  const rows = [
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020'),
    createData('A Brave New World', 'Book', '01/01/2020')
  ];

  const onSettingsClicked = () => {
    navigate("/pjkt3-kangxi11/login");
  }

  const onLogoutClicked = () => {
    navigate("/pjkt3-kangxi11/login");
  }

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'subtitle', label: 'Subtitle', minWidth: 100 },
    { id: 'dateViewed', label: 'Date Viewed', minWidth: 100 }
  ];

  const onRowClicked = (row) => {
    console.log(rows[row]);
    navigate("/pjkt3-kangxi11/document");
  }

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: new go.GraphLinksModel(
            {
              linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            })
        });
  
    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: true },  // some room around the text
          new go.Binding('text').makeTwoWay()
        )
      );
  
    return diagram;
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
      <div className="home-right">
        {
          selected === "documents" 
            ? <div>
                <Input placeholder="Search" fullWidth/>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .map((row, i) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={i} onClick={() => onRowClicked(i)}>
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
            : <div>
                <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName='diagram-component'
                  nodeDataArray={[
                    { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                    { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                    { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                    { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                  ]}
                  linkDataArray={[
                    { key: -1, from: 0, to: 1 },
                    { key: -2, from: 0, to: 2 },
                    { key: -3, from: 1, to: 1 },
                    { key: -4, from: 2, to: 3 },
                    { key: -5, from: 3, to: 0 }
                  ]}
                  onModelChange={() => {}}
                />
            </div>
        }
      </div>
    </div>
  )
}
