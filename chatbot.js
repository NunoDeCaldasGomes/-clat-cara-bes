/* =========================================
   LOGIQUE UNIQUE ET AUTONOME DU TCHATBOT
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const badgeBot = document.querySelector(".badge-bot");

    if (!chatbotToggle) return; // Sécurité si le code est absent d'une page

    // Ouvrir / Fermer la fenêtre de conversation
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.classList.toggle("open");
        if (badgeBot) badgeBot.style.display = "none"; 
    });

    closeChatbot.addEventListener("click", () => {
        chatbotWindow.classList.remove("open");
    });

    // Envoyer un message
    function envoyerMessageUtilisateur() {
        const texte = chatbotInput.value.trim();
        if (texte === "") return;

        creerBulleMessage(texte, "user-msg");
        chatbotInput.value = "";

        setTimeout(() => {
            genererReponseBot(texte.toLowerCase());
        }, 700);
    }

    chatbotSend.addEventListener("click", envoyerMessageUtilisateur);
    chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") envoyerMessageUtilisateur();
    });

    function creerBulleMessage(texte, classe) {
        const bulle = document.createElement("div");
        bulle.className = `msg ${classe}`;
        bulle.innerHTML = `<p>${texte}</p>`;
        chatbotMessages.appendChild(bulle);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; 
    }

    // Base de connaissances (Mots-clés)
    function genererReponseBot(message) {
        let reponse = "Je ne suis pas sûr de comprendre. N'hésitez pas à me poser une question sur nos installations : 'Forêt Tropicale', 'Grotte de Sel', ou notre 'Rituel Océan'.";

        if (message.includes("forêt") || message.includes("foret") || message.includes("tropicale")) {
            reponse = "🌲 <strong>La Cabine Forêt Tropicale :</strong> C'est une expérience sensorielle immersive qui combine une douce vapeur chaude parfumée à l'ylang-ylang, complétée par des sons de la jungle de Basse-Terre en Guadeloupe.";
        } 
        else if (message.includes("sel") || message.includes("grotte")) {
            reponse = "🌊 <strong>La Grotte de Sel Marin :</strong> Conçue en blocs de sel rose rétroéclairés, cet espace diffuse des micro-particules d'embruns iodés, idéal pour purifier l'esprit et le système respiratoire.";
        } 
        else if (message.includes("océan") || message.includes("ocean") || message.includes("coquillage")) {
            reponse = "🐚 <strong>Le Rituel Océan :</strong> Notre soin signature prestigieux. Un massage d'exception prodigué avec de véritables coquillages polis auto-chauffants pour détendre profondément les muscles.";
        } 
        else if (message.includes("tarif") || message.includes("prix") || message.includes("combien")) {
            reponse = "✨ Nos accès aux espaces sensoriels commencent dès 45€. Les massages et rituels d'exception varient entre 95€ et 180€. Vous pouvez réserver directement via notre onglet de réservation.";
        } 
        else if (message.includes("guadeloupe") || message.includes("concept") || message.includes("france")) {
            reponse = "🇫🇷🇵🇲 <strong>Notre Concept :</strong> Éclat Caraïbe est la fusion parfaite entre le raffinement architectural des spas parisiens et les bienfaits thérapeutiques de la Guadeloupe.";
        }

        creerBulleMessage(reponse, "bot-msg");
    }
});