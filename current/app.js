const LANGS=[["kk","Қаз"],["ru","Рус"],["zh","中文"],["uz","Oʻzb"],["ky","Кыр"]];
const LNAME={kk:"Қазақша",ru:"Русский",zh:"中文",uz:"Oʻzbekcha",ky:"Кыргызча"};
// Speakers: add photo:"file.jpg" when photos arrive
const SPEAKERS=[
{n:"Исхан Қайрат",d:"deg_c",t:"tp1"},
{n:"Баймәжі Ерлік",d:"deg_c",t:"tp2"},
{n:"Қадыкен Ризабек",d:"deg_c",t:"tp3"},
{n:"Жылқайдар Арман Жетпісбайұлы",d:"deg_phd",t:"tp4"},
{n:"Әуелбек Ермек",d:"deg_m",t:"tp5"},
{soon:1,d:"cn"},{soon:1,d:"kr"},{soon:1,d:"tr"}];
let L="kk";
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function q(o){return L==="zh"?"“"+o+"”":"«"+o+"»"}
function apply(l){
 L=I18N[l]?l:"kk";const D=I18N[L];
 document.documentElement.lang=L==="kk"?"kk":L;
 document.title=D.title;$('meta[name="description"]').content=D.desc;
 $$("[data-i]").forEach(e=>{const v=D[e.dataset.i];if(v!=null)e.innerHTML=v});
 $$("[data-ip]").forEach(e=>e.placeholder=D[e.dataset.ip]);
 $("#spgrid").innerHTML=SPEAKERS.map(s=>{const ini=s.n?s.n.split(" ").slice(0,2).map(w=>w[0]).join(""):"";return `<article class="sp rv in${s.soon?" soon":""}"><div class="ph">${s.photo?`<img src="${s.photo}" alt="${s.n}" loading="lazy">`:`<b>${s.soon?D.soon:ini}</b>`}</div><div class="bd"><h3>${s.soon?D.foreign:s.n}</h3><div class="deg">${D[s.d]}</div><p class="topic">${s.soon?D.soon_t:q(D[s.t])}</p></div></article>`}).join("");
 const btns=LANGS.map(([c,t])=>`<button data-l="${c}" class="${c===L?"on":""}" aria-pressed="${c===L}">${t}</button>`).join("");
 $("#lsel").innerHTML=btns;$("#lcur").textContent=LANGS.find(x=>x[0]===L)[1];
 $("#dlang").innerHTML=LANGS.map(([c])=>`<button data-l="${c}" class="${c===L?"on":""}">${LNAME[c]}</button>`).join("");
 $("#phl").innerHTML=LANGS.map(([c,t])=>`<span class="${c===L?"on":""}">${t}</span>`).join("")+"<span>+</span>";
 $$("[data-l]").forEach(b=>b.onclick=()=>{apply(b.dataset.l);try{localStorage.setItem("lang",L)}catch(e){}const u=new URL(location);u.searchParams.set("lang",L);history.replaceState(null,"",u)});
 const sel=$("#l");[...sel.options].forEach(o=>{if(o.text===LNAME[L])sel.value=o.value});
}
let start=new URLSearchParams(location.search).get("lang");
if(!start){try{start=localStorage.getItem("lang")}catch(e){}}
if(!start){const n=(navigator.language||"kk").slice(0,2);start={ru:"ru",zh:"zh",uz:"uz",ky:"ky"}[n]||"kk"}
apply(start);

// drawer
const body=document.body,bg=$("#burger"),dr=$("#drawer");
function menu(o){body.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);dr.setAttribute("aria-hidden",!o)}
bg.onclick=()=>menu(true);$("#lcur").onclick=()=>menu(true);$("#close").onclick=()=>menu(false);$("#ov").onclick=()=>menu(false);
dr.addEventListener("click",e=>{if(e.target.closest("a"))menu(false)});
addEventListener("keydown",e=>{if(e.key==="Escape")menu(false)});

// wheat + wave
let h="";for(let i=0;i<70;i++){const x=i*23+Math.random()*10,s=.8+Math.random()*.6;h+=`<g transform="translate(${x} ${905-Math.random()*40}) scale(${s})"><use href="#wheat" class="sway" style="animation-delay:${-Math.random()*3.6}s"/></g>`}$("#field").innerHTML=h;
$("#wave").innerHTML=Array.from({length:26},(_,i)=>`<i style="animation-delay:${-(i*.07)%1}s;animation-duration:${.7+Math.random()*.6}s"></i>`).join("");

// countdown
const T=new Date("2026-12-03T09:00:00+05:00").getTime(),p=v=>String(v).padStart(2,"0");
function tick(){const d=Math.max(0,T-Date.now())/1000;$("#cd-d").textContent=p(Math.floor(d/86400));$("#cd-h").textContent=p(Math.floor(d%86400/3600));$("#cd-m").textContent=p(Math.floor(d%3600/60));$("#cd-s").textContent=p(Math.floor(d%60))}
tick();setInterval(tick,1000);

// nav + sticky
const nav=$("#nav"),st=$("#sticky");
function onS(){nav.classList.toggle("sc",scrollY>40);st.style.display=(innerWidth<=760&&scrollY>innerHeight*.8)?"block":"none"}
addEventListener("scroll",onS,{passive:true});onS();

// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add("in");
 if(el.dataset.n){const n=+el.dataset.n,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
 io.unobserve(el)}),{threshold:.12});
$$(".rv,[data-n]").forEach(el=>io.observe(el));

// form -> WhatsApp
$("#form").addEventListener("submit",e=>{e.preventDefault();let ok=true;const D=I18N[L];
 const v=id=>document.getElementById(id).value.trim(),t=id=>{const s=document.getElementById(id);return s.options[s.selectedIndex].text},chk=(id,c)=>{document.getElementById(id).closest(".f").classList.toggle("bad",!c);if(!c)ok=false};
 chk("n",v("n").length>2);chk("p",v("p").replace(/\D/g,"").length>=10);chk("s",!!v("s"));if(!ok)return;
 const msg=`${D.msg}\n${D.f_n}: ${v("n")}\n${D.f_p}: ${v("p")}\n${D.f_r}: ${v("r")||"-"}\n${D.f_s}: ${t("s")}\n${D.f_ro}: ${t("ro")}\n${D.f_l}: ${t("l")}`;
 window.open("https://wa.me/77471673817?text="+encodeURIComponent(msg),"_blank");
 $("#fbody").style.display="none";$("#ok").style.display="block"});
