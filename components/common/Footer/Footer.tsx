import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center p-4">
      All commics by
      <Link
        href="https://xkcd.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold ml-1"
      >
        xkcd
      </Link>
    </footer>
  );
};

export default Footer;
