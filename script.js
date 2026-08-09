const header = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const startBtn = document.getElementById("startBtn");
const soundBtn = document.getElementById("soundBtn");
const heroVideo = document.getElementById("heroVideo");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuBtn.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuBtn.textContent = open ? "CERRAR" : "MENÚ";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuBtn.textContent = "MENÚ";
  });
});

startBtn.addEventListener("click", () => {
  document.getElementById("capitulos").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// HOME: intenta iniciar automáticamente CON sonido.
// Si el navegador bloquea autoplay con audio, mantiene el video en autoplay silenciado
// y el mismo botón permite activar el sonido con un clic.
(async () => {
  if (!heroVideo) return;
  const icon = soundBtn?.querySelector(".sound-icon");
  const copy = soundBtn?.querySelector(".sound-copy");
  heroVideo.volume = 0.82;
  heroVideo.muted = false;
  try {
    await heroVideo.play();
    soundBtn?.setAttribute("aria-pressed", "true");
    if (icon) icon.textContent = "🔊";
    if (copy) copy.textContent = "Silenciar";
  } catch (error) {
    heroVideo.muted = true;
    try { await heroVideo.play(); } catch (_) {}
    soundBtn?.setAttribute("aria-pressed", "false");
    if (icon) icon.textContent = "🔇";
    if (copy) copy.textContent = "Activar sonido";
  }
})();

soundBtn?.addEventListener("click", async () => {
  const icon = soundBtn.querySelector(".sound-icon");
  const copy = soundBtn.querySelector(".sound-copy");
  if (!heroVideo) return;

  try {
    heroVideo.muted = !heroVideo.muted;
    heroVideo.volume = 0.82;
    if (heroVideo.paused) await heroVideo.play();
    const active = !heroVideo.muted;
    soundBtn.setAttribute("aria-pressed", String(active));
    if (icon) icon.textContent = active ? "🔊" : "🔇";
    if (copy) copy.textContent = active ? "Silenciar" : "Activar sonido";
  } catch (error) {
    console.error("No se pudo cambiar el sonido del video de portada:", error);
    if (copy) copy.textContent = "Haz clic otra vez";
  }
});

// CAPÍTULO I: desplazamiento interno
document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scrollTo);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// CAPÍTULO I: cronología 2014–2026
const timelineData = {
  "2014": {
    "title": "La Ley Universitaria divide a la comunidad académica",
    "copy": "Marchas y posiciones contrapuestas acompañaron el debate de la Ley Universitaria N.° 30220. Sectores universitarios cuestionaron una posible afectación de la autonomía, mientras otros respaldaron mayores controles de calidad.",
    "reach": "UNMSM, UNI, UNFV y universidades de regiones",
    "axis": "Reforma universitaria"
  },
  "2015": {
    "title": "Conflictos por la adecuación a la nueva ley",
    "copy": "La aplicación de la reforma generó disputas por la permanencia de rectores, la convocatoria a elecciones y la conformación de asambleas estatutarias.",
    "reach": "Universidades públicas; caso representativo: UNMSM",
    "axis": "Elecciones y gobernanza"
  },
  "2016": {
    "title": "Defensa de la reforma universitaria",
    "copy": "Persistieron problemas de gobernabilidad en universidades públicas. Estudiantes de distintas instituciones de Lima marcharon en defensa de la continuidad de la reforma universitaria.",
    "reach": "Universidades públicas y privadas de Lima",
    "axis": "Defensa de la reforma"
  },
  "2017": {
    "title": "Rechazo a cobros y decisiones administrativas",
    "copy": "Las protestas estudiantiles incorporaron demandas vinculadas con pagos, servicios, gestión de recursos y decisiones adoptadas por las autoridades universitarias.",
    "reach": "Caso representativo: UNMSM",
    "axis": "Derechos estudiantiles"
  },
  "2018": {
    "title": "Tomas por planes académicos, servicios y gestión",
    "copy": "Se registraron tomas, bloqueos y plantones por la implementación de planes de estudio, cobros, cierre de instituciones y problemas de gestión.",
    "reach": "UNMSM, UNFV, PUCP y UPIG",
    "axis": "Gestión y calidad educativa"
  },
  "2019": {
    "title": "Defensa del campus universitario",
    "copy": "Estudiantes, docentes y egresados tomaron el campus de San Marcos en rechazo a la cesión de parte del terreno universitario para una obra vial.",
    "reach": "UNMSM",
    "axis": "Defensa del campus"
  },
  "2020": {
    "title": "Universitarios en una movilización nacional",
    "copy": "Miles de jóvenes y estudiantes participaron en las protestas contra el gobierno de Manuel Merino. Universidades públicas suspendieron actividades tras las muertes de Inti Sotelo y Bryan Pintado.",
    "reach": "Participación universitaria a nivel nacional",
    "axis": "Democracia y participación juvenil"
  },
  "2021": {
    "title": "Activismo institucional y digital",
    "copy": "El debate sobre la composición de la SUNEDU y los proyectos para modificar la reforma universitaria impulsó pronunciamientos y campañas en redes.",
    "reach": "Comunidad universitaria nacional",
    "axis": "Defensa de SUNEDU"
  },
  "2022": {
    "title": "La contrarreforma reactiva la movilización",
    "copy": "Los cambios legislativos relacionados con SUNEDU reavivaron las protestas. En regiones también surgieron conflictos por servicios universitarios, como el comedor estudiantil.",
    "reach": "Colectivos nacionales y Universidad Nacional de Huancavelica",
    "axis": "Reforma y bienestar estudiantil"
  },
  "2023": {
    "title": "Los campus durante la crisis política",
    "copy": "Universidades sirvieron como espacios de organización y alojamiento para manifestantes. Las intervenciones y tomas abrieron debates sobre autonomía, derechos humanos y uso de la fuerza.",
    "reach": "UNMSM, UNC y Universidad Nacional de Huancavelica",
    "axis": "Crisis política nacional"
  },
  "2024": {
    "title": "Elecciones universitarias cuestionadas",
    "copy": "Estudiantes tomaron campus para exigir transparencia, respeto a la representación estudiantil y revisión de procesos electorales internos.",
    "reach": "UNCP y UNMSM",
    "axis": "Democracia universitaria"
  },
  "2025": {
    "title": "Ola de tomas por gestión y autonomía",
    "copy": "Varias universidades registraron protestas por seguridad, matrícula, infraestructura, servicios, reconocimiento de autoridades y autonomía universitaria.",
    "reach": "UNALM, UNI, UNFV y UNA Puno",
    "axis": "Crisis de gestión"
  },
  "2026": {
    "title": "Reelección y representación estudiantil",
    "copy": "Estudiantes protestaron contra una propuesta de reelección inmediata de autoridades y reclamaron elecciones transparentes y mayor participación en el gobierno universitario.",
    "reach": "Caso representativo: UNMSM",
    "axis": "Gobernanza y representación"
  }
};

const timelineEvents = document.querySelectorAll(".timeline-event");
const timelineYear = document.getElementById("timelineYear");
const timelineAxis = document.getElementById("timelineAxis");
const timelineTitle = document.getElementById("timelineTitle");
const timelineCopy = document.getElementById("timelineCopy");
const timelineReach = document.getElementById("timelineReach");

function showTimelineYear(year) {
  const item = timelineData[year];
  if (!item) return;

  timelineYear.textContent = year;
  timelineAxis.textContent = item.axis;
  timelineTitle.textContent = item.title;
  timelineCopy.textContent = item.copy;
  timelineReach.textContent = item.reach;
}

timelineEvents.forEach((eventButton) => {
  eventButton.addEventListener("click", () => {
    timelineEvents.forEach((item) => item.classList.remove("active"));
    eventButton.classList.add("active");
    showTimelineYear(eventButton.dataset.year);
  });
});

// CAPÍTULO I: mural digital
const lightbox = document.getElementById("wallLightbox");
const lightboxImage = document.getElementById("wallLightboxImage");
const lightboxClose = document.getElementById("wallLightboxClose");

document.querySelectorAll(".wall-photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    lightboxImage.src = photo.dataset.image;
    lightboxImage.alt = photo.querySelector("img").alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeWallLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeWallLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeWallLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeWallLightbox();
  }
});


