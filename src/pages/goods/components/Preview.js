import React from 'react';
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import image from "../../../assets/images/preview.jpg";
import { Box 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//stylecomponent
const IMG = styled("img")`
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
  object-fit: contain;
 
`;

const Preview = ({ src, handleDeleteImage ,bulk}) => {
    const handleDelete = (e) => {
        console.log(e.targe);
    }
    return (
        <Box >
            {/* <Box component="span" sx={{ color: "red" }}><CancelPresentationTwoToneIcon onClick={delImg }/></Box> */}
            <Box   style={{
                backgroundImage: `url(${'http://localhost:3002/files/'+src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "6rem",
                height: "6rem",
                color: "#f5f5f5",
                marginRight: "auto",              

            }} >
                {bulk ?
                    <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} onClick={() => {
                        handleDeleteImage(src)
                  
                    }} /> : ""}
              
              </Box>
        </Box>
    );
};

export default Preview;


