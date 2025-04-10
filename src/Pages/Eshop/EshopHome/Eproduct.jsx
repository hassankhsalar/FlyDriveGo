import React, { useState } from "react";
import useProducts from "../../../Hooks/useProducts";
import Select from "react-select";
import ProductCard from "./ProductCard";

const Eproduct = () => {
  const [filters, setFilters] = useState({
    tags: [],
    search: "",
  });
  const [products, refetch, isLoading, isError] = useProducts(filters);
  const handleTagChange = (selectedTags) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: selectedTags.map((tag) => tag.value),
    }));
  };
  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };
  const resetFilters = () => {
    setFilters({
      tags: [],
      search: "",
    });
  };
  const tagOptions = [
    { value: "camping", label: "camping" },
    { value: "outdoor", label: "outdoor" },
    { value: "tent", label: "tent" },
    { value: "travel", label: "travel" },
    { value: "hiking", label: "hiking" },
    { value: "backpack", label: "backpack" },
    { value: "adventure", label: "adventure" },
    { value: "jacket", label: "jacket" },
    { value: "winter", label: "winter" },
    { value: "warm", label: "warm" },
    { value: "water bottle", label: "water bottle" },
    { value: "hydration", label: "hydration" },
    { value: "sleeping bag", label: "sleeping bag" },
    { value: "footwear", label: "footwear" },
    { value: "boots", label: "boots" },
    { value: "stove", label: "stove" },
    { value: "cooking", label: "cooking" },
    { value: "first aid", label: "first aid" },
    { value: "safety", label: "safety" },
    { value: "health", label: "health" },
  ];
  return (
    <div className="my-[60px] md:my-[120px]">
      <div className="mb-20">
        <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose  text-primary font-bold text-center">
          Gear Up for Your Next Adventure!
        </h2>
      </div>
      {/* filter */}
      <div className="my-6">
        <h3 className="text-xl font-medium mb-4">Filter Products</h3>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
                className="grow"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4  opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          <div className="">
            <Select
              isMulti
              options={tagOptions}
              onChange={handleTagChange}
              placeholder="Select Tags"
            />
          </div>
          <button onClick={resetFilters} className="btn bg-black text-white">
            Reset
          </button>
        </div>
      </div>
      {/* Products */}
      <div className="my-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            ></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eproduct;