// =========================================================
// CAPÍTULO II · GOBERNANZA
// =========================================================
const c2Tabs = document.querySelectorAll(".c2-tab");
const c2Views = document.querySelectorAll(".c2-org-view");
const c2Info = document.getElementById("c2Info");

c2Tabs.forEach((button) => {
  button.addEventListener("click", () => {
    c2Tabs.forEach((item) => item.classList.remove("active"));
    c2Views.forEach((view) => view.classList.remove("active"));

    button.classList.add("active");

    const selected = document.getElementById(button.dataset.c2View);
    if (selected) selected.classList.add("active");

    if (c2Info) {
      c2Info.textContent = "Selecciona un bloque para ver una explicación breve.";
    }
  });
});

document.querySelectorAll(".c2-node").forEach((node) => {
  node.addEventListener("click", () => {
    if (c2Info) c2Info.textContent = node.dataset.c2Info;
  });
});


// =========================================================
// CAPÍTULO III · REFORMA
// =========================================================

// Expedientes desplegables
document.querySelectorAll(".c3-file-button").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.closest(".c3-file");
    const isOpen = file.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));

    const label = button.querySelector(".c3-open-label");
    if (label) label.textContent = isOpen ? "Cerrar expediente" : "Abrir expediente";
  });
});






// =========================================================
// MAPA FLOURISH: AJUSTE AL CONTENEDOR
// =========================================================
function sizeFlourishMap() {
  const container = document.querySelector(".c3-map-interactive .flourish-embed");
  const iframe = container?.querySelector("iframe");
  if (!container || !iframe) return;

  iframe.style.setProperty("width", "100%", "important");
  iframe.style.setProperty("height", "100%", "important");
  iframe.style.setProperty("min-height", "0", "important");
  iframe.style.setProperty("max-height", "none", "important");
  iframe.style.setProperty("position", "absolute", "important");
  iframe.style.setProperty("inset", "0", "important");
  iframe.style.setProperty("transform", "none", "important");
}

