# LCFenLive

## Description

LCFenLive est une application web permettant de suivre les matchs en direct du Lisieux Club Futsal. Elle offre également une fonctionnalité de chat en direct pour permettre aux utilisateurs de discuter pendant les matchs.

## Fonctionnalités

- **Live Streaming** : Suivez les matchs en direct via YouTube.
- **Chat en Direct** : Discutez avec d'autres spectateurs en temps réel.
- **Authentification** : Inscription et connexion des utilisateurs.
- **Responsive Design** : Interface utilisateur adaptée à tous les types d'écrans.

## Installation

### Prérequis

- Node.js
- npm ou yarn
- MongoDB

### Frontend

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/LCFenLive.git
   cd LCFenLive/frontend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du dossier `frontend` et ajoutez vos clés API YouTube :

   ```env
   REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
   REACT_APP_CHANNEL_ID=your_channel_id
   ```

4. Démarrez l'application :
   ```bash
   npm start
   ```

### Backend

1. Allez dans le dossier backend :

   ```bash
   cd ../backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du dossier `backend` et ajoutez vos configurations :

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Démarrez le serveur :
   ```bash
   npm start
   ```

## Utilisation

1. Ouvrez votre navigateur et allez à `http://localhost:3000`.
2. Inscrivez-vous ou connectez-vous pour accéder aux fonctionnalités de chat et de live streaming.

## Scripts Disponibles

### Frontend

- `npm start` : Démarre l'application en mode développement.
- `npm run build` : Construit l'application pour la production.
- `npm test` : Lance les tests.

### Backend

- `npm start` : Démarre le serveur.

## Remerciements

Un grand merci à **David Daupeyroux (ddcreation)** pour sa contribution, la revue de code et la partie debug.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
