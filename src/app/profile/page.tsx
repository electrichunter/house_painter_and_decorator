"use client";

import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // localStorage'dan kullanıcı verisini al
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData)); // Veriyi JSON formatında parse et
    }
  }, []);

  const handleLogout = () => {
    // localStorage'dan kullanıcı verisini sil
    localStorage.removeItem("user");

    // Kullanıcıyı giriş sayfasına yönlendir
    window.location.href = "/login";
  };

  // Kullanıcı verisi alınana kadar loading state'i göster
  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div >
      <h1>Hoşgeldiniz, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded">
        Çıkış Yap
      </button>
    </div>
  );
};

export default Profile;
