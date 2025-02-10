
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the App!</h1>
      <div className="space-x-4">
        <Link href="/ecommerce" className="text-blue-500 underline">Go to E-commerce</Link>
        <Link href="/dashboard" className="text-blue-500 underline">Go to Dashboard</Link>
      </div>
    </main>
  );
}
