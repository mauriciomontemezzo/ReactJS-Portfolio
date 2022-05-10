import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
};

const Button = ({ childrem, buttonType, ...oterProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...oterProps}>{ childrem }</button>
    )
};

export default Button;