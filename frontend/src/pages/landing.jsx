import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <main>
            <section>
                <div>
                    <h1>Expense Tracker</h1>

                    <p>
                        Track your income, manage your expenses, and gain
                        valuable insights into your spending habits with a
                        simple and efficient personal finance tracker.
                    </p>

                    <div>
                        <Link to="/login">
                            <button type="button">Login</button>
                        </Link>

                        <Link to="/register">
                            <button type="button">Register</button>
                        </Link>
                    </div>
                </div>

                <div>
                    <img
                        src="/landing-image.png"
                        alt="Expense Tracker Illustration"
                    />
                </div>
            </section>
        </main>
    );
};

export default Landing;