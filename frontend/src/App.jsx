import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [user,setUser]=useState(null)
  const [error,setError]=useState('');

  useEffect(()=>{
    const fetchUser=async()=>{
      const token=localStorage.getItem("token")

      if(token){
        try {
          const res=await axios.get('/api/v1/user/profile',{
            headers:{Authorization: `Bearer ${token}`}
          })
          setUser(res.data)

        } catch (error) {
          setError("failed to fetch user data") 
          localStorage.removeItem("token")         
        }
      }
    };
    fetchUser();
  },[])

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
