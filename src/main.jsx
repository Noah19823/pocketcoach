import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminDashboard from './screens/AdminDashboard.jsx'
import './index.css'

const root = document.getElementById('root')
const isDashboard = window.location.pathname === '/dashboard'

if (isDashboard) {
  root.style.display = 'block'
  root.style.alignItems = 'unset'
  root.style.justifyContent = 'unset'
  root.style.background = 'var(--bg-primary)'
  document.body.style.background = 'var(--bg-primary)'
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {isDashboard ? <AdminDashboard /> : <App />}
  </React.StrictMode>,
)
