"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/welcomescreen.module.css";
import Image from "next/image";
import decorators from "../../../public/decorationers.jpg";

const WelcomeScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyVisited = localStorage.getItem("visitedWelcome");

    if (!alreadyVisited) {
      setIsVisible(true);
      localStorage.setItem("visitedWelcome", "true");

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.text}>
        <h1>Hoşgeldiniz</h1>
      </div>
      <div className={styles.painter}>
        <Image src={decorators} alt="Boyacı" className={styles.painterImage} />
      </div>
    </div>
  );
};

export default WelcomeScreen;
