import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="p-4 bg-white text-black text-2xl font-semibold border-y-4 border-red-600">
        <ul className="flex flex-row gap-4 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li> | </li>
          <li>
            <Link href="/random">Who&apos;s That Pokemon?</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
