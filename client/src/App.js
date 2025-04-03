import React, { Fragment } from 'react'
import Home from './components/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import Portfolio from './components/Portfolio'
import CompaniesCatlog from './components/CompaniesCatlog'
import DematAccount from './components/DematAccount'
import CreateDemat from './components/CreateDemat'
import Budget from './components/Budget'
import Learn from './components/Learn'
import Dashboard from './components/Dashboard'
import Market from './components/Market'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
        <Route path="/portfolio" element={<Portfolio/>}></Route>
        <Route path="/catlog" element={<CompaniesCatlog/>}></Route>
        <Route path="/demataccount" element={<DematAccount/>}></Route>
        <Route path="/createdemat" element={<CreateDemat/>}></Route>
        <Route path="/budget" element={<Budget/>}></Route>
        <Route path="/learn" element={<Learn/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/market" element={<Market/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App