import React, { memo } from "react";
import { Comic as IComic } from "types";
import Link from "next/link";

const Comic = ({
  alt,
  img,
  num,
  title,
  className,
}: Pick<IComic, "alt" | "img" | "num" | "title"> & {
  className?: string;
}) => {
  return (
    <li className={className}>
      <Link className="h-full flex flex-col gap-2" href={`/comic/${num}`}>
        <h3 className="font-semibold text-sm text-center">{title}</h3>
        <div className="flex-grow flex items-center justify-center">
          <img src={img} alt={alt} className="object-cover" />
        </div>
      </Link>
    </li>
  );
};

export default memo(Comic);
