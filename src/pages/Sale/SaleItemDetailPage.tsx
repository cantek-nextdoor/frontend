import { useParams } from "react-router-dom";
import SaleItemDetail from "../../components/SaleItemDetail";
import { SaleItemsList } from "./SalePage";
import { useState } from "react";
import { SaleItem } from "../types/SaleItem";

const SaleItemDetailPage = () => {
  const { id } = useParams();
  const [currentItem] = useState<SaleItem>(
    SaleItemsList.filter(item => item.id === parseInt(id ?? "0"))[0]
  );

  if (id === undefined) return <div />

  return (
    <SaleItemDetail currentItem={currentItem} />
  )
}

export default SaleItemDetailPage;