import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-primary mb-2">404</h1>
      <p className="text-xl mb-6">Ei page ta khuje pawa jayni.</p>
      <Link href="/" className="btn btn-primary">Home e Fire Jao</Link>
    </div>
  );
}