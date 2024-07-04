import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);

    

    useEffect(() => {
        const token = localStorage.getItem('token_data'); // Retrieve the token directly as a string
        console.log("ssssssssssss")
        axios.get("https://staging.premad.in/stucard-web/public/api/v1/profile", {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
            .then(response => {
                console.log(response.data); // Log the entire response to understand its structure
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    console.log(user, "user");

    return (
        <div>
           

            <div className="content-wrapper container-xxl p-0">
                <div className="content-header row">
                    <div className="content-header-left col-md-9 col-12 mb-2">
                        {/* <div className="row breadcrumbs-top">
                            <div className="col-12">
                                <h2 className="content-header-title float-start mb-0">Profile</h2>
                                <div className="breadcrumb-wrapper">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/dashboard" >Home</Link>
                                        </li>
                                        <li className="breadcrumb-item"><a href="#">Pages</a>
                                        </li>
                                        <li className="breadcrumb-item active">Profile
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    
                </div>
                <div className="content-body ">
                    <div id="user-profile">
                        

                       <section id="profile-info">
                            <div className="row">

                            <div className="col-lg-6 col-12 offset-4 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="mb-75">About</h5>
                                        {/* <p className="card-text">
                                            Tart I love sugar plum I love oat cake. Sweet ⭐️ roll caramels I love jujubes. Topping cake wafer.
                                        </p> */}
                                        <div className="mt-2  d-flex">
                                            <h5 className="mb-75">Name:</h5>
                                            <span className="card-text">{user.name}</span>
                                        </div>
                                        <div className="mt-2 d-flex">
                                            <h5 className="mb-75">Email:</h5>
                                            <p className="card-text">{user.email}</p>
                                        </div>
                                        <div className="mt-2 d-flex">
                                            <h5 className="mb-75">Username:</h5>
                                            <p className="card-text">{user.username}</p>
                                        </div>
                                        <div className="mt-2 d-flex">
                                            <h5 className="mb-50">Mobile Number:</h5>
                                            <p className="card-text mb-0">{user.mobile_number}</p>
                                        </div>
                                        <div className="mt-2 d-flex">
                                            <h5 className="mb-50">Country:</h5>
                                            <p className="card-text mb-0">{user.country.name}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                                
                                
                               
                          
                </div>

                
            </section>
        </div>

            </div >
        </div >
        </div >
    );
}

export default Profile;
