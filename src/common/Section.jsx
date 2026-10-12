"use client";

import { Box } from "@mui/material";

export default function Section({ children, className = "", sx = {} }) {
  return (
    <Box
      component="section"
      className={`site-section ${className}`}
      sx={{ width: "100%", overflow: "hidden", ...sx }}
    >
      {children}
    </Box>
  );
}