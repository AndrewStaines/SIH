
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Knowledge from './components/Knowledge';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/know' element={<Knowledge />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;