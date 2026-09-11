# Correction de l’intégration des groupes

Les 14 groupes présents dans ce dépôt ont été examinés. Les groupes G01, G08, G13, G17, G18 et G19 sont absents : leurs liens restent prévus dans l’accueil, mais leurs sites ne peuvent pas être corrigés sans leurs fichiers.

## Médias attendus

Dans le dossier du site de chaque groupe :

```text
GXX/
  affiche_GXX.png (ou jpg, jpeg, pdf : affiche utilisée par l’accueil)
  siteweb_GXX/
    assets/
      images/affiche_GXX.png (ou jpg, jpeg, pdf)
      videos/video_GXX.mp4 (ou mov)
```

Les noms de dossiers existants `G15/GRP15_site_web` et `G20/site_web_G20` sont conservés et pris en charge. Respecter les majuscules : `G09`, mais `affiche_G09` et `video_G09`.

`group-media.js` recherche uniquement les médias du groupe dans `assets/images` et `assets/videos`. Il essaie PNG, JPG, JPEG, PDF pour l’affiche et MP4, MOV pour le film. Les affiches PDF utilisent un objet PDF avec lien de secours, pas une balise image. Le script prend en charge les lecteurs créés à la demande. L’accueil cherche d’abord l’affiche à la racine du groupe, puis dans le sous-site.

La détection des extensions utilise des requêtes HTTP HEAD : utiliser un serveur web (local ou hébergement statique) pour bénéficier de cette détection. Le double-clic en `file://` n’est pas un mode de validation des applications React ni de la détection des variantes. La lecture d’un MOV dépend également du codec réellement contenu dans le fichier.

## Résultat par groupe

| Groupe | Intervention / état |
|---|---|
| G01 | Dossier absent. |
| G02 | Affiche et vidéo déjà nommées correctement ; résolution des variantes et lecteur de la fenêtre modale adaptés. |
| G03 | Import d’affiche absente retiré de la compilation ; lecteur du film relié aux boutons ; version statique générée dans `dist/client`. |
| G04 | Sources locales déjà prévues ; résolution du format vidéo et de l’affiche ajoutée. L’éditeur de médias existant conserve ses choix explicites. |
| G05 | Recherche YouTube remplacée par le lecteur local ; affiche du groupe présentée avec le lecteur. |
| G06 | Vidéo encore commentée : lecteur activé ; ancien dossier accentué et nom `video_g6` corrigés. |
| G07 | Sondes d’image et vidéo adaptées aux extensions réelles ; affiche, visionneuse et lecteur reliés aux médias du groupe. |
| G08 | Dossier absent. |
| G09 | `Affiche_G09` corrigé en `affiche_G09` ; références des images annexes harmonisées dans `assets/images` ; fond sombre conservé si l’image de fond manque. |
| G10 | Bouton YouTube relié au lecteur local ; affiche initialement PDF compatible avec les variantes image ; vidéo locale conservée. |
| G11 | Ancienne `affiche.jpg` remplacée par l’affiche du groupe ; lecteur local adapté aux variantes. Le making-of reste une fonction séparée de sélection de fichier. |
| G12 | Dossier `assets/video` corrigé en `assets/videos` pour le film ; pages de vérification également harmonisées. Les animations de téléphone restent des médias distincts. |
| G13 | Dossier absent. |
| G14 | Page `documentaires.html` : film, miniature et affiche reliés aux fichiers G14. |
| G15 | Imports de médias et personnage absents retirés de la compilation ; URL rattachées au sous-site ; version statique générée dans `dist` ; état de lecture et plein écran corrigés. |
| G16 | Anciennes références de bande-annonce et affiche corrigées ; chemins des logos partenaires corrigés. |
| G17 | Dossier absent. |
| G18 | Dossier absent. |
| G19 | Dossier absent. |
| G20 | Première carte, « La Typo Interdite », reliée à l’affiche et au film G20 ; les autres films fictifs du catalogue restent distincts. |

## Compilation et Git

L’accueil pointe vers les versions compilées de G03 et G15. Elles sont générées et leur exclusion globale par `dist/` est levée pour ces deux sorties uniquement. Le dépôt peut ainsi être servi comme site statique, sans exécuter React/Vite sur le serveur.

Après modification du code React, régénérer avec :

```sh
sh scripts/build-static.sh
```

Les films et affiches officiels restent exclus de Git comme auparavant. L’exclusion trop large de **tous** les PNG/JPG/PDF a été retirée : elle empêchait aussi l’ajout des décors, portraits et logos nécessaires. Ces ressources doivent être ajoutées lorsqu’elles sont récupérées.

La commande `build:static` de G03 compile le site sans son ancien déploiement Sites. Son script `build` d’origine est conservé ; il exige une configuration `.openai/hosting.json` absente de ce dépôt et n’est pas utilisé pour l’intégration statique.

## Vérifications et limites

- Compilation Vite de G03 et G15 réussie sans les films ni les affiches officiels.
- Ouverture des 14 sous-sites présents dans le navigateur ; accueil avec 20 cartes.
- Essais de résolution JPG/MOV avec des médias de test servis hors du dépôt, sous un préfixe d’hébergement, notamment pour G03, G06, G07, G10 et G15.
- Essais d’intégration PDF pour G02, G04, G07 et G09.
- Tests automatisés : `node --test tests/group-media.test.cjs`.
- Inventaire HTML/CSS régénérable : `python3 scripts/check-integration.py > AUDIT-RESSOURCES.txt`.

Les vrais films et affiches ne sont pas présents : leur contenu et leur décodage ne sont donc pas validés. Les fixtures de test ne sont pas ajoutées aux dossiers des groupes.

`AUDIT-RESSOURCES.txt` liste aussi les ressources annexes absentes (décors, portraits, logos, animations du téléphone G12…). Ce relevé porte sur les références HTML/CSS, pas sur toutes les URL générées en JavaScript. G15 attend également `assets/images/pi_corps.png`. Aucun fichier de camarade absent n’a été recréé. Certaines mises en page resteront visuellement incomplètes jusqu’à récupération de ces ressources.
