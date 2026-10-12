"use client";

import { Box } from "@mui/material";

export default function SiteContainer({
  children,
  className = "",
  sx = {},
}) {
  return (
    <Box
      className={`site-container ${className}`}
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: "1200px",
          lg: "1360px",
          xl: "1500px",
        },
        mx: "auto",
        px: {
          xs: 2,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 3,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}