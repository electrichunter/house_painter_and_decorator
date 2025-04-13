import Image from "next/image";
import hero from "../../../public/ılutrasyonlar/house-paint.svg";

export default function HeroSection() {
  return (
    <section className="bg-transparent py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full flex justify-center">
          <Image
            src={hero}
            alt="Boya ustası çalışıyor"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Evinize Renk Katıyoruz
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
            Profesyonel boya ustalarımızla evinizi yeniliyoruz. İç ve dış cephe boyama, dekoratif dokunuşlar ve ücretsiz keşif hizmetimizle yanınızdayız.
          </p>
          <a
            href="contact"
            className="inline-block bg-blue-400 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg hover:bg-blue-500 transition"
          >
            Ücretsiz Keşif Talep Et
          </a>
        </div>
      </div>
    </section>
  );
}
