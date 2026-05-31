import React from 'react';

export interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// 44종의 토스 스타일 프리미엄 라인아트 SVG 정의 (TS6133 미사용 변수 에러 회피를 위해 매개변수 제거)
const iconPaths: Record<string, () => React.ReactNode> = {
  Home: () => (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  Sofa: () => (
    <>
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 9h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" />
      <path d="M4 16v4" />
      <path d="M20 16v4" />
      <path d="M2 9v4" />
      <path d="M22 9v4" />
    </>
  ),
  ChefHat: () => (
    <>
      <path d="M6 18V9a6 6 0 0 1 12 0v9" />
      <path d="M18 18H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4z" />
      <path d="M12 4a3 3 0 0 1 3 3v2H9V7a3 3 0 0 1 3-3z" />
    </>
  ),
  BedDouble: () => (
    <>
      <path d="M2 4v16" />
      <path d="M22 4v16" />
      <path d="M2 8h20" />
      <path d="M2 14h20" />
      <path d="M6 8v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8" />
      <path d="M14 8v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8" />
    </>
  ),
  Hanger: () => (
    <>
      <path d="M12 2a3 3 0 0 0-3 3h1.5a1.5 1.5 0 0 1 3 0V7.8l8.2 5.1A2 2 0 0 1 21 15.2V17H3v-1.8a2 2 0 0 1 .8-1.6L12 7.8" />
    </>
  ),
  ToyBrick: () => (
    <>
      <rect x="3" y="8" width="18" height="10" rx="2" />
      <circle cx="8" cy="5" r="2" />
      <circle cx="16" cy="5" r="2" />
    </>
  ),
  Library: () => (
    <>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10" />
      <path d="M6 10h10" />
      <path d="M6 14h10" />
    </>
  ),
  Laptop: () => (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 18h20" />
      <path d="M12 20h.01" />
    </>
  ),
  Bath: () => (
    <>
      <path d="M2 10a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4" />
      <path d="M3 10V6a1 1 0 0 1 1-1h1" />
      <path d="M21 10V8a1 1 0 0 0-1-1h-1" />
      <path d="M6 14v4" />
      <path d="M18 14v4" />
    </>
  ),
  WashingMachine: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2" />
      <circle cx="7" cy="6" r="1" />
      <circle cx="10" cy="6" r="1" />
    </>
  ),
  Sprout: () => (
    <>
      <path d="M2 22c0-5.5 4.5-10 10-10h2" />
      <path d="M12 12c0-3.3 2.7-6 6-6h2v2c0 3.3-2.7 6-6 6h-2Z" />
      <path d="M12 22V12" />
    </>
  ),
  Car: () => (
    <>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M5 17h8" />
    </>
  ),
  Dumbbell: () => (
    <>
      <rect x="3" y="4" width="3.5" height="16" rx="1" />
      <rect x="17.5" y="4" width="3.5" height="16" rx="1" />
      <line x1="6.5" y1="12" x2="17.5" y2="12" strokeWidth={3} />
    </>
  ),
  Building: () => (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h2" />
      <path d="M9 10h2" />
      <path d="M9 14h2" />
      <path d="M9 18h2" />
      <path d="M13 6h2" />
      <path d="M13 10h2" />
      <path d="M13 14h2" />
      <path d="M13 18h2" />
    </>
  ),
  Tent: () => (
    <>
      <path d="M19 20 12 4 5 20" />
      <path d="M12 4v16" />
      <path d="M5 20h14" />
      <path d="m12 12 4 8" />
      <path d="m12 12-4 8" />
    </>
  ),
  Warehouse: () => (
    <>
      <path d="M22 20V8a2 2 0 0 0-2-2h-4L12 2 8 6H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
      <path d="M6 14h4" />
      <path d="M6 18h4" />
      <path d="M14 14h4" />
      <path d="M14 18h4" />
    </>
  ),
  Wine: () => (
    <>
      <path d="M8 22h8" />
      <path d="M12 15v7" />
      <path d="M12 15a5 5 0 0 0 5-5V3H7v7a5 5 0 0 0 5 5z" />
    </>
  ),
  Paintbrush: () => (
    <>
      <path d="m14 6-4-4-6 6a2 2 0 0 0 0 2.8L8 15" />
      <path d="M18.5 10.5 14 6l-2.5 2.5 4.5 4.5 2.5-2.5Z" />
      <path d="M8 15a4 4 0 0 1 8 0v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5Z" />
    </>
  ),
  Film: () => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="m21 9-4-3" />
      <path d="m13 9-4-3" />
      <path d="m5 9 4-3" />
    </>
  ),
  Compass: () => (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.2,7.8 13.5,13.5 7.8,16.2 10.5,10.5" />
    </>
  ),
  Heart: () => (
    <>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </>
  ),
  Coffee: () => (
    <>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
    </>
  ),
  Tv: () => (
    <>
      <rect x="2" y="5" width="20" height="13" rx="2" />
      <path d="m17 21-2-3" />
      <path d="m7 21 2-3" />
      <path d="M12 5v2" />
    </>
  ),
  Briefcase: () => (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  Boxes: () => (
    <>
      <rect x="3" y="12" width="8" height="8" rx="1" />
      <rect x="13" y="12" width="8" height="8" rx="1" />
      <rect x="8" y="3" width="8" height="8" rx="1" />
      <path d="M7 12V7" />
      <path d="M17 12V7" />
    </>
  ),
  Box: () => (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  Cabinet: () => (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <circle cx="12" cy="6" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="18" r="1" />
    </>
  ),
  Archive: () => (
    <>
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="4" y="9" width="16" height="12" rx="1" />
      <path d="M10 13h4" />
    </>
  ),
  Wardrobe: () => (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M12 2v20" />
      <circle cx="10" cy="11" r="1" />
      <circle cx="14" cy="11" r="1" />
    </>
  ),
  Refrigerator: () => (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M5 10h14" />
      <path d="M9 5v3" />
      <path d="M9 13v5" />
    </>
  ),
  Pill: () => (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="5.5" transform="rotate(-45 12 12)" />
      <line x1="8.5" y1="15.5" x2="15.5" y2="8.5" />
    </>
  ),
  Wrench: () => (
    <>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
    </>
  ),
  ShoppingBasket: () => (
    <>
      <path d="M22 9h-6.7L12 3 8.7 9H2v9a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V9Z" />
      <path d="M6 9v13" />
      <path d="M18 9v13" />
    </>
  ),
  Gem: () => (
    <>
      <polygon points="6 3 18 3 22 8 12 21 2 8" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="3" x2="12" y2="21" />
      <line x1="18" y1="3" x2="12" y2="21" />
    </>
  ),
  Gift: () => (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13" />
      <path d="M3 13h18" />
      <path d="M12 8a3 3 0 0 0-3-3h-1.5a1.5 1.5 0 0 0 0 3H12" />
      <path d="M12 8a3 3 0 0 1 3-3H16.5a1.5 1.5 0 0 1 0 3H12" />
    </>
  ),
  KeyRound: () => (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 6.5-6.5" />
      <path d="m15 5.5 1.5 1.5" />
      <path d="M17.5 3 19 4.5" />
      <circle cx="7.5" cy="15.5" r="1.5" />
    </>
  ),
  Cable: () => (
    <>
      <path d="M12 2v8" />
      <path d="M8 6h8" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M12 10a4 4 0 0 0-4 4v4a2 2 0 0 0 4 0" />
      <path d="M12 22a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
    </>
  ),
  Sparkles: () => (
    <>
      <path d="m12 3 1.5 4.5 4.5 1.5-4.5 1.5L12 17l-1.5-4.5-4.5-1.5 4.5-1.5Z" />
      <path d="m5 16 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" />
      <path d="m19 15.5.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5Z" />
    </>
  ),
  Soup: () => (
    <>
      <path d="M12 22a8 8 0 0 0 8-8H4a8 8 0 0 0 8 8Z" />
      <path d="M3 14h18" />
      <path d="M12 2v4" />
      <path d="M8 3v3" />
      <path d="M16 3v3" />
    </>
  ),
  Search: () => (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  Settings: () => (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  Plus: () => (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  Check: () => (
    <>
      <polyline points="20 6 9 17 4 12" />
    </>
  ),
  HelpCircle: () => (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
};

export const CustomIcon: React.FC<CustomIconProps & { name: string }> = React.memo(({
  name,
  size = 20,
  stroke = 'currentColor',
  strokeWidth = 2,
  ...props
}) => {
  const pathRender = iconPaths[name] || iconPaths['HelpCircle'];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {pathRender()}
    </svg>
  );
});

CustomIcon.displayName = 'CustomIcon';

// 44종의 전체 자체 아이콘 목록 상수로 관리
export const ALL_CUSTOM_ICON_NAMES = Object.keys(iconPaths);
