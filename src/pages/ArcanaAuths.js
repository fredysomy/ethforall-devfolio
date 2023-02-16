import { Auth, useAuth } from "@arcana/auth-react";
import { useNavigate } from "react-router-dom";

const ArcanaAuths = () => {
  let navigate = useNavigate();
  const onLogin = () => {
    navigate("/");
    // Route to authenticated page
  };
  const auth = useAuth();
  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <p>Logged In</p>
      ) : (
        <div>
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
        </div>
      )}
    </div>
  );
};

export default ArcanaAuths;
