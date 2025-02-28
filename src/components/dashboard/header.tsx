import Image from "next/image";

export function Header() {
  return (
    <header className="border-b border-b-secondary_color_1 py-4 px-8 w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <nav className="flex justify-between items-center">
        <h2 className="text-black font-bold text-xl md:text-4xl">Dashboard</h2>
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="md:w-[138px] h-10 w-20 md:h-[77px]"
        />
      </nav>
    </header>
  );
}
