import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import AllRecords from './Components/AllRecords'
import About from './Components/About'
import EditModal from './Components/EditModal'


const URL = {
  "FETCH_ALL": "https://jsonplaceholder.typicode.com/posts",
  "FETCH_ALL_BY_ID": "https://jsonplaceholder.typicode.com/posts?userId=",
  "FETCH_ONE": "https://jsonplaceholder.typicode.com/posts/",
  "DELETE": "https://jsonplaceholder.typicode.com/posts/",
  "PATCH": "https://jsonplaceholder.typicode.com/posts/"
}

const App = () => {
  const [allRecordsData, setAllRecordsData] = useState([])
  const [individualRecordData, setIndividualRecordData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [msgText, setMsgText] = useState("")
  const [recordsToShow, setRecordsToShow] = useState([])
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    updateRecordsDisplay();
  }, [allRecordsData, startIndex, endIndex])

  const updateRecordsDisplay = () => {
    setRecordsToShow(allRecordsData.slice(startIndex, endIndex))
  }
  const fetchAllRecords = async () => {
    const res = await fetch(URL.FETCH_ALL)
    const data = await res.json();
    setAllRecordsData(data)
  }

  const fetchIndividualRecord = async (id) => {
    const res = await fetch(URL.FETCH_ONE + id)
    const data = await res.json()
    setIndividualRecordData([data])
  }

  const deleteRecord = async (id) => {
    let deleteReq = {
      method: "DELETE"
    }
    const res = await fetch(URL.DELETE + id, deleteReq)
    // console.log(res.status)
    res.ok && displayMsg(`Successfully Deleted Record # ${id}`)
  }

  const patchRecord = async (id, patch) => {
    let patchReq = {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    }

    const res = await fetch(URL.PATCH + id, patchReq)

    updateRecordsDisplay()
    res.ok && displayMsg(`Successfully Updated Record # ${id}`)
  }

  const displayMsg = (text) => {
    window.scroll(0, 0)
    setMsgText(text)
    setShowMsg(true)
    setTimeout(() => {
      setShowMsg(false)
    }, 3000)
  }

  return (
    <div className="appContainer">
      <Header />
      <Navbar />

      {showMsg && <div className='updateMsgContainer'><h3>{msgText}</h3></div>}

      {showModal &&
        <EditModal
          setShowModal={setShowModal}
          individualRecordData={individualRecordData}
          setAllRecordsData={setAllRecordsData}
          deleteRecord={deleteRecord}
          patchRecord={patchRecord} />}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/all-records'
          element={
            <AllRecords
              fetchAllRecords={fetchAllRecords}
              recordsToShow={recordsToShow}
              fetchIndividualRecord={fetchIndividualRecord}
              setShowModal={setShowModal}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              endIndex={endIndex}
              setEndIndex={setEndIndex}
              allRecordsLength={allRecordsData.length}
              setShowMsg={setShowMsg}
            />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
