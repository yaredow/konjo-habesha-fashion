import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

async function fetchSearchProducts(query: string) {
  const { data } = await axios.get(
    `http://localhost:3000/api/product/search?text=${query}`,
  );

  console.log(data.results);

  return data.results;
}

export default function useGetProductSearch(query: string) {
  const [results, setResults] = useState<Product[] | null>(null);
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
