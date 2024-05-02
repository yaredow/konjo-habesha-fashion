import { Product } from "../../../types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

async function fetchSearchProducts(query: string) {
  const { data } = await axios.get(
    `http://localhost:3000/api/product/search?text=${query}`,
  );

  return data.result;
}

export default function useGetProductSearch(query: string) {
  const [results, setResults] = React.useState<Product[] | null>(null);
  const queryClient = useQueryClient();

  const { isPending, mutate: search } = useMutation({
    mutationFn: () => fetchSearchProducts(query),
    onSettled: (data, query) => {
      queryClient.setQueryData(["searchResults", query], data);
      setResults(data || []);
    },
  });

  return { isPending, results, search };
}
