
"use client";

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  size = "medium",
  className = "",
  type = "button",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-[#9A85FE] text-white hover:bg-[#8872F0]",
    secondary:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
    dark:
      "bg-gray-900 text-white hover:bg-gray-800",
  };

  const sizes = {
    small: "min-h-9 px-4 py-2 text-xs sm:text-sm",
    medium: "min-h-11 px-5 sm:px-6 py-3 text-sm",
    large: "min-h-12 px-6 sm:px-8 py-3.5 text-sm sm:text-base",
  };

  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A85FE] disabled:opacity-50 disabled:cursor-not-allowed ${
    variants[variant] || variants.primary
  } ${sizes[size] || sizes.medium} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
