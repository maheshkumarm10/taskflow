import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import DashboardPage from './pages/dashboard'
import MyTasksPage from './pages/mytasks'
import AllTasksPage from './pages/alltasks'
import CoreModulesPage from './pages/CoreModules'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mytasks" element={<MyTasksPage />} />
        <Route path="/alltasks" element={<AllTasksPage />} />
        <Route path="/core-modules" element={<CoreModulesPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
