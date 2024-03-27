import { Skeleton } from "../ui/skeleton";

export function ProductSkeleton({ length }: { length: number }) {
  return (
    <div className=" flex flex-row gap-2">
      {Array.from({ length: length }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <Skeleton className="h-[250px] w-[200px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
