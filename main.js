
AOS.init();

// DARK MODE
function toggleMode(){
document.body.classList.toggle('light');
}

// CHATBOT
function handleChat(e){
if(e.key==='Enter'){
let input=document.getElementById('chatInput');
let msg=input.value;
let body=document.getElementById('chatBody');

body.innerHTML += `<p><b>You:</b> ${msg}</p>`;

let reply="Welcome! Ask about menu, reservations or drinks 🍹";

if(msg.toLowerCase().includes("menu")) reply="We have food, drinks, desserts 🍰";
if(msg.toLowerCase().includes("book")) reply="Click Book Now to reserve a table.";

body.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

input.value="";
}
}

// SLIDER
let index=0;
function moveSlide(dir){
const slides=document.getElementById('slides');
let total=slides.children.length;

index+=dir;
if(index<0) index=total-1;
if(index>=total) index=0;

slides.style.transform=`translateX(-${index*100}%)`;
}
setInterval(()=>moveSlide(1),4000);


function toggleMenu(){document.getElementById('menu').classList.toggle('active')}
function openModal(){document.getElementById('bookingModal').style.display='flex'}
window.onclick=e=>{if(e.target.id==='bookingModal')e.target.style.display='none'}

window.onscroll=()=>{document.getElementById('topBtn').style.display=window.scrollY>300?'block':'none'}
function scrollTopPage(){window.scrollTo({top:0,behavior:'smooth'})}

const counters = document.querySelectorAll('.stat');
counters.forEach(c => {
  const update = () => {
    let t = +c.dataset.count;
    let n = +c.innerText;
    let i = t / 100;
    if (n < t) {
      c.innerText = Math.ceil(n + i);
      setTimeout(update, 20);
    } else c.innerText = t;
  };
  update();
});
// THREE JS BACKGROUND
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry=new THREE.TorusKnotGeometry(10,3,100,16);
const material=new THREE.MeshBasicMaterial({color:0xd4af37,wireframe:true});
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

camera.position.z=30;

function animate(){
requestAnimationFrame(animate);
mesh.rotation.x+=0.005;
mesh.rotation.y+=0.005;
renderer.render(scene,camera);
}
animate();


// REMOVE LOADER AFTER PAGE LOAD
window.addEventListener('load', ()=>{
setTimeout(()=>{
const loader = document.getElementById('loader');
if(loader){
loader.style.display='none';
}
},2000);
});

function openMenu(){
document.getElementById('menuModal').style.display='flex';
}

function closeMenu(){
document.getElementById('menuModal').style.display='none';
}


setTimeout(()=>{
const note=document.createElement('div');
note.innerText="🔥 5 people just booked a table!";
note.style.position='fixed';
note.style.bottom='100px';
note.style.right='20px';
note.style.background='#111';
note.style.padding='10px';
note.style.borderRadius='10px';
document.body.appendChild(note);

setTimeout(()=>note.remove(),4000);
},5000);


document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener('click',function(e){
e.preventDefault();
document.querySelector(this.getAttribute('href'))
.scrollIntoView({behavior:'smooth'});
});
});

document.querySelectorAll('#menu a').forEach(link=>{
link.addEventListener('click',()=>{
document.getElementById('menu').classList.remove('active');
});
});


document.querySelectorAll('a').forEach(link=>{
link.addEventListener('click',function(e){
if(this.href.includes('#')) return;

e.preventDefault();
document.getElementById('pageTransition').classList.add('active');

setTimeout(()=>{
window.location=this.href;
},500);
});
});


document.querySelectorAll('.btn').forEach(btn=>{
btn.addEventListener('click',function(e){
let ripple=document.createElement('span');
ripple.classList.add('ripple');
this.appendChild(ripple);

let x=e.clientX - this.offsetLeft;
let y=e.clientY - this.offsetTop;

ripple.style.left=x+'px';
ripple.style.top=y+'px';

setTimeout(()=>ripple.remove(),600);
});
});


window.addEventListener('scroll',()=>{
let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('#menu a');

sections.forEach(sec=>{
let top=window.scrollY;
let offset=sec.offsetTop - 100;
let height=sec.offsetHeight;
let id=sec.getAttribute('id');

if(top>=offset && top<offset+height){
navLinks.forEach(link=>{
link.classList.remove('active');
document.querySelector('#menu a[href="#'+id+'"]')?.classList.add('active');
});
}
});
});

document.querySelectorAll('.gallery img').forEach(img=>{
img.addEventListener('click',()=>{
document.getElementById('lightbox').style.display='flex';
document.getElementById('lightboxImg').src=img.src;
});
});

document.getElementById('lightbox').onclick=()=>{
document.getElementById('lightbox').style.display='none';
};



