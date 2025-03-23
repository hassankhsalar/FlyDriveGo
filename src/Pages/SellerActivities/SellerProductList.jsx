import React, { useContext, useState, useMemo } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ProductUpdateModal from "./Components/ProductUpdateModal";
import { IoEyeOutline } from "react-icons/io5";

const SellerProductList = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
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
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
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
    

    const excludedFields = ["_id", "sellerEmail", "productImage", "sellerName", "productPhoto"];

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
        <div className="customTable overflow-y-auto p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-4">
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
                    />
                </div>

                {/* Table */}
                <div className="customTable w-full rounded-md border overflow-hidden border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {products.length > 0 &&
                                    Object.keys(products[0])
                                        .filter((key) => !excludedFields.includes(key))
                                        .map((key) => (
                                            <th
                                                key={key}
                                                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-[5px]">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    <HiOutlineArrowsUpDown
                                                        onClick={() => handleSort(key)}
                                                        className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]"
                                                    />
                                                </div>
                                            </th>
                                        ))}
                                <th className="p-3 text-left font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {sortedData.map((item, index) => (
                                <tr key={item._id || index} className="border-t border-gray-200 hover:bg-gray-50">
                                    {Object.entries(item)
                                        .filter(([key]) => !excludedFields.includes(key))
                                        .map(([key, value]) => (
                                            <td key={key} className="p-3">{value}</td>
                                        ))}
                                    <td className="relative">
                                        <BsThreeDotsVertical
                                            onClick={() => setOpenActionMenuId(openActionMenuId === item._id ? null : item._id)}
                                            className="cursor-pointer"
                                        />
                                        {openActionMenuId === item._id && (
                                            <div className={`absolute right-0 p-1.5 z-[99] rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100 ${index === 1 ? "bottom-[30%]" : index > 1 ? "bottom-[80%]" : "top-[80%]"}`}>
                                                <button onClick={() => handleEdit(item)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <MdOutlineEdit />
                                                    Update
                                                </button>
                                                <button onClick={() => handleDelete(item)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <MdDeleteOutline />
                                                    Delete
                                                </button>

                                                <button className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                                    <IoEyeOutline />
                                                    View Details
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!sortedData.length && (
                        <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
                            No data found!
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
