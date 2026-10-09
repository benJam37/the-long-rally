const app = document.getElementById("app");

let player = null;


/* =========================================================
   DONNÉES
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


const familyTypes = [
    {
        type: "Famille classique",
        description: "Deux parents et un frère ou une sœur."
    },
    {
        type: "Famille classique",
        description: "Deux parents et une vie de famille plutôt tranquille."
    },
    {
        type: "Famille nombreuse",
        description: "Deux parents et plusieurs frères et sœurs."
    },
    {
        type: "Famille monoparentale",
        description: "Un seul parent au quotidien."
    }
];


const siblingNames = [
    "Camille",
    "Louis",
    "Arthur",
    "Manon",
    "Gabriel",
    "Inès",
    "Paul",
    "Sarah"
];


const schoolTypes = [
    "École élémentaire du centre",
    "École Jean-Moulin",
    "École Jules-Ferry",
    "École des Tilleuls",
    "École du Parc",
    "École Notre-Dame"
];


const clubPrefixes = [
    "AS",
    "US",
    "BC",
    "Club",
    "Badminton"
];


const clubNames = [
    "de la Vallée",
    "des Rives",
    "du Centre",
    "de l'Avenir",
    "des Tilleuls",
    "de la Loire",
    "du Parc",
    "de la Plaine"
];


const coachFirstNames = [
    "Thomas",
    "Julien",
    "Sophie",
    "Claire",
    "Nicolas",
    "Marion",
    "Antoine",
    "Élodie"
];


const coachLastNames = [
    "Martin",
    "Bernard",
    "Leroy",
    "Moreau",
    "Petit",
    "Robert",
    "Durand",
    "Simon"
];


/* =========================================================
   UTILITAIRES
========================================================= */

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


