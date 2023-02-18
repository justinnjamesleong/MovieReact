import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ResetPass = () => {
  const [rid, setId] = useState("");
  const [rname, setRname] = useState("");
  const [remail, setRemail] = useState("");
  const [rpassword, setRepassword] = useState("");
  const [r2password, setR2epassword] = useState("");
  const [ravatar, setRAvatar] = useState("");
  const [rrole, setRRole] = useState("");
  const [rdescription, setRDescription] = useState("");

  const [result, setResult] = useState([]);

  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    const sendToken = async () => {
      const result = await axios.post(
        `http://localhost:8080/api/reset_password/${token}`
      );
      console.log(result);
      setResult(result.data);
      setId(result.data.id);
      console.log(rid);
      setRname(result.data.name);
      console.log(rname);
      setRAvatar(result.data.avatar);
      setRRole(result.data.role);
      setRDescription(result.data.description);
      setRemail(result.data.email);
    };
    sendToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/updateUser/${rpassword}`,
        {
          id: rid,
          name: rname,
          email: remail,
          password: rpassword,
          isActive: true,
          role: rrole,
          description: rdescription,
          avatar: ravatar,
        }
      );
      if (response.status != 200) {
        throw new Error(
          `Failed to change password. Request failed with status code ${response.status}`
        );
      }

      console.log("Password changed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if ((result.status = 200)) {
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
                    <label class="form-control-label">
                      RESET YOUR PASSWORD
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      value={rpassword}
                      onChange={(e) => setRepassword(e.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">
                      PLEASE CONFIRM YOUR PASSWORD:
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      i
                      placeholder="Password Confirmation"
                      value={r2password}
                      onChange={(e) => setR2epassword(e.target.value)}
                    />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text">
                      <p></p>
                    </div>
                    {rpassword === r2password ? (
                      <div class="col-lg-6 login-btm login-button">
                        <button type="submit" class="btn btn-outline-primary">
                          SUBMIT
                        </button>
                      </div>
                    ) : (
                      <label class="form-control-label">
                        YOUR PASSWORDS DO NOT MATCH.
                      </label>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <label class="form-control-label">
        There was an Error in the Network. Please try again.
      </label>
    );
  }
};

export default ResetPass;
