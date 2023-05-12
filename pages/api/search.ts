import { Comic } from "types";
import ComicService from "services/comic";
import { NextApiRequest, NextApiResponse } from "next";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;
  const comics: Comic[] = await ComicService.search(q as string);
  return res.status(200).json(comics);
}
