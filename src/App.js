import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup';
import Signin from './components/signin';
import Dashboard from './components/dashbord';
import Update from './components/update';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/Update/:id' element={<Update/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
