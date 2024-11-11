import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode} from "jwt-decode";
import accounts from "../services/accounts";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // useState create a variable isAuthorized and a function setIsAuthorized to change the value of isAuthorized
    
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // call the auth function and catch any errors
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await accounts.post("/accounts/token/refresh/", { // send a post request to the refresh token endpoint
                refresh: refreshToken,
            });

            // check if the request was successful
            if (res.status === 200) {
                localStarage.setItem(ACCESS_TOKEN, res.data.access); // set the new access token
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decodedToken = jwtDecode(token);
        const tokeExpiration = decodedToken.exp;
        const now = Date.now() / 1000; // get the current time in seconds (divide by 1000 to convert to seconds)
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    // check if the user is authenticated
    if (isAuthorized === null) {
        return <div>Loading...</div>; // Lodign screen will be shown until isAuthorized is set
    }

    return isAuthorized ? children : <Navigate to="/login" />; // if the user is authenticated, show the children, otherwise redirect to login
}

export default ProtectedRoute;