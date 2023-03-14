import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import AllRecords from './Components/AllRecords'
import IndividualRecord from './Components/IndividualResult'
import About from './Components/About'
import EditModal from './Components/EditModal'


const URL = {
  "FETCH_ALL": "https://jsonplaceholder.typicode.com/posts",
  "FETCH_ALL_BY_ID": "https://jsonplaceholder.typicode.com/posts?userId=",
  "FETCH_ONE": "https://jsonplaceholder.typicode.com/posts/",
  "DELETE": "",
  "PATCH": ""
}

function App() {
  const [allRecordsData, setAllRecordsData] = useState([])
  const [individualRecordData, setIndividualRecordData] = useState([])
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllRecords()
  }, [])

  const fetchAllRecords = async () => {
    const res = await fetch(URL.FETCH_ALL)
    const data = await res.json();
    console.log(data)
    setAllRecordsData(data)
  }

  const fetchAllRecordsByID = async (id) => {
    const res = await fetch(URL.FETCH_ALL_BY_ID + id)
    const data = await res.json();
    setIndividualRecordData(data)
  }
  const fetchIndividualRecord = async (id) => {
    const res = await fetch(URL.FETCH_ONE + id)
    const data = await res.json();
    setIndividualRecordData([data])
  }

  const deleteRecord = async (id) => {
    let deleteReq = {
      method: "DELETE"
    }
    const res = await fetch(URL.DELETE + id, deleteReq)
    console.log(res.status)
  }

  const patchRecord = async (id, patch) => {
    let patchReq = {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    }

    const res = await fetch(URL.PATCH + id, patchReq)
    const data = await res.json();
    console.log(data)
  }


  return (
    <div className="appContainer">
      <Header />
      <Navbar />
      {showModal && <EditModal setShowModal={setShowModal} individualRecordData={individualRecordData} />}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/api/all-records' element={
          <AllRecords allRecordsData={allRecordsData} fetchIndividualRecord={fetchIndividualRecord} setShowModal={setShowModal} />}
        />
        <Route path='/api/individual-record' element={
          <IndividualRecord individualRecordData={individualRecordData} />}
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
