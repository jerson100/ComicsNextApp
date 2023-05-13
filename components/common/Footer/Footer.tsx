import useIdiomaContext from "@/hooks/useIdiomaContext";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { t } = useIdiomaContext();
  return (
    <footer className="text-center p-4">
      {t("FOOTER_COPYRIGHT")}
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
