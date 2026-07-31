import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Now correctly points to App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)