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
          xl: "1600px",
        },
        mx: "auto",
        px: {
          xs: 2,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 3,
        },

        // Top and bottom gap
        py: {
          xs: 4,  // 32px
          sm: 6,  // 48px
          md: 8,  // 64px
          lg: 10, // 80px
        },

        ...sx,
      }}
    >
      {children}
    </Box>
  );
}