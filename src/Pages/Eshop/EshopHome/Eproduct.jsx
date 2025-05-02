import React, { useState } from "react";
import useProducts from "../../../Hooks/useProducts";
import ProductCard from "./ProductCard";
import useAuth from "../../../Hooks/useAuth";
import SkeletonCard from "../../../Components/SkeletonCard/skeletonCard";

const Eproduct = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    tags: [],
    search: "",
  });
  const [products, refetch, isLoading, isError] = useProducts(filters);

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedTags = checked
        ? [...prevFilters.tags, value]
        : prevFilters.tags.filter((tag) => tag !== value);
      return { ...prevFilters, tags: updatedTags };
    });
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
    { value: "camping", label: "Camping" },
    { value: "outdoor", label: "Outdoor" },
    { value: "tent", label: "Tent" },
    { value: "travel", label: "Travel" },
    { value: "hiking", label: "Hiking" },
    { value: "backpack", label: "Backpack" },
    { value: "adventure", label: "Adventure" },
    { value: "jacket", label: "Jacket" },
    { value: "winter", label: "Winter" },
    { value: "warm", label: "Warm" },
    { value: "water bottle", label: "Water Bottle" },
    { value: "hydration", label: "Hydration" },
    { value: "sleeping bag", label: "Sleeping Bag" },
    { value: "footwear", label: "Footwear" },
    { value: "boots", label: "Boots" },
    { value: "stove", label: "Stove" },
    { value: "cooking", label: "Cooking" },
    { value: "first aid", label: "First Aid" },
    { value: "safety", label: "Safety" },
    { value: "health", label: "Health" },
  ];

  return (
    <div className="my-[60px] md:my-[120px]">
      <div className="mb-10">
        <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose text-primary font-bold text-center">
          Gear Up for Your Next Adventure!
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:max-w-[250px]">
          <h3 className="text-xl font-medium mb-4">Filter Products</h3>
          <div className="flex flex-col gap-4">
            <div className="mb-4">
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
                  className="h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* Tags Filters with Checkboxes */}
            <div className="flex flex-col gap-2">
              {tagOptions.map((tag) => (
                <label key={tag.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tag.value}
                    checked={filters.tags.includes(tag.value)}
                    onChange={handleTagChange}
                    className="checkbox"
                  />
                  <span>{tag.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={resetFilters}
              className="btn bg-black text-white mt-4"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="w-full md:w-full">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 items-stretch">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    user={user}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eproduct;
