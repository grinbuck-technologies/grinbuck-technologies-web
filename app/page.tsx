import IntroGate from "@/components/IntroGate";
import OrbitingGearsClient from "@/components/OrbitingGearsClient";

export default function Home() {
  return (
    <>
      <IntroGate />
      <main className="min-h-screen flex items-center justify-center bg-white">
        <OrbitingGearsClient />
      </main>
    </>
  );
}
