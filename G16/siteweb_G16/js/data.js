/* ============================================
   LA CHAISE PARFAITE — Données Structurées
   ============================================ */

/* ——— DATE DE SORTIE ——— */
/* Modifier cette date pour ajuster le compte à rebours */
const RELEASE_DATE = new Date('2026-09-11T18:00:00');

/* ——— PERSONNAGES ——— */
const PERSONNAGES = [
  {
    id: 'elu',
    nom: "L'ÉLU",
    sousTitre: 'Le prédestiné déchu',
    acteur: 'Pierre Niney',
    image: 'images/acteurs/pierre_niney.jpg',
    description: "Depuis le début, tout le monde le voyait sur la Chaise. Les professeurs l'appréciaient, ses camarades le respectaient, son parcours semblait irréprochable. Il avait tout pour devenir l'Élu. Mais au moment décisif, il s'est effondré. Désormais, il doit choisir\u00a0: accepter que son destin lui échappe… ou tout faire pour reprendre ce qui, selon lui, lui appartient depuis toujours."
  },
  {
    id: 'loyal',
    nom: 'LE LOYAL',
    sousTitre: "Le soldat de l'Élu",
    acteur: 'Bastien Bouillon',
    image: 'images/acteurs/Bastien-Bouillon.jpg',
    description: "Il croit encore aux anciennes valeurs\u00a0: l'amitié et la loyauté. Il accompagne le prédestiné depuis le début et refuse d'abandonner son camp, même lorsque celui-ci semble condamné. Mais dans une guerre où tout le monde trahit tout le monde, la loyauté est-elle une force… ou sa plus grande faiblesse\u00a0?"
  },
  {
    id: 'stratege',
    nom: 'LE STRATÈGE',
    sousTitre: "Celui qui ne s'assoit jamais par hasard",
    acteur: 'François Civil',
    image: 'images/acteurs/françois_civil.jpg',
    description: "Il ne parle pas beaucoup. Il observe. Pendant que les autres se battent, il calcule. Qui déteste qui\u00a0? Qui peut être acheté\u00a0? Qui va trahir qui\u00a0? Pour lui, la Chaise n'est pas une récompense mais de la stratégie pure."
  },
  {
    id: 'pretendante',
    nom: 'LA PRÉTENDANTE',
    sousTitre: "Celle qui n'aurait jamais dû être là",
    acteur: 'Adèle Exarchopoulos',
    image: 'images/acteurs/adèle_exarchopoulos.webp',
    description: "Personne ne l'avait considérée comme une candidate sérieuse. C'est précisément ce qui la rend dangereuse. Elle connaît les codes, mais refuse de les respecter. Là où les autres cherchent à devenir l'Élu, elle se demande pourquoi quelqu'un devrait avoir le droit de l'être. Elle ne veut pas seulement prendre la chaise. Elle veut détruire la légende qui l'entoure."
  },
  {
    id: 'chaotique',
    nom: 'LE CHAOTIQUE',
    sousTitre: 'Celui qui veut juste voir le monde brûler',
    acteur: 'Raphaël Quenard',
    image: 'images/acteurs/raphael_Queunard.jpg',
    description: "Il n'a aucune stratégie et aucune ambition particulière. Il veut juste s'asseoir sur la Chaise parce qu'on lui a dit qu'il ne pourrait jamais le faire. Dans une guerre, il suffit d'un rigolo pour faire tomber tout un système."
  },
  {
    id: 'chaise',
    nom: 'LA CHAISE',
    sousTitre: 'Le véritable personnage principal',
    acteur: null,
    image: 'assets/images/personnages/chaise.jpg',
    description: "Personne ne sait d'où elle vient, ni ce qui l'a rendue si spéciale. Mais tous la désirent. Elle ne parle pas, elle n'agit pas, elle patiente et jauge. Chaque année, les étudiants se battent pour elle, persuadés qu'elle changera leur vie. Peut-être que la Chaise ne choisit pas son Élu. Peut-être qu'elle révèle simplement jusqu'où chacun est prêt à aller pour l'obtenir.",
    isSpecial: true
  }
];

