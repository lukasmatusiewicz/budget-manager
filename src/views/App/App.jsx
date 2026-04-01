import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../../components/organisms/AppHeader/AppHeader';
import NavBar from '../../components/organisms/NavBar/NavBar';
import Dashboard from '../../views/Dashboard/Dashboard.jsx';
import Transactions from '../../views/Transactions/Transactions.jsx';
import Reports from '../../views/Reports/Reports.jsx';
import Settings from '../../views/Settings/Settings.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <AppHeader title="Budget Manager" />
                <NavBar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
