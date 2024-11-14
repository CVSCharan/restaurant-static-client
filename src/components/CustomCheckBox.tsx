import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  "input:hover ~ &": {
    backgroundColor: "transparent",
  },
  // Responsive sizes
  [theme.breakpoints.up("sm")]: {
    width: 18,
    height: 18,
  },
  [theme.breakpoints.up("md")]: {
    width: 20,
    height: 20,
  },
  [theme.breakpoints.up("lg")]: {
    width: 23,
    height: 23,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: "#137cbd",
  "&::before": {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
}));

// Checkbox with improved accessibility
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ "&:hover": { bgcolor: "transparent" } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{
        "aria-label": "Product Description Checkbox",
      }}
      {...props}
    />
  );
}

export default function CustomizedCheckbox(props: CheckboxProps) {
  return <BpCheckbox {...props} />;
}
