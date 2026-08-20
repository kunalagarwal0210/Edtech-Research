import { useState } from "react";

function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

      * { box-sizing: border-box; }
      .plainly, .plainly * { font-family: 'Nunito', system-ui, sans-serif; }

      .plainly {
        --bg:#F6F7FB; --surface:#FFFFFF; --border:#E7E9F0; --muted:#6B7080;
        --primary:#5B6CFF; --edge:#3B49CC; --positive:#22C55E; --warm:#FFC24B;
        --text:#1A1D2E; --danger:#FF6B6B;
        background:#EDEFF5; color:var(--text);
      }

      /* ---- shell ---- */
      .topbar{max-width:1120px;margin:0 auto;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;}
      .brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;}
      .brand-badge{width:34px;height:34px;border-radius:11px;background:var(--primary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;box-shadow:0 4px 12px rgba(91,108,255,.35);}
      .link-btn{background:none;border:none;color:var(--muted);font-weight:700;font-size:14px;cursor:pointer;}
      .link-btn:hover{color:var(--text);}

      /* ---- logo ---- */
      .logo{display:inline-flex;align-items:center;gap:11px;}
      .logo-mark{width:36px;height:36px;border-radius:11px;flex-shrink:0;box-shadow:0 4px 12px rgba(91,108,255,.32);}
      .logo-word{font-weight:900;letter-spacing:-.02em;line-height:1;color:var(--text);display:inline-flex;}
      .logo-tag{font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);}
      /* the wit: highlight the hidden "ai" in pl-AI-nly */
      .hl{position:relative;display:inline-block;color:var(--primary);}
      .hl > span{position:relative;z-index:1;}
      .hl::before{content:"";position:absolute;left:-2px;right:-3px;bottom:1px;height:46%;
        background:var(--warm);border-radius:5px;transform:rotate(-2deg);z-index:0;opacity:.85;}

      /* ---- buttons ---- */
      .btn{border:none;border-radius:9999px;font-weight:800;font-size:16px;padding:14px 30px;cursor:pointer;
        display:inline-flex;align-items:center;justify-content:center;gap:8px;user-select:none;
        background:var(--primary);color:#fff;border-bottom:4px solid var(--edge);
        transition:transform .08s ease,border-bottom-width .08s ease;}
      .btn:active{transform:translateY(3px);border-bottom-width:1px;}
      .btn:disabled{opacity:.55;cursor:not-allowed;}
      .btn.block{width:100%;}
      .btn-ghost{background:transparent;color:var(--primary);border:2px solid var(--border);border-radius:9999px;
        font-weight:800;font-size:16px;padding:12px 24px;cursor:pointer;}
      .btn-ghost:hover{border-color:var(--primary);background:rgba(91,108,255,.05);}

      /* ---- cards & inputs ---- */
      .card{background:var(--surface);border-radius:20px;box-shadow:0 6px 20px rgba(20,22,40,.08);border:1px solid var(--border);}
      .note-input{width:100%;background:#fff;border-radius:14px;border:2px solid var(--border);padding:16px 18px;
        font-size:16px;color:var(--text);resize:none;outline:none;line-height:1.6;transition:border-color .15s,box-shadow .15s;}
      .note-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(91,108,255,.15);}
      .note-input::placeholder{color:var(--muted);}
      .chip{background:rgba(255,194,75,.14);color:var(--text);border-radius:9999px;padding:7px 15px;font-weight:700;
        font-size:14px;border:1.5px solid rgba(255,194,75,.55);cursor:pointer;transition:background .15s;}
      .chip:hover{background:rgba(255,194,75,.3);}
      .eyebrow{text-transform:uppercase;font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--muted);}
      .option{width:100%;background:#fff;border-radius:16px;border:2px solid var(--border);padding:15px 18px;
        font-weight:700;font-size:16px;color:var(--text);cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;
        transition:border-color .15s,background .15s;}
      .option:hover{border-color:var(--primary);background:rgba(91,108,255,.04);}
      .option.selected{border-color:var(--primary);background:rgba(91,108,255,.08);color:var(--primary);}
      .radio{width:24px;height:24px;border-radius:9999px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .option.selected .radio{border-color:var(--primary);background:var(--primary);color:#fff;}

      .notice{background:rgba(255,194,75,.1);border:1.5px solid rgba(255,194,75,.55);border-radius:14px;
        padding:12px 16px;font-size:13.5px;font-weight:600;color:var(--muted);display:flex;align-items:flex-start;gap:8px;}

      /* ---- trust pills (replaces the stray star row) ---- */
      .trust{display:flex;flex-wrap:wrap;gap:8px;}
      .pill{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1.5px solid var(--border);
        border-radius:9999px;padding:8px 14px;font-weight:700;font-size:13px;color:var(--muted);}
      .pill svg{color:var(--positive);}

      /* ---- progress ---- */
      .p-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
      .p-track{background:var(--border);border-radius:9999px;height:8px;overflow:hidden;}
      .p-fill{background:linear-gradient(90deg,#5B6CFF,#7C8FFF);height:100%;border-radius:9999px;transition:width .5s cubic-bezier(.34,1.56,.64,1);}

      /* ---- landing hero (2-col desktop) ---- */
      .hero{max-width:1120px;margin:0 auto;padding:32px 24px 56px;display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;}
      .hero h1{font-size:52px;line-height:1.05;font-weight:900;letter-spacing:-.02em;margin:14px 0 18px;}
      .hero p.sub{font-size:19px;line-height:1.55;color:var(--muted);font-weight:600;margin-bottom:28px;max-width:30ch;}
      .hero-visual{position:relative;display:flex;align-items:center;justify-content:center;min-height:360px;}
      .hero-stage{position:relative;width:340px;height:340px;border-radius:36px;
        background:radial-gradient(120% 120% at 30% 20%,rgba(91,108,255,.16),rgba(255,194,75,.12) 70%,transparent);
        display:flex;align-items:center;justify-content:center;}
      .float-card{position:absolute;background:#fff;border-radius:14px;box-shadow:0 8px 24px rgba(20,22,40,.12);
        border:1px solid var(--border);padding:10px 14px;font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;}
      .float-1{top:8px;left:-8px;}
      .float-2{bottom:26px;right:-14px;}
      .float-3{bottom:-6px;left:34px;color:var(--positive);}

      /* ---- step shell (2-col desktop: coach rail + content) ---- */
      .step{max-width:1120px;margin:0 auto;padding:28px 24px 56px;display:grid;grid-template-columns:300px 1fr;gap:40px;align-items:start;}
      .rail{position:sticky;top:24px;display:flex;flex-direction:column;gap:20px;}
      .rail-coach{background:linear-gradient(160deg,rgba(91,108,255,.08),rgba(255,194,75,.06));border:1px solid var(--border);
        border-radius:20px;padding:22px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;}
      .coach-tip{background:#fff;border:1px solid var(--border);border-radius:14px;padding:12px 14px;
        box-shadow:0 4px 14px rgba(20,22,40,.06);width:100%;}
      .coach-tip p{margin:5px 0 0;font-weight:700;font-size:14px;line-height:1.45;color:var(--text);}
      .content h2{font-size:32px;line-height:1.12;font-weight:900;letter-spacing:-.01em;margin:0 0 8px;}
      .content .lede{color:var(--muted);font-weight:600;font-size:16px;margin:0 0 22px;}

      .grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
      .rcf p{margin:0 0 12px;font-weight:600;line-height:1.55;}
      .rcf p:last-child{margin:0;}
      .rcf b{color:var(--primary);font-weight:800;}
      .code-soft{background:#F6F7FB;border-radius:14px;padding:16px;font-weight:600;line-height:1.6;}

      /* ---- win ---- */
      .win{max-width:1000px;margin:0 auto;padding:28px 24px 56px;}
      .win-panel{background:linear-gradient(135deg,rgba(91,108,255,.1),rgba(255,194,75,.1));border-radius:28px;padding:36px;position:relative;overflow:hidden;}
      .badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid rgba(34,197,94,.4);
        color:var(--positive);border-radius:9999px;padding:8px 16px;font-weight:800;font-size:14px;box-shadow:0 4px 14px rgba(34,197,94,.15);}
      .google-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:12px;background:#fff;border:2px solid var(--border);
        border-radius:14px;padding:14px 20px;font-weight:800;font-size:16px;color:var(--text);cursor:pointer;box-shadow:0 2px 8px rgba(20,22,40,.05);}
      .google-btn:hover{box-shadow:0 6px 18px rgba(20,22,40,.1);}
      .spark{position:absolute;pointer-events:none;}

      @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      .bob{animation:bob 3.2s ease-in-out infinite;}
      @keyframes dot{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}

      /* ---- responsive: collapse to a real single-column mobile ---- */
      @container plainly (max-width:860px){
        .hero{grid-template-columns:1fr;gap:20px;padding:20px 18px 40px;text-align:center;}
        .hero h1{font-size:34px;}
        .hero p.sub{margin-left:auto;margin-right:auto;}
        .hero .trust{justify-content:center;}
        .hero-visual{order:-1;min-height:auto;}
        .hero-stage{width:240px;height:240px;}
        .float-2{right:0;} .float-1{left:0;}
        .step{grid-template-columns:1fr;gap:18px;padding:16px 18px 40px;}
        .rail{position:static;flex-direction:row;align-items:center;gap:14px;}
        .rail-coach{flex-direction:row;text-align:left;padding:14px;gap:12px;flex:1;}
        .rail-coach .coach-tip{display:none;}
        .content h2{font-size:26px;}
        .grid2{grid-template-columns:1fr;}
        .win-panel{padding:22px;}
      }
    
      /* ===== board / device frames ===== */
      .board{max-width:1180px;margin:0 auto;padding:36px 24px 96px;}
      .cover{padding:16px 0 4px;}
      .cover-title{font-size:40px;font-weight:900;letter-spacing:-.02em;margin:16px 0 6px;color:var(--text);}
      .cover-sub{font-size:17px;font-weight:600;color:var(--muted);margin:0;}
      .sec{margin-top:54px;}
      .sec-eyebrow{font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--primary);}
      .sec-title{font-size:24px;font-weight:900;letter-spacing:-.01em;color:var(--text);margin:6px 0 18px;}
      .swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(158px,1fr));gap:14px;}
      .sw{border-radius:16px;overflow:hidden;border:1px solid #E1E4EE;background:#fff;box-shadow:0 4px 14px rgba(20,22,40,.05);}
      .sw-chip{height:70px;border-bottom:1px solid #EEF0F6;}
      .sw-meta{padding:11px 13px;}
      .sw-name{font-weight:800;font-size:14px;color:var(--text);}
      .sw-hex{font-weight:700;font-size:12.5px;color:var(--muted);margin-top:1px;}
      .sw-role{font-weight:600;font-size:11.5px;color:var(--muted);margin-top:4px;line-height:1.35;}
      .type-list{display:flex;flex-direction:column;gap:14px;background:#fff;border:1px solid #E1E4EE;border-radius:18px;padding:22px;}
      .type-row{display:flex;align-items:baseline;gap:16px;border-bottom:1px dashed #E7E9F0;padding-bottom:12px;}
      .type-row:last-child{border-bottom:none;padding-bottom:0;}
      .type-tag{flex:0 0 140px;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}
      .type-eg{color:var(--text);}
      .tokens-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px;}
      .tok{background:#fff;border:1px solid #E1E4EE;border-radius:16px;padding:18px;}
      .tok-h{font-weight:800;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;}
      .tok-cap{font-weight:700;font-size:12.5px;color:var(--muted);margin-top:10px;line-height:1.4;}
      .radius-demo{height:52px;background:rgba(91,108,255,.12);border:2px solid rgba(91,108,255,.4);}
      .shadow-demo{height:52px;background:#fff;border-radius:16px;box-shadow:0 6px 20px rgba(20,22,40,.08);}
      .brand-row{display:flex;flex-wrap:wrap;gap:34px;align-items:center;background:#fff;border:1px solid #E1E4EE;border-radius:18px;padding:26px;}
      .brand-states{display:flex;align-items:flex-end;gap:16px;}
      .bstate{display:flex;flex-direction:column;align-items:center;gap:7px;}
      .bstate span{font-weight:700;font-size:11px;color:var(--muted);}
      .comp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;}
      .comp{background:#fff;border:1px solid #E1E4EE;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:12px;}
      .comp-label{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}
      .comp-body{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}
      .comp-note{font-size:12px;font-weight:600;color:var(--muted);line-height:1.4;}
      .screen-block{margin-top:34px;}
      .screen-head{display:flex;align-items:baseline;gap:12px;margin-bottom:14px;flex-wrap:wrap;}
      .screen-num{font-weight:900;font-size:15px;color:var(--primary);}
      .screen-name{font-weight:900;font-size:18px;color:var(--text);}
      .screen-desc{font-weight:600;font-size:13.5px;color:var(--muted);}
      .frames-row{display:flex;gap:26px;flex-wrap:wrap;align-items:flex-start;}
      .device{display:flex;flex-direction:column;gap:8px;}
      .device-d{flex:1 1 100%;min-width:0;}
      .device-m{flex:0 0 auto;}
      .frame-cap{font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}
      .browser{border-radius:14px;overflow:hidden;border:1px solid #D8DCEA;box-shadow:0 14px 40px rgba(20,22,40,.12);}
      .browser-bar{height:38px;background:#E9ECF4;display:flex;align-items:center;gap:7px;padding:0 14px;border-bottom:1px solid #DCE0EC;}
      .tl-dot{width:11px;height:11px;border-radius:50%;display:inline-block;}
      .url{margin-left:12px;background:#fff;border:1px solid #DCE0EC;border-radius:8px;font-size:12px;font-weight:700;color:var(--muted);padding:4px 12px;}
      .dscroll{overflow-x:auto;background:var(--bg);}
      .dbody{min-width:900px;width:100%;}
      .phone{width:375px;background:#12142A;border-radius:40px;padding:10px;box-shadow:0 18px 50px rgba(20,22,40,.22);position:relative;}
      .phone-notch{position:absolute;top:15px;left:50%;transform:translateX(-50%);width:96px;height:7px;border-radius:99px;background:#2A2E4A;z-index:2;}
      .mbody{width:100%;border-radius:30px;overflow:hidden;}
      .frame-body{container-type:inline-size;container-name:plainly;background:var(--bg);color:var(--text);}
      .app-frame{min-height:100%;}
`}</style>
  );
}

function GrowthMark({ size = 120, lit = 4, celebrate = false }) {
  const bars = [
    { x: 15, y: 78, h: 22 },
    { x: 41, y: 62, h: 38 },
    { x: 67, y: 46, h: 54 },
    { x: 93, y: 28, h: 72 },
  ];
  // early steps read lighter, later steps stronger (like climbing)
  const litColor = ["#C7CBFF", "#9AA6FF", "#6D7BFF", "#5B6CFF"];
  const reached = lit >= 4 || celebrate;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* baseline */}
      <line x1="12" y1="102" x2="108" y2="102" stroke="#E7E9F0" strokeWidth="3" strokeLinecap="round" />
      {/* ascending steps — fill in as you progress */}
      {bars.map((b, idx) => (
        <rect key={idx} x={b.x} y={b.y} width="16" height={b.h} rx="5"
          fill={idx < lit ? litColor[idx] : "#E7E9F0"} style={{ transition: "fill .45s ease" }} />
      ))}
      {/* spark above the top step — the win (faint until reached) */}
      <g transform="translate(101 16)" opacity={reached ? 1 : 0.28} style={{ transition: "opacity .45s ease" }}>
        <path d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2 Z" fill="#FFC24B" />
      </g>
      {celebrate && (
        <g fill="#FFC24B">
          <path d="M22 42 l1.3 3.6 l3.6 1.3 l-3.6 1.3 l-1.3 3.6 l-1.3 -3.6 l-3.6 -1.3 l3.6 -1.3 Z" />
          <path d="M66 26 l1 2.8 l2.8 1 l-2.8 1 l-1 2.8 l-1 -2.8 l-2.8 -1 l2.8 -1 Z" />
        </g>
      )}
    </svg>
  );
}

/* ---- small icons ---- */
const Lock = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="4" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const Check = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const Tick = ({ s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const Google = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

/* Witty wordmark: "ai" inside Pl-AI-nly gets the highlighter treatment */
function Logo({ size = 22, tagline = false }) {
  return (
    <span className="logo">
      <svg className="logo-mark" width="36" height="36" viewBox="0 0 40 40" fill="none" aria-label="Plainly logo">
        <defs>
          <linearGradient id="lg" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C8AFF" /><stop offset="1" stopColor="#4A57E0" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#lg)" />
        {/* stepwise growth climbing to a spark */}
        <rect x="9" y="24" width="5" height="7" rx="2" fill="#fff" opacity="0.55" />
        <rect x="17" y="19" width="5" height="12" rx="2" fill="#fff" opacity="0.8" />
        <rect x="25" y="12" width="5" height="19" rx="2" fill="#fff" />
        <path d="M27.5 7.5 l0.9 2.7 l2.7 0.9 l-2.7 0.9 l-0.9 2.7 l-0.9 -2.7 l-2.7 -0.9 l2.7 -0.9 Z" fill="#FFC24B" />
      </svg>
      <span style={{ display: "inline-flex", flexDirection: "column", gap: tagline ? 3 : 0 }}>
        <span className="logo-word" style={{ fontSize: size }}>
          Pl<span className="hl"><span>ai</span></span>nly
        </span>
        {tagline && <span className="logo-tag" style={{ fontSize: size * 0.42 }}>AI, made plain</span>}
      </span>
    </span>
  );
}

const Notice = () => (
  <div className="notice" style={{ marginTop: 16 }}>
    <span style={{ color: "var(--warm)", flexShrink: 0, marginTop: 1 }}><Lock /></span>
    <span>Please don't paste confidential or personal info — this runs on a free AI tier.</span>
  </div>
);

const Progress = ({ step, total = 7 }) => {
  const pct = Math.round((step / total) * 100);
  return (
    <div>
      <div className="p-head">
        <span className="eyebrow">Step {step} of {total}</span>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>{pct}%</span>
      </div>
      <div className="p-track"><div className="p-fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
};

const Dots = () => (
  <span style={{ display: "inline-flex", gap: 4 }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: "#fff", opacity: 0.85, animation: `dot 1.2s ${i * 0.18}s ease-in-out infinite` }} />
    ))}
  </span>
);

/* Reusable desktop 2-column step shell (coach rail + content) */
function StepShell({ step, coach, children }) {
  const lit = Math.max(1, Math.min(4, Math.round((step / 7) * 4)));
  return (
    <div className="step">
      <aside className="rail">
        <div className="rail-coach">
          <GrowthMark size={94} lit={lit} />
          <div className="coach-tip">
            <span className="eyebrow" style={{ color: "var(--primary)" }}>Your guide</span>
            <p>{coach}</p>
          </div>
        </div>
        <div style={{ padding: "0 4px" }}><Progress step={step} /></div>
      </aside>
      <section className="content">{children}</section>
    </div>
  );
}

/* ============================ SCREENS ============================ */

function Landing({ onNext }) {
  return (
    <div className="hero">
      <div>
        <span className="eyebrow" style={{ color: "var(--primary)" }}>AI, made plain · no jargon</span>
        <h1>Get your first real AI win in 10 minutes.</h1>
        <p className="sub">
          Bring one real work task. We'll take you from rough idea to something you can actually use — no jargon, no signup first.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          <button className="btn" onClick={onNext}>Start my first win →</button>
        </div>
        <div className="trust">
          <span className="pill"><Tick /> No signup to start</span>
          <span className="pill"><Tick /> Free to try</span>
          <span className="pill"><Tick /> ~10 minutes</span>
        </div>
        <Notice />
      </div>

      <div className="hero-visual">
        <div className="hero-stage">
          <GrowthMark size={200} lit={4} />
          <div className="float-card float-1">✨ Better prompt</div>
          <div className="float-card float-2">📧 Ready-to-send email</div>
          <div className="float-card float-3"><Tick s={14} /> First win</div>
        </div>
      </div>
    </div>
  );
}

function TaskEntry({ onNext }) {
  const chips = ["draft a JD/email", "summarize a long report", "analyze a sheet"];
  const [task, setTask] = useState("");
  return (
    <StepShell step={1} coach="Tell me one real task. Anything you'd normally hand off.">
      <h2>What's one real thing you want AI to do for you?</h2>
      <p className="lede">Pick an example or describe your own task.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {chips.map((c) => (
          <button key={c} className="chip" onClick={() => setTask((t) => (t ? t + " " + c : c))}>{c}</button>
        ))}
      </div>
      <textarea className="note-input" rows={5} value={task} onChange={(e) => setTask(e.target.value)}
        placeholder="e.g. Draft a job posting for a marketing manager" />
      <div style={{ marginTop: 20 }}><button className="btn block" onClick={onNext}>Next →</button></div>
      <Notice />
    </StepShell>
  );
}

function WeakPrompt({ onNext }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onNext(); }, 1500); };
  return (
    <StepShell step={2} coach="Just write it the way you normally would — I'll take a look.">
      <h2>Write the prompt you'd normally type.</h2>
      <p className="lede">Don't overthink it — just write what you'd ask an AI tool.</p>
      <textarea className="note-input" rows={5} value={prompt} onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type the prompt you'd normally type into an AI tool..." />
      <div style={{ marginTop: 20 }}>
        <button className="btn block" onClick={go} disabled={loading}>
          {loading ? <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><Dots /> Diagnosing...</span> : "Diagnose it →"}
        </button>
      </div>
    </StepShell>
  );
}

function Diagnosis({ onNext }) {
  const issues = [
    "It leaves out key background details, like the full context and the important project deadline.",
    "It doesn't set rules for the email, such as keeping the tone polite and asking to reschedule.",
    "It doesn't tell the AI who you are acting as, like an account manager or team lead.",
  ];
  return (
    <StepShell step={3} coach="Good news — this is very fixable. Here's what's missing.">
      <h2>Here's why that would give you a so-so answer.</h2>
      <div className="card" style={{ padding: 24, marginBottom: 18 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {issues.map((it, i) => (
            <li key={i} style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 999, background: "rgba(255,107,107,.13)", color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{i + 1}</span>
              <span style={{ fontWeight: 600, lineHeight: 1.55 }}>{it}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border)", color: "var(--positive)", fontWeight: 700, lineHeight: 1.55 }}>
          🌱 You have a great starting point, and adding just a few details will help the AI write the perfect email for you!
        </div>
      </div>
      <button className="btn block" onClick={onNext}>Fix it for me →</button>
    </StepShell>
  );
}

function Rebuild({ onNext }) {
  const [loading, setLoading] = useState(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onNext(); }, 1600); };
  return (
    <StepShell step={4} coach="Same request — now with a clear role, context, format and limits.">
      <h2>Now here's the same ask, done properly.</h2>
      <div className="grid2" style={{ marginBottom: 18 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ color: "var(--danger)", marginBottom: 12 }}>Before</div>
          <div className="code-soft">write an email to a client who missed a call</div>
        </div>
        <div className="card" style={{ padding: 20, borderColor: "rgba(91,108,255,.4)" }}>
          <div className="eyebrow" style={{ color: "var(--primary)", marginBottom: 12 }}>After</div>
          <div className="code-soft rcf" style={{ background: "rgba(91,108,255,.05)" }}>
            <p><b>Role:</b> You are an experienced, professional account manager.</p>
            <p><b>Context:</b> My client missed our scheduled project deadline call today and hasn't responded.</p>
            <p><b>Format:</b> Draft a short email with a clear Subject line and Body, using bracketed placeholders for names and dates.</p>
            <p><b>Constraints:</b> Keep a warm, supportive, professional tone. End by suggesting clear next steps.</p>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 20, marginBottom: 18, background: "rgba(91,108,255,.05)", borderColor: "rgba(91,108,255,.25)" }}>
        <p style={{ margin: 0, fontWeight: 700, lineHeight: 1.55 }}>
          <span style={{ color: "var(--primary)" }}>The reusable pattern:</span> The Role-Context-Format-Constraints framework gives the AI a clear identity, background, expected layout, and boundaries — so you get a useful first draft.
        </p>
      </div>
      <button className="btn block" onClick={go} disabled={loading}>
        {loading ? <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><Dots /> Rewriting...</span> : "Run it →"}
      </button>
    </StepShell>
  );
}

function RunOutput({ onNext }) {
  const [loading, setLoading] = useState(false);
  const go = () => { setLoading(true); setTimeout(() => { setLoading(false); onNext(); }, 1300); };
  return (
    <StepShell step={5} coach="Here's the real output from your improved prompt.">
      <h2>Let's run it and see the real result.</h2>
      <div className="card" style={{ padding: 24, marginBottom: 18 }}>
        <div className="eyebrow" style={{ color: "var(--positive)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--positive)", display: "inline-block" }} /> AI Output
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, fontWeight: 600, lineHeight: 1.6 }}>
          <p style={{ margin: 0, fontWeight: 800 }}>Subject: Following Up on Our Missed Call — Let's Reconnect</p>
          <p style={{ margin: 0 }}>Hi [Client Name],</p>
          <p style={{ margin: 0 }}>I hope you're doing well! I wanted to follow up after we missed each other on today's call. I understand things get busy, and I completely appreciate that.</p>
          <p style={{ margin: 0 }}>I'd love to reconnect at your convenience to discuss [Project Name] and ensure everything is on track. A quick 20-minute call would be perfect.</p>
          <p style={{ margin: 0, fontWeight: 700 }}>Here are two options that work for me:</p>
          <ol style={{ margin: 0, paddingLeft: 22 }}>
            <li>[Date/Time Option 1] — [Duration]</li>
            <li>[Date/Time Option 2] — [Duration]</li>
          </ol>
          <p style={{ margin: 0 }}>Please let me know which works best for you, or feel free to suggest another time.</p>
          <p style={{ margin: 0, fontWeight: 700 }}>Warm regards,<br />[Your Name]<br />[Your Title] | [Company Name]</p>
        </div>
      </div>
      <button className="btn block" onClick={go} disabled={loading}>
        {loading ? <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><Dots /> Running...</span> : "Continue →"}
      </button>
    </StepShell>
  );
}

function InlineCheck({ onNext }) {
  const opts = ["It added a role and context", "It gave a clear format", "All of it"];
  const [sel, setSel] = useState(null);
  return (
    <StepShell step={6} coach="One quick check to lock it in — no wrong answers.">
      <h2>Quick check — what made the second one better?</h2>
      <p className="lede">Choose the answer that feels most right to you.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
        {opts.map((o, i) => (
          <button key={i} className={`option ${sel === i ? "selected" : ""}`} onClick={() => setSel(i)}>
            <span className="radio">{sel === i && <Check />}</span>{o}
          </button>
        ))}
      </div>
      <button className="btn block" onClick={onNext} disabled={sel === null}>See the win →</button>
    </StepShell>
  );
}

function Win() {
  return (
    <div className="win">
      <div className="win-panel">
        <span className="spark" style={{ top: 18, left: 30, fontSize: 22 }}>✨</span>
        <span className="spark" style={{ top: 40, right: 44, fontSize: 16 }}>🎉</span>
        <span className="spark" style={{ bottom: 30, left: 60, fontSize: 18 }}>⭐</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block" }}><GrowthMark size={132} lit={4} celebrate /></div>
          <div style={{ marginTop: 6, marginBottom: 12 }}>
            <span className="badge"><Tick s={15} /> First win unlocked</span>
          </div>
          <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-.01em", margin: "0 0 8px" }}>You just did it. Look at the difference.</h2>
          <p style={{ color: "var(--muted)", fontWeight: 700, margin: "0 0 24px" }}>From a rough idea to something you can actually use.</p>
        </div>

        <div className="grid2" style={{ marginBottom: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="eyebrow" style={{ color: "var(--danger)", marginBottom: 12 }}>This</div>
            <div className="code-soft" style={{ color: "var(--muted)", fontSize: 14 }}>write an email to a client who missed a call</div>
          </div>
          <div className="card" style={{ padding: 20, borderColor: "rgba(91,108,255,.4)" }}>
            <div className="eyebrow" style={{ color: "var(--primary)", marginBottom: 12 }}>Became this</div>
            <div className="code-soft" style={{ background: "rgba(91,108,255,.05)", fontSize: 14 }}>
              <p style={{ margin: "0 0 4px", fontWeight: 800 }}>
                <span style={{ color: "var(--primary)" }}>Role</span> + <span style={{ color: "var(--primary)" }}>Context</span> + <span style={{ color: "var(--primary)" }}>Format</span> + <span style={{ color: "var(--primary)" }}>Constraints</span>
              </p>
              <p style={{ margin: 0, color: "var(--muted)", fontWeight: 600, fontSize: 12.5 }}>→ A structured, professional email you can send today</p>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontWeight: 700, fontSize: 17, lineHeight: 1.55, margin: "0 0 24px" }}>
          You just went from a rough idea to something you can actually use. That's your first real AI win. 🎉
        </p>

        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <button className="google-btn"><Google /> Save my progress with Google</button>
          <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--muted)", fontWeight: 600, marginTop: 12 }}>
            Your progress is saved privately to your account.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================ APP SHELL ============================ */

/* ============================ BOARD ============================ */

const SCREENS = [Landing, TaskEntry, WeakPrompt, Diagnosis, Rebuild, RunOutput, InlineCheck, Win];

const SCREEN_META = [
  { name: "Landing", desc: "Hero, value prop, one CTA" },
  { name: "Task entry", desc: "Step 1 · pick or describe a task" },
  { name: "Weak prompt", desc: "Step 2 · write it as you would" },
  { name: "Diagnosis", desc: "Step 3 · what's missing, kindly" },
  { name: "Rebuild", desc: "Step 4 · before / after (R-C-F-C)" },
  { name: "Live output", desc: "Step 5 · the real AI result" },
  { name: "Quick check", desc: "Step 6 · lock in the learning" },
  { name: "Win", desc: "Step 7 · celebrate + save" },
];

const COLORS = [
  { name: "Primary", hex: "#5B6CFF", role: "Actions, links, focus" },
  { name: "Primary edge", hex: "#3B49CC", role: "Pressable button underside" },
  { name: "Positive", hex: "#22C55E", role: "Encouragement, success" },
  { name: "Warm", hex: "#FFC24B", role: "Highlight, chips, spark" },
  { name: "Danger", hex: "#FF6B6B", role: "Before / weak state" },
  { name: "Text", hex: "#1A1D2E", role: "Headings, body" },
  { name: "Muted", hex: "#6B7080", role: "Secondary text" },
  { name: "Border", hex: "#E7E9F0", role: "Dividers, outlines" },
  { name: "Surface", hex: "#FFFFFF", role: "Cards, inputs" },
  { name: "Background", hex: "#F6F7FB", role: "App canvas" },
];

function Swatch({ c }) {
  return (
    <div className="sw">
      <div className="sw-chip" style={{ background: c.hex }} />
      <div className="sw-meta">
        <div className="sw-name">{c.name}</div>
        <div className="sw-hex">{c.hex}</div>
        <div className="sw-role">{c.role}</div>
      </div>
    </div>
  );
}

function FrameApp({ screen }) {
  const S = SCREENS[screen];
  const noop = () => {};
  return (
    <div className="app-frame">
      <header className="topbar">
        <Logo size={18} />
        {screen > 0 && screen < 7 && <span className="link-btn">&larr; Start over</span>}
      </header>
      <main><S onNext={noop} /></main>
    </div>
  );
}

function DesktopFrame({ screen }) {
  return (
    <div className="device device-d">
      <div className="browser">
        <div className="browser-bar">
          <span className="tl-dot" style={{ background: "#FF6B6B" }} />
          <span className="tl-dot" style={{ background: "#FFC24B" }} />
          <span className="tl-dot" style={{ background: "#22C55E" }} />
          <span className="url">plainly.app</span>
        </div>
        <div className="dscroll"><div className="frame-body dbody"><FrameApp screen={screen} /></div></div>
      </div>
      <span className="frame-cap">Desktop</span>
    </div>
  );
}

function MobileFrame({ screen }) {
  return (
    <div className="device device-m">
      <div className="phone">
        <span className="phone-notch" />
        <div className="frame-body mbody"><FrameApp screen={screen} /></div>
      </div>
      <span className="frame-cap">Mobile &middot; 375</span>
    </div>
  );
}

function Comp({ label, note, children }) {
  return (
    <div className="comp">
      <div className="comp-label">{label}</div>
      <div className="comp-body">{children}</div>
      {note && <div className="comp-note">{note}</div>}
    </div>
  );
}

export default function DesignSystem() {
  return (
    <div className="plainly">
      <Styles />
      <div className="board">

        {/* cover */}
        <div className="cover">
          <Logo size={30} tagline />
          <h1 className="cover-title">Design System &amp; Screens</h1>
          <p className="cover-sub">Tokens, components, and all 8 screens &mdash; mobile and desktop.</p>
        </div>

        {/* 01 Foundations */}
        <section className="sec">
          <div className="sec-eyebrow">01 &middot; Foundations</div>
          <h2 className="sec-title">Color</h2>
          <div className="swatches">{COLORS.map((c) => <Swatch key={c.name} c={c} />)}</div>

          <h2 className="sec-title" style={{ marginTop: 34 }}>Typography &mdash; Nunito</h2>
          <div className="type-list">
            <div className="type-row"><span className="type-tag">Display / 52 / 900</span><span className="type-eg" style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-.02em" }}>Get your first AI win</span></div>
            <div className="type-row"><span className="type-tag">Heading / 32 / 900</span><span className="type-eg" style={{ fontSize: 28, fontWeight: 900 }}>Now, done properly.</span></div>
            <div className="type-row"><span className="type-tag">Lead / 19 / 600</span><span className="type-eg" style={{ fontSize: 19, fontWeight: 600, color: "var(--muted)" }}>Bring one real work task.</span></div>
            <div className="type-row"><span className="type-tag">Body / 16 / 600&ndash;700</span><span className="type-eg" style={{ fontSize: 16, fontWeight: 600 }}>A structured email you can send today.</span></div>
            <div className="type-row"><span className="type-tag">Eyebrow / 11 / 800</span><span className="type-eg eyebrow">AI, made plain</span></div>
          </div>

          <h2 className="sec-title" style={{ marginTop: 34 }}>Radius, elevation, spacing</h2>
          <div className="tokens-grid">
            <div className="tok"><div className="tok-h">Radius</div><div className="radius-demo" style={{ borderRadius: 20 }} /><div className="tok-cap">Cards 20 &middot; inputs 14 &middot; buttons pill</div></div>
            <div className="tok"><div className="tok-h">Elevation</div><div className="shadow-demo" /><div className="tok-cap">Soft: 0 6px 20px rgba(20,22,40,.08)</div></div>
            <div className="tok"><div className="tok-h">Spacing (4pt)</div>
              {[8,16,24,32].map((w) => <div key={w} style={{ background: "var(--primary)", height: 10, borderRadius: 5, width: w * 4, marginBottom: 8, opacity: .85 }} />)}
              <div className="tok-cap">8 / 16 / 24 / 32 / 40</div>
            </div>
          </div>

          <h2 className="sec-title" style={{ marginTop: 34 }}>Brand mark and logo</h2>
          <div className="brand-row">
            <div className="brand-states">
              {[1,2,3,4].map((n) => (
                <div className="bstate" key={n}><GrowthMark size={70} lit={n} /><span>{"lit " + n}</span></div>
              ))}
              <div className="bstate"><GrowthMark size={70} lit={4} celebrate /><span>win</span></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Logo size={30} tagline />
              <Logo size={22} />
            </div>
          </div>
        </section>

        {/* 02 Components */}
        <section className="sec">
          <div className="sec-eyebrow">02 &middot; Components</div>
          <h2 className="sec-title">Library</h2>
          <div className="comp-grid">
            <Comp label="Primary button" note="Pressable: 4px bottom edge, presses down on tap.">
              <button className="btn">Start my first win</button>
            </Comp>
            <Comp label="Secondary / ghost">
              <button className="btn-ghost">Maybe later</button>
            </Comp>
            <Comp label="Disabled">
              <button className="btn" disabled>Diagnosing&hellip;</button>
            </Comp>
            <Comp label="Example chips">
              <span className="chip">draft a JD/email</span>
              <span className="chip">summarize a report</span>
            </Comp>
            <Comp label="Note-card input">
              <textarea className="note-input" rows={2} defaultValue="" placeholder="e.g. Draft a job posting&hellip;" />
            </Comp>
            <Comp label="Option &mdash; default / selected">
              <button className="option"><span className="radio" />It gave a clear format</button>
              <button className="option selected"><span className="radio"><Check /></span>All of it</button>
            </Comp>
            <Comp label="Progress">
              <div style={{ width: "100%" }}><Progress step={3} /></div>
            </Comp>
            <Comp label="Trust pills">
              <span className="pill"><Tick /> No signup</span>
              <span className="pill"><Tick /> Free</span>
            </Comp>
            <Comp label="Confidential notice">
              <Notice />
            </Comp>
            <Comp label="Win badge">
              <span className="badge"><Tick s={15} /> First win unlocked</span>
            </Comp>
            <Comp label="Sign-in button">
              <button className="google-btn"><Google /> Save my progress with Google</button>
            </Comp>
          </div>
        </section>

        {/* 03 Screens */}
        <section className="sec">
          <div className="sec-eyebrow">03 &middot; Screens</div>
          <h2 className="sec-title">All 8 &mdash; responsive</h2>
          {SCREEN_META.map((m, i) => (
            <div className="screen-block" key={i}>
              <div className="screen-head">
                <span className="screen-num">{String(i).padStart(2, "0")}</span>
                <span className="screen-name">{m.name}</span>
                <span className="screen-desc">{m.desc}</span>
              </div>
              <div className="frames-row">
                <DesktopFrame screen={i} />
                <MobileFrame screen={i} />
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
