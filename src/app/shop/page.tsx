import ProductCollection from "@/components/product/ProductCollection";
import { getProducts } from "@/server/actions/product/getProducts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { unstable_noStore } from "next/cache";

async function page() {
  unstable_noStore();
  const data = await getProducts();
  return (
    <>
      <div>
        <ProductCollection products={data.products} />
      </div>
      {/* <div>
        <DropdownMenu>
          <DropdownMenuTrigger className=" group inline-flex justify-center text-sm font-medium">
            Sort
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div> */}
    </>
  );
}

export default page;
