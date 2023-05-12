import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import OffCanvas from "../OffCanvas/OffCanvas";
import Link from "next/link";
import Image from "next/image";

const countryImages = {
  en: "/images/flags/eu.png",
  es: "/images/flags/pe.png",
};

const Locales = () => {
  const { locale, locales } = useRouter();
  const [show, setShow] = useState(false);
  const close = useCallback(() => {
    setShow(false);
  }, []);
  const availableLocales = locales?.filter((l) => l !== locale) || [];
  return (
    <div className="relative w-10">
      <button
        className={`rounded-full border p-2 bg-white border-stone-200 ${
          show ? "z-50 relative" : ""
        }`}
        onClick={() => setShow(true)}
      >
        <Image
          src={countryImages[locale as "en" | "es"]}
          alt={locale || ""}
          width={72}
          height={72}
        />
      </button>
      <OffCanvas show={show} close={close}>
        {show && (
          <ul
            className={`flex flex-col gap-4 absolute top-full right-0 min-w-full z-20 mt-2`}
          >
            {availableLocales.map((l) => (
              <Locale
                locale={l}
                to="/"
                key={l}
                image={countryImages[l as "en" | "es"]}
                close={close}
              />
            ))}
          </ul>
        )}
      </OffCanvas>
    </div>
  );
};

const Locale = ({
  to = "/",
  locale,
  image,
  close,
}: {
  to?: string;
  locale: string;
  image: string;
  close: () => void;
}) => {
  return (
    <li className="rounded-full overflow-hidden">
      <Link
        href={to}
        locale={locale}
        onClick={close}
        className="block bg-white border-stone-100 border p-2"
      >
        <img src={image} alt={locale} />
      </Link>
    </li>
  );
};

export default Locales;
