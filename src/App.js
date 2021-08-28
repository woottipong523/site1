import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LOGO from "./assets/logo192.jpeg";
import moment from "moment";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Banner from "./assets/uNGdWHi.png";
import Cookies from "js-cookie";
import { accesstoken } from "./Config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: moment(new Date()).format("YYYY"),
      email: "",
      backdop: false,
      usersError: false,
    };
  }

  componentDidMount() {
    accesstoken().then((result) => {
      if (result != undefined) {
        this.props.history.push("/Main");
      }
    });
  }

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.checklogin();
    }
  };

  checklogin = async () => {
    this.setState({
      backdop: true,
      usersError: false,
    });
    const res = await axios.get(
      "https://script.google.com/macros/s/AKfycbyJfsN-HPCrpJhDl6Q7m0ZtF_ehYqtWIYPwmTtv7OYVqhxEoX2HqUU5G2uHneTICH3l/exec?action=read&table=admin"
    );
    let check1 = res.data.data.find(
      (item) => item.username == this.state.email
    );
    if (check1) {
      this.setState({
        usersError: false,
      });
      Cookies.set("__session", this.state.email);
      this.props.history.push("/Main");
    } else {
      this.setState({
        usersError: true,
      });
      Cookies.remove("__session");
    }
    this.setState({
      backdop: false,
      email: "",
    });
  };
  render() {
    return (
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <Backdrop
          open={this.state.backdop}
          // onClick={handleClose}
          style={{ zIndex: 1, color: "#fff" }}
        >
          <div>
            <CircularProgress color="secondary" />
          </div>
          <span>กำลังโหลด...</span>
        </Backdrop>
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  {" "}
                  <img src={Banner} className="image" />{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                <div className="row mb-4 px-3">
                  <h5 className="mb-0 mr-4 mt-2">
                    <b>
                      ระบบตรวจสอบสถานะการจ่ายเช็ค
                      {/* องค์การบริหารส่วนตำบล แก่งโสภา อ.วังทอง จ.พิษณุโลก 65000 */}
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
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    onKeyDown={this.handleKeyDown}
                  />{" "}
                </div>
                {/* <div className="row px-3 mb-4"> */}
                <div className="row">
                  {/* <div className="custom-control custom-checkbox custom-control-inline">
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
                  </div>{" "} */}
                  <br />
                  {this.state.usersError === true && (
                    <span style={{ color: "#ff0000" }}>
                      ไม่พบข้อมูลของท่าน
                      โปรดตรวจสอบข้อมูลของท่านให้ถูกต้องและครบถ้วน
                    </span>
                  )}
                </div>
                <div className="row mb-3 px-3">
                  {" "}
                  <button
                    onClick={() => this.checklogin()}
                    type="submit"
                    className="btn btn-blue text-center"
                  >
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
                Copyright © {this.state.y}. พัฒนาระบบโดย: นายวุฒิพงศ์ คงสิบ โทร:
                088-5556340 อีเมล: woottipong523@psru.ac.th
                {/* องค์การบริหารส่วนตำบล แก่งโสภา อ.วังทอง จ.พิษณุโลก 65000 */}
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
