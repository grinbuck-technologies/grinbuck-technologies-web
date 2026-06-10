"use client";
import dynamic from "next/dynamic";

// ssr:false must live in a Client Component per Next.js docs.
// OrbitingGears accesses window in its useState initializer, so it must never run on the server.
const OrbitingGearsClient = dynamic(() => import("./OrbitingGears"), { ssr: false });

export default OrbitingGearsClient;