const c3InteractiveMap = document.querySelector(".c3-map-interactive .flourish-embed");

if (c3InteractiveMap) {
  const c3MapObserver = new MutationObserver(sizeFlourishMap);
  c3MapObserver.observe(c3InteractiveMap, {
    childList: true,
    subtree: true,
    attributes: true
  });

  window.addEventListener("load", sizeFlourishMap);
  window.addEventListener("resize", sizeFlourishMap);
  [250, 600, 1200, 2200].forEach((delay) => {
    window.setTimeout(sizeFlourishMap, delay);
  });
}


// HOME: al abandonar la portada, vuelve a silenciar el video.
const homeHero = document.querySelector(".hero");
if (homeHero && heroVideo) {
  const homeSoundObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && !heroVideo.muted) {
        heroVideo.muted = true;
        const icon = soundBtn?.querySelector(".sound-icon");
        const copy = soundBtn?.querySelector(".sound-copy");
        if (icon) icon.textContent = "🔇";
        if (copy) copy.textContent = "Activar sonido";
        soundBtn?.setAttribute("aria-pressed", "false");
      }
    });
  }, { threshold: 0.12 });
  homeSoundObserver.observe(homeHero);
}

const c4Filters = document.querySelectorAll(".c4-filter");
const c4Items = document.querySelectorAll(".c4-item");
const c4Modal = document.getElementById("c4Modal");
const c4ModalClose = document.getElementById("c4ModalClose");
const c4ModalMedia = document.getElementById("c4ModalMedia");
const c4ModalTitle = document.getElementById("c4ModalTitle");
const c4ModalStatus = document.getElementById("c4ModalStatus");

c4Filters.forEach((button) => {
  button.addEventListener("click", () => {
    c4Filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    c4Items.forEach((item) => {
      const matches =
        filter === "all" ||
        item.dataset.type === filter;

      item.classList.toggle("c4-hidden", !matches);
    });
  });
});

function c4ShowMissingMessage(src) {
  if (!c4ModalStatus) return;

  c4ModalStatus.textContent =
    `Si este archivo todavía no se reproduce, coloca “${src.split("/").pop()}” dentro de la carpeta assets.`;
}

