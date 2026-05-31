import React, { useState, useEffect } from 'react';
import { IconPicker } from './components/IconPicker';
import { renderIcon, getIconEmoji, SPACE_PRESETS, STORAGE_PRESETS } from './utils/iconHelper';

interface MockItem {
  id: string;
  name: string;
  type: 'space' | 'storage';
  iconName: string;
}

export default function App() {
  const [selectedIcon, setSelectedIcon] = useState<string>('Home');
  const [itemName, setItemName] = useState<string>('');
  const [itemType, setItemType] = useState<'space' | 'storage'>('space');
  const [createdItems, setCreatedItems] = useState<MockItem[]>([
    { id: '1', name: '거실 소파 앞', type: 'space', iconName: 'Sofa' },
    { id: '2', name: '공구함 A', type: 'storage', iconName: 'Wrench' },
    { id: '3', name: '구급상자', type: 'storage', iconName: 'Pill' },
    { id: '4', name: '안방 서랍장', type: 'storage', iconName: 'Cabinet' },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 아이콘 피커에서 선택한 아이콘에 대응하여, 기본 생성 예시 이름을 어울리게 세팅해주는 위트있는 편의기능
  useEffect(() => {
    if (!itemName) {
      if (selectedIcon === 'Home') setItemName('우리집');
      else if (selectedIcon === 'Sofa') setItemName('거실 소파');
      else if (selectedIcon === 'ChefHat') setItemName('주방 요리대');
      else if (selectedIcon === 'BedDouble') setItemName('안방 침대');
      else if (selectedIcon === 'Boxes') setItemName('베란다 물품상자');
      else if (selectedIcon === 'Cabinet') setItemName('안방 서랍장');
      else if (selectedIcon === 'Wrench') setItemName('다용도실 공구 수납함');
      else if (selectedIcon === 'Pill') setItemName('상비약 보관함');
    }
  }, [selectedIcon]);

  // 피커 타입 탭과 폼의 타입 싱크 조절
  useEffect(() => {
    // 디폴트 매칭 보정
    if (itemType === 'space' && !SPACE_PRESETS.includes(selectedIcon as any)) {
      setSelectedIcon('Home');
    } else if (itemType === 'storage' && !STORAGE_PRESETS.includes(selectedIcon as any)) {
      setSelectedIcon('Boxes');
    }
  }, [itemType]);

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) {
      alert('이름을 입력해 주세요.');
      return;
    }

    const newItem: MockItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      type: itemType,
      iconName: selectedIcon,
    };

    setCreatedItems((prev) => [newItem, ...prev]);
    setToastMessage(`🎉 [${itemType === 'space' ? '공간' : '수납처'}] "${newItem.name}" 생성 성공!`);
    setItemName('');
    
    // 토스트 3초 후 삭제
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="app-container">
      {/* 프리미엄 헤더 */}
      <header className="app-header">
        <div className="app-title-badge">
          {renderIcon('Sparkles', { size: 10, strokeWidth: 3 })}
          WhereIsIt Tech Validation
        </div>
        <h1 className="app-title">Lucide React 아이콘 피커</h1>
        <p className="app-subtitle">모바일-퍼스트 프리미엄 1-2단계 생성기 검증 데모</p>
      </header>

      {/* 메인 아이콘 피커 컴포넌트 */}
      <IconPicker
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
      />

      {/* 폼 및 하이브리드 시뮬레이터 패널 */}
      <section className="simulator-panel">
        <h3 className="sim-section-title">
          {renderIcon('Settings', { size: 16 })}
          하이브리드 렌더링 시뮬레이터 (Form)
        </h3>

        <form onSubmit={handleCreateItem} className="sim-card">
          <div className="sim-form-group">
            <label className="sim-label">구분 (1단계 / 2단계)</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                className={`tab-btn ${itemType === 'space' ? 'active' : ''}`}
                onClick={() => setItemType('space')}
                style={{ border: '1px solid var(--border-color)' }}
              >
                🏠 공간 (1단계)
              </button>
              <button
                type="button"
                className={`tab-btn ${itemType === 'storage' ? 'active' : ''}`}
                onClick={() => setItemType('storage')}
                style={{ border: '1px solid var(--border-color)' }}
              >
                📦 수납처 (2단계)
              </button>
            </div>
          </div>

          <div className="sim-form-group">
            <label className="sim-label" htmlFor="item-name-input">
              공간/수납처 이름
            </label>
            <input
              id="item-name-input"
              type="text"
              className="search-input"
              style={{ paddingLeft: '14px', marginTop: '4px' }}
              placeholder="예: 안방 옷장, 주방 수납장"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          {/* REQUIREMENT ①: 표준 HTML <select> 내 유니코드 이모지 폴백 시뮬레이션 */}
          <div className="sim-form-group">
            <label className="sim-label" htmlFor="hybrid-select-box">
              DB 저장용 하이브리드 선택 박스 (표준 select)
            </label>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              ※ option 태그 내부는 SVG가 불가하므로 이모지로 자동 변환(Fallback) 렌더링됩니다.
            </p>
            <select
              id="hybrid-select-box"
              className="sim-select"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
            >
              {/* 공간 프리셋 옵션 */}
              <optgroup label="공간 추천 목록 (이모지 폴백)">
                {SPACE_PRESETS.map((name) => (
                  <option key={`opt-space-${name}`} value={name}>
                    {getIconEmoji(name)} {name}
                  </option>
                ))}
              </optgroup>
              
              {/* 수납처 프리셋 옵션 */}
              <optgroup label="수납처 추천 목록 (이모지 폴백)">
                {STORAGE_PRESETS.map((name) => (
                  <option key={`opt-storage-${name}`} value={name}>
                    {getIconEmoji(name)} {name}
                  </option>
                ))}
              </optgroup>

              {/* 검색해서 선택한 임의의 아이콘이 위 목록에 없을 때를 대비한 동적 옵션 추가 */}
              {!SPACE_PRESETS.includes(selectedIcon as any) && !STORAGE_PRESETS.includes(selectedIcon as any) && (
                <optgroup label="검색한 커스텀 아이콘">
                  <option value={selectedIcon}>
                    {getIconEmoji(selectedIcon)} {selectedIcon} (검색됨)
                  </option>
                </optgroup>
              )}
            </select>
          </div>

          {/* 실시간 프리뷰 카드 디스플레이 */}
          <div className="sim-preview-display">
            <div className="sim-preview-icon-container">
              {renderIcon(selectedIcon, { size: 24, strokeWidth: 2.5 })}
            </div>
            <div className="sim-preview-details">
              <span className="sim-preview-title">
                {itemName || '(이름을 입력하세요)'}
              </span>
              <span className="sim-preview-subtitle">
                {renderIcon(itemType === 'space' ? 'Home' : 'Boxes', { size: 12 })}
                {itemType === 'space' ? '공간' : '수납처'} · 이모지 폴백: {getIconEmoji(selectedIcon)}
              </span>
            </div>
          </div>

          <button type="submit" className="sim-btn-primary">
            {renderIcon('Plus', { size: 18, strokeWidth: 3 })}
            새 {itemType === 'space' ? '공간' : '수납처'} 등록하기
          </button>
        </form>

        {/* 토스트 알림 */}
        {toastMessage && (
          <div className="toast-msg">
            {renderIcon('Check', { size: 16, strokeWidth: 3 })}
            {toastMessage}
          </div>
        )}
      </section>

      {/* 등록된 샘플 목록 뷰 */}
      <section style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
        <h3 className="sim-section-title" style={{ marginBottom: '12px' }}>
          {renderIcon('Library', { size: 16 })}
          현재 생성된 물건 공간/수납처 목록 ({createdItems.length})
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {createdItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {renderIcon(item.iconName, { size: 18 })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {item.type === 'space' ? '1단계 공간' : '2단계 수납처'} · Lucide: {item.iconName}
                  </span>
                </div>
              </div>
              
              {/* 목록 내부 이모지 매핑 확인용 배지 */}
              <div
                style={{
                  fontSize: '18px',
                  background: 'var(--bg-primary)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                }}
                title={`이모지 폴백: ${getIconEmoji(item.iconName)}`}
              >
                {getIconEmoji(item.iconName)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
