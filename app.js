const app = document.getElementById("app");

let player = null;


/* =========================================================
   DONNÉES DE BASE
========================================================= */

const firstNames = [
    "Emma",
    "Lucas",
    "Jules",
    "Léa",
    "Hugo",
    "Chloé",
    "Noah",
    "Alice",
    "Tom",
    "Lina",
    "Nathan",
    "Zoé"
];

const cities = [
    "Tours",
    "Poitiers",
    "Angers",
    "Nantes",
    "Bordeaux",
    "Rennes",
    "Orléans",
    "Limoges",
    "La Rochelle",
    "Le Mans"
];


/* =========================================================
   UTILITAIRES
========================================================= */

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


function calculateAge(birthDateString, currentDateString) {

    const birthDate = new Date(birthDateString + "T00:00:00");
    const currentDate = new Date(currentDateString + "T00:00:00");

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(
        currentDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (currentDate < birthdayThisYear) {
        age--;
    }

    return age;
}


/* =========================================================
   ACCUEIL
========================================================= */

function showHome() {

    app.innerHTML = `
        <div class="home">
            <div class="home-card">

                <div class="home-visual">

                    <div class="home-logo">
                        The Long <span>Rally</span>
                    </div>

                    <div class="home-tagline">
                        One life. Thousands of choices.
                    </div>

                    <div class="home-menu">

                        <button class="menu-button primary"
                                onclick="showNewLife()">

                            <span class="menu-icon">▶</span>

                            <span class="menu-title">
                                Nouvelle partie
                            </span>

                            <span class="menu-subtitle">
                                Commencer une nouvelle vie
                            </span>

                        </button>


                        <button class="menu-button"
                                onclick="alert('Le chargement des parties sera ajouté plus tard.')">

                            <span class="menu-icon">📁</span>

                            <span class="menu-title">
                                Charger une partie
                            </span>

                            <span class="menu-subtitle">
                                Reprendre une partie existante
                            </span>

                        </button>


                        <button class="menu-button"
                                onclick="alert('Les paramètres arriveront plus tard.')">

                            <span class="menu-icon">⚙</span>

                            <span class="menu-title">
                                Paramètres
                            </span>

                            <span class="menu-subtitle">
                                Son, affichage, etc.
                            </span>

                        </button>


                        <button class="menu-button"
                                onclick="alert('The Long Rally\\nOne life. Thousands of choices.')">

                            <span class="menu-icon">📖</span>

                            <span class="menu-title">
                                À propos
                            </span>

                            <span class="menu-subtitle">
                                Le projet The Long Rally
                            </span>

                        </button>

                    </div>

                </div>

            </div>
        </div>
    `;
}


/* =========================================================
   NOUVELLE VIE
========================================================= */

function showNewLife() {

    app.innerHTML = `

        <div class="page">

            <div class="page-inner">

                <div class="page-header">

                    <button class="back-button"
                            onclick="showHome()">

                        ← Retour

                    </button>

                    <h1 class="page-title">
                        Commencer une nouvelle vie
                    </h1>

                    <p class="page-subtitle">
                        Tu peux laisser la vie décider pour toi,
                        ou orienter certains éléments de ton histoire.
                    </p>

                </div>


                <div class="life-choice-grid">


                    <!-- VIE ALÉATOIRE -->

                    <div class="life-choice">

                        <div class="life-choice-icon">
                            🎲
                        </div>

                        <h2>
                            Vie aléatoire
                        </h2>

                        <p>
                            La vie te fait une surprise.<br>
                            Ton prénom, ta ville, ta famille,
                            ton environnement et ton début d'histoire
                            seront générés.
                        </p>

                        <button class="primary-button"
                                onclick="generateRandomLife()">

                            🎲 Laisser la vie décider

                        </button>

                    </div>


                    <!-- VIE ORIENTÉE -->

                    <div class="life-choice">

                        <div class="life-choice-icon">
                            ✏️
                        </div>

                        <h2>
                            Orienter ma vie
                        </h2>

                        <p>
                            Tu peux choisir quelques éléments
                            avant de commencer ton histoire,
                            sans tout contrôler.
                        </p>

                        <button class="secondary-button"
                                onclick="showOrientation()">

                            Commencer mes choix

                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   VIE ORIENTÉE
========================================================= */

function showOrientation() {

    app.innerHTML = `

        <div class="page">

            <div class="page-inner">

                <div class="page-header">

                    <button class="back-button"
                            onclick="showNewLife()">

                        ← Retour

                    </button>

                    <h1 class="page-title">
                        Orienter ma vie
                    </h1>

                    <p class="page-subtitle">
                        Quelques choix pour donner une direction
                        à ton histoire.
                    </p>

                </div>


                <div class="life-choice"
                     style="text-align:left; max-width:750px; margin:auto;">

                    <h2>
                        Ton prénom
                    </h2>

                    <input
                        id="firstNameInput"
                        type="text"
                        placeholder="Ex : Emma"
                        style="
                            width:100%;
                            padding:14px;
                            border:1px solid var(--border);
                            border-radius:10px;
                            font-size:16px;
                            margin-bottom:25px;
                        "
                    >


                    <h2>
                        Ta ville de départ
                    </h2>

                    <select
                        id="cityInput"
                        style="
                            width:100%;
                            padding:14px;
                            border:1px solid var(--border);
                            border-radius:10px;
                            font-size:16px;
                            margin-bottom:30px;
                        "
                    >

                        ${cities.map(city => `
                            <option value="${city}">
                                ${city}
                            </option>
                        `).join("")}

                    </select>


                    <button class="primary-button"
                            onclick="generateOrientedLife()">

                        Commencer cette vie

                    </button>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   CRÉATION D'UNE VIE ALÉATOIRE
========================================================= */

function generateRandomLife() {

    const firstName = randomItem(firstNames);
    const city = randomItem(cities);

    createPlayer(firstName, city, "aléatoire");
}


/* =========================================================
   CRÉATION D'UNE VIE ORIENTÉE
========================================================= */

function generateOrientedLife() {

    const firstNameInput =
        document.getElementById("firstNameInput");

    const cityInput =
        document.getElementById("cityInput");

    const firstName =
        firstNameInput.value.trim() || randomItem(firstNames);

    const city =
        cityInput.value || randomItem(cities);

    createPlayer(firstName, city, "orientée");
}


/* =========================================================
   CRÉATION DU PERSONNAGE
========================================================= */

function createPlayer(firstName, city, orientation) {

    /*
        Date de naissance :

        Le personnage commence à 8 ans.

        On utilise une vraie date de naissance.
        L'âge sera TOUJOURS recalculé à partir
        de birthDate + currentDate.

        Rien dans le jeu ne modifiera directement l'âge.
    */

    const birthDate = "2018-04-15";
    const currentDate = "2026-09-12";

    player = {

        firstName: firstName,

        city: city,

        birthDate: birthDate,

        currentDate: currentDate,

        orientation: orientation,

        school: "CE2",

        family: {
            type: "À découvrir",
            members: []
        },

        badminton: {

            level: "Débutant",

            experience: "Aucune expérience",

            club: null

        },

        history: [

            {
                date: "1 septembre 2026",
                text: "Rentrée des classes."
            },

            {
                date: "12 septembre 2026",
                text: `Tu commences une nouvelle vie à ${city}.`
            }

        ]

    };


    showGame();
}


/* =========================================================
   ÉCRAN DE JEU
========================================================= */

function showGame() {

    const age =
        calculateAge(
            player.birthDate,
            player.currentDate
        );

    app.innerHTML = `

        <div class="game">


            <!-- HEADER -->

            <div class="game-header">

                <div class="game-logo">
                    The Long Rally
                </div>

                <div class="game-date">

                    <strong>
                        ${formatDate(player.currentDate)}
                    </strong>

                    <span>
                        Saison 1 · Âge : ${age} ans
                    </span>

                </div>

            </div>


            <!-- CONTENU -->

            <div class="game-content">


                <!-- PROFIL -->

                <aside class="profile-card">

                    <div class="avatar">
                        🧒
                    </div>

                    <h2 class="profile-name">
                        ${player.firstName}
                    </h2>

                    <div class="profile-age">
                        ${age} ans
                    </div>


                    <div class="profile-item">

                        <strong>
                            📍 ${player.city}
                        </strong>

                        <span>
                            France
                        </span>

                    </div>


                    <div class="profile-item">

                        <strong>
                            🏫 École
                        </strong>

                        <span>
                            ${player.school}
                        </span>

                    </div>


                    <div class="profile-item">

                        <strong>
                            🏸 Badminton
                        </strong>

                        <span>
                            ${player.badminton.experience}
                        </span>

                    </div>

                </aside>


                <!-- COLONNE PRINCIPALE -->

                <main class="main-column">

                    <div class="event-card">

                        <div class="event-image">
                            🏸
                        </div>

                        <div class="event-content">

                            <span class="event-label">
                                PREMIÈRE JOURNÉE
                            </span>

                            <h1 class="event-title">
                                Une nouvelle vie commence
                            </h1>

                            <p class="event-text">

                                ${player.firstName} a 8 ans.

                                Une nouvelle année scolaire
                                commence à ${player.city}.

                                Pour l'instant, rien ne dit encore
                                où cette histoire va mener...

                            </p>


                            <div class="choices">

                                <button class="choice blue"
                                        onclick="chooseFirstEvent('explorer')">

                                    <strong>
                                        👀 Observer autour de moi
                                    </strong>

                                    <span>
                                        Prendre le temps de découvrir
                                        ce nouvel environnement.
                                    </span>

                                </button>


                                <button class="choice green"
                                        onclick="chooseFirstEvent('agir')">

                                    <strong>
                                        🚀 Me lancer
                                    </strong>

                                    <span>
                                        J'ai envie de voir ce que
                                        cette nouvelle vie me réserve.
                                    </span>

                                </button>


                                <button class="choice orange"
                                        onclick="chooseFirstEvent('calme')">

                                    <strong>
                                        😌 Rester tranquille
                                    </strong>

                                    <span>
                                        Pas besoin de se précipiter.
                                        Chaque chose en son temps.
                                    </span>

                                </button>

                            </div>

                        </div>

                    </div>


                    <!-- HISTORIQUE -->

                    <div class="history-card">

                        <div class="history-title">
                            Ce qui s'est passé récemment
                        </div>

                        ${player.history
                            .slice()
                            .reverse()
                            .map(item => `

                                <div class="history-item">

                                    <div class="history-date">
                                        ${item.date}
                                    </div>

                                    <div class="history-text">
                                        ${item.text}
                                    </div>

                                </div>

                            `)
                            .join("")}

                    </div>

                </main>

            </div>

        </div>
    `;
}


/* =========================================================
   PREMIER ÉVÉNEMENT
========================================================= */

function chooseFirstEvent(choice) {

    let text = "";

    if (choice === "explorer") {

        text =
            `${player.firstName} prend le temps d'observer ` +
            `ce qui l'entoure. Certaines choses attirent ` +
            `déjà son attention.`;

    }

    if (choice === "agir") {

        text =
            `${player.firstName} décide de ne pas rester ` +
            `dans son coin. Une nouvelle aventure commence.`;

    }

    if (choice === "calme") {

        text =
            `${player.firstName} préfère prendre son temps. ` +
            `Après tout, la journée ne fait que commencer.`;

    }


    player.history.push({

        date: formatDate(player.currentDate),

        text: text

    });


    showGame();
}


/* =========================================================
   LANCEMENT
========================================================= */

showHome();