function calculateAge(
    birthDateString,
    currentDateString
) {

    const birthDate =
        new Date(birthDateString + "T00:00:00");

    const currentDate =
        new Date(currentDateString + "T00:00:00");

    let age =
        currentDate.getFullYear()
        - birthDate.getFullYear();

    const birthdayThisYear =
        new Date(
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
   GÉNÉRATION DE LA FAMILLE
========================================================= */

function generateFamily(firstName) {

    const family =
        randomItem(familyTypes);

    let members = [];

    if (family.type === "Famille monoparentale") {

        const parentGender =
            Math.random() < 0.5
                ? "Mère"
                : "Père";

        members.push({
            role: parentGender,
            name: randomItem([
                "Sophie",
                "Julie",
                "Thomas",
                "Nicolas",
                "Claire",
                "Julien"
            ])
        });

    } else {

        members.push({
            role: "Mère",
            name: randomItem([
                "Sophie",
                "Julie",
                "Claire",
                "Marion",
                "Émilie"
            ])
        });

        members.push({
            role: "Père",
            name: randomItem([
                "Thomas",
                "Nicolas",
                "Julien",
                "Antoine",
                "David"
            ])
        });
    }


    if (
        family.type === "Famille classique"
        ||
        family.type === "Famille nombreuse"
    ) {

        const siblingCount =
            family.type === "Famille nombreuse"
                ? randomNumber(2, 3)
                : 1;

        for (let i = 0; i < siblingCount; i++) {

            let siblingName =
                randomItem(siblingNames);

            while (
                members.some(
                    member => member.name === siblingName
                )
            ) {
                siblingName =
                    randomItem(siblingNames);
            }

            members.push({
                role: "Frère / sœur",
                name: siblingName
            });
        }
    }


    return {
        type: family.type,
        description: family.description,
        members: members
    };
}


/* =========================================================
   GÉNÉRATION DU CLUB
========================================================= */

function generateClub(city) {

    const prefix =
        randomItem(clubPrefixes);

    const suffix =
        randomItem(clubNames);

    const coachFirstName =
        randomItem(coachFirstNames);

    const coachLastName =
        randomItem(coachLastNames);


    return {

        name: `${prefix} ${suffix}`,

        city: city,

        reputation:
            randomItem([
                "Petite structure locale",
                "Club familial",
                "Club bien implanté localement",
                "Club reconnu dans le secteur"
            ]),

        youthQuality:
            randomItem([
                "Débutante",
                "Correcte",
                "Bonne",
                "Très bonne"
            ]),

        coach: {
            firstName: coachFirstName,
            lastName: coachLastName,

            experience:
                randomItem([
                    "Jeune entraîneur",
                    "Entraîneur expérimenté",
                    "Ancien joueur régional",
                    "Passionné de formation des jeunes"
                ])
        }
    };
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

                        <button
                            class="menu-button primary"
                            onclick="showNewLife()">

                            <span class="menu-icon">▶</span>

                            <span class="menu-title">
                                Nouvelle partie
                            </span>

                            <span class="menu-subtitle">
                                Commencer une nouvelle vie
                            </span>

                        </button>


                        <button
                            class="menu-button"
                            onclick="alert('Le chargement des parties sera ajouté plus tard.')">

                            <span class="menu-icon">📁</span>

                            <span class="menu-title">
                                Charger une partie
                            </span>

                            <span class="menu-subtitle">
                                Reprendre une partie existante
                            </span>

                        </button>


                        <button
                            class="menu-button"
                            onclick="alert('Les paramètres arriveront plus tard.')">

                            <span class="menu-icon">⚙</span>

                            <span class="menu-title">
                                Paramètres
                            </span>

                            <span class="menu-subtitle">
                                Son, affichage, etc.
                            </span>

                        </button>


                        <button
                            class="menu-button"
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

                    <button
                        class="back-button"
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

                        <button
                            class="primary-button"
                            onclick="generateRandomLife()">

                            🎲 Laisser la vie décider

                        </button>

                    </div>


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

                        <button
                            class="secondary-button"
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

                    <button
                        class="back-button"
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


                <div
                    class="life-choice"
                    style="
                        text-align:left;
                        max-width:750px;
                        margin:auto;
                    "
                >

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


                    <button
                        class="primary-button"
                        onclick="generateOrientedLife()">

                        Commencer cette vie

                    </button>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   VIE ALÉATOIRE
========================================================= */

function generateRandomLife() {

    const firstName =
        randomItem(firstNames);

    const city =
        randomItem(cities);

    createPlayer(
        firstName,
        city,
        "aléatoire"
    );
}


/* =========================================================
   VIE ORIENTÉE
========================================================= */

function generateOrientedLife() {

    const firstNameInput =
        document.getElementById("firstNameInput");

    const cityInput =
        document.getElementById("cityInput");


    const firstName =
        firstNameInput.value.trim()
        ||
        randomItem(firstNames);


    const city =
        cityInput.value
        ||
        randomItem(cities);


    createPlayer(
        firstName,
        city,
        "orientée"
    );
}


/* =========================================================
   CRÉATION DU PERSONNAGE
========================================================= */

function createPlayer(
    firstName,
    city,
    orientation
) {

    /*
        IMPORTANT :

        Le personnage possède une vraie date
        de naissance.

        L'âge est toujours calculé à partir
        de la date de naissance et de la date
        simulée.

        Les événements ne modifient jamais
        directement l'âge.
    */

    const birthDate =
        "2018-04-15";

    const currentDate =
        "2026-09-12";


    const family =
        generateFamily(firstName);

    const school =
        randomItem(schoolTypes);

    const club =
        generateClub(city);


    player = {

        id:
            Date.now(),

        firstName:
            firstName,

        city:
            city,

        birthDate:
            birthDate,

        currentDate:
            currentDate,

        orientation:
            orientation,

       currentEvent:
          "first",

        school: {

            name:
                school,

            level:
                "CE2"
        },


        family:
            family,


        badminton: {

            level:
                "Débutant",

            experience:
                "Aucune expérience",

            club:
                club
        },


        /*
            Ces éléments restent cachés
            pour le moment.

            Ils pourront progressivement
            être découverts pendant la vie.
        */

        hidden: {

            potential:
                randomNumber(1, 100),

            motivation:
                randomNumber(1, 100),

            learningSpeed:
                randomNumber(1, 100),

            injuryRisk:
                randomNumber(1, 100)
        },
       
        traits: {

            curiosity:
                randomNumber(40, 60),

            initiative:
                randomNumber(40, 60),

            badmintonInterest:
                randomNumber(0, 10)
        },

       eventHistory: [],
       
        history: [

            {
                date:
                    "1 septembre 2026",

                text:
                    "Rentrée des classes."
            },

            {
                date:
                    "12 septembre 2026",

                text:
                    `Une nouvelle vie commence à ${city}.`
            }

        ]
    };


    showGame();
}


/* =========================================================
   ÉCRAN DE JEU
========================================================= */
function recordMemory(event, choice, text) {
    if (!player || !Array.isArray(player.memories)) return;

    const memorableEvents = ["first", "activity", "badminton", "curiosity", "initiative", "childhood"];
    if (!memorableEvents.includes(event)) return;

    player.memories.push({
        event: event,
        choice: choice,
        date: player.currentDate,
        text: text
    });
}


function getCurrentEventContent(age) {

    if (player.currentEvent === "first") {
        return `
            <span class="event-label">
                PREMIÈRE JOURNÉE
            </span>

            <h1 class="event-title">
                Une nouvelle vie commence
            </h1>

            <p class="event-text">
                Tu as ${age} ans.

                À ${player.city}, ta rentrée vient de commencer.

                ${player.family.description}

                Pour l'instant, le badminton n'est encore qu'une possibilité parmi tant d'autres.
            </p>

            <div class="choices">

                <button
                    class="choice blue"
                    onclick="chooseFirstEvent('explorer')">

                    <strong>
                        👀 Observer autour de moi
                    </strong>

                    <span>
                        Prendre le temps de découvrir ce nouvel environnement.
                    </span>

                </button>


                <button
                    class="choice green"
                    onclick="chooseFirstEvent('agir')">

                    <strong>
                        🤝 Aller vers les autres
                    </strong>

                    <span>
                        Faire le premier pas et voir qui je vais rencontrer.
                    </span>

                </button>


                <button
                    class="choice orange"
                    onclick="chooseFirstEvent('activite')">

                    <strong>
                        🔎 Chercher quelque chose à faire
                    </strong>

                    <span>
                        Regarder ce qui existe autour de moi.
                    </span>

                </button>


                <button
                    class="choice blue"
                    onclick="chooseFirstEvent('calme')">

                    <strong>
                        😌 Prendre mes marques tranquillement
                    </strong>

                    <span>
                        Profiter de cette nouvelle vie sans chercher à tout découvrir tout de suite.
                    </span>

                </button>

            </div>
        `;
    }
    if (player.currentEvent === "activity") {

    let activityText = "";

    if (player.traits.badmintonInterest >= 12) {

        activityText =
            `Depuis quelques jours, le badminton revient régulièrement dans tes pensées. ` +
            `Après l'école, tu remarques une activité sportive près de chez toi. ` +
            `À travers la porte du gymnase, tu entends des échanges de volant. ` +
            `Cette fois, tu as vraiment envie de savoir ce qui s'y passe.`;

    } else if (player.traits.badmintonInterest >= 6) {

        activityText =
            `Depuis quelques jours, tu commences à prendre tes marques. ` +
            `Après l'école, une activité sportive proposée près de chez toi attire ton attention. ` +
            `À travers la porte du gymnase, tu entends des échanges de volant.`;

    } else {

        activityText =
            `Depuis quelques jours, tu commences à prendre tes marques. ` +
            `Après l'école, une activité sportive proposée près de chez toi attire ton attention. ` +
            `Tu entends des échanges de volant à travers la porte du gymnase, ` +
            `mais tu ne sais pas encore si tu as envie d'aller voir.`;
    }


    return `
        <span class="event-label">
            QUELQUES JOURS PLUS TARD
        </span>

        <h1 class="event-title">
            Une activité attire ton attention
        </h1>

        <p class="event-text">
            ${activityText}
        </p>

        <div class="choices">

            <button class="choice blue" onclick="chooseSecondEvent('watch')">
                <strong>👀 Observer depuis la porte</strong>
                <span>Regarder quelques minutes avant de décider quoi faire.</span>
            </button>

            <button class="choice green" onclick="chooseSecondEvent('approach')">
                <strong>🚪 Entrer dans le gymnase</strong>
                <span>Aller voir de plus près ce qui se passe.</span>
            </button>

            <button class="choice orange" onclick="chooseSecondEvent('ask')">
                <strong>🗣️ Demander ce qu'ils font</strong>
                <span>Comprendre cette activité avant de te faire une idée.</span>
            </button>

            <button class="choice blue" onclick="chooseSecondEvent('try')">
                <strong>🏸 Demander à essayer</strong>
                <span>Tant qu'à être là, autant découvrir directement.</span>
            </button>

        </div>
    `;
}
    if (player.currentEvent === "badminton") {
        return `
            <span class="event-label">UNE NOUVELLE CURIOSITÉ</span>
            <h1 class="event-title">🏸 Le badminton attire ton attention</h1>
            <p class="event-text">
                Quelque chose dans ce sport commence à attirer ton regard.
                Tu ne sais pas encore pourquoi, mais tu as envie d'en voir davantage.
            </p>
            <div class="choices">
                <button class="choice blue" onclick="chooseSecondEvent('watch')">
                    <strong>👀 Observer les joueurs</strong>
                    <span>Comprendre comment ils jouent avant de te lancer.</span>
                </button>
                <button class="choice green" onclick="chooseSecondEvent('try')">
                    <strong>🏸 Prendre une raquette</strong>
                    <span>Voir ce que ça donne quand tu essaies toi-même.</span>
                </button>
                <button class="choice orange" onclick="chooseSecondEvent('ask')">
                    <strong>🗣️ Poser des questions</strong>
                    <span>Comprendre ce qui plaît aux autres dans ce sport.</span>
                </button>
                <button class="choice blue" onclick="chooseSecondEvent('talk')">
                    <strong>🤝 Aller parler à un joueur</strong>
                    <span>Faire connaissance avec quelqu'un qui pratique déjà.</span>
                </button>
            </div>
        `;
    }
    if (player.currentEvent === "curiosity") {
        return `
            <span class="event-label">UNE QUESTION EN TÊTE</span>
            <h1 class="event-title">🔎 Une curiosité grandissante</h1>
            <p class="event-text">
                Une nouvelle idée te traverse l'esprit.
                Tu as envie de comprendre comment les choses fonctionnent.
            </p>
            <div class="choices">
                <button class="choice blue" onclick="chooseSecondEvent('watch')">
                    <strong>🔍 Chercher à comprendre</strong>
                    <span>Observer et essayer de trouver une réponse.</span>
                </button>
                <button class="choice green" onclick="chooseSecondEvent('try')">
                    <strong>🧪 Expérimenter</strong>
                    <span>Essayer par toi-même pour voir ce qui se passe.</span>
                </button>
                <button class="choice orange" onclick="chooseSecondEvent('ask')">
                    <strong>🗣️ Demander à quelqu'un</strong>
                    <span>Trouver quelqu'un qui pourrait t'aider à comprendre.</span>
                </button>
                <button class="choice blue" onclick="chooseSecondEvent('leave')">
                    <strong>🌱 Laisser l'idée mûrir</strong>
                    <span>Garder cette question dans un coin de ta tête pour plus tard.</span>
                </button>
            </div>
        `;
    }
  if (player.currentEvent === "initiative") {

    return `
        <span class="event-label">
            UNE ENVIE D'AGIR
        </span>

        <h1 class="event-title">
            ⚡ Une envie d'agir
        </h1>

        <p class="event-text">
            Aujourd'hui, tu as envie de faire quelque chose par toi-même.
            Une idée te traverse l'esprit, mais tu ne sais pas encore
            vraiment par où commencer.
        </p>

        <div class="choices">

            <button
                class="choice blue"
                onclick="chooseSecondEvent('think')">

                <strong>
                    💭 Chercher une idée
                </strong>

                <span>
                    Prendre le temps de réfléchir à ce que tu pourrais faire.
                </span>

            </button>


            <button
                class="choice green"
                onclick="chooseSecondEvent('try')">

                <strong>
                    🚀 Se lancer
                </strong>

                <span>
                    Commencer quelque chose, même sans savoir exactement où ça va mener.
                </span>

            </button>


            <button
                class="choice orange"
                onclick="chooseSecondEvent('ask')">

                <strong>
                    🗣️ Demander conseil
                </strong>

                <span>
                    En parler à quelqu'un pour avoir une autre idée ou un coup de main.
                </span>

            </button>


            <button
                class="choice blue"
                onclick="chooseSecondEvent('help')">

                <strong>
                    🤝 Donner un coup de main
                </strong>

                <span>
                    Plutôt que de chercher quoi faire, commencer par aider quelqu'un.
                </span>

            </button>

        </div>
    `;
}
   if (player.currentEvent === "consequence") {

    const consequenceEntries =
        Object.entries(player.lastConsequences || {});

    const labels = {
        curiosity: "🧠 Curiosité",
        initiative: "⚡ Initiative",
        badmintonInterest: "🏸 Intérêt badminton",
        motivation: "💪 Motivation"
    };

    return `
        <span class="event-label">
            CONSÉQUENCE
        </span>

        <h1 class="event-title">
            Quelque chose a changé
        </h1>

        <p class="event-text">
            ${player.history[player.history.length - 1]?.text || ""}
        </p>

        <div class="consequences">

            ${consequenceEntries.map(([stat, value]) => `
                <div class="consequence-item">
                    <span>
                        ${labels[stat] || stat}
                    </span>

                    <strong>
                        ${value > 0 ? "+" : ""}${value}
                    </strong>
                </div>
            `).join("")}

        </div>

        <div class="choices">

            <button
                class="choice green"
                onclick="continueAfterConsequences()">

                <strong>
                    Continuer
                </strong>

            </button>

        </div>
    `;
}
   
if (player.currentEvent === "childhood") {
    return `
        <span class="event-label">UNE JOURNÉE COMME LES AUTRES</span>
        <h1 class="event-title">🌱 Quelque chose attire ton attention</h1>
        <p class="event-text">
            À ${age} ans, le monde est encore rempli de choses à découvrir.
            Aujourd'hui, une petite chose pourrait bien changer le cours de ta journée.
        </p>
        <div class="choices">
            <button class="choice blue" onclick="chooseSecondEvent('watch')">
                <strong>👀 Prendre le temps d'observer</strong>
                <span>Tu regardes attentivement ce qui se passe autour de toi.</span>
            </button>
            <button class="choice green" onclick="chooseSecondEvent('try')">
                <strong>🎯 Tenter quelque chose</strong>
                <span>Tu décides de voir ce qui se passe si tu essaies.</span>
            </button>
            <button class="choice orange" onclick="chooseSecondEvent('ask')">
                <strong>🗣️ En parler à quelqu'un</strong>
                <span>Demander ce que les autres en pensent avant de décider.</span>
            </button>
            <button class="choice blue" onclick="chooseSecondEvent('follow')">
                <strong>🧭 Suivre ton instinct</strong>
                <span>Faire ce qui te semble naturel sur le moment.</span>
            </button>
        </div>
    `;
}
    return `
        <span class="event-label">UNE NOUVELLE JOURNÉE</span>
        <h1 class="event-title">🌱 Une journée comme les autres</h1>
        <p class="event-text">La vie continue. Quelque chose finira bien par attirer ton attention.</p>
        <div class="choices">
            <button class="choice blue" onclick="chooseSecondEvent('watch')"><strong>👀 Observer</strong><span>Prendre le temps de regarder ce qui se passe.</span></button>
            <button class="choice green" onclick="chooseSecondEvent('try')"><strong>🎯 Essayer</strong><span>Voir ce qui se passe en te lançant.</span></button>
            <button class="choice orange" onclick="chooseSecondEvent('ask')"><strong>🗣️ Demander</strong><span>En parler à quelqu'un pour avoir un autre point de vue.</span></button>
            <button class="choice blue" onclick="chooseSecondEvent('follow')"><strong>🧭 Suivre ton instinct</strong><span>Faire ce qui te semble naturel sur le moment.</span></button>
        </div>
    `;
}

function showGame() {

    const age =
        calculateAge(
            player.birthDate,
            player.currentDate
        );

    const debugStats = `
        <div style="
            margin-top:20px;
            padding:12px;
            background:#fff3cd;
            border:1px solid #ffe69c;
            border-radius:10px;
            font-size:13px;
        ">
            <strong>🧪 MODE DEBUG</strong><br>
            🧠 Curiosité : ${player.traits.curiosity}<br>
            ⚡ Initiative : ${player.traits.initiative}<br>
            🏸 Intérêt badminton : ${player.traits.badmintonInterest}<br>
            💪 Motivation : ${player.hidden.motivation}
        </div>
    `;

    app.innerHTML = `

        <div class="game">

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
                            🏫 ${player.school.name}
                        </strong>

                        <span>
                            ${player.school.level}
                        </span>

                    </div>


                    <div class="profile-item">

                        <strong>
                            🏸 ${player.badminton.club.name}
                        </strong>

                        <span>
                            ${player.badminton.club.reputation}
                        </span>

                    </div>


                    ${player.family.members.map(member => {

                        let icon = "👤";

                        if (member.role === "Mère") {
                            icon = "👩";
                        }

                        if (member.role === "Père") {
                            icon = "👨";
                        }

                        if (member.role === "Frère / sœur") {
                            icon = "🧒";
                        }

                        return `

                            <div class="profile-item">

                                <strong>
                                    ${icon} ${member.role}
                                </strong>

                                <span>
                                    ${member.name}
                                </span>

                            </div>

                        `;

                    }).join("")}


                    ${debugStats}

                </aside>


                <!-- COLONNE PRINCIPALE -->

                <main class="main-column">


                    <div class="event-card">

                        <div class="event-image">
                            🏸
                        </div>


                        <div class="event-content">

                            ${getCurrentEventContent(age)}

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

    const consequences = {

        explorer: {
            curiosity: 4
        },

        agir: {
            initiative: 4,
            curiosity: 2
        },

        activite: {
            curiosity: 3,
            badmintonInterest: 2
        },

        calme: {
            motivation: 2
        }

    };


    if (choice === "explorer") {

        text =
            `Tu prends le temps d'observer ce qui t'entoure. ` +
            `La rentrée est encore récente et tout semble nouveau.`;
    }


    if (choice === "agir") {

        text =
            `Tu as envie de découvrir quelque chose. ` +
            `Tu fais le premier pas et commences à regarder ` +
            `les personnes qui t'entourent.`;
    }


    if (choice === "activite") {

        text =
            `Tu te demandes ce qu'il serait possible de faire ` +
            `après l'école. ` +
            `Tu commences à regarder les activités proposées autour de toi.`;
    }


    if (choice === "calme") {

        text =
            `Tu préfères prendre ton temps. ` +
            `Après l'école, tu rentres tranquillement à la maison.`;
    }


    player.eventHistory.push({
        event: "first",
        choice: choice
    });


    player.lastConsequences =
        consequences[choice] || {};


    Object.keys(player.lastConsequences).forEach(stat => {

        if (player.traits[stat] !== undefined) {
            player.traits[stat] +=
                player.lastConsequences[stat];
        }

        if (player.hidden[stat] !== undefined) {
            player.hidden[stat] +=
                player.lastConsequences[stat];
        }

    });


    const date =
        new Date(
            player.currentDate + "T12:00:00"
        );


    date.setDate(
        date.getDate() + 3
    );


    player.currentDate =
        date.toISOString().split("T")[0];

    recordMemory("first", choice, text);

    player.history.push({

        date:
            formatDate(player.currentDate),

        text:
            text
    });


    player.pendingNextEvent = "activity";

    player.currentEvent = "consequence";


    showGame();
}
/* =========================================================
   MOTEUR D'ÉVÉNEMENTS
========================================================= */

function getNextEvent() {

    const events = [];
    const previousEvent = player.currentEvent;
    const age = calculateAge(player.birthDate, player.currentDate);

    if (age <= 10) events.push("childhood");
    if (previousEvent !== "badminton" && player.traits.badmintonInterest >= 5) events.push("badminton");
    if (previousEvent !== "curiosity" && player.traits.curiosity >= 55) events.push("curiosity");
    if (previousEvent !== "initiative" && player.traits.initiative >= 55) events.push("initiative");
    if (player.hidden.motivation >= 65 && previousEvent !== "initiative") events.push("initiative");

    const filteredEvents = events.filter(
        event => event !== player.currentEvent &&
        !player.eventHistory.some(history => history.event === event)
    );

    if (filteredEvents.length === 0) {
        const repeatableEvents = events.filter(event => event !== player.currentEvent);
        if (repeatableEvents.length > 0) return randomItem(repeatableEvents);
        return "neutral";
    }

    // Les souvenirs influencent discrètement les occasions qui se présentent.
    // Ils ne garantissent jamais un événement : ils en modifient seulement la probabilité.
    const memories = Array.isArray(player.memories) ? player.memories : [];

    const badmintonMemories = memories.filter(memory =>
        (memory.event === "first" && memory.choice === "activite") ||
        (memory.event === "activity" && ["approach", "try"].includes(memory.choice)) ||
        (memory.event === "badminton" && ["try", "talk"].includes(memory.choice))
    ).length;

    const curiosityMemories = memories.filter(memory =>
        ["watch", "ask", "explorer"].includes(memory.choice)
    ).length;

    const initiativeMemories = memories.filter(memory =>
        ["agir", "try", "help", "approach"].includes(memory.choice)
    ).length;

    const weightedEvents = [];
    filteredEvents.forEach(event => {
        let weight = 1;

        if (event === "badminton") {
            weight += player.traits.badmintonInterest;
            weight += badmintonMemories * 4;
        }

        if (event === "curiosity") {
            weight += player.traits.curiosity;
            weight += curiosityMemories * 2;
        }

        if (event === "initiative") {
            weight += player.traits.initiative;
            weight += initiativeMemories * 2;
        }

        for (let i = 0; i < weight; i++) weightedEvents.push(event);
    });

    return randomItem(weightedEvents);
}

function resolveEventChoice(event, choice) {

    const consequences = {

        activity: {
            watch: { curiosity: 4 },
            approach: { initiative: 3, badmintonInterest: 2 },
            ask: { curiosity: 3, initiative: 2 },
            try: { badmintonInterest: 5, initiative: 2 }
        },

        badminton: {
            watch: { curiosity: 3, badmintonInterest: 2 },
            try: { badmintonInterest: 6, initiative: 2 },
            ask: { curiosity: 2, badmintonInterest: 2 },
            talk: { initiative: 2, badmintonInterest: 3 }
        },

        curiosity: {
            watch: { curiosity: 4 },
            try: { curiosity: 5, initiative: 3 },
            ask: { curiosity: 2, initiative: 2 },
            leave: { motivation: 1 }
        },

        initiative: {
            think: { curiosity: 2 },
            try: { initiative: 5, motivation: 2 },
            ask: { curiosity: 2, initiative: 2 },
            help: { initiative: 3, motivation: 2 }
        },

        childhood: {
            watch: { curiosity: 3 },
            try: { initiative: 3, curiosity: 2 },
            ask: { curiosity: 2, initiative: 1 },
            follow: { motivation: 2, initiative: 1 }
        },

        neutral: {
            watch: { curiosity: 2 },
            try: { initiative: 2 },
            ask: { curiosity: 1, initiative: 1 },
            follow: { motivation: 1 }
        }
    };

    return consequences[event]?.[choice] || {};
}

function continueAfterConsequences() {

    player.currentEvent = player.pendingNextEvent;

    showGame();
}

function getEventChoiceText(event, choice) {

    const texts = {
        activity: {
            watch: `Tu restes quelques minutes près de la porte. Tu observes les échanges et essaies de comprendre ce qui rend ce sport intéressant.`,
            approach: `Tu pousses la porte du gymnase et t'approches du groupe. Quelques personnes remarquent ta présence et tu découvres l'ambiance du club.`,
            ask: `Tu t'adresses à quelqu'un pour savoir ce qui se passe. Tu découvres qu'il s'agit d'une séance de badminton et commences à poser quelques questions.`,
            try: `Tu demandes si tu peux essayer. On te tend une raquette et tu découvres rapidement que frapper un volant est moins simple qu'il n'y paraît.`
        },
        badminton: {
            watch: `Tu restes quelques minutes de plus à observer les joueurs. Certains échanges sont rapides, d'autres beaucoup plus longs. Tu commences à te demander ce qu'il faudrait pour réussir à jouer comme eux.`,
            try: `Tu prends une raquette et décides d'essayer quelques échanges. Tes premiers coups sont loin d'être parfaits, mais tu as envie de recommencer.`,
            ask: `Tu poses quelques questions sur le badminton. Tu découvres que derrière les échanges que tu regardais se cache tout un monde que tu ne connaissais pas encore.`,
            talk: `Tu vas parler à un joueur après un échange. La discussion est simple, mais tu découvres quelqu'un qui semble vraiment aimer ce sport.`
        },
        curiosity: {
            watch: `Tu prends le temps d'observer ce qui se passe autour de toi. Un détail attire particulièrement ton attention et te donne envie d'en savoir plus.`,
            try: `Tu décides de chercher par toi-même. Tu ne sais pas encore où cela va te mener, mais comprendre les choses par toi-même te plaît déjà.`,
            ask: `Tu poses la question à quelqu'un. La réponse ne règle pas tout, mais elle ouvre encore quelques nouvelles questions.`,
            leave: `Tu gardes cette question dans un coin de ta tête. Tu n'as pas besoin de tout comprendre aujourd'hui.`
        },
        initiative: {
            think: `Tu prends quelques minutes pour réfléchir. Plusieurs idées te viennent à l'esprit et tu commences à te demander laquelle pourrait vraiment te plaire.`,
            try: `Tu décides de te lancer sans attendre d'avoir toutes les réponses. Tu ne sais pas exactement comment les choses vont se passer, mais au moins, quelque chose commence.`,
            ask: `Tu vas chercher quelqu'un à qui en parler. La discussion te donne une autre manière de voir les choses et fait naître une nouvelle idée.`,
            help: `Tu remarques que quelqu'un a besoin d'un coup de main. Tu décides de l'aider plutôt que de chercher quelque chose pour toi. Finalement, ça te donne envie de faire d'autres choses.`
        },
        childhood: {
            watch: `Tu prends le temps d'observer ce qui se passe autour de toi. Une petite chose retient ton attention et rend cette journée un peu différente.`,
            try: `Tu décides d'essayer quelque chose de nouveau. Tu ne sais pas encore si cela te plaira, mais tu as envie de découvrir ce qui va se passer.`,
            ask: `Tu en parles à quelqu'un autour de toi. La discussion t'aide à voir cette petite situation sous un autre angle.`,
            follow: `Tu suis simplement ton instinct. Ce n'est peut-être pas la décision la plus réfléchie, mais elle te semble naturelle sur le moment.`
        },
        neutral: {
            watch: `Tu prends le temps de regarder ce qui se passe autour de toi.`,
            try: `Tu décides d'essayer quelque chose et vois où cela te mène.`,
            ask: `Tu en parles à quelqu'un et découvres un autre point de vue.`,
            follow: `Tu suis ton instinct et continues tranquillement ta journée.`
        }
    };

    return texts[event]?.[choice] || "Tu continues ta journée.";
}

function chooseSecondEvent(choice) {

    const eventName = player.currentEvent;

    player.eventHistory.push({
        event: eventName,
        choice: choice
    });

    const consequences = resolveEventChoice(
        eventName,
        choice
    );

    player.lastConsequences = consequences;


    Object.keys(consequences).forEach(stat => {

        if (player.traits[stat] !== undefined) {
            player.traits[stat] += consequences[stat];
        }

        if (player.hidden[stat] !== undefined) {
            player.hidden[stat] += consequences[stat];
        }

    });


    const text =
        getEventChoiceText(
            player.currentEvent,
            choice
        );


    const nextEvent = getNextEvent();

    player.pendingNextEvent = nextEvent;
    player.currentEvent = "consequence";


    const date =
        new Date(
            player.currentDate + "T12:00:00"
        );

    date.setDate(
        date.getDate() + 2
    );


    player.currentDate =
        date.toISOString().split("T")[0];

    recordMemory(eventName, choice, text);

    player.history.push({

        date:
            formatDate(player.currentDate),

        text:
            text
    });


    showGame();
}
/* =========================================================
   LANCEMENT
========================================================= */

showHome();
