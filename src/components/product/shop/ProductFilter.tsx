import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DEFAULT_CUSTOM_PRICE,
  FILTER_OPTIONS,
  PRICE_FILTERS,
  SIZE_FILTERS,
} from "@/lib/utils/constants";
import { ProductState } from "@/lib/utils/validators/product-validators";
import { SetStateAction } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

interface ProductFilterProps {
  filter: ProductState;
  setFilter: React.Dispatch<SetStateAction<ProductState>>;
  _debouncedSubmit: DebouncedFunc<
    () => Promise<QueryObserverResult<any, Error>>
  >;
}

function ProductFilter({
  filter,
  setFilter,
  _debouncedSubmit,
}: ProductFilterProps) {
  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort" | "category">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }

    _debouncedSubmit();
  };
  return (
    <div className="mt-6">
      <ul className="space-y-4 border-b pb-6 text-sm font-medium ">
        {FILTER_OPTIONS.map((option) => (
          <li key={option.label}>
            <button
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  category: option.value,
                }));

                _debouncedSubmit();
              }}
              className={cn(
                "opacity-60 hover:cursor-pointer  hover:opacity-100",
                {
                  "opacity-100": filter.category === option.value,
                },
              )}
            >
              {option.value}
            </button>
          </li>
        ))}
      </ul>

      <Accordion type="multiple" className="animate-none">
        {/* size filter */}
        <AccordionItem value="size">
          <AccordionTrigger className="py-3 text-sm hover:text-gray-500">
            <span className="font-medium">Size</span>
          </AccordionTrigger>

          <AccordionContent className="animate-none pt-6">
            <ul className="space-y-4">
              {SIZE_FILTERS.options.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`size-${optionIdx}`}
                    onChange={() => {
                      applyArrayFilter({
                        category: "size",
                        value: option.value,
                      });
                    }}
                    checked={filter.size.includes(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`size-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Price filtering section */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3 text-sm ">
            <span className="font-medium">Price</span>
          </AccordionTrigger>

          <AccordionContent className="animate-none pt-6">
            <ul className="space-y-4">
              {PRICE_FILTERS.options.map((option, optionIdx) => (
                <li key={option.label} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${optionIdx}`}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: false,
                          range: [...option.value],
                        },
                      }));
                      _debouncedSubmit();
                    }}
                    checked={
                      !filter.price.isCustom &&
                      filter.price.range[0] === option.value[0] &&
                      filter.price.range[1] === option.value[1]
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`price-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
              <li className="flex flex-col justify-center gap-2">
                <div>
                  <input
                    type="radio"
                    id={`price-${PRICE_FILTERS.options.length}`}
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: true,
                          range: [0, 600],
                        },
                      }));
                      _debouncedSubmit();
                    }}
                    checked={filter.price.isCustom}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`price-${PRICE_FILTERS.options.length}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    Custom
                  </label>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium">Price</p>
                  <div>
                    {filter.price.isCustom
                      ? minPrice.toFixed(0)
                      : filter.price.range[0].toFixed(0)}{" "}
                    € -{" "}
                    {filter.price.isCustom
                      ? maxPrice.toFixed(0)
                      : filter.price.range[1].toFixed(0)}{" "}
                    €
                  </div>
                </div>

                <Slider
                  className={cn({
                    "opacity-50": !filter.price.isCustom,
                  })}
                  disabled={!filter.price.isCustom}
                  onValueChange={(range) => {
                    const [newMin, newMax] = range;

                    setFilter((prev) => ({
                      ...prev,
                      price: {
                        isCustom: true,
                        range: [newMin, newMax],
                      },
                    }));
                  }}
                  value={
                    filter.price.isCustom
                      ? filter.price.range
                      : DEFAULT_CUSTOM_PRICE
                  }
                  min={DEFAULT_CUSTOM_PRICE[0]}
                  defaultValue={DEFAULT_CUSTOM_PRICE}
                  max={DEFAULT_CUSTOM_PRICE[1]}
                  step={5}
                />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ProductFilter;
