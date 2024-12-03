"use client";

import React, { useEffect, useRef } from "react";
import styles from "./playRoom.module.css";
import { randColors } from "@/lib/color";

const PlayRoom = () => {
  const userDivRef = useRef<HTMLDivElement | null>(null);

  const currentUserRef = useRef<HTMLDivElement | null>(null);

  const setUserBackgroundColor = () => {
    const num = Math.floor(Math.random() * randColors.length);
    localStorage.setItem("userBackgroundColor", randColors[num]);
  };

  useEffect(() => {
    let maxHeight = window.innerHeight - 40;
    let maxWidth = window.innerWidth - 40;

    let position = { top: 100, left: 100 };

    const handleKeyDown = (event: KeyboardEvent) => {
      const step = 8;
      switch (event.key) {
        case "ArrowUp":
          if (position.top > 0) {
            position.top -= step;
          }
          break;
        case "ArrowDown":
          if (position.top < maxHeight) {
            position.top += step;
          }
          break;
        case "ArrowLeft":
          if (position.left > 0) {
            position.left -= step;
          }
          break;
        case "ArrowRight":
          if (position.left < maxWidth) {
            position.left += step;
          }
          break;
        default:
          return;
      }

      if (currentUserRef.current) {
        currentUserRef.current.style.top = `${position.top}px`;
        currentUserRef.current.style.left = `${position.left}px`;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const userBackgroundColor = localStorage.getItem("userBackgroundColor");
    if (!userBackgroundColor) {
      setUserBackgroundColor();
    } else {
      userDivRef.current!.style.backgroundColor = userBackgroundColor;
    }
  }, []);

  return (
    <div className={styles.playRoomContainer}>
      <div
        className={styles.user}
        ref={currentUserRef}
        style={{ top: `100px`, left: `100px` }}
      >
        <p>userName</p>
        <div className={styles.userBody} ref={userDivRef}></div>
      </div>
    </div>
  );
};

export default PlayRoom;
