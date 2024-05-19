import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
