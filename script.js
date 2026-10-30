(function(){
  var links=[].slice.call(document.querySelectorAll('.links a'));
  var menu=document.getElementById('menu'), burger=document.getElementById('burger');

  // Menú móvil
  function setMenu(open){menu.classList.toggle('open',open);burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',t(open?'Cerrar menú':'Abrir menú'));}
  burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'));});
  links.forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false);});

  // Sección activa
  var sections=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
  function spy(){
    var y=window.scrollY+(window.innerHeight*0.35), current=0;
    sections.forEach(function(s,i){if(s.offsetTop<=y)current=i;});
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4)current=sections.length-1;
    links.forEach(function(a,i){a.classList.toggle('active',i===current);if(i===current)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  }
  window.addEventListener('scroll',spy,{passive:true});window.addEventListener('resize',spy);spy();

  // Niveles de idioma
  document.querySelectorAll('.dots').forEach(function(d){
    var n=+d.dataset.level;
    for(var i=0;i<5;i++){var el=document.createElement('i');if(i<n)el.className='on';d.appendChild(el);}
  });

  // Animar barras al entrar en pantalla
  function fill(root){
    root.querySelectorAll('.dots i.on').forEach(function(i,k){setTimeout(function(){i.classList.add('show');},k*90);});
    
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fill(e.target);io.unobserve(e.target);}});},{threshold:.25});
    io.observe(document.getElementById('idiomas'));io.observe(document.getElementById('competencias'));
  }else{fill(document);}

  // Acordeón de educación y experiencia
  document.querySelectorAll('.item button').forEach(function(b){
    b.addEventListener('click',function(){
      var it=b.parentElement,open=!it.classList.contains('open');
      it.classList.toggle('open',open);b.setAttribute('aria-expanded',open);
    });
  });

  // Filtro de competencias
  var tabs=document.querySelectorAll('.tab');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      tabs.forEach(function(x){x.setAttribute('aria-pressed',x===t);});
      document.querySelectorAll('.skill').forEach(function(s){
        var show=t.dataset.f==='all'||s.dataset.c===t.dataset.f;
        s.hidden=!show;
        
      });
    });
  });

  // Alt + clic para copiar contacto
  var note=document.getElementById('copyNote');
  document.querySelectorAll('[data-copy]').forEach(function(a){
    a.addEventListener('click',function(e){
      if(!e.altKey)return;
      e.preventDefault();
      if(navigator.clipboard){navigator.clipboard.writeText(a.dataset.copy).then(function(){note.textContent=t('Copiado: ')+a.dataset.copy;});}
    });
  });

  // Idioma y tema
  var EN={
    'Inicio':'Home','Contacto':'Contact','Fortalezas':'Strengths','Idiomas':'Languages','Educación':'Education','Experiencia':'Experience','Competencias':'Skills',
    'Estudiante de SMR':'Microcomputer Systems and Networks student',
    'Me considero capacitado para el puesto de Consultor de TIC: soy una persona respetuosa y amable, con buen manejo del inglés y de las herramientas ofimáticas.':'I consider myself well qualified for the ICT Consultant position: I am a respectful and kind person with a good command of English and office software.',
    'Contactar':'Get in touch','Ver experiencia':'View experience',
    'Correo':'Email','Teléfono':'Phone','Dirección':'Address','Estudios actuales':'Current studies',
    'SMR en Las Palmas San Juan Bosco':'SMR at Las Palmas San Juan Bosco',
    'Calle Padre Claret, n.º 6, Sardina del Sur, Santa Lucía, Gran Canaria':'Calle Padre Claret, no. 6, Sardina del Sur, Santa Lucía, Gran Canaria',
    'Mantén pulsada la tecla Alt y haz clic en el correo o el teléfono para copiarlos.':'Hold the Alt key and click the email or phone number to copy it.',
    'Copiado: ':'Copied: ',
    'Trabajo en equipo':'Teamwork','Me integro bien en grupos y colaboro para sacar las tareas adelante.':'I fit in well with groups and collaborate to get tasks done.',
    'Amable y paciente':'Kind and patient','Trato a las personas con respeto y tengo paciencia para explicar y ayudar.':'I treat people with respect and have the patience to explain and help.',
    'Herramientas ofimáticas':'Office tools','Manejo con soltura Word, Google Docs, Google Presentaciones, Canva y otras.':'I work comfortably with Word, Google Docs, Google Slides, Canva and others.',
    'Español':'Spanish','Nativo':'Native','Inglés':'English',
    'Grado medio de SMR':'Intermediate vocational degree in SMR',
    'Las Palmas San Juan Bosco · En progreso, próximo a acabar en 2028':'Las Palmas San Juan Bosco · In progress, due to finish in 2028',
    'Cursando actualmente 1.º de Sistemas Microinformáticos y Redes (SMR).':'Currently in the first year of Microcomputer Systems and Networks (SMR).',
    'Graduado con mérito en inglés':'Graduated with merit in English','Academia Success · República Dominicana':'Success Academy · Dominican Republic',
    'Me gradué en lengua extranjera inglés con méritos.':'I graduated in English as a foreign language with merit.',
    'Las Palmas San Juan Bosco · Actualidad':'Las Palmas San Juan Bosco · Present',
    'Formación en informática y redes.':'Training in IT and networking.',
    'Uso de herramientas ofimáticas como Word, Google Docs, Google Presentaciones y Canva.':'Use of office tools such as Word, Google Docs, Google Slides and Canva.',
    'Creación de un juego en Microsoft Arcade':'Creating a game in Microsoft Arcade','Proyecto personal':'Personal project',
    'Hice un juego en el que se controla una pelota para conseguir monedas y obtener puntos.':'I made a game where you control a ball to collect coins and earn points.',
    'Los puntos se usan para activar habilidades.':'Points are used to unlock abilities.',
    'Todas':'All','Ofimática':'Office tools','Personales':'Personal','Ofimática y diseño':'Office tools and design',
    'Google Presentaciones':'Google Slides','Otras herramientas':'Other tools','Español nativo':'Native Spanish','Inglés B1 – B2':'English B1 – B2',
    'Respeto':'Respect','Amabilidad':'Kindness','Paciencia':'Patience',
    'Principal':'Main','Filtrar competencias':'Filter skills','Abrir menú':'Open menu','Cerrar menú':'Close menu',
    'Daniel Pita Vicioso · Currículum':'Daniel Pita Vicioso · Resume'
  };
  var lang='es',theme=document.documentElement.getAttribute('data-theme')||'light';
  try{var sl=localStorage.getItem('cv-lang');if(sl==='en'||sl==='es')lang=sl;else if((navigator.language||'').slice(0,2)==='en')lang='en';}catch(e){}
  var langBtn=document.getElementById('langBtn'),themeBtn=document.getElementById('themeBtn');
  var NOTE_ES=note.textContent.trim(),TITLE_ES=document.title;
  function t(s){return lang==='en'&&EN[s]?EN[s]:s;}
  function applyLang(){
    note.textContent=NOTE_ES;
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n,list=[];
    while((n=w.nextNode()))list.push(n);
    list.forEach(function(n){
      var p=n.parentElement;
      if(!p||p.closest('.tools,script,style'))return;
      if(n._es===undefined){var v=n.nodeValue.trim();if(!v)return;n._es=v;}
      n.nodeValue=t(n._es);
    });
    document.documentElement.lang=lang;
    document.title=t(TITLE_ES);
    document.querySelector('nav').setAttribute('aria-label',t('Principal'));
    document.querySelector('.tabs').setAttribute('aria-label',t('Filtrar competencias'));
    burger.setAttribute('aria-label',t(menu.classList.contains('open')?'Cerrar menú':'Abrir menú'));
    langBtn.textContent=lang==='es'?'EN':'ES';
    var ll=lang==='es'?'Switch to English':'Cambiar a español';
    langBtn.setAttribute('aria-label',ll);langBtn.title=ll;
    updateTheme();
  }
  function updateTheme(){
    var dark=theme==='dark';
    themeBtn.firstChild.textContent=dark?'☀':'☾';
    var l=lang==='es'?(dark?'Activar modo claro':'Activar modo oscuro'):(dark?'Switch to light mode':'Switch to dark mode');
    themeBtn.setAttribute('aria-label',l);themeBtn.title=l;
  }
  langBtn.addEventListener('click',function(){
    lang=lang==='es'?'en':'es';
    try{localStorage.setItem('cv-lang',lang);}catch(e){}
    applyLang();
  });
  themeBtn.addEventListener('click',function(){
    theme=theme==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',theme);
    try{localStorage.setItem('cv-theme',theme);}catch(e){}
    updateTheme();
  });
  applyLang();
})();
