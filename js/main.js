const $=s=>document.querySelector(s);
const ASK={
DGCA:{h:['Subject','Knowledge','Skills','Attitude'],r:[['Air Navigation','Charts, flight planning','Mental maths, time/fuel/distance','Decision making'],['Meteorology','Weather theory','Weather interpretation','Threat awareness'],['Air Law','Rules','Scenario judgement','Professional behaviour'],['Technical General','Aircraft systems','Problem solving','SOP discipline'],['RTR','Radio','Communication','CRM'],['Performance','Calculations','Quick estimation','Safety mindset']],f:'Mental arithmetic, scenario-based questions, Threat and Error Management, workload management and communication.'},
FAA:{h:['FAA area','ASK skill developed'],r:[['Flight planning','Decision making'],['Weather briefing','Situational awareness'],['Oral exams','Communication'],['Checkride','Application of knowledge'],['Cross-country planning','Workload management'],['Performance planning','Mental maths']],f:'Real-world decision making, scenario training, practical application and pilot judgement.'},
EASA:{h:['EASA subject','ASK competency'],r:[['Flight planning','Problem solving'],['General navigation','Mental maths'],['Human performance','Situational awareness'],['Operational procedures','TEM'],['Communications','CRM'],['Meteorology','Decision making']],f:'KSA preparation (Area 100), scenario-based assessments, airline competency training, TEM and CRM.'}};
const tabs=$('.tabs');
function show(k){tabs.querySelectorAll('button').forEach(b=>{const on=b.dataset.k===k;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});$('#panel').setAttribute('aria-labelledby','tab-'+k);
const d=ASK[k];$('#panel').innerHTML='<table><thead><tr>'+d.h.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+d.r.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
$('#focus').innerHTML='<b>Focus:</b> '+d.f}
Object.keys(ASK).forEach(k=>{const b=document.createElement('button');b.setAttribute('role','tab');b.id='tab-'+k;b.setAttribute('aria-controls','panel');b.dataset.k=k;b.textContent=k;b.onclick=()=>show(k);
b.onkeydown=e=>{const ks=Object.keys(ASK),i=ks.indexOf(k);let n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:null;if(n===null)return;e.preventDefault();n=(n+ks.length)%ks.length;show(ks[n]);tabs.children[n].focus()};tabs.append(b)});
show('DGCA');
let ans=0,sc=0,tot=0;const R=a=>a[Math.floor(Math.random()*a.length)];
function nq(){const t=R([10,15,20,25,30,40,45]);let q;
if(Math.random()<.5){const r=R([2,3,4,5,6,7]);ans=t;q='Groundspeed '+r*60+' kt. How many minutes to fly '+r*t+' NM?'}
else{const f=R([1200,1800,2400,3000,3600]),m=R([10,20,30,40,45,50]);ans=f*m/60;q='Fuel flow '+f+' kg/h. How many kg of fuel in '+m+' minutes?'}
$('#q').textContent=q;$('#ans').value='';$('#fb').textContent=''}
$('#chk').onclick=()=>{if($('#ans').value==='')return;tot++;if(Number($('#ans').value)===ans){sc++;$('#fb').textContent='Correct. '+sc+' of '+tot+' right so far.'}else $('#fb').textContent='Not quite. The answer is '+ans+'. '+sc+' of '+tot+' right so far.'};
$('#nx').onclick=nq;$('#ans').onkeydown=e=>{if(e.key==='Enter')$('#chk').click()};nq();
const AL='Alfa Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliett Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu'.split(' '),DG='Zero Wun Too Tree Fower Fife Six Seven Eight Niner'.split(' ');
const ph=$('#ph'),po=$('#po');function sp(){po.textContent=[...ph.value.toLowerCase()].map(c=>{const k=c.charCodeAt(0);return k>=97&&k<=122?AL[k-97]:k>=48&&k<=57?DG[k-48]:null}).filter(Boolean).join(' · ')||'Type letters or numbers'}
ph.oninput=sp;sp();
const z=$('#z'),zt=()=>{const d=new Date();z.textContent='Zulu '+String(d.getUTCHours()).padStart(2,'0')+String(d.getUTCMinutes()).padStart(2,'0')+'Z'};zt();setInterval(zt,15000);
const links=[...document.querySelectorAll('nav a[href^="#"]')],io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['journey','ask','career','about'].forEach(id=>io.observe($('#'+id)));
const ic=d=>'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d.split('|').map(p=>'<path d="'+p+'"/>').join('')+'</svg>';
const PI=['M9 3h6v3H9z|M7 5H5v16h14V5h-2|M9 13l2 2 4-4','M4 5h16v11H9l-5 4z|M8 9h8|M8 12h5','M4 4h7v7H4z|M13 4h7v7h-7z|M4 13h7v7H4z|M17 13l3 7h-6z','M3 5h18v11H3z|M8 20h8|M12 16v4','M3 6h18|M3 11h18|M3 16h18','M3 4h18|M3 9h18|M3 14h18|M3 19h18'];
const SI=['M3 6h12v12H3z|M15 10l6-3v10l-6-3','M5 4h14v16H5z|M9 9h6|M9 13h6|M9 17h3','M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z|M12 6v14','M8 8a3 3 0 100-6 3 3 0 000 6z|M2 20c0-4 3-6 6-6s6 2 6 6|M17 9a2.5 2.5 0 100-5|M16 14c3 0 6 2 6 6','M12 21a9 9 0 100-18 9 9 0 000 18z|M12 8v8|M8 12h8','M3 5h18v14H3z|M7 10h4|M7 14h6|M16 10v4','M4 20l6-8 4 4 6-10|M16 6h4v4'];
document.querySelectorAll('.panel').forEach((p,i)=>p.insertAdjacentHTML('afterbegin',ic(PI[i])));
document.querySelectorAll('.svc dt').forEach((d,i)=>d.insertAdjacentHTML('afterbegin',ic(SI[i])));
const RI=['M12 21a9 9 0 100-18 9 9 0 000 18z|M15 9l-2 5-4 1 2-5z','M5 4h14v16H5z|M9 9l2 2 3-3|M9 15h6','M12 21a9 9 0 100-18 9 9 0 000 18z|M12 8v8|M8 12h8','M3 5h18v14H3z|M7 10h4|M7 14h6|M16 10v4','M12 21a9 9 0 100-18 9 9 0 000 18z|M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2-2-.5-2.5-1.5|M12 5v2|M12 17v2','M4 20l6-8 4 4 6-10|M16 6h4v4'];
document.querySelectorAll('.road .dot').forEach((d,i)=>d.innerHTML=ic(RI[i]));
const DIAL='<svg class="gauge2" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="#0A1626" stroke="#8FA4BA" stroke-width="3"/><circle cx="100" cy="100" r="78" fill="none" stroke="#3A5573" stroke-width="10" stroke-dasharray="3 12.3"/><line class="nd" x1="100" y1="100" x2="100" y2="34" stroke="#F2A33A" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="5" fill="#F2A33A"/></svg>';
document.querySelectorAll('.deck figure').forEach(f=>f.insertAdjacentHTML('afterbegin',DIAL));

