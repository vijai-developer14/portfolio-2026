import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        {/* protect route */}
        {/* <Route element={<ProtectedRoute/>}> */}
          <Route path='/admin' element={<Admin/>}/>
        {/* </Route> */}

        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
