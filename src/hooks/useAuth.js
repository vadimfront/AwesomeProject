import { useSelector } from "react-redux";

export const useAuth = () => {
  const { auth, isLoading, error } = useSelector((state) => state.users);
  return { auth, isLoading, error };
};
