"use client";
import { useState } from "react";
import IntroGate from "@/components/IntroGate";
import SceneStage from "@/components/SceneStage";
import Cursor from "@/components/Cursor";

export default function Home() {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <>
      <Cursor />
      <IntroGate onOpen={() => setGateOpen(true)} />
      <SceneStage gateOpen={gateOpen} />
    </>
  );
}
