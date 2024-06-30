import React, { useState } from 'react';
import apiData from '../../../axiosConfig';

function CreateJackpot() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    starting_date: '',
    prize_pool: '',
    join_count: '',
    prize: '',
    wining_amount: '',
    first_place: '',
    second_place: '',
    third_place: '',
    fourth_place: '',
    fifth_place: '',
    sixth_to_tenth_place: '',
    eleventh_to_twenty_place: '',
    twenty_one_to_thirty_place: '',
    thirty_one_to_forty_place: '',
    forty_one_to_fifty_place: '',
    fifty_one_to_one_hundred_place: '',
    one_hundred_one_to_five_hundred_place: '',
    five_hundred_one_to_thousand_place: '',
    one_thousand_one_to_two_thousand_place: '',
    two_thousand_one_to_three_thousand_place: '',
    three_thousand_one_to_four_thousand_place: '',
    four_thousand_one_to_five_thousand_place: '',
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('token');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        [name]: files[0], // Handle file input separately
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await apiData.post('/create-jackpot', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure token is defined
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Data successfully submitted!'); // Set success message
      console.log('response', response);
    } 
    catch (error) {

      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;

        // console.log("aaa",apiErrors);
      
        let updatedErrors = {};
        for (let key in apiErrors) {
            console.log(apiErrors[key]);
          updatedErrors[key] = apiErrors[key]; // Assuming errors are returned as arrays
        }
        setErrors(updatedErrors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row">
            <div className="content-header-left col-md-9 col-12 mb-2">
              <div className="row breadcrumbs-top">
                <div className="col-12">
                  <h2 className="content-header-title float-start mb-0">Add Jackpot</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="basic-horizontal-layouts">
              <div className="row">
                <div className="col-md-12 col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Create Jackpot</h4>
                    </div>
                    <div className="card-body">
                      <form className="form form-horizontal" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="jackpotName">Jackpot Name</label>
                              <div className="input-group input-group-merge">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              
                              </div>
                              {errors.name && <div className="validation_error_message" style={{ color: 'red' }}>{errors.name}</div>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="jackpotName">Image</label>
                              <div className="input-group input-group-merge">
                                <input
                                  className="form-control"
                                  type="file"
                                  id="image"
                                  name="image"
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.image && <span className="validation_error_message" style={{ color: 'red' }}>{errors.image}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="date">Description</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.description && <span className="validation_error_message" style={{ color: 'red' }}>{errors.description}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="prizePool">Starting Date</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="starting_date"
                                  name="starting_date"
                                  value={formData.starting_date}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.starting_date && <span className="validation_error_message" style={{ color: 'red' }}>{errors.starting_date}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="status">Prize Pool</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="prize_pool"
                                  name="prize_pool"
                                  value={formData.prize_pool}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.prize_pool && <span className="validation_error_message" style={{ color: 'red' }}>{errors.prize_pool}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Join Count</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="join_count"
                                  className="form-control"
                                  name="join_count"
                                  value={formData.join_count}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.join_count && <span className="validation_error_message" style={{ color: 'red' }}>{errors.join_count}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Prize</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="prize"
                                  className="form-control"
                                  name="prize"
                                  value={formData.prize}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.prize && <span className="validation_error_message" style={{ color: 'red' }}>{errors.prize}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Winning Amount</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="wining_amount"
                                  className="form-control"
                                  name="wining_amount"
                                  value={formData.wining_amount}
                                  onChange={handleChange}
                                />
                                
                              </div>
                              {errors.wining_amount && <span className="validation_error_message" style={{ color: 'red' }}>{errors.wining_amount}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">First Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="first_place"
                                  className="form-control"
                                  name="first_place"
                                  value={formData.first_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.first_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.first_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Second Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="second_place"
                                  className="form-control"
                                  name="second_place"
                                  value={formData.second_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.second_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.second_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Third Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="third_place"
                                  className="form-control"
                                  name="third_place"
                                  value={formData.third_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.third_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.third_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Fourth Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="fourth_place"
                                  className="form-control"
                                  name="fourth_place"
                                  value={formData.fourth_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.fourth_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.fourth_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Fifth Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="fifth_place"
                                  className="form-control"
                                  name="fifth_place"
                                  value={formData.fifth_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.fifth_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.fifth_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Sixth To Tenth Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="sixth_to_tenth_place"
                                  className="form-control"
                                  name="sixth_to_tenth_place"
                                  value={formData.sixth_to_tenth_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.sixth_to_tenth_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.sixth_to_tenth_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Eleventh To Twenty Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="eleventh_to_twenty_place"
                                  className="form-control"
                                  name="eleventh_to_twenty_place"
                                  value={formData.eleventh_to_twenty_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.eleventh_to_twenty_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.eleventh_to_twenty_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Twenty One To Thirty Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="twenty_one_to_thirty_placewinning_amount"
                                  className="form-control"
                                  name="twenty_one_to_thirty_place"
                                  value={formData.twenty_one_to_thirty_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.twenty_one_to_thirty_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.twenty_one_to_thirty_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Thirty One To Forty Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="thirty_one_to_forty_place"
                                  className="form-control"
                                  name="thirty_one_to_forty_place"
                                  value={formData.thirty_one_to_forty_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.thirty_one_to_forty_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.thirty_one_to_forty_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Forty One To Fifty Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="forty_one_to_fifty_place"
                                  className="form-control"
                                  name="forty_one_to_fifty_place"
                                  value={formData.forty_one_to_fifty_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.forty_one_to_fifty_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.forty_one_to_fifty_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Fifty One To One Hundred Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="fifty_one_to_one_hundred_place"
                                  className="form-control"
                                  name="fifty_one_to_one_hundred_place"
                                  value={formData.fifty_one_to_one_hundred_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.fifty_one_to_one_hundred_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.fifty_one_to_one_hundred_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">One Hundred One To Five Hundred Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="one_hundred_one_to_five_hundred_place"
                                  className="form-control"
                                  name="one_hundred_one_to_five_hundred_place"
                                  value={formData.one_hundred_one_to_five_hundred_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.one_hundred_one_to_five_hundred_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.one_hundred_one_to_five_hundred_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Five Hundred One To Thousand Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="five_hundred_one_to_thousand_place"
                                  className="form-control"
                                  name="five_hundred_one_to_thousand_place"
                                  value={formData.five_hundred_one_to_thousand_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.five_hundred_one_to_thousand_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.five_hundred_one_to_thousand_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">One Thousand One To Two Thousand Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="one_thousand_one_to_two_thousand_place"
                                  className="form-control"
                                  name="one_thousand_one_to_two_thousand_place"
                                  value={formData.one_thousand_one_to_two_thousand_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.one_thousand_one_to_two_thousand_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.one_thousand_one_to_two_thousand_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Two Thousand One To Three Thousand Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="two_thousand_one_to_three_thousand_place"
                                  className="form-control"
                                  name="two_thousand_one_to_three_thousand_place"
                                  value={formData.two_thousand_one_to_three_thousand_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.two_thousand_one_to_three_thousand_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.two_thousand_one_to_three_thousand_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Three Thousand One To Four Thousand Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="three_thousand_one_to_four_thousand_place"
                                  className="form-control"
                                  name="three_thousand_one_to_four_thousand_place"
                                  value={formData.three_thousand_one_to_four_thousand_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.three_thousand_one_to_four_thousand_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.three_thousand_one_to_four_thousand_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Four Thousand One To Five Thousand Place</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="four_thousand_one_to_five_thousand_place"
                                  className="form-control"
                                  name="four_thousand_one_to_five_thousand_place"
                                  value={formData.four_thousand_one_to_five_thousand_place}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.four_thousand_one_to_five_thousand_place && <span className="validation_error_message" style={{ color: 'red' }}>{errors.four_thousand_one_to_five_thousand_place}</span>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="mb-1">
                              <label className="col-form-label" htmlFor="description">Status</label>
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="status"
                                  className="form-control"
                                  name="status"
                                  value={formData.status}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-9 offset-sm-5">
                            <button type="submit" className="btn btn-orange me-1">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateJackpot;
