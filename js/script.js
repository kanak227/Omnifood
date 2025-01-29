console.log("Hello World!");
const myName="Gaurav Karakoti";
const h1=document.querySelector(".heading-primary");
console.log(myName);
console.log(h1);
// h1.addEventListener("click",function(){
//     h1.textContent=myName;
//     h1.style.backgroundColor="red";
//     h1.style.padding="5rem";
// });

///////////////////////////////////////////////////
// const yearEl=document.querySelector(".year");
// const currentYear=new Date().getFullYear();
// yearEl.textContent=currentYear;

///////////////////////////////////////////////////
const btnNavEl=document.querySelector(".btn-mobile-nav");
const headerEl=document.querySelector(".header");
btnNavEl.addEventListener("click",function(){
    headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////
const sectionHeroEl=document.querySelector(".section-hero");
const obs=new IntersectionObserver(function(entries){
    const ent=entries[0];
    console.log(ent);
    if(ent.isIntersecting===false) {
        document.querySelector("body").classList.add("sticky");
    }
    if(ent.isIntersecting===true) {
        document.querySelector("body").classList.remove("sticky");
    }
}, {
    root:null,
    threshold:0,
    rootMargin:"-80px"
});
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////
const allLinks=document.querySelectorAll("a:link");
allLinks.forEach(function(link){
    link.addEventListener("click",function(e){
        e.preventDefault();
        const href=link.getAttribute("href");
        if(href==="#") 
            window.scrollTo({
                top:0,
                behavior:"smooth"
            });
        if(href!=="#" && href.startsWith("#")){
            const sectionEl=document.querySelector(href);
            sectionEl.scrollIntoView({behavior:"smooth"});
        }
        if(link.classList.contains("main-nav-link"))
            headerEl.classList.toggle("nav-open");
    });
});

///////////////////////////////////////////////////
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);
    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();