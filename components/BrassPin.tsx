"use client";

type Props = { name: string; onUnpin: () => void };

export default function BrassPin({ name, onUnpin }: Props) {
  const id = "brass-" + name.replace(/\W+/g, "-");
  return (
    <button
      type="button"
      aria-label={`Unpin ${name}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onUnpin();
      }}
      style={{
        position: "absolute",
        top: -12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 18,
        height: 18,
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        zIndex: 10,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.45))",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <defs>
          <radialGradient id={id} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#F0D89A" />
            <stop offset="55%" stopColor="#B8963E" />
            <stop offset="100%" stopColor="#856726" />
          </radialGradient>
        </defs>
        <circle cx="9" cy="9" r="8" fill={`url(#${id})`} />
      </svg>
    </button>
  );
}
