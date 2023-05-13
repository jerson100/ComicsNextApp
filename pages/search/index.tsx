import useIdiomaContext from "hooks/useIdiomaContext";
import SearchService from "services/comic";
import { Comic } from "types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Index = ({ comics, q }: { comics: Comic[]; q: string }) => {
  const { t } = useIdiomaContext();
  const options = {
    count: comics.length === 0 || comics.length > 1 ? 2 : 1,
  };
  return (
    <section>
      <Head>
        <title>{`${q} | ${t("NAME_APP")}`}</title>
        <meta
          name="description"
          content={t("SEARCH_RESULT_TITLE", options, `${comics.length}`, q)}
        />
      </Head>
      <h1 className="mb-12 font-bold text-2xl text-center">
        {t("SEARCH_RESULT_TITLE", options, `${comics.length}`, q)}
      </h1>
      <ul className="flex flex-col gap-4">
        {comics.map((comic) => (
          <li
            key={comic.num}
            className="bg-white hover:bg-stone-200 block transition-all rounded-lg border border-stone-200"
          >
            <Link href={`/comic/${comic.num}`} className="block p-2">
              <article className="flex gap-4 items-center">
                <img
                  src={comic.img}
                  alt={comic.alt}
                  className="w-12 h-12 object-cover rounded-s-xl"
                />
                <h1>{comic.title}</h1>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { q = "" } = query;
  const comics = await SearchService.search(q as string);
  return {
    props: {
      comics: comics,
      q: q,
    },
  };
};

export default Index;
