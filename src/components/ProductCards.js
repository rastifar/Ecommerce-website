import * as React from "react";
//material
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

//components
import MyLink from "./MyLink";

//---------------------------------------------

export default function ProductCards({ image, name ,price}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={name}
        height="200"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">افزودن به سبد خرید</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
