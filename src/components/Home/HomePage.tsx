import { Avatar, Paper } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Paper elevation={2} sx={{ height: "fit-content", width: "70%" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: 15, gap: 20}}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>D</Avatar>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: 15}}>
                <span style={{ fontSize: 15, fontWeight: 600}}>Diana</span>
                <span style={{ fontSize: 13 }}>Woburn • 19 hrs ago</span>
              </div>
            </div>
            <MoreHorizIcon style={{ cursor: "pointer" }}/>
          </div>

          <div style={{ textAlign: "left"}}>
            Can someone please recommend a good place to get a remote car starter installed on a subaru.  And what is the better unit (brand) and features to get.
          </div>

          <div>
            <span style={{ color: "#b4b8b5"}}>Be the first to react</span>
            <div></div>
          </div>
        </div>
        
        {/* <Stack spacing={{ sm: 15 }} direction="row" useFlexGap flexWrap="wrap">
          <Avatar sx={{ bgcolor: deepPurple[500] }}>D</Avatar>
          <Stack>
            <span>Diana</span>
          </Stack>
          <Stack>
            <span>Broadlands</span>
            <span>-</span>
            <span>1 min ago</span>
          </Stack>
        </Stack> */}
      </Paper>
    </div>
  )
}

export default HomePage;