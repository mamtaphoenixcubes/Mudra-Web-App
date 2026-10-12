"use client";

import { Box, Typography } from "@mui/material";

export default function SectionHeader({
  title,
  subtitle,
  align = "left",
  className = "",
  sx = {},
}) {
  return (
    <Box
      className={`section-header ${className}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems:
          align === "center"
            ? "center"
            : align === "right"
            ? "flex-end"
            : "flex-start",
        textAlign: align,
        mb: { xs: 3, sm: 4, md: 5 },
        ...sx,
      }}
    >
      {title && (
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-redhat)",
            fontWeight: 700,
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "34px",
              lg: "38px",
              xl: "44px",
            },
            lineHeight: 1.2,
            color: "#1A1A2E",
            mb: subtitle ? { xs: 1, md: 1.5 } : 0,
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          sx={{
            fontFamily: "var(--font-redhat)",
            fontWeight: 400,
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
            lineHeight: 1.6,
            color: "#666666",
            maxWidth: { xs: "100%", sm: "520px", md: "600px" },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}