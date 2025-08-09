import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Add this line
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Add this wrapper */}
      <App />
    </AuthProvider> {/* Add this wrapper */}
  </React.StrictMode>,
)