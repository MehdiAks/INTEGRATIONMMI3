# Remplacer les médias du documentaire

La page `documentaires.html` charge directement deux fichiers du dossier `assets` :

- `assets/media/documentaire.mp4` : la vidéo MP4, avec le son inclus dans le fichier ;
- `assets/images/documentaire-affiche.jpg` : l’affiche au format portrait.

Pour changer le documentaire, remplacez simplement ces fichiers en conservant exactement les mêmes noms. Aucun changement de code n’est nécessaire. Rechargez ensuite la page en vidant le cache du navigateur si l’ancien média reste affiché.

Le fichier MP4 n’est pas fourni dans ce modèle afin de garder le dossier léger. Jusqu’à son ajout, le lecteur affiche un fond blanc au format 16/9. L’affiche blanche placée sous la vidéo est un fichier séparé au format portrait.

Les six chemins sont enregistrés directement dans `assets/js/routes-data.js`. Ils fonctionnent sans base de données et leurs images se trouvent dans `assets/images/chemins`.
