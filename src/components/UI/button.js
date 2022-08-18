import { Link } from "react-router-dom";
const Button = (props) => {
    if (props.href){
        return <a className={`btn ${props.style && props.style}`} href={props.href}>
        {props.children}
        </a>
    }
    if(props.to){
        return  <Link className={`btn ${props.style && props.style}`} to={props.to}>
             {props.children}
        </Link>

    }
    if(props.type === "submit"){
    return <button className={`btn ${props.style && props.style}`} type="submit">{props.children}</button>
    }
    return <button className={`btn ${props.style && props.style}`} onclick={props.onClick}>{props.children}</button>
}

export default Button
