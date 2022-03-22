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
  const [nodeDataArray, setNodeDataArray] = useState([
          { key: 0, text: 'Biology', color: 'lightblue'},
          { key: 1, text: 'Neuroscience', color: 'lightblue'},
          { key: 2, text: 'Biochemistry', color: 'lightblue'},
          { key: 3, text: 'Muscular System', color: 'lightblue'}
        ]);
  const [linkDataArray, setLinkDataArray] = useState();

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
              linkKeyProperty: 'key'
            })
        });
  
    // define a simple Node template
    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle",
          {
            stroke: null,
            portId: "",
            cursor: "pointer",
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 6, font: "18px sans-serif" },
          new go.Binding("text"))
      );
    
    diagram.linkTemplate =
      $(go.Link,
        {
          // allow the user to reconnnect existing links:
          relinkableFrom: true, relinkableTo: true,
          // draw the link path shorter than normal,
          // so that it does not interfere with the appearance of the arrowhead
          toShortLength: 2
        },
        $(go.Shape,
          { strokeWidth: 2 }),
        $(go.Shape,
          { toArrow: "Standard", stroke: null }),
        $(go.Panel, "Auto",
          $(go.Shape,  // the label background, which becomes transparent around the edges
            {
              fill: "white",
              stroke: null
            }),
          $(go.TextBlock, "transition",  // the label text
            {
              textAlign: "center",
              font: "9pt helvetica, arial, sans-serif",
              width: 100,
              margin: 4,
              editable: true  // enable in-place editing
            },
            // editing the text automatically updates the model data
            new go.Binding("text").makeTwoWay())
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
                  nodeDataArray={nodeDataArray}
                  linkDataArray={linkDataArray}
                  onModelChange={() => {}}
                />
            </div>
        }
      </div>
    </div>
  )
}
