const $=s=>document.querySelector(s);
const ASK={
DGCA:{h:['Subject','Knowledge','Skills','Attitude'],r:[['Air Navigation','Charts, flight planning','Mental maths, time/fuel/distance','Decision making'],['Meteorology','Weather theory','Weather interpretation','Threat awareness'],['Air Law','Rules','Scenario judgement','Professional behaviour'],['Technical General','Aircraft systems','Problem solving','SOP discipline'],['RTR','Radio','Communication','CRM'],['Performance','Calculations','Quick estimation','Safety mindset']],f:'Mental arithmetic, scenario-based questions, Threat and Error Management, workload management and communication.'},
FAA:{h:['FAA area','ASK skill developed'],r:[['Flight planning','Decision making'],['Weather briefing','Situational awareness'],['Oral exams','Communication'],['Checkride','Application of knowledge'],['Cross-country planning','Workload management'],['Performance planning','Mental maths']],f:'Real-world decision making, scenario training, practical application and pilot judgement.'},
EASA:{h:['EASA subject','ASK competency'],r:[['Flight planning','Problem solving'],['General navigation','Mental maths'],['Human performance','Situational awareness'],['Operational procedures','TEM'],['Communications','CRM'],['Meteorology','Decision making']],f:'KSA preparation (Area 100), scenario-based assessments, airline competency training, TEM and CRM.'}};
const tabs=$('.tabs');
function show(k){tabs.querySelectorAll('button').forEach(b=>{const on=b.dataset.k===k;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});$('#panel').setAttribute('aria-labelledby','tab-'+k);
const d=ASK[k];$('#panel').innerHTML='<table><thead><tr>'+d.h.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+d.r.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
$('#focus').innerHTML='<b>Focus:</b> '+d.f;const fp=$('#fullpg');if(fp){fp.dataset.page=k.toLowerCase();fp.textContent='Open the full '+k+' page →'}}
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
const RI=['M5 14c0-4.5 3-8 7-8s7 3.5 7 8|M4 14h16l1 3.5H3z|M12 9.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 11.3l2-.3z', 'M9 4h6v3H9z|M7 5.5H6a1 1 0 00-1 1V20a1 1 0 001 1h12a1 1 0 001-1V6.5a1 1 0 00-1-1h-1|M8.5 13l2.2 2.2 4.8-4.7', 'M4 3v5a5 5 0 0010 0V3|M9 13v2a4 4 0 008 0v-1.5|M17 9.5a2 2 0 110 4 2 2 0 010-4z', 'M3 5h18v14H3z|M8.2 10a1.8 1.8 0 103.6 0 1.8 1.8 0 10-3.6 0|M6 16c.5-2 2-3 4-3s3.5 1 4 3|M15 10h3|M15 13h3', 'M12 21a9 9 0 100-18 9 9 0 000 18z|M8.5 8h7|M8.5 11h7|M9.5 8c3.8 0 5 1.4 5 3s-1.2 3-5 3L14.5 17', 'M16 3v10|M16 3l5.5 2.2-5.5 2.4|M4 20.5c4.5 0 4-4.5 8-4.5s3-3 4-3|M4 20.5h.01'];
document.querySelectorAll('.road .dot').forEach((d,i)=>d.innerHTML=ic(RI[i]));
const DIAL='<svg class="gauge2" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="#0A1626" stroke="#8FA4BA" stroke-width="3"/><circle cx="100" cy="100" r="78" fill="none" stroke="#3A5573" stroke-width="10" stroke-dasharray="3 12.3"/><line class="nd" x1="100" y1="100" x2="100" y2="34" stroke="#F2A33A" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="5" fill="#F2A33A"/></svg>';
document.querySelectorAll('.deck figure').forEach(f=>f.insertAdjacentHTML('afterbegin',DIAL));
// ---- full pages (overlay) ----
const FAQ=[['Is ASK a separate subject?','No. ASK is a competency framework integrated into every subject and every licence, not a separate ATPL subject.'],['Is Area 100 KSA a standalone EASA exam?','No. Area 100 KSA is not examined as a standalone authority exam. It is assessed progressively during training.'],['Why is mental maths included?','Airline pilots routinely estimate fuel, time, distance and performance, cross-check automation and spot errors quickly.'],['How will I know how I am doing?','Through instructor observation, scenario exercises and progress reviews, graded as Standard achieved, Improvement recommended or Further development required.']];
const li=a=>'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>',faq=()=>'<h2>Common questions</h2>'+FAQ.map(q=>'<details><summary>'+q[0]+'</summary><p>'+q[1]+'</p></details>').join('');
const tb=k=>{const d=ASK[k];return '<div class="tbl"><table><thead><tr>'+d.h.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+d.r.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'};
const JP='<path d="M4 22Q10 16 40 16L100 16Q116 18 118 22Q116 26 100 27L40 27Q10 28 4 22Z"/><path d="M10 17L2 4L16 4L26 17Z"/><path d="M52 24L84 24L66 36L56 36Z"/>';
const IM=()=>({fc:$('img[alt^="Hands using"]').src,nav:$('.bandimg img').src,cls:$('img[alt^="Instructor teaching"]').src,stu:$('img[alt^="Student pilot"]').src});
const hero=(img,pill,t,i)=>'<div class="phero"><div class="pbg"><img src="'+img+'" alt=""></div><div class="pov"></div><svg class="pjet" viewBox="0 0 120 40" aria-hidden="true">'+JP+'</svg><div class="pht"><div class="ppill">'+pill+'</div><h1>'+t+'</h1><p>'+i+'</p></div></div>';
const cards=k=>{const d=ASK[k];return '<div class="sg">'+d.r.map((r,i)=>'<div class="sc rv"><span class="idx">'+String(i+1).padStart(2,'0')+'</span><div class="sct">'+r[0]+'</div>'+(r.length===4?'<div class="chp k"><b>Knowledge</b>'+r[1]+'</div><div class="chp s"><b>Skills</b>'+r[2]+'</div><div class="chp a"><b>Attitude</b>'+r[3]+'</div>':'<div class="chp s"><b>'+d.h[1]+'</b>'+r[1]+'</div>')+'</div>').join('')+'</div>'};
const fc=a=>'<div class="fch rv">'+a.map(x=>'<span>'+x+'</span>').join('')+'</div>';
const LI=[['Live virtual classes',SI[0]],['Recorded modules','M5 4l14 8-14 8z'],['CBT learning and test series',SI[1]],['Study materials',SI[2]],['Personal mentorship',SI[3]]];
const learn=()=>'<h2 class="rv">How you learn</h2><div class="lt">'+LI.map(x=>'<div class="lg rv">'+ic(x[1])+'<span>'+x[0]+'</span></div>').join('')+'</div>';
const pimg=(src,alt,cap)=>'<figure class="pimg rv"><img src="'+src+'" alt="'+alt+'" loading="lazy"><figcaption>'+cap+'</figcaption></figure>';
const cta=(t,b)=>'<div class="pcta rv"><div><h2>'+t+'</h2><p>Talk to a pilot mentor about your pathway, medical and budget.</p></div><button class="btn pri" data-pgdemo>'+(b||'Book a 15-min demo call')+'</button></div>';
const nx=a=>'<div class="pnext rv"><span>Explore next:</span>'+a.map(x=>'<button class="lnk" data-page="'+x[0]+'">'+x[1]+' \u2192</button>').join('')+'</div>';
const faq2=()=>'<h2 class="rv">Common questions</h2>'+FAQ.map(q=>'<details class="rv"><summary>'+q[0]+'</summary><p>'+q[1]+'</p></details>').join('');
const PG={
dgca:()=>{const m=IM();return hero(m.nav,'India \u00b7 DGCA','DGCA + ASK','DGCA ground training with Attitude, Skills and Knowledge built into every subject. These are exactly the competencies airlines test later.')+'<div class="pgc"><h2 class="rv">What you study with ASK</h2>'+cards('DGCA')+'<h2 class="rv">Where we focus</h2>'+fc(['Mental arithmetic','Scenario-based questions','Threat and Error Management','Workload management','Communication'])+pimg(m.fc,'Hands using a flight computer beside a flight plan and headset','Skills in practice: time, fuel and distance on the flight computer.')+learn()+cta('Ready to start DGCA?')+nx([['faa','FAA'],['easa','EASA'],['ask','The ASK model']])+'</div>'},
faa:()=>{const m=IM();return hero(m.fc,'USA \u00b7 FAA','FAA + ASK','FAA training is more practical and scenario-based, so ASK fits naturally.')+'<div class="pgc"><h2 class="rv">What you study with ASK</h2>'+cards('FAA')+'<h2 class="rv">Where we focus</h2>'+fc(['Real-world decision making','Scenario training','Practical application','Pilot judgement'])+pimg(m.cls,'Instructor teaching flight theory to student pilots in a classroom','Live and recorded classes for DGCA, FAA and EASA aspirants \u00b7 illustrative image')+learn()+cta('Ready to start FAA?')+nx([['dgca','DGCA'],['easa','EASA'],['ask','The ASK model']])+'</div>'},
easa:()=>{const m=IM();return hero(m.stu,'Europe \u00b7 EASA','EASA + ASK','EASA already uses the KSA (Knowledge, Skills, Attitude) concept, very similar to ASK.')+'<div class="pgc"><h2 class="rv">What you study with ASK</h2>'+cards('EASA')+'<h2 class="rv">Where we focus</h2>'+fc(['Area 100 KSA preparation','Scenario-based assessments','Airline competency training','TEM and CRM'])+'<h2 class="rv">Understanding Area 100 KSA</h2><div class="kcards"><div class="kc rv"><b>What it is</b><p>KSA stands for Knowledge, Skills and Attitudes. Area 100 is a competency framework embedded in EASA ATPL theory, not a technical subject like Air Law or Meteorology.</p></div><div class="kc rv"><b>What it looks at</b><p>How you think, decide, communicate and manage workload, not what you can recall from a question bank.</p></div><div class="kc rv"><b>How it is assessed</b><p>Progressively through the course, with instructor observation and structured assessments, on a developmental scale.</p></div></div><p class="rv" style="color:var(--muted)">Requirements are set by the authority and your approved training organisation. Confirm them before you enrol.</p>'+pimg(m.nav,'Flight computer and charts','Navigation: charts, headings and drift on the flight computer.')+learn()+faq2()+cta('Ready to start EASA?')+nx([['dgca','DGCA'],['faa','FAA'],['ask','The ASK model']])+'</div>'},
ask:()=>{const m=IM(),v=$('.venn').outerHTML.replace(' role="button" tabindex="0" data-page="ask"','').replace('class="venn"','class="venn vn2"');return hero(m.cls,'Competency framework','The Airgen ASK model','ASK is not a subject. It is a competency system that turns exam students into airline-ready pilots. ASK bridges the gap between DGCA theory and airline reality.')+'<div class="pgc"><h2 class="rv">Three parts of one competency</h2><div class="askg rv">'+v+'<div class="cmp"><div><b>Attitude</b><span>Professional mindset. We train discipline, communication and decision making.</span></div><div><b>Skills</b><span>Pilot thinking ability. We train mental math, problem solving and situational awareness.</span></div><div><b>Knowledge</b><span>ATPL subjects. DGCA, FAA and EASA theory.</span></div></div></div><h2 class="rv">How ASK is assessed</h2><div class="stp"><div class="rv">Instructor observation</div><div class="rv">Scenario exercises</div><div class="rv">Mental arithmetic tests</div><div class="rv">Progress reviews</div><div class="rv">Structured assessments</div></div><h2 class="rv">How you are graded</h2><div class="grd rv"><div>Standard achieved<span>You are meeting the expected competency standard.</span></div><div>Improvement recommended<span>You are progressing, with areas to strengthen.</span></div><div>Further development required<span>You need more support before moving on.</span></div></div>'+faq2()+cta('See ASK in action')+nx([['dgca','DGCA'],['faa','FAA'],['easa','EASA']])+'</div>'},
platform:()=>{const m=IM();return hero(m.stu,'Platform','Digital CBT & Virtual Campus','A technology-driven learning ecosystem that integrates live virtual classrooms, recorded learning modules, digital study resources, assessments, performance analytics and personalised mentorship.')+'<div class="pgc"><h2 class="rv">Everything in one campus</h2><div class="lt">'+[['Live virtual classrooms',SI[0]],['Recorded modules','M5 4l14 8-14 8z'],['CBT and test series',SI[1]],['Study materials',SI[2]],['Performance analytics','M4 20V10|M10 20V4|M16 20v-8|M22 20H2'],['Personalised mentorship',SI[3]]].map(x=>'<div class="lg rv">'+ic(x[1])+'<span>'+x[0]+'</span></div>').join('')+'</div><h2 class="rv">See progress at a glance</h2><div class="dash rv"><small>Sample view, illustrative only (not real student data)</small>'+[['Mental maths','78%'],['Navigation','64%'],['Meteorology','86%'],['Air Law','58%']].map(x=>'<div class="bar"><span>'+x[0]+'</span><i style="--w:'+x[1]+'"></i></div>').join('')+'</div><h2 class="rv">Built for aviation training organisations</h2><p class="rv">A specialised Learning Management System (LMS), Customer Relationship Management (CRM), mobile learning and business automation, combined in a single ecosystem designed specifically for aviation training organisations.</p><div class="fch rv"><span>LMS</span><span>CRM</span><span>Mobile learning</span><span>Business automation</span></div>'+cta('Want a walkthrough?','Request a demo')+nx([['dgca','DGCA'],['faa','FAA'],['easa','EASA']])+'</div>'}};
let pgIO=null;
function pgFx(){if(pgIO)pgIO.disconnect();const els=[...pgin.querySelectorAll('.rv')];
if(rm||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
pgIO=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');pgIO.unobserve(x.target)}}),{root:pgEl,rootMargin:'0px 0px -6% 0px',threshold:.06});
els.forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';pgIO.observe(e)})}
const pgEl=$('#pg'),pgin=$('#pgin');let lastF=null;
pgEl.addEventListener('scroll',()=>{const y=pgEl.scrollTop,h=pgEl.scrollHeight-pgEl.clientHeight;pgEl.style.setProperty('--ps',h>0?(y/h).toFixed(3):0);pgEl.style.setProperty('--py',Math.min(y,700)*.35+'px')},{passive:true});
function wipe(go){go()}
const gate=$('#gate'),gp=$('#gp'),gt=$('#gt'),NM={dgca:'DGCA',faa:'FAA',easa:'EASA',ask:'ASK model',platform:'Platform'};let gk=null,gTimer=0;
function showPg(){pgEl.hidden=false;pgEl.scrollTop=0;pgFx();$('.pgx').focus()}
function openPg(k){if(!PG[k]||!gate.hidden)return;lastF=document.activeElement;pgin.innerHTML=PG[k]();
if(!(window.gsap&&!rm)){showPg();return}
gk=k;gt.textContent='Opening the '+NM[k]+' page';gate.hidden=false;gsap.set(gp,{x:0,y:0,rotation:0});
gsap.fromTo(gate,{xPercent:-101},{xPercent:0,duration:.45,ease:'power3.out',onComplete:()=>{gp.focus();gTimer=setTimeout(takeoff,5000)}})}
function takeoff(){if(gate.hidden||gk===null)return;clearTimeout(gTimer);gk=null;
gsap.timeline({onComplete:()=>{gate.hidden=true}}).to(gp,{x:'110vw',y:'-38vh',rotation:-12,duration:1,ease:'power2.in'}).add(showPg,.55).to(gate,{xPercent:101,duration:.55,ease:'power3.inOut'},.7)}
function cancelGate(){if(gate.hidden||gk===null)return;clearTimeout(gTimer);gk=null;gsap.to(gate,{xPercent:101,duration:.4,onComplete:()=>{gate.hidden=true;if(lastF)lastF.focus()}})}
gp.addEventListener('click',takeoff);
$('.venn').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPg('ask')}});
document.addEventListener('click',e=>{if(e.target.closest('[data-gcancel]'))cancelGate()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')cancelGate()});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('venn')){e.preventDefault();openPg('ask')}});
function closePg(cb){wipe(()=>{pgEl.hidden=true;document.documentElement.style.overflow='';if(lastF)lastF.focus();if(cb)cb()})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b){e.preventDefault();openPg(b.dataset.page);return}
if(e.target.closest('[data-pgclose]'))closePg();
if(e.target.closest('[data-pgdemo]'))closePg(()=>{window.scrollTo({top:$('#demo').getBoundingClientRect().top+scrollY,behavior:'instant'})})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!pgEl.hidden)closePg()});
const mm=$('#mm');let mf=null;
const openM=()=>{mf=document.activeElement;mm.hidden=false;mm.querySelector('.mmx').focus()},closeM=cb=>{mm.hidden=true;if(mf)mf.focus();if(cb)cb()};
document.addEventListener('click',e=>{if(e.target.closest('[data-mentor]')){openM();return}if(e.target.closest('[data-mmclose]'))closeM();if(e.target.closest('[data-mmdemo]'))closeM(()=>{window.scrollTo({top:$('#demo').getBoundingClientRect().top+scrollY,behavior:'instant'})})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mm.hidden)closeM()});

