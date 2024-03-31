import Swal from 'sweetalert2'
import { Outlet, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate()

  function handlerPage(e,page){
    e.preventDefault()
    navigate(page)
  }

  function handlerLogout(){
    localStorage.removeItem('access_token')
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success Log Out!",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/login')
  }

  return(
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">

  <div className="container-fluid" style={{fontFamily:'cursive'}}>
    <img src="/paw.png" style={{width:'40px', margin:'0px 15px'}}/>

    <a className="navbar-brand" style={{marginRight:'auto'}}>My Pet</a>

    <div id="navbarNav" style={{marginRight:'50px'}}>
      <ul className="navbar-nav">
        <li className="nav-item" style={{margin:'0px 5px'}}>
          <a className="nav-link active" aria-current="page" href="" onClick={(e)=>handlerPage(e,'/')}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="" style={{margin:'0px 5px'}}onClick={(e)=>handlerPage(e,'/communities')}>Communities</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="" style={{margin:'0px 5px'}}onClick={(e)=>handlerPage(e,'/myCommunities')}>My Community</a>
        </li>
        <li className="nav-item">
          <a href="">
          <i className="bi bi-person" style={{margin:'0px 10px',fontSize:'25px'}} onClick={(e)=>handlerPage(e,'/user')}></i>
          </a>
        </li>
      </ul>
    </div>

    <div style={{margin:'0px 10px'}}>
      <button type="button" className="btn btn-danger" onClick={handlerLogout}>Log Out</button>
    </div>
    
  </div>

</nav>
<Outlet/>
    </>
  )
}