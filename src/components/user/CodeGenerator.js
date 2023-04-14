import React, { useState } from "react";
import app_config, { structureData } from "../../config";

const CodeGenerator = () => {
  const url = app_config.apiUrl;
  const [fileUrl, setFileUrl] = useState("");
  const selOptions = JSON.parse(sessionStorage.getItem("selOptions"));
  console.log(structureData[selOptions]);
  const [dependencies, setDependencies] = useState([]);

  const generateBoilerplate = async () => {
    const res = await fetch(url + "/util/generateCode");
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setFileUrl(url + "/" + data.filename);
  };

  const generateCodeFromData = async () => {
    const res = await fetch(url + "/util/generateCodeFromData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: structureData[selOptions].files, dependencies, name: "test" }),
    });
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setFileUrl(url + "/" + data.filename);
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
    <div>
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

      <div className="container">
        <p className="text-center display-4">Generate Boilerplate Code</p>
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
      <hr />
      <div className="d-flex justify-content-center">
      <button className="btn btn-outline-primary mt-5" onClick={generateBoilerplate}>Generate Boilerplate</button>
      <br />
      <button className="btn btn-primary mt-5" onClick={generateCodeFromData}>
        Generate Boilerplate
      </button>

      <a href={fileUrl}>Download File</a>
      </div>
      
    </div>
  );
};

export default CodeGenerator;
