import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyCart = () => {
  const [cart, refecth] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

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
            refecth();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="mx-5 md:mx-20 my-5 md:my-20">
      <div>
        <h2 className="text-xxl md:text-4xl xl:text-4xl font-red-rose  text-primary font-bold text-center">
          My Cart
        </h2>
      </div>
      <div className="max-w-[750px] mx-auto my-8  md:my-12 ">
        <div className="w-full flex justify-between">
          <h3 className="font-red-rose text-xl md:text-2xl">
            {" "}
            Total Items: {cart.length}
          </h3>
          <h3 className="font-red-rose text-xl md:text-2xl">
            {" "}
            Total Price: {totalPrice}
          </h3>
        </div>
        {/* table for Item */}
        <div className="my-5 md:my-20">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>

                    <td>${item.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error"
                      >
                        Update
                      </button>
                    </th>
                  </tr>
                ))}
                {/* row 1 */}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button class="btn bg-primary  w-full">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
