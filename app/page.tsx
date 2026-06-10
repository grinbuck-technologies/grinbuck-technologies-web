"use client";
import { useState } from "react";
import IntroGate from "@/components/IntroGate";
import Hero from "@/components/Hero";
import Ventures from "@/components/Ventures";
import Cursor from "@/components/Cursor";

export default function Home() {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <>
      <Cursor />
      <IntroGate onOpen={() => setGateOpen(true)} />
      <Hero gateOpen={gateOpen} />
      <Ventures />
    </>
  );
}
