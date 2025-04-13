import Image from "next/image";
 import Auth from "../companent/AuthForm";
 
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-30 gap-26 sm:p-40 font-[family-name:var(--font-geist-sans)]">
 
 <Auth />
 



    </div>
  );
}
