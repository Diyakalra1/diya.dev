import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  target,
  rel,
  className = "",
  children,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-200";

  const variants = {
    primary: "bg-black text-yellow-500 hover:bg-neutral-900",
    secondary: "border border-neutral-300 hover:border-neutral-400 hover:text-black",
    ghost: "text-neutral-600 hover:text-black hover:bg-neutral-100",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
