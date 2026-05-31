import React from 'react';
import * as LucideIcons from 'lucide-react';

// 1. 공간 추천 아이콘셋 (24종)
export const SPACE_PRESETS = [
  'Home',
  'Sofa',
  'ChefHat',
  'BedDouble',
  'Hanger',
  'ToyBrick',
  'Library',
  'Laptop',
  'Bath',
  'WashingMachine',
  'Sprout',
  'Car',
  'Dumbbell',
  'Building',
  'Tent',
  'Warehouse',
  'Wine',
  'Paintbrush',
  'Film',
  'Compass',
  'Heart',
  'Coffee',
  'Tv',
  'Briefcase',
] as const;

// 2. 수납처 추천 아이콘셋 (15종)
export const STORAGE_PRESETS = [
  'Boxes',
  'Box',
  'Cabinet',
  'Archive',
  'Wardrobe',
  'Refrigerator',
  'Pill',
  'Wrench',
  'ShoppingBasket',
  'Gem',
  'Gift',
  'KeyRound',
  'Cable',
  'Sparkles',
  'Soup',
] as const;

// 3. 아이콘 이름 -> 유니코드 이모지 매퍼
const EMOJI_MAP: Record<string, string> = {
  // 공간 프리셋 매핑
  Home: '🏠',
  Sofa: '🛋️',
  ChefHat: '🍳',
  BedDouble: '🛏️',
  Hanger: '👕',
  ToyBrick: '🧸',
  Library: '📚',
  Laptop: '💻',
  Bath: '🛁',
  WashingMachine: '🧺',
  Sprout: '🌱',
  Car: '🚗',
  Dumbbell: '🏋️',
  Building: '🏢',
  Tent: '⛺',
  Warehouse: '🏭',
  Wine: '🍷',
  Paintbrush: '🎨',
  Film: '🎬',
  Compass: '🧭',
  Heart: '❤️',
  Coffee: '☕',
  Tv: '📺',
  Briefcase: '💼',

  // 수납처 프리셋 매핑
  Boxes: '📦',
  Box: '📦',
  Cabinet: '🗄️',
  Archive: '🗃️',
  Wardrobe: '👗',
  Refrigerator: '🧊',
  Pill: '💊',
  Wrench: '🛠️',
  ShoppingBasket: '🧺',
  Gem: '💎',
  Gift: '🎁',
  KeyRound: '🔑',
  Cable: '🔌',
  Sparkles: '✨',
  Soup: '🍲',

  // 기타 주요 Lucide 아이콘 대응 이모지
  Search: '🔍',
  Settings: '⚙️',
  Trash: '🗑️',
  Trash2: '🗑️',
  User: '👤',
  Bell: '🔔',
  Calendar: '📅',
  Camera: '📷',
  Check: '✅',
  Circle: '⭕',
  Clock: '⏰',
  Cloud: '☁️',
  CreditCard: '💳',
  Database: '🗄️',
  File: '📄',
  Folder: '📁',
  Globe: '🌐',
  Image: '🖼️',
  Info: 'ℹ️',
  Link: '🔗',
  Lock: '🔒',
  Mail: '✉️',
  MapPin: '📍',
  Mic: '🎙️',
  Music: '🎵',
  Phone: '📞',
  Play: '▶️',
  Plus: '➕',
  Power: '🔌',
  Send: '✉️',
  Share: '🔗',
  Shield: '🛡️',
  Star: '⭐',
  Sun: '☀️',
  Tag: '🏷️',
  ThumbsUp: '👍',
  Unlock: '🔓',
  Video: '🎥',
  Wifi: '📶',
  Book: '📖',
  HeartHandshake: '🤝',
  LockKeyhole: '🔒',
  Map: '🗺️',
  Moon: '🌙',
  Paperclip: '📎',
  QrCode: '📱',
  Scissors: '✂️',
  ShieldAlert: '⚠️',
  ShoppingBag: '🛍️',
  Smile: '😊',
  StickyNote: '📝',
  Target: '🎯',
  Ticket: '🎟️',
  Trophy: '🏆',
  Umbrella: '☂️',
  Volume2: '🔊',
  Wallet: '👛',
  Watch: '⌚',
};

