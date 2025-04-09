import React from 'react';
import styles from '../styles/menu.module.css';
import Image from 'next/image';
import decorators from '../../../public/decarators-Photoroom.png'; // Import the image

function Menu() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src={decorators} // Use the imported image
          alt="Logo"
          width={60} // Increased width for better visibility
          height={60} // Increased height for better visibility
        />
      </div>

      <nav className={styles.navBar }>
        <ul>
          <li className='clore-black'>  
            <a href="/">Ana sayfa</a>
          </li>
          <li>
            <a href="/iletişim">İletişim</a>
          </li>
        </ul>
      </nav>

      <div className={styles.login}>
        <a className={styles.btn} href="/girişyap">Giriş yap</a>
        <a className={styles.btn} href="/kayit">Kayıt ol</a>
      </div>
    </header>
  );
}

export default Menu;