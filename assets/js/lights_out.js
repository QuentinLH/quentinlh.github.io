
var cookies = 0;

function test(n){
	cookies = cookies + n;
	document.getElementById("bouton").innerHTML = cookies;
};

var grille, taille, light, grid_type;

function makeArray(n,k){
	var arr = new Array(n), i;
	for(i = 0; i < n; i++){
		arr[i] = Array(k).fill(0);
	}
	return arr;
}

function afficher(){
	var content = '<table style="border-collapse: collapse; display: flex;">', i, j;
	for(i = 0; i < taille; i++){
		content += "<tr>";
		for(j = 0; j < taille; j++){
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
	taille = parseInt(document.getElementById('taille').value);
	
	grille = makeArray(taille,taille);
	afficher();
}	

// computes the positive modulo, instead of the one that depends on the sign of n
function mod(n, m) {
	return ((n % m) + m) % m;
  }

function update_small(n,k){
	if (grid_type == "torus"){
		grille[mod(n,taille)][mod(k,taille)] = 1 - grille[mod(n,taille)][mod(k,taille)];
	} else {
		if (k >= 0 && n >= 0 && k < taille && n < taille) {
			grille[n][k] = 1 - grille[n][k];
		}
	}
}




function update(n,k){
	if (light == "big cross"){
		var i;
	    for(i = 0;i < taille;i++){
			grille[i][k] = 1 - grille[i][k];
			grille[n][i] = 1 - grille[n][i];
		}
		grille[n][k] = 1 - grille[n][k];
	} else if (light == "small cross"){
		var i;
		for (i = -1;i < 2;i++) {
			update_small(n + i,k);
			update_small(n,k + i);
		}
		update_small(n,k);
	} else {
		var i,j;
		for (i = n-1;i < n+2;i++) {
			for (j = k-1;j < k+2;j++) {
				update_small(i,j);
			}
		}
	}	
	
	afficher();
	if (check()){
		document.getElementById("grid").innerHTML += `<p> Congrats ! </p>`;
	}
}	

function check(){
	for(i = 0; i < taille; i++){
		for(j = 0; j < taille; j++){
			if (!grille[i][j]){
				return false;
			}
		}
	}
	return true;
}

