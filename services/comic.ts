import algoliasearch from "algoliasearch/lite";
import { Comic } from "types.d";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);
const client_index = client.initIndex(process.env.ALGOLIA_INDEX_NAME as string);

const search = async (q: string): Promise<Comic[]> => {
  const response = await client_index.search<Comic>(q, {
    hitsPerPage: 10,
  });
  const hits = response.hits as Comic[];
  return hits;
};

export default { search };
