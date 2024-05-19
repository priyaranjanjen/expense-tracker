// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './pages/home/home'

import { SnackbarProvider } from 'notistack'

function App() {

  return (
    <>
    <SnackbarProvider>
      <Home/>
    </SnackbarProvider>
    </>
  )
}

export default App
