import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
    return (
        <div className='w-screen h-screen'>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/chat" element={<Home/>}/>
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
