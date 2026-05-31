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

// 한글 검색을 지원하기 위한 한글 키워드 -> 영문 검색어 매핑 딕셔너리
export const KOREAN_KEYWORDS_MAP: Record<string, string[]> = {
  // 1. 주방 / 식기 / 음식
  집: ['home', 'building', 'warehouse', 'tent'],
  홈: ['home'],
  식기: ['utensils', 'cup', 'glass', 'soup'],
  식사: ['utensils', 'soup', 'pizza', 'sandwich', 'cake', 'cookie'],
  음식: ['soup', 'chefhat', 'pizza', 'sandwich', 'cake', 'cookie', 'croissant', 'salad', 'apple', 'banana'],
  요리: ['chefhat', 'soup', 'flame', 'utensils', 'cook'],
  주방: ['chefhat', 'soup', 'refrigerator', 'flame', 'utensils'],
  부엌: ['chefhat', 'soup', 'refrigerator', 'flame', 'utensils'],
  그릇: ['soup', 'utensils'],
  접시: ['soup', 'utensils'],
  물: ['glasswater', 'cup', 'droplet'],
  음료: ['glasswater', 'beer', 'wine', 'cup', 'soda'],
  커피: ['coffee', 'cup'],
  카페: ['coffee', 'cup'],
  잔: ['coffee', 'cup', 'glass', 'wine', 'beer'],
  컵: ['coffee', 'cup', 'glass', 'soda'],
  사과: ['apple'],
  바나나: ['banana'],
  과일: ['apple', 'banana', 'salad'],
  디저트: ['cookie', 'cake', 'croissant'],
  빵: ['croissant', 'cake', 'sandwich'],
  쿠키: ['cookie'],
  피자: ['pizza'],
  샌드위치: ['sandwich'],
  샐러드: ['salad'],
  케이크: ['cake'],
  케잌: ['cake'],
  맥주: ['beer', 'glasswater'],
  와인: ['wine', 'glasswater'],
  술: ['wine', 'beer', 'glasswater'],

  // 2. 가구 / 가전 / 생활용품
  소파: ['sofa', 'chair', 'armchair'],
  쇼파: ['sofa', 'chair', 'armchair'],
  의자: ['chair', 'sofa', 'armchair'],
  가구: ['sofa', 'chair', 'table', 'desk', 'beddouble', 'cabinet', 'wardrobe'],
  탁자: ['table', 'desk'],
  테이블: ['table', 'desk'],
  책상: ['desk', 'laptop', 'table'],
  침대: ['beddouble', 'bed'],
  침실: ['beddouble', 'bed'],
  이불: ['beddouble', 'bed'],
  베개: ['beddouble', 'bed'],
  옷장: ['cabinet', 'archive', 'hanger', 'shirt'],
  장롱: ['cabinet', 'hanger', 'shirt'],
  서랍: ['cabinet', 'archive'],
  서랍장: ['cabinet', 'archive'],
  수납장: ['cabinet', 'archive', 'boxes', 'box'],
  보관함: ['boxes', 'box', 'cabinet', 'archive'],
  캐비닛: ['cabinet', 'archive'],
  캐비넷: ['cabinet', 'archive'],
  상자: ['boxes', 'box'],
  박스: ['boxes', 'box'],
  함: ['boxes', 'box', 'cabinet', 'archive'],
  옷걸이: ['hanger'],
  옷: ['hanger', 'shirt'],
  의류: ['hanger', 'shirt'],
  패션: ['hanger', 'shirt', 'gem'],
  셔츠: ['shirt'],
  바지: ['shirt'],
  냉장고: ['refrigerator', 'ice'],
  얼음: ['refrigerator', 'snowflake', 'ice'],
  냉동: ['refrigerator', 'snowflake'],
  냉장: ['refrigerator', 'thermometer'],
  세탁기: ['washingmachine'],
  세탁: ['washingmachine'],
  빨래: ['washingmachine'],
  티비: ['tv', 'monitor'],
  tv: ['tv', 'monitor'],
  텔레비전: ['tv', 'monitor'],
  모니터: ['monitor', 'tv'],
  스크린: ['monitor', 'tv'],
  청소기: ['brush', 'wind'],
  청소: ['brush', 'trash', 'trash2'],
  빗자루: ['brush'],
  쓰레기: ['trash', 'trash2'],
  휴지통: ['trash', 'trash2'],
  삭제: ['trash', 'trash2'],
  쓰레기통: ['trash', 'trash2'],
  가위: ['scissors'],
  집게: ['paperclip'],
  클립: ['paperclip'],
  컴퓨터: ['laptop', 'monitor', 'keyboard', 'mouse'],
  노트북: ['laptop'],
  키보드: ['keyboard'],
  마우스: ['mouse'],
  프린터: ['printer'],
  인쇄: ['printer'],

  // 3. 의료 / 약 / 건강
  약: ['pill'],
  알약: ['pill'],
  약통: ['pill'],
  연고: ['pill', 'bandage'],
  구급: ['pill', 'heart', 'shield', 'bandage'],
  구급상자: ['pill', 'briefcase', 'heart', 'shield'],
  건강: ['activity', 'heart', 'heartpulse'],
  병원: ['activity', 'heart', 'pill', 'hospital'],
  의사: ['activity', 'stethoscope', 'pill'],
  청진기: ['stethoscope'],
  맥박: ['activity', 'heartpulse'],
  밴드: ['bandage'],
  붕대: ['bandage'],
  안경: ['glasses'],
  렌즈: ['glasses'],

  // 4. 공구 / 하드웨어 / 작업
  공구: ['wrench', 'hammer', 'nut', 'screw'],
  도구: ['wrench', 'hammer', 'nut', 'screw'],
  렌치: ['wrench'],
  스패너: ['wrench'],
  망치: ['hammer'],
  드라이버: ['wrench', 'screw'],
  나사: ['screw', 'nut'],
  못: ['screw', 'hammer'],
  수리: ['wrench', 'hammer', 'nut', 'screw', 'settings'],
  조립: ['wrench', 'hammer', 'nut', 'screw'],
  줄자: ['ruler'],
  자: ['ruler'],
  센티미터: ['ruler'],
  페인트: ['paintbrush', 'paintcan', 'palette'],
  붓: ['paintbrush'],
  색상: ['palette', 'paintbrush'],
  팔레트: ['palette'],
  삽: ['shovel'],
  원예: ['sprout', 'shovel'],

  // 5. 화장실 / 세면 / 뷰티
  목욕: ['bath', 'shower'],
  샤워: ['shower', 'bath'],
  욕실: ['bath', 'shower'],
  화장실: ['bath', 'shower'],
  세수: ['bath', 'droplet'],
  세면대: ['bath'],
  수건: ['washingmachine'],
  비누: ['droplet'],
  거울: ['mirror'],
  화장: ['mirror', 'sparkles'],
  뷰티: ['mirror', 'sparkles', 'gem'],
  빗: ['brush'],

  // 6. 사무 / 서재 / 학업
  서재: ['library', 'book', 'laptop'],
  도서관: ['library', 'book'],
  서점: ['library', 'book'],
  책방: ['library', 'book'],
  연필: ['pencil', 'pen'],
  펜: ['pen', 'pencil', 'paintbrush'],
  노트: ['notebook', 'book', 'filetext'],
  공책: ['notebook', 'book', 'filetext'],
  메모: ['notebook', 'sticky-note', 'filetext'],
  다이어리: ['notebook', 'calendar'],
  지우개: ['eraser', 'trash'],
  파일: ['file', 'folder'],
  폴더: ['folder', 'file'],
  서류: ['file', 'briefcase'],
  서류가방: ['briefcase', 'bag'],
  비즈니스: ['briefcase'],
  회의: ['briefcase', 'users'],
  계산기: ['calculator'],
  수학: ['calculator'],
  숫자: ['calculator'],
  달력: ['calendar'],
  일정: ['calendar'],
  시계: ['clock', 'watch'],
  시간: ['clock', 'watch'],
  알람: ['alarmclock', 'bell'],
  타이머: ['timer', 'clock'],

  // 7. 취미 / 스포츠 / 아웃도어
  헬스: ['dumbbell'],
  아령: ['dumbbell'],
  자전거: ['bike'],
  스포츠: ['dumbbell', 'bike', 'trophy', 'target'],
  축구: ['target', 'trophy'],
  야구: ['target', 'trophy'],
  농구: ['target', 'trophy'],
  캠핑: ['tent', 'compass', 'map', 'flame'],
  등산: ['tent', 'compass', 'map'],
  텐트: ['tent'],
  지도: ['map', 'compass', 'mappin'],
  나침반: ['compass'],
  배낭: ['briefcase', 'bag'],
  음악: ['music', 'mic', 'headphones', 'guitar'],
  노래: ['music', 'mic'],
  마이크: ['mic'],
  라디오: ['radio'],
  헤드폰: ['headphones'],
  이어폰: ['headphones'],
  피아노: ['music'],
  기타: ['guitar', 'music'],
  카메라: ['camera', 'video'],
  사진: ['camera', 'image'],
  동영상: ['video', 'film'],
  비디오: ['video', 'film'],
  필름: ['film', 'video'],
  앨범: ['image', 'camera'],
  게임: ['gamepad', 'gamepad2'],
  조이스틱: ['gamepad', 'gamepad2'],
  게임기: ['gamepad', 'gamepad2'],
  낚시: ['fish'],
  물고기: ['fish'],
  여행: ['plane', 'ticket', 'luggage', 'map'],
  비행기: ['plane'],
  여권: ['book', 'filetext'],
  티켓: ['ticket'],
  캐리어: ['luggage', 'briefcase'],
  트렁크: ['luggage', 'briefcase'],

  // 8. 반려동물 / 식물
  강아지: ['dog'],
  개: ['dog'],
  고양이: ['cat'],
  야옹이: ['cat'],
  애견: ['dog', 'cat'],
  펫: ['dog', 'cat'],
  발자국: ['footprints'],
  꽃: ['flower', 'sprout'],
  식물: ['sprout', 'leaf', 'flower', 'tree'],
  나무: ['tree', 'sprout', 'leaf'],
  화분: ['sprout', 'flower'],
  새싹: ['sprout'],
  나뭇잎: ['leaf', 'sprout'],
  잎사귀: ['leaf'],

  // 9. 금전 / 보안
  지갑: ['wallet', 'creditcard'],
  돈: ['wallet', 'coins', 'banknote'],
  현금: ['banknote', 'coins', 'wallet'],
  코인: ['coins', 'wallet'],
  동전: ['coins', 'wallet'],
  지폐: ['banknote', 'wallet'],
  카드: ['creditcard', 'wallet'],
  신용카드: ['creditcard', 'wallet'],
  결제: ['creditcard', 'wallet'],
  열쇠: ['keyround', 'key', 'lock'],
  키: ['keyround', 'key', 'lock'],
  자물쇠: ['lock', 'unlock'],
  잠금: ['lock', 'unlock'],
  비밀번호: ['lock', 'keyround'],
  도어락: ['lock', 'keyround'],

  // 10. 기타 매핑
  편지: ['mail', 'send'],
  봉투: ['mail'],
  메일: ['mail', 'send'],
  이메일: ['mail'],
  전선: ['cable', 'power'],
  케이블: ['cable', 'power'],
  플러그: ['power', 'cable'],
  콘센트: ['power', 'cable'],
  배터리: ['battery'],
  충전: ['battery', 'power'],
  쇼핑: ['shoppingbasket', 'shoppingbag'],
  장바구니: ['shoppingbasket', 'shoppingbag'],
  마트: ['shoppingbasket', 'shoppingbag'],
  시장: ['shoppingbasket', 'shoppingbag'],
  보석: ['gem', 'diamond'],
  다이아몬드: ['gem', 'diamond'],
  액세서리: ['gem', 'crown'],
  왕관: ['crown'],
  도움말: ['helpcircle'],
  질문: ['helpcircle'],
  물음표: ['helpcircle'],
  정보: ['info'],
  검색: ['search'],
  돋보기: ['search'],
  지구: ['globe'],
  세계: ['globe'],
  구름: ['cloud'],
  날씨: ['cloud', 'sun', 'moon'],
  태양: ['sun'],
  해: ['sun'],
  달: ['moon'],
  별: ['star', 'sparkles'],
  반짝: ['sparkles', 'star'],
};

/**
 * 한글 검색어 쿼리에서 매핑되는 영문 검색어 목록을 추출합니다.
 */
export function translateKoreanToEnglish(koreanQuery: string): string[] {
  const query = koreanQuery.toLowerCase().trim();
  const englishKeywordsSet = new Set<string>();

  // 1단계: 완전 매칭 또는 한글 키워드가 쿼리에 포함되어 있는지 검사
  Object.entries(KOREAN_KEYWORDS_MAP).forEach(([koreanKey, englishValues]) => {
    if (query.includes(koreanKey) || koreanKey.includes(query)) {
      englishValues.forEach((val) => englishKeywordsSet.add(val));
    }
  });

  return Array.from(englishKeywordsSet);
}

