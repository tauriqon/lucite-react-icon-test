import { CustomIcon, ALL_CUSTOM_ICON_NAMES } from '../components/CustomIcons';
import type { CustomIconProps } from '../components/CustomIcons';

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

  // 기타 주요 아이콘 대응 이모지
  Search: '🔍',
  Settings: '⚙️',
  Plus: '➕',
  Check: '✅',
  HelpCircle: '❓',
};

// 기본 폴백 이모지
const DEFAULT_EMOJI = '📦';

/**
 * 아이콘 이름에 매핑되는 유니코드 이모지를 반환합니다.
 * <select> 태그의 <option> 등에서 텍스트로 폴백 렌더링 시 사용됩니다.
 */
export function getIconEmoji(iconName: string): string {
  if (!iconName) return DEFAULT_EMOJI;
  
  // 1단계: EMOJI_MAP에 정의된 1:1 완벽한 매칭이 있을 경우 우선 반환
  const normalizedKey = Object.keys(EMOJI_MAP).find(
    (key) => key.toLowerCase() === iconName.toLowerCase()
  );
  
  if (normalizedKey) {
    return EMOJI_MAP[normalizedKey];
  }
  
  // 2단계: 일반적인 키워드 포함 기반 폴백 매핑 (지능형 다중 키워드 룰셋 적용)
  const lowerName = iconName.toLowerCase();

  const rules: { keywords: string[]; emoji: string }[] = [
    // 1단계: 가장 구체적인 특정 음식/디저트/음료 매칭 (최우선 순위)
    { keywords: ['cookie', 'biscuit'], emoji: '🍪' },
    { keywords: ['pizza'], emoji: '🍕' },
    { keywords: ['salad', 'cabbage', 'lettuce'], emoji: '🥗' },
    { keywords: ['cake', 'cupcake', 'dessert', 'sweet'], emoji: '🍰' },
    { keywords: ['croissant', 'sandwich', 'bread', 'bakery', 'toast'], emoji: '🍞' },
    { keywords: ['apple'], emoji: '🍎' },
    { keywords: ['banana'], emoji: '🍌' },
    { keywords: ['carrot', 'vegetable'], emoji: '🥕' },
    { keywords: ['icecream', 'ice-cream'], emoji: '🍦' },
    { keywords: ['beer', 'ale', 'pub'], emoji: '🍺' },
    { keywords: ['coffee', 'mug', 'espresso', 'tea'], emoji: '☕' },
    { keywords: ['wine', 'champagne', 'cocktail'], emoji: '🍷' },

    // 2단계: 주방 용기 및 찌개/스프류 (CookingPot -> 🍲 매칭용)
    { keywords: ['soup', 'pot', 'stew', 'bowl', 'cookingpot', 'ramen', 'noodle', 'curry'], emoji: '🍲' },
    { keywords: ['pan', 'cook', 'chef', 'utensil', 'spoon', 'fork', 'knife', 'utensilscrossed', 'recipe', 'flame', 'fire'], emoji: '🍳' },

    // 3단계: 기타 일반적인 카테고리 매핑
    { keywords: ['heart', 'love', 'like'], emoji: '❤️' },
    { keywords: ['pill', 'capsule', 'medicine', 'drug', 'tablet', 'medical', 'hospital', 'stethoscope', 'bandage', 'clinic'], emoji: '💊' },
    { keywords: ['wrench', 'hammer', 'screwdriver', 'pliers', 'drill', 'spanner', 'tool', 'bolt', 'nut', 'screw'], emoji: '🛠️' },
    { keywords: ['sofa', 'couch', 'chair', 'seat', 'armchair', 'furniture', 'table', 'desk'], emoji: '🛋️' },
    { keywords: ['home', 'house', 'building', 'warehouse', 'tent', 'cottage', 'castle', 'door'], emoji: '🏠' },
    { keywords: ['cabinet', 'drawer', 'archive', 'dresser', 'chest'], emoji: '🗄️' },
    { keywords: ['box', 'boxes', 'package', 'pack', 'container'], emoji: '📦' },
    { keywords: ['hanger', 'shirt', 'dress', 'coat', 'wear', 'cloth', 'tshirt'], emoji: '👕' },
    { keywords: ['laptop', 'computer', 'pc', 'keyboard', 'mouse', 'monitor', 'screen'], emoji: '💻' },
    { keywords: ['book', 'library', 'notebook', 'read', 'pencil', 'pen', 'ruler', 'eraser'], emoji: '📚' },
    { keywords: ['bath', 'shower', 'tub', 'soap', 'toilet'], emoji: '🛁' },
    { keywords: ['wash', 'laundry', 'dryer', 'washing'], emoji: '🧺' },
    { keywords: ['sprout', 'seed', 'plant', 'leaf', 'flower', 'tree', 'garden', 'grass'], emoji: '🌱' },
    { keywords: ['car', 'vehicle', 'truck', 'bus', 'auto'], emoji: '🚗' },
    { keywords: ['dumbbell', 'gym', 'weight', 'workout', 'fit', 'train'], emoji: '🏋️' },
    { keywords: ['paint', 'brush', 'color', 'palette', 'art', 'draw'], emoji: '🎨' },
    { keywords: ['refrigerator', 'snowflake', 'ice', 'cold', 'freezer'], emoji: '🧊' },
    { keywords: ['film', 'video', 'movie', 'cinema', 'tv', 'camera', 'photo'], emoji: '📺' },
    { keywords: ['compass', 'navigate', 'direction', 'map', 'pin', 'gps', 'location'], emoji: '🧭' },
    { keywords: ['gift', 'present', 'reward', 'prize', 'trophy', 'medal'], emoji: '🎁' },
    { keywords: ['gem', 'diamond', 'jewel', 'stone', 'crystal', 'crown', 'gold'], emoji: '💎' },
    { keywords: ['key', 'lock', 'unlock', 'shield', 'secure', 'guard', 'safe'], emoji: '🔑' },
    { keywords: ['cable', 'plug', 'power', 'electric', 'wire', 'usb', 'charge', 'battery'], emoji: '🔌' },
    { keywords: ['sparkle', 'star', 'shiny', 'glow', 'sun', 'moon', 'light'], emoji: '✨' },
    { keywords: ['phone', 'smartphone', 'mobile', 'call', 'cell'], emoji: '📱' },
    { keywords: ['mail', 'envelope', 'letter', 'send'], emoji: '✉️' },
    { keywords: ['clock', 'time', 'watch', 'timer', 'hourglass', 'calendar', 'date'], emoji: '⏰' },
    { keywords: ['cloud', 'rain', 'snow', 'wind', 'weather'], emoji: '☁️' },
    { keywords: ['trash', 'delete', 'bin', 'garbage', 'waste'], emoji: '🗑️' },
    { keywords: ['wallet', 'purse', 'money', 'cash', 'coin', 'banknote', 'dollar', 'creditcard', 'pay'], emoji: '💳' },
    { keywords: ['search', 'zoom', 'find', 'magnify'], emoji: '🔍' },
    { keywords: ['settings', 'gear', 'config', 'setup'], emoji: '⚙️' },
    { keywords: ['user', 'profile', 'avatar', 'person', 'people', 'human', 'member'], emoji: '👤' },
    { keywords: ['smile', 'happy', 'laugh', 'emoji', 'face', 'frown', 'sad', 'angry'], emoji: '😊' },
    { keywords: ['scissors', 'cut', 'snip'], emoji: '✂️' },
    { keywords: ['target', 'aim', 'focus', 'goal'], emoji: '🎯' },
    { keywords: ['ticket', 'pass', 'coupon'], emoji: '🎟️' },
    { keywords: ['trophy', 'winner'], emoji: '🏆' },
    { keywords: ['umbrella'], emoji: '☂️' },
    { keywords: ['calculator'], emoji: '🧮' },
    { keywords: ['database', 'server', 'storage'], emoji: '🗄️' },
    { keywords: ['mic', 'microphone', 'voice', 'record'], emoji: '🎙️' },
    { keywords: ['crown', 'queen', 'king', 'royal'], emoji: '👑' },
    { keywords: ['footprint', 'foot', 'steps', 'walk', 'paw', 'dog', 'cat', 'pet', 'animal'], emoji: '🐾' },
    { keywords: ['plane', 'flight', 'airport', 'rocket', 'space'], emoji: '✈️' },
    { keywords: ['fish', 'shell', 'shrimp', 'crab', 'marine'], emoji: '🐟' },
    { keywords: ['tag', 'label', 'price'], emoji: '🏷️' },
    { keywords: ['circle', 'square', 'triangle', 'shape'], emoji: '⭕' },
  ];

  // 규칙 순회하면서 키워드가 부분 포함되어 있으면 해당 이모지 즉시 반환
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => lowerName.includes(keyword))) {
      return rule.emoji;
    }
  }

  return DEFAULT_EMOJI;
}

