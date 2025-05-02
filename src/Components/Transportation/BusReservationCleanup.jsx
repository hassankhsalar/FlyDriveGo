import { useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

// This component handles cleanup of expired bus seat reservations
const BusReservationCleanup = () => {
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Run cleanup when component mounts
        const cleanupExpiredReservations = async () => {
            try {
                const response = await axiosSecure.post('/buses/cleanup-reservations');
                console.log('Cleanup result:', response.data);
            } catch (error) {
                console.error('Failed to cleanup expired reservations:', error);
            }
        };

        // Run cleanup immediately when component mounts
        cleanupExpiredReservations();

        // Then run cleanup every minute
        const cleanupInterval = setInterval(cleanupExpiredReservations, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(cleanupInterval);
    }, [axiosSecure]);

    // This is a utility component, no UI needed
    return null;
};

export default BusReservationCleanup;