// 기본 폴백 이모지
const DEFAULT_EMOJI = '📦';

/**
 * 아이콘 이름에 매핑되는 유니코드 이모지를 반환합니다.
 * <select> 태그의 <option> 등에서 텍스트로 폴백 렌더링 시 사용됩니다.
 */
export function getIconEmoji(iconName: string): string {
  if (!iconName) return DEFAULT_EMOJI;
  
  // 대소문자 매칭을 더 유연하게 처리하기 위해 보정
  const normalizedKey = Object.keys(EMOJI_MAP).find(
    (key) => key.toLowerCase() === iconName.toLowerCase()
  );
  
  if (normalizedKey) {
    return EMOJI_MAP[normalizedKey];
  }
  
  // 일반적인 키워드 포함 기반 폴백 매핑
  const lowerName = iconName.toLowerCase();
  if (lowerName.includes('home') || lowerName.includes('house')) return '🏠';
  if (lowerName.includes('box') || lowerName.includes('pack')) return '📦';
  if (lowerName.includes('tool') || lowerName.includes('hammer') || lowerName.includes('wrench')) return '🛠️';
  if (lowerName.includes('book') || lowerName.includes('read')) return '📚';
  if (lowerName.includes('food') || lowerName.includes('cook') || lowerName.includes('chef') || lowerName.includes('eat')) return '🍳';
  if (lowerName.includes('car') || lowerName.includes('vehicle')) return '🚗';
  if (lowerName.includes('shirt') || lowerName.includes('tshirt') || lowerName.includes('cloth') || lowerName.includes('hanger')) return '👕';
  if (lowerName.includes('card') || lowerName.includes('wallet') || lowerName.includes('pay')) return '💳';
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('avatar')) return '👤';
  if (lowerName.includes('settings') || lowerName.includes('gear')) return '⚙️';
  if (lowerName.includes('lock') || lowerName.includes('key')) return '🔒';
  if (lowerName.includes('star') || lowerName.includes('gold')) return '⭐';
  if (lowerName.includes('heart') || lowerName.includes('love')) return '❤️';

  return DEFAULT_EMOJI;
}

/**
 * Lucide React SVG 컴포넌트를 동적으로 안전하게 렌더링합니다.
 * 만약 아이콘이 존재하지 않을 경우 HelpCircle 아이콘을 폴백으로 렌더링합니다.
 */
export function renderIcon(
  iconName: string,
  props: React.ComponentProps<any> = {}
): React.ReactNode {
  // Lucide 아이콘 컴포넌트 객체에서 찾기
  const IconComponent = (LucideIcons as any)[iconName];

  if (!IconComponent) {
    // 해당하는 아이콘이 없는 경우 기본 폴백 (HelpCircle)을 렌더링
    const FallbackComponent = (LucideIcons as any)['HelpCircle'];
    if (FallbackComponent) {
      return <FallbackComponent size={20} {...props} />;
    }
    // 진짜 극단적인 예외로 아무것도 없을 경우
    return (
      <svg
        width={props.size || 20}
        height={props.size || 20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }

  return <IconComponent size={20} {...props} />;
}

// 4. lucide-react의 모든 가능한 아이콘명 리스트 (캐시 처리용)
export const ALL_LUCIDE_ICON_NAMES = Object.keys(LucideIcons).filter((key) => {
  // 함수나 컴포넌트 형태이고 대문자로 시작하는 일반적인 컴포넌트만 필터링
  const isComponent = typeof (LucideIcons as any)[key] === 'function' || typeof (LucideIcons as any)[key] === 'object';
  const startsWithCapital = /^[A-Z]/.test(key);
  // 내부 유틸리티 성격이 아닌 노출용 아이콘만 필터링 (createLucideIcon 등 필터링)
  const isNotUtility = key !== 'createLucideIcon' && key !== 'default';
  
  return isComponent && startsWithCapital && isNotUtility;
});

// 영문 검색 성능을 극대화하기 위한 정규화 검색 인덱스 (한번 로드 시 생성)
export const SEARCH_INDEX = ALL_LUCIDE_ICON_NAMES.map((name) => ({
  originalName: name,
  lowerName: name.toLowerCase(),
}));
