import { BrowserRouter as Router ,Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import Navbar from '../components/Navbar.jsx'
import Home from '../pages/Home.jsx'
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [user,setUser]=useState(null)
  const [error,setError]=useState('');
  const [isLoading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchUser=async()=>{
      const token=localStorage.getItem("token")

      if(token){
        try {
          const res=await axios.get('/api/v1/user/profile',{
            headers:{Authorization: `Bearer ${token}`}
          })
          setUser(res.data.user)

        } catch (error) {
          setError("failed to fetch user data") 
          localStorage.removeItem("token")         
        }
      }
      setLoading(false);
    };
    fetchUser();
  },[])

  if(isLoading){
    return(
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <div className='text-xl text-white'>Loading...</div>

      </div>
    )
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/" element={<Home user={user} error={error}/>}/>
        <Route path="/register" element={user ? <Navigate to='/' />:<Register setUser={setUser}/>}/>
        <Route path='/login' element={user ? <Navigate to='/'/> : <Login setUser={setUser}/>}/>
      </Routes>
    </Router>
  )
}

export default App
