import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
    </div>
  )
}
