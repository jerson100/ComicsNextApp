import { Comic as IComic } from "types";
import { GetStaticProps } from "next";
import fs from "fs";
import Comic from "components/common/Comic";
import Head from "next/head";
import useIdiomaContext from "hooks/useIdiomaContext";

interface HomeProps {
  comics: IComic[];
}

export default function Home({ comics }: HomeProps) {
  const { t } = useIdiomaContext();
  return (
    <>
      <Head>
        <title>{`${t("NAME_HOME_PAGE")} - ${t("NAME_APP")}`}</title>
        <meta name="description" content={t("META_HOME_DESCRIPTION")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="mb-12 text-3xl text-center font-bold">
        {t("LATEST_COMICS")}
      </h2>
      <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {comics.map((comic) => (
          <Comic key={comic.num} {...comic} />
        ))}
      </ul>
    </>
  );
}

//SSG
export const getStaticProps: GetStaticProps = async () => {
  const directories = fs.readdirSync("data");
  const lastComics = directories.slice(-8);
  const comics = lastComics.map((comic) => {
    const fileJson = fs.readFileSync(`data/${comic}`);
    return JSON.parse(fileJson.toString());
  });
  return {
    props: { comics },
  };
};
