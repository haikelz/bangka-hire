import Image from "next/image";

export function Header() {
  return (
    <header className="border-b border-b-secondary_color_1">
      <nav>
        <h2 className="text-black font-bold text-4xl">Dashboard</h2>
        <Image src="/assets/logo.png" alt="logo" width={138} height={77} />
      </nav>
    </header>
  );
}
