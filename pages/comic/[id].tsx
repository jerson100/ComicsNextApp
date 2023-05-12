import { Comic as IComic, IPaths } from "types";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs/promises";
import Head from "next/head";
import Link from "next/link";
import useIdiomaContext from "hooks/useIdiomaContext";

const DISABLED = "text-gray-500 cursor-not-allowed pointer-events-none";
const ENABLED = "text-blue-500 cursor-pointer";

const ComicPage = ({
  title,
  alt,
  img,
  num,
  hasNext,
  hasPrev,
}: IComic & {
  hasNext: boolean;
  hasPrev: boolean;
}) => {
  const { t } = useIdiomaContext();
  return (
    <>
      <Head>
        <title>{`${title} | ${t("NAME_APP")}`}</title>
        <meta name="description" content={title} />
      </Head>
      <h1 className="text-center font-bold text-3xl mb-12">{title}</h1>
      <img src={img} alt={alt} className="mx-auto mb-4" />
      <p className="mb-4">{alt}</p>
      <div className="flex justify-between gap-4">
        <Link
          href={`/comic/${num - 1}`}
          className={hasPrev ? ENABLED : DISABLED}
        >
          ← {t("PREVIOUS")}
        </Link>
        <Link
          href={`/comic/${num + 1}`}
          className={hasNext ? ENABLED : DISABLED}
        >
          {t("NEXT")} →
        </Link>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const directories = await fs.readdir("data");
  const paths = locales
    ? locales.reduce<IPaths[]>((previousLocale, currentLocale) => {
        previousLocale.concat(
          directories.map((d) => ({
            params: { id: d.replace(".json", "") },
            locale: currentLocale,
          }))
        );
        return previousLocale;
      }, [])
    : [];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const file = await fs.readFile(`data/${params?.id}.json`);
  const tojson = JSON.parse(file.toString());
  const prev = (tojson.num as number) - 1;
  const next = (tojson.num as number) + 1;
  const [prevCommic, nextCommic] = await Promise.allSettled([
    fs.stat(`data/${prev}.json`),
    fs.stat(`data/${next}.json`),
  ]);
  const hasNext = nextCommic.status === "fulfilled";
  const hasPrev = prevCommic.status === "fulfilled";
  return {
    props: {
      ...tojson,
      hasNext,
      hasPrev,
    },
  };
};

export default ComicPage;