const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Fill these in when real destinations exist; CTAs and contact block wire up automatically.
const C=window.AIRGEN_CONFIG={enrolUrl:'',demoUrl:'',whatsapp:'917569512222',email:'',phone:'+917569512222',phoneText:'+91 75695 12222'};
if(C.demoUrl)document.querySelectorAll('[data-cta="demo"]').forEach(a=>{a.href=C.demoUrl;a.target='_blank';a.rel='noopener'});
$('#df').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),t='Demo call request: '+f.get('n')+', '+f.get('p')+', '+f.get('w')+', preferred time: '+f.get('t'),m=$('#dm');
if(C.demoUrl){open(C.demoUrl,'_blank','noopener');m.textContent='Opening the booking page.'}
else if(C.whatsapp){open('https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(t),'_blank','noopener');m.innerHTML='Opening WhatsApp with your request. Prefer a call now? <a href="tel:'+C.phone+'">Tap to call</a>.'}
else if(C.email){location.href='mailto:'+C.email+'?subject='+encodeURIComponent('15-minute demo call request')+'&body='+encodeURIComponent(t)}
else m.textContent='Demo booking is not switched on yet. Please check back soon.'};
if(C.enrolUrl)document.querySelectorAll('[data-cta="enrol"]').forEach(a=>{a.href=C.enrolUrl;a.textContent='Enrol with Airgen'});
if(C.email||C.phone){const c=$('#contact');c.hidden=false;c.innerHTML=(C.email?'<a href="mailto:'+C.email+'">'+C.email+'</a>':'')+(C.phone?'<a href="tel:'+C.phone+'">'+(C.phoneText||C.phone)+'</a>':'')}
const nav=$('nav'),fl=$('#fl');let tgt=0,cur=0;
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight;tgt=m>0?scrollY/m:0;$('.sp').style.transform='scaleX('+tgt+')';nav.classList.toggle('solid',scrollY>innerHeight*.7);if(rm)cur=tgt};
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
(function tick(){cur+=(tgt-cur)*.12;fl.textContent='FL'+String(Math.round(cur*39)*10).padStart(3,'0');requestAnimationFrame(tick)})();
const path=$('#fp'),pl=$('#pl'),L=path.getTotalLength();
function plane(p){const t=path.getPointAtLength(L*p),a=path.getPointAtLength(Math.max(0,L*p-1)),b=path.getPointAtLength(Math.min(L,L*p+1));pl.setAttribute('transform','translate('+t.x+' '+t.y+') rotate('+Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+') scale(1.4)')}
if(rm||!window.gsap||!window.ScrollTrigger){document.documentElement.classList.add('rm');document.body.classList.add('rm');
document.querySelectorAll('.stage').forEach(s=>s.classList.add('on'));plane(1);$('#track').style.flexWrap='wrap';document.querySelectorAll('.road li').forEach(l=>l.classList.add('on'));$('.road ol').style.setProperty('--w','83.4%')}
else{
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
gsap.from('.hero h1 .ln span',{yPercent:110,duration:1.1,stagger:.14,ease:'power3.out'});
gsap.from('.hero p,.hero .cta',{opacity:0,y:20,duration:.9,delay:.7,stagger:.15});
[['.l1',-8],['.l2',-18],['.l3',-30]].forEach(([s,y])=>gsap.to(s,{y:y*3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}}));
gsap.to('.hero .wrap',{yPercent:-12,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
// word-by-word reveal
const rv=$('.reveal'),words=rv.textContent.trim().split(/\s+/);
rv.innerHTML=words.map(w=>'<span class="w">'+w+'</span>').join(' ');
gsap.fromTo('.reveal .w',{opacity:.16},{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:rv,start:'top 80%',end:'bottom 45%',scrub:true}});

// pinned journey
path.style.strokeDasharray=L;path.style.strokeDashoffset=L;plane(0);
const st=[...document.querySelectorAll('.stage')];
ScrollTrigger.create({trigger:'.journey',start:'top top',end:'+=2400',pin:true,scrub:true,onUpdate:s=>{const p=s.progress;
path.style.strokeDashoffset=L*(1-p);plane(p);const i=p<.34?0:p<.67?1:2;$('.journey').dataset.s=i;st.forEach((e,k)=>e.classList.toggle('on',k===i))}});
gsap.utils.toArray('.ask h2,.hz .head h2,.values h2,.svc h2,footer h2').forEach(h=>gsap.fromTo(h,{clipPath:'inset(0 0 100% 0)',y:36,opacity:0},{clipPath:'inset(0 0 -10% 0)',y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:h,start:'top 88%',refreshPriority:-1}}));
gsap.from('.vl li',{opacity:0,y:24,stagger:.07,duration:.7,scrollTrigger:{trigger:'.vl',start:'top 85%'}});
gsap.from('.svc dl > *',{opacity:0,y:24,stagger:.06,duration:.7,scrollTrigger:{trigger:'.svc dl',start:'top 85%'}});
document.querySelectorAll('.facts b').forEach(el=>{const n=+el.dataset.n,o={v:0};el.textContent=0;gsap.to(o,{v:n,duration:1.4,ease:'power2.out',onUpdate:()=>{el.textContent=Math.round(o.v)},scrollTrigger:{trigger:el,start:'top 92%',once:true}})});
if(matchMedia('(hover:hover) and (min-width:801px)').matches){
document.querySelectorAll('.panel').forEach(p=>{const rx=gsap.quickTo(p,'rotationX',{duration:.4}),ry=gsap.quickTo(p,'rotationY',{duration:.4});p.style.transformPerspective=800;p.addEventListener('pointermove',e=>{const r=p.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*8);rx(-((e.clientY-r.top)/r.height-.5)*8)});p.addEventListener('pointerleave',()=>{rx(0);ry(0)})});
const hl=['.l1','.l2','.l3'].map(s=>gsap.quickTo(s,'x',{duration:1.2}));
$('.hero').addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5;hl.forEach((q,i)=>q(x*(14+i*16)))})}
gsap.from('.venn circle',{scale:.2,opacity:0,transformOrigin:'50% 50%',stagger:.2,duration:.9,ease:'back.out(1.4)',scrollTrigger:{trigger:'.venn',start:'top 80%'}});
const tk=$('#tk');gsap.set(tk,{transformOrigin:'50% 90%'});
const tl=gsap.timeline({paused:true,repeat:-1,repeatDelay:1.5});
tl.fromTo(tk,{x:0,y:0,rotation:0},{x:520,duration:2.4,ease:'power2.in'}).to(tk,{rotation:-12,duration:.6,ease:'power1.out'},'-=.5').to(tk,{x:1100,y:-210,duration:1.8,ease:'power1.in'},'-=.1');
ScrollTrigger.create({trigger:'.rwy',start:'top 92%',refreshPriority:-1,onEnter:()=>tl.play(),onLeaveBack:()=>tl.pause(0)});
const rl=[...document.querySelectorAll('.road li')],ro=$('.road ol');
ScrollTrigger.create({trigger:ro,start:'top 75%',end:'bottom 45%',scrub:true,onUpdate:s=>{ro.style.setProperty('--w',s.progress*83.4+'%');rl.forEach((l,i)=>l.classList.toggle('on',s.progress>=i/5-.001))}});
document.querySelectorAll('.gauge2').forEach((g,i)=>gsap.fromTo(g.querySelector('.nd'),{rotation:-120,svgOrigin:'100 100'},{rotation:[40,110,-30][i],svgOrigin:'100 100',ease:'none',scrollTrigger:{trigger:g,start:'top 90%',end:'bottom 30%',scrub:true}}));
gsap.to('.rose',{rotation:70,ease:'none',scrollTrigger:{trigger:'.values',start:'top bottom',end:'bottom top',scrub:true}});
gsap.to('.bandimg img',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.bandimg',start:'top bottom',end:'bottom top',scrub:true}});
gsap.from('.steps li',{yPercent:25,opacity:0,stagger:.15,duration:.8,scrollTrigger:{trigger:'.steps',start:'top 85%'}});
gsap.from('.row3',{opacity:0,x:i=>i%2?140:-140,stagger:.15,duration:.8,scrollTrigger:{trigger:'.rows',start:'top 85%'}});
// ASK pillars + grades
gsap.from('.pillars div,.grades div',{opacity:0,y:30,stagger:.12,duration:.8,scrollTrigger:{trigger:'.pillars',start:'top 85%'}});
// horizontal career track (desktop only)
gsap.matchMedia().add('(min-width:801px)',()=>{const tr=$('#track'),hz=$('.hz'),ps=[...document.querySelectorAll('.panel')],bar=$('#hbar'),hs=$('#hs');hz.classList.add('live');ps[0].classList.add('act');
gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.pin',pin:true,scrub:.6,start:'top top',end:()=>'+='+(tr.scrollWidth-innerWidth),invalidateOnRefresh:true,onUpdate:s=>{const i=Math.min(5,Math.round(s.progress*5));bar.style.width=(s.progress*100)+'%';hs.textContent='Step '+(i+1)+' of 6';ps.forEach((p,k)=>p.classList.toggle('act',k===i))}}});
return()=>{hz.classList.remove('live')}});
// ---- section-to-section transitions ----
gsap.matchMedia().add('(min-width:801px)',()=>{
ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom top',pin:true,pinSpacing:false});
ScrollTrigger.create({trigger:'.values',start:'bottom bottom',end:()=>'+='+innerHeight,pin:true,pinSpacing:false});
});
const sc=(t,a,b)=>({trigger:t,start:a||'top 85%',end:b||'top 35%',scrub:.8});
gsap.fromTo('.band',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none',scrollTrigger:sc('.band','top 95%','top 55%')});
gsap.fromTo('.journey',{clipPath:'inset(10% 6% 0 6% round 28px)'},{clipPath:'inset(0% 0% 0 0% round 0px)',ease:'none',scrollTrigger:sc('.journey','top bottom','top top')});
gsap.fromTo('.road h2',{x:-120,opacity:0},{x:0,opacity:1,ease:'none',scrollTrigger:sc('.road')});
gsap.fromTo('.road .wrap > p',{x:120,opacity:0},{x:0,opacity:1,ease:'none',scrollTrigger:sc('.road')});
gsap.fromTo('.bandimg',{clipPath:'inset(18% 10% 18% 10%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:sc('.bandimg','top bottom','top 20%')});
gsap.from('.bandimg h2',{x:-140,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.bandimg',start:'top 55%'}});
gsap.from('.bandimg p',{x:140,opacity:0,duration:1,delay:.15,ease:'power3.out',scrollTrigger:{trigger:'.bandimg',start:'top 55%'}});
gsap.fromTo('.hz .head',{x:-100,opacity:0},{x:0,opacity:1,ease:'none',scrollTrigger:sc('.hz','top 90%','top 40%')});
gsap.fromTo('.lad',{clipPath:'circle(0% at 50% 100%)'},{clipPath:'circle(150% at 50% 100%)',ease:'none',scrollTrigger:sc('.lad','top 100%','top 25%')});
gsap.fromTo('.values',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',ease:'none',scrollTrigger:sc('.values','top 95%','top 45%')});
gsap.fromTo('.demo .g > div',{x:-110,opacity:0},{x:0,opacity:1,ease:'none',scrollTrigger:sc('.demo')});
gsap.fromTo('.demo form',{x:110,opacity:0},{x:0,opacity:1,ease:'none',scrollTrigger:sc('.demo')});
// plane swoosh wipe on in-page navigation
const sw=$('.swoosh');
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.classList.contains('skip'))return;const id=a.getAttribute('href');if(id.length<2)return;const t=document.querySelector(id);if(!t)return;e.preventDefault();
sw.style.pointerEvents='auto';
gsap.timeline({onComplete:()=>{sw.style.pointerEvents='none'}}).fromTo(sw,{xPercent:-101},{xPercent:0,duration:.5,ease:'power3.in'}).add(()=>{ScrollTrigger.refresh();const el=t.parentNode.classList&&t.parentNode.classList.contains('pin-spacer')?t.parentNode:t;window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'})}).to(sw,{xPercent:101,duration:.6,ease:'power3.out',delay:.08})});
addEventListener('load',()=>ScrollTrigger.refresh());
}
