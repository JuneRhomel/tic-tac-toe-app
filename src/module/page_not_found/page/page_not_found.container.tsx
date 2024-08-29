import { useNavigate } from "react-router-dom";
import MainButtonComponent from "../../../component/main-button/main-button.component";

export default function PageNotFoundContainer() {
    const navigate = useNavigate();



    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <img className="h-96" src="./assets/404.svg" alt="" />
            <MainButtonComponent title="Back Home" onClick={() => navigate("/")} />
        </div>
    );
}