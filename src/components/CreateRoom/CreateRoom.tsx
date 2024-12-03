"use client";
import React, { useState } from "react";
import styles from "./CreateRoom.module.css";
import { RxCross2 } from "react-icons/rx";

interface createRoomPropsType {
  setCreateRoomBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom: React.FC<createRoomPropsType> = ({
  setCreateRoomBoxOpen,
}) => {
  const [passwordBoxOpen, setPasswordBoxOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [spaceName, setSpaceName] = useState<string>("");

  const handleSpaceNameLenght = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setSpaceName(e.target.value);
    }
  };

  const handleUserCreateRoom = async () => {
    if (spaceName == "") {
      alert("Space name is required.");
      return;
    }

    if (passwordBoxOpen === true && password == "") {
      alert("Password is required.");
      return;
    }

    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomName: spaceName,
        passwordSet: passwordBoxOpen,
        password: password,
      }),
    });

    await res.json().then((e) => {
      console.log(e);
    });
    
  };

  return (
    <div className={styles.createRoomMainContainer}>
      <div className={styles.createRoomHead}>
        <h3>Space Settings</h3>
        <span onClick={() => setCreateRoomBoxOpen(false)}>
          <RxCross2 />
        </span>
      </div>
      <div className={styles.inputBox}>
        <div className={styles.inputBoxHead}>
          <p>Space Name</p>
          <span>{spaceName.length}/30</span>
        </div>
        <input
          type="text"
          placeholder="Enter Space name"
          value={spaceName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSpaceNameLenght(e)
          }
        />
      </div>
      <div className={styles.setPasswordOption}>
        <p>Set Password</p>
        <input
          type="checkbox"
          onChange={() => setPasswordBoxOpen((prev) => !prev)}
        />
      </div>
      {passwordBoxOpen === true && (
        <input
          type="text"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      )}
      <div className={styles.warning}>It make take up to 5 minutes.</div>
      <button onClick={handleUserCreateRoom}>Create</button>
    </div>
  );
};

export default CreateRoom;
