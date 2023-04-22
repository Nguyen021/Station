import React, { useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "../../layouts/Header";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Home = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>Typography home1</Typography>
          <Typography paragraph>Typography home2</Typography>
        </Main>
      </Box>
    </>
  );
};

export default Home;
