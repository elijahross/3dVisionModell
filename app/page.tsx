import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-center">
      <div className="xl:w-[50%] w-full items-center font-mono flex flex-col ">
        <HeroSection/>
      </div>
    </main>
  );
}
