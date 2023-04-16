import React, { useState } from "react";
import app_config from "../../config";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const url = app_config.apiUrl;

  const updateProfile = async (data) => {
    console.log(data);
    const res = await fetch(url + "/user/update/"+currentUser._id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);
    const userdata = (await res.json()).result;
    console.log(userdata);
    setCurrentUser(userdata);
    sessionStorage.setItem('user', JSON.stringify(userdata));
  }

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    // setSelImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        updateProfile({avatar : file.name})
      }
    });
  };



  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">

                <img height={200} className="border-rounded d-block m-auto" src={currentUser.avatar?`${url}/${currentUser.avatar}` : '/avatar.webp'} alt="" />
                <label className="btn btn-outline-secondary w-100 mt-3" htmlFor="upload-image">  <i class="fas fa-pen"></i>&nbsp;Edit </label>
                <input type="file" hidden onChange={uploadProfileImage} id="upload-image" />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>$53.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Make purchase
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0"> <i class="fas fa-pen-alt    "></i> Edit Profile</h5>
              </div>
              <div className="card-body">
                <form>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form7Example1"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form7Example1">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form7Example2"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form7Example2">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Text input */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example3"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form7Example3">
                      Company name
                    </label>
                  </div>
                  {/* Text input */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example4"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form7Example4">
                      Address
                    </label>
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form7Example5"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form7Example5">
                      Email
                    </label>
                  </div>
                  {/* Number input */}
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      id="form7Example6"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form7Example6">
                      Phone
                    </label>
                  </div>
                  {/* Message input */}
                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      id="form7Example7"
                      rows={4}
                      defaultValue={""}
                    />
                    <label className="form-label" htmlFor="form7Example7">
                      Additional information
                    </label>
                  </div>
                  {/* Checkbox */}
                  <div className="form-check d-flex justify-content-center mb-2">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form7Example8"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="form7Example8">
                      Create an account?
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
