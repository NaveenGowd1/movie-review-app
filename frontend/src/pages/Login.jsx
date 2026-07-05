import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";

function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(credentials);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            alert("Login Successful!");

            navigate("/");

            window.location.reload();

        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <div className="card shadow">
                <div className="card-body">

                    <h2 className="text-center mb-4">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;