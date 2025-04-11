import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchAndFilterBar = ({ searchTerm, setSearchTerm, filters, setFilters, handleFilterChange, handlePriceChange, sortBy, setSortBy }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative flex">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by car name or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Car type filter */}
                <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Car Type</label>
                    <select
                        name="carType"
                        value={filters.carType}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All Types</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Sports">Sports</option>
                        <option value="Electric">Electric</option>
                    </select>
                </div>

                {/* Transmission filter */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Transmission</label>
                    <select
                        name="transmission"
                        value={filters.transmission}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>

                {/* Sorting */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Best Rated</option>
                    </select>
                </div>
            </div>

            {/* Additional filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Min price */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Min Price: ${filters.priceRange[0]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                        style={{
                            background: `linear-gradient(to right, #e5e7eb ${0}%, #3b82f6 ${0}%, #3b82f6 ${filters.priceRange[0] / 5}%, #e5e7eb ${filters.priceRange[0] / 5}%)`
                        }}
                    />
                </div>

                {/* Max price */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Max Price: ${filters.priceRange[1]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 ${filters.priceRange[1] / 5}%, #e5e7eb ${filters.priceRange[1] / 5}%)`
                        }}
                    />
                </div>

                {/* Min seats */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Minimum Seats: {filters.seats}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="8"
                        name="seats"
                        value={filters.seats}
                        onChange={handleFilterChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 ${(filters.seats / 8) * 100}%, #e5e7eb ${(filters.seats / 8) * 100}%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilterBar;
