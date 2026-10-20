"use strict";
// CONFIGURA SOLO CON DATOS REALES. Número de Perú: 51 + 9 dígitos, sin espacios ni signo +.
const CONFIG = {
  whatsapp: "51975506704", // WhatsApp comercial de CyR Seguridad
  email: "cmicolthy@gmail.com" // Correo de contacto
};
// Productos DEMOSTRATIVOS: reemplazar o confirmar antes de ofrecer comercialmente.
const products = [
  {name:"Cascos de seguridad",category:"cabeza",description:"Modelos de cascos para protección de cabeza. Consulta colores, especificaciones y disponibilidad.",photo:"cascos-reales.webp",icon:"helmet"},
  {name:"Guantes de protección",category:"manos",description:"Guantes para distintas labores industriales. Confirma material, talla y nivel de protección.",photo:"guantes-reales.webp",icon:"gloves"},
  {name:"Lentes de seguridad",category:"visual",description:"Opciones de lentes transparentes y oscuros. Consulta modelos y especificaciones.",photo:"lentes-reales.webp",icon:"glasses"},
  {name:"Protección respiratoria",category:"respiratoria",description:"Máscaras y respiradores para diferentes aplicaciones. Consulta compatibilidad y requisitos.",photo:"respiradores-reales.webp",icon:"mask"},
  {name:"Filtros y cartuchos respiratorios",category:"respiratoria",description:"Filtros y cartuchos ilustrativos. Confirma compatibilidad, aplicación y referencias antes de comprar.",photo:"filtros-reales.webp",icon:"mask"},
  {name:"Chalecos de alta visibilidad",category:"cuerpo",description:"Prendas para mejorar la visibilidad en actividades laborales. Consulta modelos y tallas.",photo:"chalecos-nuevos.webp",icon:"vest"},
  {name:"Calzado de seguridad",category:"cuerpo",description:"Consulta opciones de calzado de protección según la actividad y necesidad.",photo:"calzado-nuevo.webp",icon:"boots"}
];
const productPhotos = {helmet:"casco",gloves:"guantes",glasses:"lentes",mask:"respiratoria",vest:"chaleco",boots:"calzado"};
const icons = {
helmet:'<path d="M19 70v-10a41 41 0 0 1 82 0v10M10 72h100v12H10zM44 30v31M76 30v31M23 86q27 27 74 0"/>',
gloves:'<path d="M35 104 23 72q-5-13 7-15l16 17-7-52q-1-11 9-12t12 12l3 33-1-43q1-10 11-9t10 10l2 42 2-30q1-10 11-8t8 12l-1 36q0 30-25 39z"/>',
glasses:'<path d="M12 44h96l-7 41q-3 15-20 15H69q-12 0-14-14l-1-8h-4l-1 8q-2 14-14 14H23q-17 0-20-15zM12 44l-7-7M108 44l7-7"/>',
mask:'<path d="M28 48q32-25 64 0v37q-32 30-64 0zM28 58 8 48v28l20 9M92 58l20-10v28L92 85M42 61h36M42 74h36"/>',
vest:'<path d="m37 13 23 12 23-12 25 32-16 13v47H28V58L12 45zM37 13l8 35h30l8-35M28 72h64M45 48v57M75 48v57"/>',
boots:'<path d="M23 15h40v51l21 13 28 6v20H12V90l11-13zM23 38h40M23 54h40M12 91h100"/>'
};
const svgFor = key => `<svg viewBox="0 0 120 120" aria-hidden="true">${icons[key]||icons.helmet}</svg>`;
const validPhone = /^\d{10,15}$/.test(CONFIG.whatsapp);
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONFIG.email);
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const productContainer = document.querySelector("#products");
function renderProducts(){
  const shown=products;
  productContainer.replaceChildren();
  shown.forEach(product=>{
    const article=document.createElement("article"); article.className="product-card";
    const visual=document.createElement("div");visual.className="product-visual";
    visual.innerHTML=`<span class="product-label">CONSULTAR</span><img class="product-photo" src="assets/${product.photo}" alt="" loading="lazy">`;
    const body=document.createElement("div");body.className="product-body";
    const title=document.createElement("h3");title.textContent=product.name;
    const description=document.createElement("p");description.textContent=product.description;
    const button=document.createElement("button");button.type="button";button.className="product-link";button.textContent="Solicitar información ↗";
    button.addEventListener("click",()=>{
      if(validPhone){window.open(waLink(`Hola, quisiera consultar por ${product.name} en CyR Seguridad.`),"_blank","noopener,noreferrer");}
      else {document.querySelector("#contacto").scrollIntoView({behavior:"smooth"});document.querySelector("#form-status").textContent="El WhatsApp aún no está configurado. Completa el número real en script.js para habilitar consultas.";}
    });
    body.append(title,description,button);article.append(visual,body);productContainer.append(article);
  });
}
renderProducts();
// Desplazamiento horizontal del catálogo mediante botones, trackpad o gesto táctil.
const catalogPrev=document.querySelector("#catalog-prev");
const catalogNext=document.querySelector("#catalog-next");
const moveCatalog=direction=>{
  const card=productContainer.querySelector(".product-card");
  const amount=card ? card.getBoundingClientRect().width+22 : 340;
  productContainer.scrollBy({left:direction*amount,behavior:"smooth"});
};
catalogPrev.addEventListener("click",()=>moveCatalog(-1));
catalogNext.addEventListener("click",()=>moveCatalog(1));
const updateCatalogArrows=()=>{
  catalogPrev.disabled=productContainer.scrollLeft<4;
  catalogNext.disabled=productContainer.scrollLeft+productContainer.clientWidth>=productContainer.scrollWidth-4;
};
productContainer.addEventListener("scroll",updateCatalogArrows,{passive:true});
window.addEventListener("resize",updateCatalogArrows);
requestAnimationFrame(updateCatalogArrows);
document.querySelector("#year").textContent=new Date().getFullYear();
if(validPhone){document.querySelector("#whatsapp-display").textContent="+"+CONFIG.whatsapp;const float=document.querySelector("#floating-whatsapp");float.href=waLink("Hola, quisiera información sobre sus productos EPP.");float.target="_blank";float.rel="noopener noreferrer";float.setAttribute("aria-label","Consultar por WhatsApp");}
if(validEmail){const email=document.querySelector("#email-display");const a=document.createElement("a");a.href="mailto:"+CONFIG.email;a.textContent=CONFIG.email;email.replaceChildren(a);}
document.querySelector("#contact-form").addEventListener("submit",event=>{
  event.preventDefault();const status=document.querySelector("#form-status");
  if(!validPhone){status.textContent="Antes de enviar consultas, configura el número de WhatsApp real en script.js.";return;}
  const name=document.querySelector("#customer-name").value.trim();
  const company=document.querySelector("#customer-company").value.trim();
  const request=document.querySelector("#customer-request").value.trim();
  if(!name||!request){status.textContent="Completa tu nombre y consulta.";return;}
  const message=`Hola, soy ${name}${company?" de "+company:""}. Quisiera cotizar: ${request}`;
  window.open(waLink(message),"_blank","noopener,noreferrer");
  status.textContent="Se abrió WhatsApp con tu consulta. Revisa el mensaje y pulsa enviar.";
});
const toggle=document.querySelector(".menu-toggle"),links=document.querySelector(".nav-links");
toggle.addEventListener("click",()=>{const open=links.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");});
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Abrir menú");}));
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.1});
 document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));

