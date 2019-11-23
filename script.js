// GLOBAL VARS
const create = document.getElementById('create');
const terrain = document.getElementById('terrain');
const btnDemarrer = document.getElementById('start');
const inputNbCibles = document.getElementById('nbtargets');
let ciblesRestantes = document.getElementById('remaining');
const divTargetOn = document.getElementsByClassName('target');
let t; //Interval var

// VARS chrono management
let minutes = document.getElementById('minutes');
let secondes = document.getElementById('seconds');
let tenth = document.getElementById('tenth');
let ms=0, s=0, mn=0;


function ajout(){
	stopChrono();
	resetChrono();
	startChrono();
	
	
	//on enleve tout les divs
	while(terrain.firstChild){
		terrain.removeChild(terrain.firstChild);
	}
	
	let nombreDeCibles = parseInt(inputNbCibles.value); //on regarde combien de cibles sont voulues et on les converties en "number"
	ciblesRestantes.textContent = nombreDeCibles;
	const tabNbCibles = Array.from({length:nombreDeCibles}); //on créer un tab de la longueur des cibles voulues
	
	tabNbCibles.forEach(function(){ //pour chaque entrée du tableau on :
		const divElt = document.createElement('div');
		let largeurDuTerrain = parseInt(getComputedStyle(terrain).width);
		let hauteurDuTerrain = parseInt(getComputedStyle(terrain).height);
		
		divElt.style.left = Math.floor(Math.random()* (largeurDuTerrain - 30))+'px';
		divElt.style.top = Math.floor(Math.random()*(hauteurDuTerrain - 30))+'px';
		divElt.classList.add('target');
		divElt.classList.add('on');
		
		
		terrain.appendChild(divElt);
	});
	
	function suppression(){
		this.classList.add('hit');
		nombreDeCibles = nombreDeCibles - 1;
		ciblesRestantes.innerHTML = nombreDeCibles;
		if(ciblesRestantes.textContent == 0){
			stopChrono();
			alert(`Gagné ! Temps : ${chrono.innerText}`);
			resetChrono();
		}
		setTimeout(() => {
			terrain.removeChild(this);
		},1000)
	}

	terrain.childNodes.forEach(function(child){
	child.addEventListener('click',suppression)
	})
}


/*--------- CHRONOS*/
function startChrono(){
	if(tenth.innerHTML == 0 && secondes.innerHTML == 00 && minutes.innerHTML == 0){
		t = setInterval(updateChrono,100);
	}else{
		resetChrono();
	}
}

function updateChrono(){
	ms++;
	if(ms==11){
		s+=1;
		ms=1;
	}
	if(s==60){
		mn += 1;
		s=0;
	}

	tenth.innerHTML = ms;
	secondes.innerHTML = s;
	minutes.innerHTML = mn;
}

function stopChrono(){
	clearInterval(t);
}

function resetChrono(){
	ms = 0;
	s = 00;
	mn = 0;
	tenth.innerHTML = ms;
	secondes.innerHTML = s;
	minutes.innerHTML = mn;
}
/*---------FIN CHRONOS*/

function ajoutUneCible(){	
	stopChrono();
	resetChrono();
	startChrono();
	while(terrain.firstChild){
		terrain.removeChild(terrain.firstChild);
	}

	ciblesRestantes.innerHTML = 1;
	const divElt = document.createElement('div');
	divElt.classList.add('target');
	divElt.classList.add('on');
	let largeurDuTerrain = parseInt(getComputedStyle(terrain).width);
	let hauteurDuTerrain = parseInt(getComputedStyle(terrain).height);
	divElt.style.left = Math.floor(Math.random()*(largeurDuTerrain - 30)) +'px';
	divElt.style.top = Math.floor(Math.random()*(hauteurDuTerrain - 30)) +'px';
	terrain.appendChild(divElt);

	function suppression(){
		this.classList.add('hit');
		ciblesRestantes.innerHTML = 0;
		if(ciblesRestantes.textContent == 0){
			stopChrono();
			alert(`Gagné ! Temps : ${chrono.innerText}`);
			resetChrono();
		}
		setTimeout(() => {
			terrain.removeChild(this);
		},1000)
	}

	terrain.childNodes.forEach(function(child){
	child.addEventListener('click',suppression)
	})
}
create.addEventListener('click',ajoutUneCible);
start.addEventListener('click',ajout);