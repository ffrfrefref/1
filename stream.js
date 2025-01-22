// Vérifier si le navigateur prend en charge l'API Web Speech
if (!('webkitSpeechRecognition' in window)) {
  alert("Votre navigateur ne prend pas en charge la reconnaissance vocale. Veuillez utiliser Google Chrome.");
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.continuous = true;

  const log = document.getElementById("log");
  const startSessionButton = document.getElementById("start-session");

  // Démarrer la session vocale
  startSessionButton.addEventListener("click", () => {
    recognition.start();
    logMessage("Session d'assistance démarrée. Parlez pour recevoir des instructions.");
  });

  // Capturer les commandes vocales
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    logMessage(`Commande reçue : "${transcript}"`);

    // Simuler une réponse
    handleCommand(transcript);
  };

  // Afficher les messages dans le journal
  function logMessage(message) {
    const li = document.createElement("li");
    li.textContent = message;
    log.appendChild(li);
  }

  // Traiter les commandes vocales
  function handleCommand(command) {
    if (command.includes("ouvrir le menu démarrer")) {
      logMessage("Instruction : Cliquez sur le bouton Windows en bas à gauche.");
    } else if (command.includes("ouvrir Google Chrome")) {
      logMessage("Instruction : Double-cliquez sur l'icône Google Chrome sur le bureau.");
    } else {
      logMessage("Instruction non reconnue. Veuillez réessayer.");
    }
  }

  recognition.onerror = (event) => {
    logMessage(`Erreur : ${event.error}`);
  };
}
