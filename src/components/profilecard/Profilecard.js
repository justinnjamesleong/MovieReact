import React, { useState, useEffect } from "react";
import "../profilecard/Profilecard.css";
import axios from "axios";

const Profilecard = () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userid");
  console.log(userId);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(
        `http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/api/user/edit/${userId}`
      );
      console.log(result);
      console.log(result.data);
      setUser(result.data);
      setName(result.data.name);
      setAvatar(result.data.avatar);
      setDescription(result.data.description);
      setEmail(result.data.Email);
    };
    fetchUser();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    localStorage.setItem("username", name);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("avatar", avatar);

    fetch(`http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com/api/user/edit/${userId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setUser({ ...user, name, email, description, avatar });
          setEditing(false);
          console.log(response);
        } else {
          console.log("Error updating user profile");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div class="profile-card">
        <div class="image">
          <img
            src={
              avatar
                ? avatar
                : "https://scontent.fsin14-2.fna.fbcdn.net/v/t1.18169-9/14222258_1215016558518626_5872533390850169360_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=6-fvulU2I6IAX-kHRsW&_nc_ht=scontent.fsin14-2.fna&oh=00_AfAN1wNFugPb_KRv9SFJB7ZZOaRx8D_ofi7xeTmG8ZV8Hw&oe=641505E0"
            }
            alt=""
            class="profile-img"
          />
        </div>

        <div class="text-data">
          <span class="name">{name}</span>
          <span class="description">{description}</span>
        </div>

        {/* <div class="analytics">
          <div class="data">
            <i class="bx bx-heart"></i>
            <span class="number">60k</span>
          </div>
          <div class="data">
            <i class="bx bx-message-rounded"></i>
            <span class="number">20k</span>
          </div>
          <div class="data">
            <i class="bx bx-share"></i>
            <span class="number">12k</span>
          </div>
        </div> */}
        <br />
        <div class="buttons">
          <button class="button" onClick={() => setFormOpen(!formOpen)}>
            Edit Profile
          </button>
        </div>

        {formOpen ? (
          <div
            class="formcontainer"
            style={{
              display: "flex-column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <p style={{ color: "black" }}>
              <mark>Select an Avatar</mark>
            </p>
            <div class="abutton-container">
              <button
                class="abutton"
                onClick={() =>
                  setAvatar(
                    "https://img.freepik.com/premium-vector/cool-nerdy-pizza-cartoon-avatar-illustration_448933-122.jpg?w=740"
                  )
                }
              >
                <img
                  src="https://img.freepik.com/premium-vector/cool-nerdy-pizza-cartoon-avatar-illustration_448933-122.jpg?w=740"
                  alt="Button 1"
                />
              </button>
              <button
                class="abutton"
                onClick={() =>
                  setAvatar(
                    "https://papik.pro/en/uploads/posts/2022-06/thumbs/1655733841_1-papik-pro-p-cool-avatar-pictures-1.jpg"
                  )
                }
              >
                <img
                  src="https://papik.pro/en/uploads/posts/2022-06/thumbs/1655733841_1-papik-pro-p-cool-avatar-pictures-1.jpg"
                  alt="Button 2"
                />
              </button>
              <button
                class="abutton"
                onClick={() =>
                  setAvatar(
                    "https://mcdn.wallpapersafari.com/medium/23/20/qSJ9AD.jpg"
                  )
                }
              >
                <img
                  src="https://mcdn.wallpapersafari.com/medium/23/20/qSJ9AD.jpg"
                  alt="Button 3"
                />
              </button>
              <button
                class="abutton"
                onClick={() =>
                  setAvatar(
                    "https://ps.w.org/wp-avatar/assets/icon-128x128.png?rev=1787902"
                  )
                }
              >
                <img
                  src="https://ps.w.org/wp-avatar/assets/icon-128x128.png?rev=1787902"
                  alt="Button 4"
                />
              </button>

              <button
                class="abutton"
                onClick={() =>
                  setAvatar("https://avatarfiles.alphacoders.com/793/79317.png")
                }
              >
                <img
                  src="https://avatarfiles.alphacoders.com/793/79317.png"
                  alt="Button 5"
                />
              </button>
            </div>

            <div class="center">
              <form>
                <span>
                  <mark>Name</mark>
                </span>
                <div class="inputbox">
                  <input
                    placeholder={username}
                    type="textarea"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <span>
                  <mark>Email</mark>
                </span>
                <div class="inputbox">
                  <input
                    type="email"
                    placeholder={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>Email</span>
                </div>
                <br />
                <span>
                  <mark>Description</mark>
                </span>
                <div class="inputbox">
                  <textarea
                    type="text"
                    placeholder={user.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <span>Description</span>
                </div>

                <div class="buttons">
                  <button class="button" onClick={handleSave}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profilecard;
