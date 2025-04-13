"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/menu.module.css";
import Image from "next/image";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import decorators from "../../../public/decarators-Photoroom.png";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <header className={`${styles.header} flex items-center justify-between px-4 sm:px-6`}>
      <div className={styles.logo}>
        <Image src={decorators} alt="Logo" width={50} height={50} />
      </div>

      <button className="sm:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      <nav className={`${styles.navBar} ${isOpen ? "block" : "hidden"} sm:block absolute sm:static top-full left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow sm:shadow-none`}>
        <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-0">
          <li><a href="/">Ana sayfa</a></li>
          <li><a href="/contact">İletişim</a></li>
          {user && (
            <>
              <li><a href="/hizmet">Hizmet al</a></li>
              <li><a href="/profile">Profilim</a></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Çıkış Yap
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className={`${styles.login} hidden sm:flex`}>
        {!user && (
          <a className={styles.btn} href="/login">Giriş yap</a>
        )}
      </div>
    </header>
  );
}

export default Menu;
