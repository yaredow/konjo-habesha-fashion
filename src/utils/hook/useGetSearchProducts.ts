import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

async function fetchSearchProducts(query: string) {
  const result = await axios.get(
    ` https://localhost:3000/api/product/search/${query}`,
  );
  return result.data.results;
}

export default function useGetProductSearch(query: string) {
  const [results, setResults] = useState();
  const queryClient = useQueryClient();

  const { isPending: isSearching, mutate: search } = useMutation({
    mutationFn: () => fetchSearchProducts(query),
    onSettled: (data, query) => {
      queryClient.setQueryData(["searchResults", query], data);
      setResults(data || []);
    },
  });

  return { isSearching, results, search };
}
