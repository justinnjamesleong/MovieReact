import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../login/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/api/login/${username}/${password}`
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("username", response.data.name);
      localStorage.setItem("userid", response.data.id);
      localStorage.setItem("role", response.data.roles);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("avatar", response.data.avatar);

      toast.success("Login successful!", {
        onClose: () => {
          window.location.href = "/";
        },
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
          <div class="col-lg-12 login-key">
            <i class="fa fa-key" aria-hidden="true"></i>
          </div>
          <div class="col-lg-12 login-title">LOGIN</div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    <Link to={`/ForgetPass`}>
                      <p>Forgot your Password?</p>
                    </Link>
                  </div>
                  <div class="col-lg-6 login-btm login-button">
                    <button type="submit" class="btn btn-outline-primary">
                      LOGIN
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

export default Login;
