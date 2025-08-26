// fonction qui multiplie deux matrices
function multiplierMatrices(a, b) {
  const lignesA = a.length;
  const colonnesA = a[0].length;
  const lignesB = b.length;
  const colonnesB = b[0].length;

  if (colonnesA !== lignesB) {
    throw new Error(
      "Le nombre de colonnes de la première matrice doit être égal au nombre de lignes de la deuxième matrice.",
    );
  }

  const resultat = [];
  for (let i = 0; i < lignesA; i++) {
    resultat[i] = [];
    for (let j = 0; j < colonnesB; j++) {
      let somme = 0;
      for (let k = 0; k < colonnesA; k++) {
        somme += a[i][k] * b[k][j];
      }
      resultat[i][j] = somme;
    }
  }
  return resultat;
}

// appel    de la fonction
afficherCoucou();
