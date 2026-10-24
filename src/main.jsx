import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './temas.css'
import './temas-efeitos.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
