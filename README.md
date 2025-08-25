# BlogExo - Application de Blog Vue.js

## Description du Projet

BlogExo est une application de blog moderne développée avec Vue.js 3, utilisant Vite comme outil de build et Tailwind CSS pour le styling. L'application permet aux utilisateurs de créer des comptes, publier des articles et interagir via des commentaires.

## Fonctionnalités

### Authentification

- Inscription et connexion des utilisateurs
- Persistance de session via localStorage
- Gestion des permissions (édition limitée aux auteurs)

### Gestion des Articles

- Création et édition d'articles (titre et contenu)
- Affichage des articles avec pagination automatique
- Interface responsive pour mobile et desktop

### Système de Commentaires

- Ajout de commentaires sur les articles
- Édition et suppression de commentaires par leurs auteurs
- Compteur de commentaires par article

## Architecture Technique

### Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── BaseButton.vue   # Bouton standardisé
│   ├── BaseCard.vue     # Carte avec effet glass
│   ├── EditCommentModal.vue # Modal d'édition des commentaires
│   ├── FooterComponent.vue  # Pied de page
│   └── HeaderComponent.vue  # En-tête avec navigation
├── pages/              # Pages de l'application
│   ├── HomeViews.vue   # Page d'accueil (liste des articles)
│   ├── ArticleViews.vue # Vue détaillée d'un article
│   ├── AddEditArticle.vue # Formulaire d'ajout/édition d'article
│   ├── LoginViews.vue  # Page de connexion
│   └── RegisterViews.vue # Page d'inscription
├── stores/             # Stores Pinia pour la gestion d'état
│   ├── user.js         # Gestion des utilisateurs
│   ├── article.js      # Gestion des articles
│   └── comment.js      # Gestion des commentaires
├── router/             # Configuration Vue Router
└── style.css           # Styles globaux avec Tailwind
```

### Technologies Utilisées

- **Vue.js 3** : Framework JavaScript réactif avec Composition API
- **Pinia** : Gestionnaire d'état moderne pour Vue.js
- **Vue Router** : Routage côté client
- **Vite** : Outil de build rapide et moderne
- **Tailwind CSS** : Framework CSS utilitaire
- **localStorage** : Persistance des données côté client

### Stores Pinia

#### User Store (`stores/user.js`)

- Gestion de l'authentification (inscription, connexion, déconnexion)
- Stockage des informations utilisateur
- Validation des permissions

#### Article Store (`stores/article.js`)

- CRUD des articles (Create, Read, Update, Delete)
- Gestion des auteurs et permissions d'édition
- Persistance dans localStorage

#### Comment Store (`stores/comment.js`)

- Gestion des commentaires par article
- Édition et suppression par auteur
- Association article-commentaire

## Styling et Design

L'application utilise un design moderne avec effet "glass morphism" :

- Arrière-plan dégradé sombre
- Éléments semi-transparents avec flou d'arrière-plan
- Responsive design pour tous les écrans
- Animations et transitions fluides

## Installation et Lancement

### Prérequis

- Node.js version 20.19.0 ou supérieure

### Installation

```sh
npm install
```

### Développement

```sh
npm run dev
```

### Build de Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

### Formatage du Code

```sh
npm run format
```

## Données de Test

L'application charge automatiquement des données fictives au premier lancement :

### Utilisateurs de Test

- **Alice** : alice@mail.com / alice123
- **Bob** : bob@mail.com / bob123

### Articles Initiaux

- Articles d'exemple créés par Alice et Bob
- Générés automatiquement si localStorage est vide

## Structure des Données

### Utilisateur

```javascript
{
  username: string,
  email: string,
  password: string,
  created_at: string
}
```

### Article

```javascript
{
  id: string,
  title: string,
  content: string,
  author: string,
  authorEmail: string,
  create_at: string
}
```

### Commentaire

```javascript
{
  id: string,
  articleId: string,
  content: string,
  author: string,
  authorEmail: string
}
```

## Sécurité et Permissions

- Les utilisateurs ne peuvent éditer que leurs propres articles
- Les commentaires ne peuvent être modifiés que par leurs auteurs
- Validation côté client pour l'authentification
- Pas de données sensibles stockées en localStorage (mots de passe en clair pour démo uniquement)

---

_Exercice de développement Vue.js par Pierre - BlogExo 2025_
