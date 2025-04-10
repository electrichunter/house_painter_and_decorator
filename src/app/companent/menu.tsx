"use client";
import React, { useState } from "react";
import styles from "../styles/menu.module.css";
import Image from "next/image";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import decorators from "../../../public/decarators-Photoroom.png";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`${styles.header} flex items-center justify-between px-4 sm:px-6`}>
      <div className={styles.logo}>
        <Image src={decorators} alt="Logo" width={50} height={50} />
      </div>

      <button
        className="sm:hidden text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      <nav
        className={`${styles.navBar} ${
          isOpen ? "block" : "hidden"
        } sm:block absolute sm:static top-full left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow sm:shadow-none`}
      >
        <ul className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-0">
          <li>
            <a href="/">Ana sayfa</a>
          </li>
          <li>
            <a href="/contact">İletişim</a>
          </li>
        </ul>
      </nav>

      <div className={`${styles.login} hidden sm:flex`}>
        <a className={styles.btn} href="/girişyap">Giriş yap</a>
        <a className={styles.btn} href="/kayit">Kayıt ol</a>
      </div>
    </header>
  );
}

export default Menu;