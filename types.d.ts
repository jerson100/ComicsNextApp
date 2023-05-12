import { ELOCALES } from "./config/idioma";

export interface Comic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export type LocalesType = keyof typeof ELOCALES;

export interface LenguageText {
  LATEST_COMICS: string;
  NAME_APP: string;
  NAME_HOME_PAGE: string;
  SEARCH_RESULT_TITLE: string;
  META_HOME_DESCRIPTION: string;
  NEXT: string;
  PREVIOUS: string;
}

export interface TProps {
  (
    key: keyof LenguageText,
    options?: { count?: number },
    ...args: string[]
  ): string;
}

export interface IdiomaContextProps {
  //locales: Record<LocalesType, LenguageText>;
  locales: Set<ELOCALES>;
  t: TProps;
}

export interface IPaths {
  params: {
    id: string;
  };
  locale?: string | undefined;
}
