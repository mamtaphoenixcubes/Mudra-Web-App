"use client";

import { Box } from "@mui/material";

export default function Card({
  children,
  className = "",
  sx = {},
  ...props
}) {
  return (
    <Box
      className={`common-card ${className}`}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "24px",
        p: {
          xs: "24px",
          sm: "32px",
          md: "40px",
          lg: "48px",
        },
        backgroundColor: "#DDF4FF",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}