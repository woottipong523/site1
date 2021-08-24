import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LOGO from "./assets/logo192.jpeg";
import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: moment(new Date()).format("YYYY")
    }
  }
  render() {
    return (
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {" "}
                  <img
                    src="https://i.imgur.com/uNGdWHi.png"
                    className="image"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                <div className="row mb-4 px-3">
                  <h5 className="mb-0 mr-4 mt-2">
                    <b>
                      ระบบตรวจสอบสถานะการจ่ายเช็ค องค์การบริหารส่วนตำบล แก่งโสภา
                      อ.วังทอง จ.พิษณุโลก
                    </b>
                  </h5>
                </div>
                <div className="row px-3 mb-4">
                  <div className="line" />{" "}
                  <small className="or text-center">โปรดเข้าสู่ระบบ</small>
                  <div className="line" />
                </div>
                <div className="row px-3">
                  {" "}
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">อีเมลที่แจ้งกับหน่วยงาน</h6>
                  </label>{" "}
                  <input
                    className="mb-4"
                    type="text"
                    name="email"
                    placeholder="Enter email address"
                    autoComplete="off"
                    autoFocus
                  />{" "}
                </div>
                <div className="row px-3 mb-4">
                  <div className="custom-control custom-checkbox custom-control-inline">
                    {" "}
                    <input
                      id="chk1"
                      type="checkbox"
                      name="chk"
                      className="custom-control-input"
                    />{" "}
                    <label
                      htmlFor="chk1"
                      className="custom-control-label text-sm"
                    >
                      จดจำการเข้าสู่ระบบไว้
                    </label>{" "}
                  </div>{" "}
                </div>
                <div className="row mb-3 px-3">
                  {" "}
                  <button type="submit" className="btn btn-blue text-center">
                    เข้าสู่ระบบ
                  </button>{" "}
                </div>
                {/* <div className="row mb-4 px-3">
                  {" "}
                  <small className="font-weight-bold">
                    Don't have an account?{" "}
                    <a className="text-danger ">Register</a>
                  </small>{" "}
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              {" "}
              <small className="ml-4 ml-sm-5 mb-2">
                Copyright © {this.state.y}. องค์การบริหารส่วนตำบล แก่งโสภา อ.วังทอง
                จ.พิษณุโลก 65000
              </small>
              <div className="social-contact ml-4 ml-sm-auto">
                {" "}
                <span className="fa fa-facebook mr-4 text-sm" />{" "}
                <span className="fa fa-google-plus mr-4 text-sm" />{" "}
                <span className="fa fa-linkedin mr-4 text-sm" />{" "}
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm" />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
