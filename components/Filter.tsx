import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { ItemsList } from "./Home";
import { Product } from "../types/product";
import { getFilter } from "../utilities/getFilter";
import { ProductFilter } from "../types/filter";
import { filterCategories } from "../types/enum";
import MobileFilter from "./MobileFilter";
interface IProps {
  products: Product[];
}
enum sortOptionsStrings {
  Most_Popular = "Most Popular",
  Best_Rating = "Best Rating",
  Newest = "Newest",
  Low_to_High = "Price: Low to High",
  High_to_Low = "Price: High to Low",
}
const sortValues = [
  { name: sortOptionsStrings.Most_Popular, current: true },
  { name: sortOptionsStrings.Best_Rating, current: false },
  { name: sortOptionsStrings.Newest, current: false },
  { name: sortOptionsStrings.Low_to_High, current: false },
  { name: sortOptionsStrings.High_to_Low, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Filter({ products }: IProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productList, setProductList] = useState(products);
  const [sortOptions, setSortOptions] = useState(sortValues);

  const [filters, setFilters] = useState<ProductFilter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFilters(getFilter(products));
  }, []);
  const handleSortOption = (option: string) => {
    const productsToFilter =
      filteredProducts.length > 0 ? filteredProducts : productList;
    if (option === sortOptionsStrings.Low_to_High) {
      setFilteredProducts(
        [...productsToFilter].sort(
          (a, b) => parseInt(a.price) - parseInt(b.price)
        )
      );
    }
    if (option === sortOptionsStrings.High_to_Low) {
      setFilteredProducts(
        [...productsToFilter].sort(
          (a, b) => parseInt(b.price) - parseInt(a.price)
        )
      );
    }
  };
  const filterProducts = (
    category: string,
    filter: string,
    checked: boolean
  ) => {
    console.log("checked", checked);
    if (checked) {
      const prodList = [...products]?.filter((product) => {
        if (!category || !filter) return true;
        if (
          (category === filterCategories.Color && product.color === filter) ||
          (category === filterCategories.Category &&
            product.category === filter)
        )
          return true;
      });
      console.log("prod list", [...prodList]);
      console.log("filtered products", [...filteredProducts]);
      setFilteredProducts([...filteredProducts, ...prodList]);
    } else {
      const prodList = [...filteredProducts]?.filter((product) => {
        if (
          (category === filterCategories.Color && product.color !== filter) ||
          (category === filterCategories.Category &&
            product.category !== filter)
        )
          return true;
      });
      console.log("prod list", [...prodList]);
      console.log("filtered products", [...filteredProducts]);
      setFilteredProducts([...prodList]);
    }
  };
  return (
    <div className="bg-white">
      <div>
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          filterProducts={filterProducts}
        />
        <main className="max-w-7xl mx-auto ">
          <div className="relative z-10  items-baseline justify-between pt-4 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-end">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <button
                                onClick={(e) =>
                                  handleSortOption(e.currentTarget.value)
                                }
                                value={option.name}
                              >
                                {option.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {/* <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                >
                  {subCategories.map((category) => (
                    <li key={category}>
                      <div>{category}</div>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            <div>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    onClick={(e) =>
                                      e.currentTarget.value
                                        ? filterProducts(
                                            section.name,
                                            e.currentTarget.value,
                                            e.currentTarget.checked
                                          )
                                        : null
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" > */}
                {filteredProducts.length > 0 ? (
                  <ItemsList products={filteredProducts}></ItemsList>
                ) : (
                  <ItemsList products={products}></ItemsList>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
