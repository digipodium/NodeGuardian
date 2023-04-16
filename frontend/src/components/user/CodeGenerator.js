import React, { useState } from "react";
import app_config, { structureData } from "../../config";
import { toast } from "react-hot-toast";

const CodeGenerator = () => {
  const url = app_config.apiUrl;
  const [fileUrl, setFileUrl] = useState("");
  const selOptions = JSON.parse(sessionStorage.getItem("selOptions"));
  // console.log(selOptions);
  console.log(structureData[selOptions].files);
  const [dependencies, setDependencies] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  // const generateBoilerplate = async () => {
  //   const res = await fetch(url + "/util/generateCode");
  //   console.log(res.status);
  //   const data = await res.json();
  //   console.log(data);
  //   setFileUrl(url + "/" + data.filename);
  // };

  const generateCodeFromData = async () => {
    const res = await fetch(url + "/util/generateCodeFromData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: structureData[selOptions].files,
        dependencies,
        name: "test",
        createdBy: currentUser._id,
      }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setFileUrl(url + "/" + data.filename);
    toast.success("Boilerplate Generated Successfully");
  };

  const projectDirectories = () => {
    console.log(structureData[selOptions].files);
    return structureData[selOptions].files.map((file) => {
      return (
        <div>
          <h3>{file.name}</h3>
        </div>
      );
    });
  };

  const addDependency = (dependency) => {
    setDependencies([...dependencies, dependency]);
  };

  const removeDependency = (dependency, index) => {
    const newDependencies = dependencies.filter((dep, i) => i !== index);
    setDependencies(newDependencies);
  };

  const showDependencies = (dependencies, action) => {
    return (
      <ul class="list-group">
        {dependencies.map((dependency, index) => (
          <li className="list-group-item">
            <div className="row">
              <div className="col-md-2">
                <i className={dependency.icon}></i>
              </div>
              <div className="col-md-8">
                <h5>{dependency.package}</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, fugiat!
                </p>
              </div>
              <div className="col-md-2">
                {action === "add" ? (
                  <button
                    className="btn btn-primary"
                    onClick={(e) => addDependency(dependency)}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => removeDependency(dependency, index)}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url("/back_img4.png")`,
        backgroundSize: "cover",
      }}
    >
      <>
        {/* Dependencies Modal */}
        <div
          className="modal fade modal-lg"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <input
                  className="form-control"
                  placeholder="🔍 Search Dependency"
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {showDependencies(structureData[selOptions].library, "add")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="container py-3">
        <div className="card">
          <div className="card-body p-5">
            <p className="display-4">
              <span className="fw-bold">NodeJS</span> Boilerplate Code Generator
            </p>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <div className="p-5">
                  <h3>Project Directories</h3>
                  <hr />
                  {projectDirectories()}
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-5">
                  <h3>Project Dependencies</h3>
                  <hr />
                  <button
                    className="btn btn-success my-3"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fas fa-plus"></i>
                    Add Dependency
                  </button>

                  {showDependencies(dependencies, "remove")}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-md-2">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={generateCodeFromData}
                >
                  Generate
                </button>
              </div>
              {fileUrl && (
                <div className="col-md-2">
                  <a
                    className="btn btn-lg btn-outline-success w-100"
                    href={fileUrl}
                  >
                    <i class="fa-solid fa-cloud-arrow-down"></i>
                    &nbsp;Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;
