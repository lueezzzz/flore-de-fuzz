import { NAV_LINKS } from "@/constants/links";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header>
        <div className="nav-container flex items-center justify-between px-6 py-4">
          <div className="logo flex-1 flex items-center">
            <Link href="/" className="text-rose-500">
              Flore de Fuzz
            </Link>
          </div>
          <nav className="nav-links space-x-2">
            {NAV_LINKS?.map((NAV_LINK, index) => {
              return (
                <Link key={index} href={NAV_LINK.href}>
                  {NAV_LINK.title}
                </Link>
              );
            })}
          </nav>
          <div className="utility-sections flex-1 flex items-center justify-end">
            <Link href="login">
              <UserIcon className="h-5 w-5" />
            </Link>
            <Link href="">
              <ShoppingBagIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
