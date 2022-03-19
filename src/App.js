import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Home from './containers/Home/Home';
import Document from './containers/Document/Document';

function App() {
  return (
	<Routes>
		<Route exact path="/login" element={<Login/>}/>
		<Route exact path="/signup" element={<Signup/>}/>
		<Route exact path="/home" element={<Home/>}/>
		<Route exact path="/document" element={<Document/>}/>
		<Route
			path="/"
			element={<Navigate to="/login" replace />}
		/>
	</Routes>
  );
}

export default App;
