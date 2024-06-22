import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item me-auto"><Link to="/" className="navbar-brand" ><span className="brand-logo">
                            <h2 className="brand-text">JackPot Pro</h2>

                        </span>
                        </Link></li>
                        <li className="nav-item nav-toggle"><a className="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"><i className="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></a></li>
                    </ul>
                </div>
                <div className="shadow-bottom"></div>
                <div className="main-menu-content">
                    <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                        <li className=" nav-item"><Link to="/" className="d-flex align-items-center"><i data-feather="home"></i><span className="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span>
                        </Link>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="file-text"></i><span className="menu-title text-truncate" data-i18n="Invoice">User Master</span></a>
                            <ul className="menu-content">
                                <li><Link to="/userlist" className="d-flex align-items-center" ><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="List">User List</span></Link>
                                </li>
                                <li><Link to="/userdetails" className="d-flex align-items-center" ><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Preview">User Detail</span></Link>
                                </li>

                            </ul>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="shield"></i><span className="menu-title text-truncate" data-i18n="Roles &amp; Permission">Jackpot Master</span></a>
                            <ul className="menu-content">
                                <li><Link to="/create-jackpot" className="d-flex align-items-center" ><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Roles">Create Jackpot</span></Link>
                                </li>
                                <li><Link to="/list-jackpot" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Permission">Jackpot List</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="shopping-cart"></i><span className="menu-title text-truncate" data-i18n="eCommerce">Result Master</span></a>
                            <ul className="menu-content">
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Shop">Jackpot Result</span></Link>
                                </li>
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Details">Random</span></Link>
                                </li>
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Wish List">Winner List</span></Link>
                                </li>

                            </ul>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="user"></i><span className="menu-title text-truncate" data-i18n="User">Setting</span></a>
                            <ul className="menu-content">
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="List">Help & Support </span></Link>
                                </li>
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="View">About Us</span></Link>

                                </li>
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="List">Refund Policy </span></Link>
                                </li>
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="List">Terms & Conditions </span></Link>
                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="file-text"></i><span className="menu-title text-truncate" data-i18n="Pages">Notification Master</span></a>
                            <ul className="menu-content">
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Account Settings">Notification</span></Link>

                                </li>
                            </ul>
                        </li>
                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="user-check"></i><span className="menu-title text-truncate" data-i18n="Authentication">Verification KYC</span></a>
                            <ul className="menu-content">
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Login">KYC Verification</span></Link>
                                </li>

                            </ul>
                        </li>

                        <li className=" nav-item"><a className="d-flex align-items-center"><i data-feather="user-check"></i><span className="menu-title text-truncate" data-i18n="Authentication">Image Banner</span></a>
                            <ul className="menu-content">
                                <li><Link to="/" className="d-flex align-items-center"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Login">Add Image Banner</span></Link>
                                </li>

                            </ul>
                        </li>


                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar