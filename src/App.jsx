import React from "react"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<div>base page</div>} />
      <Route path="/login" element={<div>Login page</div>} />
      <Route path="/test" element={<div>test page</div>} />
    </Routes>
    </BrowserRouter>
      <Navbar />
    </>
  )
}

export default App
