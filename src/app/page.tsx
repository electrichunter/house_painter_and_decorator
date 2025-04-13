import Welcome from "./companent/WelcomeScreen";
import HomePage from "./companent/WelcomeHome";
import ServiceCards from "./companent/Servicecard";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Welcome />
      <HomePage />
      <div className="pt-56">
        <ServiceCards />
      </div>
    </div>
  );
}
