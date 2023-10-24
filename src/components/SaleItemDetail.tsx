
import { Avatar, Paper } from "@mui/material";
import { SaleItem } from '../pages/types/SaleItem';
import ColumnComponent from "./ColumnComponent";
import RowComponent from "./RowComponent";
import { deepPurple } from "@mui/material/colors";
import Button from "./Button";

type SaleItemDetailProps = {
  currentItem: SaleItem;
}

const SaleItemDetail = ({ currentItem }:SaleItemDetailProps) => {
  const { title, photo, price, user, location, description } = currentItem;
  return (
    <ColumnComponent>
      <span style={{ fontSize: 50, fontWeight: 700, marginBottom: 20 }}>{title}</span>
      <RowComponent style={{ gap: 130, alignItems: "flex-start" }}>
        <img src={photo} style={{ width: 600, height: 600, borderRadius: 50 }}/>
        <Paper elevation={2} style={{ padding: 30, borderRadius: 20 }}>
          <ColumnComponent style={{ gap: 20 }}>
            <span style={{ fontSize: 25, fontWeight: 700}}>Price: {price} Points</span>
            <RowComponent>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.charAt(0)}</Avatar>
              <ColumnComponent style={{ marginLeft: 15 }}>
                <span style={{ fontSize: 15, fontWeight: 600}}>{user}</span>
                <span style={{ fontSize: 13 }}>{location}</span>
              </ColumnComponent>
            </RowComponent>
            <span style={{ textAlign: "left" }}>{description}</span>
            <Button title="Purchase" />
          </ColumnComponent>
        </Paper>
        
      </RowComponent>
      
    </ColumnComponent>
  )
}

export default SaleItemDetail;