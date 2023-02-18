import React, { useState, useEffect } from "react";
import axios from "axios";
import "../userlist/UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = localStorage.getItem("userid");
  console.log(userId);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/get-all").then((response) => {
      setUsers(response.data);
      console.log(users);
    });

    axios
      .get(`http://localhost:8080/users/following/${userId}`)
      .then((response) => {
        setFollowing(response.data);
        console.log(following);
      });
  }, []);

  const checkFollowing = (id) => {
    return following.some((user) => user.id === id);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFollow = (user) => {
    axios
      .post("http://localhost:8080/social/save", {
        userId: userId,
        followingId: user.id,
      })
      .then((response) => {
        console.log(response.data);
        setFollowing([...following, user]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnfollow = (user) => {
    axios
      .delete(`http://localhost:8080/social/delete/${userId}/${user.id}`)
      .then(() => {
        // Update the following status and button text
        setFollowing(following.filter((f) => f.id !== user.id));
      });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          onChange={handleChange}
        />
      </div>
      <div class="card shadow rounded-0 mb-3">
        <div class="card-header bg-white border-0 shadow-sm text-black">
          Members
        </div>
        <div
          className="list-group"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {filteredUsers.map((user) => (
            <div key={user.id} className="list-group-item">
              <div class="card-body">
                <ul class="list-group border-0">
                  <li class="border-top-0 list-group-item border-left-0 border-right-0 rounded-0">
                    <img
                      src={
                        user.avatar
                          ? user.avatar
                          : "https://scontent.fsin14-2.fna.fbcdn.net/v/t1.18169-9/14222258_1215016558518626_5872533390850169360_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=6-fvulU2I6IAX-kHRsW&_nc_ht=scontent.fsin14-2.fna&oh=00_AfAN1wNFugPb_KRv9SFJB7ZZOaRx8D_ofi7xeTmG8ZV8Hw&oe=641505E0"
                      }
                      alt="Avatar"
                      style={{
                        borderRadius: "50%",
                        marginRight: "10px",
                        width: "50px",
                      }}
                    />
                    <i class="mr-2 "></i> <strong>{user.name}</strong>{" "}
                    <i class="text-muted">Followers</i>{" "}
                    {checkFollowing(user.id) ? (
                      <button onClick={() => handleUnfollow(user)}>
                        Unfollow
                      </button>
                    ) : (
                      <button onClick={() => handleFollow(user)}>Follow</button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
