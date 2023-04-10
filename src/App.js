import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Admin from './components/admin';
import Main from './components/main';
import Login from './components/main/Login';
import Register from './components/main/Register';
import User from './components/user';
import CodeGenerator from './components/user/CodeGenerator';
import CodeBrowser from './components/user/CodeBrowser';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/user/generator" />} />
            <Route path='admin' element={<Admin />} >
              {/* <Route path='managegames' element={<ManageGames />}  /> */}
            </Route>
            <Route path='user' element={<User />} >
              <Route path="generator" element={<CodeGenerator />} />
              <Route path="browser" element={<CodeBrowser />} />
            </Route>
            <Route path='main' element={<Main />} >
              <Route path='login' element={<Login />}  />
              <Route path='signup' element={<Register />}  />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
