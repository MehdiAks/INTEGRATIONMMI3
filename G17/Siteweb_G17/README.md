# int--jour3

## 1. Cloner le dépôt
 
```bash
git clone https://github.com/Jordaneuh/int--jour3
cd <projet>
```
 
Cloner crée une copie locale du dépôt sur votre machine. Cette opération ne se
fait qu'une seule fois.
 
## 2. Lancer le projet
 
Deux options :
 
**Avec Live Server (recommandé)**
Clic droit sur `index.html` dans VS Code → *Open with Live Server*.
La page se recharge automatiquement à chaque sauvegarde.
 
**Sans extension**
Ouvrir directement `index.html` dans le navigateur (double-clic sur le fichier).
 
## 3. Créer une branche
 
On ne travaille **jamais** directement sur `main`. Avant de commencer une
nouvelle tâche, on part toujours d'un `main` à jour :
 
```bash
git checkout main
git pull origin main
git checkout -b feat/ma-fonctionnalite
```
 
### Convention de nommage
 
| Préfixe    | Usage                                  | Exemple                    |
| ---------- | -------------------------------------- | -------------------------- |
| `feat/`    | Nouvelle fonctionnalité                | `feat/menu-burger`         |
| `fix/`     | Correction de bug                      | `fix/lien-footer-casse`    |
| `style/`   | CSS, mise en forme, responsive         | `style/page-contact`       |
| `refactor/`| Réorganisation du code sans changement | `refactor/decoupage-css`   |
 
## 4. Enregistrer son travail
 
```bash
git status                                   # voir les fichiers modifiés
git add .                                    # préparer tous les changements
git commit -m "feat: ajout du menu de navigation"
git push -u origin feat/ma-fonctionnalite
```
 
Le `-u` ne sert qu'au **premier** push de la branche : il crée le lien avec la
branche distante. Ensuite, un simple `git push` suffit.
 
Les messages de commit suivent les mêmes préfixes que les branches :
`feat:`, `fix:`, `style:`, `refactor:`.
 
## 5. Fusionner dans `main`
 
### Étape 1 — récupérer `main` dans sa branche
 
C'est ici qu'on règle les conflits, pas dans `main` :
 
```bash
git checkout feat/ma-fonctionnalite
git merge main
```
 
En cas de conflit, VS Code affiche les zones en désaccord avec les boutons
*Accept Current Change* / *Accept Incoming Change*. Une fois les fichiers
corrigés :
 
```bash
git add .
git commit
git push
```
 
### Étape 2 — ouvrir une Pull Request
 
Sur la page GitHub du dépôt, un bandeau **Compare & pull request** apparaît
après le push. Cliquer dessus, décrire ce qui a été fait, puis
**Create pull request**.
 
### Étape 3 — fusionner
 
Une fois la PR relue par un membre de l'équipe, cliquer sur
**Merge pull request**. Le code rejoint alors `main`.
 
## 6. Nettoyer
 
Après la fusion, revenir sur `main` et supprimer la branche terminée :
 
```bash
git checkout main
git pull origin main
git branch -d feat/ma-fonctionnalite
```
 
Le `-d` en minuscule refuse de supprimer une branche non fusionnée : c'est un
garde-fou volontaire. Ne le remplacer par `-D` que si l'on abandonne
sciemment le travail de la branche.