const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Fill these in when real destinations exist; CTAs and contact block wire up automatically.
const C=window.AIRGEN_CONFIG={enrolUrl:'',demoUrl:'',whatsapp:'919515143311',email:'',phone:'+919515143311',phoneText:'+91 95151 43311'};
if(C.demoUrl)document.querySelectorAll('[data-cta="demo"]').forEach(a=>{a.href=C.demoUrl;a.target='_blank';a.rel='noopener'});
const framed=window.top!==window.self;
function dial(){const u='tel:'+C.phone;if(framed){const a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}else location.href=u}
$('#df').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),t='Demo call request: '+f.get('n')+', '+f.get('p')+', '+f.get('e')+', '+f.get('w')+', preferred time: '+f.get('t')+(f.get('q')?', notes: '+f.get('q'):''),m=$('#dm');
if(C.demoUrl){open(C.demoUrl,'_blank','noopener');m.textContent='Opening the booking page.';return}
const wa='https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(t);
m.innerHTML='Thank you. Opening your phone app to call Airgen. If it does not open, <a href="tel:'+C.phone+'">tap here to call</a> or <a href="'+wa+'" target="_blank" rel="noopener">send your details on WhatsApp</a>.';
m.querySelectorAll('a[href^="tel:"]').forEach(a=>{if(framed){a.target='_blank';a.rel='noopener'}});
dial()};
if(C.enrolUrl)document.querySelectorAll('[data-cta="enrol"]').forEach(a=>{a.href=C.enrolUrl;a.textContent='Enrol with Airgen'});
if(C.email||C.phone){const c=$('#contact');c.hidden=false;c.innerHTML=(C.email?'<a href="mailto:'+C.email+'">'+C.email+'</a>':'')+(C.phone?'<a href="tel:'+C.phone+'">'+(C.phoneText||C.phone)+'</a>':'')}
const nav=$('nav'),fl=$('#fl');let tgt=0,cur=0;
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight;tgt=m>0?scrollY/m:0;$('.sp').style.transform='scaleX('+tgt+')';nav.classList.toggle('solid',scrollY>innerHeight*.7);if(rm)cur=tgt};
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
const TN=$('.tint'),TOD=$('#tod'),SK=[[0,[255,170,120,.18],'dawn'],[.22,[255,255,255,0],'morning'],[.5,[130,185,255,.05],'day'],[.78,[255,185,95,.15],'golden hour'],[1,[85,65,150,.2],'dusk']];let lt='';
function tintAt(p){let i=0;while(i<SK.length-2&&p>SK[i+1][0])i++;const a=SK[i],b=SK[i+1],f=Math.min(1,Math.max(0,(p-a[0])/(b[0]-a[0]))),c=a[1].map((v,k)=>v+(b[1][k]-v)*f),col='rgba('+Math.round(c[0])+','+Math.round(c[1])+','+Math.round(c[2])+','+c[3].toFixed(2)+')';if(col!==lt){TN.style.background=col;lt=col}const n='\u00b7 '+(f<.5?a[2]:b[2]);if(TOD.textContent!==n)TOD.textContent=n}
(function tick(){cur+=(tgt-cur)*.12;fl.textContent='FL'+String(Math.round(cur*39)*10).padStart(3,'0');tintAt(cur);requestAnimationFrame(tick)})();
if(rm)document.querySelectorAll('.fl').forEach(e=>e.remove());
const WD=['THINK','TRAIN','FLY','ADVANCE','COMMAND'],bss=[...document.querySelectorAll('.bs')];let bn=0,bt=0;
function setW(e,w,flip){[...e.children].forEach((c,k)=>{const ch=w[k]||'\u00a0';if(flip){setTimeout(()=>{c.classList.remove('f');void c.offsetWidth;c.classList.add('f');setTimeout(()=>{c.textContent=ch},150)},k*55)}else c.textContent=ch})}
bss.forEach((e,i)=>{e.innerHTML='<i></i><i></i><i></i><i></i><i></i><i></i><i></i>';setW(e,WD[i])});
if(!rm){const io2=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){if(!bt)bt=setInterval(()=>{bn++;bss.forEach((e,i)=>setW(e,WD[(bn+i)%5],true))},3200)}else{clearInterval(bt);bt=0}}));io2.observe($('.board'))}
const DT=['Situational awareness: knowing what is happening around you and what is likely to happen next. In ASK it is built through weather interpretation and scenario work.','Decision making: choosing a safe course of action under time pressure. In ASK it is built through scenario-based questions and judgement exercises.','Workload management: prioritising tasks so nothing is missed when things get busy. Airgen trains it through cross-country planning and Threat and Error Management.'];
const dfs=[...document.querySelectorAll('.deck figure')];
dfs.forEach((f,i)=>{f.setAttribute('role','button');f.tabIndex=0;f.setAttribute('aria-pressed','false');const pick=()=>{dfs.forEach(x=>{x.classList.remove('sel');x.setAttribute('aria-pressed','false')});void f.offsetWidth;f.classList.add('sel');f.setAttribute('aria-pressed','true');$('#dtip').textContent=DT[i]};f.addEventListener('click',pick);f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})});
const path=$('#fp'),pl=$('#pl'),L=path.getTotalLength();
function plane(p){const t=path.getPointAtLength(L*p),a=path.getPointAtLength(Math.max(0,L*p-1)),b=path.getPointAtLength(Math.min(L,L*p+1));pl.setAttribute('transform','translate('+t.x+' '+t.y+') rotate('+Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+') scale(1.4)')}
if(rm||!window.gsap||!window.ScrollTrigger){document.documentElement.classList.add('rm');document.body.classList.add('rm');
document.querySelectorAll('.stage').forEach(s=>s.classList.add('on'));plane(1);$('#track').style.flexWrap='wrap';document.querySelectorAll('.road li').forEach(l=>l.classList.add('on'));$('.road ol').style.setProperty('--w','83.4%')}
else{
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
(function(){let seen=0;try{seen=sessionStorage.getItem('agbp')}catch(e){}if(seen||location.hash)return;
const bp=$('#bp');bp.querySelector('img').src=($('.logo-dark')||$('.logo img')).src;bp.hidden=false;try{sessionStorage.setItem('agbp','1')}catch(e){}
const tl=gsap.timeline({onComplete:()=>{bp.hidden=true}});
tl.from('.bpc',{y:60,scale:.92,opacity:0,duration:.6,ease:'power3.out'}).to({},{duration:.9})
.to('.bpstub',{rotation:16,y:'120%',x:'12%',opacity:0,duration:.6,ease:'power2.in'}).to('.bpmain',{xPercent:-4,duration:.15},'<')
.to('.bpc',{y:'-120%',opacity:0,duration:.7,ease:'power3.in'},'+=.1').to(bp,{opacity:0,duration:.3},'-=.3');
$('.bpskip').onclick=()=>{tl.timeScale(4)}})();
const wh=$('.wh'),sA=$('.sA p');sA.innerHTML=sA.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+'</span>').join(' ');
gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:wh,start:'top top',end:'+=4600',pin:true,scrub:.6}})
.to('.shutter',{yPercent:-102,duration:1,ease:'power1.inOut'},0)
.to('.cg',{y:'-30vh',scale:1.2,transformOrigin:'50% 60%',duration:3.5},0)
.to(wh,{'--t':'0vh','--r':'0vw','--b':'0vh','--l':'0vw','--rad':'0vw',duration:1.6},.6)
.to(wh,{'--s1':'rgb(190,214,232)','--s2':'rgb(236,244,250)',duration:2.4},.6)
.to('.hcopy',{opacity:0,xPercent:-10,duration:.7},.3)
.to('.cue',{opacity:0,duration:.2},0)
.to('.ring',{opacity:0,duration:.4},1.9)
.to('.fog',{yPercent:-175,duration:1.9},1)
.fromTo('.sA',{opacity:0},{opacity:1,duration:.3},2.2)
.fromTo('.sA .w',{opacity:.15},{opacity:1,stagger:.14,duration:.4},2.3)
.to('.sA',{opacity:0,yPercent:-8,duration:.4},4)
.fromTo('.sB b',{xPercent:i=>[-110,110,-110][i],opacity:0},{xPercent:0,opacity:1,stagger:.35,duration:.8},4.4)
.to({},{duration:1});
const shk=['.scene','.ring'];ScrollTrigger.create({trigger:'.wh',start:'top top',end:'+=3000',onUpdate:st=>{const v=Math.min(1,Math.abs(st.getVelocity())/3500);if(v>.15)gsap.set(shk,{x:(Math.random()-.5)*8*v,y:(Math.random()-.5)*6*v});else gsap.set(shk,{x:0,y:0})}});
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
}
gsap.from('.venn circle',{scale:.2,opacity:0,transformOrigin:'50% 50%',stagger:.2,duration:.9,ease:'back.out(1.4)',scrollTrigger:{trigger:'.venn',start:'top 80%'}});
const tk=$('#tk');gsap.set(tk,{transformOrigin:'50% 90%'});
const tl=gsap.timeline({paused:true,repeat:-1,repeatDelay:1.5});
tl.fromTo(tk,{x:0,y:0,rotation:0},{x:520,duration:2.4,ease:'power2.in'}).to(tk,{rotation:-12,duration:.6,ease:'power1.out'},'-=.5').to(tk,{x:1100,y:-210,duration:1.8,ease:'power1.in'},'-=.1');
ScrollTrigger.create({trigger:'.rwy',start:'top 92%',refreshPriority:-1,onEnter:()=>tl.play(),onLeaveBack:()=>tl.pause(0)});
const rl=[...document.querySelectorAll('.road li')],ro=$('.road ol');
ScrollTrigger.create({trigger:ro,start:'top 75%',end:'bottom 45%',scrub:true,onUpdate:s=>{ro.style.setProperty('--w',s.progress*83.4+'%');rl.forEach((l,i)=>l.classList.toggle('on',s.progress>=i/5-.001))}});
document.querySelectorAll('.gauge2').forEach((g,i)=>gsap.fromTo(g.querySelector('.nd'),{rotation:-120,svgOrigin:'100 100'},{rotation:[40,110,-30][i],svgOrigin:'100 100',ease:'none',scrollTrigger:{trigger:g,start:'top 90%',end:'bottom 30%',scrub:true}}));
gsap.to('.rose',{rotation:240,ease:'none',scrollTrigger:{trigger:'.values',start:'top bottom',end:'bottom top',scrub:true}});
gsap.to('.bandimg img',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.bandimg',start:'top bottom',end:'bottom top',scrub:true}});
gsap.from('.steps li',{yPercent:25,opacity:0,stagger:.15,duration:.8,scrollTrigger:{trigger:'.steps',start:'top 85%'}});
gsap.from('.row3',{opacity:0,x:i=>i%2?140:-140,stagger:.15,duration:.8,scrollTrigger:{trigger:'.rows',start:'top 85%'}});
// ASK pillars + grades
gsap.from('.pillars div,.grades div',{opacity:0,y:30,stagger:.12,duration:.8,scrollTrigger:{trigger:'.pillars',start:'top 85%'}});
// horizontal career track (desktop only)
gsap.matchMedia().add('(min-width:801px)',()=>{const tr=$('#track'),hz=$('.hz'),ps=[...document.querySelectorAll('.panel')],bar=$('#hbar'),hs=$('#hs');hz.classList.add('live');ps[0].classList.add('act');
gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.pin',pin:true,scrub:.6,start:'top top',end:()=>'+='+(tr.scrollWidth-innerWidth),invalidateOnRefresh:true,onUpdate:s=>{const i=Math.min(5,Math.round(s.progress*5));bar.style.width=(s.progress*100)+'%';hs.textContent='Step '+(i+1)+' of 6'+(s.progress>.99?' \u00b7 complete':'');ps.forEach((p,k)=>p.classList.toggle('act',k===i));const hq=$('.hprog');hq.classList.add('walking');clearTimeout(hq._t);hq._t=setTimeout(()=>hq.classList.remove('walking'),220);hq.querySelectorAll('u').forEach((u,k)=>u.classList.toggle('on',s.progress>=k/5-.001))}}});
return()=>{hz.classList.remove('live')}});
// ---- world map routes ----
const wr=[...document.querySelectorAll('.rt')],wm=[...document.querySelectorAll('.mk')];
wr.forEach(r=>{r._l=r.getTotalLength();r.style.strokeDasharray=r._l;r.style.strokeDashoffset=r._l});
function wplane(p){wr.forEach((r,i)=>{const l=r._l,q=Math.min(1,Math.max(0,(p-i*.18)/.7)),t=r.getPointAtLength(l*q),a=r.getPointAtLength(Math.max(0,l*q-1)),b=r.getPointAtLength(Math.min(l,l*q+1));r.style.strokeDashoffset=l*(1-q);wm[i].setAttribute('transform','translate('+t.x+' '+t.y+') rotate('+Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+') scale(1.3)')})}
ScrollTrigger.create({trigger:'.world',start:'top 65%',end:'bottom 55%',scrub:true,onUpdate:s=>wplane(s.progress)});wplane(0);
// ---- section-to-section transitions ----
gsap.matchMedia().add('(min-width:801px)',()=>{
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
// in-page navigation: plain smooth scroll
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.classList.contains('skip'))return;const id=a.getAttribute('href');if(id.length<2)return;const t=document.querySelector(id);if(!t)return;e.preventDefault();const el=t.parentNode.classList&&t.parentNode.classList.contains('pin-spacer')?t.parentNode:t;window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'smooth'})});
addEventListener('load',()=>ScrollTrigger.refresh());
}
if(framed)document.querySelectorAll('a[href^="tel:"]').forEach(a=>{a.target='_blank';a.rel='noopener'});
