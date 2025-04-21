import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const [quantities, setQuantities] = useState({});

  // Initialize quantities when cart is fetched
  useEffect(() => {
    if (cart.length > 0) {
      const q = {};
      cart.forEach((item) => {
        q[item._id] = item.quantity || 1;
      });
      setQuantities(q);
    }
  }, [cart]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Item removed.", "success");
          }
        });
      }
    });
  };

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (quantities[item._id] || 1),
    0
  );

  return (
    <div className="mx-5 md:mx-20 my-5 md:my-20">
      <div className="max-w-[1250px] mx-auto my-8 md:my-12">
        <div className="ml-10">
          <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose text-primary font-bold">
            My Cart
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 md:p-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-5">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 flex items-center gap-4 justify-between shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {Array.isArray(item.category)
                        ? item.category.join(", ")
                        : "Product"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      ৳ {item.price.toLocaleString()} ×{" "}
                      {quantities[item._id] || 1}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="rounded-full border px-2 py-1 text-sm"
                    >
                      −
                    </button>
                    <span className="font-semibold">
                      {quantities[item._id] || 1}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="rounded-full border px-2 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-primary text-lg font-bold">
                    ৳{" "}
                    {(
                      item.price * (quantities[item._id] || 1)
                    ).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-error mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="sticky top-24 h-fit bg-white p-5 rounded-xl border shadow-md">
            <h3 className="text-lg font-bold mb-2">
              {cart.length} item{cart.length > 1 ? "s" : ""} to checkout
            </h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal</span>
              <span>{totalPrice.toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between text-xl font-bold mb-3">
              <span>Total Price</span>
              <span>{totalPrice.toLocaleString()} BDT</span>
            </div>
            {
              cart.length?<Link to="/payment" state={{ totalPrice }}>
              <button  className="w-full bg-primary hover:bg-black text-white py-2 rounded-md font-semibold">
                Proceed to Checkout
              </button>
            </Link>:<button disabled className="w-full btn bg-primary text-white py-2 rounded-md font-semibold">
                Proceed to Checkout
              </button>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
