import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import AllRecords from './Components/AllRecords'
import IndividualRecord from './Components/IndividualResult'
import About from './Components/About'


const URL = {
  "FETCH_ALL": "https://jsonplaceholder.typicode.com/posts",
  "FETCH_ONE": "https://jsonplaceholder.typicode.com/posts?userId=",
  "DELETE": "",
  "PATCH": ""
}

function App() {
  const [allRecordsData, setAllRecordsData] = useState([])
  const [individualRecordData, setIndividualRecordData] = useState([])

  useEffect(() => {
    fetchAllRecords()
  }, [])

  const fetchAllRecords = async () => {
    const res = await fetch(URL.FETCH_ALL)
    const data = await res.json();
    setAllRecordsData(data)
  }

  const fetchIndividualRecord = async (id) => {
    const res = await fetch(URL.FETCH_ONE + id)
    const data = await res.json();
    setIndividualRecordData(data)
  }

  const deleteRecord = async (id) => {
    const res = await fetch(URL.DELETE + id)
    const data = await res.json();
  }

  const patchRecord = async (id) => {
    const res = await fetch(URL.PATCH + id)
    const data = await res.json();
  }


  return (
    <div className="appContainer">
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/api/all-records' element={<AllRecords allRecordsData={allRecordsData} fetchIndividualRecord={fetchIndividualRecord} />} />
        <Route path='/api/individual-record' element={<IndividualRecord individualRecordData={individualRecordData} />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </div>
  );
}

export default App;
