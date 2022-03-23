import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './Home.css';

export default function Home() {

  let navigate = useNavigate();

  const [selected, setSelected] = useState("documents");
  const [nodeDataArray, setNodeDataArray] = useState([
    { key: 0, text: 'A Brave New World', color: 'lightblue', loc: '-100 -300'},
    { key: 1, text: 'Criminology', color: 'lightblue', loc: '150 -100'},
    { key: 2, text: 'Social Psychology', color: 'lightblue', loc: '100 100'},
    { key: 3, text: '20th Century Witchcraft', color: 'lightblue', loc: '200 300'},
    { key: 4, text: 'String Theories', color: 'lightblue', loc: '400 -200'},
    { key: 5, text: 'Crime and Society', color: 'lightblue', loc: '400 50'},
    { key: 6, text: 'Correlates of Crime', color: 'lightblue', loc: '50 400'}
  ]);
  const [linkDataArray, setLinkDataArray] = useState([
    { key: -1, from: 4, to: 1, text: 'Crime is caused by strains in society between groups'},
    { key: -2, from: 5, to: 1, text: 'Explanations on how society produces crime' },
    { key: -3, from: 2, to: 1, text: 'Social explanations on the cause of crime' },
    { key: -4, from: 0, to: 1, text: 'Novel on dystopian future and its evolution on crime' },
    { key: -5, from: 3, to: 5, text: 'Crime is explained by supernatural forces' },
    { key: -6, from: 3, to: 2, text: 'Social stigmas create widespread fear' },
  ]);

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
    createData('Correlates of Crime', 'Criminology', '23/03/2022'),
    createData('A Brave New World', '', '20/03/2022'),
    createData('Criminology', 'A Canadian Perspective', '19/03/2022'),
    createData('Social Psychology', 'Individual & Social Behavior', '26/02/2022'),
    createData('20th Century Witchcraft', 'Sociology', '15/02/2022'),
    createData('String Theories', 'Criminology', '14/02/2022'),
    createData('Crime and Society', 'Criminology', '14/02/2022')
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

  const modelChanged = (e) => {
    console.log(e);
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
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
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

  const actions = [
    { icon: <SaveIcon />, name: 'Import' },
  ];  

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
          {/* <button className="settings-button" onClick={onSettingsClicked}>Settings</button> */}
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
                  <SpeedDial
                    ariaLabel="Add New Document"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={onRowClicked}
                      />
                    ))}
                  </SpeedDial>
                </div>
            : <div>
                <ReactDiagram
                  initDiagram={initDiagram}
                  divClassName='diagram-component'
                  nodeDataArray={nodeDataArray}
                  linkDataArray={linkDataArray}
                  onModelChange={modelChanged}
                />
                <p>
                  Click and drag nodes to move
                </p>
                <p>
                  Click and drag from the edge of a node to another node to create a new link
                </p>
                <p>
                  Double click a link's text to modify
                </p>
            </div>
        }
      </div>
    </div>
  )
}
