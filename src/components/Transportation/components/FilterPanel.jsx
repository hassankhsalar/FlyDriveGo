import { useState } from "react";

const FilterPanel = ({ filters, setFilters, section }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown on mobile
  const classOptions =
    section === "road"
      ? ["economy", "luxury"]
      : ["economy", "business", "first"];

  return (
    <div className="w-full md:w-1/4 font-poppins">
      {/* Dropdown Toggle Button (Visible only on mobile) */}
      <button
        className={`md:hidden w-full p-4 text-CharcoleDark text-xl font-bold flex justify-between items-center rounded-lg shadow-md ${
          section === "road" ? "bg-secondary" : "bg-secondary"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter {section === "road" ? "Road" : "Air"} Options
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Filter Panel Content */}
      <div
        className={`w-full p-4 rounded-lg shadow-md md:block ${
          section === "road" ? "bg-secondary" : "bg-secondary"
        } ${isOpen ? "block" : "hidden"}`}
      >
        <h3 className="text-xl font-bold mb-4 text-CharcoleDark md:block hidden">
          Filter {section === "road" ? "Road" : "Air"} Options
        </h3>
        <div className="mb-4">
          <label className="block text-textGray">Price Range</label>
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]],
              })
            }
            className="input input-bordered w-full mb-2 bg-white text-textGray"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="input input-bordered w-full bg-white text-textGray"
          />
        </div>
        <label className="flex items-center mb-4 text-textGray">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) =>
              setFilters({ ...filters, availableOnly: e.target.checked })
            }
            className="checkbox mr-2"
          />
          Available Only
        </label>
        <div className="mb-4">
          <label className="block text-textGray">Max Duration (hours)</label>
          <input
            type="number"
            value={filters.durationMax === Infinity ? "" : filters.durationMax}
            onChange={(e) =>
              setFilters({
                ...filters,
                durationMax: Number(e.target.value) || Infinity,
              })
            }
            className="input input-bordered w-full bg-white text-textGray"
          />
        </div>
        <div className="mb-4">
          <label className="block text-textGray">Provider</label>
          <input
            type="text"
            value={filters.provider}
            onChange={(e) =>
              setFilters({ ...filters, provider: e.target.value })
            }
            className="input input-bordered w-full bg-white text-textGray"
            placeholder={section === "road" ? "e.g., Greyhound" : "e.g., Delta"}
          />
        </div>
        <div className="mb-4">
          <label className="block text-textGray">Class</label>
          <select
            value={filters.class}
            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
            className="select select-bordered w-full bg-white text-textGray"
          >
            <option value="">All</option>
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
