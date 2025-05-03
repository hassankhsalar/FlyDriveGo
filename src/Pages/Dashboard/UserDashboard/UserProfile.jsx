import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        photoURL: user?.photoURL || 'https://i.pravatar.cc/300',
    });
    const [newPhotoFile, setNewPhotoFile] = useState(null);
    const [newPhotoPreview, setNewPhotoPreview] = useState(null);

    useEffect(() => {
        // In a real implementation, you would fetch the user's profile data
        // from your backend here
        const fetchUserProfile = async () => {
            try {
                // This is a placeholder. In a real app, you'd fetch from an API
                // const response = await axiosPublic.get(`/users/${user?.email}`);
                // setProfileData(response.data);

                // For the demo, we'll just use some mock data
                setProfileData({
                    name: user?.displayName || 'User Name',
                    email: user?.email || 'user@example.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Travel Lane, Adventure City, AC 12345',
                    photoURL: user?.photoURL || 'https://i.pravatar.cc/300',
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Could not load profile data');
            }
        };

        if (user?.email) {
            fetchUserProfile();
        }
    }, [user, axiosPublic]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            // In a real implementation, you would save the profile data to your backend
            // and update the user profile in Firebase auth if needed

            // Example code for uploading photo (commented out as it's not functional in this demo)
            /*
            let photoURL = profileData.photoURL;
            if (newPhotoFile) {
                // Upload photo logic would go here
                // const formData = new FormData();
                // formData.append('photo', newPhotoFile);
                // const response = await axiosPublic.post('/upload-photo', formData);
                // photoURL = response.data.url;
            }
            */

            // Update Firebase auth profile
            if (user && profileData.name !== user.displayName) {
                await updateUserProfile({
                    displayName: profileData.name,
                    // photoURL: photoURL
                });
            }

            // Update user data in your database
            // await axiosPublic.put(`/users/${user.email}`, { 
            //    name: profileData.name,
            //    phone: profileData.phone,
            //    address: profileData.address,
            //    photoURL: photoURL
            // });

            toast.success('Profile updated successfully');
            setEditMode(false);
            setNewPhotoFile(null);
            setNewPhotoPreview(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        // Reset to original values
        setProfileData({
            name: user?.displayName || '',
            email: user?.email || '',
            phone: '+1 (555) 123-4567', // Reset to last saved value
            address: '123 Travel Lane, Adventure City, AC 12345', // Reset to last saved value
            photoURL: user?.photoURL || 'https://i.pravatar.cc/300',
        });
        setEditMode(false);
        setNewPhotoFile(null);
        setNewPhotoPreview(null);
    };

    return (
        <div className="py-8 px-4 md:px-8 lg:px-12 bg-gray-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
            >
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white relative">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <p className="text-blue-100">Manage your personal information</p>

                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="absolute top-6 right-6 bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        >
                            <FaEdit className="text-xl" />
                        </button>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Photo Section */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                                    <img
                                        src={newPhotoPreview || profileData.photoURL}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {editMode && (
                                    <label htmlFor="photo-upload" className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                        <FaCamera />
                                        <input
                                            type="file"
                                            id="photo-upload"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 text-center">
                                {profileData.name}
                            </h2>
                            <p className="text-gray-500 text-center mb-4">
                                {user?.email}
                            </p>
                        </div>

                        {/* Profile Information Section */}
                        <div className="w-full md:w-2/3">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <FaUser className="inline mr-2 text-blue-500" />
                                        Full Name
                                    </label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                                            {profileData.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <FaEnvelope className="inline mr-2 text-blue-500" />
                                        Email Address
                                    </label>
                                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                                        {profileData.email}
                                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            Verified
                                        </span>
                                    </p>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <FaPhone className="inline mr-2 text-blue-500" />
                                        Phone Number
                                    </label>
                                    {editMode ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                                            {profileData.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                                        Address
                                    </label>
                                    {editMode ? (
                                        <textarea
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                                            {profileData.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Edit Mode Buttons */}
                            {editMode && (
                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={loading}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                                    >
                                        <FaSave className="mr-2" />
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        <FaTimes className="mr-2" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Account Security Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8"
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Account Security
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">Password</h3>
                                <p className="text-gray-500 text-sm">Last changed: 3 months ago</p>
                            </div>
                            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Change Password
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                                <p className="text-gray-500 text-sm">Secure your account with 2FA</p>
                            </div>
                            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Enable
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">Connected Accounts</h3>
                                <p className="text-gray-500 text-sm">Manage social login connections</p>
                            </div>
                            <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Manage
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Preferences Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8"
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Preferences
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                <p className="text-gray-500 text-sm">Receive updates and promotions</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                                <p className="text-gray-500 text-sm">Get booking updates via text</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                            <div>
                                <h3 className="font-medium text-gray-800">Marketing Preferences</h3>
                                <p className="text-gray-500 text-sm">Receive promotional offers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfile;