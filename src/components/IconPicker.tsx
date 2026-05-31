import React, { useState, useCallback, useRef } from 'react';
import {
  renderIcon,
  getIconEmoji,
} from '../utils/iconHelper';

export interface ImportedIcon {
  name: string;
  svgCode: string;
}

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
  importedIcons: ImportedIcon[];
  setImportedIcons: React.Dispatch<React.SetStateAction<ImportedIcon[]>>;
}

// 가져온 커스텀 SVG/PNG 카드 컴포넌트
const ImportedIconCard = React.memo<{
  name: string;
  svgCode: string;
  isSelected: boolean;
  onClick: (name: string) => void;
}>(({ name, svgCode, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  const isBase64Image = svgCode.startsWith('data:image/');

  return (
    <div
      className={`icon-item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Select custom icon ${name}`}
      title={name}
    >
      <div className="icon-item-graphic dynamic-svg-container">
        {isBase64Image ? (
          <img
            src={svgCode}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
          />
        ) : (
          <div
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        )}
      </div>
      <span className="icon-item-label">{name}</span>
    </div>
  );
});

ImportedIconCard.displayName = 'ImportedIconCard';

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
  importedIcons,
  setImportedIcons,
}) => {
  const [customName, setCustomName] = useState('');
  const [customSvg, setCustomSvg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 커스텀 아이콘 선택 핸들러
  const handleIconClick = useCallback((name: string) => {
    onSelectIcon(name);
  }, [onSelectIcon]);

  // SVG/PNG/JPG/WEBP 파일 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isSvg = file.type === 'image/svg+xml' || file.name.endsWith('.svg');
    const isImage = file.type.startsWith('image/') && !isSvg;

    if (!isSvg && !isImage) {
      setErrorMsg('지원하지 않는 파일 형식입니다. .svg, .png, .jpg, .jpeg, .webp 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const textOrData = event.target?.result as string;
      if (textOrData) {
        if (isSvg) {
          if (!textOrData.trim().toLowerCase().startsWith('<svg')) {
            setErrorMsg('유효한 SVG 코드가 아닙니다. <svg> 태그로 시작해야 합니다.');
            return;
          }
          setCustomSvg(textOrData);
        } else {
          // PNG/JPG/WEBP인 경우 base64 data URL 저장
          setCustomSvg(textOrData);
        }
        
        // 파일 기본명을 아이콘 이름으로 제안 (PascalCase화)
        const baseName = file.name
          .replace(/\.(svg|png|jpg|jpeg|webp)$/i, '')
          .replace(/[^a-zA-Z0-9가-힣]/g, '');
        const capitalizedName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
        setCustomName(capitalizedName);
        setErrorMsg('');
      }
    };

    if (isSvg) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
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

    // 이름 중복 검사 (예약된 시스템 이름 및 커스텀 포함)
    const isNameReserved = ['Search', 'Settings', 'Plus', 'Check', 'HelpCircle'].includes(trimmedName);
    const isNameDuplicated = importedIcons.some((icon) => icon.name.toLowerCase() === trimmedName.toLowerCase());

    if (isNameReserved || isNameDuplicated) {
      setErrorMsg('이미 사용 중이거나 예약된 아이콘 이름입니다.');
      return;
    }

    if (!trimmedSvg) {
      setErrorMsg('SVG 코드를 입력하거나 이미지를 업로드해 주세요.');
      return;
    }

    const isBase64 = trimmedSvg.startsWith('data:image/');
    const isValidSvg = trimmedSvg.toLowerCase().includes('<svg') && trimmedSvg.toLowerCase().includes('</svg>');

    if (!isBase64 && !isValidSvg) {
      setErrorMsg('유효한 SVG 코드 구조 또는 이미지 파일이 아닙니다.');
      return;
    }

    // 새 아이콘 추가
    const newIcon: ImportedIcon = {
      name: trimmedName,
      svgCode: trimmedSvg,
    };

    const updatedList = [...importedIcons, newIcon];
    setImportedIcons(updatedList);

    // 성공 리셋
    setCustomName('');
    setCustomSvg('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    // 새로 가져온 아이콘을 즉시 선택 상태로 설정!
    onSelectIcon(trimmedName);
  };

  // 가져온 아이콘 개별 삭제 기능 (프리미엄 관리 편의성 제공)
  const handleRemoveImportedIcon = (nameToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`"${nameToRemove}" 커스텀 아이콘을 삭제하시겠습니까?`)) return;

    const updatedList = importedIcons.filter((icon) => icon.name !== nameToRemove);
    setImportedIcons(updatedList);

    if (selectedIcon === nameToRemove) {
      if (updatedList.length > 0) {
        onSelectIcon(updatedList[0].name);
      } else {
        onSelectIcon('');
      }
    }
  };

  return (
    <div className="picker-container">
      
      {/* 1. 가져오기 (Import SVG) 기능 헤더 */}
      <div className="search-wrapper" style={{ borderBottom: '1px solid var(--border-color)', padding: '14px 20px' }}>
        <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--toss-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {renderIcon('Plus', { size: 16, strokeWidth: 3 })}
          나만의 커스텀 아이콘 등록
        </span>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          SVG 파일/코드 또는 일반 이미지(PNG/JPG)를 업로드하여 선택박스 목록에 추가할 수 있습니다.
        </p>
      </div>

      {/* 2. 동적 가져오기 패널 (Toss HSL 스타일 상시 노출 폼) */}
      <form onSubmit={handleImportSubmit} className="simulator-panel" style={{ background: 'var(--bg-secondary)', borderTop: 'none', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', marginTop: 0 }}>
        <div className="sim-card" style={{ padding: '14px', border: '1.5px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          <div className="sim-form-group">
            <label className="sim-label" style={{ fontSize: '11px', fontWeight: '700' }}>아이콘 이름 (예: MyStar, Sofa, Wrench)</label>
            <input
              type="text"
              className="search-input"
              style={{ padding: '10px 14px', fontSize: '13px', marginTop: '4px' }}
              placeholder="예: MyFavoriteStar, KitchenKnife"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>

          <div className="sim-form-group" style={{ marginTop: '12px' }}>
            <label className="sim-label" style={{ fontSize: '11px', fontWeight: '700' }}>방법 A: 이미지 또는 SVG 파일 업로드 (.svg, .png, .jpg 등)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,.png,.jpg,.jpeg,.webp"
              onChange={handleFileUpload}
              style={{
                fontSize: '11px',
                marginTop: '4px',
                display: 'block',
                width: '100%',
                padding: '8px',
                background: 'var(--bg-secondary)',
                border: '1.5px dashed var(--border-color)',
                borderRadius: '8px'
              }}
            />
          </div>

          <div className="sim-form-group" style={{ marginTop: '12px' }}>
            <label className="sim-label" style={{ fontSize: '11px', fontWeight: '700' }}>방법 B: SVG 원본 코드 붙여넣기</label>
            <textarea
              className="search-input"
              style={{
                padding: '10px 14px',
                fontSize: '11px',
                fontFamily: 'monospace',
                marginTop: '4px',
                height: '70px',
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

          <button
            type="submit"
            className="sim-btn-primary"
            style={{ margin: '12px 0 0 0', padding: '10px', fontSize: '13px', width: '100%' }}
          >
            아이콘 추가하기
          </button>
        </div>
      </form>

      {/* 3. 아이콘 일괄 그리드 영역 */}
      <div className="grid-container" style={{ height: '320px', padding: '20px' }}>
        
        {/* 3-A. 내가 가져온 아이콘 섹션 */}
        {importedIcons.length > 0 ? (
          <div>
            <div className="grid-section-title" style={{ color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '13px', fontWeight: '700' }}>
              <span>업로드된 나만의 아이콘 목록 ({importedIcons.length})</span>
              <span style={{ fontSize: '9px', fontWeight: 'normal', color: 'var(--text-tertiary)' }}>* 브라우저 저장소 동기화됨</span>
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
        ) : (
          /* 3-B. 비어있을 때의 프리미엄 플레이스홀더 */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1.5px dashed var(--border-color)',
            padding: '24px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
              업로드된 아이콘이 없습니다
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', maxWidth: '280px', lineHeight: 1.4 }}>
              위의 폼을 통해 SVG 파일 또는 이미지(PNG/JPG)를 등록하여 나만의 커스텀 수납처 아이콘을 만들어 보세요!
            </p>
          </div>
        )}

      </div>

      {/* 4. 선택 완료 메타 정보 바 */}
      <div className="selection-bar">
        <div className="selection-details">
          <div className="selection-icon-preview">
            {selectedIcon ? renderIcon(selectedIcon, { size: 24 }) : renderIcon('HelpCircle', { size: 24 })}
          </div>
          <div className="selection-texts">
            <span className="selection-title">
              {selectedIcon || '아이콘을 등록/선택하세요'}
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
