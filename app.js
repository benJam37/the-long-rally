const app = document.getElementById("app");

const names = [
    "Nathan",
    "Emma",
    "Lucas",
    "Hugo",
    "Camille",
    "Léa",
    "Arthur",
    "Jules"
];

const cities = [
    "Tours",
    "Angers",
    "Rennes",
    "Poitiers",
    "Limoges",
    "Bordeaux"
];

let player = null;

showHome();


function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


/* =========================
   ACCUEIL
========================= */

function showHome() {
    app.innerHTML = `
        <div class="app-shell home">
            <div class="home-card">

                <section class="home-visual">
                    <div class="home-logo">
                        The Long <span>Rally</span>
                    </div>

                    <div class="home-tagline">
                        One life. Thousands of choices.
                    </div>

                    <div class="home-badminton">
                        🏸
                    </div>
                </section>

                <section class="home-menu">

                    <button class="menu-button primary"
                            onclick="showNewLife()">
                        <span class="menu-icon">▶</span>
                        <span class="menu-title">Nouvelle partie</span>
                        <span class="menu-subtitle">
                            Commencer une nouvelle vie
                        </span>
                    </button>

                    <button class="menu-button">
                        <span class="menu-icon">📁</span>
                        <span class="menu-title">Charger une partie</span>
                        <span class="menu-subtitle">
                            Reprendre une partie existante
                        </span>
                    </button>

                    <button class="menu-button">
                        <span class="menu-icon">⚙️</span>
                        <span class="menu-title">Paramètres</span>
                        <span class="menu-subtitle">
                            Son, affichage, etc.
                        </span>
                    </button>

                    <button class="menu-button">
                        <span class="menu-icon">📖</span>
                        <span class="menu-title">À propos</span>
                        <span class="menu-subtitle">
                            Le projet The Long Rally
                        </span>
                    </button>

                </section>

            </div>
        </div>
    `;
}


/* =========================
   NOUVELLE VIE
========================= */

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
                        ou lui donner quelques indications.
                    </p>

                </div>

                <div class="life-choice-grid">

                    <div class="life-choice">

                        <div class="life-choice-icon">🎲</div>

                        <h2>Vie aléatoire</h2>

                        <p>
                            Laisse le hasard décider de ton prénom,
                            de ta ville, de ta famille et de ton parcours.
                        </p>

                        <button class="primary-button"
                                onclick="generateRandomLife()">
                            🎲 Laisser la vie décider
                        </button>

                    </div>

                    <div class="life-choice">

                        <div class="life-choice-icon">🧭</div>

                        <h2>Orienter ma vie</h2>

                        <p>
                            Donne quelques indications à ton futur
                            personnage sans décider de son destin.
                        </p>

                        <button class="secondary-button"
                                onclick="showOrientation()">
                            Commencer avec des choix
                        </button>

                    </div>

                </div>

            </div>
        </div>
    `;
}


/* =========================
   ORIENTATION
========================= */

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
                        🧭 Orienter ma vie
                    </h1>

                    <p class="page-subtitle">
                        Tu influences les probabilités.
                        Tu ne choisis pas le destin.
                    </p>

                </div>

                <div class="life-choice">

                    <h2>Quel environnement veux-tu privilégier ?</h2>

                    <p>
                        Ces choix influenceront la génération de la vie,
                        sans garantir le résultat.
                    </p>

                    <div class="choices">

                        <button class="choice blue"
                                onclick="generateOrientedLife('family')">
                            <strong>👨‍👩‍👧 Famille</strong>
                            <span>
                                Une vie familiale plutôt stable et présente.
                            </span>
                        </button>

                        <button class="choice green"
                                onclick="generateOrientedLife('sport')">
                            <strong>🏸 Sport</strong>
                            <span>
                                Un environnement où le sport pourrait
                                prendre davantage de place.
                            </span>
                        </button>

                        <button class="choice orange"
                                onclick="generateOrientedLife('surprise')">
                            <strong>🎲 Surprise</strong>
                            <span>
                                Laisse encore une fois la vie décider.
                            </span>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    `;
}


/* =========================
   GÉNÉRATION
========================= */

function generateRandomLife() {
    createPlayer();
    showGame();
}

function generateOrientedLife(type) {
    createPlayer(type);
    showGame();
}

