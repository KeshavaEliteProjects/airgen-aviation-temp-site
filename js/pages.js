const b=document.getElementById('mt'),n=document.querySelector('nav');
b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('section:not(.hero) h2,section:not(.hero) .card,section:not(.hero) .big,.path li,section:not(.hero) .tag,section:not(.hero) tr,.ph,details,.fl,.rw,.fig-box,.brand-strip,.quote-banner,.side-fig-right,.side-fig-left').forEach(el=>{const i=[...el.parentNode.children].indexOf(el);el.style.transitionDelay=Math.min(i,6)*90+'ms';el.classList.add('rv');io.observe(el);el.addEventListener('transitionend',ev=>{if(ev.propertyName==='opacity'){el.classList.remove('rv','in');el.style.transitionDelay=''}})});
const sp=document.getElementById('sp'),hd=document.querySelector('header'),art=document.querySelector('.art'),tt=document.getElementById('tt');
function onS(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;sp.style.width=(h>0?y/h*100:0)+'%';hd.classList.toggle('sm',y>40);tt.classList.toggle('show',y>600);if(art)art.style.marginTop=y*.25+'px';
document.querySelectorAll('ol.path').forEach(o=>{const r=o.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.6-r.top)/r.height));o.style.setProperty('--p',p*100+'%')})}
addEventListener('scroll',onS,{passive:true});onS();tt.addEventListener('click',()=>scrollTo({top:0}));

// Counselling form & Direct Call Modal Popup
const HELPLINE_PHONE='+917569512222';

// Contact page counselling form
const cf=document.getElementById('cf');
const contactModal=document.getElementById('call-modal');
const contactModalClose=document.getElementById('modal-close-btn');
const contactModalName=document.getElementById('user-display-name');
const contactCallBtn=document.getElementById('call-mentor-btn');

if(cf){
  cf.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(cf);
    const candidateName=d.get('name') || 'Candidate';
    const candidatePhone=d.get('phone') || '';
    const interest=d.get('interest') || '';

    // Update modal details
    if(contactModalName) contactModalName.textContent=candidateName;
    
    // Display popup modal
    if(contactModal){
      contactModal.classList.add('open');
      document.body.style.overflow='hidden';
    }

    // Configure Call button to trigger phone call immediately on click
    if(contactCallBtn){
      contactCallBtn.href='tel:'+HELPLINE_PHONE;
      contactCallBtn.onclick=()=>{
        window.location.href='tel:'+HELPLINE_PHONE;
      };
    }

    // Configure WhatsApp link with candidate context
    const wa=document.getElementById('whatsapp-link');
    if(wa){
      const waMsg=encodeURIComponent(`Hello AirGen Aviation, I just submitted a counselling request.\nName: ${candidateName}\nPhone: ${candidatePhone}\nInterest: ${interest}`);
      wa.href='https://wa.me/917569512222?text='+waMsg;
    }
  });
}

// Landing page & Global Call Modal
const indexModal=document.getElementById('index-call-modal');
const indexModalClose=document.getElementById('index-modal-close-btn');
const directCallBtn=document.getElementById('direct-call-action-btn');

function openCallModal(){
  const targetModal=indexModal || contactModal;
  if(targetModal){
    targetModal.classList.add('open');
    document.body.style.overflow='hidden';
  }
}

function closeAllModals(){
  document.querySelectorAll('.modal-backdrop.open').forEach(m=>{
    m.classList.remove('open');
  });
  document.body.style.overflow='';
}

// Attach click listeners to all open-call buttons (floating button & nav pill)
document.querySelectorAll('.js-open-call-modal').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.preventDefault();
    openCallModal();
  });
});

if(contactModalClose) contactModalClose.addEventListener('click',closeAllModals);
if(indexModalClose) indexModalClose.addEventListener('click',closeAllModals);

// Click outside card on backdrop to close
document.querySelectorAll('.modal-backdrop').forEach(modalEl=>{
  modalEl.addEventListener('click',e=>{
    if(e.target===modalEl) closeAllModals();
  });
});

// Close with Escape key
window.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeAllModals();
});

// Direct call action button trigger
if(directCallBtn){
  directCallBtn.addEventListener('click',e=>{
    window.location.href='tel:'+HELPLINE_PHONE;
  });
}

