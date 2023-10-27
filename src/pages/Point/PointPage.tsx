import {useEffect, useState} from 'react';
import "./PointPage.css";
import {getRankedUsers} from "../../axios/auth.ts";
import {TRankedUser} from "../../types/user.ts";
import ColumnComponent from '../../components/ColumnComponent.tsx';
import RowComponent from '../../components/RowComponent.tsx';
import GradeIcon from '@mui/icons-material/Grade';
import ChampionIcon from "../../assets/champion.png";
import FirstRunnerUpIcon from "../../assets/1stRunnerUp.png";
import SecondRunnerUpIcon from "../../assets/2ndRunnerUp.png";
import ForwardIcon from '@mui/icons-material/Forward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserStore } from '../../zustand/user.ts';
import { AxiosResponse } from 'axios';
import { getUserRankingRequest } from '../../axios/point.ts';
import star from "../../assets/star.png";



const PointPage = () => {
    const currentUserDisplayName  = useUserStore((state) => state.displayName);
    const currentUserPoint  = useUserStore((state) => state.points);
    const currentUserId = useUserStore((state) => state.uuid);

    const [rankedUsers, setRankedUsers] = useState<TRankedUser[]>([]);
    // const [currentUserIndex, setCurrentUserIndex] = useState(-1);
    const [userWithinTopTen, setUserWithinTopTen ] = useState(false);
    const [currentUserPosition, setCurrentUserPosition ] = useState(100);




    useEffect(() => {
        let res: AxiosResponse<any, any>;
        const getUsersWithPoints = async () => {
            try {
                res = await getRankedUsers();                
            } catch (e) {
                console.log('getUsersWithPoint', e);
            }
        };
        getUsersWithPoints().then(() => {
            setRankedUsers(res.data.users);
        });
    }, []);

    useEffect (()=> {
        if(currentUserPosition<10){
            setUserWithinTopTen(true);
        }
    }
    ,[currentUserPosition]);

    useEffect(() => {
        let res: AxiosResponse<any, any>;
        const fetchData = async () => {
            try {
            const apiUrl = '/api/user/ranking/' + currentUserId;
              res = await getUserRankingRequest(apiUrl);
            } catch (error) {
              console.error(error);
            }
          };
          fetchData().then(()=>{setCurrentUserPosition(res.data.userPosition);});
    }, []);
    return (
        <div style={{ paddingBottom: 50, padding: 20}}>
            <div style={{ fontSize: 50, fontWeight: 700, marginBottom: 15}}>Ranking</div>
            <ColumnComponent style={{ gap: 15, alignItems: "center" }}>
                {rankedUsers.map((user, index) => {
                    const { displayName, points, postalCode } = user;
                        return (
                            <div key={index} className={index < 3 ? "top-3-container" : "container"} style={currentUserPosition - 1 === index ? { border: "2px solid rgb(2, 66, 242"} : {}}>
                                <div style={{ flex: 5, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    {
                                        currentUserPosition-1 === index && <ForwardIcon color='secondary' style={{ width: 60, height: 60}}/>
                                    }
                                
                                    <span
                                        style={{
                                            flex: 5,
                                            textAlign: "right",
                                            fontSize: 50,
                                            fontWeight: 700,
                                            color: index === 0 ? "rgba(255,58,89,255)" : index === 1 ? "rgba(254,107,0,255)" : index === 2 ? "rgb(239, 245, 66)" : "white",
                                            paddingRight: 40,
                                            borderRight: "3px solid #fff"
                                        }}>
                                            {index + 1}
                                    </span>
                                </div>
                                <div style={{ flex: 5 }}>
                                    {
                                        index === 0 ? 
                                            <img src={ChampionIcon} alt="champion" style={{ width: 60, height: 60}}/> 
                                            : index === 1 ? 
                                                <img src={FirstRunnerUpIcon} alt="1stRunnerUp" style={{ width: 60, height: 60}}/>
                                                : index === 2 ? 
                                                    <img src={SecondRunnerUpIcon} alt="2ndRunnerUp" style={{ width: 60, height: 60}}/> 
                                                    : <img src={star} alt="remain" style={{ width: 60, height: 60}}/> 
                                    }
                                </div>
                                <ColumnComponent style={{ width: "50%", flex: 10, alignItems: "flex-start", justifyContent: "center"}}>
                                    <span className='name'>{displayName}</span>
                                    <span className='location'>{postalCode}</span>
                                </ColumnComponent>
                                <RowComponent style={{ flex: 10, justifyContent: "flex-end", marginRight: 40, color: "#fff", fontSize: 45, fontWeight: 600}}>
                                    <GradeIcon style={{ width: 40, height: 40}}/>
                                    {points}
                                </RowComponent>
                            </div>
                        )
                 }
                )
            }; 
            {!userWithinTopTen && (
                  <div style={{ width: '100%' }}>
                    <div>
                      <MoreVertIcon color="primary" style={{ width: 60, height: 60 }} />
                    </div>
                      <div key={currentUserPosition} className={"container"} style={{border: "2px solid rgb(2, 66, 242"}}>
                                <div style={{ flex: 5, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    {
                                    currentUserPosition && <ForwardIcon color='secondary' style={{ width: 60, height: 60}}/>
                                    }
                                    <span
                                        style={{
                                            flex: 5,
                                            textAlign: "right",
                                            fontSize: 50,
                                            fontWeight: 700,
                                            color: "white",
                                            paddingRight: 40,
                                            borderRight: "3px solid #fff"
                                        }}>
                                            {currentUserPosition}
                                    </span>
                                </div>
                                <ColumnComponent style={{ width: "50%", flex: 10, alignItems: "center", justifyContent: "center"}}>
                                    <span className='name'>{currentUserDisplayName}</span>
                                </ColumnComponent>
                                <RowComponent style={{ flex: 10, justifyContent: "flex-end", marginRight: 40, color: "#fff", fontSize: 45, fontWeight: 600}}>
                                    <GradeIcon style={{ width: 40, height: 40}}/>
                                    {currentUserPoint}
                                </RowComponent>
                            </div>
                    </div>
                )
              }
            </ColumnComponent>
        </div>)
}

export default PointPage;