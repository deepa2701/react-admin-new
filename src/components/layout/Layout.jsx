import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

function Layout() {
    return (
        <div>
          <Header/>
          <Sidebar/>
          <main>
            <Outlet /> {/* This is where the nested routes will be rendered */}
          </main>
          {/* <footer>
            <p>© 2023 My App</p>
          </footer> */}
        </div>
      );
}



export default Layout