import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../../Redux/authSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    try {
      const googleToken = response.credential; // Google ID Token
      const userData: any = jwtDecode(googleToken);
      console.log("Decoded Google User:", userData);

      // Send the token to your backend for verification
      const res = await axios.post("http://localhost:3000/user/google-auth", { token: googleToken });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.data));

        const user = res.data.data;
        console.log('isProfile--- :',res.data);
  
        if (!user.isProfileComplete) {
          navigate('/complete-profile'); // ✅ Redirect to profile completion
        } else {
          navigate('/home'); // ✅ Redirect to home if already complete
        }
      } else {
        console.error("Google login failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error in Google login:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="1026085041917-ht0v41fvq22cdp6j2c9jjfn2pjq2ejts.apps.googleusercontent.com">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Google Auth Failed")} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
