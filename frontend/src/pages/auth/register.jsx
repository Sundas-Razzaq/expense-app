import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI.js";
import { resolveErrorMessage, setAuthSession } from "../../utils/helpers.jsx";
import "../../styles/auth.css";
const initialForm = {
    name: "",
    email: "",
    password: "",
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await registerUser(form);
            setAuthSession({ token: data.token, user: data.user });
            navigate("/dashboard");
        } catch (requestError) {
            setError(resolveErrorMessage(requestError));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-card__header">
                    <p className="eyebrow">Create account</p>
                    <h1>Register</h1>
                    <p>Start tracking income and expenses with a polished dashboard.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
                    </div>

                    {error ? <p className="auth-status auth-status--error">{error}</p> : null}

                    <button className="button button--primary button--block" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <div className="auth-help-row">
                        <Link className="auth-link" to="/login">Back to login</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;
