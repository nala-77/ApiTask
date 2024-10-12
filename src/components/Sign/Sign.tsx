import { Link } from "react-router-dom"

interface SignData {
    image: string,
    head: string,
    text: string,
    children: React.ReactNode,
    question: string,
    link: string,
    linkTo: string
}

function Sign({image, head, text, children, question, link, linkTo} : SignData) {
  return (
    <div className="sign-wrapper">
        <div className="sign-img">
            <img src={image} alt="focalX" />
        </div>

        <h2 className="sign-head">
            {head}
        </h2>

        <p className="sign-txt">
            {text}
        </p>
        {children}

        <p className="sign-question">
            {question}
            <Link to={linkTo}>{link}</Link>
        </p>
    </div>
  )
}

export default Sign