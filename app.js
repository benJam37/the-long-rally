const app = document.getElementById("app");
const newLifeButton = document.getElementById("new-life-btn");

newLifeButton.addEventListener("click", startNewLife);

function startNewLife() {
    app.innerHTML = `
        <h1>🌱 Nouvelle vie</h1>

        <p>
            Chaque vie commence quelque part.<br>
            Tu ne sais pas encore où elle te mènera.
        </p>

        <button id="random-life-btn">
            🎲 Laisser la vie décider
        </button>
    `;

    document
        .getElementById("random-life-btn")
        .addEventListener("click", generateLife);
}

function generateLife() {
    const firstNames = [
        "Nathan",
        "Lucas",
        "Hugo",
        "Camille",
        "Emma",
        "Léa"
    ];

    const cities = [
        "Angers",
        "Tours",
        "Rennes",
        "Poitiers",
        "Limoges",
        "Bordeaux"
    ];

    const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const city =
        cities[Math.floor(Math.random() * cities.length)];

    app.innerHTML = `
        <h1>👤 ${firstName}</h1>

        <div class="profile">
            <p><strong>Âge :</strong> 8 ans</p>
            <p><strong>Ville :</strong> ${city}</p>
            <p><strong>Année :</strong> 2026</p>
        </div>

        <button id="start-event-btn">
            🏸 Commencer cette vie
        </button>
    `;

    document
        .getElementById("start-event-btn")
        .addEventListener("click", firstEvent);
}

function firstEvent() {
    app.innerHTML = `
        <h1>🏸 Une première rencontre</h1>

        <p>
            Aujourd'hui, quelqu'un te propose d'essayer le badminton.
        </p>

        <div class="choices">
            <button>Je veux essayer !</button>
            <button>Je veux juste regarder.</button>
            <button>Je veux continuer mes autres activités aussi.</button>
        </div>
    `;
}
