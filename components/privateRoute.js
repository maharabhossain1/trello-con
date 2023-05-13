import { useRouter } from "next/router";
import { useEffect } from "react";

const PrivateRoute = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const email = localStorage.getItem("email");
      if (!email) {
        router.push("/login");
      }
    }, []);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default PrivateRoute;
