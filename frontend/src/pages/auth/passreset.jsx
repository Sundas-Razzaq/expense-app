import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/authAPI.js";
import { resolveErrorMessage, setAuthSession } from "../../utils/helpers.jsx";
import "../../styles/auth.css";
const PasswordResetPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const { data } = await resetPassword(token, { password });
            setAuthSession({ token: data.token, user: data.user });
            setMessage("Password reset successful");
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
                    <p className="eyebrow">Secure your account</p>
                    <h1>Reset password</h1>
                    <p>Choose a new password to continue to your dashboard.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="password">New password</label>
                        <input className="form-control" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input className="form-control" id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                    </div>

                    {message ? <p className="auth-status auth-status--success">{message}</p> : null}
                    {error ? <p className="auth-status auth-status--error">{error}</p> : null}

                    <button className="button button--primary button--block" type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset password"}
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

export default PasswordResetPage;
