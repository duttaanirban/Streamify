import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";

const useAuthUser = () => {
  // tanstack query
    const authUser = useQuery({
      queryKey:["authUser"],
      queryFn: getAuthUser,
      retry: false,
    });

    return {isLoading: authUser.isLoading,user: authUser.data?.user}
}

export default useAuthUser