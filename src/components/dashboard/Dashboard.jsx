import React from 'react'
import { useState, useEffect } from 'react';
import apiData from '../../axiosConfig';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    useEffect(() => {

        // console.log("dddddddddddddddddddddd")
        const token = localStorage.getItem('token'); // Retrieve the token directly as a string
        // console.log("token", token)

        apiData.get("/dashboards", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }

        })
            .then(response => {
                // console.log(response.data); // Log the entire response to understand its structure
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    return (
        <>
            <div className="app-content content ">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        <section id="dashboard-ecommerce">
                            <div className="row match-height">



                                <div className="col-xl-4 col-md-6 col-12">
                                    <div className="card card-congratulation-medal">
                                        <div className="card-body text-center">
                                            <h3>Total Users Count</h3>
                                            <p className="card-text font-small-3"></p>
                                            <h3 className="mb-75 mt-2 pt-50">
                                                {dashboardData && dashboardData.users != null ? dashboardData.users : 0}

                                            </h3>
                                            <Link to="/userlist" className="btn btn-primary waves-effect waves-float waves-light">View Users</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-md-6 col-12">
                               <div className="card card-congratulation-medal">
                                   <div className="card-body text-center">
                                       <h3>New Users Count</h3>
                                       <p className="card-text font-small-3"></p>
                                       <h3 className="mb-75 mt-2 pt-50">
                                       {dashboardData && dashboardData.new_users != null ? dashboardData.new_users : 0}
                                       </h3>
                                       <Link to="/userlist" className="btn btn-primary waves-effect waves-float waves-light">View Users</Link>
                                   </div>
                               </div>
                           </div>

                           <div className="col-xl-4 col-md-6 col-12">
                               <div className="card card-congratulation-medal">
                                   <div className="card-body text-center">
                                       <h3>Jackpot Counts</h3>
                                       <p className="card-text font-small-3"></p>
                                       <h3 className="mb-75 mt-2 pt-50">
                                       {dashboardData && dashboardData.jackpot_counts != null ? dashboardData.jackpot_counts : 0}
                                       </h3>
                                       <Link to="/jackpot-list" className="btn btn-primary waves-effect waves-float waves-light">View Jackpot</Link>
                                   </div>
                               </div>
                           </div>



                           <div className="col-xl-4 col-md-6 col-12">
                               <div className="card card-congratulation-medal">
                                   <div className="card-body text-center">
                                       <h3>KYC Counts</h3>
                                       <p className="card-text font-small-3"></p>
                                       <h3 className="mb-75 mt-2 pt-50">
                                           {dashboardData && dashboardData.kyc_approvals != null ? dashboardData.kyc_approvals : 0}
                                       </h3>
                                       <Link to="/kyc" className="btn btn-primary waves-effect waves-float waves-light">View KYC</Link>
                                   </div>
                               </div>
                           </div>


                           <div className="col-xl-4 col-md-6 col-12">
                               <div className="card card-congratulation-medal">
                                   <div className="card-body text-center">
                                       <h3>Total Payments</h3>
                                       <p className="card-text font-small-3"></p>
                                       <h3 className="mb-75 mt-2 pt-50">
                                           {dashboardData && dashboardData.payments != null ? dashboardData.payments : 0}
                                       </h3>
                                       <Link to="/dashboard" className="btn btn-primary waves-effect waves-float waves-light">View Payments</Link>
                                   </div>
                               </div>
                           </div>


                           <div className="row match-height">
                           <div className="col-lg-12 col-12">
                               <div className="card card-company-table">
                                   <div className="card-body p-0">
                                       <div className="table-responsive">
                                           <table className="table">
                                               <thead>
                                                   <tr>
                                                       <th>Company</th>
                                                       <th>Category</th>
                                                       <th>Views</th>
                                                       <th>Revenue</th>
                                                       <th>Sales</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/toolbox.svg" alt="Toolbar svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Dixons</div>
                                                                   <div className="font-small-2 text-muted">meguc@ruj.io</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-primary me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="monitor" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Technology</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">23.4k</span>
                                                               <span className="font-small-2 text-muted">in 24 hours</span>
                                                           </div>
                                                       </td>
                                                       <td>$891.2</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">68%</span>
                                                               <i data-feather="trending-down" className="text-danger font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/parachute.svg" alt="Parachute svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Motels</div>
                                                                   <div className="font-small-2 text-muted">vecav@hodzi.co.uk</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-success me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="coffee" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Grocery</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">78k</span>
                                                               <span className="font-small-2 text-muted">in 2 days</span>
                                                           </div>
                                                       </td>
                                                       <td>$668.51</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">97%</span>
                                                               <i data-feather="trending-up" className="text-success font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/brush.svg" alt="Brush svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Zipcar</div>
                                                                   <div className="font-small-2 text-muted">davcilse@is.gov</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-warning me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="watch" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Fashion</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">162</span>
                                                               <span className="font-small-2 text-muted">in 5 days</span>
                                                           </div>
                                                       </td>
                                                       <td>$522.29</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">62%</span>
                                                               <i data-feather="trending-up" className="text-success font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/star.svg" alt="Star svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Owning</div>
                                                                   <div className="font-small-2 text-muted">us@cuhil.gov</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-primary me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="monitor" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Technology</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">214</span>
                                                               <span className="font-small-2 text-muted">in 24 hours</span>
                                                           </div>
                                                       </td>
                                                       <td>$291.01</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">88%</span>
                                                               <i data-feather="trending-up" className="text-success font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/book.svg" alt="Book svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Cafés</div>
                                                                   <div className="font-small-2 text-muted">pudais@jife.com</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-success me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="coffee" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Grocery</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">208</span>
                                                               <span className="font-small-2 text-muted">in 1 week</span>
                                                           </div>
                                                       </td>
                                                       <td>$783.93</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">16%</span>
                                                               <i data-feather="trending-down" className="text-danger font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/rocket.svg" alt="Rocket svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Kmart</div>
                                                                   <div className="font-small-2 text-muted">bipri@cawiw.com</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-warning me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="watch" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Fashion</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">990</span>
                                                               <span className="font-small-2 text-muted">in 1 month</span>
                                                           </div>
                                                       </td>
                                                       <td>$780.05</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">78%</span>
                                                               <i data-feather="trending-up" className="text-success font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                                   <tr>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar rounded">
                                                                   <div className="avatar-content">
                                                                       <img src="assets/images/icons/speaker.svg" alt="Speaker svg" />
                                                                   </div>
                                                               </div>
                                                               <div>
                                                                   <div className="fw-bolder">Payers</div>
                                                                   <div className="font-small-2 text-muted">luk@izug.io</div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <div className="avatar bg-light-warning me-1">
                                                                   <div className="avatar-content">
                                                                       <i data-feather="watch" className="font-medium-3"></i>
                                                                   </div>
                                                               </div>
                                                               <span>Fashion</span>
                                                           </div>
                                                       </td>
                                                       <td className="text-nowrap">
                                                           <div className="d-flex flex-column">
                                                               <span className="fw-bolder mb-25">12.9k</span>
                                                               <span className="font-small-2 text-muted">in 12 hours</span>
                                                           </div>
                                                       </td>
                                                       <td>$531.49</td>
                                                       <td>
                                                           <div className="d-flex align-items-center">
                                                               <span className="fw-bolder me-1">42%</span>
                                                               <i data-feather="trending-up" className="text-success font-medium-1"></i>
                                                           </div>
                                                       </td>
                                                   </tr>
                                               </tbody>
                                           </table>
                                       </div>
                                   </div>
                               </div>
                           </div>

                       
                       </div>


                            </div> 
                        </section>
                    </div>
                </div>
            </div>
            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>
        </>
    )
}

export default Dashboard