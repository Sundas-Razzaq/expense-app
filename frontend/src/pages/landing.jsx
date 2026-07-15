import { Link } from "react-router-dom";
import expenseImage from "../assets/expense.png";
import "../styles/landing.css";
const Landing = () => {
    return (
        <main className="landing-page">
            <section className="landing-hero">
                <div className="landing-copy">
                    <p className="eyebrow">Expense Tracker</p>
                    <h1>Clear money management for individuals.</h1>

                    <p>
                        Track income, control spending, and review performance in a dashboard that feels
                        fast, calm, and built for everyday use.
                    </p>

                    <div className="landing-actions">
                        <Link to="/login">
                            <button className="button button--primary" type="button">Login</button>
                        </Link>

                        <Link to="/register">
                            <button className="button button--secondary" type="button">Register</button>
                        </Link>
                    </div>
                </div>

                <div className="landing-visual">
                    <div className="landing-visual__frame">
                        <img
                            src={expenseImage}
                            alt="Expense Tracker Illustration"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Landing;