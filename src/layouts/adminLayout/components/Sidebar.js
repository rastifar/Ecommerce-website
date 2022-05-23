// import { Container, Typography, IconButton, Divider } from "@mui/material";
// import { styled } from "@mui/material/styles";
// // import { makeStyles } from "@mui/styles";
// //import { styled } from "@mui/system";
// import StoreIcon from "@mui/icons-material/Store";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import EuroIcon from "@mui/icons-material/Euro";
// import { Link } from "react-router-dom";

// const StyledIconButton = styled(IconButton)`
//   margin-right: ${({ theme }) => theme.spacing(1)}px;
//   ${({ theme }) => theme.breakpoints.up("sm")} {
//     font-size: 18px;
//   }
// `;
// const StyledTypography = styled(Typography)`
//   font-weight: 500;
//   ${({ theme }) => theme.breakpoints.down("sm")} {
//     display: none;
//   }
// `;

// const StyledContainer = styled(Container)`
//   height: 100vh;
//   color: white;
//   position: sticky;
  
//   padding-top: ${({ theme }) => theme.spacing(10)};
//   background-color: ${({ theme }) => theme.palette.primary.main}px;
//   top: 0;
//   ${({ theme }) => theme.breakpoints.up("sm")} {
//     background-color: white;
//     color: #555;
//     border: 1px solid #ece7e7;
//   }
// `;

// const StyledDiv = styled("div")`
//   display: flex;
//   alignitems: center;
//   margin-bottom: ${({ theme }) => theme.spacing(4)}px;
//   ${({ theme }) => theme.breakpoints.up("sm")} {
//     margin-bottom: ${({ theme }) => theme.spacing(3)}px;
//     cursor: pointer;
//   }
// `;

// const Sidebar = () => {
//   return (
//     <StyledContainer>
//       <Link to='/dashboard/goods'>
//       <StyledDiv>
//         <StyledIconButton>
//           <StoreIcon />
//         </StyledIconButton>
//         <StyledTypography>کالاها</StyledTypography>
//       </StyledDiv>
//       </Link>
//       <Link to='/dashboard/orders'>
//       <StyledDiv>
//         <StyledIconButton>
//           <BookmarkBorderIcon />
//         </StyledIconButton>
//         <Typography>سفارشات</Typography>
//       </StyledDiv>
//       </Link>
//      <Link to='/dashboard/storequantity'> 
//       <StyledDiv>
//         <StyledIconButton>
//           <EuroIcon />
//         </StyledIconButton>
//         <Typography>موجودی و قیمت ها</Typography>
//       </StyledDiv>
//       </Link>
//     </StyledContainer>
//   );
// };

// export default Sidebar;