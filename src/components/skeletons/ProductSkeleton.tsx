import { Skeleton } from "../ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className=" flex flex-row gap-2">
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-[250px] w-[200px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
