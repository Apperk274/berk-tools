import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EtymoDictionary from './pages/EtymoDictionary'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/etymodictionary" element={<EtymoDictionary />} />
    </Routes>
  )
}

export default App
