import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchSearchProducts(query: string) {
  const { data } = await axios.get(
    `https://localhost:3000/api/product/search?text=${query}`,
  );

  return data;
}

export default function useGetProductSearch(query: string) {
  const {
    data: searchResults,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["searchResults"],
    queryFn: () => fetchSearchProducts(query),
  });

  return { searchResults, isFetched, refetch };
}
