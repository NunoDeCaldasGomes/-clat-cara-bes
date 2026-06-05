document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. GESTION DU FORMULAIRE ET DES CRENEAUX
       ========================================= */
    const dateInput = document.getElementById("booking-date");
    const slotsContainer = document.getElementById("slots-container");
    const slotsGrid = document.querySelector(".time-slots-grid");
    const selectedTimeInput = document.getElementById("selected-time");
    const btnValider = document.getElementById("btn-valider");
    const bookingForm = document.getElementById("spa-booking-form");
    const successBox = document.getElementById("success-message");

    // Bloquer les dates passées sur le calendrier
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Simulation de chargement de créneaux disponibles selon le jour choisi
    dateInput.addEventListener("change", () => {
        slotsGrid.innerHTML = ""; // Vider les anciens créneaux
        selectedTimeInput.value = "";
        btnValider.disabled = true;

        // Génération de créneaux fictifs mais réalistes (Chic & Organisé)
        const simulationsHoraires = ["09:30", "11:00", "14:00", "15:30", "17:00", "18:30"];
        
        simulationsHoraires.forEach(heure => {
            const btnSlot = document.createElement("button");
            btnSlot.type = "button";
            btnSlot.className = "slot-btn";
            btnSlot.innerText = heure;
            
            // Événement au clic sur un horaire
            btnSlot.addEventListener("click", () => {
                document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("active"));
                btnSlot.classList.add("active");
                selectedTimeInput.value = heure;
                btnValider.disabled = false; // Activer le bouton de soumission
            });

            slotsGrid.appendChild(btnSlot);
        });

        slotsContainer.style.display = "block";
    });

    // Soumission du formulaire
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        bookingForm.style.display = "none";
        successBox.style.display = "block";
    });

    /* =========================================
       2. LOGIQUE INTERACTIVE DU TCHATBOT
       ========================================= */
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const badgeBot = document.querySelector(".badge-bot");

    // Ouvrir / Fermer la fenêtre de conversation
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.classList.toggle("open");
        badgeBot.style.display = "none"; // Masquer la notification à la lecture
    });

    closeChatbot.addEventListener("click", () => {
        chatbotWindow.classList.remove("open");
    });

    // Envoyer un message
    function envoyerMessageUtilisateur() {
        const texte = chatbotInput.value.trim();
        if (texte === "") return;

        // Ajouter le message utilisateur à l'écran
        creerBulleMessage(texte, "user-msg");
        chatbotInput.value = "";

        // Déclencher la réponse automatique après un cours délai
        setTimeout(() => {
            genererReponseBot(texte.toLowerCase());
        }, 700);
    }

    chatbotSend.addEventListener("click", envoyerMessageUtilisateur);
    chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") envoyerMessageUtilisateur();
    });

    // Ajouter les bulles de texte au conteneur
    function creerBulleMessage(texte, classe) {
        const bulle = document.createElement("div");
        bulle.className = `msg ${classe}`;
        bulle.innerHTML = `<p>${texte}</p>`;
        chatbotMessages.appendChild(bulle);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll automatique vers le bas
    }

    // Base de connaissances locale (Mots-clés sur vos Soins & Concept)
    function genererReponseBot(message) {
        let reponse = "Je ne suis pas sûr de comprendre votre demande. N'hésitez pas à me poser une question sur nos installations : 'Forêt Tropicale', 'Grotte de Sel', ou notre signature 'Rituel Océan'.";

        if (message.includes("forêt") || message.includes("foret") || message.includes("tropicale")) {
            reponse = "🌲 <strong>La Cabine Forêt Tropicale :</strong> C'est une expérience sensorielle immersive qui combine une douce vapeur chaude parfumée à l'ylang-ylang et à l'eucalyptus, complétée par des projections visuelles et auditives de la jungle de Basse-Terre en Guadeloupe.";
        } 
        else if (message.includes("sel") || message.includes("grotte")) {
            reponse = "🌊 <strong>La Grotte de Sel Marin :</strong> Conçue en blocs de sel rose rétroéclairés, cet espace diffuse des micro-particules d'embruns iodés. Idéal pour purifier le système respiratoire et apaiser l'esprit en évoquant la côte caraïbéenne.";
        } 
        else if (message.includes("océan") || message.includes("ocean") || message.includes("coquillage")) {
            reponse = "🐚 <strong>Le Rituel Océan :</strong> Notre soin signature prestigieux. Il débute par un gommage délicat aux sels marins, suivi d'un massage d'exception prodigué avec de véritables coquillages polis auto-chauffants pour détendre profondément les muscles.";
        } 
        else if (message.includes("tarif") || message.includes("prix") || message.includes("combien")) {
            reponse = "✨ Nos accès aux espaces sensoriels commencent dès 45€. Les massages et rituels d'exception varient entre 95€ et 180€ selon la durée. Vous pouvez voir les détails dans le menu déroulant du formulaire de réservation.";
        } 
        else if (message.includes("guadeloupe") || message.includes("concept") || message.includes("france")) {
            reponse = "🇫🇷🇵🇲 <strong>Notre Concept :</strong> Éclat Caraïbe est la fusion parfaite entre le raffinement architectural des spas parisiens du 7ᵉ arrondissement et les bienfaits thérapeutiques et culturels (philosophie Gwoka) de la Guadeloupe.";
        }

        creerBulleMessage(reponse, "bot-msg");
    }
});