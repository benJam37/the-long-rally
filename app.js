const app = document.getElementById("app");

let player = null;


/* =========================================================
   CATALOGUE D'ÉVÉNEMENTS : ENFANCE (8-10 ANS)
   Chaque événement est autonome : contexte, quatre choix,
   conséquences et récit de sortie.
========================================================= */
const EVENT_CATALOG = {
    school_friend: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À L'ÉCOLE", title: "Une place se libère à côté de toi",
        text: "À la récréation, un camarade avec qui tu as peu parlé s'approche. Il cherche quelqu'un avec qui passer le reste de la pause.",
        choices: {
            invite: { label: "🙂 Lui proposer de rester avec toi", description: "Faire une place à quelqu'un que tu connais peu.", result: "Vous commencez à discuter et découvrez quelques points communs.", consequences: { initiative: 2, motivation: 1 } },
            ask: { label: "🗣️ Lui poser des questions", description: "Apprendre à le connaître avant de décider.", result: "La conversation démarre doucement. Tu découvres ce qui l'intéresse.", consequences: { curiosity: 2, initiative: 1 } },
            group: { label: "👥 L'inviter à rejoindre les autres", description: "L'aider à trouver sa place dans le groupe.", result: "Tu l'introduis auprès des autres. La discussion prend une tournure plus collective.", consequences: { initiative: 2, motivation: 1 } },
            quiet: { label: "😌 Continuer tranquillement", description: "Ne pas forcer une rencontre qui vient à peine de commencer.", result: "Vous échangez quelques mots, puis chacun reprend son activité sans malaise.", consequences: { motivation: 1 } }
        }
    },
    homework: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "APRÈS L'ÉCOLE", title: "Un exercice qui résiste",
        text: "Un devoir te pose problème. Tu as essayé plusieurs fois, mais tu ne comprends toujours pas ce qui bloque.",
        choices: {
            persist: { label: "✏️ Réessayer autrement", description: "Changer de méthode plutôt que recommencer pareil.", result: "En changeant d'approche, tu comprends enfin une partie de l'exercice.", consequences: { initiative: 2, curiosity: 1 } },
            ask: { label: "🙋 Demander de l'aide", description: "Faire expliquer le point qui te manque.", result: "L'explication débloque la situation. Demander de l'aide t'a fait gagner du temps.", consequences: { initiative: 1, motivation: 2 } },
            break: { label: "🍎 Faire une pause", description: "Revenir dessus avec l'esprit plus frais.", result: "Après une pause, l'exercice paraît un peu moins insurmontable.", consequences: { motivation: 2 } },
            guess: { label: "🧩 Chercher un autre indice", description: "Regarder les exemples et les détails.", result: "Un détail dans l'exemple te met sur une piste intéressante.", consequences: { curiosity: 2 } }
        }
    },
    playground_game: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À LA RÉCRÉATION", title: "Les règles changent en cours de jeu",
        text: "Un jeu collectif bat son plein, mais deux enfants ne sont pas d'accord sur les règles. Tout le monde attend de voir ce qui va se passer.",
        choices: {
            mediate: { label: "🤝 Proposer un compromis", description: "Trouver une règle qui convienne à tout le monde.", result: "Le jeu reprend avec une règle commune, même si personne n'a exactement obtenu ce qu'il voulait.", consequences: { initiative: 2, motivation: 1 } },
            listen: { label: "👂 Écouter les deux versions", description: "Comprendre le désaccord avant d'intervenir.", result: "En écoutant chacun, tu comprends pourquoi le désaccord a commencé.", consequences: { curiosity: 2, initiative: 1 } },
            support: { label: "🧑‍🤝‍🧑 Aider un des enfants", description: "Prendre parti pour celui qui semble seul.", result: "L'enfant se sent soutenu, mais le désaccord n'est pas complètement réglé.", consequences: { initiative: 1 } },
            leave: { label: "🚶 Reprendre ton activité", description: "Ne pas te mêler d'un conflit qui ne te concerne pas.", result: "Tu retournes à ton jeu. Les autres finissent par trouver leur propre solution.", consequences: { motivation: 1 } }
        }
    },
    forgotten_snack: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "PETIT IMPRÉVU", title: "Le goûter oublié",
        text: "Tu réalises que tu as oublié ton goûter. À côté de toi, un camarade a apporté plus que nécessaire.",
        choices: {
            ask: { label: "🗣️ Lui demander s'il peut partager", description: "Oser demander plutôt que rester dans ton coin.", result: "Il accepte de partager une partie de son goûter et vous discutez en mangeant.", consequences: { initiative: 2, motivation: 1 } },
            offer: { label: "🍎 Proposer d'échanger autre chose", description: "Trouver une manière équitable de partager.", result: "Vous échangez une partie de vos affaires. L'oubli devient un petit moment amusant.", consequences: { initiative: 1, curiosity: 1 } },
            wait: { label: "⏳ Attendre le retour à la maison", description: "Tu peux tenir jusqu'à la fin de la journée.", result: "Tu fais sans goûter aujourd'hui. Ce n'est pas très agréable, mais tu t'en accommodes.", consequences: { motivation: 1 } },
            tell: { label: "🏠 En parler à un adulte", description: "Demander conseil sans dramatiser.", result: "Un adulte t'aide à trouver une solution pour aujourd'hui et à penser au goûter de demain.", consequences: { curiosity: 1, motivation: 1 } }
        }
    },
    new_hobby: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À LA MAISON", title: "Une activité que tu ne connais pas",
        text: "Quelqu'un dans ta famille te montre une activité qu'il aime bien. Tu ne sais pas encore si elle te plaira.",
        choices: {
            try: { label: "🎨 Essayer tout de suite", description: "Découvrir en faisant plutôt qu'en regardant.", result: "Tu t'y essaies quelques minutes. Ce n'est pas forcément ton nouveau passe-temps, mais tu as découvert quelque chose.", consequences: { initiative: 2, curiosity: 1 } },
            observe: { label: "👀 Regarder d'abord", description: "Comprendre comment ça marche avant de participer.", result: "En observant, tu repères quelques détails qui te donnent une meilleure idée de l'activité.", consequences: { curiosity: 2 } },
            question: { label: "❓ Demander ce qui plaît là-dedans", description: "Découvrir pourquoi cette activité compte pour l'autre.", result: "La personne te raconte ce qu'elle aime dans cette activité. Tu la connais un peu mieux.", consequences: { curiosity: 1, motivation: 1 } },
            later: { label: "🙂 Proposer d'essayer une autre fois", description: "Garder l'idée pour un moment où tu en auras envie.", result: "Tu passes à autre chose, mais l'idée reste disponible pour une prochaine fois.", consequences: { motivation: 1 } }
        }
    },
    rainy_day: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "JOUR DE PLUIE", title: "Les plans tombent à l'eau",
        text: "Tu avais prévu de sortir, mais la pluie s'installe pour de bon. Il faut improviser un après-midi à l'intérieur.",
        choices: {
            invent: { label: "🧱 Inventer un jeu", description: "Faire quelque chose avec ce que tu as sous la main.", result: "Un jeu improvisé prend forme. Les règles changent plusieurs fois, mais vous vous amusez.", consequences: { initiative: 2, curiosity: 1 } },
            read: { label: "📚 Te plonger dans un livre", description: "Profiter du calme pour explorer une histoire.", result: "Tu te laisses emporter par une histoire et perds un peu la notion du temps.", consequences: { curiosity: 2, motivation: 1 } },
            help: { label: "🍪 Aider à préparer le goûter", description: "Transformer l'après-midi en activité partagée.", result: "Vous préparez quelque chose ensemble. Le résultat est un peu de travers, mais tout à fait mangeable.", consequences: { initiative: 1, motivation: 2 } },
            rest: { label: "🛋️ Profiter d'un moment calme", description: "Accepter que la journée soit plus tranquille.", result: "Tu prends le temps de te reposer et la journée ralentit agréablement.", consequences: { motivation: 2 } }
        }
    },
    lost_pencil: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À L'ÉCOLE", title: "Le crayon disparu",
        text: "Juste avant un exercice, tu ne retrouves plus ton crayon préféré. Tu es presque sûr de l'avoir posé quelque part dans la classe.",
        choices: {
            search: { label: "🔎 Chercher méthodiquement", description: "Revoir les endroits où tu es passé.", result: "Tu retraces tes gestes et retrouves le crayon sous une feuille.", consequences: { curiosity: 2, initiative: 1 } },
            borrow: { label: "✏️ En emprunter un", description: "Résoudre le problème sans perdre de temps.", result: "Un camarade t'en prête un. Tu pourras chercher le tien plus tard.", consequences: { initiative: 1, motivation: 1 } },
            ask: { label: "🗣️ Demander si quelqu'un l'a vu", description: "Faire appel aux personnes autour de toi.", result: "Quelqu'un se souvient l'avoir vu près du tableau et t'aide à le retrouver.", consequences: { initiative: 1, curiosity: 1 } },
            improvise: { label: "🙂 Utiliser un autre crayon", description: "Ne pas laisser un petit problème gâcher la matinée.", result: "Tu utilises un autre crayon et te concentres sur l'exercice.", consequences: { motivation: 2 } }
        }
    },
    sibling_competition: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "EN FAMILLE", title: "Toujours une compétition",
        text: "Un frère ou une sœur veut absolument comparer vos résultats dans un jeu. La partie devient plus sérieuse que prévu.",
        choices: {
            play: { label: "🏁 Accepter le défi", description: "Voir jusqu'où tu peux aller sans te prendre trop au sérieux.", result: "La partie devient intense. Vous vous chamaillez un peu, puis vous en riez.", consequences: { initiative: 2, motivation: 1 } },
            rules: { label: "📏 Changer les règles", description: "Trouver un défi plus amusant pour vous deux.", result: "Vous inventez une variante qui rend la partie plus équilibrée et plus drôle.", consequences: { curiosity: 2, initiative: 1 } },
            cooperate: { label: "🤝 Jouer en équipe", description: "Remplacer la compétition par un objectif commun.", result: "En faisant équipe, vous découvrez que vous êtes plutôt efficaces ensemble.", consequences: { motivation: 2, initiative: 1 } },
            stop: { label: "😌 Proposer d'arrêter là", description: "Préserver la bonne humeur avant que ça dérape.", result: "Vous arrêtez avant que la compétition ne devienne une dispute.", consequences: { motivation: 1 } }
        }
    },
    class_project: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À L'ÉCOLE", title: "Le travail en groupe",
        text: "La classe doit préparer une petite présentation. Ton groupe n'a pas encore décidé comment s'organiser, et chacun attend que quelqu'un commence.",
        choices: {
            organize: { label: "📝 Répartir les tâches", description: "Proposer une organisation simple.", result: "Le groupe se met en mouvement et chacun sait par quoi commencer.", consequences: { initiative: 2, motivation: 1 } },
            idea: { label: "💡 Proposer une idée originale", description: "Donner une direction créative au projet.", result: "Ton idée lance la discussion. Le groupe l'adapte et commence à construire quelque chose ensemble.", consequences: { curiosity: 2, initiative: 1 } },
            listen: { label: "👂 Écouter les idées des autres", description: "Laisser chacun contribuer avant de choisir.", result: "Plusieurs idées se complètent et le projet prend une direction inattendue.", consequences: { curiosity: 2, motivation: 1 } },
            task: { label: "🧩 Prendre une tâche précise", description: "Contribuer sans devoir diriger tout le monde.", result: "Tu avances sur une partie concrète du travail et aides le groupe à progresser.", consequences: { initiative: 1, motivation: 1 } }
        }
    },
    new_neighbour: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "DANS LE QUARTIER", title: "Un nouveau visage",
        text: "Une famille vient d'emménager dans le quartier. Un enfant de ton âge est dehors, sans sembler connaître les autres.",
        choices: {
            greet: { label: "👋 Aller te présenter", description: "Faire le premier pas vers cette nouvelle personne.", result: "Vous échangez vos prénoms et découvrez que vous habitez tout près.", consequences: { initiative: 2, motivation: 1 } },
            game: { label: "⚽ Proposer un jeu", description: "Faire connaissance autour d'une activité.", result: "Le jeu vous donne rapidement quelque chose à partager et la conversation devient plus facile.", consequences: { initiative: 2, curiosity: 1 } },
            wait: { label: "👀 Voir s'il vient vers toi", description: "Laisser la rencontre se faire naturellement.", result: "Vous vous remarquez plusieurs fois sans encore parler. Une prochaine occasion se présentera peut-être.", consequences: { curiosity: 1 } },
            ask_family: { label: "🏠 En parler à ta famille", description: "Voir si quelqu'un sait qui vient d'arriver.", result: "Ta famille t'explique qui s'est installé dans le quartier. Tu sais maintenant comment l'aborder.", consequences: { curiosity: 2 } }
        }
    },
    fair_day: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "SORTIE", title: "La fête du quartier",
        text: "Une petite fête a lieu près de chez toi. Il y a des stands, des jeux et beaucoup de monde, mais tu ne sais pas par quoi commencer.",
        choices: {
            game: { label: "🎯 Tenter un jeu d'adresse", description: "Voir si tu peux relever un petit défi.", result: "Tu tentes ta chance. Même sans gagner le gros lot, tu repars avec une histoire à raconter.", consequences: { initiative: 2, motivation: 1 } },
            explore: { label: "🧭 Faire le tour des stands", description: "Découvrir ce qui se passe avant de choisir.", result: "Tu repères plusieurs activités et découvres un stand que tu n'aurais pas remarqué autrement.", consequences: { curiosity: 2 } },
            company: { label: "👥 Rester avec les autres", description: "Profiter de la sortie ensemble.", result: "Vous passez d'un stand à l'autre et la sortie devient surtout un bon moment partagé.", consequences: { motivation: 2 } },
            snack: { label: "🥞 Chercher quelque chose à manger", description: "Commencer par la priorité absolue.", result: "Tu trouves une gourmandise et prends le temps de regarder la fête depuis un coin tranquille.", consequences: { motivation: 2, curiosity: 1 } }
        }
    },
    small_argument: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "ENTRE CAMARADES", title: "Une parole de travers",
        text: "Un camarade fait une remarque qui te déplaît. Tu n'es pas sûr qu'il ait voulu te vexer, mais le doute reste.",
        choices: {
            ask: { label: "🗣️ Lui demander ce qu'il voulait dire", description: "Clarifier avant de tirer une conclusion.", result: "La discussion permet de comprendre ce qu'il voulait dire, même si la remarque t'avait piqué.", consequences: { initiative: 2, curiosity: 1 } },
            tell: { label: "💬 Lui expliquer ce que tu as ressenti", description: "Parler franchement sans l'attaquer.", result: "Tu exprimes ce qui t'a déplu. Il comprend mieux pourquoi tu as réagi.", consequences: { initiative: 2 } },
            wait: { label: "⏳ Attendre de te calmer", description: "Éviter de répondre sous le coup de l'émotion.", result: "Après un moment, la remarque te paraît moins importante et tu peux reprendre ta journée.", consequences: { motivation: 1 } },
            confide: { label: "🤝 En parler à quelqu'un de confiance", description: "Prendre du recul avec un autre point de vue.", result: "La discussion t'aide à envisager plusieurs interprétations de ce qui s'est passé.", consequences: { curiosity: 2, motivation: 1 } }
        }
    },
    rainy_walk: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "SUR LE CHEMIN", title: "Un détour inattendu",
        text: "Sur le chemin du retour, un petit détour te fait passer dans une rue que tu connais mal. Tu remarques une cour ouverte et entends des enfants jouer.",
        choices: {
            look: { label: "👀 Regarder ce qui se passe", description: "Prendre quelques instants pour observer.", result: "Tu découvres un petit espace de jeu que tu n'avais jamais vraiment remarqué.", consequences: { curiosity: 2 } },
            join: { label: "👋 Demander si tu peux jouer", description: "Tenter de rejoindre les enfants.", result: "Ils t'expliquent leur jeu et te font une place pour quelques minutes.", consequences: { initiative: 2, motivation: 1 } },
            continue: { label: "🚶 Continuer ton chemin", description: "Garder ton programme de départ.", result: "Tu continues vers la maison, avec un nouveau lieu en tête pour une autre fois.", consequences: { motivation: 1 } },
            remember: { label: "🧭 Retenir l'endroit pour plus tard", description: "Garder cette découverte en réserve.", result: "Tu mémorises le chemin. Tu pourras revenir quand tu auras plus de temps.", consequences: { curiosity: 1, initiative: 1 } }
        }
    },
    school_responsibility: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À L'ÉCOLE", title: "On te confie une mission",
        text: "L'enseignant cherche quelqu'un pour distribuer les cahiers et vérifier que chacun reçoit le bon. Plusieurs élèves détournent les yeux.",
        choices: {
            volunteer: { label: "🙋 Te proposer", description: "Prendre la responsabilité de la tâche.", result: "Tu distribues les cahiers et vérifies les noms. Tout se passe bien, à part un cahier qui fait le tour de la mauvaise rangée.", consequences: { initiative: 2, motivation: 1 } },
            partner: { label: "🤝 Proposer de le faire à deux", description: "Partager la responsabilité avec quelqu'un.", result: "À deux, vous terminez rapidement et pouvez vérifier votre travail ensemble.", consequences: { initiative: 1, motivation: 2 } },
            wait: { label: "👀 Attendre de voir qui se propose", description: "Observer comment la situation se règle.", result: "Un autre élève accepte finalement la mission. Tu vois comment il s'organise.", consequences: { curiosity: 1 } },
            ask: { label: "❓ Demander ce qu'il faut faire exactement", description: "Comprendre les consignes avant de t'engager.", result: "Les consignes sont plus simples que tu ne l'imaginais. Tu sais maintenant comment aider une prochaine fois.", consequences: { curiosity: 1, initiative: 1 } }
        }
    },
    first_club_visit: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU GYMNASE", title: "Une séance d'essai se prépare",
        text: "Tu as l'occasion de retourner au gymnase. Cette fois, tu sais un peu mieux à quoi t'attendre, mais tu ne connais presque personne.",
        choices: {
            warmup: { label: "🏸 Participer à l'échauffement", description: "Commencer doucement avec le groupe.", result: "Tu suis les exercices et commences à reconnaître quelques visages.", consequences: { badmintonInterest: 3, initiative: 1 } },
            ask_coach: { label: "🗣️ Parler à l'entraîneur", description: "Comprendre comment se déroule une séance.", result: "L'entraîneur t'explique le fonctionnement du groupe et te propose de rejoindre les exercices à ton rythme.", consequences: { badmintonInterest: 2, curiosity: 2 } },
            watch: { label: "👀 Observer encore un peu", description: "Te familiariser avec l'ambiance avant de participer.", result: "Tu repères les habitudes du groupe et te sens un peu moins étranger au gymnase.", consequences: { badmintonInterest: 1, curiosity: 2 } },
            meet: { label: "🤝 Faire connaissance avec un enfant", description: "Trouver un premier repère dans le groupe.", result: "Un enfant te montre où poser tes affaires et t'explique un jeu utilisé à l'échauffement.", consequences: { badmintonInterest: 2, initiative: 2 } }
        }
    },
    shuttle_miss: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "PREMIERS ÉCHANGES", title: "Le volant n'obéit pas",
        text: "Pendant un exercice, tu rates plusieurs fois le volant. Les autres semblent y arriver plus facilement, et tu dois décider comment réagir.",
        choices: {
            repeat: { label: "🏸 Réessayer encore", description: "Te concentrer sur un nouvel essai.", result: "Les coups ne sont pas encore réguliers, mais tu commences à mieux repérer le moment où frapper.", consequences: { badmintonInterest: 2, motivation: 1 } },
            ask_tip: { label: "🗣️ Demander un conseil", description: "Obtenir une indication concrète.", result: "Un joueur te montre comment placer ta raquette. Le prochain essai est déjà un peu différent.", consequences: { badmintonInterest: 2, curiosity: 1 } },
            laugh: { label: "😂 En rire avec les autres", description: "Ne pas laisser les ratés gâcher le moment.", result: "Tes ratés font rire le groupe, toi compris. L'ambiance devient plus détendue.", consequences: { badmintonInterest: 1, motivation: 2 } },
            pause: { label: "😌 Faire une petite pause", description: "Reprendre quand tu seras prêt.", result: "Tu souffles un instant et regardes les autres. Tu peux réessayer plus tard sans te presser.", consequences: { motivation: 2 } }
        }
    },
    racket_choice: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU CLUB", title: "Une raquette à choisir",
        text: "On te propose plusieurs raquettes. Certaines semblent légères, d'autres ont un manche plus épais. Tu ne sais pas encore ce qui te conviendra.",
        choices: {
            comfort: { label: "✋ Choisir celle qui tient bien en main", description: "Privilégier les sensations.", result: "La raquette te semble naturelle en main. Tu as hâte de voir comment elle se comporte en jeu.", consequences: { badmintonInterest: 2, curiosity: 1 } },
            ask: { label: "🧑‍🏫 Demander l'avis de l'entraîneur", description: "Profiter de l'expérience de quelqu'un qui s'y connaît.", result: "L'entraîneur t'explique les différences et t'aide à choisir une raquette adaptée.", consequences: { badmintonInterest: 1, curiosity: 2 } },
            test: { label: "🏸 Essayer plusieurs modèles", description: "Comparer par toi-même.", result: "Tu testes plusieurs raquettes et remarques que leur équilibre change vraiment la sensation du geste.", consequences: { badmintonInterest: 2, curiosity: 2 } },
            simple: { label: "🙂 Prendre celle qu'on te tend", description: "Commencer sans te compliquer la tâche.", result: "Tu prends la raquette proposée et peux te concentrer sur le jeu plutôt que sur le matériel.", consequences: { badmintonInterest: 1, motivation: 1 } }
        }
    },
    club_name: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU CLUB", title: "Tu ne connais pas encore tous les prénoms",
        text: "Tu retrouves plusieurs enfants du groupe. Tu reconnais quelques visages, mais tu hésites encore sur les prénoms.",
        choices: {
            introduce: { label: "👋 Te présenter à quelqu'un", description: "Transformer un visage familier en connaissance.", result: "Vous échangez vos prénoms et vous saluez plus facilement lors de la séance suivante.", consequences: { initiative: 2, badmintonInterest: 1 } },
            ask_name: { label: "🗣️ Demander les prénoms", description: "Prendre le temps de mettre des noms sur les visages.", result: "Tu apprends plusieurs prénoms d'un coup, quitte à en oublier un avant la fin de la séance.", consequences: { curiosity: 2, initiative: 1 } },
            play: { label: "🏸 Te concentrer sur l'exercice", description: "Laisser les rencontres se faire en jouant.", result: "L'exercice te rapproche naturellement des autres. Vous commencez à vous encourager.", consequences: { badmintonInterest: 2, motivation: 1 } },
            wait: { label: "🙂 Attendre une occasion naturelle", description: "Ne pas te forcer à parler tout de suite.", result: "Tu restes un peu discret, mais tu reconnais déjà mieux les habitudes du groupe.", consequences: { curiosity: 1, motivation: 1 } }
        }
    },
    mini_tournament: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU CLUB", title: "Un petit tournoi improvisé",
        text: "L'entraîneur propose un mini-défi amical. Les équipes changent à chaque tour et le score n'est pas vraiment important, du moins en théorie.",
        choices: {
            compete: { label: "🏆 Jouer pour gagner", description: "Prendre le défi au sérieux.", result: "Tu t'appliques pour chaque point. Le résultat compte un peu, mais tu découvres surtout le plaisir du défi.", consequences: { badmintonInterest: 2, initiative: 1 } },
            learn: { label: "🧠 Essayer un nouveau coup", description: "Profiter du jeu pour apprendre.", result: "Ton essai ne marche pas à tous les coups, mais tu découvres une nouvelle façon de jouer.", consequences: { badmintonInterest: 2, curiosity: 2 } },
            encourage: { label: "👏 Encourager les autres", description: "Aider à garder une bonne ambiance.", result: "Tu encourages tes partenaires et adversaires. Le mini-tournoi devient plus amusant pour tout le monde.", consequences: { motivation: 2, initiative: 1 } },
            adapt: { label: "🔄 Changer de stratégie", description: "Observer ce qui fonctionne et t'adapter.", result: "Tu remarques qu'un petit changement de placement peut modifier un échange entier.", consequences: { curiosity: 2, badmintonInterest: 1 } }
        }
    },
    family_weekend: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "EN FAMILLE", title: "Le week-end se remplit vite",
        text: "Ta famille a prévu plusieurs choses pour le week-end. De ton côté, tu avais imaginé un programme différent.",
        choices: {
            suggest: { label: "💬 Proposer ton idée", description: "Essayer de trouver une place pour ce qui te plaît.", result: "Vous en discutez et trouvez un compromis qui laisse un peu de place à ton envie.", consequences: { initiative: 2, motivation: 1 } },
            join: { label: "🤝 Participer au programme familial", description: "Profiter de ce qui est déjà organisé.", result: "Tu suis le programme et découvres un moment plus agréable que prévu.", consequences: { motivation: 2 } },
            combine: { label: "🗓️ Chercher un compromis", description: "Combiner les envies plutôt que choisir un camp.", result: "Une partie du programme change et chacun conserve quelque chose qu'il attendait.", consequences: { curiosity: 1, initiative: 1 } },
            postpone: { label: "⏳ Garder ton idée pour une autre fois", description: "Accepter que tout ne rentre pas dans le même week-end.", result: "Tu gardes ton idée en tête et la famille prévoit de revoir ça une prochaine fois.", consequences: { motivation: 1 } }
        }
    },
    class_mistake: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "À L'ÉCOLE", title: "Une erreur devant toute la classe",
        text: "Tu donnes une réponse en classe et tu te rends compte presque aussitôt qu'elle est fausse. Quelques élèves se retournent vers toi.",
        choices: {
            correct: { label: "🙋 Corriger ta réponse", description: "Reprendre la parole malgré le petit moment gênant.", result: "Tu rectifies ta réponse. Le moment est vite passé et tu comprends mieux ce qui t'avait induit en erreur.", consequences: { initiative: 2, curiosity: 1 } },
            laugh: { label: "😅 En rire", description: "Désamorcer le moment avec humour.", result: "Tu souris de ton erreur et la classe passe rapidement à la suite.", consequences: { motivation: 2 } },
            listen: { label: "👂 Écouter l'explication", description: "Profiter de la correction pour comprendre.", result: "L'explication clarifie le point qui t'avait échappé.", consequences: { curiosity: 2 } },
            withdraw: { label: "🤐 Ne rien ajouter pour l'instant", description: "Laisser le cours continuer.", result: "Tu laisses passer le moment et gardes la correction en tête.", consequences: { motivation: 1 } }
        }
    },
    first_sleepover: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "CHEZ UN CAMARADE", title: "Une nuit loin de chez toi",
        text: "On t'invite à dormir chez un camarade. L'idée te tente, mais tu n'as encore jamais passé la nuit ailleurs que chez toi.",
        choices: {
            accept: { label: "🎒 Accepter l'invitation", description: "Tenter cette nouvelle expérience.", result: "La soirée est pleine de jeux et de discussions. Au moment de dormir, tout paraît un peu différent, mais tu es content d'avoir essayé.", consequences: { initiative: 2, motivation: 2 } },
            questions: { label: "❓ Demander comment ça va se passer", description: "Te rassurer en connaissant le programme.", result: "Tu obtiens les détails de la soirée et te sens mieux préparé à l'idée d'y aller.", consequences: { curiosity: 2, motivation: 1 } },
            day_visit: { label: "🏠 Proposer de rester seulement l'après-midi", description: "Découvrir l'endroit sans passer la nuit.", result: "Tu passes un bon après-midi chez ton camarade et gardes l'idée d'une nuit pour une autre fois.", consequences: { initiative: 1, motivation: 1 } },
            decline: { label: "🙂 Décliner pour cette fois", description: "Respecter ton envie du moment.", result: "Tu déclines l'invitation sans fermer la porte à une prochaine occasion.", consequences: { motivation: 1 } }
        }
    },
    school_trip: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "SORTIE SCOLAIRE", title: "Le binôme de la sortie",
        text: "Pour une sortie scolaire, chacun doit se mettre par deux. Ton ami habituel est déjà avec quelqu'un d'autre et plusieurs binômes se forment.",
        choices: {
            ask: { label: "🗣️ Demander à quelqu'un de se mettre avec toi", description: "Trouver un binôme en faisant le premier pas.", result: "Un camarade accepte et vous commencez à parler de ce que vous avez envie de voir pendant la sortie.", consequences: { initiative: 2, curiosity: 1 } },
            join: { label: "👥 Rejoindre un groupe qui se forme", description: "Trouver une place parmi plusieurs élèves.", result: "Tu rejoins un petit groupe et la sortie commence dans une ambiance animée.", consequences: { initiative: 1, motivation: 1 } },
            wait: { label: "👀 Attendre de voir qui reste", description: "Laisser les derniers binômes se former.", result: "Tu te retrouves avec un autre élève disponible et vous apprenez à vous connaître pendant la sortie.", consequences: { curiosity: 1, motivation: 1 } },
            friend: { label: "🤝 Proposer à ton ami de changer", description: "Expliquer que tu aurais aimé être avec lui.", result: "Vous en parlez. Il reste avec son binôme cette fois, mais vous prévoyez de faire équipe à la prochaine occasion.", consequences: { initiative: 1, motivation: 1 } }
        }
    },
    club_encouragement: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU CLUB", title: "Un encouragement inattendu",
        text: "Pendant un exercice, tu réussis un échange que tu ratais souvent. Un autre joueur le remarque et t'encourage.",
        choices: {
            continue: { label: "🏸 Enchaîner avec un nouvel essai", description: "Profiter de cette réussite pour continuer.", result: "Tu repars sur un nouvel échange. Il est moins réussi, mais tu sais maintenant que le geste peut fonctionner.", consequences: { badmintonInterest: 2, motivation: 2 } },
            thank: { label: "🙂 Le remercier", description: "Accueillir simplement l'encouragement.", result: "Vous échangez quelques mots et l'encouragement devient un petit moment de complicité.", consequences: { badmintonInterest: 1, initiative: 1 } },
            ask: { label: "🗣️ Demander ce qui était mieux", description: "Comprendre ce qui a permis de réussir.", result: "Le joueur t'explique le détail qu'il a remarqué. Tu as un repère concret pour la prochaine fois.", consequences: { badmintonInterest: 1, curiosity: 2 } },
            shrug: { label: "😅 Faire comme si de rien n'était", description: "Ne pas trop attirer l'attention sur cette réussite.", result: "Tu reprends l'exercice sans commentaire, mais l'encouragement te reste en tête.", consequences: { motivation: 1 } }
        }
    },
    club_late: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AVANT L'ENTRAÎNEMENT", title: "Tu arrives en avance",
        text: "Tu arrives au gymnase avant le début de la séance. Quelques minutes de calme s'offrent à toi pendant que les autres arrivent peu à peu.",
        choices: {
            watch: { label: "👀 Observer l'installation", description: "Comprendre comment la séance se prépare.", result: "Tu observes les filets, les volants et les habitudes du club avant que le gymnase se remplisse.", consequences: { curiosity: 2, badmintonInterest: 1 } },
            help: { label: "🤝 Donner un coup de main", description: "Aider à préparer le terrain.", result: "Tu aides à installer le matériel et te sens un peu plus impliqué dans la vie du groupe.", consequences: { initiative: 2, badmintonInterest: 1 } },
            chat: { label: "🗣️ Discuter avec quelqu'un", description: "Profiter du calme pour faire connaissance.", result: "Une conversation tranquille te permet d'en apprendre davantage sur un autre joueur.", consequences: { initiative: 1, curiosity: 1 } },
            warmup: { label: "🏃 Commencer à t'échauffer", description: "Te préparer à la séance à ton rythme.", result: "Tu commences à bouger doucement et te sens prêt lorsque la séance démarre.", consequences: { badmintonInterest: 1, motivation: 2 } }
        }
    },
    club_first_loss: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "AU CLUB", title: "Le score ne va pas dans ton sens",
        text: "Lors d'un petit match, ton adversaire marque plusieurs points d'affilée. Tu as encore le temps de réagir, mais la frustration commence à monter.",
        choices: {
            adapt: { label: "🧠 Changer quelque chose dans ton jeu", description: "Chercher une solution plutôt que répéter les mêmes coups.", result: "Tu modifies ton placement et remportes quelques échanges. Le score ne raconte pas toute l'histoire.", consequences: { badmintonInterest: 2, curiosity: 2 } },
            persist: { label: "💪 Continuer à te battre sur chaque point", description: "Rester engagé jusqu'au bout.", result: "Tu continues à jouer sérieusement. Même si le résultat ne change pas beaucoup, tu ne lâches pas les derniers points.", consequences: { badmintonInterest: 1, motivation: 2 } },
            ask: { label: "🗣️ Demander un conseil après le match", description: "Transformer le résultat en occasion d'apprendre.", result: "Un conseil t'aide à comprendre ce qui t'a posé problème et te donne une piste pour la prochaine séance.", consequences: { curiosity: 2, badmintonInterest: 1 } },
            enjoy: { label: "🙂 Te concentrer sur le plaisir de jouer", description: "Ne pas réduire la séance au score.", result: "Tu termines le match plus détendu et retiens surtout les échanges qui t'ont amusé.", consequences: { motivation: 2, badmintonInterest: 1 } }
        }
    },
    birthday_plan: {
        minAge: 8, maxAge: 10, weight: 1,
        label: "ANNIVERSAIRE", title: "Comment fêter ton anniversaire ?",
        text: "Ton anniversaire approche et on te demande ce qui te ferait plaisir. Tu peux inviter quelques amis, organiser une activité ou préférer quelque chose de plus calme.",
        choices: {
            friends: { label: "🎉 Inviter plusieurs camarades", description: "Partager la journée avec un groupe.", result: "Tu imagines déjà les jeux et les discussions. Il faudra peut-être un peu d'organisation, mais l'idée te plaît.", consequences: { initiative: 2, motivation: 2 } },
            activity: { label: "🏸 Prévoir une activité", description: "Faire quelque chose plutôt que simplement se retrouver.", result: "Tu choisis une activité à partager. Le programme donne un fil conducteur à la fête.", consequences: { curiosity: 1, initiative: 2 } },
            family: { label: "🍰 Fêter ça en famille", description: "Privilégier un moment plus intime.", result: "Tu imagines un moment tranquille avec ta famille, un gâteau et du temps pour profiter ensemble.", consequences: { motivation: 2 } },
            choose_later: { label: "🤔 Garder plusieurs idées", description: "Ne pas décider tout de suite.", result: "Tu gardes plusieurs possibilités en tête et prends un peu de temps avant de choisir.", consequences: { curiosity: 1, motivation: 1 } }
        }
    }
};



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
          "monthly",

        // Le calendrier mensuel est généré une seule fois par mois.
        monthlySchedule: null,
        monthlyNumber: 0,

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
                club,

            trainingSessions: 0,

            skills: {
                coordination: 0,
                racketControl: 0,
                movement: 0,
                consistency: 0,
                tactics: 0,
                power: 0
            }
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

        // Souvenirs conservés au fil de la vie.
        memories: [],
       
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
    if (!memorableEvents.includes(event) && !EVENT_CATALOG[event]) return;

    player.memories.push({
        event: event,
        choice: choice,
        date: player.currentDate,
        text: text
    });
}


