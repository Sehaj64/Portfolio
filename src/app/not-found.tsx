import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-9xl font-bold text-white/5 mb-4 select-none">404</h1>
        <div className="relative -mt-20">
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-white/40 mb-12 max-w-md mx-auto">
            The resource you are looking for has been moved, removed, or never existed in this dimension.
          </p>
          <Link 
            href="/" 
            className="px-8 py-4 bg-emerald-accent text-black font-bold rounded-lg hover:scale-105 transition-transform inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
