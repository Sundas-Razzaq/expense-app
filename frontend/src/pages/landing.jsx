import { Link } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
    return (
        <div className="landing-page">
            <header className="landing-nav">
                <div className="landing-nav__brand">
                    <span className="landing-nav__mark">ET</span>
                    <span>Expense Tracker</span>
                </div>
                <div className="landing-nav__actions">
                    <Link to="/login" className="landing-nav__link">Login</Link>
                    <Link to="/register">
                        <button className="button button--primary button--compact" type="button">
                            Get started
                        </button>
                    </Link>
                </div>
            </header>

            <main className="landing-hero">
                <section className="landing-copy">
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

                    <ul className="landing-trust">
                        <li><strong>Bank-grade</strong> encryption</li>
                        <li><strong>Real-time</strong> insights</li>
                        <li><strong>Free</strong> to get started</li>
                    </ul>
                </section>

                <section className="landing-visual" aria-hidden="true">
                    <div className="landing-mock">
                        <div className="landing-mock__bar">
                            <span className="landing-mock__dot landing-mock__dot--a" />
                            <span className="landing-mock__dot landing-mock__dot--b" />
                            <span className="landing-mock__dot landing-mock__dot--c" />
                            <span className="landing-mock__bar-title">Dashboard</span>
                        </div>

                        <div className="landing-mock__cards">
                            <div className="landing-mock__card landing-mock__card--balance">
                                <p>Balance</p>
                                <strong>$12,480</strong>
                            </div>
                            <div className="landing-mock__card landing-mock__card--income">
                                <p>Income</p>
                                <strong>+$4,200</strong>
                            </div>
                            <div className="landing-mock__card landing-mock__card--expense">
                                <p>Expenses</p>
                                <strong>-$1,860</strong>
                            </div>
                        </div>

                        <div className="landing-mock__chart">
                            <span style={{ height: "38%" }} />
                            <span style={{ height: "58%" }} />
                            <span style={{ height: "44%" }} />
                            <span style={{ height: "72%" }} />
                            <span style={{ height: "86%" }} />
                            <span style={{ height: "64%" }} />
                            <span style={{ height: "50%" }} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Landing;
