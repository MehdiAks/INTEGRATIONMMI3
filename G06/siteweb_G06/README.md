# Food Wars — site

Landing page (une seule page) pour le film fictif *Food Wars*.
Reconstruction propre de l'export `Food Wars.dc.html` en HTML / CSS / JS statique.

## Arborescence

```
Food Wars site/
├── index.html         ← structure de la page (header, hero, synopsis, footer)
├── css/
│   └── style.css       ← tout le style : base, header, hero, synopsis, footer, responsive
├── js/
│   └── script.js       ← vide pour l'instant (site 100 % statique) ; prêt pour des ajouts
└── assets/             ← images
    ├── logo.png            logo (header)
    ├── logo-blanc.png      logo blanc (footer)
    ├── boxer.png           personnage principal (hero)
    ├── ville2.png          skyline en fond (hero + footer)
    ├── onion.png           décor
    ├── wrap.png            décor
    ├── burger.png          décor (footer)
    └── ring1..ring5.png    décors "onion rings" (seul ring5 est utilisé)
```

## À compléter (placeholders)

Deux médias sont encore en placeholder dans `index.html` :

| Élément        | Fichier à déposer            | Quoi faire dans `index.html`                     |
|----------------|------------------------------|-------------------------------------------------|
| Affiche        | `assets/affiche.jpg`         | supprimer le `<span>`, décommenter le `<img>`   |
| Bande-annonce  | `assets/bande-annonce.mp4`   | supprimer le bloc placeholder, décommenter le `<video>` (poster facultatif : `assets/bande-annonce.jpg`) |

Les instructions détaillées sont en commentaire juste à côté de chaque bloc.

## Lancer

Ouvrir `index.html` dans un navigateur. Aucune dépendance, aucun build.
Les polices (Bakbak One, Signika) sont chargées depuis Google Fonts.