/* ——— AVIS SPECTATEURS ——— */
const AVIS = [
  {
    note: 5,
    texte: "Chanceuse d'avoir eu une place pour l'avant-première, quelle soirée. On sort de là encore un peu secoué.",
    prenom: 'Camille'
  },
  {
    note: 5,
    texte: "Je ne m'attendais pas à quelque chose d'aussi fort avec un concept pareil sur le papier.",
    prenom: 'Lucas'
  },
  {
    note: 5,
    texte: "Présent à l'avant-première hier soir et honnêtement le film dépasse toutes mes attentes. Le réalisateur était là pour l'échange après, il a expliqué sa démarche, c'était très intéressant.",
    prenom: 'Théo'
  },
  {
    note: 5,
    texte: "Un pitch qui semblait simple sur le papier et qui s'avère être beaucoup plus profond qu'on ne l'imagine. Content d'avoir pu le voir en avant-première avant tout le monde.",
    prenom: 'Antoine'
  },
  {
    note: 4.5,
    texte: "Tension palpable dans la salle jusqu'au bout, les gens applaudissaient à la fin.",
    prenom: 'Margaux'
  },
  {
    note: 4.5,
    texte: "Sorti de la salle encore troublé par certaines scènes. On sent que toute l'équipe a mis du cœur là-dedans, ça se ressent à l'écran.",
    prenom: 'Julien'
  },
  {
    note: 4.5,
    texte: "Grand fan du principe, ça m'a rappelé les rapports de force qu'on pouvait vivre au lycée pour des choses qui semblent dérisoires vues de l'extérieur. Hâte de le revoir en salle.",
    prenom: 'Maxime'
  },
  {
    note: 4,
    texte: "Bonne surprise, le concept est original et traité avec beaucoup plus de sérieux que je ne l'imaginais. Les acteurs sont hyper convaincants pour leur âge.",
    prenom: 'Léa'
  },
  {
    note: 2.5,
    texte: "Le concept est intéressant mais je suis resté sur ma faim. On tourne un peu en rond au bout d'un moment.",
    prenom: 'Hugo'
  },
  {
    note: 2.5,
    texte: "Chanceux d'avoir eu une invitation pour l'avant-première mais bon, sans plus. Ça manque de rythme par moments.",
    prenom: 'Nathan'
  },
  {
    note: 2.5,
    texte: "Attendait beaucoup de ce concept original et au final ça ne va pas au bout de son idée. Dommage.",
    prenom: 'Chloé'
  },
  {
    note: 3,
    texte: "Sorti de la salle un peu perplexe. Le pitch était accrocheur mais le film peine à en tirer quelque chose de vraiment marquant.",
    prenom: 'Raphaël'
  },
  {
    note: 2,
    texte: "Content d'avoir pu assister à l'avant-première mais je n'ai pas été convaincu. L'idée de base méritait mieux à mon avis.",
    prenom: 'Paul'
  },
  {
    note: 1,
    texte: "Sorti de la salle sans grande émotion malgré le sujet. Le film n'exploite jamais vraiment la tension qu'il pourrait créer.",
    prenom: 'Inès'
  },
  {
    note: 1,
    texte: "Aller à cette avant-première n'aura pas suffi à me convaincre. Le film reste en surface d'un sujet qui méritait plus de profondeur.",
    prenom: 'Gabriel'
  }
];

