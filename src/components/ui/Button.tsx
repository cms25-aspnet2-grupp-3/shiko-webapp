type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  rightIcon?: React.ReactNode;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  rightIcon,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const variantStyles = {
    primary: "bg-[#2f3a4f] text-white hover:bg-[#283244] shadow-none",
    secondary:
      "bg-[#ff6b3d] text-white hover:bg-[#f35f31] shadow-[0_6px_14px_rgba(255,107,61,0.18)]",
    ghost: "bg-[#f3f4f6] text-[#232f45] hover:bg-[#e9edf2]",
  };

  const sizeStyles = {
    sm: "h-10 px-4 text-sm",
    md: "h-[52px] px-7 text-[15px]",
    lg: "h-14 px-8 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const iconWrapperStyles = {
    primary: "bg-white text-[#2f3a4f]",
    secondary: "bg-white text-[#ff6b3d]",
    ghost: "bg-white text-[#2f3a4f]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles}`}
    >
      <span>{children}</span>

      {rightIcon ? (
        <span
          className={`ml-2 flex h-10 w-10 items-center justify-center rounded-full text-lg ${iconWrapperStyles[variant]}`}
        >
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}