function getTrainingChoices(age) {
    const sessions = player.badminton.trainingSessions || 0;
    const beginner = age <= 10 || sessions < 8;

    if (beginner) {
        return {
            control: {
                label: "🎯 Contrôler le volant",
                description: "Apprendre à viser et à doser ses frappes.",
                result: "Tu répètes des frappes simples. Le volant ne va pas toujours où tu veux, mais tu commences à mieux le sentir.",
                skill: "racketControl"
            },
            movement: {
                label: "👣 Bouger vers le volant",
                description: "Travailler l'équilibre et les déplacements de base.",
                result: "Tu enchaînes de petits déplacements et apprends à retrouver ton équilibre avant de frapper.",
                skill: "movement"
            },
            rally: {
                label: "🏸 Faire durer l'échange",
                description: "Chercher la régularité plutôt que la puissance.",
                result: "Tu essaies de renvoyer le volant plusieurs fois de suite. Chaque échange un peu plus long devient une petite victoire.",
                skill: "consistency"
            },
            game: {
                label: "🎲 Jouer à un défi raquette-volant",
                description: "Apprendre en jouant à un petit défi.",
                result: "Le défi transforme l'exercice en jeu. Tu recommences plusieurs fois et tu prends confiance avec la raquette.",
                skill: "coordination"
            }
        };
    }

    if (age <= 13 || sessions < 25) {
        return {
            clear: {
                label: "🎯 Travailler les frappes de fond de court",
                description: "Apprendre à envoyer le volant avec longueur.",
                result: "Tu travailles la longueur de tes frappes et commences à mieux comprendre comment te placer sous le volant.",
                skill: "racketControl"
            },
            footwork: {
                label: "👣 Enchaîner déplacement et frappe",
                description: "Rejoindre le volant puis se replacer.",
                result: "Tu enchaînes les déplacements et les frappes. Le replacement demande encore de l'attention, mais devient plus naturel.",
                skill: "movement"
            },
            net: {
                label: "🪶 Découvrir le jeu au filet",
                description: "Travailler le toucher et la précision.",
                result: "Tu apprends à doser tes gestes près du filet. Quelques volants restent trop hauts, mais tu affines ton toucher.",
                skill: "coordination"
            },
            match: {
                label: "🏆 Faire un match d'entraînement",
                description: "Mettre en pratique les coups appris.",
                result: "Le match te montre ce qui fonctionne en situation réelle et ce que tu dois encore travailler.",
                skill: "tactics"
            }
        };
    }

    return {
        technique: {
            label: "🎯 Perfectionner un coup",
            description: "Répéter un geste technique avec précision.",
            result: "Tu répètes le geste en cherchant davantage de précision et de régularité.",
            skill: "racketControl"
        },
        movement: {
            label: "⚡ Travailler les déplacements",
            description: "Gagner en vitesse et en replacement.",
            result: "Tu enchaînes les déplacements à intensité progressive et travailles ton replacement après chaque frappe.",
            skill: "movement"
        },
        tactics: {
            label: "🧠 Travailler la construction du point",
            description: "Déplacer l'adversaire et préparer la frappe suivante.",
            result: "Tu apprends à construire l'échange plutôt qu'à renvoyer le volant sans intention.",
            skill: "tactics"
        },
        match: {
            label: "🏆 Jouer un match d'entraînement",
            description: "Tester tes acquis face à un adversaire.",
            result: "Le match met tes acquis à l'épreuve. Tu repères une force à exploiter et un axe de travail pour la prochaine séance.",
            skill: "consistency"
        }
    };
}


