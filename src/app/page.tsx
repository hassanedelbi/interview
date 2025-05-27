import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Interview Questions</h1>
      <div className="flex gap-4">
        <Link
          href="/unstable-api"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Unstable API
        </Link>
        <Link
          href="/clean-jms-code"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Clean JMS Code
        </Link>
      </div>
    </div>
  );
}