function c4OpenMedia(item) {
  if (!c4Modal || !c4ModalMedia || !c4ModalTitle) return;

  const type = item.dataset.type;
  const src = item.dataset.src;
  const title = item.dataset.title || "Archivo";

  c4ModalTitle.textContent = title;
  c4ModalMedia.innerHTML = "";
  if (c4ModalStatus) c4ModalStatus.textContent = "";

  let media;

  if (type === "audio") {
    media = document.createElement("audio");
    media.controls = true;
    media.preload = "metadata";
    media.src = src;
  }

  if (type === "video") {
    media = document.createElement("video");
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
    media.src = src;
  }

  if (type === "photo") {
    media = document.createElement("img");
    media.alt = title;
    media.src = src;
  }

  if (!media) return;

  media.addEventListener("error", () => c4ShowMissingMessage(src));
  c4ModalMedia.appendChild(media);

  c4Modal.classList.add("open");
  c4Modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

c4Items.forEach((item) => {
  item.addEventListener("click", () => c4OpenMedia(item));
});

function c4CloseModal() {
  if (!c4Modal || !c4ModalMedia) return;

  c4Modal.classList.remove("open");
  c4Modal.setAttribute("aria-hidden", "true");

  c4ModalMedia.querySelectorAll("audio,video").forEach((media) => {
    media.pause();
  });

  c4ModalMedia.innerHTML = "";
  document.body.style.overflow = "";
}

if (c4ModalClose) {
  c4ModalClose.addEventListener("click", c4CloseModal);
}

if (c4Modal) {
  c4Modal.addEventListener("click", (event) => {
    if (event.target === c4Modal) c4CloseModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && c4Modal?.classList.contains("open")) {
    c4CloseModal();
  }
});

// V7 galería memoria
const m7=document.getElementById('m7Gallery');document.getElementById('m7Open')?.addEventListener('click',()=>{m7.classList.add('open');document.body.style.overflow='hidden'});document.getElementById('m7Close')?.addEventListener('click',()=>{m7.classList.remove('open');document.body.style.overflow='' });



// V11: Yachai se aparta automáticamente del footer.
const v11Footer=document.querySelector(".v9-footer"),v11Yachai=document.querySelector(".c3-yachai-float");
if(v11Footer&&v11Yachai){new IntersectionObserver(es=>es.forEach(e=>v11Yachai.classList.toggle("v11-footer-safe",e.isIntersecting)),{threshold:.02}).observe(v11Footer)}


// ===== V13 COMPLETA · MURO CIUDADANO LOCAL =====
try{
  const form=document.getElementById("eemWallForm");
  const name=document.getElementById("eemWallName");
  const uni=document.getElementById("eemWallUni");
  const text=document.getElementById("eemWallText");
  const count=document.getElementById("eemWallCount");
  const status=document.getElementById("eemWallStatus");
  const list=document.getElementById("c5Wall");
  const total=document.getElementById("eemWallTotal");
  const KEY="educacionEnMarcha_muro_v13";

  const getNotes=()=>{
    try{return JSON.parse(localStorage.getItem(KEY)||"[]")}
    catch(_){return[]}
  };

  const makeNote=(note,isNew=false)=>{
    const article=document.createElement("article");
    article.className="c5-note eem-note user-note"+(isNew?" is-new":"");

    const quote=document.createElement("span");
    quote.className="eem-quote";
    quote.textContent="“";

    const p=document.createElement("p");
    p.textContent=note.text;

    const footer=document.createElement("footer");
    const b=document.createElement("b");
    b.textContent=note.name||"Anónimo";

    const small=document.createElement("small");
    small.textContent=[note.uni,note.date].filter(Boolean).join(" · ")||"Voz del recorrido";

    footer.append(b,small);
    article.append(quote,p,footer);
    return article;
  };

  const updateTotal=n=>{
    total.textContent=String(20+n).padStart(2,"0")+" reflexiones";
    const tn=document.getElementById("eemWallTotalNumber"); if(tn) tn.textContent=20+n;
    const un=document.getElementById("eemWallUserNumber"); if(un) un.textContent=n;
  };

  const render=()=>{
    list.querySelectorAll(".user-note").forEach(el=>el.remove());
    const notes=getNotes();
    [...notes].reverse().forEach(note=>list.prepend(makeNote(note)));
    updateTotal(notes.length);
  };

  text?.addEventListener("input",()=>count.textContent=text.value.length);

  form?.addEventListener("submit",e=>{
    e.preventDefault();

    const value=text.value.trim();
    if(value.length<8){
      status.textContent="Escribe una reflexión un poco más completa.";
      text.focus();
      return;
    }

    const notes=getNotes();
    const note={
      text:value,
      name:name.value.trim().slice(0,60),
      uni:uni.value.trim().slice(0,70),
      date:new Date().toLocaleDateString("es-PE",{day:"2-digit",month:"short",year:"numeric"})
    };

    notes.unshift(note);
    localStorage.setItem(KEY,JSON.stringify(notes.slice(0,40)));

    list.prepend(makeNote(note,true));
    form.reset();
    count.textContent="0";
    updateTotal(Math.min(notes.length,40));
    status.textContent="Tu reflexión ya forma parte del mural en este dispositivo.";
    setTimeout(()=>status.textContent="",5000);
  });

  render();
}catch(e){
  console.error("Muro ciudadano V13:",e);
}

// YachAI se aparta del footer al final del recorrido.
const v13Footer=document.querySelector(".v9-footer");
const v13Yachai=document.querySelector(".c3-yachai-float");
if(v13Footer&&v13Yachai){
  new IntersectionObserver(entries=>{
    v13Yachai.classList.toggle(
      "v13-footer-safe",
      entries.some(entry=>entry.isIntersecting)
    );
  },{threshold:.01}).observe(v13Footer);
}
