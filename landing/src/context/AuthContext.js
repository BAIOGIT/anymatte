import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch(`https://${process.env.REACT_APP_DJANGO_IP_REMOTE}:9777/api/token/`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,  // This will be either email or username
                password
            })
        })
        const data = await response.json()
        // DEBUG --> console.log(data);

        if(response.status === 200){
            // DEBUG --> console.log("Accesso eseguito.");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))

            window.location.reload();
            // navigate('/'); // Redirect to a specific page

            // swal.fire({
            //     title: "Accesso eseguito.",
            //     icon: "success",
            //     toast: true,
            //     timer: 6000,
            //     position: 'top-right',
            //     timerProgressBar: true,
            //     showConfirmButton: false,
            //     showCancelButton: true,
            // })

        } else {    
            // DEBUG --> console.log(response.status);
            // DEBUG --> console.log("Accesso fallito.");
            swal.fire({
                title: "Username o password errati. Riprovare.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        }
    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch(`https://${process.env.REACT_APP_DJANGO_IP_REMOTE}:9777/api/register/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            // DEBUG --> console.log("Registrazione avvenuta con successo.");
            loginUser(email, password);
        } else {
            // DEBUG --> console.log(response.status);
            // DEBUG --> console.log("Errore dal server durante il login.");
            swal.fire({
                title: "Errore dal server durante il login: " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")

        window.location.reload();
        // navigate('/'); // Redirect to a specific page

        // swal.fire({
        //     title: "Logout succesfull.",
        //     icon: "success",
        //     toast: true,
        //     timer: 6000,
        //     position: 'top-right',
        //     timerProgressBar: true,
        //     showConfirmButton: false,
        //     showCancelButton: true,

        // })
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
