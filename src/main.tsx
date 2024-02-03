import React from 'react'
import ReactDOM from 'react-dom/client'

import {ModalProvider} from './components/Modal/ModalProvider.tsx'
import App from './App.tsx'

import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <App/>
    </ModalProvider>
  </React.StrictMode>
)
