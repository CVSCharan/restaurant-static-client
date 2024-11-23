import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Define the props type
interface TabsCompProps {
  value: number; // The active tab index
  handleChange: (event: React.SyntheticEvent, newValue: number) => void; // The change handler
}

const TabsComp: React.FC<TabsCompProps> = ({ value, handleChange }) => {
  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab
        style={{
          fontFamily: `"Cinzel", serif`,
          margin: "0 10px",
          color: "white",
          fontWeight: "400",
        }}
        label="Table View"
      />
      <Tab
        style={{
          fontFamily: `"Cinzel", serif`,
          margin: "0 10px",
          color: "white",
          fontWeight: "400",
        }}
        label="Dashboard View"
      />
    </Tabs>
  );
};

export default TabsComp;
