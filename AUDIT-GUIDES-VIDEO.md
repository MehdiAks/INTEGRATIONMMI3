> Mise à jour après correction : l’accueil cherche les médias exclusivement dans `GXX/siteweb_GXX/assets/images` et `assets/videos` (avec repli vers les noms historiques des dossiers G15/G20). G04 privilégie maintenant le film officiel présent ; G12 propose un bouton de son. La détection des images/vidéos prend aussi en charge `file://`. Pour un PDF en ouverture locale, utiliser le lien direct proposé ; la détection PDF automatique nécessite HTTP. Les observations historiques ci-dessous précèdent ces corrections.

# Vérification des README et tutoriels vidéo

Les guides locaux ont été lus et comparés au code actuel. Leurs anciens chemins sont des informations sur les projets d’origine ; ils ne remplacent pas la consigne d’intégration `assets/videos/video_GXX.mp4` ou `.mov`. Aucun déploiement ni changement de stockage du navigateur n’a été exécuté à partir des commandes contenues dans ces documents.

| Groupe | Documents lus | Indications et comparaison au code |
|---|---|---|
| G01 | Aucun dossier fourni | Non vérifiable. |
| G02 | Aucun README/tutoriel trouvé | Le lecteur actuel utilise le fichier du groupe dans une fenêtre modale. |
| G03 | `AGENTS.md`, `design-qa.md` | Instructions de compilation et de contrôle visuel, aucune procédure spécifique de chargement vidéo. |
| G04 | `COMMENT-CHANGER-LA-VIDEO.txt`, `INSTRUCTIONS.txt`, `README.md` | Deux méthodes : source commune via `VIDEO_URL`, ou éditeur local ouvert avec `leon` / `#edit`. L’éditeur mémorise le fichier dans IndexedDB et les URL/images dans localStorage. Le code donne priorité à ces choix locaux, puis au fichier G04. Une ancienne sélection peut donc masquer la vidéo officielle uniquement dans ce navigateur. Le bouton « Tout réinitialiser » permet de supprimer ces choix ; aucune réinitialisation n’a été effectuée durant cet audit. Les exemples YouTube des guides sont anciens : la constante actuelle vise le fichier du groupe. |
| G05 | Aucun README/tutoriel trouvé | Aucun mécanisme documentaire supplémentaire identifié. |
| G06 | `README.md` | Demande de supprimer les placeholders et décommenter le lecteur avec `assets/bande-annonce.mp4`. Le lecteur est déjà activé et utilise maintenant `assets/videos/video_G06.mp4`, avec résolution MOV. La procédure du guide n’est plus à refaire. |
| G07 | Aucun README/tutoriel trouvé | Les sondes et commentaires du code avaient déjà été vérifiés lors de l’intégration ; la disponibilité du fichier commande l’affichage du vrai lecteur. |
| G08 | Aucun dossier fourni | Non vérifiable. |
| G09 | Aucun README/tutoriel trouvé | Aucun mécanisme documentaire supplémentaire identifié. |
| G10 | Aucun README/tutoriel trouvé | Le fichier `affiche_G10.docx` est une affiche, pas un tutoriel de chargement vidéo. |
| G11 | `README.txt` | Le guide prévoit une sélection de vidéo depuis l’ordinateur pour la bande-annonce et un accès distinct pour le making-of. Dans l’intégration actuelle, le bouton bande-annonce charge directement `video_G11` comme demandé. Le making-of conserve la sélection manuelle d’un fichier ; il ne doit pas être confondu avec le film du groupe. Le guide mentionne les anciens dossiers `videos/` et `images/`. |
| G12 | `assets/video/readme.txt` | Demande un MP4 nommé `enregistrement.mp4`. Le film a été redirigé vers `assets/videos/video_G12.mp4`, avec variante MOV. Les vidéos `phone/ringing.mp4` et `phone/pickup.mp4` servent à l’introduction, pas au film. Le lecteur du film démarre à l’approche de la télévision, en boucle et muet dans le code actuel ; ses commandes personnalisées ne proposent pas de volume. Le lecteur de l’accueil, lui, utilise les contrôles natifs avec son. |
| G13 | Aucun dossier fourni | Non vérifiable. |
| G14 | `REMPLACER_LES_MEDIAS.md` | Le documentaire se trouve dans `documentaires.html`. Ancienne source `assets/media/documentaire.mp4`, son inclus dans le fichier. La page utilise maintenant `assets/videos/video_G14.mp4` et le lecteur natif ; aucune autre configuration n’est demandée. |
| G15 | Aucun README/tutoriel trouvé | Application React compilée lors de l’intégration ; aucun guide vidéo supplémentaire trouvé. |
| G16 | Aucun README/tutoriel trouvé | Aucun mécanisme documentaire supplémentaire identifié. |
| G17 | Aucun dossier fourni | Non vérifiable. |
| G18 | Aucun dossier fourni | Non vérifiable. |
| G19 | Aucun dossier fourni | Non vérifiable. |
| G20 | `readme.txt` | Demande `assets/posters/bande-annonce.mp4` et `affiche.jpg`, avec noms/extensions fixes. Ces anciennes références sont remplacées pour le film du groupe par `assets/videos/video_G20` et `assets/images/affiche_G20`. La première carte ouvre le lecteur en fenêtre modale ; les autres films du catalogue restent distincts. |

## Guide de l’accueil

Le `README.txt` à la racine a également été lu. Il décrit une ancienne organisation (`siteweb_01`, `affiche.jpg`, clic direct sur carte) qui ne correspond plus à l’accueil actuel. Son `extrait.mp4` est uniquement la vidéo de fond, pas la vidéo d’un groupe.

## Conclusion

Les mécanismes de chargement décrits sont identifiés. Les principaux écarts avec les guides sont les adaptations déjà réalisées pour respecter la structure commune, et non de nouvelles étapes obligatoires oubliées. Points à connaître : priorité des choix locaux de G04, sélection séparée du making-of G11 et film muet dans le sous-site G12.

Cet audit porte sur les documents fournis et leur correspondance avec le code. Il ne valide pas les codecs ni le contenu des films absents. Aucun code de lecteur n’a été modifié pendant cette vérification.
