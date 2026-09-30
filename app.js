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

function showGame() {

    const age =
        calculateAge(
            player.birthDate,
            player.currentDate
        );


    const familyMembers =
        player.family.members
            .map(member => `
                <div class="profile-item">

                    <strong>
                        ${member.role}
                    </strong>

                    <span>
                        ${member.name}
                    </span>

                </div>
            `)
            .join("");


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

                                ${player.firstName} a
                                ${age} ans.

                                À ${player.city},
                                la rentrée vient de commencer.

                                ${player.family.description}

                                Pour l'instant,
                                le badminton n'est encore
                                qu'une possibilité parmi
                                tant d'autres.

                            </p>


                            <div class="choices">


                                <button
                                    class="choice blue"
                                    onclick="chooseFirstEvent('explorer')">

                                    <strong>
                                        👀 Observer autour de moi
                                    </strong>

                                    <span>
                                        Prendre le temps de découvrir
                                        ce nouvel environnement.
                                    </span>

                                </button>


                                <button
                                    class="choice green"
                                    onclick="chooseFirstEvent('agir')">

                                    <strong>
                                        🚀 Me lancer
                                    </strong>

                                    <span>
                                        J'ai envie de voir ce que
                                        cette nouvelle vie me réserve.
                                    </span>

                                </button>


                                <button
                                    class="choice orange"
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
            `${player.firstName} prend le temps `
            +
            `d'observer ce qui l'entoure. `
            +
            `Certaines choses attirent déjà `
            +
            `son attention.`;
    }


    if (choice === "agir") {

        text =
            `${player.firstName} décide de ne pas `
            +
            `rester dans son coin. `
            +
            `Une nouvelle aventure commence.`;
    }


    if (choice === "calme") {

        text =
            `${player.firstName} préfère prendre `
            +
            `son temps. Après tout, la journée `
            +
            `ne fait que commencer.`;
    }


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
