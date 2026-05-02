import Image from "next/image";

export default function TopBar({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo-header.png"
          alt="logo"
          width={100}
          height={40}
        />
      </div>

      {/* Toggle / Close icon */}
      <button
        onClick={onToggle}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        <img src="/icons/close-icon.svg" className="w-4 h-4" alt="toggle"/>
      </button>

    </div>
  );
}