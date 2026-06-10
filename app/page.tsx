import IntroGate from "@/components/IntroGate";

export default function Home() {
  return (
    <>
      <IntroGate />
      <main style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img
          src="/grinbuck-logo.png"
          alt="Grinbuck Technologies"
          style={{ width: "clamp(280px, 40vw, 520px)", height: "auto" }}
        />
      </main>
    </>
  );
}
