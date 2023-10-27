import "./initialPage.css";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import BackgroundPhoto from "../../assets/InitialPage.jpg";
import ColumnComponent from "../../components/ColumnComponent";
import {useEffect} from "react";
import {useUserStore} from "../../zustand/user.ts";

const InitialPage = () => {
  const navigate = useNavigate();
    const isLoggedIn = useUserStore((state) => state.isLoggedIn)

  useEffect(() => {
      if (isLoggedIn){
            navigate("/home");
      }
  }, [])

  return (
    <div>
      <img src={BackgroundPhoto} alt="Background" style={{ width: "100vw", height: "100vh", opacity: 0.2 }} />
      <ColumnComponent
        style={{
          position: "absolute",
          left: "5%",
          top: "0",
      }}>
        <span className="title">NextDoor - A Virtual Neighbourhood</span>
        <ColumnComponent style={{ gap: 20 }}>
          <span className="desc">Connect with the people living near you</span>
          <Button
            variant="contained"
            size="large"
            style={{ width: 200, height: 50, opacity: 0.7 }}
            onClick={() => navigate("/auth")}
          >
            Click to Login
          </Button>
        </ColumnComponent>
      </ColumnComponent>
    </div>
  )
}

export default InitialPage;