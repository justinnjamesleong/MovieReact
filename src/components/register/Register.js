import React, { useState } from "react";
import axios from "axios";
import "./Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const description = "Hello I am new to this platform.";
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/api/save", {
        name,
        email,
        password,
        description,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Registration successful!", {
            onClose: () => {
              window.location.href = "/login";
            },
          });
        } else {
          // handle registration error
          toast.error("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-key">
            <i class="fa fa-registered" aria-hidden="true"></i>
          </div>
          <div class="col-lg-12 login-title">REGISTER</div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">EMAIL</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    class="form-control"
                    i
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="col-lg-12 loginbttm">
                  <div class="col-lg-6 login-btm login-text">
                    <p></p>
                  </div>
                  <div class="col-lg-6 login-btm login-button">
                    <button type="submit" class="btn btn-outline-primary">
                      REGISTER
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
          <div class="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
