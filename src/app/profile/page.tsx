"use client";

import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null); // Yüklemek için dosya

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
      setImg(parsed.img || "");
    }
  }, []);

  const handleUpdate = async () => {
    if (!file) return; // Dosya yoksa işlem yapılmasın

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadResponse = await fetch(`/api/upload/${user.id}`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (uploadData.success) {
        setImg(uploadData.imgUrl); // Yeni resmin URL'sini alıp state'e ekliyoruz
      } else {
        setMessage(uploadData.error || "Resim yüklenirken hata oluştu");
        return;
      }

      // Profil bilgilerini güncelle
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name,
          email,
          img: uploadData.imgUrl || "/default-avatar.jpg", // Varsayılan resim yolu
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Profil başarıyla güncellendi");
        const updatedUser = { ...user, name, email, img: uploadData.imgUrl || "/default-avatar.jpg" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        setMessage(data.error || "Bir hata oluştu");
      }
    } catch (err) {
      setMessage("Sunucu hatası");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Kullanıcı dosyasını state'e alıyoruz
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <div className="text-center mt-10 text-gray-600">Yükleniyor...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-800">Profil Sayfası</h1>

      {img && (
        <div className="flex justify-center">
          <img src={img} alt="Profil Fotoğrafı" className="w-28 h-28 rounded-full border shadow-md object-cover" />
        </div>
      )}

      <div className="space-y-3">
        <label className="block">
          <span className="text-gray-700">Adınız</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
       
        <label className="block">
          <span className="text-gray-700">E-posta</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Profil Resmi Yükle</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600"
          />
        </label>
      </div>

      {message && (
        <div className="text-sm text-center text-green-600 font-medium">{message}</div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Güncelle
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;
