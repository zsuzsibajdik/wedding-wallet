import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SignInProvider } from './components/SignInProvider.jsx'

createRoot(document.getElementById('root')).render(
<SignInProvider>
  <StrictMode>
    <App />
  </StrictMode>
</SignInProvider>
)
