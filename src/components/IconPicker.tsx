import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SPACE_PRESETS,
  STORAGE_PRESETS,
  renderIcon,
  getIconEmoji,
} from '../utils/iconHelper';

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

export interface ImportedIcon {
  name: string;
  svgCode: string;
}

// 개별 아이콘 카드 컴포넌트 (기성 기성 프리셋용)
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

// 가져온 커스텀 SVG 카드 컴포넌트
const ImportedIconCard = React.memo<{
  name: string;
  svgCode: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}>(({ name, svgCode, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  return (
    <div
      className={`icon-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Select custom icon ${name}`}
      title={name}
    >
      {/* CSS Normalization을 위해 클래스를 부여하여 24px 크기 및 색상 강제 상속 */}
      <div
        className="icon-item-graphic dynamic-svg-container"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
      <span className="icon-item-label">{name}</span>
    </div>
  );
});

ImportedIconCard.displayName = 'ImportedIconCard';

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
}) => {
  const [importedIcons, setImportedIcons] = useState<ImportedIcon[]>([]);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customSvg, setCustomSvg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 마운트 시 localStorage에서 가져온 커스텀 아이콘 로드
  useEffect(() => {
    const saved = localStorage.getItem('whereisit_imported_icons');
    if (saved) {
      try {
        setImportedIcons(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse imported icons', e);
      }
    }
  }, []);

  // 커스텀 아이콘 선택 핸들러
  const handleIconClick = useCallback((name: string) => {
    onSelectIcon(name);
  }, [onSelectIcon]);

  // SVG 파일 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
      setErrorMsg('확장자가 .svg인 파일만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        // 간이 태그 검증
        if (!text.trim().toLowerCase().startsWith('<svg')) {
          setErrorMsg('유효한 SVG 코드가 아닙니다. <svg> 태그로 시작해야 합니다.');
          return;
        }
        setCustomSvg(text);
        // 파일 기본명을 아이콘 이름으로 제안 (PascalCase화)
        const baseName = file.name
          .replace('.svg', '')
          .replace(/[^a-zA-Z0-9가-힣]/g, '');
        const capitalizedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        setCustomName(capitalizedName);
        setErrorMsg('');
      }
    };
    reader.readAsText(file);
  };

  // 아이콘 가져오기(Import) 제출 처리
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = customName.trim();
    const trimmedSvg = customSvg.trim();

    if (!trimmedName) {
      setErrorMsg('아이콘 이름을 입력해 주세요.');
      return;
    }

    // 이름 중복 검사 (기존 추천 아이콘셋 및 커스텀 포함)
    const isNameReserved =
      SPACE_PRESETS.includes(trimmedName as any) ||
      STORAGE_PRESETS.includes(trimmedName as any) ||
      ['Search', 'Settings', 'Plus', 'Check', 'HelpCircle'].includes(trimmedName);
      
    const isNameDuplicated = importedIcons.some((icon) => icon.name.toLowerCase() === trimmedName.toLowerCase());

    if (isNameReserved || isNameDuplicated) {
      setErrorMsg('이미 사용 중이거나 예약된 아이콘 이름입니다.');
      return;
    }

    if (!trimmedSvg) {
      setErrorMsg('SVG 코드를 입력하거나 파일을 업로드해 주세요.');
      return;
    }

    if (!trimmedSvg.toLowerCase().includes('<svg') || !trimmedSvg.toLowerCase().includes('</svg>')) {
      setErrorMsg('유효한 SVG 코드 구조가 아닙니다. <svg>...</svg> 태그 형태여야 합니다.');
      return;
    }

    // 새 아이콘 추가
    const newIcon: ImportedIcon = {
      name: trimmedName,
      svgCode: trimmedSvg,
    };

    const updatedList = [...importedIcons, newIcon];
    setImportedIcons(updatedList);
    localStorage.setItem('whereisit_imported_icons', JSON.stringify(updatedList));

    // 성공 리셋
    setCustomName('');
    setCustomSvg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowImportPanel(false);

    // 새로 가져온 아이콘을 즉시 선택 상태로 설정!
    onSelectIcon(trimmedName);
    
    // 가져온 커스텀 아이콘을 global helper에 저장(메모리 캐시 동기화)
    (window as any).__importedIconsCache = updatedList;
  };

  // 가져온 아이콘 개별 삭제 기능 (프리미엄 관리 편의성 제공)
  const handleRemoveImportedIcon = (nameToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`"${nameToRemove}" 커스텀 아이콘을 삭제하시겠습니까?`)) return;

    const updatedList = importedIcons.filter((icon) => icon.name !== nameToRemove);
    setImportedIcons(updatedList);
    localStorage.setItem('whereisit_imported_icons', JSON.stringify(updatedList));
    
    // 글로벌 메모리 캐시 동기화
    (window as any).__importedIconsCache = updatedList;

    if (selectedIcon === nameToRemove) {
      onSelectIcon('Home'); // 삭제 시 기본으로 변경
    }
  };

  // 글로벌 메모리 캐시 동기화 (App.tsx 연계용)
  useEffect(() => {
    (window as any).__importedIconsCache = importedIcons;
  }, [importedIcons]);

  return (
    <div className="picker-container">
      
      {/* 1. 가져오기 (Import SVG) 기능 헤더 및 버튼 */}
      <div className="search-wrapper" style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
          기본 아이콘 카탈로그
        </span>
        <button
          type="button"
          className="tab-btn"
          onClick={() => setShowImportPanel(!showImportPanel)}
          style={{
            flex: 'none',
            fontSize: '12px',
            padding: '6px 12px',
            background: showImportPanel ? 'var(--toss-blue-soft)' : 'var(--bg-secondary)',
            color: showImportPanel ? 'var(--toss-blue)' : 'var(--text-primary)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {renderIcon('Plus', { size: 12, strokeWidth: 3 })}
          나만의 SVG 가져오기
        </button>
      </div>

      {/* 2. 동적 가져오기 패널 (Toss HSL 스타일 슬라이드 폼) */}
      {showImportPanel && (
        <form onSubmit={handleImportSubmit} className="simulator-panel" style={{ background: 'var(--bg-secondary)', borderTop: 'none', borderBottom: '1px solid var(--border-color)', padding: '16px 20px' }}>
          <div className="sim-card" style={{ padding: '14px', border: '1.5px solid var(--toss-blue-soft-border)' }}>
            <span className="sim-label" style={{ fontSize: '12px', color: 'var(--toss-blue)', display: 'block', marginBottom: '8px' }}>
              ✨ 나만의 커스텀 SVG 아이콘 등록
            </span>
            
            <div className="sim-form-group">
              <label className="sim-label" style={{ fontSize: '10px' }}>아이콘 영문명 (PascalCase 권장)</label>
              <input
                type="text"
                className="search-input"
                style={{ padding: '8px 12px', fontSize: '13px', marginTop: '4px' }}
                placeholder="예: MyFavoriteStar, KitchenKnife"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>

            <div className="sim-form-group" style={{ marginTop: '10px' }}>
              <label className="sim-label" style={{ fontSize: '10px' }}>방법 A: SVG 파일 업로드 (.svg)</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                style={{
                  fontSize: '11px',
                  marginTop: '4px',
                  display: 'block',
                  width: '100%',
                  padding: '6px',
                  background: 'var(--bg-secondary)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div className="sim-form-group" style={{ marginTop: '10px' }}>
              <label className="sim-label" style={{ fontSize: '10px' }}>방법 B: SVG 원본 코드 붙여넣기</label>
              <textarea
                className="search-input"
                style={{
                  padding: '8px 12px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  marginTop: '4px',
                  height: '80px',
                  resize: 'none',
                  whiteSpace: 'pre'
                }}
                placeholder='<svg viewBox="0 0 24 24">...</svg>'
                value={customSvg}
                onChange={(e) => setCustomSvg(e.target.value)}
              />
            </div>

            {errorMsg && (
              <div style={{ color: 'red', fontSize: '11px', fontWeight: '600', marginTop: '8px' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                type="submit"
                className="sim-btn-primary"
                style={{ margin: 0, padding: '10px', fontSize: '13px', flex: 1 }}
              >
                가져오기 완료
              </button>
              <button
                type="button"
                className="tab-btn"
                onClick={() => {
                  setShowImportPanel(false);
                  setErrorMsg('');
                }}
                style={{ border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '10px', fontSize: '13px' }}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 3. 아이콘 일괄 그리드 영역 (모든 프리셋 동시 스크롤 노출) */}
      <div className="grid-container" style={{ height: '360px' }}>
        
        {/* 3-A. 내가 가져온 아이콘 섹션 (가져온 파일이 있을 때만 렌더) */}
        {importedIcons.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div className="grid-section-title" style={{ color: 'var(--toss-blue)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>내가 가져온 커스텀 아이콘 ({importedIcons.length})</span>
              <span style={{ fontSize: '9px', fontWeight: 'normal', color: 'var(--text-tertiary)' }}>* 브라우저에 영구 보존됨</span>
            </div>
            <div className="icon-grid">
              {importedIcons.map((icon) => (
                <div key={icon.name} style={{ position: 'relative' }}>
                  <ImportedIconCard
                    name={icon.name}
                    svgCode={icon.svgCode}
                    isSelected={selectedIcon === icon.name}
                    onClick={handleIconClick}
                  />
                  {/* 삭제 버튼 overlay */}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveImportedIcon(icon.name, e)}
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      zIndex: 5
                    }}
                    title="아이콘 삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-B. 공간 추천 아이콘 그리드 */}
        <div style={{ marginBottom: '20px' }}>
          <div className="grid-section-title">
            🏠 공간 추천 아이콘 catalogue (24종)
          </div>
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

        {/* 3-C. 수납처 추천 아이콘 그리드 */}
        <div>
          <div className="grid-section-title">
            📦 수납처 추천 아이콘 catalogue (15종)
          </div>
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

      </div>

      {/* 4. 선택 완료 메타 정보 바 */}
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