/**
 * 자체 프리미엄 SVG 컴포넌트를 동적으로 안전하게 렌더링합니다.
 */
export function renderIcon(
  iconName: string,
  props: CustomIconProps = {}
): React.ReactNode {
  // 1. 글로벌 메모리 캐시에서 가져온 커스텀 아이콘이 있는지 확인
  const cache = (window as any).__importedIconsCache;
  if (Array.isArray(cache)) {
    const found = cache.find((icon: any) => icon.name === iconName);
    if (found) {
      const size = props.size || 20;
      return (
        <div
          className="dynamic-svg-container"
          style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          dangerouslySetInnerHTML={{ __html: found.svgCode }}
        />
      );
    }
  }

  // 2. 기성 프리셋 아이콘인 경우
  return <CustomIcon name={iconName} {...props} />;
}

// 4. 자체 컴포넌트 44종 아이콘명 리스트 (캐시 처리용)
export const ALL_LUCIDE_ICON_NAMES = ALL_CUSTOM_ICON_NAMES;

// 자체 검색 성능을 극대화하기 위한 정규화 검색 인덱스 (44종만으로 초압축)
export const SEARCH_INDEX = ALL_LUCIDE_ICON_NAMES.map((name) => ({
  originalName: name,
  lowerName: name.toLowerCase(),
}));

