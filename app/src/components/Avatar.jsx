/**
 * Avatar — displays a user's colored initials circle.
 * Props:
 *   user   — { initials, color (Tailwind bg class), name }
 *   size   — 'xs' | 'sm' | 'md' | 'lg'  (default 'md')
 */
export default function Avatar({ user, size = "md" }) {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-7 h-7 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  return (
    <div
      title={user.name}
      className={`
        ${sizeClasses[size]}
        ${user.color}
        rounded-full flex items-center justify-center
        font-semibold text-white shrink-0 select-none
      `}
    >
      {user.initials}
    </div>
  );
}
