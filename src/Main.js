import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LOGO from "./assets/logo192.jpeg";
import moment from "moment";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { accesstoken } from "./Config";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LockIcon from "@material-ui/icons/Lock";
import Cookies from "js-cookie";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      backdop: false,
      dateNow: new Date(),
      filer: "ALL",
      data: [],
    };

    setInterval(() => this.chTime(), 1000);

    this.arrayholder = [];
  }

  componentDidMount() {
    accesstoken().then((result) => {
      if (result == undefined) {
        this.props.history.push("/");
      } else {
        this.setState({
          email: (this.state.email = result),
        });
        this.GetDetial();
      }
    });
  }

  chTime() {
    //console.log('ChTime');
    this.setState({ dateNow: new Date() });
  }

  GetDetial = async () => {
    this.setState({
      backdop: true,
    });

    const res = await axios.get(
      `https://script.google.com/macros/s/AKfycbyJfsN-HPCrpJhDl6Q7m0ZtF_ehYqtWIYPwmTtv7OYVqhxEoX2HqUU5G2uHneTICH3l/exec?action=read&table=cheque`
    );

    let data = res.data.data;
    data = data
      .filter((item) => item.email == this.state.email)
      .map(
        ({
          id,
          email,
          name,
          bath,
          account,
          status,
          statuspay,
          datecheque,
        }) => ({
          id,
          email,
          name,
          bath,
          account,
          status,
          statuspay,
          datecheque,
        })
      );
    // console.log(data);
    this.setState(
      {
        data: data,
        backdop: false,
      },
      () => {
        this.arrayholder = data;
      }
    );
  };

  Filter = (filter) => {
    if (filter == "FILL1") {
      const newData1 = this.arrayholder.filter((i) => i.status === true);
      this.setState({
        data: newData1,
      });
    } else if (filter == "FILL2") {
      const newData2 = this.arrayholder.filter((i) => i.status === false);
      this.setState({
        data: newData2,
      });
    } else if (filter == "FILL3") {
      const newData3 = this.arrayholder.filter((i) => i.statuspay === true);
      this.setState({
        data: newData3,
      });
    } else {
      this.setState({
        data: this.arrayholder,
      });
    }
  };

  Logout = () => {
    Cookies.remove("__session");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
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
        <main role="main" className="container">
          <div
            className="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow"
            style={{ backgroundColor: "#512da8" }}
          >
            <img
              className="mr-3"
              src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg"
              alt=""
              width={48}
              height={48}
            />
            <div className="lh-100">
              <h6 className="mb-0 text-white lh-100">
                ระบบตรวจสอบสถานะการจ่ายเช็ค
                {/* องค์การบริหารส่วนตำบล แก่งโสภา อ.วังทอง จ.พิษณุโลก 65000 */}
              </h6>
              <small>
                {this.state.dateNow.toLocaleDateString() + " "}{" "}
                {this.state.dateNow.toLocaleTimeString()}
              </small>
            </div>
          </div>
          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-gray pb-2 mb-0">แสดงรายการ</h6>
            <Navbar
              collapseOnSelect
              expand="lg"
              style={{ backgroundColor: "#d1c4e9" }}
            >
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  {/* <FormatListNumberedIcon style={{ color: "#512da8" }} /> */}
                  <Nav className="me-auto">
                    <NavDropdown
                      title={"เมนูเพิ่มเติม"}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item onClick={() => this.Filter("ALL")}>
                        แสดงรายการทั้งหมด
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.Filter("FILL1")}>
                        แสดงเฉพาะรายการพร้อมจ่ายเช็ค
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.Filter("FILL2")}>
                        แสดงเฉพาะรายการอยู่ระหว่างการดำเนินการจ่ายเช็ค
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.Filter("FILL3")}>
                        แสดงรายการที่รับเช็คมาแล้วทั้งหมด
                      </NavDropdown.Item>
                      {/* <NavDropdown.Divider /> */}
                    </NavDropdown>
                  </Nav>
                  {/* <LockIcon style={{ color: "#512da8" }} /> */}
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => this.Logout()}>
                      ออกจากระบบ
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div className="media text-muted pt-3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ชื่อรายการ</th>
                    <th>จำนวนเงิน</th>
                    <th>สถานะเตรียมจ่ายเช็ค</th>
                    <th>สถานะรับเช็ค</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data?.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{obj.name}</td>
                        <td>
                          {obj.bath.toLocaleString(navigator.language, {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          {obj.status == true ? (
                            <span style={{ color: "#006600" }}>
                              พร้อมจ่ายเช็ค
                            </span>
                          ) : (
                            <span style={{ color: "#ff0000" }}>
                              อยู่ระหว่างการดำเนินการ
                            </span>
                          )}
                        </td>
                        <td>
                          {obj.statuspay == true ? (
                            <span style={{ color: "#006600" }}>
                              รับเช็คเรียบร้อย
                            </span>
                          ) : (
                            <span style={{ color: "#ff0000" }}>
                              อยู่ระหว่างการดำเนินการ
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
