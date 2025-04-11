import React, { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const BecomeASeller = () => {
  const axiosPublic = useAxiosPublic()
;  const [formData, setFormData] = useState({
    email: '',
    storeName: '',
    tradeLicense: '',
    category: '',
    bannerUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosPublic.post('/becomeseller', formData);
      if (res.data?.insertedId || res.status === 201) {
        alert('Seller registered successfully!');
        setFormData({
          email: '',
          storeName: '',
          tradeLicense: '',
          category: '',
          bannerUrl: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-slate-200 shadow-lg rounded-lg font-poppins">
      <h2 className="text-3xl text-primary font-bold font-red-rose mb-6 text-center">Become a Seller</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-semibold">User Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="example@email.com"
          />
        </div>

        {/* Store Name */}
        <div>
          <label className="block font-semibold">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Your Store Name"
          />
        </div>

        {/* Trade License */}
        <div>
          <label className="block font-semibold">Trade License Number</label>
          <input
            type="text"
            name="tradeLicense"
            value={formData.tradeLicense}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="Enter Trade License No."
          />
        </div>

        {/* Merchandise Category */}
        <div>
          <label className="block font-semibold">Merchandise Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="e.g. Electronics, Fashion, Books"
          />
        </div>

        {/* Banner Image URL */}
        <div>
          <label className="block font-semibold">Banner Image URL</label>
          <input
            type="url"
            name="bannerUrl"
            value={formData.bannerUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeASeller;
