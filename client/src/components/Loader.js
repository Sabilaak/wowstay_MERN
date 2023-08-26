import { useState,CSSProperties} from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
//   let [color, setColor] = useState("#ffffff");
//   const override: CSSProperties = {
//     display: "block",
//     margin: "15px auto",
//     borderColor: "black",
//   };
  return (
    <div style={{marginTop:'150px',marginLeft:'600px'}}>
         <div className="sweet-loading " style={{alignItems:'center'}}>
      <FadeLoader
        color='#000'
        loading={loading}
       css=''
        size={80}
       
      />
    </div>
    </div>
  )
}

export default Loader
