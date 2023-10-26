import {useEffect, useState} from 'react';
import "./PointPage.css";
import {getRankedUsers} from "../../axios/auth.ts";
import {TRankedUser} from "../../types/user.ts";
import rankDummyArray from "./RankDummyData.json";
import ColumnComponent from '../../components/ColumnComponent.tsx';
import RowComponent from '../../components/RowComponent.tsx';
import GradeIcon from '@mui/icons-material/Grade';
import ChampionIcon from "../../assets/champion.png";
import FirstRunnerUpIcon from "../../assets/1stRunnerUp.png";
import SecondRunnerUpIcon from "../../assets/2ndRunnerUp.png";
import ForwardIcon from '@mui/icons-material/Forward';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PointPage = () => {
    const [currentUserID] = useState("3521047a-cf6b-404a-a356-5ac920b1391d");
    const [rankedUsers, setRankedUsers] = useState<TRankedUser[]>([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(-1);

    useEffect(() => {
        const getUsersWithPoints = async () => {
            try {
                console.log('getRankedUsers')
                const res = await getRankedUsers()
                console.log('res.data', res.data.users)
                setRankedUsers(res.data.users)
            } catch (e) {
                console.log('getUsersWithPoint', e)
            }
        }
        getUsersWithPoints()
    }, []);

    useEffect(() => {
        const sortedList = sortObjectsByPoints(rankDummyArray.dummyUsers);
        console.log("sortedList", sortedList);
        setRankedUsers(sortedList);

        const tempArray = sortedList.map((user, index) => {
            if (user.uuid === currentUserID) return index;
            return null;
        });
        const index = tempArray.filter(index => index !== null)[0];
        if ( index !== null ) setCurrentUserIndex(index);
    }, []);

    const sortObjectsByPoints = (usersList: TRankedUser[]) => usersList.sort((a, b) => b.points - a.points); 

    return (
        <div style={{ paddingBottom: 50, padding: 20}}>
            <div style={{ fontSize: 50, fontWeight: 700, marginBottom: 15}}>Ranking</div>
            <ColumnComponent style={{ gap: 15, alignItems: "center" }}>
                {rankedUsers.map((user, index) => {
                    const { displayName, points, postalCode } = user;

                    if (currentUserIndex === index || index < 10) {
                        return (
                            <div className={index < 3 ? "top-3-container" : "container"} style={currentUserIndex === index ? { border: "2px solid rgb(2, 66, 242"} : {}}>
                                <div style={{ flex: 5, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    {
                                        currentUserIndex === index && <ForwardIcon color='secondary' style={{ width: 60, height: 60}}/>
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
                                                    <img src={SecondRunnerUpIcon} alt="2ndRunnerUp" style={{ width: 60, height: 60}}/> : ""
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
                    else {
                        if (currentUserIndex >= 10 && index === currentUserIndex - 1) {
                            return (
                                <div>
                                    <MoreVertIcon color="primary" style={{ width: 60, height: 60 }}/>
                                </div>
                            )
                        }
                        else{ 
                            return null;
                        }
                    }
                })}
            </ColumnComponent>
        </div>
    )
}

export default PointPage;