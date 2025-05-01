
var cookies = 0;

function test(n){
	cookies = cookies + n;
	document.getElementById("bouton").innerHTML = cookies;
};

var grille, longueur, largeur, light, grid_type;

function makeArray(){
	var arr = new Array(largeur);
	for(i = 0; i < largeur; i++){
		arr[i] = Array(longueur).fill(0);
	}
	return arr;
}

function afficher(){
	var content = '<table style="border-collapse: collapse; display: flex;">', i, j;
	for(i = 0; i < largeur; i++){
		content += "<tr>";
		for(j = 0; j < longueur; j++){
			if (grille[i][j]){
				content += `<td><button style="background-color:white;" onclick="update(${i},${j})"></button></td>`;
			} else {
				content += `<td><button style="background-color:grey;" onclick="update(${i},${j})"></button></td>`;
			}	
		}
		content += "</tr>";	
	}
	content += "</table>";
	document.getElementById("grid").innerHTML = content;
}

function generate(){	
	light = document.getElementById("light-select").value;
	grid_type = document.getElementById("grid_type-select").value;
	longueur = parseInt(document.getElementById("longueur").value);
	largeur = parseInt(document.getElementById("largeur").value);

	grille = makeArray();
	if (document.getElementById("random_start").checked) {
		randomize();
	}
	afficher();
}	

// computes the positive modulo, instead of the one that depends on the sign of n
function mod(n, m) {
	return ((n % m) + m) % m;
  }

function update_small(n,k){
	if (grid_type == "torus"){
		grille[mod(n,largeur)][mod(k,longueur)] = 1 - grille[mod(n,largeur)][mod(k,longueur)];
	} else {
		if (k >= 0 && n >= 0 && k < longueur && n < largeur) {
			grille[n][k] = 1 - grille[n][k];
		}
	}
}




function update2(n,k){
	if (light == "big cross"){
	    for(i = 0;i < largeur;i++){
			grille[i][k] = 1 - grille[i][k];
		}
		for(i = 0;i < longueur;i++){ 
			grille[n][i] = 1 - grille[n][i];
		}
		grille[n][k] = 1 - grille[n][k];
	} else if (light == "small cross"){
		for (i = -1;i < 2;i++) {
			update_small(n + i,k);
			update_small(n,k + i);
		}
		update_small(n,k);
	} else {
		for (i = n-1;i < n+2;i++) {
			for (j = k-1;j < k+2;j++) {
				update_small(i,j);
			}
		}
	}	
}

function update(n,k){
	update2(n,k);
	afficher();
	if (check()){
		document.getElementById("grid").innerHTML += `<p> Congrats ! </p>`;
	}
}	

function check(){
	for(i = 0; i < largeur; i++){
		for(j = 0; j < longueur; j++){
			if (!grille[i][j]){
				return false;
			}
		}
	}
	return true;
}

function randomize(){
	for(i = 0; i < largeur; i++){
		for(j = 0; j < longueur; j++){
			if (Math.random() >= 0.5){
				update2(i,j);
			}
		}
	}	
}

