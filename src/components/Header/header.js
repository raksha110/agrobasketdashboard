import React from "react"
import { logout } from "../../services/auth";
import "../../styles/style.css"

const Header = () => {

  const logoutHandler = (e) =>{
    e.preventDefault();
    logout();
    if (window) {
      window.location.reload();
    }
  }

  return (
    <section class="bg-white">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-md navbar-light">
          <a class="navbar-brand page-scroll" href="/dashboard">
            <img src="/images/logo.png" height="50"/>
          </a>
          <button onClick={logoutHandler} class="ml-auto btn btn-primary py-2 px-4 font-weight-bold">
            Logout
          </button>
        </nav>
      </div>
    </section>
  )
}

export default Header
