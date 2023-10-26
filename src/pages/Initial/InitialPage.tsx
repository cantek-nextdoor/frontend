// import { useNavigate } from "react-router-dom";
import BackgroundPhoto from "../../assets/InitialPage.jpg";


const InitialPage = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <img src={BackgroundPhoto} alt="Background" style={{ width: "100vw", height: "100vh", opacity: 0.3 }} />
      <div
        style={{
          position: "absolute",
          right: "50%",
          left: "50%",
          bottom: "50%",
          // width: "50vw"
      }}>
        NextDoor - a virtual neighbourhood
      </div>
    </div>
  )
}

export default InitialPage;