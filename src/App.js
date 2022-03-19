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
		<Route path="/pjkt3-kangxi11/login" element={<Login/>}/>
		<Route path="/pjkt3-kangxi11/signup" element={<Signup/>}/>
		<Route path="/pjkt3-kangxi11/home" element={<Home/>}/>
		<Route path="/pjkt3-kangxi11/document" element={<Document/>}/>
		<Route
			path="/pjkt3-kangxi11"
			element={<Navigate to="/pjkt3-kangxi11/login" replace />}
		/>
	</Routes>
  );
}

export default App;
