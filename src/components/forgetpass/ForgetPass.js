import React, { useState } from "react";
import axios from "axios";

const ForgetPass = (props) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/api/forget_password/${email}`)
      .then((response) => {
        console.log(response);
        // window.location = "/";
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
            <i class="fa fa-question" aria-hidden="true"></i>
          </div>
          <div class="col-lg-12 login-title">FORGOT YOUR PASSWORD?</div>

          <div class="col-lg-12 login-form">
            <div class="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label class="form-control-label">
                    Key in your email here and we shall send you a link..
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div class="col-lg-12 loginbttm">
                  <div class="col-lg-6 login-btm login-text">
                    <p></p>
                  </div>
                  <div class="col-lg-6 login-btm login-button">
                    <button type="submit" class="btn btn-outline-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
