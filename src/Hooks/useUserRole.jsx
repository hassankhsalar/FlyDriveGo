import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: userRole,
    isLoading: roleLoading,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      console.log("Fetching role for:", user.email);
      const res = await axiosPublic.get(`/users/role/${user.email}`);
      console.log("API Response:", res.data);
      return res.data.userType;
    },
  });

  return [userRole, roleLoading, error];
};

export default useUserRole;
