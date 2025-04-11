import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import PageHeader from './components/PageHeader';
import SearchAndFilterBar from './components/SearchAndFilterBar';
import CarCard from './components/CarCard';
import LoadingIndicator from './components/LoadingIndicator';
import NoResultsFound from './components/NoResultsFound';

const ByCar = () => {
    const axiosPublic = useAxiosPublic();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 500],
        carType: 'all',
        transmission: 'all',
        seats: 0
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('price-asc');

    // Fetch car data from API endpoint
    useEffect(() => {
        setLoading(true);
        axiosPublic.get('/transportation-cars')
            .then(response => {
                setCars(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching car data:', err);
                setError('Failed to load car data. Please try again later.');
                setLoading(false);
            });
    }, [axiosPublic]);

    // Filter the cars based on user selections
    const filteredCars = cars
        .filter(car => car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.type?.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(car => filters.carType === 'all' || car.type === filters.carType)
        .filter(car => filters.transmission === 'all' || car.transmission === filters.transmission)
        .filter(car => car.seats >= filters.seats)
        .filter(car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1])
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e, index) => {
        const newPriceRange = [...filters.priceRange];
        newPriceRange[index] = parseInt(e.target.value);
        setFilters(prev => ({ ...prev, priceRange: newPriceRange }));
    };

    return (
        <div className="container mx-auto py-8 px-4 font-red-rose">
            {/* Header with back button */}
            <PageHeader />

            {/* Search and filter bar */}
            <SearchAndFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
                handleFilterChange={handleFilterChange}
                handlePriceChange={handlePriceChange}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Results count */}
            <p className="text-gray-600 mb-4">
                {loading ? 'Loading cars...' : `${filteredCars.length} cars found`}
            </p>

            {/* Car listings */}
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <div className="text-center text-red-500 py-8">
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    {filteredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCars.map((car) => (
                                <CarCard key={car.id || car._id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <NoResultsFound />
                    )}
                </>
            )}
        </div>
    );
};

export default ByCar;