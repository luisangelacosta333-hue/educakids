/* ============================================================
   storybooks-premium.css — EducaKids · MUNDO STORYBOOKS
   Súper Premium Vidrio Esmerilado Glamour · Joyas & Oro
   Reemplaza a storybooks.css. Cargar después del style principal.
   ============================================================ */
:root {
  --sb-accent: #FF3D7F;
  --sb-accent-2: #A855F7;
  --sb-secondary: #4F6DFE;
  --sb-gold: linear-gradient(135deg, #FFE39E 0%, #F5B942 55%, #E08E12 100%);
  --sb-ok: #0EC48A;
  --sb-mal: #F43F5E;
  --sb-text: #1B1240;
  --sb-muted: #6E6690;

  --sb-glass: rgba(255, 255, 255, 0.6);
  --sb-glass-solid: rgba(255, 255, 255, 0.92);
  --sb-border: 1.5px solid rgba(255, 255, 255, 0.88);
  --sb-edge: inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -2px 8px rgba(255,255,255,0.35);
  --sb-shadow: 0 12px 32px rgba(76, 29, 149, 0.10), var(--sb-edge);
  --sb-shadow-hover: 0 22px 50px rgba(76, 29, 149, 0.18), var(--sb-edge);
  --sb-shadow-3d: 0 7px 0 rgba(190, 198, 225, 0.7), 0 16px 34px rgba(76, 29, 149, 0.11), var(--sb-edge);
  --sb-shadow-3d-hover: 0 9px 0 rgba(190, 198, 225, 0.55), 0 24px 48px rgba(255, 61, 127, 0.22), var(--sb-edge);

  --sb-radius: 26px;
  --sb-radius-sm: 18px;
  --sb-pill: 999px;
  --sb-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --sb-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

/* ---------- Raíz y animaciones ---------- */
.sb-root {
  position: relative;
  animation: sb-fade-up 0.45s var(--sb-bounce) both;
  padding-bottom: 8px;
}
.sb-page-enter { animation: sb-fade-up 0.4s var(--sb-bounce) both; }
@keyframes sb-fade-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to   { opacity: 1; transform: none; }
}
@keyframes sb-pop { 0% { transform: scale(1); } 50% { transform: scale(1.07); } 100% { transform: scale(1); } }
@keyframes sb-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
@keyframes sb-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes sb-spin { to { transform: rotate(360deg); } }
@keyframes sb-shine { to { background-position: 200% center; } }

/* ---------- Header (cápsula de cristal) ---------- */
.sb-header {
  display: flex; align-items: center; gap: 12px;
  background: var(--sb-glass);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  border: var(--sb-border);
  border-radius: var(--sb-radius);
  padding: 12px 14px;
  margin-bottom: 16px;
  box-shadow: var(--sb-shadow);
}
.sb-header > div { flex: 1; min-width: 0; }
.sb-title {
  font-size: clamp(19px, 4.6vw, 24px); font-weight: 900; letter-spacing: -0.3px;
  background: linear-gradient(90deg, #FF3D7F, #A855F7, #4F6DFE);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  line-height: 1.2; margin: 0;
}
.sb-subtitle { margin: 2px 0 0; font-size: 13px; font-weight: 700; color: var(--sb-muted); }

.sb-btn-back {
  flex: 0 0 auto; width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(145deg, #ffffff, #F1F5F9);
  border: var(--sb-border);
  font-size: 20px; font-weight: 900; color: var(--sb-text);
  box-shadow: 0 5px 0 rgba(190,198,225,0.6), var(--sb-shadow);
  display: grid; place-items: center; cursor: pointer;
  transition: all 0.25s var(--sb-bounce);
}
.sb-btn-back:hover { transform: translateY(-3px) scale(1.07); box-shadow: 0 7px 0 rgba(190,198,225,0.6), var(--sb-shadow-hover); }
.sb-btn-back:active { transform: translateY(3px) scale(0.94); box-shadow: 0 2px 0 rgba(190,198,225,0.6); }

/* Toggle general (idioma / traducción / karaoke / noche / sílabas / velocidad) */
.sb-toggle {
  flex: 0 0 auto;
  background: var(--sb-glass-solid);
  border: var(--sb-border);
  border-radius: var(--sb-pill);
  padding: 8px 16px;
  font-size: 13.5px; font-weight: 800; color: var(--sb-text);
  box-shadow: 0 4px 0 rgba(190,198,225,0.55), var(--sb-shadow);
  cursor: pointer; white-space: nowrap;
  transition: all 0.25s var(--sb-bounce);
}
.sb-toggle:hover { transform: translateY(-2px); box-shadow: 0 6px 0 rgba(190,198,225,0.55), var(--sb-shadow-hover); }
.sb-toggle:active { transform: translateY(2px) scale(0.96); }
.sb-toggle.on {
  background: linear-gradient(135deg, #FF5C95, #FF3D7F 50%, #C026D3);
  color: #fff; border-color: rgba(255,255,255,0.85);
  box-shadow: 0 5px 0 #B0256B, 0 12px 26px rgba(255, 61, 127, 0.45), inset 0 2px 6px rgba(255,255,255,0.4);
  text-shadow: 0 1px 3px rgba(120,10,60,0.35);
}

/* ---------- Tabs ---------- */
.sb-tabs {
  display: flex; gap: 8px; padding: 6px;
  background: var(--sb-glass);
  backdrop-filter: blur(18px) saturate(180%);
  border: var(--sb-border);
  border-radius: var(--sb-pill);
  margin-bottom: 14px;
  box-shadow: var(--sb-shadow);
}
.sb-tab {
  flex: 1; padding: 11px 8px; border-radius: var(--sb-pill);
  font-size: 14px; font-weight: 800; color: var(--sb-muted);
  background: transparent; cursor: pointer; border: none;
  transition: all 0.3s var(--sb-bounce);
  white-space: nowrap;
}
.sb-tab.active {
  background: linear-gradient(135deg, #FF3D7F, #A855F7);
  color: #fff;
  box-shadow: 0 6px 16px rgba(168, 85, 247, 0.4), inset 0 2px 5px rgba(255,255,255,0.4);
  transform: scale(1.03);
}

/* ---------- Buscador ---------- */
.sb-search-wrap {
  position: relative; margin-bottom: 14px;
  display: flex; align-items: center;
}
.sb-search-icon {
  position: absolute; left: 18px; font-size: 16px; opacity: 0.6; z-index: 1;
  pointer-events: none;
}
.sb-search {
  width: 100% !important; max-width: none !important; margin: 0 !important;
  padding: 13px 20px 13px 46px !important;
  background: var(--sb-glass-solid) !important;
  backdrop-filter: blur(16px) saturate(180%);
  border: var(--sb-border) !important;
  border-radius: var(--sb-pill) !important;
  font-size: 15px !important; font-weight: 700 !important; color: var(--sb-text) !important;
  box-shadow: var(--sb-shadow) !important;
  transition: all 0.25s var(--sb-smooth) !important;
}
.sb-search:focus {
  background: #fff !important;
  border-color: var(--sb-accent) !important;
  box-shadow: 0 0 0 5px rgba(255, 61, 127, 0.22), var(--sb-shadow-hover) !important;
}

/* ---------- Chips de categoría ---------- */
.sb-chips {
  display: flex; gap: 8px; overflow-x: auto; padding: 2px 2px 10px;
  scrollbar-width: none;
}
.sb-chips::-webkit-scrollbar { display: none; }
.sb-chip {
  flex: 0 0 auto; padding: 9px 16px; border-radius: var(--sb-pill);
  background: var(--sb-glass-solid);
  border: var(--sb-border);
  font-size: 13.5px; font-weight: 800; color: var(--sb-text);
  box-shadow: 0 4px 0 rgba(190,198,225,0.5), var(--sb-shadow);
  cursor: pointer; white-space: nowrap;
  transition: all 0.25s var(--sb-bounce);
}
.sb-chip:hover { transform: translateY(-2px); }
.sb-chip.active {
  background: linear-gradient(135deg, #4F6DFE, #A855F7);
  color: #fff; border-color: rgba(255,255,255,0.85);
  box-shadow: 0 5px 0 rgba(79, 60, 180, 0.6), 0 12px 26px rgba(99, 102, 241, 0.45), inset 0 2px 5px rgba(255,255,255,0.4);
}

/* ---------- Grid de libros ---------- */
.sb-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  gap: 14px;
}
.sb-book-card {
  position: relative;
  background: linear-gradient(155deg, rgba(255,255,255,0.94), rgba(255,255,255,0.6));
  backdrop-filter: blur(18px) saturate(180%);
  border: var(--sb-border);
  border-radius: var(--sb-radius);
  padding: 14px;
  box-shadow: var(--sb-shadow-3d);
  cursor: pointer; text-align: center;
  transition: all 0.3s var(--sb-bounce);
  overflow: hidden;
}
.sb-book-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 42%;
  background: linear-gradient(180deg, rgba(255,255,255,0.8), transparent);
  pointer-events: none; border-radius: var(--sb-radius) var(--sb-radius) 50% 50% / 24px;
}
.sb-book-card:hover {
  transform: translateY(-7px) scale(1.02);
  box-shadow: 0 11px 0 rgba(190,198,225,0.55), 0 28px 56px rgba(168, 85, 247, 0.28), var(--sb-edge);
  background: #fff;
}
.sb-book-card:active { transform: scale(0.96); }

.sb-fav-btn {
  position: absolute; top: 10px; right: 10px; z-index: 3;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  border: 2px solid #fff;
  font-size: 17px; cursor: pointer;
  box-shadow: 0 4px 10px rgba(76,29,149,0.18);
  display: grid; place-items: center;
  transition: all 0.25s var(--sb-bounce);
}
.sb-fav-btn:hover { transform: scale(1.2) rotate(-8deg); }

.sb-book-cover {
  position: relative; z-index: 1;
  height: 120px; border-radius: 20px;
  display: grid; place-items: center;
  font-size: 58px; line-height: 1;
  border: 2.5px solid rgba(255,255,255,0.9);
  box-shadow: inset 0 2px 8px rgba(255,255,255,0.7), 0 8px 18px rgba(76,29,149,0.14);
  margin-bottom: 10px; overflow: hidden;
  animation: sb-float 4s ease-in-out infinite;
}
.sb-book-cover::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.5), transparent 55%);
  pointer-events: none;
}
.sb-book-info { position: relative; z-index: 1; }
.sb-book-title {
  font-size: 15px; font-weight: 900; color: var(--sb-text);
  margin: 0 0 8px; line-height: 1.25; min-height: 38px;
  display: flex; align-items: center; justify-content: center;
}
.sb-book-meta {
  display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;
  font-size: 11.5px; font-weight: 700; color: var(--sb-muted); margin-bottom: 10px;
}
.sb-badge {
  color: #fff; padding: 3px 10px; border-radius: var(--sb-pill);
  font-size: 11px; font-weight: 800;
  box-shadow: 0 3px 8px rgba(76,29,149,0.2), inset 0 1px 2px rgba(255,255,255,0.4);
  text-shadow: 0 1px 2px rgba(0,0,0,0.15);
}
.sb-progress-bar {
  height: 8px; background: rgba(76,29,149,0.08);
  border-radius: var(--sb-pill); overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(76,29,149,0.12);
}
.sb-progress-fill {
  height: 100%; border-radius: var(--sb-pill);
  background: linear-gradient(90deg, #FF3D7F, #A855F7, #4F6DFE, #FF3D7F);
  background-size: 200% 100%; animation: sb-shine 2.5s linear infinite;
  box-shadow: 0 0 10px rgba(255, 61, 127, 0.5);
  transition: width 0.5s var(--sb-bounce);
}

/* ---------- Vacío / cargando / error ---------- */
.sb-empty {
  text-align: center; padding: 40px 20px;
  background: var(--sb-glass); backdrop-filter: blur(18px) saturate(180%);
  border: var(--sb-border); border-radius: var(--sb-radius);
  color: var(--sb-muted); font-weight: 700; font-size: 15px;
  box-shadow: var(--sb-shadow);
}
.sb-empty .big { display: block; font-size: 52px; margin-bottom: 10px; filter: drop-shadow(0 8px 14px rgba(76,29,149,0.2)); }
.sb-loader {
  text-align: center; padding: 50px 20px; color: var(--sb-muted); font-weight: 800;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.sb-spinner {
  width: 52px; height: 52px; border-radius: 50%;
  border: 4px solid rgba(168, 85, 247, 0.18);
  border-top-color: #FF3D7F; border-right-color: #A855F7;
  animation: sb-spin 0.9s linear infinite;
  box-shadow: 0 0 20px rgba(255, 61, 127, 0.3);
}

/* ---------- Botones de acción ---------- */
.sb-action-row { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.sb-action-btn {
  position: relative; overflow: hidden;
  border-radius: var(--sb-pill); padding: 13px 22px; min-height: 50px;
  font-size: 14.5px; font-weight: 900; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  transition: all 0.25s var(--sb-bounce);
  border: 2px solid rgba(255,255,255,0.85);
}
.sb-action-btn::after {
  content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent);
  transform: skewX(-20deg); transition: left 0.6s var(--sb-smooth); pointer-events: none;
}
.sb-action-btn:hover::after { left: 120%; }
.sb-action-btn.primary {
  background: linear-gradient(135deg, #FF5C95, #FF3D7F 50%, #D92E8E);
  color: #fff;
  box-shadow: 0 6px 0 #B0256B, 0 14px 30px rgba(255, 61, 127, 0.42), inset 0 2px 6px rgba(255,255,255,0.4);
  text-shadow: 0 1px 3px rgba(120,10,60,0.35);
}
.sb-action-btn.primary:hover { transform: translateY(-3px); box-shadow: 0 8px 0 #B0256B, 0 20px 40px rgba(255,61,127,0.5), inset 0 2px 6px rgba(255,255,255,0.45); }
.sb-action-btn.primary:active { transform: translateY(4px) scale(0.97); box-shadow: 0 2px 0 #B0256B; }
.sb-action-btn.secondary {
  background: var(--sb-glass-solid); color: var(--sb-text);
  box-shadow: 0 5px 0 rgba(190,198,225,0.6), var(--sb-shadow);
}
.sb-action-btn.secondary:hover { transform: translateY(-3px); background: #fff; box-shadow: 0 7px 0 rgba(190,198,225,0.6), var(--sb-shadow-hover); }
.sb-action-btn.accent {
  background: linear-gradient(135deg, #4F6DFE, #A855F7); color: #fff;
  box-shadow: 0 6px 0 #3B4FD1, 0 14px 30px rgba(99, 102, 241, 0.45), inset 0 2px 6px rgba(255,255,255,0.4);
  text-shadow: 0 1px 3px rgba(30,20,90,0.35);
}
.sb-action-btn.accent:hover { transform: translateY(-3px); box-shadow: 0 8px 0 #3B4FD1, 0 20px 40px rgba(99,102,241,0.55); }
.sb-action-btn.ghost {
  background: rgba(255,255,255,0.5); color: var(--sb-text);
  border: 2px dashed rgba(168, 85, 247, 0.5);
  box-shadow: var(--sb-shadow);
}
.sb-action-btn.ghost:hover { transform: translateY(-3px); background: #fff; border-color: #A855F7; }

/* ---------- Toast ---------- */
.sb-toast {
  position: fixed; left: 50%; bottom: 96px; transform: translateX(-50%);
  z-index: 200;
  background: linear-gradient(135deg, #1B1240, #4C1D95);
  color: #fff; padding: 12px 22px; border-radius: var(--sb-pill);
  font-size: 14px; font-weight: 800;
  border: 1.5px solid rgba(255,255,255,0.35);
  box-shadow: 0 16px 40px rgba(27, 18, 64, 0.45), 0 0 24px rgba(168, 85, 247, 0.35);
  animation: sb-pop 0.35s var(--sb-bounce);
  pointer-events: none; white-space: nowrap;
}

/* ============================================================
   LECTOR
   ============================================================ */
.sb-reader {
  background: linear-gradient(165deg, rgba(255,255,255,0.95), rgba(255,255,255,0.72));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 3px solid #ffffff;
  border-radius: 34px;
  padding: 18px;
  box-shadow: 0 10px 0 rgba(99, 102, 241, 0.35), 0 26px 56px rgba(76, 29, 149, 0.16), var(--sb-edge);
  position: relative; overflow: hidden;
}
.sb-reader::before {
  content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
  width: 280px; height: 120px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.16), transparent 70%);
  pointer-events: none;
}

/* Ilustración de página */
.sb-page-illustration {
  position: relative;
  min-height: 150px; border-radius: 26px;
  display: grid; place-items: center;
  font-size: clamp(54px, 14vw, 84px); line-height: 1.15;
  border: 2.5px solid rgba(255,255,255,0.9);
  box-shadow: inset 0 2px 10px rgba(255,255,255,0.7), 0 10px 24px rgba(76,29,149,0.16);
  margin-bottom: 16px; overflow: hidden;
  text-align: center; padding: 18px;
  animation: sb-float 5s ease-in-out infinite;
  text-shadow: 0 10px 22px rgba(27,18,64,0.25);
}
.sb-page-illustration::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.45), transparent 50%);
  pointer-events: none;
}

/* Texto y oraciones */
.sb-page-text { display: flex; flex-direction: column; gap: 10px; position: relative; }
.sb-sentence {
  display: flex; align-items: center; gap: 8px;
  background: linear-gradient(145deg, #ffffff, #F6F4FF);
  border: 2px solid #ffffff;
  border-radius: 20px;
  padding: 12px 12px;
  box-shadow: 0 5px 0 rgba(190,198,225,0.55), 0 10px 22px rgba(76,29,149,0.08), var(--sb-edge);
  cursor: pointer;
  transition: all 0.25s var(--sb-bounce);
  position: relative;
}
.sb-sentence:hover { transform: translateY(-2px); box-shadow: 0 7px 0 rgba(190,198,225,0.55), 0 16px 30px rgba(99,102,241,0.18), var(--sb-edge); }
.sb-sentence.playing {
  border-color: #FF3D7F;
  background: linear-gradient(145deg, #FFF0F6, #FFE4F0);
  box-shadow: 0 5px 0 rgba(255, 61, 127, 0.4), 0 0 24px rgba(255, 61, 127, 0.35), var(--sb-edge);
  transform: scale(1.015);
}
.sb-sentence-text {
  flex: 1; font-size: clamp(16px, 4.2vw, 19px); font-weight: 800;
  color: var(--sb-text); line-height: 1.5;
}
.sb-sentence-translation {
  display: block; margin-top: 4px;
  font-size: 0.82em; font-weight: 600; color: var(--sb-muted); font-style: italic;
}

/* Botones de audio por oración */
.sb-speak-btn {
  flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #ffffff, #EDF3FF);
  border: 2px solid #fff; color: var(--sb-secondary);
  font-size: 16px; cursor: pointer;
  box-shadow: 0 4px 10px rgba(79, 109, 254, 0.3), inset 0 1px 3px #fff;
  display: grid; place-items: center;
  transition: all 0.2s var(--sb-bounce);
}
.sb-speak-btn:hover { transform: scale(1.12) rotate(8deg); }
.sb-speak-btn:active { transform: scale(0.9); }
.sb-speak-btn.secondary { background: linear-gradient(135deg, #F5F3FF, #EDE9FE); color: #A855F7; box-shadow: 0 4px 10px rgba(168, 85, 247, 0.3), inset 0 1px 3px #fff; }

/* Botón micrófono (practicar pronunciación) */
.sb-mic-btn {
  flex: 0 0 auto; width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #FF5C95, #FF3D7F 55%, #D92E8E);
  color: #fff; border: 2px solid rgba(255,255,255,0.85);
  font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 5px 0 #B0256B, 0 10px 22px rgba(255, 61, 127, 0.45), inset 0 2px 5px rgba(255,255,255,0.4);
  margin-left: 4px;
  transition: all 0.2s var(--sb-bounce);
}
.sb-mic-btn:hover { transform: scale(1.12) rotate(-8deg); box-shadow: 0 7px 0 #B0256B, 0 14px 28px rgba(255,61,127,0.55); }
.sb-mic-btn:active { transform: scale(0.88); box-shadow: 0 2px 0 #B0256B; }

/* Palabras clickeables + karaoke + sílabas */
.sb-word {
  cursor: pointer; border-radius: 8px; padding: 0 3px;
  transition: all 0.2s var(--sb-smooth);
  display: inline-block;
}
.sb-word:hover { background: rgba(255, 227, 158, 0.55); }
.sb-word.hl {
  background: linear-gradient(135deg, #FFE39E, #F5B942);
  color: #7C2D12 !important; border-radius: 8px;
  box-shadow: 0 0 16px rgba(245, 185, 66, 0.65);
  transform: scale(1.08);
}
.sb-sil {
  font-weight: 900; display: inline-block;
  padding: 1px 5px; margin: 0 1px;
  border-radius: 8px;
  background: rgba(255,255,255,0.65);
  box-shadow: 0 2px 6px rgba(76,29,149,0.12);
  transition: transform 0.2s var(--sb-bounce);
}
.sb-sil:hover { transform: scale(1.15); }

/* Pista de palabra oculta */
.sb-hint {
  background: linear-gradient(135deg, #FFF8E7, #FFE9B8);
  border: 2.5px dashed #F0A93B;
  border-radius: 18px; padding: 12px 16px;
  margin-bottom: 12px; font-size: 15px; font-weight: 800;
  text-align: center; color: #B45309;
  box-shadow: 0 8px 22px rgba(240, 169, 59, 0.3), inset 0 2px 6px rgba(255,255,255,0.7);
  animation: sb-pop 0.4s var(--sb-bounce);
}

/* Fila de toggles del lector */
.sb-toggle-row {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
  margin-top: 14px; padding-top: 14px;
  border-top: 1.5px dashed rgba(168, 85, 247, 0.25);
}

/* Controles de navegación */
.sb-reader-controls {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  margin-top: 16px;
}
.sb-nav-btn {
  padding: 12px 20px; border-radius: var(--sb-pill);
  font-size: 14.5px; font-weight: 900; cursor: pointer;
  background: var(--sb-glass-solid); color: var(--sb-text);
  border: var(--sb-border);
  box-shadow: 0 5px 0 rgba(190,198,225,0.6), var(--sb-shadow);
  transition: all 0.25s var(--sb-bounce);
}
.sb-nav-btn:hover:not(:disabled) { transform: translateY(-3px); background: #fff; box-shadow: 0 7px 0 rgba(190,198,225,0.6), var(--sb-shadow-hover); }
.sb-nav-btn:active:not(:disabled) { transform: translateY(3px) scale(0.96); box-shadow: 0 2px 0 rgba(190,198,225,0.6); }
.sb-nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.sb-nav-btn.next {
  background: linear-gradient(135deg, #FF5C95, #FF3D7F 50%, #D92E8E);
  color: #fff; border-color: rgba(255,255,255,0.85);
  box-shadow: 0 6px 0 #B0256B, 0 14px 30px rgba(255, 61, 127, 0.42), inset 0 2px 6px rgba(255,255,255,0.4);
  text-shadow: 0 1px 3px rgba(120,10,60,0.35);
}
.sb-nav-btn.next:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 8px 0 #B0256B, 0 20px 40px rgba(255,61,127,0.5); }
.sb-page-indicator {
  font-weight: 900; font-size: 15px; color: var(--sb-secondary);
  background: linear-gradient(135deg, #ffffff, #EEF2FF);
  border: 2px solid #fff; border-radius: var(--sb-pill);
  padding: 8px 18px;
  box-shadow: 0 4px 12px rgba(79, 109, 254, 0.25), inset 0 1px 3px #fff;
}

/* ============================================================
   VOCABULARIO
   ============================================================ */
.sb-vocab-grid { display: flex; flex-direction: column; gap: 10px; }
.sb-vocab-card {
  display: flex; align-items: center; gap: 12px;
  background: linear-gradient(145deg, #ffffff, #F6F4FF);
  border: 2px solid #ffffff; border-radius: 20px;
  padding: 12px 14px;
  box-shadow: 0 5px 0 rgba(190,198,225,0.55), 0 10px 22px rgba(76,29,149,0.08), var(--sb-edge);
  transition: all 0.25s var(--sb-bounce);
}
.sb-vocab-card:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 7px 0 rgba(190,198,225,0.55), var(--sb-shadow-hover); }
.sb-vocab-img {
  flex: 0 0 auto; width: 56px; height: 56px; border-radius: 16px;
  background: linear-gradient(135deg, #FFF0F6, #EDE9FE);
  display: grid; place-items: center; font-size: 30px;
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(168, 85, 247, 0.25), inset 0 1px 3px #fff;
}
.sb-vocab-words { flex: 1; min-width: 0; }
.sb-vocab-es { font-size: 17px; font-weight: 900; color: var(--sb-text); }
.sb-vocab-en { font-size: 13.5px; font-weight: 700; color: var(--sb-muted); font-style: italic; margin-top: 2px; }
.sb-vocab-speak {
  flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #FF5C95, #FF3D7F); color: #fff;
  border: 2px solid rgba(255,255,255,0.8); font-size: 16px; cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 61, 127, 0.4), inset 0 1px 3px rgba(255,255,255,0.4);
  display: grid; place-items: center;
  transition: all 0.2s var(--sb-bounce);
}
.sb-vocab-speak:hover { transform: scale(1.12) rotate(8deg); }
.sb-vocab-speak:active { transform: scale(0.9); }

/* ============================================================
   PREGUNTAS / QUIZ
   ============================================================ */
.sb-quiz { display: flex; flex-direction: column; gap: 14px; padding: 6px 2px; }
.sb-quiz-q {
  font-size: clamp(18px, 4.5vw, 22px); font-weight: 900; color: var(--sb-text);
  text-align: center; line-height: 1.4;
  background: linear-gradient(135deg, #FFF0F6, #EEF2FF);
  border: 2px solid #fff; border-radius: 22px; padding: 18px 16px;
  box-shadow: var(--sb-shadow);
}
.sb-quiz-options { display: grid; gap: 10px; }
.sb-quiz-opt {
  background: linear-gradient(145deg, #ffffff, #F6F4FF);
  border: 2.5px solid #ffffff; border-radius: 20px;
  padding: 16px 18px; font-size: 16px; font-weight: 800; color: var(--sb-text);
  box-shadow: 0 6px 0 rgba(190,198,225,0.6), 0 12px 26px rgba(76,29,149,0.1), var(--sb-edge);
  cursor: pointer; text-align: left;
  transition: all 0.25s var(--sb-bounce);
  position: relative; overflow: hidden;
}
.sb-quiz-opt:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 9px 0 rgba(190,198,225,0.55), 0 20px 40px rgba(168, 85, 247, 0.25), var(--sb-edge);
  background: #fff; border-color: #E9D5FF;
}
.sb-quiz-opt:active:not(:disabled) { transform: translateY(4px) scale(0.98); box-shadow: 0 2px 0 rgba(190,198,225,0.6); }
.sb-quiz-opt:disabled { cursor: default; }
.sb-quiz-opt.correct {
  background: linear-gradient(135deg, #34D399, #059669) !important;
  color: #fff !important; border-color: #A7F3D0 !important;
  box-shadow: 0 7px 0 #047857, 0 16px 36px rgba(14, 196, 138, 0.5), inset 0 2px 6px rgba(255,255,255,0.4) !important;
  animation: sb-pop 0.45s var(--sb-bounce);
}
.sb-quiz-opt.wrong {
  background: linear-gradient(135deg, #FB7185, #E11D48) !important;
  color: #fff !important; border-color: #FECACA !important;
  box-shadow: 0 7px 0 #BE123C, 0 16px 36px rgba(244, 63, 94, 0.5), inset 0 2px 6px rgba(255,255,255,0.35) !important;
  animation: sb-shake 0.45s;
}
.sb-quiz-feedback {
  min-height: 28px; text-align: center; font-weight: 900; font-size: 16px;
  animation: sb-pop 0.35s var(--sb-bounce);
}

/* ============================================================
   FIN / CELEBRACIÓN
   ============================================================ */
.sb-finish {
  text-align: center; padding: 34px 20px;
  background: linear-gradient(160deg, rgba(255,255,255,0.96), rgba(255,255,255,0.8));
  backdrop-filter: blur(24px) saturate(180%);
  border: 3px solid #fff; border-radius: 34px;
  box-shadow: var(--sb-shadow-hover);
  position: relative; overflow: hidden;
}
.sb-finish::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 8px;
  background: linear-gradient(90deg, #FF3D7F, #F5B942, #0EC48A, #4F6DFE, #A855F7);
  background-size: 200% 100%; animation: sb-shine 3s linear infinite;
}
.sb-finish .trophy {
  display: block; font-size: 76px; margin-bottom: 12px;
  animation: sb-float 1.8s ease-in-out infinite;
  filter: drop-shadow(0 14px 24px rgba(240, 169, 59, 0.5));
}
.sb-finish h3 {
  font-size: 24px; font-weight: 900; margin: 6px 0 10px;
  background: linear-gradient(90deg, #FF3D7F, #A855F7, #4F6DFE);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.sb-finish p { color: var(--sb-muted); font-weight: 700; margin-bottom: 18px; }
.sb-finish .sb-action-row { margin-top: 6px; }

/* ============================================================
   JUEGO DE EMPAREJAR (memoria)
   ============================================================ */
.sb-match-hud {
  text-align: center; font-weight: 900; font-size: 15px; color: var(--sb-secondary);
  background: linear-gradient(135deg, #ffffff, #EEF2FF);
  border: 2px solid #fff; border-radius: var(--sb-pill);
  padding: 10px 18px; margin-bottom: 14px;
  box-shadow: 0 4px 12px rgba(79, 109, 254, 0.25), inset 0 1px 3px #fff;
}
.sb-match-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
}
.sb-match-card {
  aspect-ratio: 3/4; border-radius: 18px;
  border: 2.5px solid #fff;
  font-size: 26px; font-weight: 900; color: #7C2D12;
  cursor: pointer; padding: 6px;
  display: grid; place-items: center; text-align: center;
  background: var(--sb-glass-solid);
  box-shadow: 0 6px 0 rgba(190,198,225,0.6), 0 12px 24px rgba(76,29,149,0.12), var(--sb-edge);
  transition: all 0.3s var(--sb-bounce);
  position: relative; overflow: hidden;
  word-break: break-word; line-height: 1.2;
}
.sb-match-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 45%;
  background: linear-gradient(180deg, rgba(255,255,255,0.7), transparent);
  pointer-events: none; border-radius: 16px 16px 50% 50% / 14px;
}
.sb-match-card:hover:not(:disabled) { transform: translateY(-4px) scale(1.04); }
.sb-match-card:active:not(:disabled) { transform: scale(0.94); }
.sb-match-card.matched {
  background: linear-gradient(160deg, #D1FAE5, #A7F3D0) !important;
  border-color: #10B981 !important; color: #065F46 !important;
  box-shadow: 0 0 22px rgba(14, 196, 138, 0.5), inset 0 2px 6px rgba(255,255,255,0.6) !important;
  animation: sb-pop 0.45s var(--sb-bounce);
  cursor: default;
}

/* ============================================================
   ORDENAR HISTORIA
   ============================================================ */
.sb-order-card {
  min-height: 56px; padding: 14px 16px;
  border: 3px solid rgba(168, 85, 247, 0.25);
  border-radius: 18px;
  background: linear-gradient(145deg, #ffffff, #F6F4FF);
  font-size: 14.5px; font-weight: 800; color: var(--sb-text);
  margin-bottom: 10px; cursor: pointer; text-align: left; width: 100%;
  box-shadow: 0 5px 0 rgba(190,198,225,0.55), 0 10px 22px rgba(76,29,149,0.08), var(--sb-edge);
  transition: all 0.25s var(--sb-bounce);
}
.sb-order-card:hover:not(:disabled) { transform: translateY(-3px); border-color: #A855F7; }
.sb-order-card.done {
  background: linear-gradient(135deg, #D1FAE5, #A7F3D0) !important;
  border-color: #10B981 !important; color: #065F46 !important;
  box-shadow: 0 0 18px rgba(14, 196, 138, 0.4) !important;
  opacity: 0.85;
}

/* ============================================================
   CERTIFICADO
   ============================================================ */
.sb-cert {
  background: linear-gradient(160deg, #FFFBEB, #ffffff);
  border: 4px dashed #F0A93B;
  border-radius: 26px; padding: 28px 22px;
  text-align: center; margin: 10px;
  box-shadow: 0 20px 50px rgba(240, 169, 59, 0.3), inset 0 0 0 6px rgba(255, 255, 255, 0.7);
  position: relative;
}
.sb-cert::before {
  content: '🏆'; position: absolute; top: -24px; left: 50%; transform: translateX(-50%);
  font-size: 44px; filter: drop-shadow(0 8px 14px rgba(240,169,59,0.55));
}
.sb-cert .big-emoji { font-size: 58px; display: block; margin-bottom: 8px; margin-top: 8px; }
.sb-cert h3 {
  color: #B45309; font-size: 22px; font-weight: 900; margin: 0 0 8px;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #B45309, #F0A93B, #B45309);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* ============================================================
   MODO NOCHE (bedtime) — cristal oscuro premium
   ============================================================ */
.sb-bedtime { background: transparent !important; color: #EDE9FE !important; }
.sb-bedtime .sb-header,
.sb-bedtime .sb-reader,
.sb-bedtime .sb-tabs,
.sb-bedtime .sb-search,
.sb-bedtime .sb-chip,
.sb-bedtime .sb-book-card,
.sb-bedtime .sb-vocab-card,
.sb-bedtime .sb-quiz-opt,
.sb-bedtime .sb-order-card,
.sb-bedtime .sb-finish,
.sb-bedtime .sb-empty,
.sb-bedtime .sb-match-card {
  background: linear-gradient(155deg, rgba(48, 36, 92, 0.92), rgba(30, 22, 60, 0.85)) !important;
  border-color: rgba(168, 130, 255, 0.35) !important;
  color: #EDE9FE !important;
  box-shadow: 0 10px 30px rgba(10, 5, 30, 0.5), inset 0 1.5px 0 rgba(168, 130, 255, 0.25) !important;
}
.sb-bedtime .sb-title,
.sb-bedtime .sb-book-title,
.sb-bedtime .sb-quiz-q,
.sb-bedtime .sb-sentence-text { color: #F5F3FF !important; }
.sb-bedtime .sb-subtitle,
.sb-bedtime .sb-muted,
.sb-bedtime .sb-book-meta,
.sb-bedtime .sb-vocab-en,
.sb-bedtime .sb-sentence-translation { color: #B8AEE0 !important; }
.sb-bedtime .sb-sentence { background: linear-gradient(145deg, #3A2D6B, #2A1F55) !important; border-color: rgba(168,130,255,0.3) !important; }
.sb-bedtime .sb-sentence.playing { border-color: #FF6B9D !important; box-shadow: 0 0 24px rgba(255, 107, 157, 0.4) !important; }
.sb-bedtime .sb-page-illustration { filter: brightness(0.72) saturate(0.9); border-color: rgba(168,130,255,0.3) !important; }
.sb-bedtime .sb-word.hl { background: linear-gradient(135deg, #FFE39E, #F5B942); color: #7C2D12 !important; }
.sb-bedtime .sb-sil { background: rgba(168, 130, 255, 0.25); }

/* ---------- Responsive ---------- */
@media (max-width: 420px) {
  .sb-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .sb-book-cover { height: 100px; font-size: 48px; }
  .sb-match-grid { grid-template-columns: repeat(3, 1fr); }
  .sb-tab { font-size: 12.5px; padding: 10px 4px; }
  .sb-toggle { font-size: 12px; padding: 7px 12px; }
  .sb-action-btn { padding: 11px 16px; font-size: 13px; }
  .sb-nav-btn { padding: 10px 14px; font-size: 13px; }
}
