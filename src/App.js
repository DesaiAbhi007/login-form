import './App.css';
import Counter from './presentation/Counter';
import CrudOperation from './presentation/CrudOperation';
import Dashboard from './presentation/Dashboard';
import Header from './presentation/Header';
import Login from './presentation/Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <>    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crud" element={<CrudOperation />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;
