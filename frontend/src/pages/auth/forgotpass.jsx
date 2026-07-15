import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authAPI.js";
import { resolveErrorMessage } from "../../utils/helpers.jsx";
import "../../styles/auth.css";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const { data } = await forgotPassword({ email });
            setMessage(data.message || "Password reset email sent");
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
                    <p className="eyebrow">Password reset</p>
                    <h1>Forgot password</h1>
                    <p>We will send a reset link to your email address.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </div>

                    {message ? <p className="auth-status auth-status--success">{message}</p> : null}
                    {error ? <p className="auth-status auth-status--error">{error}</p> : null}

                    <button className="button button--primary button--block" type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send reset email"}
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

export default ForgotPasswordPage;