function getCurrentEventContent(age) {

    if (player.currentEvent === "training") {
        const choices = getTrainingChoices(age);
        const choicesHtml = Object.entries(choices).map(([choiceId, choice], index) => {
            const colors = ["blue", "green", "orange", "blue"];
            return `
                <button class="choice ${colors[index % colors.length]}" onclick="chooseSecondEvent('${choiceId}')">
                    <strong>${choice.label}</strong>
                    <span>${choice.description}</span>
                </button>
            `;
        }).join("");

        return `
            <span class="event-label">SÉANCE DE BADMINTON</span>
            <h1 class="event-title">🏸 À l'entraînement</h1>
            <p class="event-text">La séance commence. Tu as ${age} ans et tu as participé à ${player.badminton.trainingSessions || 0} séance(s). Que veux-tu travailler aujourd'hui ?</p>
            <div class="choices">${choicesHtml}</div>
        `;
    }

    const catalogEvent = EVENT_CATALOG[player.currentEvent];
    if (catalogEvent) {
        const choicesHtml = Object.entries(catalogEvent.choices).map(([choiceId, choice], index) => {
            const colors = ["blue", "green", "orange", "blue"];
            return `
                <button class="choice ${colors[index % colors.length]}" onclick="chooseSecondEvent('${choiceId}')">
                    <strong>${choice.label}</strong>
                    <span>${choice.description}</span>
                </button>
            `;
        }).join("");

        return `
            <span class="event-label">${catalogEvent.label}</span>
            <h1 class="event-title">${catalogEvent.title}</h1>
            <p class="event-text">${catalogEvent.text}</p>
            <div class="choices">${choicesHtml}</div>
        `;
    }

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

    const firstMemory = player.memories?.find(memory => memory.event === "first");

    if (firstMemory?.choice === "activite") {
        activityText =
            `Depuis la rentrée, tu regardes ce qui existe autour de toi pour occuper tes après-midis. ` +
            `Aujourd'hui, une activité sportive attire ton attention. ` +
            `À travers la porte du gymnase, tu entends des échanges de volant. ` +
            `C'est exactement le genre de découverte que tu cherchais.`;
    } else if (firstMemory?.choice === "agir") {
        activityText =
            `Depuis la rentrée, tu commences à prendre tes marques et à aller vers les autres. ` +
            `Après l'école, tu remarques un groupe qui se retrouve dans un gymnase. ` +
            `Les échanges de volant attirent ton attention, et tu te demandes si tu pourrais te joindre à eux.`;
    } else if (firstMemory?.choice === "explorer") {
        activityText =
            `Depuis la rentrée, tu prends le temps d'observer ton nouvel environnement. ` +
            `Sur le chemin du retour, tu remarques un gymnase que tu n'avais pas vraiment regardé jusque-là. ` +
            `À travers la porte, des échanges de volant piquent ta curiosité.`;
    } else if (firstMemory?.choice === "calme") {
        activityText =
            `Depuis la rentrée, tu prends tes marques à ton rythme. ` +
            `Aujourd'hui, en passant devant un gymnase, tu entends des échanges de volant. ` +
            `Tu n'étais pas spécialement à la recherche d'une activité, mais tu peux toujours regarder.`;
    } else if (player.traits.badmintonInterest >= 12) {
        activityText =
            `Depuis quelques jours, le badminton revient régulièrement dans tes pensées. ` +
            `Après l'école, tu remarques une activité sportive près de chez toi. ` +
            `À travers la porte du gymnase, tu entends des échanges de volant. ` +
            `Cette fois, tu as vraiment envie de savoir ce qui s'y passe.`;
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
        const activityMemory = player.memories?.find(memory => memory.event === "activity");
        let badmintonText = `Quelque chose dans ce sport commence à attirer ton regard. Tu ne sais pas encore pourquoi, mais tu as envie d'en voir davantage.`;

        if (activityMemory?.choice === "try") {
            badmintonText = `Tu repenses à la raquette qu'on t'a tendue et à ce premier volant qui n'est pas allé tout à fait où tu voulais. L'expérience était courte, mais l'envie de recommencer est restée.`;
        } else if (activityMemory?.choice === "approach") {
            badmintonText = `Tu as déjà osé pousser la porte du gymnase. L'ambiance du club t'est un peu moins étrangère, et tu te surprends à repenser aux joueurs et à leurs échanges.`;
        } else if (activityMemory?.choice === "ask") {
            badmintonText = `Tu sais maintenant que cette activité s'appelle le badminton. Les quelques réponses obtenues n'ont fait qu'ajouter de nouvelles questions, et le sport t'intrigue encore.`;
        } else if (activityMemory?.choice === "watch") {
            badmintonText = `Tu as déjà observé les joueurs depuis la porte. Certains gestes t'ont marqué, et tu aimerais comprendre ce qui se joue derrière ces échanges rapides.`;
        }

        return `
            <span class="event-label">UNE NOUVELLE CURIOSITÉ</span>
            <h1 class="event-title">🏸 Le badminton attire ton attention</h1>
            <p class="event-text">
                ${badmintonText}
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

function getMonthLabel(dateString) {
    const date = new Date(dateString + "T12:00:00");
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

function generateMonthlySchedule() {
    const current = new Date(player.currentDate + "T12:00:00");
    const year = current.getFullYear();
    const month = current.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDay = current.getDate();
    const availableDays = [];

    for (let day = firstDay; day <= lastDay; day++) availableDays.push(day);
    // Mélange les dates pour répartir les activités dans le mois.
    for (let i = availableDays.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableDays[i], availableDays[j]] = [availableDays[j], availableDays[i]];
    }

    const age = calculateAge(player.birthDate, player.currentDate);
    const trainingNames = age <= 10
        ? [
            ["Contrôle du volant", "Apprendre à viser et à doser ses frappes.", "racketControl"],
            ["Déplacements de base", "Bouger, retrouver son équilibre et se replacer.", "movement"],
            ["Faire durer l'échange", "Chercher la régularité plutôt que la puissance.", "consistency"],
            ["Défi raquette-volant", "Apprendre en jouant à un petit défi.", "coordination"]
          ]
        : age <= 13
        ? [
            ["Précision des frappes", "Trouver des trajectoires plus régulières.", "racketControl"],
            ["Déplacements et replacement", "Se déplacer efficacement entre deux frappes.", "movement"],
            ["Jouer près du filet", "Travailler la précision et le toucher.", "consistency"],
            ["Petit match d'entraînement", "Observer le jeu et prendre quelques décisions.", "tactics"]
          ]
        : [
            ["Technique individuelle", "Consolider un coup de son choix.", "racketControl"],
            ["Vitesse et replacement", "Enchaîner les déplacements avec précision.", "movement"],
            ["Construction du point", "Préparer le coup suivant et varier le jeu.", "tactics"],
            ["Séance de régularité", "Garder de la qualité dans les échanges.", "consistency"]
          ];

    const activities = [];
    let dayIndex = 0;
    const pickDate = () => {
        const day = availableDays.length ? availableDays[dayIndex++ % availableDays.length] : firstDay;
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    trainingNames.forEach((training, index) => {
        activities.push({
            id: `training-${player.monthlyNumber}-${index}`,
            category: "badminton",
            icon: "🏸",
            date: pickDate(),
            title: `Entraînement au club : ${training[0]}`,
            description: training[1],
            skill: training[2],
            done: false,
            outcome: ""
        });
    });

    const schoolActivities = [
        { title: "Un devoir à préparer", description: "Prendre un peu de temps pour avancer dans le travail scolaire.", actionLabel: "Je m'y mets", effect: "study" },
        { title: "Un moment en classe", description: "Une occasion de participer, de poser une question ou d'observer.", actionLabel: "Je participe", effect: "class" }
    ];
    schoolActivities.forEach((item, index) => activities.push({
        id: `school-${player.monthlyNumber}-${index}`, category: "school", icon: "🎒", date: pickDate(),
        title: item.title, description: item.description, actionLabel: item.actionLabel, effect: item.effect, done: false, outcome: ""
    }));

    const personalActivities = [
        { title: "Une sortie en famille", description: "La famille propose de partager un moment ensemble.", actionLabel: "J'y participe", effect: "family" },
        { title: "Un ami propose de se retrouver", description: "Un moment pour discuter, jouer ou simplement passer du temps ensemble.", actionLabel: "J'accepte", effect: "friend" }
    ];
    personalActivities.forEach((item, index) => activities.push({
        id: `personal-${player.monthlyNumber}-${index}`, category: "personal", icon: "❤️", date: pickDate(),
        title: item.title, description: item.description, actionLabel: item.actionLabel, effect: item.effect, done: false, outcome: ""
    }));

    activities.sort((a, b) => a.date.localeCompare(b.date));
    player.monthlySchedule = { year, month, activities, createdFor: `${year}-${String(month + 1).padStart(2, "0")}` };
}

function getMonthlyActivityStory(activity) {
    if (activity.category === "badminton") {
        const stories = {
            racketControl: "Le coach installe plusieurs cibles au sol. Le volant ne va pas toujours là où tu veux, et un autre joueur réussit un joli coup juste à côté. Le coach te propose de choisir comment aborder l'exercice.",
            movement: "Aujourd'hui, le coach a préparé un petit parcours. Il faut bouger, retrouver son équilibre et revenir au centre du terrain. Tu peux essayer sérieusement, demander un conseil ou transformer ça en défi.",
            consistency: "Le coach veut voir combien de frappes vous pouvez enchaîner sans faire tomber le volant. Certains échanges s'arrêtent très vite, d'autres deviennent de vrais petits rallyes.",
            coordination: "Une boîte de volants est posée au bord du terrain. Le défi paraît facile jusqu'à ce qu'il faille lancer le volant, le rattraper avec la raquette ou viser une zone précise. Plusieurs joueurs veulent essayer.",
            tactics: "Pendant un petit match, tu remarques que ton adversaire revient toujours au même endroit. Le coach te demande de réfléchir à ce que tu pourrais essayer au prochain échange."
        };
        return stories[activity.skill] || "Le coach a préparé un exercice adapté au groupe. À toi de choisir comment tu veux l'aborder.";
    }
    if (activity.effect === "study") return "Le devoir est posé sur la table. Tu sais que tu pourrais t'y mettre maintenant, mais certaines questions te semblent compliquées. Tu peux essayer seul, demander un coup de main ou remettre ça à plus tard.";
    if (activity.effect === "class") return "En classe, le professeur pose une question et laisse quelques secondes de silence. Tu as peut-être une idée, mais tu n'es pas certain de la réponse. C'est l'occasion de décider comment participer.";
    if (activity.effect === "family") return "La famille a prévu un moment ensemble. Tu avais aussi d'autres idées pour cette journée. Tu peux profiter de la sortie, proposer un compromis ou expliquer que tu préfères faire autre chose.";
    if (activity.effect === "friend") return "Un ami te propose de vous retrouver. Vous pourriez jouer, discuter ou inventer une activité. Tu peux accepter, proposer une autre idée ou décliner pour cette fois.";
    return activity.description;
}

function getMonthlyActivityChoices(activity) {
    if (activity.category === "badminton") return [
        { id: "follow_coach", label: "🎯 Suivre l'exercice du coach", detail: "Tu te concentres sur le geste prévu.", outcome: "Tu suis les conseils du coach et travailles le geste du jour.", skill: activity.skill, motivation: 1 },
        { id: "ask_coach", label: "🗣️ Demander un conseil", detail: "Tu veux comprendre comment mieux réussir.", outcome: "Le coach te donne un conseil que tu peux réutiliser lors des prochaines séances.", skill: activity.skill, curiosity: 1 },
        { id: "make_game", label: "🎮 En faire un petit défi", detail: "Tu transformes l'exercice en jeu et tu essaies plusieurs fois.", outcome: "Le défi te donne envie de recommencer. Tu progresses en t'amusant.", skill: "coordination", motivation: 2 },
        { id: "skip", label: "🌿 Ne pas participer aujourd'hui", detail: "Tu prends un peu de recul, même si tu rates la séance.", outcome: "Tu ne participes pas à l'entraînement. Une séance de moins pour progresser, mais tu disposes de temps pour autre chose.", skip: true }
    ];
    if (activity.effect === "study") return [
        { id: "study_alone", label: "✏️ Essayer seul", detail: "Tu commences par les questions que tu comprends.", outcome: "Tu avances à ton rythme et tu comprends un peu mieux ce qui te résistait.", curiosity: 1 },
        { id: "ask_help", label: "🙋 Demander de l'aide", detail: "Tu demandes à quelqu'un de t'expliquer ce qui bloque.", outcome: "Avec une explication, le devoir devient plus abordable. Tu apprends aussi à demander de l'aide.", curiosity: 1, initiative: 1 },
        { id: "study_later", label: "🕒 Remettre à plus tard", detail: "Tu préfères faire autre chose pour le moment.", outcome: "Tu repousses le devoir. Il faudra trouver un autre moment pour t'y remettre.", skip: true }
    ];
    if (activity.effect === "class") return [
        { id: "answer", label: "✋ Proposer ta réponse", detail: "Tu acceptes de te lancer, même sans être totalement sûr.", outcome: "Tu prends part à la discussion. Même quand tout n'est pas exact, tu apprends en essayant.", initiative: 2 },
        { id: "ask_question", label: "❓ Poser une question", detail: "Tu demandes une précision avant de répondre.", outcome: "Ta question aide à éclaircir le sujet et montre que tu cherches à comprendre.", curiosity: 2 },
        { id: "listen", label: "👀 Écouter les autres", detail: "Tu attends d'entendre les réponses de tes camarades.", outcome: "Tu écoutes les idées des autres et compares leurs réponses à la tienne.", curiosity: 1 },
        { id: "quiet", label: "🤐 Rester en retrait", detail: "Tu préfères ne pas intervenir cette fois.", outcome: "Tu ne prends pas la parole aujourd'hui. Tu pourras participer une prochaine fois.", skip: true }
    ];
    if (activity.effect === "family") return [
        { id: "family_go", label: "❤️ Profiter de la sortie", detail: "Tu joues le jeu et passes du temps avec ta famille.", outcome: "Vous partagez un bon moment et repartez avec un souvenir commun.", motivation: 2 },
        { id: "family_compromise", label: "🤝 Proposer un compromis", detail: "Tu suggères une activité qui ferait plaisir à tout le monde.", outcome: "Vous trouvez une idée qui convient à davantage de monde. Tu as participé à organiser la journée.", initiative: 1, motivation: 1 },
        { id: "family_skip", label: "🏠 Décliner cette fois", detail: "Tu expliques que tu préfères garder du temps pour toi.", outcome: "Tu déclines la sortie. La famille fait son activité et tu gardes du temps libre.", skip: true }
    ];
    if (activity.effect === "friend") return [
        { id: "friend_accept", label: "🧑‍🤝‍🧑 Accepter l'invitation", detail: "Vous décidez de vous retrouver.", outcome: "Vous passez du temps ensemble et renforcez votre complicité.", initiative: 1, motivation: 1 },
        { id: "friend_idea", label: "💡 Proposer une autre activité", detail: "Tu as une idée que vous pourriez essayer ensemble.", outcome: "Ton idée donne une direction à votre rencontre et vous découvrez une nouvelle façon de vous amuser.", initiative: 2, curiosity: 1 },
        { id: "friend_skip", label: "💬 Décliner gentiment", detail: "Tu expliques que tu n'es pas disponible cette fois.", outcome: "Tu déclines l'invitation. Une autre occasion de vous retrouver se présentera peut-être.", skip: true }
    ];
    return [{ id: "accept", label: "Continuer", detail: "Tu fais ton choix.", outcome: "Tu poursuis ta journée." }];
}

function handleMonthlyActivity(activityId, action) {
    if (!player || !player.monthlySchedule) return;
    const activity = player.monthlySchedule.activities.find(item => item.id === activityId);
    if (!activity || activity.done) return;
    if (action === "open") {
        player.monthlySchedule.activeActivityId = player.monthlySchedule.activeActivityId === activityId ? null : activityId;
        showGame();
        return;
    }
    const choice = getMonthlyActivityChoices(activity).find(item => item.id === action);
    if (!choice) return;
    activity.done = true;
    activity.selectedChoice = choice.label;
    const result = choice.outcome;
    if (activity.category === "badminton" && !choice.skip) {
        const skill = choice.skill || activity.skill;
        player.badminton.skills[skill] = (player.badminton.skills[skill] || 0) + 1;
        player.badminton.trainingSessions = (player.badminton.trainingSessions || 0) + 1;
        player.badminton.experience = player.badminton.trainingSessions === 1 ? "Première séance" : `${player.badminton.trainingSessions} séances`;
    }
    if (choice.curiosity) player.traits.curiosity = (player.traits.curiosity || 0) + choice.curiosity;
    if (choice.initiative) player.traits.initiative = (player.traits.initiative || 0) + choice.initiative;
    if (choice.motivation) player.hidden.motivation = Math.min(100, (player.hidden.motivation || 0) + choice.motivation);
    activity.outcome = `${choice.label} : ${result}`;
    player.history.push({ date: formatDate(activity.date), text: activity.outcome });
    if (Array.isArray(player.memories) && !choice.skip) player.memories.push({ event: activity.category, choice: action, date: activity.date, text: activity.outcome });
    player.monthlySchedule.activeActivityId = null;
    showGame();
}

function finishMonth() {
    if (!player || !player.monthlySchedule) return;
    const remaining = player.monthlySchedule.activities.filter(activity => !activity.done).length;
    if (remaining > 0) return;

    const previousDate = player.currentDate;
    const current = new Date(player.currentDate + "T12:00:00");
    const nextMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1, 12, 0, 0);
    player.currentDate = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}-01`;
    player.monthlyNumber += 1;
    updateSchoolYear(previousDate, player.currentDate);
    player.history.push({
        date: formatDate(player.currentDate),
        text: `Un nouveau mois commence. Tu fais le point sur ce que tu as vécu et de nouvelles activités t'attendent.`
    });
    player.monthlySchedule = null;
    generateMonthlySchedule();
    showGame();
}

function showMonthlyCalendar() {
    if (!player.monthlySchedule) generateMonthlySchedule();
    const age = calculateAge(player.birthDate, player.currentDate);
    const schedule = player.monthlySchedule;
    const activities = schedule.activities;
    const completed = activities.filter(activity => activity.done).length;
    const remaining = activities.length - completed;
    const groups = [
        { id: "badminton", title: "🏸 Badminton", subtitle: "Les séances et la progression sportive" },
        { id: "school", title: "🎒 École", subtitle: "Le quotidien scolaire" },
        { id: "personal", title: "❤️ Famille et amis", subtitle: "Les moments qui comptent en dehors du terrain" }
    ];

    const activityCards = groups.map(group => {
        const items = activities.filter(activity => activity.category === group.id);
        return `
            <section class="month-group" style="margin-bottom:22px;">
                <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:10px;">
                    <div><h2 style="margin:0 0 4px;font-size:20px;">${group.title}</h2><div style="font-size:13px;color:#64748b;">${group.subtitle}</div></div>
                    <span style="font-size:12px;color:#64748b;white-space:nowrap;">${items.filter(item => item.done).length}/${items.length} traitées</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:10px;">
                    ${items.map(activity => `
                        <article style="border:1px solid ${activity.done ? '#cbd5e1' : '#dbe3ee'};border-radius:14px;padding:14px;background:${activity.done ? '#f8fafc' : '#ffffff'};opacity:${activity.done ? '0.88' : '1'};">
                            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:8px;">
                                <span style="font-size:12px;color:#2563eb;font-weight:600;">${new Date(activity.date + 'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}</span>
                                <span style="font-size:11px;border-radius:20px;padding:4px 8px;background:${activity.done ? '#dcfce7' : '#eff6ff'};color:${activity.done ? '#166534' : '#1d4ed8'};">${activity.done ? 'Traitée' : 'À décider'}</span>
                            </div>
                            <h3 style="font-size:16px;margin:0 0 6px;">${activity.title}</h3>
                            <p style="font-size:13px;line-height:1.45;color:#475569;margin:0 0 12px;">${activity.description}</p>
                            ${activity.done ? `<div style="font-size:13px;line-height:1.5;color:#334155;"><strong>${activity.selectedChoice || 'Ton choix'}</strong><div style="margin-top:5px;">${activity.outcome}</div></div>` : `
                                ${player.monthlySchedule.activeActivityId === activity.id ? `
                                    <div style="background:#f8fafc;border-radius:12px;padding:13px;margin-top:10px;">
                                        <p style="font-size:14px;line-height:1.65;color:#1e293b;margin:0 0 12px;">${getMonthlyActivityStory(activity)}</p>
                                        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:8px;">
                                            ${getMonthlyActivityChoices(activity).map(choice => `
                                                <button class="choice ${choice.skip ? '' : 'blue'}" style="text-align:left;padding:11px;" onclick="handleMonthlyActivity('${activity.id}','${choice.id}')"><strong>${choice.label}</strong><span style="display:block;font-size:12px;font-weight:400;margin-top:5px;line-height:1.45;">${choice.detail}</span></button>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : `<button class="choice blue" style="width:100%;padding:11px;" onclick="handleMonthlyActivity('${activity.id}','open')"><strong>📖 Lire l'événement et faire un choix</strong></button>`}
                            `}
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    }).join('');

    app.innerHTML = `
        <div class="game">
            <div class="game-header">
                <div class="game-logo">The Long Rally</div>
                <div class="game-date"><strong>${formatDate(player.currentDate)}</strong><span>Âge : ${age} ans · ${player.school.level}</span></div>
            </div>
            <div style="max-width:1180px;margin:0 auto;padding:22px 20px 36px;">
                <div style="background:linear-gradient(120deg,#17365d,#24558a);color:white;border-radius:18px;padding:22px;margin-bottom:20px;">
                    <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.8;">Ton programme</div>
                    <h1 style="font-size:clamp(26px,4vw,36px);margin:6px 0 8px;text-transform:capitalize;">${getMonthLabel(player.currentDate)}</h1>
                    <p style="margin:0 0 16px;line-height:1.5;max-width:680px;opacity:.92;">Un mois à vivre, des activités à choisir et parfois des imprévus. Tu décides comment répartir ton temps.</p>
                    <div style="display:flex;flex-wrap:wrap;gap:9px;">
                        <span style="background:#ffffff20;border-radius:20px;padding:7px 11px;font-size:13px;">🏸 ${activities.filter(a => a.category === 'badminton').length} entraînements prévus</span>
                        <span style="background:#ffffff20;border-radius:20px;padding:7px 11px;font-size:13px;">📋 ${completed}/${activities.length} activités traitées</span>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:20px;align-items:start;">
                    <main style="min-width:0;">
                        ${activityCards}
                        <div style="display:flex;justify-content:flex-end;margin-top:22px;">
                            <button class="menu-button primary" onclick="finishMonth()" ${remaining > 0 ? 'disabled style="opacity:.45;cursor:not-allowed;"' : ''}>
                                <span class="menu-icon">📅</span><span class="menu-title">Mois suivant</span><span class="menu-subtitle">${remaining > 0 ? `Traite encore ${remaining} activité${remaining > 1 ? 's' : ''} pour clôturer le mois` : 'Clôturer le mois et continuer'}</span>
                            </button>
                        </div>
                    </main>
                    <aside style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px;">
                        <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;">Ton personnage</div>
                        <h2 style="margin:0 0 12px;font-size:21px;">🧒 ${player.firstName}</h2>
                        <div style="font-size:13px;line-height:1.8;color:#334155;">
                            <div>📍 ${player.city}</div><div>🏫 ${player.school.name}</div><div>📚 ${player.school.level}</div><div>🏸 ${player.badminton.club.name}</div>
                            <div>🎯 Séances réalisées : ${player.badminton.trainingSessions || 0}</div>
                        </div>
                        <hr style="border:0;border-top:1px solid #e2e8f0;margin:16px 0;"/>
                        <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">Derniers souvenirs</div>
                        ${player.history.slice(-4).reverse().map(item => `<div style="font-size:12px;line-height:1.45;margin-bottom:10px;"><div style="color:#2563eb;margin-bottom:2px;">${item.date}</div>${item.text}</div>`).join('')}
                    </aside>
                </div>
            </div>
        </div>
    `;
}

function showGame() {
    showMonthlyCalendar();
}


/* =========================================================
   PREMIER ÉVÉNEMENT
========================================================= */


/* =========================================================
   ANNÉE SCOLAIRE
   La rentrée est déclenchée par le calendrier, jamais par l'âge seul.
========================================================= */
function updateSchoolYear(previousDateString, newDateString) {
    if (!player || !player.school || !previousDateString || !newDateString) return;

    const previousDate = new Date(previousDateString + "T12:00:00");
    const newDate = new Date(newDateString + "T12:00:00");
    if (newDate <= previousDate) return;

    const schoolLevels = ["CP", "CE1", "CE2", "CM1", "CM2", "6e", "5e", "4e", "3e", "Seconde", "Première", "Terminale"];
    let currentLevelIndex = schoolLevels.indexOf(player.school.level);

    // Parcourt chaque 1er septembre traversé par le saut de calendrier.
    for (let year = previousDate.getFullYear(); year <= newDate.getFullYear(); year++) {
        const rentrée = new Date(year, 8, 1, 12, 0, 0);
        if (rentrée > previousDate && rentrée <= newDate) {
            if (currentLevelIndex >= 0 && currentLevelIndex < schoolLevels.length - 1) {
                currentLevelIndex++;
                player.school.level = schoolLevels[currentLevelIndex];
            }

            const levelText = player.school.level;
            player.history.push({
                date: formatDate(rentrée.toISOString().split("T")[0]),
                text: `C'est la rentrée ! Tu entres en ${levelText}. Une nouvelle année scolaire commence, avec de nouveaux repères et de nouvelles rencontres possibles.`
            });

            if (Array.isArray(player.memories)) {
                player.memories.push({
                    event: "school_year",
                    choice: "rentrée",
                    date: rentrée.toISOString().split("T")[0],
                    text: `Rentrée scolaire en ${levelText}.`
                });
            }
        }
    }
}


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


    const previousDate = player.currentDate;
    const date =
        new Date(
            player.currentDate + "T12:00:00"
        );


    date.setDate(
        date.getDate() + 3
    );


    player.currentDate =
        date.toISOString().split("T")[0];

    updateSchoolYear(previousDate, player.currentDate);
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
    if (player.traits.badmintonInterest >= 5 && previousEvent !== "training") events.push("training");
    if (previousEvent !== "curiosity" && player.traits.curiosity >= 55) events.push("curiosity");
    if (previousEvent !== "initiative" && player.traits.initiative >= 55) events.push("initiative");
    if (player.hidden.motivation >= 65 && previousEvent !== "initiative") events.push("initiative");

    Object.entries(EVENT_CATALOG).forEach(([eventId, eventData]) => {
        if (age >= eventData.minAge && age <= eventData.maxAge) {
            events.push(eventId);
        }
    });

    const repeatableEventIds = ["training", "badminton", "childhood"];
    const filteredEvents = events.filter(
        event => event !== player.currentEvent &&
        (repeatableEventIds.includes(event) ||
         !player.eventHistory.some(history => history.event === event))
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

        // Les nouveaux événements de vie doivent vraiment apparaître,
        // sans être écrasés par le poids élevé des anciens événements génériques.
        if (EVENT_CATALOG[event]) {
            weight += (EVENT_CATALOG[event].weight || 1) * 8;
        }
        if (event === "training") {
            weight += 18 + Math.min(player.badminton.trainingSessions || 0, 12);
        }

        for (let i = 0; i < weight; i++) weightedEvents.push(event);
    });

    return randomItem(weightedEvents);
}

function resolveEventChoice(event, choice) {

    if (event === "training") {
        return { motivation: 1, badmintonInterest: 1 };
    }

    if (EVENT_CATALOG[event]?.choices?.[choice]) {
        return EVENT_CATALOG[event].choices[choice].consequences || {};
    }

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

    if (event === "training") {
        const age = calculateAge(player.birthDate, player.currentDate);
        const selected = getTrainingChoices(age)[choice];
        if (selected) {
            return `${selected.result} Progression en ${({
                coordination: "coordination",
                racketControl: "contrôle de raquette",
                movement: "déplacements",
                consistency: "régularité",
                tactics: "tactique"
            })[selected.skill] || selected.skill} : +1.`;
        }
    }

    if (EVENT_CATALOG[event]?.choices?.[choice]) {
        return EVENT_CATALOG[event].choices[choice].result;
    }

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

function getDaysUntilNextEvent(eventName) {
    // Le temps saute davantage entre les événements ordinaires,
    // tout en gardant un rythme plus serré autour du badminton.
    if (eventName === "first") return 3;

    if (eventName === "training") {
        return Math.floor(Math.random() * 3) + 2; // 2 à 4 jours
    }

    if (["badminton", "activity", "first_club_visit", "shuttle_miss",
         "racket_choice", "club_name", "mini_tournament",
         "club_encouragement", "club_late", "club_first_loss"].includes(eventName)) {
        return Math.floor(Math.random() * 5) + 3; // 3 à 7 jours
    }

    if (["school_friend", "small_argument", "sibling_competition",
         "class_project", "school_responsibility", "school_trip",
         "first_sleepover", "birthday_plan", "family_weekend"].includes(eventName)) {
        return Math.floor(Math.random() * 15) + 7; // 7 à 21 jours
    }

    if (["homework", "playground_game", "forgotten_snack", "new_hobby",
         "rainy_day", "lost_pencil", "new_neighbour", "fair_day",
         "rainy_walk", "class_mistake"].includes(eventName)) {
        return Math.floor(Math.random() * 8) + 4; // 4 à 11 jours
    }

    return Math.floor(Math.random() * 7) + 3; // 3 à 9 jours par défaut
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

    if (eventName === "training") {
        const choices = getTrainingChoices(calculateAge(player.birthDate, player.currentDate));
        const selectedTraining = choices[choice];

        if (selectedTraining) {
            const skill = selectedTraining.skill;
            player.badminton.skills[skill] = (player.badminton.skills[skill] || 0) + 1;
            player.badminton.trainingSessions = (player.badminton.trainingSessions || 0) + 1;
            player.badminton.experience = "Quelques séances";
            player.lastTrainingResult = {
                skill: skill,
                value: player.badminton.skills[skill],
                sessions: player.badminton.trainingSessions
            };
        }
    }

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


    const previousDate = player.currentDate;
    const date =
        new Date(
            player.currentDate + "T12:00:00"
        );

    date.setDate(
        date.getDate() + getDaysUntilNextEvent(eventName)
    );


    player.currentDate =
        date.toISOString().split("T")[0];

    updateSchoolYear(previousDate, player.currentDate);
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