function createPlayer(orientation = "random") {

    player = {
        firstName: randomItem(names),
        city: randomItem(cities),

        birthDate: "2018-04-15",
        currentDate: "2026-09-12",

        school: "CE2",

        badminton: {
            level: "Débutant",
            experience: "Aucune expérience"
        },

        orientation: orientation,

        history: [
            {
                date: "1 septembre 2026",
                text: "Rentrée des classes."
            }
        ]
    };
}


/* =========================
   ÂGE
========================= */

function calculateAge(birthDate, currentDate) {

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    let age = current.getFullYear() - birth.getFullYear();

    const birthdayNotPassed =
        current.getMonth() < birth.getMonth() ||
        (
            current.getMonth() === birth.getMonth() &&
            current.getDate() < birth.getDate()
        );

    if (birthdayNotPassed) {
        age--;
    }

    return age;
}


/* =========================
   JEU
========================= */

function showGame() {

    const age = calculateAge(
        player.birthDate,
        player.currentDate
    );

    app.innerHTML = `
        <div class="game">

            <header class="game-header">

                <div class="game-logo">
                    🏸 The Long Rally
                </div>

                <div class="game-date">
                    <strong>
                        Samedi 12 septembre 2026
                    </strong>

                    <span>
                        Saison 1 · Âge : ${age} ans
                    </span>
                </div>

            </header>

            <main class="game-content">

                <aside class="profile-card">

                    <div class="avatar">
                        👤
                    </div>

                    <h2 class="profile-name">
                        ${player.firstName}
                    </h2>

                    <div class="profile-age">
                        ${age} ans
                    </div>

                    <div class="profile-item">
                        <strong>📍 Ville</strong>
                        <span>${player.city}</span>
                    </div>

                    <div class="profile-item">
                        <strong>🏫 École</strong>
                        <span>${player.school}</span>
                    </div>

                    <div class="profile-item">
                        <strong>🏸 Badminton</strong>
                        <span>
                            ${player.badminton.experience}
                        </span>
                    </div>

                    <div class="profile-item">
                        <strong>Niveau</strong>
                        <span>
                            ${player.badminton.level}
                        </span>
                    </div>

                </aside>

                <section class="main-column">

                    <article class="event-card">

                        <div class="event-image">
                            🏸
                        </div>

                        <div class="event-content">

                            <div class="event-label">
                                ÉVÉNEMENT
                            </div>

                            <h1 class="event-title">
                                Une première rencontre
                            </h1>

                            <p class="event-text">
                                Aujourd'hui, quelqu'un te propose
                                d'essayer le badminton.
                            </p>

                            <p class="event-text">
                                Tu ne connais presque rien à ce sport,
                                mais quelque chose te donne envie
                                d'en savoir plus.
                            </p>

                            <h3>
                                Que veux-tu faire ?
                            </h3>

                            <div class="choices">

                                <button class="choice green"
                                        onclick="chooseFirstEvent(1)">
                                    <strong>
                                        🏸 Je veux essayer !
                                    </strong>

                                    <span>
                                        Ça a l'air sympa,
                                        je me lance.
                                    </span>
                                </button>

                                <button class="choice blue"
                                        onclick="chooseFirstEvent(2)">
                                    <strong>
                                        👁️ Je veux juste regarder.
                                    </strong>

                                    <span>
                                        Je préfère d'abord voir
                                        de quoi il s'agit.
                                    </span>
                                </button>

                                <button class="choice orange"
                                        onclick="chooseFirstEvent(3)">
                                    <strong>
                                        🏃 Je veux continuer mes autres activités aussi.
                                    </strong>

                                    <span>
                                        Je suis curieux, mais je veux
                                        garder du temps pour le reste.
                                    </span>
                                </button>

                            </div>

                        </div>

                    </article>

                    <article class="history-card">

                        <div class="history-title">
                            📖 Ce qui s'est passé récemment
                        </div>

                        ${player.history.map(event => `
                            <div class="history-item">
                                <div class="history-date">
                                    ${event.date}
                                </div>

                                <div class="history-text">
                                    ${event.text}
                                </div>
                            </div>
                        `).join("")}

                    </article>

                </section>

            </main>

        </div>
    `;
}


/* =========================
   PREMIER CHOIX
========================= */

function chooseFirstEvent(choice) {

    let message = "";

    if (choice === 1) {
        message = "Tu décides d'essayer le badminton.";
    }

    if (choice === 2) {
        message = "Tu préfères observer avant de te lancer.";
    }

    if (choice === 3) {
        message = "Tu veux découvrir le badminton sans abandonner tes autres activités.";
    }

    player.history.unshift({
        date: "12 septembre 2026",
        text: message
    });

    alert(message);
}
