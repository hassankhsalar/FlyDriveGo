import React, { useContext, useState, useMemo } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ProductUpdateModal from "./Components/ProductUpdateModal";

const SellerProductList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch Products
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products", email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/sellerProduct/${email}`);
            return res.data;
        },
    });

    const handleDelete = (item) => {
        Swal.fire({
            title: `Are you sure you want to delete ${item.productName}?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/deleteProduct/${item._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", `${item.productName} has been deleted.`, "success");
                    }
                });
            }
        });
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setTimeout(() => {
            document.getElementById("productUpdateModal").showModal();
        }, 0);
    };

    const excludedFields = ["_id", "sellerEmail", "tags", "productImage", "sellerName"];

    const filteredData = useMemo(() => {
        return products.filter((item) =>
            item.productName.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (!sortKey) return 0;
            if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortKey, sortOrder]);

    const handleSort = (key) => {
        setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
        setSortKey(key);
    };

    return (
        <div className="p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-4">
                {/* Search Input */}
                <div className="mb-4 flex">
                    <input
                        placeholder="Search product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-md py-2 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Table */}
                <div className="w-full rounded-md border border-gray-200 shadow-md overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-100 text-center">
                            <tr>
                                {products.length > 0 &&
                                    Object.keys(products[0])
                                        .filter((key) => !excludedFields.includes(key))
                                        .map((key) => (
                                            <th
                                                key={key}
                                                className="p-3 text-left font-semibold text-gray-700 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    <HiOutlineArrowsUpDown
                                                        onClick={() => handleSort(key)}
                                                        className="hover:text-blue-500 transition cursor-pointer"
                                                    />
                                                </div>
                                            </th>
                                        ))}
                                <th className="p-3 text-left font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((item, index) => (
                                <tr key={item._id || index} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                                    {Object.entries(item)
                                        .filter(([key]) => !excludedFields.includes(key))
                                        .map(([key, value]) => (
                                            <td key={key} className="p-3">{value}</td>
                                        ))}
                                    <td className="p-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <MdOutlineEdit />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-800 transition"
                                        >
                                            <MdDeleteOutline />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!sortedData.length && (
                        <p className="text-gray-500 py-6 text-center">
                            No products found!
                        </p>
                    )}
                </div>
            </div>

            {/* Product Update Modal */}
            <ProductUpdateModal selectedProduct={selectedProduct} refetch={refetch} />
        </div>
    );
};

export default SellerProductList;
