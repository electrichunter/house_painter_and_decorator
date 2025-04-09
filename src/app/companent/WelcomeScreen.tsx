"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/welcomescreen.module.css";
import Image from "next/image";
import decorators from "../../../public/decorationers.jpg"; // Import the image
const WelcomeScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Bu useEffect ile 3 saniye sonra 'Hoşgeldiniz' ekranını kaldıracağız
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // 3 saniye sonra kapanacak
    return () => clearTimeout(timer); // Temizleme işlemi
  }, []);

  return (
    <div
      className={`${styles.welcomeContainer} ${!isVisible ? styles.hidden : ""}`}
    >
      <div className={styles.text}>
        <h1>Hoşgeldiniz</h1>
      </div>
      <div className={styles.painter}>
        < Image
          // Boyacıyı temsil eden resim
          src={decorators} // Boyacıyı temsil eden resim
          alt="Boyacı"
          className={styles.painterImage}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
