"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { IoIosAdd } from "react-icons/io";
import { MdJoinInner } from "react-icons/md";
import CreateRoom from "@/components/CreateRoom/CreateRoom";

const Page = () => {
  const [createRoomBoxOpen, setCreateRoomBoxOpen] = useState<boolean>(false);

  return (
    <div className={styles.homeContainer}>
      <input type="text" placeholder="Enter join room link..." />
      <button>
        <MdJoinInner className={styles.icon} /> Join room
      </button>
      <p>or</p>
      <button onClick={() => setCreateRoomBoxOpen(true)}>
        <IoIosAdd className={styles.icon} /> Create room
      </button>
      {createRoomBoxOpen === true && (
        <div className={styles.createRoomContainer}>
          <CreateRoom setCreateRoomBoxOpen={setCreateRoomBoxOpen} />
        </div>
      )}
    </div>
  );
};

export default Page;
