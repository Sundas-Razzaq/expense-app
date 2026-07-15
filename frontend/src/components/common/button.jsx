import "../../styles/components.css";

const Button = ({
    children,
    variant = "primary",
    block = false,
    compact = false,
    danger = false,
    ghost = false,
    className = "",
    ...props
}) => {
    const classes = [
        "button",
        variant === "primary" ? "button--primary" : "",
        variant === "secondary" ? "button--secondary" : "",
        variant === "danger" || danger ? "button--danger" : "",
        ghost ? "button--ghost" : "",
        block ? "button--block" : "",
        compact ? "button--compact" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;