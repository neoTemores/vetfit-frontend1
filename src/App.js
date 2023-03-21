import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import AllRecords from './Components/AllRecords'
import About from './Components/About'
import EditModal from './Components/EditModal'
import { useDispatch, useSelector } from 'react-redux'
import { setRecordsToShow } from './features/recordsToShow'

export const URL = {
  "FETCH_ALL": "https://jsonplaceholder.typicode.com/posts",
  "FETCH_ONE": "https://jsonplaceholder.typicode.com/posts/",
  "DELETE": "https://jsonplaceholder.typicode.com/posts/",
  "PATCH": "https://jsonplaceholder.typicode.com/posts/"
}

const App = () => {
  const dispatch = useDispatch();
  const allRecords = useSelector((state) => state.allRecords.value)
  const startIndex = useSelector((state) => state.startIndex.value)
  const endIndex = useSelector((state) => state.endIndex.value)
  const showModal = useSelector(state => state.showModal.value)
  const showMsg = useSelector(state => state.showMsg.value)
  const msgText = useSelector(state => state.msgText.value)

  useEffect(() => {
    updateRecordsDisplay();
  }, [startIndex, endIndex, allRecords])

  const updateRecordsDisplay = () => {
    dispatch(setRecordsToShow(allRecords.slice(startIndex, endIndex)))
  }

  return (
    <div className="appContainer">
      <Navbar />
      {showMsg && <div className='updateMsgContainer'><h3>{msgText}</h3></div>}
      {showModal && <EditModal />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-records' element={<AllRecords />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
