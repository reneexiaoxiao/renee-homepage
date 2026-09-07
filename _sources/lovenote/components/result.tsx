'use client';
/* oxlint-disable next/no-img-element -- Native images preserve same-origin PNG export and long-press saving. */
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download, Heart, ImageIcon, LoaderCircle, RefreshCw, Share2, X } from 'lucide-react';
import { getFontEmbedCSS, toBlob } from 'html-to-image';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { VALUES } from '@/lib/values';
import { assetUrl } from '@/lib/assets';

const CARD_WIDTH = 540;
const CARD_HEIGHT = 900;

export function Result({order,onBack}:{order:number[];onBack:()=>void}) {
  const [name,setName] = useState('');
  const [date,setDate] = useState('');
  const [scale,setScale] = useState(1);
  const [imageUrl,setImageUrl] = useState('');
  const [imageBlob,setImageBlob] = useState<Blob|null>(null);
  const [busy,setBusy] = useState(true);
  const [error,setError] = useState('');
  const [feedback,setFeedback] = useState('');
  const [imageOpen,setImageOpen] = useState(false);
  const [attempt,setAttempt] = useState(0);
  const [canShare,setCanShare] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [mobile,setMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fontCssRef = useRef<Promise<string> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ordered = order.map(id=>VALUES[id]);
  useEffect(() => {
    // oxlint-disable-next-line react/react-compiler -- Device date and nickname are synchronized after hydration.
    setDate(new Date().toLocaleDateString('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}).replaceAll('/','.'));
    try {setName((localStorage.getItem('love-note-name') || '').slice(0,16));} catch { /* No storage required. */ }
    setLoaded(true);
    const query = window.matchMedia('(max-width: 720px)');
    const updateMobile = () => setMobile(query.matches);
    updateMobile();
    query.addEventListener('change',updateMobile);
    const observer = new ResizeObserver(entries => setScale(Math.min(1,entries[0].contentRect.width/CARD_WIDTH)));
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => {observer.disconnect();query.removeEventListener('change',updateMobile);};
  },[]);
  useEffect(() => {
    if (!loaded || order.length !== 11) return;
    let cancelled = false;
    let objectUrl = '';
    // oxlint-disable-next-line react/react-compiler -- Invalidate the previous async export when its input changes.
    setBusy(true);setError('');setImageBlob(null);setImageUrl('');setFeedback('');
    const timeout = window.setTimeout(async () => {
      try {
        if (!cardRef.current) return;
        await document.fonts.load('30px "Love Hand"',name.trim() || '我');
        await document.fonts.load('22px "Love Script"','with love, from me.');
        await document.fonts.ready;
        await Promise.all(Array.from(cardRef.current.querySelectorAll('img')).map(img => img.decode()));
        fontCssRef.current ??= getFontEmbedCSS(cardRef.current);
        const fontEmbedCSS=await fontCssRef.current;
        const blob = await toBlob(cardRef.current,{width:CARD_WIDTH,height:CARD_HEIGHT,pixelRatio:2,fontEmbedCSS,cacheBust:false,backgroundColor:'#fffcf5'});
        if (!blob) throw new Error('Empty export');
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);setImageBlob(blob);
        setCanShare(Boolean(navigator.canShare?.({files:[new File([blob],'我的爱的排序.png',{type:'image/png'})]})));
      } catch { fontCssRef.current=null; if (!cancelled) setError('图片暂时没能生成。可以重试，或直接截图保存。'); }
      finally { if (!cancelled) setBusy(false); }
    },350);
    return () => {cancelled=true;window.clearTimeout(timeout);if(objectUrl) URL.revokeObjectURL(objectUrl);};
  },[name,date,order,attempt,loaded]);
  function changeName(value:string) {
    setName(value);
    try {localStorage.setItem('love-note-name',value);} catch { /* No storage required. */ }
  }
  function download() {
    if (!imageUrl || busy) return;
    const link = document.createElement('a');link.href=imageUrl;link.download=`${name.trim() || '我'}的爱的排序.png`;document.body.appendChild(link);link.click();link.remove();
    setFeedback('图片已发起下载；手机也可以查看大图后长按保存。');
  }
  async function share() {
    if (!imageBlob) return;
    try {await navigator.share({files:[new File([imageBlob],'我的爱的排序.png',{type:'image/png'})],title:'我的爱的排序'});}
    catch (err) {if (!(err instanceof Error && err.name==='AbortError')) setFeedback('暂时无法分享，可以先保存图片。');}
  }
  return (
    <section className="result-layout">
      <div className="letter-stage">
        <div className="letter-stage-top"><span>MY LOVE LANGUAGE</span><span>一封给自己的情书</span></div>
        <div ref={wrapRef} className="letter-frame" style={{height:CARD_HEIGHT*scale}}>
          <div className="letter-scale" style={{transform:`scale(${scale})`}}>
            <div ref={cardRef} className="share-letter" aria-label="我的爱的排序分享卡">
              <div className="letter-brand"><span><Heart size={14} fill="currentColor"/>爱的排序</span><span>{date}</span></div>
              <div className="letter-hero"><div><span className="letter-kicker">A NOTE TO MY HEART</span><h2>在爱里，<br/>我最在意的顺序。</h2></div><img src={assetUrl('heart-illustration.jpg')} alt="" width="170" height="170"/></div>
              <div className="letter-section-label"><span>最靠近我的心</span><span>MY TOP 3</span></div>
              <ol className="letter-top-three">{ordered.slice(0,3).map((value,index)=><li key={value.id}><span className="letter-rank">0{index+1}</span><div><strong>{value.title}</strong></div>{index===0 && <Heart size={23} strokeWidth={1.2}/>}</li>)}</ol>
              <div className="letter-section-label rest-label"><span>接下来，也是我的在意</span><span>04 — 11</span></div>
              <ol className="letter-rest" start={4}>{ordered.slice(3).map((value,index)=><li key={value.id}><span>{String(index+4).padStart(2,'0')}</span><strong>{value.title}</strong></li>)}</ol>
              <div className="letter-closing"><p>这个顺序，只代表此刻的我。</p><div><span className={`signature ${name.trim().length > 8 ? 'signature-long' : ''}`}>{name.trim() || '我'}</span><span className="with-love">with love,<br/>from me.</span></div></div>
              <div className="letter-foot"><span>11 种表达 · 没有标准答案</span><Heart size={12}/><span>renezhang.fun/lovenote</span></div>
            </div>
          </div>
        </div>
      </div>
      <aside className="result-controls">
        <div className="eyebrow"><span className="tiny-line"/> SEALED WITH LOVE</div>
        <h1 tabIndex={-1}>这就是，<br/><span className="ink-emphasis">我的爱的语言。</span></h1>
        <p className="result-lead">把这份在意留给自己，<br/>也分享给想更懂你的人。</p>
        <div className="signature-field"><label htmlFor="signature">落个款 <span>选填</span></label><input id="signature" maxLength={16} value={name} onChange={event=>changeName(event.target.value)} placeholder="你的名字或昵称" autoComplete="off"/></div>
        <div className="result-actions">
          <button className="primary-button" disabled={busy || !imageUrl} onClick={()=>mobile ? setImageOpen(true) : download()}>{busy ? <LoaderCircle className="spin" size={17}/> : <Download size={17}/>} {busy ? '正在准备图片…' : mobile ? '保存图片' : '保存我的情书'}</button>
          <div className="secondary-actions"><button className="outline-button open-image-button" disabled={busy || !imageUrl} onClick={()=>setImageOpen(true)}><ImageIcon size={16}/>查看大图</button>{canShare && <button className="outline-button" disabled={busy || !imageBlob} onClick={share}><Share2 size={16}/>分享图片</button>}</div>
          {error && <div className="export-error" role="alert"><p>{error}</p><button className="text-button" onClick={()=>setAttempt(value=>value+1)}><RefreshCw size={14}/>重试生成</button></div>}
          {feedback && <output className="save-feedback">{feedback}</output>}
          <span className="save-hint">保存完整图片，也可以直接截图分享</span>
        </div>
        <button className="text-button back-button" onClick={onBack}><ArrowLeft size={15}/>再调整一下顺序</button>
      </aside>
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="image-dialog" showCloseButton={false}>
          <div className="image-dialog-heading"><DialogTitle>我的爱的排序</DialogTitle><DialogClose className="icon-button" aria-label="关闭大图"><X size={20}/></DialogClose></div>
          <DialogDescription>手机长按图片保存，电脑可右键另存为。</DialogDescription>
          {imageUrl && <img src={imageUrl} alt={`${name.trim() || '我'}的爱的排序：${ordered.map((value,index)=>`${index+1} ${value.title}`).join('、')}`} width="1080" height="1800"/>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
