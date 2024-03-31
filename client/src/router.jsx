import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Communities from './pages/Communities'
import MyCommunity from './pages/MyCommunities'
import Profile from './pages/Profile'
import Post from './pages/Post'
import AddPost from './pages/AddPost'
import AddCommunity from './pages/AddCommunity'
import Register from './pages/Register'

const router = createBrowserRouter([
    {path:'/', element:<Navbar/>,
        loader:()=>{
            if(!localStorage.access_token){
                return redirect('/login')
            }
            return null
        },
        children:[
            {path:'', element:<Home/>},
            {path:'/communities', element:<Communities/>},
            {path:'/myCommunities', element:<MyCommunity/>},
            {path:'/communities/:id', element:<Post/>},
            {path:'/community', element:<AddCommunity/>},
            {path:'/post/:id', element:<AddPost/>},
            {path:'/user', element:<Profile/>},
        ]
    },
    {path:'/login', element:<Login/>,
        loader:()=>{
            if(localStorage.access_token){
                return redirect('/')
            }
            return null
        }
    },
    {path:'/register', element:<Register/>}
])
export default router