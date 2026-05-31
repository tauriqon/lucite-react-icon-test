import React, { useState, useEffect, useRef } from 'react';
import type { ImportedIcon } from './IconPicker';
import { renderIcon } from '../utils/iconHelper';

interface CustomSelectProps {
  importedIcons: ImportedIcon[];
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  importedIcons,
  selectedIcon,
  onSelectIcon,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 아이콘 검색
  const currentIcon = importedIcons.find((icon) => icon.name === selectedIcon);

  // 드롭다운 외부 클릭 감지하여 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled && importedIcons.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelectOption = (iconName: string) => {
    onSelectIcon(iconName);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select-container ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
      style={{ position: 'relative', width: '100%' }}
    >
      {/* 1. 셀렉트 트리거 버튼 */}
      <button
        type="button"
        className="custom-select-trigger"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled || importedIcons.length === 0}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentIcon ? (
            <div className="custom-select-thumb">
              {renderIcon(currentIcon.name, { size: 18 })}
            </div>
          ) : (
            <div className="custom-select-thumb placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          )}
          <span className={`custom-select-value ${!currentIcon ? 'placeholder' : ''}`}>
            {currentIcon ? currentIcon.name : '⚠️ 아이콘을 먼저 업로드하세요'}
          </span>
        </div>
        
        {/* 드롭다운 화살표 Chevron Down */}
        <svg
          className="custom-select-arrow"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* 2. 플로팅 드롭다운 옵션 레이어 */}
      {isOpen && importedIcons.length > 0 && (
        <ul className="custom-select-dropdown" role="listbox">
          {importedIcons.map((icon) => {
            const isSelected = icon.name === selectedIcon;
            return (
              <li
                key={`custom-opt-${icon.name}`}
                role="option"
                aria-selected={isSelected}
                className={`custom-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(icon.name)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="custom-select-thumb">
                    {renderIcon(icon.name, { size: 18 })}
                  </div>
                  <span className="custom-option-name">{icon.name}</span>
                </div>

                {isSelected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--toss-blue)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
