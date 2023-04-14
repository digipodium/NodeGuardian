import React, { useState } from "react";
import app_config, {structureData} from "../../config";
import "./codebrowser.css";
import { useNavigate } from "react-router-dom";

const CodeBrowser = () => {
  const [selOptions, setSelOptions] = useState([]);
  const { options, apiUrl } = app_config;
  // console.log(structureData[options.webApp.fullstack.mern.frontend]);
  const navigate = useNavigate();

  const getSelectedObject = (givenOptions) => {
    if (!givenOptions) givenOptions = selOptions;
    let selObj = options;
    console.log(options);
    givenOptions.forEach((opt) => {
      selObj = selObj[opt];
    });
    // console.log(selObj);
    return selObj;
  };

  const handleOptionClick = (option) => {
    setSelOptions([...selOptions, option]);
    console.log(selOptions);
  };

  const getOptionData = () => {
    let data = {};
    selOptions.forEach((opt) => {
      data = { ...data, ...options[opt] };
    }
    );
    console.log(data);
    return data;
  }

  const navigatetoCodeGenerator = (opt) => {
    console.log("Navigating to Code Generator");
    // handleOptionClick(opt);
    sessionStorage.setItem(
      "selOptions",
      JSON.stringify(getSelectedObject([...selOptions, opt]))
    );
    navigate("/user/generator");
  };

  const displayOptions = (options) => {
    if (selOptions.length === 0) {
      return Object.keys(options).map((objKey, index) => (
        <div className="col-md-2" key={index}>
          <div className="card" onClick={(e) => handleOptionClick(objKey)}>
            <img className="card-img-top" src="/logos/react_logo.png" alt="" />
            <div className="card-body">
              <h5 className="card-title">{objKey}</h5>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary float-end"
                onClick={(e) => navigatetoCodeGenerator(objKey)}
              >
                Generate Code
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      const selObj = getSelectedObject();
      return Object.keys(selObj).map((objKey, index) => (
        <div className="col-md-2" key={index}>
          <div className="card" onClick={(e) => handleOptionClick(objKey)}>
            <img className="card-img-top" src="/logos/react_logo.png" alt="" />
            <div className="card-body">
              <h5 className="card-title">{objKey}</h5>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary float-end"
                onClick={(e) => navigatetoCodeGenerator(objKey)}
              >
                Generate Code
              </button>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="bg-primary vh-100">
      <div className="container light-glassy-effect p-5">
        <h1>CodeBrowser</h1>
        <button
          className="btn btn-primary"
          onClick={(e) => setSelOptions(selOptions.slice(0, -1))}
        >
          Back
        </button>
        <div className="row">{displayOptions(options)}</div>
      </div>
    </div>
  );
};

export default CodeBrowser;
