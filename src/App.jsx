import './App.css'
import { Route, Routes } from 'react-router-dom';
import IntroPage from "./IntroPage.jsx";
import HistoricMarketDataAccessPage from "./HistoricMarketDataAccessPage.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<IntroPage/>} />
                <Route path='/marketdata' element={<HistoricMarketDataAccessPage/>} />
            </Routes>
        </div>
    );
}

export default App
