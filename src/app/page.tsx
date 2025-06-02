import Link from "next/link";

const links = [
  {
    href: "/unstable-api",
    label: "Unstable API",
  },
  {
    href: "/clean-code/1",
    label: "Clean Code 1",
  },
  {
    href: "/stock-stream-analyzer",
    label: "Stock Stream Analyzer",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Interview Questions</h1>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
