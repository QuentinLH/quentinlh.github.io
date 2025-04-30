
var cookies = 0;

function test(n){
	cookies = cookies + n;
	document.getElementById("bouton").innerHTML = cookies;
};

var grille, taille;

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
	taille = parseInt(document.getElementById('taille').value);
	grille = makeArray(taille,taille);
	afficher();
}	




function update(n,k){
	var i;
	for(i = 0;i < taille;i++){
		grille[i][k] = 1 - grille[i][k];
		grille[n][i] = 1 - grille[n][i];
	}
	grille[n][k] = 1 - grille[n][k];
	afficher();
}	

