import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(formData);

            alert("Registration Successful!");

            navigate("/login");
        } catch (error) {
            console.log(error.response?.data);

            alert(
                JSON.stringify(error.response?.data) ||
                "Registration failed"
            );
        }
    };

    return (
        <div
            className="container mt-5"
            style={{ maxWidth: "500px" }}
        >
            <div className="card shadow">
                <div className="card-body">

                    <h2 className="text-center mb-4">
                        Register
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
                            type="email"
                            name="email"
                            placeholder="Email"
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

                        <input
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-success w-100"
                        >
                            Register
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;