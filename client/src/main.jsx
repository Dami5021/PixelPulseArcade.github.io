import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.scss'

//TODO: make dark mode switch to bg-dark (might need context)
const bgStyle = {
    backgroundImage: "url(/bg-light.png)",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed'
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <div id={'bg'} style={bgStyle} className={'overflow-scroll z-n1'}>
          <App />
      </div>
  </React.StrictMode>,
)
