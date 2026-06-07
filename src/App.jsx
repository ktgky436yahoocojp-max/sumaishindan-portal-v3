import { useState } from "react";

const LINE_URL = "https://line.me/R/ti/p/@148cciyn";
const LINE_URL_KEKKA = LINE_URL + "?oatext=" + encodeURIComponent("解説");
const LINE_URL_DAIKO = LINE_URL;

// ============================================================
// 共通ユーティリティ
// ============================================================
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800&family=Yomogi&display=swap');* { box-sizing:border-box; margin:0; padding:0; }`;

function ProgressBar({ cur, total, grad }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, width:"100%", maxWidth:540 }}>
      <div style={{ flex:1, height:8, background:"#e5e7eb", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(cur/total)*100}%`, background:grad, borderRadius:99, transition:"width 0.4s" }} />
      </div>
      <span style={{ fontSize:13, color:"#6b7280", whiteSpace:"nowrap", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{cur} / {total}</span>
    </div>
  );
}

function ScoreBar({ pct }) {
  const color = pct>=75?"#4ade80":pct>=50?"#facc15":pct>=25?"#fb923c":"#f87171";
  return <div style={{ height:10, background:"#e5e7eb", borderRadius:99, overflow:"hidden", marginTop:6 }}><div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:99, transition:"width 0.8s" }} /></div>;
}

function getLineType(score, totalMax) {
  const pct = totalMax > 0 ? (score / totalMax) * 100 : 0;
  if (pct >= 75) return "Aタイプ";
  if (pct >= 50) return "Bタイプ";
  if (pct >= 25) return "Cタイプ";
  return "Dタイプ";
}


function getRiskType(weakPoints) {
  if (!weakPoints || weakPoints.length === 0) {
    return { emoji:"🌱", name:"安心維持型" };
  }
  const top = weakPoints[0]?.name || "";

  if (top.includes("災害") || top.includes("浸水") || top.includes("避難")) {
    return { emoji:"🌊", name:"災害脆弱型" };
  }
  if (top.includes("建物") || top.includes("屋根") || top.includes("外壁")) {
    return { emoji:"🏚️", name:"老朽化リスク型" };
  }
  if (top.includes("家計") || top.includes("資金")) {
    return { emoji:"💰", name:"維持費圧迫型" };
  }
  if (top.includes("人口") || top.includes("地域")) {
    return { emoji:"📉", name:"人口減少リスク型" };
  }
  return { emoji:"🛣️", name:"インフラ依存型" };
}

function LineBanner({ score, totalMax }) {
  const lineType = getLineType(score, totalMax);
  const url = LINE_URL + "?oatext=" + encodeURIComponent(lineType);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ display:"block", width:"100%", maxWidth:540,
        background:"linear-gradient(135deg,#06c755,#00a040)",
        border:"2px solid #04a844", boxShadow:"4px 6px 0px #027a30",
        borderRadius:20, padding:"20px 22px", marginBottom:20,
        textDecoration:"none" }}>

      {/* タイトル行 */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <span style={{ fontSize:24 }}>📮</span>
        <div>
          <div style={{ fontSize:11, color:"#d1fae5", fontWeight:700,
            fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>あなた専用</div>
          <div style={{ fontSize:17, fontWeight:800, color:"#fff",
            fontFamily:"'M PLUS Rounded 1c',sans-serif", lineHeight:1.3 }}>
            2046年の未来診断書を無料で受け取る
          </div>
        </div>
      </div>

      {/* チェックリスト */}
      <div style={{ background:"rgba(0,0,0,0.15)", borderRadius:12,
        padding:"10px 14px", marginBottom:14 }}>
        {["なぜこの結果になったのか","20年後の危険箇所","今やるべき改善策"].map((t,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6,
            fontSize:13, color:"#fff", fontFamily:"'M PLUS Rounded 1c',sans-serif",
            fontWeight:700, marginBottom: i<2 ? 6 : 0 }}>
            <span style={{ color:"#fef08a" }}>✓</span> {t}
          </div>
        ))}
      </div>

      {/* CTAボタン風 */}
      <div style={{ background:"#fff", borderRadius:12, padding:"12px",
        textAlign:"center" }}>
        <div style={{ fontSize:15, fontWeight:800, color:"#06c755",
          fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>
          🆓 LINEで無料配布中
        </div>
        <div style={{ fontSize:11, color:"#9ca3af", marginTop:2,
          fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>
          お友だち追加だけ・料金一切なし
        </div>
      </div>
    </a>
  );
}

function DaikoCTA() {
  return (
    <div style={{ width:"100%", maxWidth:540, background:"linear-gradient(135deg,#1f2937,#374151)", border:"2.5px solid #4b5563", boxShadow:"4px 6px 0px #111827", borderRadius:24, padding:"28px 24px", marginBottom:20 }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:36, marginBottom:8 }}>🔎</div>
        <h3 style={{ fontFamily:"'Yomogi',cursive", fontSize:19, color:"#fff", marginBottom:8 }}>自分で調べるのが面倒なら…</h3>
        <p style={{ fontSize:13, color:"#d1d5db", lineHeight:1.7 }}>書類確認・現地確認・詳細レポートまで<br/><b style={{ color:"#fbbf24" }}>マンション管理士が代わりに診断</b>します。</p>
      </div>
      <a href={LINE_URL_DAIKO} target="_blank" rel="noopener noreferrer" style={{ display:"block", width:"100%", padding:"15px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", color:"#fff", borderRadius:14, border:"none", fontSize:16, fontWeight:800, fontFamily:"'M PLUS Rounded 1c',sans-serif", boxShadow:"0 3px 0 #92400e", cursor:"pointer", textDecoration:"none", textAlign:"center" }}>📩 プロ代行診断に申し込む</a>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12, background:"#f3f4f6", borderRadius:10, padding:"9px 14px" }}>
        <span style={{ fontSize:16 }}>💬</span>
        <span style={{ fontSize:13, color:"#374151", fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>追加後に <span style={{ background:"#fef9c3", padding:"1px 6px", borderRadius:4 }}>「代行」</span> と送ってください</span>
      </div>
    </div>
  );
}

// ============================================================
// 汎用診断エンジン
// ============================================================
function DiagnosticApp({ config, onBack, onSelect }) {
  const { questions, accent, accentDark, accentBg, accentBorder, grad, wrapBg, titleEmoji, title, subtitle, categoryList } = config;
  const TOTAL_MAX = questions.reduce((acc,q) => acc + Math.max(...q.options.map(o=>o.score)), 0);
  const CATEGORIES = [...new Set(questions.map(q=>q.category))];

  const [screen, setScreen] = useState("top");
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flash, setFlash] = useState(null);
  const [hint, setHint] = useState(false);

  const q = questions[cur];
  const totalScore = Object.values(answers).reduce((a,b)=>a+b, 0);
  const risk = config.getRisk(totalScore, TOTAL_MAX);

  function handleSelect(idx, score) {
    if (flash !== null) return;
    setFlash(idx);
    setTimeout(() => {
      const newAns = { ...answers, [q.id]: score };
      setAnswers(newAns);
      setFlash(null);
      setHint(false);
      if (cur + 1 < questions.length) setCur(cur + 1);
      else setScreen("result");
    }, 380);
  }

  function restart() { setScreen("top"); setCur(0); setAnswers({}); setFlash(null); setHint(false); }

  const wrap = { minHeight:"100vh", background:wrapBg, fontFamily:"'M PLUS Rounded 1c',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 16px 60px" };
  const card = { width:"100%", maxWidth:540, background:"#fff", borderRadius:24, border:`2.5px solid ${accentBorder}`, boxShadow:`4px 6px 0px ${accentBorder}`, padding:"28px 24px" };

  if (screen === "top") return (
    <div style={wrap}>
      <div style={{ width:"100%", maxWidth:540 }}>
        <button onClick={()=>{ onBack(); window.scrollTo({top:0,behavior:"smooth"}); }} style={{ background:"none", border:"none", color:accent, fontSize:13, fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:"pointer", marginBottom:16 }}>← 診断一覧に戻る</button>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:52, marginBottom:8 }}>{titleEmoji}</div>
          <h1 style={{ fontFamily:"'Yomogi',cursive", fontSize:26, color:accent, lineHeight:1.4, marginBottom:8 }}>{title}</h1>
          <p style={{ fontSize:14, color:"#9ca3af", lineHeight:1.7 }}>{subtitle}</p>
        </div>
        <div style={card}>
          <button onClick={()=>setScreen("quiz")} style={{ width:"100%", padding:"16px", background:grad, color:"#fff", borderRadius:16, border:"none", fontSize:17, fontWeight:800, fontFamily:"'M PLUS Rounded 1c',sans-serif", boxShadow:`0 4px 0 ${accentDark}`, cursor:"pointer", marginBottom:20, display:"block" }}>🚀 診断スタート</button>
          <div style={{ background:accentBg, borderRadius:12, padding:"12px 14px", marginBottom:16, fontSize:13, color:accentDark, lineHeight:1.7 }}>💡 所要時間は約<b>5〜8分</b>。タップするだけで自動で次へ進みます！</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {categoryList.map(([em,lb,ct])=>(
              <div key={lb} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:accentBg, borderRadius:12, border:`1.5px dashed ${accentBorder}`, padding:"9px 14px" }}>
                <span style={{ fontSize:13, color:"#374151" }}>{em} {lb}</span>
                <span style={{ fontSize:12, color:accent, fontWeight:700 }}>{ct}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign:"center", fontSize:12, color:"#d1d5db", marginTop:20 }}>※ この診断は簡易的な目安です。正確な診断は専門家にご相談ください。</p>
      </div>
    </div>
  );

  if (screen === "quiz") return (
    <div style={wrap}>
      <ProgressBar cur={cur+1} total={questions.length} grad={grad} />
      <div style={card}>
        <button onClick={()=>{ onBack(); window.scrollTo({top:0,behavior:"smooth"}); }} style={{ background:"none", border:"none", color:"#9ca3af", fontSize:12, fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:"pointer", marginBottom:12 }}>← 一覧に戻る</button>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:accentBg, border:`2px dashed ${accentBorder}`, borderRadius:20, padding:"4px 14px", fontSize:13, color:accent, fontWeight:700, marginBottom:16 }}>{q.emoji} {q.category}</div>
        <p style={{ fontSize:17, fontWeight:700, color:"#1f2937", lineHeight:1.6, marginBottom:20 }}>Q{q.id}. {q.text}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
          {q.options.map((opt,i)=>{ const isFlash=flash===i; return (
            <button key={i} onClick={()=>handleSelect(i,opt.score)} disabled={flash!==null}
              style={{ width:"100%", padding:"13px 16px", background:isFlash?accentBg:"#f9fafb", border:isFlash?`2.5px solid ${accent}`:"2px solid #e5e7eb", borderRadius:12, textAlign:"left", fontSize:14, color:isFlash?accent:"#374151", fontWeight:isFlash?700:400, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:flash!==null?"default":"pointer", transition:"all 0.15s", display:"flex", alignItems:"center", gap:10, transform:isFlash?"scale(0.98)":"scale(1)" }}>
              <span style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, border:isFlash?`2.5px solid ${accent}`:"2px solid #d1d5db", background:isFlash?accent:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {isFlash&&<span style={{ width:8, height:8, background:"#fff", borderRadius:"50%", display:"block" }}/>}
              </span>
              {opt.label}
            </button>
          );})}
        </div>
        <div>
          <button onClick={()=>setHint(!hint)} style={{ background:"none", border:"none", color:accent, fontSize:13, fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:"pointer" }}>{hint?"▲ ヒントを閉じる":"💡 ヒントを見る"}</button>
          {hint&&<div style={{ marginTop:8, background:accentBg, border:`1.5px dashed ${accentBorder}`, borderRadius:10, padding:"10px 12px", fontSize:13, color:accentDark, lineHeight:1.7 }}>{q.hint}</div>}
        </div>
      </div>
    </div>
  );

  // RESULT
  const getCatScore = (cat) => {
    const qs = questions.filter(q=>q.category===cat);
    const earned = qs.reduce((a,q)=>a+(answers[q.id]??0), 0);
    const max = qs.reduce((a,q)=>a+Math.max(...q.options.map(o=>o.score)), 0);
    return { earned, max, pct: Math.round((earned/max)*100) };
  };

  // 弱点TOP3：スコアの低い問いを特定
  const riskType = getRiskType(weakPoints);

  const weakPoints = questions
    .map(q => ({ q, score: answers[q.id]??0, max: Math.max(...q.options.map(o=>o.score)) }))
    .filter(item => item.score < item.max)
    .sort((a,b) => (a.score/a.max) - (b.score/b.max))
    .slice(0,3);

  // カテゴリコメント取得
  const getCatComment = (cat, pct) => {
    if (!config.categoryComments) return null;
    const c = config.categoryComments[cat];
    if (!c) return null;
    if (pct >= 70) return c.high;
    if (pct >= 40) return c.middle;
    return c.low;
  };

  return (
    <div style={wrap}>
      <div style={{ width:"100%", maxWidth:540 }}>

        {/* 総合スコア */}
        <div style={{ width:"100%", maxWidth:540, background:risk.bg, border:`2.5px solid ${risk.border}`, boxShadow:`4px 6px 0px ${risk.border}`, borderRadius:24, padding:"28px 24px", textAlign:"center", marginBottom:20 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>{risk.emoji}</div>

          {/* リスク型 */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"'M PLUS Rounded 1c',sans-serif", marginBottom:4 }}>あなたのタイプ</div>
            <div style={{ fontSize:38, fontWeight:900, fontFamily:"'Yomogi',cursive", lineHeight:1.1 }}>
              {riskType.emoji} {riskType.name}
            </div>
          </div>

          {/* 住まい年齢 */}
          <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:16, padding:"10px 20px", marginBottom:10, display:"inline-block" }}>
            <div style={{ fontSize:11, color:"#6b7280", fontFamily:"'M PLUS Rounded 1c',sans-serif", marginBottom:2 }}>🏠 住まい年齢</div>
            <div style={{ fontSize:36, fontWeight:800, color:risk.color, fontFamily:"'Yomogi',cursive", lineHeight:1 }}>
              {calcSumaiAge(totalScore, TOTAL_MAX)}<span style={{ fontSize:18 }}>歳</span>
            </div>
          </div>

          {/* 診断ランク */}
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"'M PLUS Rounded 1c',sans-serif", marginBottom:4 }}>診断ランク</div>
            <div style={{ fontSize:42, fontWeight:900, color:risk.color, fontFamily:"'Yomogi',cursive", lineHeight:1 }}>
              {getLineType(totalScore, TOTAL_MAX)}
            </div>
          </div>

          {/* 総合評価ラベル */}
          <div style={{ fontSize:18, fontWeight:800, color:risk.color, fontFamily:"'Yomogi',cursive", marginBottom:6 }}>{risk.label}</div>

          <div style={{ fontSize:13, color:"#6b7280", marginBottom:8, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{totalScore} / {TOTAL_MAX}点</div>
          <p style={{ fontSize:14, color:"#374151", lineHeight:1.7 }}>{risk.desc}</p>
        </div>

        {/* LINE未来診断書CTA */}
        <LineBanner score={totalScore} totalMax={TOTAL_MAX} />

        {/* 弱点TOP3 */}
        {weakPoints.length > 0 && (
          <div style={{ ...card, marginBottom:20, border:"2.5px solid #fcd34d", boxShadow:"4px 6px 0px #fcd34d", background:"#fefce8" }}>
            <h3 style={{ fontFamily:"'Yomogi',cursive", fontSize:17, color:"#92400e", marginBottom:14 }}>⚠️ 優先確認事項</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {weakPoints.map((item,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fff", borderRadius:12, padding:"10px 14px", border:"1.5px solid #fde68a" }}>
                  <span style={{ fontSize:15, fontWeight:800, color:"#d97706", minWidth:22, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{"①②③"[i]}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#1f2937", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{item.q.text}</div>
                    <div style={{ fontSize:11, color:"#9ca3af", marginTop:2, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{item.q.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* カテゴリ別スコア＋コメント */}
        <div style={{ ...card, marginBottom:20 }}>
          <h3 style={{ fontFamily:"'Yomogi',cursive", fontSize:18, color:accent, marginBottom:16 }}>📊 カテゴリ別の結果</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {CATEGORIES.map(cat=>{
              const {earned,max,pct}=getCatScore(cat);
              const q0=questions.find(q=>q.category===cat);
              const comment=getCatComment(cat,pct);
              const barColor = pct>=70?accent:pct>=40?"#f97316":"#ef4444";
              return (
                <div key={cat}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:13, color:"#374151", fontWeight:700 }}>{q0?.emoji} {cat}</span>
                    <span style={{ fontSize:13, color:"#6b7280" }}>{earned}/{max}点</span>
                  </div>
                  <ScoreBar pct={pct}/>
                  {comment && (
                    <div style={{ marginTop:8, fontSize:12, color: pct>=70?"#15803d":pct>=40?"#92400e":"#dc2626", background: pct>=70?"#f0fdf4":pct>=40?"#fefce8":"#fef2f2", borderRadius:8, padding:"7px 10px", lineHeight:1.6, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>
                      {pct>=70?"✅ ":pct>=40?"💡 ":"⚠️ "}{comment}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 次のおすすめ診断 */}
        {config.nextApps && (
          <div style={{ ...card, marginBottom:20, background:"#f8fafc", border:"2.5px solid #e2e8f0", boxShadow:"4px 6px 0px #e2e8f0" }}>
            <h3 style={{ fontFamily:"'Yomogi',cursive", fontSize:17, color:"#374151", marginBottom:14 }}>🎯 あなたにおすすめの次の診断</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {config.nextApps.map(app=>{
                const meta = PORTAL_APPS.find(p=>p.id===app.id);
                return (
                  <button key={app.id} onClick={()=>{ onSelect(app.id); window.scrollTo({top:0,behavior:"smooth"}); }}
                    style={{ display:"flex", alignItems:"center", gap:12, background:"#fff", border:`2px solid ${meta?.border||"#e5e7eb"}`, borderRadius:14, padding:"12px 14px", cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:24 }}>{app.emoji}</span>
                    <span style={{ fontSize:14, fontWeight:700, color:"#374151", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>{app.label}</span>
                    <span style={{ marginLeft:"auto", fontSize:16, color:meta?.color||"#9ca3af" }}>›</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <DaikoCTA />
        <button onClick={restart} style={{ width:"100%", maxWidth:540, padding:"12px", background:"#fff", color:accent, borderRadius:14, border:`2px solid ${accentBorder}`, fontSize:14, fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:"pointer", marginBottom:12 }}>🔄 もう一度診断する</button>
        <button onClick={()=>{ onBack(); window.scrollTo({top:0,behavior:"smooth"}); }} style={{ width:"100%", maxWidth:540, padding:"12px", background:"#fff", color:"#6b7280", borderRadius:14, border:"2px solid #e5e7eb", fontSize:14, fontWeight:700, fontFamily:"'M PLUS Rounded 1c',sans-serif", cursor:"pointer" }}>← 診断一覧に戻る</button>
      </div>
    </div>
  );
}

// ============================================================
// 住まい年齢計算
// ============================================================
function calcSumaiAge(score, totalMax) {
  const pct = totalMax > 0 ? score / totalMax : 0;
  return Math.round(85 - pct * 65);
}

// ============================================================
// 共通リスク判定
// ============================================================
function defaultRisk(score, TOTAL_MAX, labels) {
  const pct = (score / TOTAL_MAX) * 100;
  const levels = [
    { min:75, label:labels[0]||"安心レベル", color:"#16a34a", bg:"#f0fdf4", border:"#86efac", emoji:"🟢", desc:"現時点では大きなリスクは見当たりません。引き続き定期メンテナンスを続けましょう。" },
    { min:50, label:labels[1]||"注意レベル", color:"#d97706", bg:"#fefce8", border:"#fcd34d", emoji:"🟡", desc:"いくつか気になる点があります。専門家による確認をおすすめします。" },
    { min:25, label:labels[2]||"要対策レベル", color:"#ea580c", bg:"#fff7ed", border:"#fdba74", emoji:"🟠", desc:"複数のリスク要因があります。早めに点検・対策を検討してください。" },
    { min:0,  label:labels[3]||"要緊急対応",  color:"#dc2626", bg:"#fef2f2", border:"#fca5a5", emoji:"🔴", desc:"深刻なリスクの可能性があります。専門家による診断を早急に受けることをおすすめします。" },
  ];
  return levels.find(l => pct >= l.min);
}

// ============================================================
// 各診断データ
// ============================================================
const CONFIGS = {
  taishin: {
    titleEmoji:"🏠", title:"戸建て\n耐震・構造リスク診断", subtitle:"15の質問で建物の\n耐震・構造リスクがわかります",
    accent:"#ef4444", accentDark:"#b91c1c", accentBg:"#fef2f2", accentBorder:"#fca5a5",
    grad:"linear-gradient(135deg,#ef4444,#f97316)", wrapBg:"linear-gradient(160deg,#fff5f5 0%,#fff9f3 100%)",
    categoryList:[["📅","建築年・耐震基準","3問"],["🪨","基礎・地盤","3問"],["🔍","外観・構造の状態","4問"],["🏚️","屋根・上部構造","2問"],["📁","維持管理・記録","3問"]],
    categoryComments:{
      "建築年・耐震基準":{high:"耐震基準は現行に適合しています。安心できる状態です。",middle:"耐震性に一部不安があります。耐震診断の実施を検討しましょう。",low:"旧耐震基準の可能性があります。耐震診断・改修を早急に検討してください。"},
      "基礎・地盤":{high:"基礎・地盤のリスクは低い状態です。",middle:"地盤や基礎に確認が必要な点があります。床下点検をおすすめします。",low:"基礎・地盤に深刻なリスクがある可能性があります。専門家の診断を受けてください。"},
      "外観・構造の状態":{high:"外観・構造の状態は良好です。引き続き定期点検を続けましょう。",middle:"外壁や開口部に気になる点があります。専門家による点検をおすすめします。",low:"構造上の問題のサインが見られます。早急な専門家診断が必要です。"},
      "屋根・上部構造":{high:"屋根の形状・重さは地震リスクが低い状態です。",middle:"屋根の仕様に一部懸念点があります。定期的な点検を続けましょう。",low:"重い屋根や特殊形状は地震時のリスクを高めます。専門家への相談をおすすめします。"},
      "維持管理・記録":{high:"メンテナンス記録が整っています。資産価値の維持ができています。",middle:"一部記録・積立が不足しています。計画的なメンテナンス管理をおすすめします。",low:"維持管理が不足しています。早急に修繕計画と費用積立を始めましょう。"},
    },
    nextApps:[
      {id:"kiso",   emoji:"🪨",label:"基礎・地盤リスク診断"},
      {id:"setsubi",emoji:"🔧",label:"設備・インフラ劣化診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,[]),
    questions:[
      {id:1,category:"建築年・耐震基準",emoji:"📅",text:"建物が建てられたのはいつ頃ですか？",hint:"1981年以前は「旧耐震基準」で設計されており、大地震への対応が不十分な場合があります。",options:[{label:"1981年（昭和56年）以前",score:0},{label:"1981年〜2000年（平成12年）頃",score:1},{label:"2000年以降",score:2},{label:"わからない",score:0}]},
      {id:2,category:"建築年・耐震基準",emoji:"📋",text:"耐震診断や耐震改修を実施したことがありますか？",hint:"旧耐震基準の建物でも、耐震改修で現行基準相当にできます。",options:[{label:"耐震診断・改修ともに実施済み",score:2},{label:"診断のみ実施（改修なし）",score:1},{label:"一度も実施していない",score:0},{label:"わからない",score:0}]},
      {id:3,category:"建築年・耐震基準",emoji:"🏠",text:"建物の構造は何ですか？",hint:"在来工法は施工品質にばらつきがあり、筋交いや金物の適切な施工が重要です。",options:[{label:"木造（在来工法）",score:1},{label:"木造（2×4工法）",score:2},{label:"鉄骨造・RC造",score:2},{label:"わからない",score:0}]},
      {id:4,category:"基礎・地盤",emoji:"🪨",text:"建物の基礎の種類を把握していますか？",hint:"ベタ基礎は地盤への荷重分散が優れており、不同沈下が起きにくいです。",options:[{label:"ベタ基礎（コンクリートが床全面）",score:2},{label:"布基礎（コンクリートが線状）",score:1},{label:"把握していない",score:0}]},
      {id:5,category:"基礎・地盤",emoji:"🌊",text:"地盤調査（ボーリング調査など）を行いましたか？",hint:"軟弱地盤に建つ建物は、地震時に液状化や不同沈下のリスクがあります。",options:[{label:"調査を行い、地盤改良もした",score:2},{label:"調査のみ（改良なし）",score:1},{label:"調査していない・わからない",score:0}]},
      {id:6,category:"基礎・地盤",emoji:"🗺️",text:"ハザードマップで液状化リスクを確認しましたか？",hint:"国土交通省「ハザードマップポータルサイト」で無料確認できます。",options:[{label:"確認済み（リスク低）",score:2},{label:"確認済み（リスク高・対策検討中）",score:1},{label:"確認していない・わからない",score:0}]},
      {id:7,category:"外観・構造の状態",emoji:"🔍",text:"外壁にひび割れ（クラック）はありますか？",hint:"0.3mm以上のひび割れは構造上の問題を示している可能性があります。",options:[{label:"ほとんど見当たらない",score:2},{label:"細いひび割れが数箇所ある",score:1},{label:"幅広いひび割れや段差がある",score:0},{label:"確認したことがない",score:0}]},
      {id:8,category:"外観・構造の状態",emoji:"🚪",text:"ドアや窓の開閉に引っかかりや歪みがありますか？",hint:"建物の歪みや不同沈下が起きると、開口部に影響が出ることがあります。",options:[{label:"スムーズに開閉できる",score:2},{label:"少し引っかかりを感じる",score:1},{label:"明らかな歪みや開閉困難がある",score:0}]},
      {id:9,category:"外観・構造の状態",emoji:"🌧️",text:"雨漏りや天井のシミがありますか？",hint:"雨漏りを放置すると木材の腐食や白蟻被害につながり、構造耐力が低下します。",options:[{label:"まったくない",score:2},{label:"過去にあったが修繕済み",score:1},{label:"現在も雨漏りがある",score:0},{label:"確認したことがない",score:0}]},
      {id:10,category:"外観・構造の状態",emoji:"🐜",text:"シロアリ被害や木材の腐朽を確認したことがありますか？",hint:"木造住宅のシロアリ被害は見えない場所で進行し、耐力壁を著しく弱体化させます。",options:[{label:"定期的に点検・防蟻処理をしている",score:2},{label:"一度点検したが最近はしていない",score:1},{label:"一度も確認したことがない",score:0},{label:"被害が確認されている",score:0}]},
      {id:11,category:"屋根・上部構造",emoji:"🏚️",text:"屋根の形状はどれですか？",hint:"重心が高くなる形状や、重い瓦屋根は地震時の揺れを大きくする場合があります。",options:[{label:"切妻・寄棟（勾配のある一般的な屋根）",score:2},{label:"片流れ屋根",score:1},{label:"陸屋根（フラット）",score:1},{label:"わからない",score:0}]},
      {id:12,category:"屋根・上部構造",emoji:"⚖️",text:"屋根材は何ですか？",hint:"重い屋根材は地震時の慣性力を増大させ、建物への負荷が大きくなります。",options:[{label:"スレート・金属屋根（軽い）",score:2},{label:"セメント瓦",score:1},{label:"日本瓦（重い）",score:0},{label:"わからない",score:0}]},
      {id:13,category:"維持管理・記録",emoji:"📁",text:"建物の設計図書（図面・確認済証など）を保管していますか？",hint:"図面がないと耐震診断や改修工事の費用が大幅に増加します。",options:[{label:"すべて保管している",score:2},{label:"一部しかない",score:1},{label:"ほとんど手元にない",score:0}]},
      {id:14,category:"維持管理・記録",emoji:"🔧",text:"定期的なメンテナンス（外壁塗装・防水など）を行っていますか？",hint:"外壁塗装の目安は10〜15年。放置すると防水機能が低下し構造材の劣化を招きます。",options:[{label:"10〜15年周期で実施している",score:2},{label:"気になった時に対処している",score:1},{label:"ほぼ手を入れたことがない",score:0}]},
      {id:15,category:"維持管理・記録",emoji:"💰",text:"今後の修繕・改修費用を積み立てていますか？",hint:"戸建ては管理組合がないため、修繕費の積み立ては100%オーナー自身の責任です。",options:[{label:"計画的に積み立てている",score:2},{label:"漠然と貯蓄はある",score:1},{label:"特に準備していない",score:0}]},
    ],
  },

  kiso: {
    titleEmoji:"🪨", title:"戸建て\n基礎・地盤リスク診断", subtitle:"15の質問で地盤・基礎の\nリスクがわかります",
    accent:"#3b82f6", accentDark:"#1d4ed8", accentBg:"#eff6ff", accentBorder:"#bfdbfe",
    grad:"linear-gradient(135deg,#3b82f6,#06b6d4)", wrapBg:"linear-gradient(160deg,#eff6ff 0%,#f0fdfa 100%)",
    categoryList:[["🗾","地盤の成り立ち","3問"],["🔬","地盤調査・改良","3問"],["🏠","基礎の状態","4問"],["🌧️","周辺環境・変状","2問"],["📁","記録・対応","3問"]],
    categoryComments:{
      "地盤の成り立ち":{high:"土地の成り立ちはリスクが低い状態です。引き続き定期的な確認を。",middle:"土地の由来に不明点があります。自治体の地盤情報マップで確認をおすすめします。",low:"軟弱地盤や埋立地の可能性があります。専門家による地盤調査を検討してください。"},
      "地盤調査・改良":{high:"地盤調査・改良の記録が整っています。安心できる状態です。",middle:"地盤調査の記録確認をおすすめします。報告書が手元にあるか確認しましょう。",low:"地盤状況が不明です。調査報告書の確認、または再調査を強くおすすめします。"},
      "基礎の状態":{high:"基礎の状態は良好です。引き続き定期的な床下点検を続けましょう。",middle:"基礎に気になる点があります。専門家による床下点検をおすすめします。",low:"基礎に深刻なリスクの可能性があります。早急に専門家の診断を受けてください。"},
      "周辺環境・変状":{high:"周辺環境・排水状況に大きな問題は見当たりません。",middle:"排水や外構に気になる点があります。大雨後の状態を確認しましょう。",low:"地盤沈下や排水問題のサインがあります。早めの対策が必要です。"},
      "記録・対応":{high:"書類・保証の記録が整っています。万一の際も安心です。",middle:"一部書類が不足しています。地盤保証書や調査報告書の確認をおすすめします。",low:"重要な書類や保証が不足しています。建築会社や保証会社への問い合わせを検討してください。"},
    },
    nextApps:[
      {id:"taishin",emoji:"🏠",label:"耐震・構造リスク診断"},
      {id:"suigai", emoji:"🌊",label:"水害・浸水リスク診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,[]),
    questions:[
      {id:1,category:"地盤の成り立ち",emoji:"🗾",text:"建物が建っている土地はどのような場所ですか？",hint:"元々田んぼや水辺だった土地は軟弱地盤の可能性が高く、地震時の被害リスクが高まります。",options:[{label:"丘や台地の上（昔から陸地）",score:2},{label:"平坦な住宅地（由来不明）",score:1},{label:"元田んぼ・田畑・埋立地",score:0},{label:"わからない",score:0}]},
      {id:2,category:"地盤の成り立ち",emoji:"🏔️",text:"近くに川・池・沼・干拓地はありますか？",hint:"水辺に近い土地は地下水位が高く、液状化や軟弱地盤のリスクがあります。",options:[{label:"近くにない",score:2},{label:"やや近い（500m以内）",score:1},{label:"すぐそば（100m以内）",score:0},{label:"わからない",score:0}]},
      {id:3,category:"地盤の成り立ち",emoji:"🗺️",text:"市区町村のハザードマップで液状化リスクを確認しましたか？",hint:"国土交通省「ハザードマップポータルサイト」で無料確認できます。",options:[{label:"確認済み（リスク低）",score:2},{label:"確認済み（リスク高・対策検討中）",score:1},{label:"確認していない・わからない",score:0}]},
      {id:4,category:"地盤調査・改良",emoji:"🔬",text:"建築前に地盤調査（スウェーデン式など）を実施しましたか？",hint:"地盤調査なしで建てた建物は、軟弱地盤上にある可能性を否定できません。",options:[{label:"調査・地盤改良ともに実施",score:2},{label:"調査のみ（改良なし）",score:1},{label:"調査していない・わからない",score:0}]},
      {id:5,category:"地盤調査・改良",emoji:"📋",text:"地盤調査の報告書を保管していますか？",hint:"報告書があれば地盤の強さ（N値）を確認でき、リスク判断の根拠になります。",options:[{label:"手元に保管している",score:2},{label:"どこかにあるはず",score:1},{label:"ない・わからない",score:0}]},
      {id:6,category:"地盤調査・改良",emoji:"⚙️",text:"地盤改良工事を行いましたか？",hint:"軟弱地盤でも適切な改良（柱状改良・鋼管杭など）で不同沈下リスクを大幅に低減できます。",options:[{label:"柱状改良・鋼管杭など実施",score:2},{label:"表層改良のみ",score:1},{label:"改良していない・わからない",score:0}]},
      {id:7,category:"基礎の状態",emoji:"🏠",text:"建物の基礎の種類はどれですか？",hint:"ベタ基礎は荷重を面で受けるため、不同沈下が起きにくい構造です。",options:[{label:"ベタ基礎（床全面コンクリート）",score:2},{label:"布基礎（線状コンクリート）",score:1},{label:"独立基礎・束石",score:0},{label:"わからない",score:0}]},
      {id:8,category:"基礎の状態",emoji:"🔍",text:"基礎コンクリートにひび割れはありますか？",hint:"幅0.3mm以上・深さ4mm以上のひび割れは構造的な問題のサインです。",options:[{label:"ひび割れはない",score:2},{label:"細いひび割れが少しある",score:1},{label:"幅広いひび割れや欠けがある",score:0},{label:"確認したことがない",score:0}]},
      {id:9,category:"基礎の状態",emoji:"📐",text:"建物に傾きや床の傾斜を感じますか？",hint:"1/100以上の傾きは不同沈下の可能性があり、早急な専門家診断が必要です。",options:[{label:"まったく感じない",score:2},{label:"わずかに感じることがある",score:1},{label:"明らかに傾いている・ビー玉が転がる",score:0}]},
      {id:10,category:"基礎の状態",emoji:"💧",text:"床下に湿気・水たまり・カビの形跡がありますか？",hint:"床下の湿気は基礎コンクリートの劣化や木材腐食を促進し、地盤沈下の初期サインにもなります。",options:[{label:"乾燥していて問題なし",score:2},{label:"やや湿気を感じる",score:1},{label:"水たまりやカビが確認されている",score:0},{label:"床下を確認したことがない",score:0}]},
      {id:11,category:"周辺環境・変状",emoji:"🌧️",text:"大雨のあとに庭や駐車場に水が溜まりますか？",hint:"水はけが悪い土地は地盤が水を含みやすく、長期的な地盤沈下につながる場合があります。",options:[{label:"すぐに水が引く",score:2},{label:"しばらく水が残る",score:1},{label:"いつまでも水が溜まる",score:0}]},
      {id:12,category:"周辺環境・変状",emoji:"🧱",text:"塀・フェンス・門柱などに傾きやひび割れはありますか？",hint:"外構の変状は地盤沈下の早期サインになることがあります。",options:[{label:"異常なし",score:2},{label:"少しひび割れがある",score:1},{label:"明らかな傾きやひび割れがある",score:0},{label:"確認したことがない",score:0}]},
      {id:13,category:"記録・対応",emoji:"📁",text:"建築時の地盤・基礎に関する書類を保管していますか？",hint:"地盤調査報告書・地盤保証書・基礎伏図などが揃っていると、問題発生時の対応が早くなります。",options:[{label:"一式保管している",score:2},{label:"一部ある",score:1},{label:"ほとんどない",score:0}]},
      {id:14,category:"記録・対応",emoji:"🏢",text:"地盤保証（地盤保証書）はありますか？",hint:"地盤保証があれば万一の沈下時に補修費用が保証されます。有効期限も確認しましょう。",options:[{label:"あり・有効期限内",score:2},{label:"あるが期限切れ・不明",score:1},{label:"ない・わからない",score:0}]},
      {id:15,category:"記録・対応",emoji:"🔧",text:"過去に地盤・基礎に関する補修工事をしたことがありますか？",hint:"補修履歴があること自体は問題ではありませんが、原因と対処内容の把握が重要です。",options:[{label:"補修なし・問題なし",score:2},{label:"補修済み・原因も把握している",score:2},{label:"補修したが原因不明",score:1},{label:"補修が必要だが未対応",score:0}]},
    ],
  },

  setsubi: {
    titleEmoji:"🔧", title:"戸建て\n設備・インフラ劣化診断", subtitle:"15の質問で給排水・電気・ガスなど\n設備のリスクがわかります",
    accent:"#8b5cf6", accentDark:"#6d28d9", accentBg:"#faf5ff", accentBorder:"#ddd6fe",
    grad:"linear-gradient(135deg,#8b5cf6,#ec4899)", wrapBg:"linear-gradient(160deg,#faf5ff 0%,#fdf2f8 100%)",
    categoryList:[["🚿","給排水設備","4問"],["⚡","電気設備","3問"],["🔥","ガス・空調設備","2問"],["🌧️","防水・断熱","2問"],["📁","維持管理の記録","4問"]],
    categoryComments:{
      "給排水設備":{high:"給排水設備は良好な状態です。引き続き定期点検を続けましょう。",middle:"給排水に一部懸念があります。配管の素材確認や清掃をおすすめします。",low:"給排水設備に深刻なリスクがあります。専門業者による点検を早急に受けてください。"},
      "電気設備":{high:"電気設備は適切に維持されています。",middle:"電気設備に古い箇所があります。漏電・火災リスクの確認をおすすめします。",low:"電気設備に危険なリスクがあります。早急に電気工事士による点検を受けてください。"},
      "ガス・空調設備":{high:"ガス・空調設備は良好です。定期的な清掃を続けましょう。",middle:"給湯器など設備の老朽化が進んでいます。交換時期の検討をおすすめします。",low:"ガス設備に危険なリスクがあります。一酸化炭素中毒防止のため早急な点検を。"},
      "防水・断熱":{high:"防水・断熱の状態は良好です。",middle:"防水・断熱に経年劣化が見られます。外壁塗装・コーキングの点検をおすすめします。",low:"防水機能が低下しています。雨漏り・カビのリスクがあります。早めの対処を。"},
      "維持管理の記録":{high:"設備記録が整っています。売却時にも有利です。",middle:"記録・積立が一部不足しています。設備台帳の作成をおすすめします。",low:"設備記録がほぼありません。更新費用の積立と記録管理を始めましょう。"},
    },
    nextApps:[
      {id:"taishin",emoji:"🏠",label:"耐震・構造リスク診断"},
      {id:"kiso",   emoji:"🪨",label:"基礎・地盤リスク診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["設備良好","要点検","要更新","要緊急対応"]),
    questions:[
      {id:1,category:"給排水設備",emoji:"🚿",text:"給水管の素材を把握していますか？",hint:"鉛管や古い亜鉛メッキ鋼管は腐食・赤水の原因になります。築30年以上は要確認。",options:[{label:"樹脂管・ステンレス管（新しい素材）",score:2},{label:"銅管",score:1},{label:"鉛管・亜鉛メッキ鋼管（古い素材）",score:0},{label:"わからない",score:0}]},
      {id:2,category:"給排水設備",emoji:"🚰",text:"蛇口から赤水・濁り水が出たことがありますか？",hint:"赤水は給水管の腐食サイン。放置すると管の破裂リスクもあります。",options:[{label:"一度もない",score:2},{label:"たまに出る",score:1},{label:"よく出る・最近出た",score:0}]},
      {id:3,category:"給排水設備",emoji:"🪠",text:"排水管の詰まりや逆流が起きたことがありますか？",hint:"排水管は築20年以上で清掃・点検が推奨されます。",options:[{label:"一度もない",score:2},{label:"過去に一度あった（解消済み）",score:1},{label:"頻繁に起きる",score:0}]},
      {id:4,category:"給排水設備",emoji:"💧",text:"水道メーターを止めた状態で水漏れを確認したことがありますか？",hint:"見えない場所での漏水は床下・壁内の腐食につながります。年に一度の確認を推奨。",options:[{label:"確認済み・漏れなし",score:2},{label:"確認したことがない",score:1},{label:"漏水が確認されている",score:0}]},
      {id:5,category:"電気設備",emoji:"⚡",text:"分電盤（ブレーカー）はいつ頃設置・交換しましたか？",hint:"分電盤の耐用年数は13〜15年。古いものは漏電・火災リスクがあります。",options:[{label:"10年以内に交換済み",score:2},{label:"10〜20年前のもの",score:1},{label:"20年以上前・わからない",score:0}]},
      {id:6,category:"電気設備",emoji:"🔌",text:"アンペア数は現在の生活に足りていますか？",hint:"電気容量不足はブレーカー頻繁落ちの原因。IH・EV充電には大容量が必要です。",options:[{label:"余裕がある（60A以上）",score:2},{label:"ちょうど足りている（40〜50A）",score:1},{label:"よくブレーカーが落ちる",score:0}]},
      {id:7,category:"電気設備",emoji:"🔥",text:"コンセントや配線が古い（2口のみ・アース無しなど）箇所が多いですか？",hint:"古い配線はトラッキング火災のリスクがあります。築30年以上は全面点検を推奨。",options:[{label:"リフォーム済み・新しい",score:2},{label:"一部古い箇所がある",score:1},{label:"ほとんど古いまま",score:0}]},
      {id:8,category:"ガス・空調設備",emoji:"🔥",text:"ガス給湯器の設置からどのくらい経ちますか？",hint:"給湯器の耐用年数は10〜15年。古いものは不完全燃焼・一酸化炭素中毒のリスクがあります。",options:[{label:"10年以内",score:2},{label:"10〜15年",score:1},{label:"15年以上・わからない",score:0}]},
      {id:9,category:"ガス・空調設備",emoji:"❄️",text:"エアコンの室外機・配管は定期的にメンテナンスしていますか？",hint:"配管の断熱材劣化は結露・カビの原因になります。",options:[{label:"定期的に清掃・点検している",score:2},{label:"フィルター清掃程度はしている",score:1},{label:"ほぼ手入れしていない",score:0}]},
      {id:10,category:"防水・断熱",emoji:"🌧️",text:"外壁・屋根の防水処理はいつ頃実施しましたか？",hint:"外壁塗装の目安は10〜15年。コーキングの寿命は約10年です。",options:[{label:"10年以内に実施済み",score:2},{label:"10〜20年前",score:1},{label:"20年以上・わからない",score:0}]},
      {id:11,category:"防水・断熱",emoji:"🧊",text:"冬場に窓の結露がひどいですか？",hint:"結露はカビ・断熱不足のサイン。壁内結露が進むと構造材の腐食につながります。",options:[{label:"ほとんど結露しない",score:2},{label:"少し結露する",score:1},{label:"毎朝びっしょり結露する",score:0}]},
      {id:12,category:"維持管理の記録",emoji:"📁",text:"設備の点検・交換記録（保証書・領収書など）を保管していますか？",hint:"記録があると売却時の査定アップや、故障時の保証適用に役立ちます。",options:[{label:"一式保管している",score:2},{label:"一部ある",score:1},{label:"ほとんどない",score:0}]},
      {id:13,category:"維持管理の記録",emoji:"🔧",text:"設備の定期点検（給水・ガス・電気）を受けていますか？",hint:"法定点検（ガス・電気）は義務のものもあります。未受検は保険適用外になる場合も。",options:[{label:"定期的に受けている",score:2},{label:"気になった時だけ",score:1},{label:"ほぼ受けたことがない",score:0}]},
      {id:14,category:"維持管理の記録",emoji:"💰",text:"設備更新（給湯器・配管など）の費用を積み立てていますか？",hint:"戸建ての設備更新費用は10〜20年で数百万円かかることも。計画的な積み立てが重要です。",options:[{label:"計画的に積み立てている",score:2},{label:"漠然と貯蓄はある",score:1},{label:"特に準備していない",score:0}]},
      {id:15,category:"維持管理の記録",emoji:"🏠",text:"リフォーム・設備交換の履歴を把握していますか？",hint:"履歴が明確だと売却時の価値向上につながります。",options:[{label:"すべて把握・記録している",score:2},{label:"主なものは把握している",score:1},{label:"ほとんど把握していない",score:0}]},
    ],
  },

  suigai: {
    titleEmoji:"🌊", title:"戸建て\n水害・浸水リスク診断", subtitle:"15の質問で水害・土砂災害への\n備えとリスクがわかります",
    accent:"#0ea5e9", accentDark:"#0369a1", accentBg:"#f0f9ff", accentBorder:"#bae6fd",
    grad:"linear-gradient(135deg,#0ea5e9,#06b6d4)", wrapBg:"linear-gradient(160deg,#f0f9ff 0%,#ecfeff 100%)",
    categoryList:[["🌊","浸水・洪水リスク","4問"],["⛰️","土砂災害リスク","2問"],["🚿","排水・防水対策","3問"],["📋","保険・備え","2問"],["🏘️","地域・インフラ","4問"]],
    categoryComments:{
      "浸水・洪水リスク":{high:"浸水・洪水リスクは低い状態です。引き続きハザードマップの確認を。",middle:"浸水リスクに一部懸念があります。ハザードマップの再確認をおすすめします。",low:"浸水リスクが高い可能性があります。止水対策と避難計画の整備を急いでください。"},
      "土砂災害リスク":{high:"土砂災害リスクは低い状態です。",middle:"土砂災害の可能性がある地域です。警戒区域の確認をおすすめします。",low:"土砂災害リスクが高い可能性があります。早急に避難計画と対策を検討してください。"},
      "排水・防水対策":{high:"排水・防水対策は良好です。",middle:"排水・防水に一部改善の余地があります。雨樋の清掃や外壁点検をおすすめします。",low:"排水・防水に問題があります。雨水侵入リスクを早急に解消してください。"},
      "保険・備え":{high:"保険・備えは十分です。万一の際も安心です。",middle:"保険内容の確認が必要です。水災補償の有無を確認しましょう。",low:"水害への備えが不足しています。水災補償の加入を早急に検討してください。"},
      "地域・インフラ":{high:"地域のインフラ・防災体制は整っています。",middle:"地域の防災情報の確認をおすすめします。避難場所を家族で共有しましょう。",low:"地域の防災体制に不安があります。自治体の防災情報を確認し備えを強化してください。"},
    },
    nextApps:[
      {id:"kiso",   emoji:"🪨",label:"基礎・地盤リスク診断"},
      {id:"community",emoji:"🤝",label:"近隣コミュニティ・人間関係力診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["備え良好","要確認","要対策","要緊急対応"]),
    questions:[
      {id:1,category:"浸水・洪水リスク",emoji:"🌊",text:"市区町村の洪水ハザードマップを確認しましたか？",hint:"国土交通省「ハザードマップポータルサイト」で無料確認できます。",options:[{label:"確認済み・浸水リスクなし",score:2},{label:"確認済み・浸水リスクあり",score:0},{label:"まだ確認していない",score:0}]},
      {id:2,category:"浸水・洪水リスク",emoji:"🌧️",text:"大雨のとき、近くの道路や川が氾濫したことがありますか？",hint:"過去の浸水実績は将来のリスクの最も信頼できる指標です。",options:[{label:"一度もない",score:2},{label:"道路が冠水したことがある",score:1},{label:"床下・床上浸水の経験がある",score:0}]},
      {id:3,category:"浸水・洪水リスク",emoji:"📏",text:"建物の床の高さ（GL＋基礎高）はどのくらいですか？",hint:"基礎高が高いほど床下浸水リスクが低くなります。",options:[{label:"高め（GL+40cm以上）",score:2},{label:"標準的（GL+20〜40cm）",score:1},{label:"低め（GL+20cm未満）・わからない",score:0}]},
      {id:4,category:"浸水・洪水リスク",emoji:"🏞️",text:"建物の周囲より土地が低い（周りに囲まれた低地）ですか？",hint:"周囲より低い土地は雨水が集まりやすく浸水リスクが高まります。",options:[{label:"周囲より高い・同じくらい",score:2},{label:"やや低い",score:1},{label:"明らかに低い・すり鉢状",score:0}]},
      {id:5,category:"土砂災害リスク",emoji:"⛰️",text:"土砂災害ハザードマップで警戒区域を確認しましたか？",hint:"急傾斜地・土石流・地すべりの警戒区域に該当する場合は要対策。",options:[{label:"確認済み・区域外",score:2},{label:"確認済み・区域内",score:0},{label:"まだ確認していない",score:0}]},
      {id:6,category:"土砂災害リスク",emoji:"🌿",text:"敷地の近くに急な斜面・崖・山はありますか？",hint:"崖から建物まで水平距離が崖高さの2倍以内は土砂災害のリスクゾーンです。",options:[{label:"近くにない",score:2},{label:"やや遠い（50m以上）",score:1},{label:"すぐそば（50m以内）",score:0}]},
      {id:7,category:"排水・防水対策",emoji:"🚿",text:"雨水排水（雨樋・排水溝）は詰まらずに機能していますか？",hint:"雨樋の詰まりは外壁・基礎への雨水侵入の原因になります。",options:[{label:"定期的に清掃・問題なし",score:2},{label:"たまに確認する程度",score:1},{label:"ほぼ確認したことがない",score:0}]},
      {id:8,category:"排水・防水対策",emoji:"🧱",text:"外壁・基礎のひび割れから雨水が浸入している形跡はありますか？",hint:"ひび割れからの浸水は建物内部の腐食・シロアリ被害につながります。",options:[{label:"浸入の形跡なし",score:2},{label:"少し気になる箇所がある",score:1},{label:"明らかな浸水跡がある",score:0}]},
      {id:9,category:"排水・防水対策",emoji:"🔒",text:"浸水対策（止水板・防水扉・土のう等）を準備していますか？",hint:"ハザードマップでリスクがある場合、簡易止水板だけでも大きな効果があります。",options:[{label:"対策済み・準備している",score:2},{label:"検討中",score:1},{label:"何も準備していない",score:0}]},
      {id:10,category:"保険・備え",emoji:"📋",text:"火災保険に水災補償を付けていますか？",hint:"水災補償は別途オプションの場合が多く、未加入だと浸水被害が自己負担になります。",options:[{label:"水災補償あり",score:2},{label:"保険はあるが補償内容不明",score:1},{label:"水災補償なし・保険未加入",score:0}]},
      {id:11,category:"保険・備え",emoji:"🗂️",text:"過去の浸水・水害被害の記録を保管していますか？",hint:"被害記録は保険請求・売却時の告知義務にも関わります。",options:[{label:"記録・写真を保管している",score:2},{label:"おおよそ把握している",score:1},{label:"記録していない",score:0}]},
      {id:12,category:"地域・インフラ",emoji:"🏘️",text:"地域の排水インフラ（下水道・雨水幹線）は整備されていますか？",hint:"排水インフラが未整備な地域は大雨時の冠水リスクが高まります。",options:[{label:"整備済み・問題なし",score:2},{label:"一部未整備",score:1},{label:"未整備・わからない",score:0}]},
      {id:13,category:"地域・インフラ",emoji:"🌊",text:"近くに海・湾・干拓地はありますか？",hint:"海抜が低い地域は高潮・津波のリスクも考慮が必要です。",options:[{label:"近くにない・内陸部",score:2},{label:"数キロ以内にある",score:1},{label:"すぐそば・海抜が低い",score:0}]},
      {id:14,category:"地域・インフラ",emoji:"📡",text:"地域の防災情報（避難場所・避難経路）を把握していますか？",hint:"水害は事前の避難が命を守ります。避難場所・タイミングの把握が重要。",options:[{label:"把握・家族で共有済み",score:2},{label:"おおよそ知っている",score:1},{label:"把握していない",score:0}]},
      {id:15,category:"地域・インフラ",emoji:"🛡️",text:"自治会・町内会の防災活動に参加していますか？",hint:"地域のつながりは水害時の早期避難・助け合いに大きく役立ちます。",options:[{label:"積極的に参加している",score:2},{label:"時々参加する",score:1},{label:"ほぼ参加していない",score:0}]},
    ],
  },

  baikaku: {
    titleEmoji:"💰", title:"戸建て\n売却・資産価値の維持力診断", subtitle:"15の質問で売却力・\n資産価値維持力がわかります",
    accent:"#10b981", accentDark:"#047857", accentBg:"#f0fdf4", accentBorder:"#a7f3d0",
    grad:"linear-gradient(135deg,#10b981,#f59e0b)", wrapBg:"linear-gradient(160deg,#f0fdf4 0%,#fefce8 100%)",
    categoryList:[["📅","建物の状態・築年数","4問"],["🚉","立地・周辺環境","4問"],["📜","権利・法的状況","3問"],["💰","市場・売却準備","4問"]],
    categoryComments:{
      "建物の状態・築年数":{high:"建物の状態・記録は良好です。査定で有利に働きます。",middle:"メンテナンス記録の整備で査定アップが期待できます。",low:"建物の状態・記録が不足しています。リフォームや書類整備を検討しましょう。"},
      "立地・周辺環境":{high:"立地・周辺環境は資産価値維持に有利です。",middle:"立地に一部懸念があります。周辺の開発情報を収集しましょう。",low:"立地・周辺環境が資産価値に影響する可能性があります。住み替えも含めた検討を。"},
      "権利・法的状況":{high:"権利関係・法的状況は明確です。売却に支障はありません。",middle:"権利関係に一部確認が必要な点があります。司法書士への相談をおすすめします。",low:"権利・法的問題があります。売却前に専門家による整理が必要です。"},
      "市場・売却準備":{high:"売却準備は整っています。適切な価格設定で高値売却を目指せます。",middle:"売却準備を進めることで成約率・価格を上げられます。",low:"売却準備が不足しています。専門家への相談から始めましょう。"},
    },
    nextApps:[
      {id:"taishin",emoji:"🏠",label:"耐震・構造リスク診断"},
      {id:"community",emoji:"🤝",label:"近隣コミュニティ・人間関係力診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["売却力：高い","売却力：普通","売却力：要改善","売却力：要緊急対策"]),
    questions:[
      {id:1,category:"建物の状態・築年数",emoji:"📅",text:"建物の築年数はどのくらいですか？",hint:"築年数は査定の大きな要素ですが、メンテナンス状態が良ければ評価を上げられます。",options:[{label:"築10年以内",score:2},{label:"築11〜20年",score:2},{label:"築21〜30年",score:1},{label:"築31年以上",score:0}]},
      {id:2,category:"建物の状態・築年数",emoji:"🔧",text:"定期的なメンテナンス・リフォームを行っていますか？",hint:"外壁塗装・水回りリフォーム・屋根補修などの記録があると査定アップにつながります。",options:[{label:"定期的に実施・記録あり",score:2},{label:"一部実施している",score:1},{label:"ほぼ手入れしていない",score:0}]},
      {id:3,category:"建物の状態・築年数",emoji:"📁",text:"建物の設計図書・検査済証・リフォーム履歴を保管していますか？",hint:"書類が揃っていると買主の安心感が増し、価格交渉で有利になります。",options:[{label:"一式保管している",score:2},{label:"一部ある",score:1},{label:"ほとんどない",score:0}]},
      {id:4,category:"建物の状態・築年数",emoji:"🏠",text:"耐震基準適合証明書または既存住宅性能評価書はありますか？",hint:"これらの書類があると住宅ローン控除・フラット35の利用可能性が広がり、買主層が増えます。",options:[{label:"両方または一方あり",score:2},{label:"取得を検討中",score:1},{label:"ない・わからない",score:0}]},
      {id:5,category:"立地・周辺環境",emoji:"🚉",text:"最寄り駅からの距離はどのくらいですか？",hint:"駅徒歩10分以内は資産価値維持に有利。15分超は価格に影響することが多いです。",options:[{label:"徒歩10分以内",score:2},{label:"徒歩11〜20分",score:1},{label:"徒歩20分超・バス利用",score:0}]},
      {id:6,category:"立地・周辺環境",emoji:"🏫",text:"近くに学校・スーパー・病院などの生活施設がありますか？",hint:"生活利便性は資産価値に直結します。特にスーパー徒歩圏は高評価。",options:[{label:"徒歩圏内に充実している",score:2},{label:"車があれば不便でない",score:1},{label:"生活施設が少ない・遠い",score:0}]},
      {id:7,category:"立地・周辺環境",emoji:"📉",text:"周辺の空き家・空き地・廃墟は増えていますか？",hint:"周辺の空き家増加は地域の資産価値下落のシグナルです。",options:[{label:"増えていない・活気がある",score:2},{label:"少し気になる",score:1},{label:"明らかに増えている",score:0}]},
      {id:8,category:"立地・周辺環境",emoji:"🏙️",text:"近隣に再開発・新駅・大型施設の計画はありますか？",hint:"開発計画があると将来の価値上昇が期待できます。自治体のHPで確認を。",options:[{label:"開発計画がある・進行中",score:2},{label:"特に情報なし",score:1},{label:"衰退・縮小の情報がある",score:0}]},
      {id:9,category:"権利・法的状況",emoji:"📜",text:"土地・建物の権利関係は明確ですか？",hint:"共有持分・抵当権・借地権などの複雑な権利は売却を難しくします。",options:[{label:"単独所有・権利明確",score:2},{label:"一部複雑な点がある",score:1},{label:"共有・借地・抵当権あり",score:0}]},
      {id:10,category:"権利・法的状況",emoji:"📐",text:"土地の境界は確定していますか？",hint:"境界未確定は売却交渉の大きな障害になります。境界確定測量の実施を推奨。",options:[{label:"確定測量済み・境界明確",score:2},{label:"おおよそ明確",score:1},{label:"未確定・隣人と揉めている",score:0}]},
      {id:11,category:"権利・法的状況",emoji:"🔏",text:"建物に未登記部分（増築・車庫など）はありますか？",hint:"未登記部分は住宅ローン審査で問題になり、買主層を狭めます。",options:[{label:"すべて登記済み",score:2},{label:"わからない",score:1},{label:"未登記部分がある",score:0}]},
      {id:12,category:"市場・売却準備",emoji:"💰",text:"近隣の売却事例・相場を把握していますか？",hint:"相場を知らずに売ると適正価格より低く売ってしまうリスクがあります。",options:[{label:"最近調べた・把握している",score:2},{label:"おおよそ知っている",score:1},{label:"全く把握していない",score:0}]},
      {id:13,category:"市場・売却準備",emoji:"🧹",text:"売却に向けた清掃・片付け・ハウスクリーニングは準備できますか？",hint:"第一印象は成約価格に大きく影響します。プロのハウスクリーニングは費用対効果が高い。",options:[{label:"準備済み・いつでも内覧可能",score:2},{label:"これから準備する",score:1},{label:"難しい状況",score:0}]},
      {id:14,category:"市場・売却準備",emoji:"📸",text:"物件の魅力的な写真・動画を用意できますか？",hint:"写真の質は問い合わせ数に直結します。プロカメラマンへの依頼も検討を。",options:[{label:"プロ品質の写真あり・準備可能",score:2},{label:"スマホで撮影予定",score:1},{label:"まだ考えていない",score:0}]},
      {id:15,category:"市場・売却準備",emoji:"📋",text:"売却後の住み替え・資金計画は立てていますか？",hint:"売却と購入のタイミングがずれると費用が膨らみます。早めの資金計画が重要。",options:[{label:"計画済み・専門家に相談済み",score:2},{label:"おおよそ考えている",score:1},{label:"まだ考えていない",score:0}]},
    ],
  },

  kakei: {
    titleEmoji:"💴", title:"家計・住居費の\n持続力診断", subtitle:"15の質問で住まいにかかる\nお金の持続力がわかります",
    accent:"#f43f5e", accentDark:"#be123c", accentBg:"#fff1f2", accentBorder:"#fecdd3",
    grad:"linear-gradient(135deg,#f43f5e,#f97316)", wrapBg:"linear-gradient(160deg,#fff1f2 0%,#fff7ed 100%)",
    categoryList:[["🏦","住宅ローン・家賃の負担","3問"],["🔨","修繕・維持費の備え","3問"],["💼","収入・雇用の安定性","3問"],["🛡️","保険・リスク管理","3問"],["👴","老後・将来の資金計画","3問"]],
    categoryComments:{
      "住宅ローン・家賃の負担":{high:"住居費の負担は適正範囲内です。安心できる状態です。",middle:"住居費の負担がやや重めです。金利上昇・収入変動のシミュレーションをおすすめします。",low:"住居費の負担が過大です。返済計画の見直しを早急に検討してください。"},
      "修繕・維持費の備え":{high:"修繕・維持費の備えは十分です。計画的な管理ができています。",middle:"修繕費の積立が不足しています。月々の積立額を見直しましょう。",low:"修繕費の備えがほぼありません。突発的な出費に対応できないリスクがあります。"},
      "収入・雇用の安定性":{high:"収入・雇用は安定しています。緊急時の備えもできています。",middle:"収入の安定性に一部懸念があります。緊急予備資金の確保を優先しましょう。",low:"収入・雇用リスクが高い状態です。住居費支払いへの影響を早急に検討してください。"},
      "保険・リスク管理":{high:"保険・リスク管理は十分です。万一の際も住まいを守れます。",middle:"保険内容に一部不備があります。火災・地震・団信の見直しをおすすめします。",low:"保険・リスク管理が不足しています。万一の際に住居費が払えなくなるリスクがあります。"},
      "老後・将来の資金計画":{high:"老後・将来の資金計画が整っています。安心して住み続けられます。",middle:"老後の住まいにかかる費用の試算をおすすめします。NISAやiDeCoも検討を。",low:"老後の住まい資金が不足するリスクがあります。早急に専門家へ相談することをおすすめします。"},
    },
    nextApps:[
      {id:"taishin",emoji:"🏠",label:"耐震・構造リスク診断"},
      {id:"baikaku",emoji:"💰",label:"売却・資産価値の維持力診断"},
      {id:"community",emoji:"🤝",label:"近隣コミュニティ・人間関係力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["持続力：高い","持続力：普通","持続力：要改善","持続力：危険"]),
    questions:[
      {id:1,category:"住宅ローン・家賃の負担",emoji:"🏦",text:"住宅ローンまたは家賃は月収の何割ですか？",hint:"住居費は手取り月収の25〜30%以内が安全ラインとされています。",options:[{label:"25%未満",score:2},{label:"25〜35%",score:1},{label:"35%超・わからない",score:0}]},
      {id:2,category:"住宅ローン・家賃の負担",emoji:"📉",text:"金利上昇・収入減少があってもローン返済を続けられますか？",hint:"変動金利の場合、1〜2%の金利上昇でも返済額が大幅に増えることがあります。",options:[{label:"余裕がある",score:2},{label:"なんとかなると思う",score:1},{label:"厳しくなる可能性が高い",score:0}]},
      {id:3,category:"住宅ローン・家賃の負担",emoji:"📋",text:"住宅ローンの残債と現在の物件価値を把握していますか？",hint:"残債が物件価値を上回る「オーバーローン」状態は売却・住み替えの選択肢を狭めます。",options:[{label:"把握済み・残債＜物件価値",score:2},{label:"おおよそ把握している",score:1},{label:"把握していない・オーバーローンの可能性あり",score:0}]},
      {id:4,category:"修繕・維持費の備え",emoji:"🔨",text:"10〜20年後の大規模修繕費用を積み立てていますか？",hint:"戸建ての場合、20〜30年で外壁・屋根・設備更新に500〜1000万円かかることも。",options:[{label:"計画的に積み立てている",score:2},{label:"漠然と貯蓄はある",score:1},{label:"特に準備していない",score:0}]},
      {id:5,category:"修繕・維持費の備え",emoji:"🏚️",text:"マンションの修繕積立金は適正額ですか？（戸建ての方は維持費積立で回答）",hint:"修繕積立金が不足しているマンションは将来的な一時金徴収リスクがあります。",options:[{label:"適正額・長期修繕計画あり",score:2},{label:"よくわからない",score:1},{label:"不足している",score:0}]},
      {id:6,category:"修繕・維持費の備え",emoji:"💡",text:"固定資産税・管理費・保険料など毎年の住居維持費を把握していますか？",hint:"住居費はローン・家賃だけでなく、年間維持費も含めて管理することが重要です。",options:[{label:"すべて把握・家計管理している",score:2},{label:"おおよそ把握している",score:1},{label:"把握していない",score:0}]},
      {id:7,category:"収入・雇用の安定性",emoji:"💼",text:"現在の世帯収入は安定していますか？",hint:"収入が不安定な場合、住居費の支払いリスクが高まります。副収入・複数収入源があると安心。",options:[{label:"安定・複数の収入源あり",score:2},{label:"今は安定しているが不安がある",score:1},{label:"不安定・収入が減少している",score:0}]},
      {id:8,category:"収入・雇用の安定性",emoji:"👫",text:"一方の収入が途絶えても住居費を払えますか？",hint:"片働きになった場合のシミュレーションは重要なリスク管理です。",options:[{label:"片働きでも問題なし",score:2},{label:"しばらくは大丈夫",score:1},{label:"すぐに厳しくなる",score:0}]},
      {id:9,category:"収入・雇用の安定性",emoji:"🏦",text:"半年分以上の生活費を緊急予備資金として確保していますか？",hint:"緊急予備資金がないと、収入減・突発的な出費で住居費が払えなくなるリスクがあります。",options:[{label:"6ヶ月分以上確保している",score:2},{label:"3〜6ヶ月分程度",score:1},{label:"3ヶ月未満・ほぼない",score:0}]},
      {id:10,category:"保険・リスク管理",emoji:"🛡️",text:"火災保険・地震保険に加入していますか？",hint:"地震保険は火災保険とセットで加入。未加入だと地震による損害が全額自己負担になります。",options:[{label:"火災・地震ともに加入",score:2},{label:"火災保険のみ",score:1},{label:"未加入・わからない",score:0}]},
      {id:11,category:"保険・リスク管理",emoji:"🏥",text:"住宅ローン返済中に死亡・高度障害になった場合の備えはありますか？",hint:"団体信用生命保険（団信）に加入していれば、死亡時にローンが完済されます。",options:[{label:"団信加入済み・内容把握している",score:2},{label:"加入しているが内容不明",score:1},{label:"未加入・わからない",score:0}]},
      {id:12,category:"保険・リスク管理",emoji:"🤕",text:"病気・ケガで長期間働けなくなった場合の備えはありますか？",hint:"就業不能保険・所得補償保険があると、収入途絶による住居費支払い困難を防げます。",options:[{label:"就業不能保険・所得補償保険あり",score:2},{label:"貯蓄でなんとかなると思う",score:1},{label:"特に備えていない",score:0}]},
      {id:13,category:"老後・将来の資金計画",emoji:"👴",text:"老後も現在の住居に住み続けられる資金計画がありますか？",hint:"年金だけで住居費・維持費を賄えるか、定年前に試算しておくことが重要です。",options:[{label:"試算済み・計画がある",score:2},{label:"漠然と考えている",score:1},{label:"まったく考えていない",score:0}]},
      {id:14,category:"老後・将来の資金計画",emoji:"📊",text:"老後の住み替え・リフォーム・施設入居費用を想定していますか？",hint:"バリアフリーリフォームや老人ホーム入居には数百〜数千万円かかることも。",options:[{label:"試算・積み立て済み",score:2},{label:"おおよそ考えている",score:1},{label:"考えていない",score:0}]},
      {id:15,category:"老後・将来の資金計画",emoji:"🎯",text:"NISAやiDeCoなど資産形成を行っていますか？",hint:"住居費以外の資産形成は、将来的な住まいの選択肢を広げます。",options:[{label:"積極的に活用している",score:2},{label:"一部活用している",score:1},{label:"まったくしていない",score:0}]},
    ],
  },  // 近隣コミュニティ・人間関係力診断
  community: {
    titleEmoji:"🤝", title:"近隣コミュニティ\n人間関係力診断", subtitle:"15の質問で近所との繋がり・\n孤立しない力がわかります",
    accent:"#8b5cf6", accentDark:"#6d28d9", accentBg:"#faf5ff", accentBorder:"#ddd6fe",
    grad:"linear-gradient(135deg,#8b5cf6,#ec4899)", wrapBg:"linear-gradient(160deg,#faf5ff 0%,#fdf2f8 100%)",
    categoryList:[["👋","近所付き合いの現状","3問"],["🆘","いざという時の助け合い","3問"],["🌱","地域活動への参加","3問"],["👴","孤立リスク","3問"],["💬","情報・つながりの強さ","3問"]],
    categoryComments:{
      "近所付き合いの現状":{high:"近所との関係は良好です。地域の信頼基盤ができています。",middle:"近所付き合いに一部改善の余地があります。まず挨拶から始めましょう。",low:"近所との関係が薄い状態です。孤立リスクが高まります。"},
      "いざという時の助け合い":{high:"緊急時に頼れる近隣関係があります。",middle:"緊急時の連絡先を近隣と共有することをおすすめします。",low:"緊急時に頼れる人が近くにいない状態です。早急に関係構築を。"},
      "地域活動への参加":{high:"地域活動への参加が地域の絆を強めています。",middle:"地域活動への参加を少し増やすと人間関係が広がります。",low:"地域活動への参加がほぼありません。孤立化が進むリスクがあります。"},
      "孤立リスク":{high:"孤立リスクは低い状態です。安心できる環境です。",middle:"孤立リスクが一部あります。定期的な交流を意識しましょう。",low:"孤立リスクが高い状態です。地域包括支援センターへの相談もおすすめします。"},
      "情報・つながりの強さ":{high:"地域の情報ネットワークに参加できています。",middle:"地域の情報収集を強化しましょう。自治会への参加が有効です。",low:"地域情報が入ってこない状態です。情報の孤立は生活リスクを高めます。"},
    },
    nextApps:[
      {id:"machi",  emoji:"🏗️",label:"街の維持力診断"},
      {id:"suigai", emoji:"🌊",label:"水害・浸水リスク診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["つながり力：高い","つながり力：普通","つながり力：要改善","孤立リスク：危険"]),
    questions:[
      {id:1,category:"近所付き合いの現状",emoji:"👋",text:"近所の人と顔を合わせたとき挨拶していますか？",hint:"挨拶は地域コミュニティの最小単位。毎日の挨拶が信頼関係の土台になります。",options:[{label:"毎回挨拶する・立ち話もする",score:2},{label:"会えば挨拶する程度",score:1},{label:"ほとんど挨拶しない",score:0}]},
      {id:2,category:"近所付き合いの現状",emoji:"🏠",text:"近所に名前を知っている人は何人いますか？",hint:"名前を知っている関係は、いざという時に声をかけやすい最低限のつながりです。",options:[{label:"5人以上",score:2},{label:"1〜4人",score:1},{label:"ほぼいない",score:0}]},
      {id:3,category:"近所付き合いの現状",emoji:"🎁",text:"近所の人と物のやりとり（野菜・お土産など）をしたことがありますか？",hint:"物のやりとりは信頼関係の証。こういった関係が災害時の助け合いにつながります。",options:[{label:"よくある",score:2},{label:"たまにある",score:1},{label:"ほとんどない",score:0}]},
      {id:4,category:"いざという時の助け合い",emoji:"🆘",text:"災害時に助けを求められる近所の人がいますか？",hint:"災害時は行政より先に近隣が助け合います。顔の見える関係が命を救います。",options:[{label:"複数いる",score:2},{label:"1人はいる",score:1},{label:"いない・わからない",score:0}]},
      {id:5,category:"いざという時の助け合い",emoji:"📱",text:"近所の人と連絡先を交換していますか？",hint:"緊急時の連絡手段がないと孤立します。LINEグループなど地域の連絡網への参加を。",options:[{label:"複数人と交換している",score:2},{label:"1〜2人と交換している",score:1},{label:"誰とも交換していない",score:0}]},
      {id:6,category:"いざという時の助け合い",emoji:"👵",text:"高齢者・一人暮らしの方の様子を確認し合う関係がありますか？",hint:"孤独死・孤立死の防止には近隣の見守りが最も効果的です。",options:[{label:"定期的に確認している",score:2},{label:"たまに気にかけている",score:1},{label:"特に気にしていない",score:0}]},
      {id:7,category:"地域活動への参加",emoji:"🏘️",text:"自治会・町内会に加入していますか？",hint:"自治会は地域の情報・防災・助け合いのプラットフォームです。",options:[{label:"加入・積極的に参加",score:2},{label:"加入しているが参加少ない",score:1},{label:"未加入",score:0}]},
      {id:8,category:"地域活動への参加",emoji:"🎉",text:"地域のイベント（祭り・清掃活動など）に参加していますか？",hint:"イベント参加は新しいつながりを作る最も自然な機会です。",options:[{label:"よく参加する",score:2},{label:"たまに参加する",score:1},{label:"ほぼ参加しない",score:0}]},
      {id:9,category:"地域活動への参加",emoji:"🛡️",text:"地域の防災訓練・防犯活動に参加していますか？",hint:"防災・防犯活動への参加は地域の安全を高めると同時に、強い人間関係を作ります。",options:[{label:"毎回参加している",score:2},{label:"たまに参加する",score:1},{label:"参加したことがない",score:0}]},
      {id:10,category:"孤立リスク",emoji:"😔",text:"最近1週間、近所の人と会話しましたか？",hint:"近所との会話頻度は孤立度の重要な指標です。週1回以上が望ましい。",options:[{label:"複数回あった",score:2},{label:"1回あった",score:1},{label:"なかった",score:0}]},
      {id:11,category:"孤立リスク",emoji:"🏡",text:"長期外出時に家を見ていてくれる近所の人がいますか？",hint:"留守中の見守りを頼める関係は、深い信頼の証です。",options:[{label:"頼める人がいる",score:2},{label:"なんとなく気にしてくれそう",score:1},{label:"いない",score:0}]},
      {id:12,category:"孤立リスク",emoji:"💭",text:"近所で困ったことがあったとき、誰かに相談できますか？",hint:"相談できる近隣関係は精神的な安全網になります。",options:[{label:"すぐ相談できる人がいる",score:2},{label:"一応いる",score:1},{label:"相談できる人がいない",score:0}]},
      {id:13,category:"情報・つながりの強さ",emoji:"📢",text:"地域の回覧板・お知らせをチェックしていますか？",hint:"地域情報を受け取ることは、コミュニティへの参加の第一歩です。",options:[{label:"必ずチェックしている",score:2},{label:"たまに見る",score:1},{label:"ほぼ見ない・来ない",score:0}]},
      {id:14,category:"情報・つながりの強さ",emoji:"📲",text:"地域のLINEグループや連絡網に参加していますか？",hint:"デジタルの地域ネットワークは情報共有・緊急連絡に非常に有効です。",options:[{label:"参加している・活用している",score:2},{label:"参加しているが使っていない",score:1},{label:"参加していない",score:0}]},
      {id:15,category:"情報・つながりの強さ",emoji:"🌐",text:"近所で何か問題が起きたとき（騒音・ゴミ問題など）話し合える関係がありますか？",hint:"問題を話し合える関係は、地域の成熟度の証です。",options:[{label:"話し合える関係がある",score:2},{label:"難しいが不可能ではない",score:1},{label:"話し合える関係がない",score:0}]},
    ],
  },

  // 街の維持力診断
  machi: {
    titleEmoji:"🏗️", title:"街の維持力診断", subtitle:"15の質問で街のインフラ・\n将来性・行政力がわかります",
    accent:"#0ea5e9", accentDark:"#0369a1", accentBg:"#f0f9ff", accentBorder:"#bae6fd",
    grad:"linear-gradient(135deg,#0ea5e9,#6366f1)", wrapBg:"linear-gradient(160deg,#f0f9ff 0%,#f5f3ff 100%)",
    categoryList:[["🛒","生活インフラ","3問"],["🏛️","行政・公共サービス","3問"],["🏗️","将来性・開発","3問"],["📉","人口・空き家動向","3問"],["🛣️","公共インフラの質","3問"]],
    categoryComments:{
      "生活インフラ":{high:"生活インフラは充実しています。利便性の高い地域です。",middle:"生活インフラに一部不便な点があります。車なし生活のリスクを確認しましょう。",low:"生活インフラが不足しています。高齢化後の生活に支障が出る可能性があります。"},
      "行政・公共サービス":{high:"行政・公共サービスは安定しています。",middle:"行政サービスに一部懸念があります。自治体の財政情報を確認しましょう。",low:"行政サービスの低下リスクがあります。将来の住み替えも含めた検討をおすすめします。"},
      "将来性・開発":{high:"地域の将来性は明るいです。資産価値の維持・向上が期待できます。",middle:"将来の開発情報を収集しましょう。自治体の都市計画を確認することをおすすめします。",low:"地域の将来性に懸念があります。資産価値の下落リスクを念頭に置いて計画を立てましょう。"},
      "人口・空き家動向":{high:"人口・空き家状況は安定しています。地域の活力が維持されています。",middle:"人口減少・空き家増加の兆候があります。地域の動向を注視しましょう。",low:"人口減少・空き家増加が進んでいます。地域衰退のリスクが高い状態です。"},
      "公共インフラの質":{high:"公共インフラは良好に維持されています。",middle:"公共インフラに一部老朽化が見られます。自治体への要望も検討を。",low:"公共インフラの老朽化が進んでいます。生活の質への影響が懸念されます。"},
    },
    nextApps:[
      {id:"community",emoji:"🤝",label:"近隣コミュニティ・人間関係力診断"},
      {id:"suigai",   emoji:"🌊",label:"水害・浸水リスク診断"},
      {id:"baikaku",  emoji:"💰",label:"売却・資産価値の維持力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["街力：高い","街力：普通","街力：要注意","街力：深刻"]),
    questions:[
      {id:1,category:"生活インフラ",emoji:"🛒",text:"徒歩圏内にスーパー・コンビニはありますか？",hint:"「買い物難民」リスクのある地域は高齢化とともに住みにくくなります。",options:[{label:"徒歩10分以内にある",score:2},{label:"車で5〜10分程度",score:1},{label:"車で15分以上・ない",score:0}]},
      {id:2,category:"生活インフラ",emoji:"🏥",text:"近くに病院・クリニックはありますか？",hint:"医療アクセスは高齢化社会で住み続ける力の重要な指標です。",options:[{label:"徒歩・自転車圏内にある",score:2},{label:"車で10分程度",score:1},{label:"遠い・減少している",score:0}]},
      {id:3,category:"生活インフラ",emoji:"🚌",text:"公共交通機関（バス・電車）は利用しやすいですか？",hint:"免許返納後も生活できる交通環境は、長く住み続けるための重要条件です。",options:[{label:"徒歩圏内・本数も十分",score:2},{label:"あるが本数が少ない",score:1},{label:"ない・廃線・廃バスになった",score:0}]},
      {id:4,category:"行政・公共サービス",emoji:"🏛️",text:"自治体の財政状況は安定していますか？",hint:"財政難の自治体はごみ収集・道路補修など行政サービスが低下するリスクがあります。",options:[{label:"安定している・情報公開されている",score:2},{label:"よくわからない",score:1},{label:"財政難・合併の話がある",score:0}]},
      {id:5,category:"行政・公共サービス",emoji:"♻️",text:"ごみ収集・行政窓口などの公共サービスは機能していますか？",hint:"行政サービスの質は住民の生活の質に直結します。",options:[{label:"問題なく機能している",score:2},{label:"一部不便を感じる",score:1},{label:"明らかにサービスが低下している",score:0}]},
      {id:6,category:"行政・公共サービス",emoji:"🌱",text:"地域の空き家・耕作放棄地対策は進んでいますか？",hint:"空き家対策が進む地域は行政・住民の意識が高く、将来の維持力があります。",options:[{label:"積極的に取り組んでいる",score:2},{label:"一部取り組んでいる",score:1},{label:"ほぼ放置されている",score:0}]},
      {id:7,category:"将来性・開発",emoji:"🏗️",text:"近隣に再開発・新駅・大型商業施設などの計画はありますか？",hint:"開発計画は地域の将来価値を左右します。自治体HPや都市計画図で確認を。",options:[{label:"開発計画がある・進行中",score:2},{label:"特に情報なし",score:1},{label:"縮小・廃止の情報がある",score:0}]},
      {id:8,category:"将来性・開発",emoji:"📊",text:"地域の地価・不動産相場は安定していますか？",hint:"地価の推移は地域の将来性を反映します。国土交通省の地価公示で確認できます。",options:[{label:"横ばい〜上昇",score:2},{label:"緩やかに下落",score:1},{label:"急激に下落している",score:0}]},
      {id:9,category:"将来性・開発",emoji:"🌍",text:"移住・定住促進の取り組みや補助金制度はありますか？",hint:"移住支援が充実している地域は人口流入が期待でき、地域の持続力が高まります。",options:[{label:"充実している・活用した",score:2},{label:"一部ある",score:1},{label:"ない・わからない",score:0}]},
      {id:10,category:"人口・空き家動向",emoji:"👥",text:"近隣の人口（子どもや若い世帯）は増えていますか？",hint:"人口減少・高齢化が進む地域は、将来的に生活インフラが縮小するリスクがあります。",options:[{label:"増えている・若い世帯が多い",score:2},{label:"横ばい",score:1},{label:"明らかに減っている・高齢化が進んでいる",score:0}]},
      {id:11,category:"人口・空き家動向",emoji:"🏚️",text:"近所に空き家・空き地・廃墟は増えていますか？",hint:"空き家率の上昇は地域の衰退サイン。防犯・衛生・景観への悪影響も懸念されます。",options:[{label:"ほとんどない",score:2},{label:"少し目につく",score:1},{label:"明らかに増えている",score:0}]},
      {id:12,category:"人口・空き家動向",emoji:"🏫",text:"近くの学校・保育園は児童数が維持されていますか？",hint:"学校・保育園の統廃合は地域の子育て環境の悪化を示す指標です。",options:[{label:"維持・増加している",score:2},{label:"やや減少している",score:1},{label:"統廃合・閉園の話がある",score:0}]},
      {id:13,category:"公共インフラの質",emoji:"🛣️",text:"道路・歩道・公園など公共インフラの維持管理は行き届いていますか？",hint:"インフラの老朽化放置は地域の魅力低下につながります。",options:[{label:"きれいに整備されている",score:2},{label:"一部老朽化が目立つ",score:1},{label:"ひどい状態・放置されている",score:0}]},
      {id:14,category:"公共インフラの質",emoji:"💡",text:"街灯・防犯カメラなどの整備状況はどうですか？",hint:"防犯設備が整っている地域は犯罪抑止力が高く、住みやすさに貢献します。",options:[{label:"十分に整備されている",score:2},{label:"一部暗い箇所がある",score:1},{label:"街灯が少ない・暗い",score:0}]},
      {id:15,category:"公共インフラの質",emoji:"🌊",text:"洪水・土砂災害などの防災インフラは整備されていますか？",hint:"防災インフラへの投資は行政の本気度を示します。",options:[{label:"堤防・排水・避難施設が整っている",score:2},{label:"一部整備されている",score:1},{label:"未整備・わからない",score:0}]},
    ],
  },

  kakei: {
    titleEmoji:"💴", title:"家計・住居費の\n持続力診断", subtitle:"15の質問で住まいにかかる\nお金の持続力がわかります",
    accent:"#f43f5e", accentDark:"#be123c", accentBg:"#fff1f2", accentBorder:"#fecdd3",
    grad:"linear-gradient(135deg,#f43f5e,#f97316)", wrapBg:"linear-gradient(160deg,#fff1f2 0%,#fff7ed 100%)",
    categoryList:[["🏦","住宅ローン・家賃の負担","3問"],["🔨","修繕・維持費の備え","3問"],["💼","収入・雇用の安定性","3問"],["🛡️","保険・リスク管理","3問"],["👴","老後・将来の資金計画","3問"]],
    categoryComments:{
      "住宅ローン・家賃の負担":{high:"住居費の負担は適正範囲内です。安心できる状態です。",middle:"住居費の負担がやや重めです。金利上昇・収入変動のシミュレーションをおすすめします。",low:"住居費の負担が過大です。返済計画の見直しを早急に検討してください。"},
      "修繕・維持費の備え":{high:"修繕・維持費の備えは十分です。計画的な管理ができています。",middle:"修繕費の積立が不足しています。月々の積立額を見直しましょう。",low:"修繕費の備えがほぼありません。突発的な出費に対応できないリスクがあります。"},
      "収入・雇用の安定性":{high:"収入・雇用は安定しています。緊急時の備えもできています。",middle:"収入の安定性に一部懸念があります。緊急予備資金の確保を優先しましょう。",low:"収入・雇用リスクが高い状態です。住居費支払いへの影響を早急に検討してください。"},
      "保険・リスク管理":{high:"保険・リスク管理は十分です。万一の際も住まいを守れます。",middle:"保険内容に一部不備があります。火災・地震・団信の見直しをおすすめします。",low:"保険・リスク管理が不足しています。万一の際に住居費が払えなくなるリスクがあります。"},
      "老後・将来の資金計画":{high:"老後・将来の資金計画が整っています。安心して住み続けられます。",middle:"老後の住まいにかかる費用の試算をおすすめします。NISAやiDeCoも検討を。",low:"老後の住まい資金が不足するリスクがあります。早急に専門家へ相談することをおすすめします。"},
    },
    nextApps:[
      {id:"taishin",emoji:"🏠",label:"耐震・構造リスク診断"},
      {id:"baikaku",emoji:"💰",label:"売却・資産価値の維持力診断"},
      {id:"community",emoji:"🤝",label:"近隣コミュニティ・人間関係力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["持続力：高い","持続力：普通","持続力：要改善","持続力：危険"]),
    questions:[
      {id:1,category:"住宅ローン・家賃の負担",emoji:"🏦",text:"住宅ローンまたは家賃は月収の何割ですか？",hint:"住居費は手取り月収の25〜30%以内が安全ラインとされています。",options:[{label:"25%未満",score:2},{label:"25〜35%",score:1},{label:"35%超・わからない",score:0}]},
      {id:2,category:"住宅ローン・家賃の負担",emoji:"📉",text:"金利上昇・収入減少があってもローン返済を続けられますか？",hint:"変動金利の場合、1〜2%の金利上昇でも返済額が大幅に増えることがあります。",options:[{label:"余裕がある",score:2},{label:"なんとかなると思う",score:1},{label:"厳しくなる可能性が高い",score:0}]},
      {id:3,category:"住宅ローン・家賃の負担",emoji:"📋",text:"住宅ローンの残債と現在の物件価値を把握していますか？",hint:"残債が物件価値を上回る「オーバーローン」状態は売却・住み替えの選択肢を狭めます。",options:[{label:"把握済み・残債＜物件価値",score:2},{label:"おおよそ把握している",score:1},{label:"把握していない・オーバーローンの可能性あり",score:0}]},
      {id:4,category:"修繕・維持費の備え",emoji:"🔨",text:"10〜20年後の大規模修繕費用を積み立てていますか？",hint:"戸建ての場合、20〜30年で外壁・屋根・設備更新に500〜1000万円かかることも。",options:[{label:"計画的に積み立てている",score:2},{label:"漠然と貯蓄はある",score:1},{label:"特に準備していない",score:0}]},
      {id:5,category:"修繕・維持費の備え",emoji:"🏚️",text:"マンションの修繕積立金は適正額ですか？（戸建ての方は維持費積立で回答）",hint:"修繕積立金が不足しているマンションは将来的な一時金徴収リスクがあります。",options:[{label:"適正額・長期修繕計画あり",score:2},{label:"よくわからない",score:1},{label:"不足している",score:0}]},
      {id:6,category:"修繕・維持費の備え",emoji:"💡",text:"固定資産税・管理費・保険料など毎年の住居維持費を把握していますか？",hint:"住居費はローン・家賃だけでなく、年間維持費も含めて管理することが重要です。",options:[{label:"すべて把握・家計管理している",score:2},{label:"おおよそ把握している",score:1},{label:"把握していない",score:0}]},
      {id:7,category:"収入・雇用の安定性",emoji:"💼",text:"現在の世帯収入は安定していますか？",hint:"収入が不安定な場合、住居費の支払いリスクが高まります。副収入・複数収入源があると安心。",options:[{label:"安定・複数の収入源あり",score:2},{label:"今は安定しているが不安がある",score:1},{label:"不安定・収入が減少している",score:0}]},
      {id:8,category:"収入・雇用の安定性",emoji:"👫",text:"一方の収入が途絶えても住居費を払えますか？",hint:"片働きになった場合のシミュレーションは重要なリスク管理です。",options:[{label:"片働きでも問題なし",score:2},{label:"しばらくは大丈夫",score:1},{label:"すぐに厳しくなる",score:0}]},
      {id:9,category:"収入・雇用の安定性",emoji:"🏦",text:"半年分以上の生活費を緊急予備資金として確保していますか？",hint:"緊急予備資金がないと、収入減・突発的な出費で住居費が払えなくなるリスクがあります。",options:[{label:"6ヶ月分以上確保している",score:2},{label:"3〜6ヶ月分程度",score:1},{label:"3ヶ月未満・ほぼない",score:0}]},
      {id:10,category:"保険・リスク管理",emoji:"🛡️",text:"火災保険・地震保険に加入していますか？",hint:"地震保険は火災保険とセットで加入。未加入だと地震による損害が全額自己負担になります。",options:[{label:"火災・地震ともに加入",score:2},{label:"火災保険のみ",score:1},{label:"未加入・わからない",score:0}]},
      {id:11,category:"保険・リスク管理",emoji:"🏥",text:"住宅ローン返済中に死亡・高度障害になった場合の備えはありますか？",hint:"団体信用生命保険（団信）に加入していれば、死亡時にローンが完済されます。",options:[{label:"団信加入済み・内容把握している",score:2},{label:"加入しているが内容不明",score:1},{label:"未加入・わからない",score:0}]},
      {id:12,category:"保険・リスク管理",emoji:"🤕",text:"病気・ケガで長期間働けなくなった場合の備えはありますか？",hint:"就業不能保険・所得補償保険があると、収入途絶による住居費支払い困難を防げます。",options:[{label:"就業不能保険・所得補償保険あり",score:2},{label:"貯蓄でなんとかなると思う",score:1},{label:"特に備えていない",score:0}]},
      {id:13,category:"老後・将来の資金計画",emoji:"👴",text:"老後も現在の住居に住み続けられる資金計画がありますか？",hint:"年金だけで住居費・維持費を賄えるか、定年前に試算しておくことが重要です。",options:[{label:"試算済み・計画がある",score:2},{label:"漠然と考えている",score:1},{label:"まったく考えていない",score:0}]},
      {id:14,category:"老後・将来の資金計画",emoji:"📊",text:"老後の住み替え・リフォーム・施設入居費用を想定していますか？",hint:"バリアフリーリフォームや老人ホーム入居には数百〜数千万円かかることも。",options:[{label:"試算・積み立て済み",score:2},{label:"おおよそ考えている",score:1},{label:"考えていない",score:0}]},
      {id:15,category:"老後・将来の資金計画",emoji:"🎯",text:"NISAやiDeCoなど資産形成を行っていますか？",hint:"住居費以外の資産形成は、将来的な住まいの選択肢を広げます。",options:[{label:"積極的に活用している",score:2},{label:"一部活用している",score:1},{label:"まったくしていない",score:0}]},
    ],
  },  kinrin: {
    titleEmoji:"🏘️", title:"近隣・街の\n持続力診断", subtitle:"15の質問であなたの街が\nこれからも住み続けられるか診断します",
    accent:"#f97316", accentDark:"#c2410c", accentBg:"#fff7ed", accentBorder:"#fed7aa",
    grad:"linear-gradient(135deg,#f97316,#eab308)", wrapBg:"linear-gradient(160deg,#fff7ed 0%,#fefce8 100%)",
    categoryList:[["👥","人口・コミュニティ","4問"],["🛒","生活インフラ","3問"],["🔒","防犯・安全","2問"],["🏛️","行政・公共サービス","2問"],["🏗️","将来性・開発","4問"]],
    categoryComments:{
      "人口・コミュニティ":{high:"地域コミュニティは活発です。住み続ける力が高い地域です。",middle:"人口・コミュニティに一部懸念があります。地域活動への参加をおすすめします。",low:"地域の衰退が進んでいる可能性があります。将来の住み替えも視野に入れましょう。"},
      "生活インフラ":{high:"生活インフラは充実しています。利便性の高い地域です。",middle:"生活インフラに一部不便な点があります。車なし生活のリスクを確認しましょう。",low:"生活インフラが不足しています。高齢化後の生活に支障が出る可能性があります。"},
      "防犯・安全":{high:"防犯・安全面は良好です。",middle:"防犯に一部懸念があります。自治会の防犯活動への参加をおすすめします。",low:"防犯・安全に問題があります。防犯対策の強化と自治体への相談をおすすめします。"},
      "行政・公共サービス":{high:"行政・公共サービスは安定しています。",middle:"行政サービスに一部懸念があります。自治体の財政情報を確認しましょう。",low:"行政サービスの低下リスクがあります。将来の住み替えも含めた検討をおすすめします。"},
      "将来性・開発":{high:"地域の将来性は明るいです。資産価値の維持・向上が期待できます。",middle:"将来の開発情報を収集しましょう。自治体の都市計画を確認することをおすすめします。",low:"地域の将来性に懸念があります。資産価値の下落リスクを念頭に置いて計画を立てましょう。"},
    },
    nextApps:[
      {id:"suigai", emoji:"🌊",label:"水害・浸水リスク診断"},
      {id:"baikaku",emoji:"💰",label:"売却・資産価値の維持力診断"},
      {id:"kakei",  emoji:"💴",label:"家計・住居費の持続力診断"},
    ],
    getRisk:(s,m)=>defaultRisk(s,m,["持続力：高い","持続力：普通","持続力：要注意","持続力：深刻"]),
    questions:[
      {id:1,category:"人口・コミュニティ",emoji:"👥",text:"近隣の人口（子どもや若い世帯）は増えていますか？",hint:"人口減少・高齢化が進む地域は、将来的に生活インフラが縮小するリスクがあります。",options:[{label:"増えている・若い世帯が多い",score:2},{label:"横ばい",score:1},{label:"明らかに減っている・高齢化が進んでいる",score:0}]},
      {id:2,category:"人口・コミュニティ",emoji:"🏘️",text:"近所に空き家・空き地・廃墟は増えていますか？",hint:"空き家率の上昇は地域の衰退サイン。防犯・衛生・景観への悪影響も懸念されます。",options:[{label:"ほとんどない",score:2},{label:"少し目につく",score:1},{label:"明らかに増えている",score:0}]},
      {id:3,category:"人口・コミュニティ",emoji:"🤝",text:"自治会・町内会の活動は活発ですか？",hint:"地域コミュニティの機能度は防災・防犯・生活の質に直結します。",options:[{label:"活発・参加者が多い",score:2},{label:"一応機能している",score:1},{label:"形骸化・解散寸前",score:0}]},
      {id:4,category:"人口・コミュニティ",emoji:"👶",text:"近くに保育園・学校・公園はありますか？",hint:"子育て環境の充実は若い世帯の流入を促し、地域の持続力を高めます。",options:[{label:"徒歩圏内に充実している",score:2},{label:"車で行ける距離にある",score:1},{label:"少ない・廃校・閉園が進んでいる",score:0}]},
      {id:5,category:"生活インフラ",emoji:"🛒",text:"徒歩圏内にスーパー・コンビニはありますか？",hint:"「買い物難民」リスクのある地域は高齢化とともに住みにくくなります。",options:[{label:"徒歩10分以内にある",score:2},{label:"車で5〜10分程度",score:1},{label:"車で15分以上・ない",score:0}]},
      {id:6,category:"生活インフラ",emoji:"🏥",text:"近くに病院・クリニックはありますか？",hint:"医療アクセスは高齢化社会で住み続ける力の重要な指標です。",options:[{label:"徒歩・自転車圏内にある",score:2},{label:"車で10分程度",score:1},{label:"遠い・減少している",score:0}]},
      {id:7,category:"生活インフラ",emoji:"🚌",text:"公共交通機関（バス・電車）は利用しやすいですか？",hint:"免許返納後も生活できる交通環境は、長く住み続けるための重要条件です。",options:[{label:"徒歩圏内・本数も十分",score:2},{label:"あるが本数が少ない",score:1},{label:"ない・廃線・廃バスになった",score:0}]},
      {id:8,category:"防犯・安全",emoji:"🔒",text:"近隣での空き巣・不審者などの犯罪は多いですか？",hint:"犯罪発生率は地域の資産価値と住みやすさに直接影響します。",options:[{label:"ほとんど聞かない・安全",score:2},{label:"たまに聞く",score:1},{label:"頻繁にある・治安が悪い",score:0}]},
      {id:9,category:"防犯・安全",emoji:"💡",text:"街灯・防犯カメラなどの整備状況はどうですか？",hint:"防犯設備が整っている地域は犯罪抑止力が高く、住みやすさに貢献します。",options:[{label:"十分に整備されている",score:2},{label:"一部暗い箇所がある",score:1},{label:"街灯が少ない・暗い",score:0}]},
      {id:10,category:"行政・公共サービス",emoji:"🏛️",text:"自治体の財政状況は安定していますか？",hint:"財政難の自治体はごみ収集・道路補修など行政サービスが低下するリスクがあります。",options:[{label:"安定している・情報公開されている",score:2},{label:"よくわからない",score:1},{label:"財政難・合併の話がある",score:0}]},
      {id:11,category:"行政・公共サービス",emoji:"🛣️",text:"道路・歩道・公園など公共インフラの維持管理は行き届いていますか？",hint:"インフラの老朽化放置は地域の魅力低下につながります。",options:[{label:"きれいに整備されている",score:2},{label:"一部老朽化が目立つ",score:1},{label:"ひどい状態・放置されている",score:0}]},
      {id:12,category:"将来性・開発",emoji:"🏗️",text:"近隣に再開発・新駅・大型商業施設などの計画はありますか？",hint:"開発計画は地域の将来価値を左右します。自治体HPや都市計画図で確認を。",options:[{label:"開発計画がある・進行中",score:2},{label:"特に情報なし",score:1},{label:"縮小・廃止の情報がある",score:0}]},
      {id:13,category:"将来性・開発",emoji:"🌱",text:"地域の空き家・耕作放棄地対策は進んでいますか？",hint:"空き家対策が進む地域は行政・住民の意識が高く、将来の維持力があります。",options:[{label:"積極的に取り組んでいる",score:2},{label:"一部取り組んでいる",score:1},{label:"ほぼ放置されている",score:0}]},
      {id:14,category:"将来性・開発",emoji:"📊",text:"地域の地価・不動産相場は安定していますか？",hint:"地価の推移は地域の将来性を反映します。国土交通省の地価公示で確認できます。",options:[{label:"横ばい〜上昇",score:2},{label:"緩やかに下落",score:1},{label:"急激に下落している",score:0}]},
      {id:15,category:"将来性・開発",emoji:"🌍",text:"移住・定住促進の取り組みや補助金制度はありますか？",hint:"移住支援が充実している地域は人口流入が期待でき、地域の持続力が高まります。",options:[{label:"充実している・活用した",score:2},{label:"一部ある",score:1},{label:"ない・わからない",score:0}]},
    ],
  },
};

// ============================================================
// ポータルトップ
// ============================================================
const PORTAL_APPS = [
  { id:"taishin", emoji:"🏠", title:"耐震・構造リスク診断", desc:"建築年・基礎・外壁・屋根など\n構造面のリスクを診断", color:"#ef4444", bg:"#fef2f2", border:"#fca5a5" },
  { id:"kiso",    emoji:"🪨", title:"基礎・地盤リスク診断",  desc:"地盤の成り立ち・液状化・\n基礎の状態を診断",     color:"#3b82f6", bg:"#eff6ff", border:"#bfdbfe" },
  { id:"setsubi", emoji:"🔧", title:"設備・インフラ劣化診断", desc:"給排水・電気・ガス・防水など\n設備の劣化リスクを診断", color:"#8b5cf6", bg:"#faf5ff", border:"#ddd6fe" },
  { id:"suigai",  emoji:"🌊", title:"水害・浸水リスク診断",  desc:"洪水・土砂災害・排水・\n保険の備えを診断",     color:"#0ea5e9", bg:"#f0f9ff", border:"#bae6fd" },
  { id:"baikaku", emoji:"💰", title:"売却・資産価値の維持力診断", desc:"建物状態・立地・権利関係など\n売却力・資産価値を診断", color:"#10b981", bg:"#f0fdf4", border:"#a7f3d0" },
  { id:"kakei",  emoji:"💴", title:"家計・住居費の持続力診断", desc:"ローン負担・修繕費・保険・\n老後資金など住まいのお金を診断", color:"#f43f5e", bg:"#fff1f2", border:"#fecdd3" },
  { id:"community", emoji:"🤝", title:"近隣コミュニティ・人間関係力診断", desc:"近所付き合い・助け合い・\n孤立しない力を診断", color:"#8b5cf6", bg:"#faf5ff", border:"#ddd6fe" },
  { id:"machi",     emoji:"🏗️", title:"街の維持力診断", desc:"インフラ・行政・開発・\n人口動向など街の将来力を診断", color:"#0ea5e9", bg:"#f0f9ff", border:"#bae6fd" },
];

function Portal({ onSelect }) {
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#fff9f9 0%,#f0f9ff 50%,#f0fdf4 100%)", fontFamily:"'M PLUS Rounded 1c',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 16px 60px" }}>
      <div style={{ textAlign:"center", marginBottom:32, width:"100%", maxWidth:540 }}>
        {/* 吹き出し「ここに」 */}
        <div style={{ display:"inline-block", position:"relative", marginBottom:18 }}>
          <div style={{ background:"#fff", border:"2.5px solid #f97316", borderRadius:20, padding:"6px 22px", fontSize:20, fontWeight:900, color:"#f97316", fontFamily:"'Yomogi',cursive", boxShadow:"2px 3px 0px #fed7aa" }}>
            ここに
          </div>
          <div style={{ position:"absolute", bottom:-12, left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"10px solid transparent", borderRight:"10px solid transparent", borderTop:"12px solid #f97316" }}/>
        </div>
        <div style={{ fontSize:48, marginBottom:10 }}>🏡</div>
        <h1 style={{ fontFamily:"'Yomogi',cursive", fontSize:26, color:"#374151", lineHeight:1.4, marginBottom:4 }}>「住まう力」セルフ診断（無料）</h1>
        <div style={{ textAlign:"right", marginBottom:10 }}>
          <span style={{ fontSize:10, color:"#9ca3af", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>マンション管理士監修</span>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:10 }}>
          <span style={{ background:"#fef9c3", border:"1.5px solid #fde047", borderRadius:20, padding:"4px 12px", fontSize:13, color:"#854d0e", fontWeight:800, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>🆓 全8診断・完全無料</span>
          <span style={{ background:"#f0fdf4", border:"1.5px solid #86efac", borderRadius:20, padding:"4px 12px", fontSize:13, color:"#15803d", fontWeight:800, fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>登録不要</span>
        </div>
        <p style={{ fontSize:14, color:"#9ca3af", lineHeight:1.7 }}>気になる診断をタップするだけ！<br/>結果はすぐにわかります🏡</p>
      </div>

      <div style={{ width:"100%", maxWidth:540, display:"flex", flexDirection:"column", gap:12, marginBottom:28 }}>
        {PORTAL_APPS.map(app => (
          <button key={app.id} id={"app-"+app.id} onClick={()=>onSelect(app.id)}
            style={{ width:"100%", background:"#fff", border:`2.5px solid ${app.border}`, boxShadow:`3px 4px 0px ${app.border}`, borderRadius:20, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", textAlign:"left" }}
            onMouseDown={e=>{e.currentTarget.style.transform="translateY(2px)";e.currentTarget.style.boxShadow="none";}}
            onMouseUp={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`3px 4px 0px ${app.border}`;}}
            onTouchStart={e=>{e.currentTarget.style.transform="translateY(2px)";e.currentTarget.style.boxShadow="none";}}
            onTouchEnd={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`3px 4px 0px ${app.border}`;}}
          >
            <div style={{ width:52, height:52, borderRadius:16, background:app.bg, border:`2px solid ${app.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{app.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800, color:"#1f2937", marginBottom:3 }}>{app.title}</div>
              <div style={{ fontSize:12, color:"#9ca3af", lineHeight:1.6, whiteSpace:"pre-line" }}>{app.desc}</div>
              <div style={{ display:"flex", gap:8, marginTop:6 }}>
                <span style={{ fontSize:11, color:app.color, fontWeight:700, background:app.bg, borderRadius:20, padding:"2px 8px" }}>15問</span>
                <span style={{ fontSize:11, color:app.color, fontWeight:700, background:app.bg, borderRadius:20, padding:"2px 8px" }}>約5分</span>
              </div>
            </div>
            <div style={{ fontSize:20, color:app.color, flexShrink:0, fontWeight:800 }}>›</div>
          </button>
        ))}
      </div>

      <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", maxWidth:540, background:"linear-gradient(135deg,#06c755,#00a040)", border:"2px solid #04a844", boxShadow:"3px 4px 0px #027a30", borderRadius:16, padding:"14px 18px", marginBottom:16, textDecoration:"none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28 }}>💬</span>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:"#fff", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>診断結果の解説を受け取る（無料）</div>
            <div style={{ fontSize:11, color:"#d1fae5", fontFamily:"'M PLUS Rounded 1c',sans-serif" }}>お友だち追加だけ・料金一切なし</div>
          </div>
        </div>
        <span style={{ fontSize:13, fontWeight:800, color:"#fff", fontFamily:"'M PLUS Rounded 1c',sans-serif", whiteSpace:"nowrap" }}>無料で追加 →</span>
      </a>
      <p style={{ textAlign:"center", fontSize:12, color:"#d1d5db" }}>※ 各診断は簡易的な目安です。正確な診断は専門家にご相談ください。</p>
    </div>
  );
}

// ============================================================
// メインルーター
// ============================================================
export default function App() {
  const [current, setCurrent] = useState(null);
  const [sessionKey, setSessionKey] = useState(0);

  function handleSelect(id) {
    setCurrent(id);
    setSessionKey(k => k + 1); // 毎回新しいkeyで強制リマウント
    window.scrollTo({top:0, behavior:"smooth"});
  }

  return (
    <>
      <style>{FONTS}</style>
      {current === null
        ? <Portal onSelect={handleSelect} />
        : <DiagnosticApp key={sessionKey} config={CONFIGS[current]} onBack={()=>{ setCurrent(null); window.scrollTo({top:0,behavior:"smooth"}); }} onSelect={handleSelect} />
      }
    </>
  );
}
