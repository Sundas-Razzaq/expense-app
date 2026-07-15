import "../../styles/components.css";

const Input = ({ className = "", ...props }) => {
    const classes = ["form-control", className].filter(Boolean).join(" ");

    return <input className={classes} {...props} />;
};

export default Input;