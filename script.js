const products=[
 {img:"products/product-01.jpg",cat:"CHARCOAL",lo:"ຖ່ານຂີ້ເລື່ອຍຂາວ",en:"White Sawdust Charcoal",descLo:"ບໍ່ມີຄວັນ, ຄວາມຮ້ອນສູງ 800°C, ເຜົາ 4–5 ຊົ່ວໂມງ.",descEn:"Low-smoke, high heat up to 800°C, 4–5 hour burn."},
 {img:"products/product-02.jpg",cat:"CHARCOAL",lo:"ຖ່ານໄມ້ຕິ້ວຂາວ",en:"White Tiew Wood Charcoal",descLo:"ຖ່ານພຣີມຽມສະໄຕລ໌ Binchotan, ຮ້ອນນານ.",descEn:"Premium Japanese Binchotan-style charcoal with long heat."},
 {img:"products/product-03.jpg",cat:"CHARCOAL",lo:"ຖ່ານຂີ້ກາເຟ",en:"Coffee Charcoal Briquettes",descLo:"ຜະລິດຈາກຂີ້ກາເຟ ເປັນມິດກັບສິ່ງແວດລ້ອມ.",descEn:"Eco-friendly briquettes made from coffee waste."},
 {img:"products/product-04.jpg",cat:"RUBBER",lo:"ຢາງແຜ່ນດິບ",en:"Raw Rubber Sheets",descLo:"ຄວາມບໍລິສຸດສູງ ສຳລັບອຸດສາຫະກຳ.",descEn:"High-purity rubber sheets for industrial applications."},
 {img:"products/product-05.jpg",cat:"RUBBER",lo:"ຢາງກ້ອນຖ້ວຍ",en:"Cup Lump Rubber",descLo:"100% ທຳມະຊາດ ຈາກຕົ້ນຢາງພາລາລາວ.",descEn:"100% natural rubber from Lao plantations."},
 {img:"products/product-06.jpg",cat:"AGRICULTURE",lo:"ເຂົ້າ, ສາລີ ແລະ ພືດຜັກ",en:"Rice, Corn & Vegetables",descLo:"ຜົນຜະລິດຈາກຊາວກະສິກອນລາວ.",descEn:"Produce sourced from Lao farmers."}
];
const gallery=[
 {url:"gallery/gallery-01.jpg",lo:"ຖ່ານຂີ້ເລື່ອຍຂາວ",en:"White Sawdust Charcoal"},
 {url:"gallery/gallery-02.jpg",lo:"ຖ່ານໄມ້",en:"Wood Charcoal"},
 {url:"gallery/gallery-03.jpg",lo:"ຂີງ",en:"Ginger"},
 {url:"gallery/gallery-04.jpg",lo:"ພືດຜັກກະສິກຳ",en:"Agricultural Produce"},
 {url:"gallery/gallery-05.jpg",lo:"ຢາງພາລາ",en:"Rubber Products"},
 {url:"gallery/gallery-06.jpg",lo:"ສິນຄ້າກະສິກຳ",en:"Agriculture"},
 {url:"gallery/gallery-07.jpg",lo:"ວັດຖຸດິບທຳມະຊາດ",en:"Natural Materials"},
 {url:"agriculture/agri-04.png",lo:"ຊິລິຄອນ 99.9%",en:"Silicon 99.9% Pure"}
];
let lang=localStorage.getItem("inthaninLang")||"lo", currentGallery=0;
const productGrid=document.getElementById("productGrid"), galleryGrid=document.getElementById("galleryGrid");
function renderProducts(){
 productGrid.innerHTML=products.map(p=>`<article class="product-card"><div class="product-art"><img src="${p.img}" alt="${lang==="lo"?p.lo:p.en}" loading="lazy"></div><div class="product-body"><small>${p.cat}</small><h3>${lang==="lo"?p.lo:p.en}</h3><p>${lang==="lo"?p.descLo:p.descEn}</p></div></article>`).join("");
}
function renderGallery(){
 galleryGrid.innerHTML=gallery.map((g,i)=>`<div class="gallery-item" data-index="${i}"><img src="${g.url}" alt="${lang==="lo"?g.lo:g.en}" loading="lazy"><div class="gallery-overlay"><strong>${lang==="lo"?g.lo:g.en}</strong><small>${lang==="lo"?"ເບິ່ງແບບເຕັມ":"View full image"}</small></div></div>`).join("");
 document.querySelectorAll(".gallery-item").forEach(el=>el.onclick=()=>openLightbox(+el.dataset.index));
}
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-lo]").forEach(el=>{el.innerHTML=el.dataset[lang];});
 document.getElementById("langToggle").classList.toggle("en",lang==="en");
 renderProducts();renderGallery();
 localStorage.setItem("inthaninLang",lang);
}
document.getElementById("langToggle").onclick=()=>{lang=lang==="lo"?"en":"lo";applyLanguage()};
document.getElementById("navToggle").onclick=()=>document.getElementById("navMenu").classList.toggle("open");
document.querySelectorAll(".nav-menu a").forEach(a=>a.onclick=()=>document.getElementById("navMenu").classList.remove("open"));
const lightbox=document.getElementById("lightbox"),lbImage=document.getElementById("lbImage"),lbCaption=document.getElementById("lbCaption");
function openLightbox(i){currentGallery=i;updateLightbox();lightbox.classList.add("show")}
function updateLightbox(){const g=gallery[currentGallery];lbImage.src=g.url;lbImage.alt=lang==="lo"?g.lo:g.en;lbCaption.textContent=lang==="lo"?g.lo:g.en}
function closeLightbox(){lightbox.classList.remove("show")}
document.getElementById("lbClose").onclick=closeLightbox;
document.getElementById("lbPrev").onclick=()=>{currentGallery=(currentGallery-1+gallery.length)%gallery.length;updateLightbox()};
document.getElementById("lbNext").onclick=()=>{currentGallery=(currentGallery+1)%gallery.length;updateLightbox()};
lightbox.onclick=e=>{if(e.target===lightbox)closeLightbox()};
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("show"))return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")document.getElementById("lbPrev").click();if(e.key==="ArrowRight")document.getElementById("lbNext").click()});
document.getElementById("waButton").onclick=()=>document.getElementById("waPopup").classList.toggle("show");
document.getElementById("closeWa").onclick=()=>document.getElementById("waPopup").classList.remove("show");
document.getElementById("year").textContent=new Date().getFullYear();
applyLanguage();