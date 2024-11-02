import { useIsAuthenticated } from "@/features/authHooks";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Protect: FC<PropsWithChildren> = ({ children }) => {
  const { user, isPending: loadingAuthStatus } = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingAuthStatus && !user) {
      toast.error("You need to be logged in to access this page", {
        richColors: true,
      });
      navigate("/login");
    }
  }, [navigate, user, loadingAuthStatus]);
  return <>{children}</>;
};

export default Protect;