/* ——— CRITIQUES PRESSE ——— */
const CRITIQUES_PRESSE = [
  {
    media: 'AlloCiné',
    note: '4,5/5',
    citation: "Une comédie grinçante qui transforme une vulgaire chaise de classe en véritable Trône de Fer. Un rythme effréné, et un suspense insoutenable.",
    featured: true
  },
  {
    media: 'Télérama',
    note: '4/5',
    citation: "Derrière l'absurdité du pitch se cache une satire féroce de la société moderne, mêlant hiérarchie sociale à l'école et besoin d'appartenance. Brillamment interprété.",
    featured: true
  },
  {
    media: 'Cahiers du Cinéma',
    note: '4/5',
    citation: "Une mise en scène inventive qui exploite à merveille le huis clos. La caméra bouge autour de la chaise dans une tension digne des plus grands thrillers psychologiques.",
    featured: true
  },
  {
    media: 'Konbini',
    note: '5/5',
    citation: "Le film le plus haletant de l'année. On ne pensait pas pouvoir stresser autant pour une assise réglable en hauteur. Un casting jeune d'une justesse folle.",
    featured: true
  },
  {
    media: 'Le Monde',
    note: '4,5/5',
    citation: "Une mise en scène qui sait faire monter la tension autour du plus insignifiant des objets. Bluffant de maîtrise.",
    featured: false
  },
  {
    media: 'Première',
    note: '3,5/5',
    citation: "Le postulat est excellent, l'exécution un cran en dessous des ambitions du scénario.",
    featured: false
  },
  {
    media: 'Les Inrockuptibles',
    note: '3/5',
    citation: "L'idée fait sourire dix minutes, le film peine ensuite à se renouveler.",
    featured: false
  },
  {
    media: 'Le Figaro',
    note: '3/5',
    citation: "Correct sans plus\u00a0: la mise en scène reste sage face à un sujet qui aurait pu être plus incisif.",
    featured: false
  },
  {
    media: 'Marianne',
    note: '1,5/5',
    citation: "Une seule idée, étirée sur tout un film. On a vite fait le tour de la chaise.",
    featured: false
  },
  {
    media: 'Libération',
    note: '5/5',
    citation: "Il fallait oser filmer une guerre de territoire autour d'une chaise. C'est fait, et c'est un petit bijou de comédie sociale.",
    featured: false
  },
  {
    media: 'Le Parisien',
    note: '5/5',
    citation: "La Chaise parfaite prouve qu'on n'a pas besoin de grands moyens pour raconter de grandes choses. Une petite merveille d'observation.",
    featured: false
  },
  {
    media: 'Positif',
    note: '4/5',
    citation: "Un équilibre de ton difficile à tenir, parfaitement réussi ici.",
    featured: false
  },
  {
    media: 'Studio Ciné Live',
    note: '5/5',
    citation: "Une relecture maligne du mythe de l'élu\u00a0: la chaise devient une véritable Excalibur version salle de classe.",
    featured: false
  }
];

/* ——— FAQ ——— */
const FAQ_ITEMS = [
  {
    question: "Combien de chaises avez-vous auditionnées\u00a0?",
    reponse: "Plus de 3\u00a0000 chaises ont été examinées à travers le monde. Après plusieurs mois de casting intensif, une seule a réussi à répondre à nos critères\u00a0: stabilité, confort, charisme et capacité à supporter la pression."
  },
  {
    question: "Pourquoi cette chaise et pas une autre\u00a0?",
    reponse: "Elle avait quelque chose que les autres n'avaient pas\u00a0: quatre pieds, un dossier et une détermination sans faille."
  },
  {
    question: "La chaise est-elle réellement confortable\u00a0?",
    reponse: "Nous ne pouvons pas le confirmer. Aucun membre de l'équipe n'a été autorisé à s'asseoir dessus depuis le début du tournage."
  },
  {
    question: "Quel est le salaire de la chaise\u00a0?",
    reponse: "Les détails de son contrat restent confidentiels. Nous pouvons cependant confirmer qu'elle a été rémunérée à la hauteur de sa performance."
  },
  {
    question: "Y aura-t-il une suite avec une table\u00a0?",
    reponse: "Nous ne pouvons rien confirmer pour le moment. Mais une table a récemment été aperçue quittant les studios avec un scénario sous le bras."
  },
  {
    question: "La chaise parfaite existe-t-elle vraiment\u00a0?",
    reponse: "Nous ne pouvons pas répondre à cette question pour des raisons de sécurité."
  }
];

