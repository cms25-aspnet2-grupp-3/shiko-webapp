import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

type MenuItem = {
  title: string;
  path: string;
  icon: string;
};

export default function Sidebar() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [general, setGeneral] = useState<MenuItem[]>([]);
  const itemClassName =
    "group flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition hover:bg-[#F9CCCB]";
  const iconWrapperClassName =
    "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition group-hover:bg-[#ED5735]";

  const isLogoutItem = (item: MenuItem) =>
    item.title.trim().toLowerCase() === "logout" ||
    item.path.trim().toLowerCase() === "/logout";
  const handleLogout = () => signOut({ callbackUrl: "/signin" });
  const generalItems = general.some(isLogoutItem)
    ? general
    : [
        ...general,
        {
          title: "Logout",
          path: "/logout",
          icon: "/icons/logout-icon.svg",
        },
      ];

  useEffect(() => {
    fetch("https://shikosidebar-mike.azurewebsites.net/api/sidebar")
      .then(res => res.json())
      .then(data => {
        setMenu(data.menu);
        setGeneral(data.general);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-gray-400">MENU</div>

      {menu.map((item) => (
        <Link key={item.title} href={item.path}>
          <div className={itemClassName}>
            <span className={iconWrapperClassName}>
              <img src={item.icon} className="w-5 h-5" alt={item.title} />
            </span>
            <span className="text-gray-800">{item.title}</span>
          </div>
        </Link>
      ))}

      <div className="text-sm text-gray-400 mt-4">GENERAL</div>

      {generalItems.map((item) =>
        isLogoutItem(item) ? (
          <button
            key={item.title}
            type="button"
            onClick={handleLogout}
            className={`${itemClassName} text-left`}
          >
            <span className={iconWrapperClassName}>
              <img src={item.icon} className="w-5 h-5" alt={item.title} />
            </span>
            <span className="text-gray-800">{item.title}</span>
          </button>
        ) : (
          <Link key={item.title} href={item.path}>
            <div className={itemClassName}>
              <span className={iconWrapperClassName}>
                <img src={item.icon} className="w-5 h-5" alt={item.title} />
              </span>
              <span className="text-gray-800">{item.title}</span>
            </div>
          </Link>
        ),
      )}

      <div
        className="rounded-2xl p-6 bg-cover bg-center mt-6 h-36 flex flex-col justify-between max-w-[300px]"
        style={{ backgroundImage: "url('/images/Rectangle-menu.png')" }}
      >
        <p className="text-white text-lg font-semibold leading-tight">
          Download Our <br /> Mobile App
        </p>

        <button className="bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm w-fit">
          Download App
        </button>
      </div>
    </div>
  );
}
