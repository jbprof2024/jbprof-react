import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom"

import Home from './pages/Home';
import Corsi from './pages/Corsi';
import InfoCorso from './pages/InfoCorso';
import Contatti from './pages/Contatti';
import Login from './pages/Login';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Signup from './pages/Signup';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname != "/header" && location.pathname != "/footer" ? <Navbar /> : null}
      <Routes>
        <Route exact='/' path="/" element={<Home />} />
        <Route exact='corsi' path="corsi" element={<Corsi />} />
        <Route exact='archivio' path="archivio" element={<Corsi />} />
        <Route exact='info' path="info" element={<InfoCorso />} />
        <Route exact='contatti' path="contatti" element={<Contatti />} />
        <Route exact='login' path="login" element={<Login />} />

        <Route exact='error' path="error" element={<Error />} />
        <Route exact='header' path="header" element={<Navbar />} />
        <Route exact='footer' path="footer" element={<Footer />} />

      </Routes>
      {location.pathname != "/header" && location.pathname != "/footer" ? <Footer /> : null}

    

    </div>
  );
}

export default App;
