import { PaintBucket, Building2, Stars } from "lucide-react"; // ikonlar (lucide-react gibi)

const services = [
  {
    title: "İç Cephe Boyama",
    icon: <PaintBucket className="w-8 h-8 text-[#90c3d4]" />,
    desc: "Evinizin iç mekanlarında kaliteli ve temiz boyama hizmeti.",
  },
  {
    title: "İç Cephe Alçı",
    icon: <Building2 className="w-8 h-8 text-[#a4d4ae]" />,
    desc: "Binalarınıza profesyonel alçı işlemi uygulamaları.",
  },
  {
    title: "Dekoratif Boyama",
    icon: <Stars className="w-8 h-8 text-[#f6d776]" />,
    desc: "Yaratıcı desenler ve özel efektlerle dekoratif çözümler.",
  },
];

export default function ServiceCards() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
