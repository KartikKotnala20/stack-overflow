import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from './Actions/question'
import { fetchAllUsers } from './Actions/users'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const [slideIn, setSlideIn] = useState(true)

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false)
    }
  }, [])

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state)
    }
  }

  return (
    <div className='App'>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  )
}

export default App
