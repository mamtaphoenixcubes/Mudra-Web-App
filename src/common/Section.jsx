
"use client";

export default function Section({
  children,
  className = "",
  sx = {},
  ...props
}) {
  return (
    <section
      className={`site-section ${className}`.trim()}
      style={{
        width: "100%",
        paddingTop: { xs: "40px", md: "80px" },   // object → React can't render
        paddingBottom: { xs: "40px", md: "80px" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
