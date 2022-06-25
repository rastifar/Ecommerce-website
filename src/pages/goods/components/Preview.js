import React from 'react';
//----------Material
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
//----------Material-Icon
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//----------Constants
import { BASE_URL, FILES } from '../../../constants/apiConst';
//----------stylecomponent
const IMG = styled("img")`
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
  object-fit: contain; 
`;

const Preview = ({ src, handleDeleteImage ,bulk}) => { 
    return (
        <Box >         
            <Box   style={{
                backgroundImage: `url(${BASE_URL+FILES+'/'+src})`,
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


