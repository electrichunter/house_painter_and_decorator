'use client';

import { useState } from "react";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [responseMsg, setResponseMsg] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');
    setResponseSuccess(false);

    const payload: any = {
      action: isSignup ? 'register' : 'login',
      email: form.email,
      password: form.password
    };

    if (isSignup) payload.name = form.name;

    try {
      const res = await fetch('/api/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setResponseMsg(data.error || "Bir hata oluştu.");
        setResponseSuccess(false);
      } else {
        setResponseMsg(data.message || "İşlem başarılı.");
        setResponseSuccess(true);

        if (!isSignup) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setForm({ name: '', email: '', password: '' }); // formu temizle
          setTimeout(() => {
            window.location.href = "/"; // anasayfaya yönlendir
          }, 1000);
        }
      }
    } catch (err) {
      console.error("API hatası:", err);
      setResponseMsg("Sunucu hatası oluştu.");
      setResponseSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-[370px] p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Processing..." : isSignup ? "Register" : "Login"}
          </button>
        </form>
        <p
          className="text-sm text-center mt-5 text-purple-700 cursor-pointer hover:underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setResponseMsg('');
          }}
        >
          {isSignup
            ? "Zaten üye misin? Giriş yap"  
            : "Hesabınız yok mu? Üye olmak için tıklayın"}
        </p>
        {responseMsg && (
          <p className={`mt-4 text-center ${responseSuccess ? "text-green-600" : "text-red-500"}`}>
            {responseMsg}
          </p>
        )}
      </div>
    </div>
  );
}
