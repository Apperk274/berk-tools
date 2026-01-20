import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EtymoDictionary from './pages/EtymoDictionary'

function App() {
  return (
    <div className='tw:min-h-screen tw:bg-linear-to-b tw:from-gray-900 tw:via-gray-800 tw:to-gray-900 tw:p-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etymodictionary" element={<EtymoDictionary />} />
      </Routes>
    </div>
  )
}

export default App
