import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const LoggedOutModal: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/log-in");
  };

  return (
    <Modal open={true} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Session Expired
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Your session has expired. Please log in again to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLoginClick}
        >
          Log In
        </Button>
      </Box>
    </Modal>
  );
};

export default LoggedOutModal;
