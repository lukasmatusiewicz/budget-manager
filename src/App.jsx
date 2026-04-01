import Dashboard from './views/Dashboard'
import AppHeader from './components/organisms/AppHeader/AppHeader.jsx'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <AppHeader title="Budget Manager" />
      <Dashboard />
    </div>
  )
}

export default App
