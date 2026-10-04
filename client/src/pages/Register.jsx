import { useState } from "react";
import axios from "axios";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users",
                user
            );

            alert(response.data.message);

            setUser({
                name: "",
                email: "",
                password: "",
                role: "student"
            });

        } catch (error) {
            console.error("Registration error:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="recruiter">Recruiter</option>
                </select>

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;