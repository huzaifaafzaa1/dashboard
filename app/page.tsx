"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center  bg-slate-300 h-screen">
      <button className="bg-black text-white px-3 py-2 rounded-lg" onClick={()=>router.push("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}
