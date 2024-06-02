import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import Dashboard from './component/Dashboard/Dashboard';
import Analytics from './component/Analytics/Analytics';
import QuestionAnalysis from './component/QuestionAnalysis/QuestionAnalysis';
import ProtectedRoute from './component/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
    <Routes>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/" element={<ProtectedRoute Component={Dashboard} />}></Route>
      <Route path="quiz/:quizId" element={<QuizPage/>}></Route>
      <Route path="/analytic"  element={<ProtectedRoute Component={Analytics} />}></Route>
      <Route path="/analytic/:quizId" element={<ProtectedRoute Component={QuestionAnalysis} />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
