export default function ContactSection() {
  return (
    <section id="contact" className="bg-transparent pt-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">İletişim</h2>
          <p className="text-gray-600 mb-2">Adres: Ankara, Çankaya</p>
          <p className="text-gray-600 mb-2">Telefon: +90 530 123 45 67</p>
          <a
            href="https://wa.me/905301234567"
            className="inline-block mt-4 bg-blue-500 text-white px-4 sm:px-5 py-2 rounded-2xl shadow hover:bg-blue-600 transition"
          >
            WhatsApp ile İletişim
          </a>
        </div>
        <form className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Adınız"
            className="w-full border border-gray-200 rounded-xl px-4 py-2"
          />
          <input
            type="email"
            placeholder="E-posta"
            className="w-full border border-gray-200 rounded-xl px-4 py-2"
          />
          <textarea
            rows={4}
            placeholder="Mesajınız"
            className="w-full border border-gray-200 rounded-xl px-4 py-2"
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white px-4 sm:px-6 py-2 rounded-2xl hover:bg-[#7cb0c1] transition"
          >
            Gönder
          </button>
        </form>
      </div>
    </section>
  );
}
