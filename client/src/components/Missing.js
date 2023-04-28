import { useNavigate } from "react-router-dom"
import Button from './Button'

const Missing = () => {
    const navigate = useNavigate();
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
            <Button
                color={"dodgerblue"}
                text={'Go Back'}
                onClick={() => navigate(-1)}
            />
            </div>
        </article>
    )
}

export default Missing
