import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

const linksArr = ["home", "diaries", "auth"];
function Header() {
  const [value, setValue] = useState();
  return (
        <AppBar sx={{ bgcolor: "transparent", position: "sticky" }}>
        <Toolbar>
            <ModeOfTravelIcon sx={{ color: "black" }} />

            <Tabs
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{ ml: "auto", textDecoration: "none" }}
            >
            {linksArr.map((link) => (
                <Tab
                LinkComponent={Link}
                to={`/${link === "home" ? "" : link}`}
                sx={{
                    textDecoration: "none",
                    ":hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "18px",
                    },
                }}
                key={link}
                label={link}
                />
            ))}
            </Tabs>
        </Toolbar>
        </AppBar>
  );
}

export default Header;