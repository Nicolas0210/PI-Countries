import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from '../src/components/LandingPage/Landing'
import HomePage from '../src/components/HomePage/HomePage'
import CountryDetail from '../src/components/CountryDetails/CountryDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/country/:id" element={<CountryDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
