import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                style={{ backgroundColor: color }}
                className="btn"
            >
                {text}
            </button>
        </div>
    );
};

Button.defaultProps = {
    text: "Submit",
    color: "steelblue",
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;
