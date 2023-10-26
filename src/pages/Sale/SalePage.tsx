import RowComponent from '../../components/RowComponent';
import Button from '../../components/Button';
import { SaleItem } from '../types/SaleItem';
import { useNavigate } from 'react-router-dom';

export const SaleItemsList: SaleItem[] = [
  {
    id: 1,
    title: "Jeans",
    price: 30,
    photo: "https://plus.unsplash.com/premium_photo-1674828601017-2b8d4ea90aca?auto=format&fit=crop&q=80&w=2973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Alex",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 2,
    title: "A set of clothings",
    price: 25,
    photo: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=3111&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Ben",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 3,
    title: "AIR",
    price: 30,
    photo: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Cammy",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 4,
    title: "Dress",
    price: 45,
    photo: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nfGVufDB8fDB8fHww",
    user: "Dom",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 5,
    title: "T-shirt",
    price: 30,
    photo: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoaW5nfGVufDB8fDB8fHww",
    user: "Ed",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 6,
    title: "NIKE",
    price: 30,
    photo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGNsb3RoaW5nfGVufDB8fDB8fHww",
    user: "Frank",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
  {
    id: 7,
    title: "Hat",
    price: 30,
    photo: "https://images.unsplash.com/photo-1620231109648-302d034cb29b?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    user: "Gigi",
    location: "Toronto",
    description: "I purchased these items (cost $678) after shoulder surgery to help control pain and swelling. The BREG cooling cube is filled with ice water, which circulates through the shoulder wrap. The wrap could also be used on elbows, knees or ankles. The shoulder brace immobilizes the shoulder while it heals."
  },
]

const SalePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <RowComponent style={{ marginBottom: 50 }}>
        <span style={{ fontSize: 35, fontWeight: 700, fontStyle: "italic"}}>For Sale</span>
        <Button title='Post a listing' />
      </RowComponent>
      <RowComponent style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "flex-start" }}>
        {
          SaleItemsList.map(item => {
            const { id, title, price, photo} = item;
            return (
              <div key={`${id} ${title}`}>
                <img
                  src={photo}
                  alt={`${title} ${id}`}
                  style={{ width: 169, height: 169, borderRadius: 20, cursor: "pointer" }}
                  onClick={() => navigate(`/itemDetail/${id}`)}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                  <span style={{ fontSize: 18, fontWeight: 700}}>{title}</span>
                  <span style={{ fontSize: 18, fontWeight: 300}}>{price} Points</span>
                </div>
              </div>
            );
          })
        }
      </RowComponent>
    </div>
  )
}

export default SalePage;