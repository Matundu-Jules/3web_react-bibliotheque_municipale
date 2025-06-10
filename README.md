# 📙 Bibliothèque Municipale

Projet frontend réalisé avec **React**, **TypeScript**, **Vite** et **SCSS Modules** pour une interface moderne de gestion et de recherche de livres, intégrant l’API **OpenLibrary** et l’enrichissement par **Wikipedia**.

---

## 🚀 Stack technique

- **React 18** (Vite)
- **TypeScript** (strict)
- **SCSS Modules** (partiels, variables, breakpoints…)
- **React Router DOM**
- **Vitest** (tests unitaires)
- **Context API** (état global)
- **Portals** (modals/dialogs)
- **Hooks** (custom & built-in)
- **API**: [OpenLibrary](https://openlibrary.org/developers/api), [Wikipedia REST API](https://www.mediawiki.org/wiki/API:REST_API)

---

## 📂 Arborescence du projet

```
/public
  └── index.html
/src
  /assets
    └── logo.svg
  /components
    /common
      ├── Loader
      └── ErrorMessage
    /Book
      ├── BookCard
      ├── RecentChangesCarousel
      ├── RecentChangesList
      └── BookDetails
    /Search
      ├── QuickSearchBar
      ├── AdvancedSearchForm
      └── AdvancedSearchResults
    /Layout
      ├── Header
      ├── Footer
      └── MainContainer
  /contexts
    └── SearchContext
  /hooks
    ├── useBooks.ts
    ├── useWikipedia.ts
    └── useDebounce.ts
  /pages
    ├── HomePage
    ├── BookPage
    ├── AdvancedSearchPage
    └── NotFoundPage
  /services
    ├── openLibraryService.ts
    ├── wikipediaService.ts
    └── apiConfig.ts
  /styles
    ├── _variables.scss
    ├── _reset.scss
    ├── _breakpoints.scss
    ├── _theme.scss
    └── index.scss
  /types
    ├── book.d.ts
    ├── search.d.ts
    └── wikipedia.d.ts
  /tests
    ├── BookCard.test.tsx
    └── ...
  /utils
    └── formatters.ts
  App.tsx
  main.tsx
  router.tsx
  vite-env.d.ts
README.md
package.json
tsconfig.json
vitest.config.ts
```

---

## ✨ Fonctionnalités principales

- **Recherche rapide** : barre présente sur toutes les pages, suggestions dynamiques, navigation vers un livre.
- **Recherche avancée** : page dédiée avec filtres multiples (auteur, titre, année, tags…), affichage paginé.
- **Accueil** : affichage des derniers changements de livres via l’API OpenLibrary.
- **Détail d’un livre** : page avec couverture, auteur, année, éditeur… enrichie par Wikipedia (description, couverture, lien externe).
- **Responsive** : interface mobile-first, adaptée à tous formats d’écran.
- **Expérience UI/UX** : feedback clair (chargement, erreurs), accessibilité soignée (ARIA, labels, navigation clavier).
- **Tests unitaires** sur tous les composants et hooks métier clés (Vitest).
- **Gestion d’état globale** avec Context API, sans prop drilling.
- **Hooks custom** pour la logique métier (API, debounce…).
- **Modals accessibles** via Portals.

---

## 🧑‍💻 Installation & démarrage

### 1. Prérequis

- **Node.js** >= 18.x.x
- **npm** >= 9.x.x

### 2. Installation

```bash
git clone https://github.com/Matundu-Jules/3web_react-bibliotheque_municipale.git
cd bibliotheque-municipale
npm install
```

### 3. Lancement en dev

```bash
npm run dev
```

Application accessible sur [http://localhost:5173](http://localhost:5173).

### 4. Lancer les tests

```bash
npm run test
```

---

## 🌐 API utilisées

- **OpenLibrary**

  - Recherche : `https://openlibrary.org/search.json?q=...`
  - Détail d’un livre : `https://openlibrary.org/works/{workId}.json`
  - Changements récents : `https://openlibrary.org/recentchanges.json?limit=20`

- **Wikipedia REST**

  - Description d’un livre : `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`

---

## 🥺 Tests unitaires minimum

- **Loader** : affichage durant chargement
- **ErrorMessage** : rendu du message d’erreur
- **BookCard** : affichage correct des infos attendues
- **useBooks** : hook custom (mock API)
- **QuickSearchBar** : debouncing, suggestions, navigation
- **Context** : propagation de l’état

---

## 💡 Bonnes pratiques & conventions

- **TypeScript strict** (aucun any)
- **SCSS Modules** pour des styles locaux à chaque composant
- **Variables CSS** pour tous les thèmes/couleurs
- **Responsive mobile-first** avec breakpoints
- **Hooks et services** bien séparés pour la testabilité
- **Context** pour l’état global (recherche)
- **Portals** pour la gestion des modals
- **Accessibilité** avancée (labels, ARIA, focus management)
- **Code propre** : linté, formaté, lisible, testé

---

## 👤 Auteur

MATUNDU Jules-Langa

---

## 📄 Licence

Projet réalisé dans le cadre du module React 3WEBD — SUPINFO Paris.

---
