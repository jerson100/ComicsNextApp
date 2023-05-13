import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Comic } from "types";
import OffCanvas from "../OffCanvas";
import { Circles } from "react-loader-spinner";
import useDebounce from "hooks/useDebounce";
import useIdiomaContext from "@/hooks/useIdiomaContext";
import Image from "next/image";

const Search = () => {
  const { t } = useIdiomaContext();
  const [pics, setPics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 500);
  const [error, setError] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const getApi = async () => {
      if (debouncedValue === "") {
        setPics([]);
        setLoading(false);
        setError(false);
        return;
      }
      abortController.current = new AbortController();
      setShowOffCanvas(true);
      setError(false);
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${debouncedValue}`, {
          signal: abortController.current.signal,
        });
        const data = await response.json();
        setPics(data);
        setLoading(false);
      } catch (e) {
        setError(e instanceof Error && e.name !== "AbortError");
      }
    };
    getApi();
    return () => {
      abortController.current?.abort();
    };
  }, [debouncedValue]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const close = useCallback(() => {
    setShowOffCanvas(false);
  }, []);

  return (
    <div className="relative w-full max-w-[300px]">
      <OffCanvas show={showOffCanvas} close={close}>
        <input
          name="search"
          value={input}
          autoComplete="off"
          onChange={handleChange}
          onFocus={() => setShowOffCanvas(true)}
          placeholder={t("SEARCH")}
          className={`relative border-2 border-stone-200 focus:outline-none focus:border-blue-500 rounded-full px-4 py-2 w-full ${
            showOffCanvas ? "z-20" : ""
          }`}
        />
        {showOffCanvas && (
          <div className="absolute left-0 top-full w-full z-20 flex gap-1 flex-col items-center">
            <div>
              <div className="border-t-[7px] border-r-[7px] border-r-transparent border-t-white border-b-transparent border-l-transparent border-l-[7px] inline-block mx-auto relative left-1/2 -translate-x-1/2"></div>
            </div>
            <div className="border-stone-200 bg-white rounded-md flex max-h-[280px] w-full">
              {loading || error || pics.length === 0 ? (
                <div className="flex items-center justify-center h-20 flex-grow">
                  {loading ? (
                    <Circles color="#00BFFF" height={50} />
                  ) : (
                    <p className="px-4 text-center">
                      {error ? t("ERROR_SEARCH") : t("NO_RESULTS_FOUND")}
                    </p>
                  )}
                </div>
              ) : (
                <ul className="flex-grow overflow-auto">
                  <li className="w-full">
                    <Link
                      href={`/search?q=${debouncedValue}`}
                      className="hover:bg-blue-100 block transition-all p-2 whitespace-nowrap overflow-hidden text-ellipsis"
                      onClick={() => setShowOffCanvas(false)}
                    >
                      {t(
                        "SHOW_COUNT_RESULTS",
                        {
                          count: pics.length == 1 ? 1 : 2,
                        },
                        pics.length.toString()
                      )}
                    </Link>
                  </li>
                  {pics.map((pic) => (
                    <li key={pic.num} className="w-full">
                      <Link
                        href={`/comic/${pic.num}`}
                        className="hover:bg-blue-100 flex items-center gap-2 transition-all p-2"
                        onClick={() => setShowOffCanvas(false)}
                      >
                        <div className="w-8 h-8">
                          <Image
                            src={pic.img}
                            width={32}
                            height={32}
                            alt={pic.alt}
                            className="rounded-full w-full h-full"
                          />
                          {/* <img src={pic.img} className="w-full h-full" /> */}
                        </div>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {pic.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </OffCanvas>
    </div>
  );
};

export default Search;
