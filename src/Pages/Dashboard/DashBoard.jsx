import { Link, useNavigate } from "react-router-dom";
import { FaFile, FaHome, FaShoppingCart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const DashBoard = () => {
  const navigate = useNavigate();
  //const { user } = useAuth();
  //console.log(user);

  return (
    <div className="">
      
      <div className="h-full p-3 space-y-2 dark:text-gray-800">
        <div className="flex items-center p-2 space-x-4">
          {/* <img src={user?.photoURL} alt="" className="w-12 h-12 rounded-full" /> */}
          <div>
            {/* <h2 className="text-lg font-semibold">{user?.displayName}</h2> */}
          </div>
        </div>
        <div className="divide-y flex flex-col justify-center ga dark:divide-gray-300">
          <ul className="p-4 space-y-3 text-sm font-poppins">
            <li><Link to='/dashboard/adminDashboard'>Admin Dashboard</Link></li>
            <li><Link to='/dashboard/add-products'>Add Products</Link></li>
            <li><Link to='/dashboard/addTourPackage'>Add Tour Packages</Link></li>
            <li><Link to='/dashboard/'></Link></li>
            <li><Link to='/dashboard/'></Link></li>
          </ul>

          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className="">
              <Link className="flex gap-2 text-sm px-3" to="/">
                <FaHome className="text-xl"></FaHome> Home
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
