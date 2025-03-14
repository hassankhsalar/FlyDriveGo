import { useState } from 'react';
import { matchSorter } from 'match-sorter';
import FilterPanel from './FilterPanel';
import SortDropdown from './SortDropdown';
import OptionCard from './OptionCard';

const AirSection = ({ airData }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, Infinity],
    availableOnly: false,
    departureTime: null,
    durationMax: Infinity,
    provider: '',
    class: '',
  });
  const [sortKey, setSortKey] = useState('price');

  const applyFilters = (data) => {
    let filtered = data;
    if (filters.availableOnly) filtered = matchSorter(filtered, 'true', { keys: ['available'] });
    if (filters.priceRange) {
      filtered = filtered.filter(
        (item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
      );
    }
    if (filters.departureTime) {
      filtered = filtered.filter((item) => item.departureTime >= filters.departureTime);
    }
    if (filters.durationMax < Infinity) {
      filtered = filtered.filter((item) => item.duration <= filters.durationMax);
    }
    if (filters.provider) {
      filtered = matchSorter(filtered, filters.provider, { keys: ['provider'] });
    }
    if (filters.class) {
      filtered = matchSorter(filtered, filters.class, { keys: ['class'] });
    }
    return filtered.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
  };

  const filteredAir = applyFilters(airData);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-CharcoleDark">By Air</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <FilterPanel filters={filters} setFilters={setFilters} section="air" />
        <div className="flex-1 md:mt-[-54px]">
          <SortDropdown sortKey={sortKey} setSortKey={setSortKey} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAir.map((option) => (
              <OptionCard key={option.id} option={option} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirSection;