import { Link } from "react-router-dom";
const Button = (props) => {

    const btnClass = props.className || 'btn'
    if (props.href) {
        return <a className={btnClass} href={props.href}>
            {props.children}
        </a>
    }
    if (props.to) {
        return <Link className={btnClass} to={props.to}>
            {props.children}
        </Link>
    }

    if (props.type === "submit") {
        return <button className={btnClass} type="submit">{props.children}</button>
    }
    return <button className={btnClass} onClick={props.onClick}>{props.children}</button>
}

export default Button
