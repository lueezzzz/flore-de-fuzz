import { NAV_LINKS } from "@/constants/links";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header>
        <nav className="">
          {NAV_LINKS?.map((NAV_LINK, index) => {
            return (
              <Link key={index} href={NAV_LINK.href}>
                {NAV_LINK.title}
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}
