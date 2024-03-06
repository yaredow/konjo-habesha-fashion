import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

export default function SearchBar() {
  return (
    <div className="top-0 mx-auto flex items-center justify-center">
      <div className="flex w-full max-w-6xl  items-center gap-2">
        <Input
          type="text"
          className="w-[50%] px-3 py-2"
          placeholder="Search..."
        />
        <Button className="px-3 py-2">
          <AiOutlineSearch />
        </Button>
      </div>
    </div>
  );
}
