// Définition des catégories d'IMC avec leurs noms, couleurs et plages
const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// Sélection du formulaire dans le document HTML
const form = document.querySelector("form");

// Ajout d'un gestionnaire d'événements pour le formulaire lors de la soumission
form.addEventListener("submit", handleForm);

// Sélection de tous les champs de saisie dans le document HTML
const inputs = document.querySelectorAll("input");

// Fonction appelée lorsque le formulaire est soumis
function handleForm(e) {
  e.preventDefault(); // Empêche la soumission par défaut du formulaire

  calculateBMI(); // Appel de la fonction de calcul de l'IMC
}

// Fonction de calcul de l'IMC
function calculateBMI() {
  const height = parseFloat(inputs[0].value); // Récupération de la taille saisie
  const weight = parseFloat(inputs[1].value); // Récupération du poids saisi

  // Vérification de la validité des données saisies
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    handleError(); // En cas de données invalides, affiche un message d'erreur
    return; // Arrête la fonction
  }

  // Calcul de l'IMC
  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1); // Formule de l'IMC
  console.log(BMI); // Affiche l'IMC dans la console

  showResult(BMI); // Affiche le résultat de l'IMC
}

// Sélection des éléments HTML pour afficher les résultats
const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

// Fonction pour gérer les données invalides
function handleError() {
  displayBMI.textContent = "Oops"; // Affiche "Oops"
  displayBMI.style.color = "inherit"; // Réinitialise la couleur du texte
  result.textContent = "Remplissez correctement les champs."; // Affiche un message d'erreur
}

// Fonction pour afficher les résultats de l'IMC
function showResult(BMI) {
  // Recherche de la catégorie d'IMC correspondante à l'aide de la plage
  const rank = BMIData.find(data => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });

  // Mise à jour de l'affichage avec les résultats
  displayBMI.textContent = BMI; // Affiche la valeur de l'IMC
  displayBMI.style.color = `${rank.color}`; // Applique la couleur de la catégorie
  result.textContent = `Résultat : ${rank.name}`; // Affiche le nom de la catégorie
}
