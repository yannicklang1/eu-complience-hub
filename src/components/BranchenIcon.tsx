/**
 * BranchenIcon — Professional SVG icons for industry categories.
 * Maps branchenData.ts icon identifiers to clean, consistent SVG icons.
 */
export default function BranchenIcon({
  icon,
  className = "w-5 h-5",
}: {
  icon: string;
  className?: string;
}) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "gear":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "bank":
      return (
        <svg {...props}>
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      );
    case "medical":
      return (
        <svg {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M12 11v5m-2.5-2.5h5" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "truck":
      return (
        <svg {...props}>
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...props}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "signal":
      return (
        <svg {...props}>
          <path d="M2 12a10 10 0 0 1 10-10" />
          <path d="M2 12a14 14 0 0 1 14-10" />
          <path d="M2 12a18 18 0 0 1 18-8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "flask":
      return (
        <svg {...props}>
          <path d="M9 2h6M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .869 1.45h12.822a1 1 0 0 0 .87-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        </svg>
      );
    case "car":
      return (
        <svg {...props}>
          <path d="M16 3H8l-4 6h16l-4-6z" />
          <rect x="2" y="9" width="20" height="9" rx="2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case "crane":
      return (
        <svg {...props}>
          <path d="M2 20h20M5 20V8l5-5v17M10 3l8 5M18 8v12M14 11v2M14 16v2" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...props}>
          <path d="M12 22V12" />
          <path d="M12 12c-2-2-4-2-6 0" />
          <path d="M12 12c2-2 4-2 6 0" />
          <path d="M12 8c-2-2-4-2-6 0" />
          <path d="M12 8c2-2 4-2 6 0" />
          <path d="M12 4c-2-2-4-2-6 0" />
          <path d="M12 4c2-2 4-2 6 0" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "landmark":
      return (
        <svg {...props}>
          <path d="M3 21h18M3 10h18M12 3l9 7H3l9-7zM5 10v11M19 10v11M9 10v11M15 10v11" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...props}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...props}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
          <path d="M22 10v6" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
  }
}
