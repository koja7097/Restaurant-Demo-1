
AOS.init();

// DARK MODE
function toggleMode(){
document.body.classList.toggle('light');

const icon = document.getElementById('modeIcon');

if(document.body.classList.contains('light')){
icon.classList.remove('fa-moon');
icon.classList.add('fa-sun');
}else{
icon.classList.remove('fa-sun');
icon.classList.add('fa-moon');
}
}

// CHATBOT
/* function handleChat(e){
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
} */

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

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const c = entry.target;

      const update = () => {
        let t = +c.dataset.count;
        let n = +c.innerText;
        let i = t / 100;

        if (n < t) {
          c.innerText = Math.ceil(n + i);
          setTimeout(update, 20);
        } else {
          c.innerText = t;
        }
      };

      update();
      observer.unobserve(c);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => observer.observe(c));
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


const messages = [
"🔥 2 people just booked a VIP table",
"🍷 Someone ordered cocktails",
"🍽️ New reservation just came in",
"⭐ A customer left a 5-star review",
"🎉 Event booking confirmed"
];

setInterval(()=>{
const note = document.createElement('div');

note.innerText = messages[Math.floor(Math.random()*messages.length)];

note.style.position='fixed';
note.style.bottom='100px';
note.style.right='20px';
note.style.background='#111';
note.style.padding='10px 15px';
note.style.borderRadius='10px';
note.style.fontSize='14px';
note.style.opacity='0';
note.style.transition='0.5s';

document.body.appendChild(note);

setTimeout(()=> note.style.opacity='1',100);

setTimeout(()=>{
note.style.opacity='0';
setTimeout(()=>note.remove(),500);
},4000);

},8000);


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



function filterMenu(category){
  const items = document.querySelectorAll('.menu-item');

  items.forEach(item => {
    if(category === 'all'){
      item.style.display = 'block';
    } else {
      item.style.display = item.classList.contains(category) ? 'block' : 'none';
    }
  });
} 

function toggleChat(){
  const chat = document.getElementById('chatbot');
  chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage(){
  handleChat({key:'Enter'});
}

function handleChat(e){
if(e.key === 'Enter'){

let input = document.getElementById('chatInput');
let msg = input.value.trim().toLowerCase();
let body = document.getElementById('chatBody');

if(msg === "") return;

// User message
body.innerHTML += `<div class="user-msg">${msg}</div>`;
input.value="";
body.scrollTop = body.scrollHeight;

// Typing indicator
body.innerHTML += `
<div class="bot-msg typing" id="typing">
  <span></span><span></span><span></span>
</div>`;
body.scrollTop = body.scrollHeight;

// Smart responses
setTimeout(()=>{

let reply = "I’m here to help 😊";

if(msg.includes("menu")) reply="We offer a variety of premium dishes, desserts, and drinks 🍽️";
else if(msg.includes("price")) reply="Our meals range from ₦4,000 to ₦20,000 depending on your choice 💰";
else if(msg.includes("book") || msg.includes("reserve")) reply="You can easily reserve a table using the 'Reserve Now' button.";
else if(msg.includes("location")) reply="We’re located in the city center 📍 Would you like directions?";
else if(msg.includes("open") || msg.includes("time")) reply="We’re open daily from 10AM to 12AM ⏰";
else if(msg.includes("drink")) reply="We serve cocktails, wines, and premium spirits 🍸";
else if(msg.includes("hello") || msg.includes("hi")) reply="Hello 👋 Great to have you here!";
else if(msg.includes("best")) reply="Our chef’s specials are highly recommended 🔥 Would you like to see them?";
else if(msg.includes("delivery")) reply="Yes, we offer delivery 🚚. Would you like to place an order?";

// Remove typing
document.getElementById("typing").remove();

// Bot reply
body.innerHTML += `<div class="bot-msg">${reply}</div>`;
body.scrollTop = body.scrollHeight;

}, 800);

}
}

window.addEventListener('scroll',()=>{
let scrollTop = document.documentElement.scrollTop;
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

let progress = (scrollTop / height) * 100;

document.getElementById('progressBar').style.width = progress + "%";
});

document.addEventListener('mousemove',(e)=>{
const glow = document.getElementById('cursorGlow');
glow.style.left = e.clientX + 'px';
glow.style.top = e.clientY + 'px';
});

window.addEventListener('scroll',()=>{
const hero = document.querySelector('.hero');
let offset = window.scrollY;

hero.style.backgroundPositionY = offset * 0.5 + "px";
});

function bookNow(){
let message = "Hello, I’d like to reserve a table at Elite Bites.";
let phone = "2347060497509"; // replace with real number

let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
window.open(url, '_blank');
}