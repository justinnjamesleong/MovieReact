import { useState } from "react";

const AvatarSelection = ({ setAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelection = (avatarId) => {
    setSelectedAvatar(avatarId);
    setAvatar(`path/to/avatar${avatarId}.jpg`); // set the path to the selected avatar
  };

  return (
    <div>
      <h3>Choose Your Avatar</h3>
      <div>
        <label htmlFor="avatar1">
          <input
            type="radio"
            id="avatar1"
            name="avatar"
            value="1"
            onChange={() => handleAvatarSelection(1)}
          />
          <img src="path/to/avatar1.jpg" alt="Avatar 1" />
        </label>
      </div>
      <div>
        <label htmlFor="avatar2">
          <input
            type="radio"
            id="avatar2"
            name="avatar"
            value="2"
            onChange={() => handleAvatarSelection(2)}
          />
          <img src="path/to/avatar2.jpg" alt="Avatar 2" />
        </label>
      </div>
      <div>
        <label htmlFor="avatar3">
          <input
            type="radio"
            id="avatar3"
            name="avatar"
            value="3"
            onChange={() => handleAvatarSelection(3)}
          />
          <img src="path/to/avatar3.jpg" alt="Avatar 3" />
        </label>
      </div>
      <div>
        <label htmlFor="avatar4">
          <input
            type="radio"
            id="avatar4"
            name="avatar"
            value="4"
            onChange={() => handleAvatarSelection(4)}
          />
          <img src="path/to/avatar4.jpg" alt="Avatar 4" />
        </label>
      </div>
    </div>
  );
};