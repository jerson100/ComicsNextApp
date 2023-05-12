import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useCallback, useMemo } from "react";
import { en, es } from "translations";
import { IdiomaContextProps, LocalesType, TProps } from "types";
import { ELOCALES } from "config/idioma";

export const IdiomaContext = createContext<IdiomaContextProps | null>(null);

const l = {
  en: en,
  es: es,
};

const IdiomaProvider = ({ children }: PropsWithChildren) => {
  const { locale } = useRouter();
  const t: TProps = useCallback(
    (key, options = {}, ...args) => {
      const { count = 0 } = options;
      const local = locale as LocalesType;
      const text = l[local][key];
      if (args.length) {
        const part =
          count > 0
            ? text.split("||||").map((part) => part.trim())[count - 1]
            : "";
        return part.replaceAll(/\$\{[\d]+\}/g, (match) => {
          const index = parseInt(match.replace(/[^\d]/g, ""));
          return args[index - 1];
        });
      }
      return text;
    },
    [locale]
  );

  const memoValues: IdiomaContextProps = useMemo(() => {
    return {
      t,
      locales: new Set([ELOCALES.en, ELOCALES.es]),
    };
  }, [t, locale]);

  return (
    <IdiomaContext.Provider value={memoValues}>
      {children}
    </IdiomaContext.Provider>
  );
};

export default IdiomaProvider;