// 한글 검색을 지원하기 위한 한글 키워드 -> 영문 검색어 매핑 딕셔너리
export const KOREAN_KEYWORDS_MAP: Record<string, string[]> = {
  // 1. 주방 / 식기 / 음식
  집: ['home', 'building', 'warehouse', 'tent'],
  홈: ['home'],
  식기: ['soup'],
  식사: ['soup'],
  음식: ['soup', 'chefhat'],
  요리: ['chefhat', 'soup'],
  주방: ['chefhat', 'soup', 'refrigerator'],
  부엌: ['chefhat', 'soup', 'refrigerator'],
  그릇: ['soup'],
  접시: ['soup'],
  물: ['coffee'],
  음료: ['wine', 'coffee'],
  커피: ['coffee'],
  카페: ['coffee'],
  잔: ['coffee', 'wine'],
  컵: ['coffee'],
  식물: ['sprout', 'leaf', 'flower', 'tree'],
  새싹: ['sprout'],
  차: ['car'],
  자동차: ['car'],
  운동: ['dumbbell'],
  헬스: ['dumbbell'],
  아령: ['dumbbell'],
  텐트: ['tent'],
  캠핑: ['tent', 'compass'],
  창고: ['warehouse', 'archive'],
  수납: ['warehouse', 'boxes', 'box', 'cabinet', 'archive'],
  와인: ['wine'],
  술: ['wine'],
  그림: ['paintbrush'],
  미술: ['paintbrush'],
  붓: ['paintbrush'],
  영화: ['film'],
  카메라: ['film', 'camera'],
  나침반: ['compass'],
  지도: ['compass'],
  길찾기: ['compass'],
  하트: ['heart'],
  사랑: ['heart'],
  좋아요: ['heart'],
  티비: ['tv'],
  tv: ['tv'],
  텔레비전: ['tv'],
  모니터: ['tv', 'laptop'],
  가방: ['briefcase'],
  서류가방: ['briefcase'],
  비즈니스: ['briefcase'],

  // 2. 수납처 카테고리 관련
  박스: ['boxes', 'box'],
  상자: ['boxes', 'box'],
  함: ['boxes', 'box', 'cabinet', 'archive'],
  보관함: ['boxes', 'box', 'cabinet', 'archive'],
  캐비닛: ['cabinet', 'archive', 'wardrobe'],
  수납장: ['cabinet', 'archive', 'wardrobe'],
  서랍: ['cabinet', 'archive'],
  서랍장: ['cabinet', 'archive'],
  아카이브: ['archive', 'cabinet'],
  서류함: ['archive', 'cabinet'],
  냉장고: ['refrigerator'],
  약: ['pill'],
  알약: ['pill'],
  구급: ['pill', 'heart'],
  도구: ['wrench'],
  렌치: ['wrench'],
  스패너: ['wrench'],
  수리: ['wrench'],
  공구: ['wrench'],
  쇼핑: ['shoppingbasket'],
  바구니: ['shoppingbasket'],
  보석: ['gem'],
  다이아몬드: ['gem'],
  선물: ['gift'],
  열쇠: ['keyround'],
  키: ['keyround'],
  보안: ['keyround', 'lock'],
  케이블: ['cable'],
  코드: ['cable'],
  전선: ['cable'],
  반짝: ['sparkles'],
  수프: ['soup'],
  국: ['soup'],

  // 3. 기타 주요 매핑
  검색: ['search'],
  찾기: ['search'],
  돋보기: ['search'],
  설정: ['settings'],
  톱니바퀴: ['settings'],
  자물쇠: ['lock'],
  잠금: ['lock'],
  메일: ['mail'],
  편지: ['mail'],
  이메일: ['mail'],
};

/**
 * 한글 검색어 쿼리에서 매핑되는 영문 검색어 목록을 추출합니다.
 */
export function translateKoreanToEnglish(koreanQuery: string): string[] {
  const query = koreanQuery.toLowerCase().trim();
  const englishKeywordsSet = new Set<string>();

  // 완전 매칭 또는 한글 키워드가 쿼리에 포함되어 있는지 검사
  Object.entries(KOREAN_KEYWORDS_MAP).forEach(([koreanKey, englishValues]) => {
    if (query.includes(koreanKey) || koreanKey.includes(query)) {
      englishValues.forEach((val) => englishKeywordsSet.add(val));
    }
  });

  return Array.from(englishKeywordsSet);
}
