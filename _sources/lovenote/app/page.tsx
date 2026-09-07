'use client';
/* oxlint-disable next/no-img-element -- Same-origin raster assets also appear in the downloadable result. */
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Gift, GripVertical, HandHeart, Heart, HeartHandshake, MessageCircleHeart, Plus, Scale, ShieldCheck, Sprout, Sun, Undo2, Wind, X, Clock3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { VALUES, moveItem } from '@/lib/values';
import { Result } from '@/components/result';
import { assetUrl } from '@/lib/assets';

const icons = [MessageCircleHeart, Clock3, Heart, HandHeart, Gift, ShieldCheck, Wind, Sun, Sprout, Scale, HeartHandshake];
type Stage = 'choose' | 'sort' | 'result';

export default function Home() {
  const [selected, setSelected] = useState<number[]>([]);
  const [stage, setStage] = useState<Stage>('choose');
  const [dragging, setDragging] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [ready, setReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const noteRef = useRef<HTMLElement>(null);
  const done = selected.length === VALUES.length;
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('love-note-progress') || 'null');
      if (saved && Array.isArray(saved.order) && saved.order.length <= 11 && new Set(saved.order).size === saved.order.length && saved.order.every((id: unknown) => Number.isInteger(id) && Number(id) >= 0 && Number(id) < 11)) {
        // oxlint-disable-next-line react/react-compiler -- Restore browser storage only after hydration.
        setSelected(saved.order);
        if (saved.order.length === 11 && ['sort','result'].includes(saved.stage)) setStage(saved.stage);
      }
    } catch { /* Progress is optional when browser storage is unavailable. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem('love-note-progress', JSON.stringify({order:selected,stage})); } catch { /* The game stays usable without storage. */ }
  }, [selected,stage,ready]);
  useEffect(() => {
    type Context = { registerTool: (tool: object, options: {signal:AbortSignal}) => void | Promise<void> };
    const context = (document as Document & {modelContext?:Context}).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name:'set_love_ranking', title:'设置爱的表达顺序',
      description:`按提供的顺序排列全部 11 项爱的表达并显示结果卡。只更改本页和本机进度，不下载图片或向其他人发送。${VALUES.map(value=>`${value.id} ${value.title}`).join('；')}`,
      inputSchema:{type:'object',properties:{order:{type:'array',items:{type:'integer',minimum:0,maximum:10},minItems:11,maxItems:11,uniqueItems:true}},required:['order'],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute(input:unknown) {
        const order = (input as {order?:unknown})?.order;
        if (!Array.isArray(order) || order.length !== 11 || new Set(order).size !== 11 || !order.every(id => Number.isInteger(id) && id >= 0 && id < 11)) throw new Error('请提供 0 到 10 的完整顺序，每项恰好出现一次。');
        flushSync(() => {setSelected([...order]);setStage('result');});
        return {order:order.map(id => VALUES[id].title),stage:'result',shared:false};
      },
    };
    try { void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(() => {}); } catch { /* Unsupported registries do not affect the game. */ }
    return () => lifecycle.abort();
  }, []);
  function toggle(id: number) { setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]); }
  function move(id: number, to: number) { setSelected(current => moveItem(current, id, to)); setAnnouncement(`${VALUES[id].title}，第 ${to + 1} 位`); }
  useEffect(() => {
    if (dragging === null) return;
    const dragMove = (event:PointerEvent) => {
      const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-rank]'));
      const over = rows.find(row => {const rect=row.getBoundingClientRect();return event.clientY >= rect.top && event.clientY <= rect.bottom;});
      if (over) {
        const target=Number(over.dataset.rank);
        setSelected(current=>moveItem(current,dragging,target));
        setAnnouncement(`${VALUES[dragging].title}，第 ${target+1} 位`);
      }
      if(event.clientY > window.innerHeight-80) window.scrollBy(0,14);
      if(event.clientY < 100) window.scrollBy(0,-14);
    };
    const end = () => setDragging(null);
    window.addEventListener('pointermove',dragMove);
    window.addEventListener('pointerup',end);
    window.addEventListener('pointercancel',end);
    window.addEventListener('blur',end);
    return () => {window.removeEventListener('pointermove',dragMove);window.removeEventListener('pointerup',end);window.removeEventListener('pointercancel',end);window.removeEventListener('blur',end);};
  },[dragging]);
  function goTo(next: Stage) { setStage(next); window.scrollTo({ top: 0, behavior: 'instant' }); setTimeout(() => headingRef.current?.focus(), 0); }
  return (
    <div className={`site-shell stage-${stage}`}>
      <header className="site-header">
        <button className="wordmark" onClick={()=>goTo('choose')} aria-label="返回选择爱的语言"><Heart size={21} strokeWidth={1.7} /><span>爱的排序</span><span className="wordmark-en">THE LOVE NOTE</span></button>
        <div className="header-note">一份此刻的，在意清单</div>
      </header>
      <main>
        {stage !== 'result' && <>
        <section className="intro">
          <div className="intro-copy">
            <div className="eyebrow"><span className="tiny-line" /> A LITTLE CLOSER TO MY HEART</div>
            <h1 ref={headingRef} tabIndex={-1}>{stage === 'choose' ? <>在爱里，我<span className="ink-emphasis">最在意</span>…</> : <>把心里的<span className="ink-emphasis">顺序</span>，排好。</>}</h1>
            <p>{stage === 'choose' ? '从最重要的开始，依次点选这 11 种爱的表达。' : <>越在意，越靠前。<span className="drag-tip">拖动卡片或</span>点击箭头调整。</>}</p>
          </div>
          <div className="intro-art"><img src={assetUrl('heart-illustration.jpg')} alt="" width="230" height="230"/><span>love, in your own words.</span></div>
        </section>
        <nav className="steps" aria-label="游戏进度">
          <span className={stage === 'choose' ? 'current' : 'complete'}><i>{stage === 'choose' ? '01' : <Check size={13}/>}</i>凭心选择</span><span className="step-line"/><span className={stage === 'sort' ? 'current' : ''}><i>02</i>排出顺序</span><span className="step-line"/><span><i>03</i>留张情书</span>
        </nav></>}
        {stage === 'choose' ? (
          <div className="workspace">
            <section className="choices" aria-label="11 种爱的表达">
              <div className="section-top"><h2>{done ? '你的 11 份在意，都已选好' : <>下一项，第 <span>{selected.length + 1}</span> 重要的是？</>}</h2><span>再点一次可取消</span></div>
              <div className="choice-grid">
                {VALUES.map((value, index) => { const rank = selected.indexOf(value.id); const Icon = icons[index]; return (
                  <button key={value.id} aria-pressed={rank >= 0} className={`choice-card ${rank >= 0 ? 'is-chosen' : ''}`} onClick={() => toggle(value.id)}>
                    <span className="choice-card-top"><Icon size={23} strokeWidth={1.45}/><span className="choice-add">{rank >= 0 ? String(rank + 1).padStart(2,'0') : <Plus size={17}/>}</span></span>
                    <strong>{value.title}</strong>
                  </button>
                ); })}
                <div className="choice-footnote"><Heart size={20} strokeWidth={1.2}/><span>按此刻的心意来，<br/>没有标准答案。</span></div>
              </div>
            </section>
            <aside ref={noteRef} className="ranking-note" aria-label="已选顺序">
              <div className="note-top"><span>MY LITTLE PRIORITIES</span><Heart size={18}/></div>
              <div className="note-heading"><h2>我的在意清单</h2><span>{String(selected.length).padStart(2,'0')} <small>/ 11</small></span></div>
              <Progress value={selected.length} max={11} aria-label="已选择的项数" className="selection-progress"/>
              {selected.length ? <ol className="selected-list">{selected.map((id, index) => <li key={id}><span className="list-number">{String(index+1).padStart(2,'0')}</span><span>{VALUES[id].title}</span><button className="icon-button" onClick={() => toggle(id)} aria-label={`取消${VALUES[id].title}`}><X size={14}/></button></li>)}</ol> : <div className="empty-note"><HeartHandshake size={43} strokeWidth={1}/><p>还没落笔</p><span>先选出你最在意的一项，<br/>把它放在心里的第一位。</span></div>}
              <div className="note-actions"><button className="primary-button" disabled={!done} onClick={() => goTo('sort')}>{done ? '调整我的顺序' : `还差 ${11-selected.length} 项`}<ArrowRight size={17}/></button>{selected.length > 0 && <button className="text-button" onClick={() => setSelected(current => current.slice(0,-1))}><Undo2 size={14}/>撤回上一项</button>}</div>
              <div className="note-bottom">WITH LOVE, FROM ME.</div>
            </aside>
          </div>
        ) : stage === 'sort' ? (
          <div className="sort-workspace">
            <section className="sort-section" aria-label="调整重要程度">
              <div className="section-top"><h2>我的 11 份在意</h2><span>从更重要到相对靠后 <ArrowDown size={13}/></span></div>
              <ol className="sort-list">{selected.map((id, index) => <li key={id} data-rank={index} className={`${index < 3 ? 'top-choice' : ''} ${dragging === id ? 'is-dragging' : ''}`}>
                <span className="sort-number">{String(index+1).padStart(2,'0')}</span>
                <div className="sort-copy"><strong>{VALUES[id].title}</strong></div>
                <div className="move-buttons"><button className="icon-button" disabled={index === 0} onClick={() => move(id,index-1)} aria-label={`上移${VALUES[id].title}`}><ArrowUp size={15}/></button><button className="icon-button" disabled={index === selected.length-1} onClick={() => move(id,index+1)} aria-label={`下移${VALUES[id].title}`}><ArrowDown size={15}/></button></div>
                <button className="drag-handle" aria-label={`拖动${VALUES[id].title}，方向键调整顺序`} onPointerDown={event => {event.preventDefault();setDragging(id);}} onKeyDown={event => { if(event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); move(id, Math.max(0,Math.min(10,index+(event.key === 'ArrowUp' ? -1 : 1)))); } }}><GripVertical size={20}/></button>
              </li>)}</ol>
              <button className="text-button back-button" onClick={() => goTo('choose')}><ArrowLeft size={15}/>返回选择</button>
            </section>
            <aside className="sort-summary">
              <span className="eyebrow">CLOSEST TO MY HEART</span><h2>最靠近心的<br/>那三件事。</h2>
              <div className="top-three">{selected.slice(0,3).map((id,index) => <div key={id}><span>0{index+1}</span><strong>{VALUES[id].title}</strong></div>)}</div>
              <p>每一项都值得拥有，<br/>只是此刻，我更在意这些。</p>
              <button className="primary-button" onClick={() => goTo('result')}>生成我的情书<ArrowRight size={17}/></button>
            </aside>
          </div>
        ) : <Result order={selected} onBack={() => goTo('sort')}/>}
      </main>
      {stage === 'choose' && <nav className="mobile-game-dock" aria-label="选择进度与下一步">
        <button className="mobile-progress" disabled={!selected.length} onClick={()=>noteRef.current?.scrollIntoView({behavior:'smooth',block:'start'})}><strong>已选 {selected.length}<span> / 11</span></strong><small>查看清单</small></button>
        <button className="icon-button mobile-undo" disabled={!selected.length} aria-label="撤回最后选择" onClick={()=>setSelected(current=>current.slice(0,-1))}><Undo2 size={19}/></button>
        <button className="primary-button" disabled={!done} onClick={()=>goTo('sort')}>{done ? '排出我的顺序' : `还差 ${11-selected.length} 项`}<ArrowRight size={18}/></button>
      </nav>}
      {stage === 'sort' && <nav className="mobile-game-dock mobile-sort-dock" aria-label="确认排序">
        <button className="text-button" onClick={()=>goTo('choose')}><ArrowLeft size={17}/>返回选择</button>
        <button className="primary-button" onClick={()=>goTo('result')}>生成我的情书<ArrowRight size={18}/></button>
      </nav>}
      <footer className="site-footer"><span>11 种表达 · 一份只属于你的顺序</span><span>爱有很多种语言，你的每一种都算数。<Heart size={13}/></span></footer>
      <output className="sr-only">{announcement}</output>
    </div>
  );
}
