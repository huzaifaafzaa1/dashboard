// app/ecommerce/layout.tsx
import Navbar from "@/components/Navbar";
import Bag from "@/components/Bag";

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 font-cabin w-full bg-lightblue ">
      <Navbar />
      {children}
      <Bag />
    </div>
  );
}
