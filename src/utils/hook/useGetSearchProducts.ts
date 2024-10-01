import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { URL } from "../constants";

async function fetchSearchProducts(query: string) {
  const { data } = await axios.get(`${URL}/api/product/search?text=${query}`);

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
