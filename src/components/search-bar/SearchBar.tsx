import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <div className="inset-0 right-0 top-0 mx-auto flex justify-center space-x-2">
      <Input
        type="text"
        className="w-[50%] px-3 py-2"
        placeholder="Search..."
      />
      <Button className="px-3 py-2">
        <AiOutlineSearch />
      </Button>
    </div>
  );
}
