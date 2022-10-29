import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) =>{
  
    if(!currentUser){
      return <Navigate to ="/login"/>
    }
    return children
  }

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" >
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
               } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
