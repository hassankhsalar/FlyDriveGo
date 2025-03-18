const SortDropdown = ({ sortKey, setSortKey }) => {
    return (
      <div className="mb-4">
        <label className="mr-2 text-text">Sort By:</label>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="select select-bordered bg-white text-text"
        >
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="departureTime">Departure Time</option>
        </select>
      </div>
    );
  };
  
  export default SortDropdown;