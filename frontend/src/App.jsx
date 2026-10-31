

import React from 'react'
import {  Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Footer from './components/Footer/Footer'
import Contact from './Pages/Contact/Contact'
import Conditionwetreat from "./Pages/Conditionwetreat/Conditionwetreat";
import Membership from './Pages/Membership/Membership';
import Bookappoin from './Pages/Bookappoin/Bookappoin';
import PatientHistory from './Pages/PatientHistory/PatientHistory';
import PatientRecord from './Pages/PatientRecord/PatientRecord'
import Scroll from './components/Scrollbar/Scroll'
const App = () => {
  return (
  <>
      <Navbar />
<Scroll/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/condition-we-treat' element={<Conditionwetreat/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/our-membership' element={<Membership/>}/>
 <Route path='/book-appointment' element={<Bookappoin/>}/>
 <Route path='/patient-history' element={<PatientHistory/>}/>
  <Route path='/patient-records' element={<PatientRecord/>}/>

      </Routes>

      <Footer />
   </> 
  )
}

export default App
