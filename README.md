Comment lancer le projet ?

Sans docker, prérequis, Node.js & Angular:

Aller dans le dossier Front, effectuer les commandes suivantes dans l'ordre:

npm install
npm start

Aller dans le dossier Back, effectuer les commandes suivantes dans l'ordre:

npm install
npm run build
npm start

Avec Docker, aller dans le dossier racine:

docker-compose build
docker-compose up

Le profil administrateur est le suivant:
jonathanramassamy@outlook.fr
jr197120

L'emplacement du panel d'administration ce trouve en haut à droite du menu, une fois connecté.

Toutes les actions d'administration y sont accessibles.

Toutes les requêtes demandant une connexion disposent d'un Jwt Token, il faut ainsi ce connecter & remplacer toutes les requêtes qui  disposent du jwt Token pour Swagger.