import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  SPACE_PRESETS,
  STORAGE_PRESETS,
  SEARCH_INDEX,
  renderIcon,
  getIconEmoji,
} from '../utils/iconHelper';

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

// 개별 아이콘 카드 메모제이션 (리렌더링 렉 최소화 및 DOM 재사용)
const IconCard = React.memo<{
  name: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}>(({ name, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  return (
    <div
      className={`icon-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Select icon ${name}`}
      title={name}
    >
      <div className="icon-item-graphic">
        {renderIcon(name, { size: 24 })}
      </div>
      <span className="icon-item-label">{name}</span>
    </div>
  );
});

IconCard.displayName = 'IconCard';

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'space' | 'storage'>('space');
  const inputRef = useRef<HTMLInputElement>(null);

  // 실시간 검색어 변경 핸들러 (포커스 유지 보장)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 검색어 초기화 핸들러
  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 1,000개 이상의 아이콘 전체 리스트 필터링 연산 최적화 (useMemo + 캐시 인덱스)
  // 최대 48개로 제한하여 모바일 가상 돔 크래시 원천 차단
  const filteredIcons = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return [];

    const matches: string[] = [];
    for (let i = 0; i < SEARCH_INDEX.length; i++) {
      const item = SEARCH_INDEX[i];
      if (item.lowerName.includes(trimmed)) {
        matches.push(item.originalName);
        if (matches.length >= 48) break; // 최대 48개 노드 제한
      }
    }
    return matches;
  }, [searchQuery]);

  const handleIconClick = useCallback((name: string) => {
    onSelectIcon(name);
  }, [onSelectIcon]);

  return (
    <div className="picker-container">
      {/* 1. 실시간 검색 인풋 (포커스 유실 방지 설계) */}
      <div className="search-wrapper">
        <div className="search-input-box">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search icons in English (e.g. tv, sofa, tool)"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <span className="search-icon">
            {renderIcon('Search', { size: 18 })}
          </span>
          {searchQuery && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. 검색 중이 아닐 때만 탭 브라우저 노출 */}
      {!searchQuery && (
        <div className="tabs-wrapper">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'space' ? 'active' : ''}`}
            onClick={() => setActiveTab('space')}
          >
            {renderIcon('Home', { size: 14 })}
            공간 추천 (24)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
            onClick={() => setActiveTab('storage')}
          >
            {renderIcon('Boxes', { size: 14 })}
            수납처 추천 (15)
          </button>
        </div>
      )}

      {/* 3. 아이콘 그리드 영역 (고정 높이로 가상 키보드 밀림에 대항) */}
      <div className="grid-container">
        {searchQuery ? (
          // 검색 결과 모드
          <div>
            <div className="grid-section-title">
              검색 결과 ({filteredIcons.length}{filteredIcons.length >= 48 ? '+' : ''})
            </div>
            {filteredIcons.length > 0 ? (
              <div className="icon-grid">
                {filteredIcons.map((name) => (
                  <IconCard
                    key={name}
                    name={name}
                    isSelected={selectedIcon === name}
                    onClick={handleIconClick}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  {renderIcon('HelpCircle', { size: 40 })}
                </div>
                <h4 className="empty-state-title">검색 결과가 없습니다</h4>
                <p className="empty-state-desc">다른 영문 검색어로 시도해 보세요.</p>
              </div>
            )}
          </div>
        ) : (
          // 디폴트 추천 프리셋 모드
          <div>
            {activeTab === 'space' ? (
              <div>
                <div className="grid-section-title">추천 공간 아이콘</div>
                <div className="icon-grid">
                  {SPACE_PRESETS.map((name) => (
                    <IconCard
                      key={name}
                      name={name}
                      isSelected={selectedIcon === name}
                      onClick={handleIconClick}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="grid-section-title">추천 수납처 아이콘</div>
                <div className="icon-grid">
                  {STORAGE_PRESETS.map((name) => (
                    <IconCard
                      key={name}
                      name={name}
                      isSelected={selectedIcon === name}
                      onClick={handleIconClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. 선택 완료 및 메타 정보 바 */}
      <div className="selection-bar">
        <div className="selection-details">
          <div className="selection-icon-preview">
            {selectedIcon ? renderIcon(selectedIcon, { size: 24 }) : renderIcon('HelpCircle', { size: 24 })}
          </div>
          <div className="selection-texts">
            <span className="selection-title">
              {selectedIcon || '아이콘을 선택하세요'}
            </span>
            {selectedIcon && (
              <span className="selection-meta">
                하이브리드 이모지 매칭:{' '}
                <strong className="selection-emoji-badge">
                  {getIconEmoji(selectedIcon)}
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