// V8: mostrar Volver arriba solo cuando el visitante se haya desplazado.
const backToTop = document.querySelector('#back-to-top');
const updateBackToTop = () => backToTop.classList.toggle('show', window.scrollY > 450);
window.addEventListener('scroll', updateBackToTop, {passive:true});
updateBackToTop();


// V14: UNA sola animación, basada en la lógica probada del botón V11.
// Se aplica a todos los enlaces internos y al botón de volver arriba.
let scrollAnimationId = null;
const elevatorEase = t => t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
function elevatorTo(targetY) {
  if (scrollAnimationId !== null) cancelAnimationFrame(scrollAnimationId);
  const root = document.documentElement;
  const startY = window.scrollY || root.scrollTop || 0;
  const maxY = Math.max(0, root.scrollHeight - window.innerHeight);
  const endY = Math.max(0, Math.min(maxY, targetY));
  const distance = endY - startY;
  if (Math.abs(distance) < 2) return;
  // Como en la V11: durante la animación se desactiva el suavizado nativo.
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  const duration = Math.min(2000, Math.max(1150, Math.abs(distance) * 0.48));
  const startTime = performance.now();
  const animate = now => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, Math.round(startY + distance * elevatorEase(progress)));
    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, endY);
      root.style.scrollBehavior = previousBehavior;
      scrollAnimationId = null;
    }
  };
  scrollAnimationId = requestAnimationFrame(animate);
}
// Captura el clic antes del comportamiento por defecto del navegador.
document.addEventListener('click', function(event) {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;
  const hash = anchor.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.getElementById(hash.substring(1));
  if (!target) return;
  event.preventDefault();
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.getBoundingClientRect().height + 8 : 0;
  const destination = hash === '#inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerHeight;
  elevatorTo(destination);
  if (anchor.closest('.nav-links')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menú');
  }
}, true);
