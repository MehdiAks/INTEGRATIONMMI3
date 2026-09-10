# Semaine d'intégration MMI 2026

## Structure attendue

Placez `index.html`, `style.css`, `script.js` et `extrait.mp4` à la racine du site.

Puis créez :

G01/
├── affiche.jpg / affiche.png / affiche.pdf
└── siteweb_01/
    └── index.html

G02/
├── affiche.jpg / affiche.png / affiche.pdf
└── siteweb_02/
    └── index.html

...

G20/
├── affiche.jpg / affiche.png / affiche.pdf
└── siteweb_20/
    └── index.html

Le script cherche automatiquement l'affiche dans cet ordre :
1. affiche.jpg
2. affiche.png
3. affiche.pdf

Les clics sur les cartes ouvrent automatiquement :
G01/siteweb_01/index.html
G02/siteweb_02/index.html
...
G20/siteweb_20/index.html

## Vidéo

Placez votre vidéo de fond sous le nom exact :

extrait.mp4

Elle est configurée en autoplay, muted, loop et playsinline.

## Photo de Michel

La photo fournie dans la demande est actuellement utilisée directement depuis son URL CDN Instagram dans `index.html`.

Pour une version plus fiable, vous pouvez télécharger la photo dans le dossier racine sous `michel.jpg`, puis remplacer l'attribut `src` de l'image par :

michel.jpg

Cela évitera qu'une URL CDN temporaire cesse de fonctionner.