/* ——— CINÉMAS FICTIFS ——— */
const CINEMAS_DATA = {
  '33': [
    { nom: 'Cinéma Utopia', ville: 'Bordeaux', adresse: '5 Place Camille Jullian, 33000 Bordeaux', seances: ['14:30', '17:00', '19:30', '22:00'] },
    { nom: 'UGC Ciné Cité', ville: 'Bordeaux', adresse: '13-15 Rue Georges Bonnac, 33000 Bordeaux', seances: ['15:15', '17:45', '20:15', '22:30'] },
    { nom: 'Méga CGR', ville: 'Bordeaux', adresse: '2 Rue du Corps Franc Pommiès, 33300 Bordeaux', seances: ['14:00', '16:30', '19:00', '21:30'] }
  ],
  '75': [
    { nom: 'UGC Ciné Cité Les Halles', ville: 'Paris', adresse: '7 Place de la Rotonde, 75001 Paris', seances: ['13:45', '16:15', '18:45', '21:15'] },
    { nom: 'MK2 Bibliothèque', ville: 'Paris', adresse: '128-162 Avenue de France, 75013 Paris', seances: ['14:00', '16:30', '19:00', '21:30'] },
    { nom: 'Le Grand Rex', ville: 'Paris', adresse: '1 Boulevard Poissonnière, 75002 Paris', seances: ['15:00', '17:30', '20:00', '22:15'] },
    { nom: 'Pathé Beaugrenelle', ville: 'Paris', adresse: '12 Rue Linois, 75015 Paris', seances: ['14:15', '16:45', '19:15', '21:45'] }
  ],
  '69': [
    { nom: 'Pathé Bellecour', ville: 'Lyon', adresse: '79 Rue de la République, 69002 Lyon', seances: ['14:30', '17:00', '19:30', '22:00'] },
    { nom: 'UGC Ciné Cité Confluence', ville: 'Lyon', adresse: '112 Cours Charlemagne, 69002 Lyon', seances: ['15:00', '17:30', '20:00', '22:15'] },
    { nom: 'Institut Lumière', ville: 'Lyon', adresse: '25 Rue du Premier Film, 69008 Lyon', seances: ['18:00', '20:30'] }
  ],
  '13': [
    { nom: 'Pathé La Joliette', ville: 'Marseille', adresse: '54 Rue de la Joliette, 13002 Marseille', seances: ['14:00', '16:30', '19:00', '21:30'] },
    { nom: 'Le César', ville: 'Marseille', adresse: '4 Place Castellane, 13006 Marseille', seances: ['15:30', '18:00', '20:30'] }
  ],
  '31': [
    { nom: 'UGC Toulouse', ville: 'Toulouse', adresse: '9 Allée du Président Roosevelt, 31000 Toulouse', seances: ['14:15', '16:45', '19:15', '21:45'] },
    { nom: 'Gaumont Wilson', ville: 'Toulouse', adresse: '3 Place du Président Thomas Wilson, 31000 Toulouse', seances: ['15:00', '17:30', '20:00', '22:00'] }
  ],
  '44': [
    { nom: 'Gaumont Nantes', ville: 'Nantes', adresse: '12 Place du Commerce, 44000 Nantes', seances: ['14:00', '16:30', '19:00', '21:30'] },
    { nom: 'Katorza', ville: 'Nantes', adresse: '3 Rue Corneille, 44000 Nantes', seances: ['17:00', '19:30', '21:45'] }
  ],
  '67': [
    { nom: 'UGC Ciné Cité Strasbourg', ville: 'Strasbourg', adresse: '25 Avenue du Rhin, 67100 Strasbourg', seances: ['14:30', '17:00', '19:30', '22:00'] },
    { nom: 'Star', ville: 'Strasbourg', adresse: '27 Rue du Jeu-des-Enfants, 67000 Strasbourg', seances: ['16:00', '18:30', '21:00'] }
  ],
  'default': [
    { nom: 'Cinéma Le Central', ville: 'Votre ville', adresse: 'Centre-ville', seances: ['14:00', '17:00', '20:00'] },
    { nom: 'Cinéplex', ville: 'Votre ville', adresse: 'Zone commerciale', seances: ['15:30', '18:30', '21:00'] }
  ]
};

/* ——— RÉCOMPENSES BANDEAU ——— */
const RECOMPENSES_MARQUEE = [
  'PRIX DU MEILLEUR DESIGN SONORE — 2026',
  'SÉLECTION OFFICIELLE — FESTIVAL DE CANNES 2026',
  'FILM LE PLUS ATTENDU DE L\'ANNÉE — ALLOCINÉ',
  'PRIX DU MEILLEUR DESIGN SONORE — 2026'
];

/* ——— LIENS SOCIAUX ——— */
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/lachaiseparfaite?stkn=a2QxamZvMmZ3cTVj&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@lachaiseparfaitemovie?_r=1&_t=ZN-99YdXXlpNmY',
  youtube: 'https://youtube.com/@lachaiseparfaite?si=ut426KK1fu3BTtgj'
};
