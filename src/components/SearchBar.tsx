"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className="flex flex-1 items-center justify-between gap-4 rounded-md bg-gray-100 p-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 rounded-md bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Search className=" h-[20px] w-[20px]" />
      </button>
    </form>
  );
};

export default SearchBar;
