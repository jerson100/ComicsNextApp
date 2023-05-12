import Link from "next/link";
import React from "react";
import Search from "../Search";
import Locales from "../Locales/Locales";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 max-w-xl mx-auto w-full sticky top-0">
      <div className="h-full w-full absolute left-0 top-0 backdrop-blur-md"></div>
      <h1 className="font-bold z-10">
        <Link href="/">
          Comics
          <span className="font-light">App</span>
        </Link>
      </h1>
      <nav>
        <ul className="flex text-sm gap-4 list-none items-center">
          {/* <li>
            <Link href="/">Home</Link>
          </li> */}
          <li>
            <Search />
          </li>
        </ul>
      </nav>
      <Locales />
    </header>
  );
};

export default Header;
