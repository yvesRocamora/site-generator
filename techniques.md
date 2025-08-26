# Spécification Technique — Générateur de Site Web avec LLM

## 1. Objectif

Créer une application web front-end qui permet à l’utilisateur de générer dynamiquement une page web à partir d’un prompt, en utilisant un LLM (Large Language Model). L’interface inclut une barre latérale pour la saisie du prompt et un chat interactif, et affiche le résultat dans une iframe.

---

## 2. Architecture

- **Framework principal** : React (avec Vite)
- **Styling** : TailwindCSS
- **Tests** : Vitest
- **Communication LLM** : Fetch API (appel direct à une API LLM, ex. OpenAI)
- **Affichage du résultat** : HTML/TailwindCSS injecté dans une iframe

---

## 3. Structure de l’interface

- **Sidebar (Barre latérale)**
  - Champ de saisie du prompt
  - Bouton d’envoi
  - Zone de chat interactif (historique des échanges avec le LLM)

- **Main (Écran principal)**
  - Iframe affichant le code HTML/TailwindCSS généré par le LLM

---

## 4. Fonctionnalités

### 4.1 Génération de site

- L’utilisateur saisit un prompt dans la sidebar.
- Au clic sur le bouton, le prompt est envoyé à l’API LLM.
- Le LLM retourne du code HTML utilisant TailwindCSS.
- Le code est affiché dans une iframe sur l’écran principal.

### 4.2 Chat interactif

- L’utilisateur peut discuter avec le LLM via la sidebar.
- Les messages sont affichés dans un historique sous le champ de prompt.

### 4.3 Sécurité

- Le code HTML généré est affiché dans une iframe pour isoler le rendu.
- Aucune clé API sensible ne doit être exposée dans le code source.

---

## 5. Stack technique

- **React** (Vite) — tous les composants de l’interface et la logique seront développés en React.
- **TailwindCSS**
- **Fetch API**
- **Vitest** (tests unitaires)

---

## 6. Structure des fichiers (proposée)

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Chat.jsx
│   └── MainView.jsx
├── App.jsx
├── main.jsx
├── index.css
tests/
│   └── App.test.js
tailwind.config.js
vite.config.js
package.json
README.md
```

---

## 7. API LLM

- **Entrée** : prompt utilisateur (texte)
- **Sortie** : code HTML complet avec TailwindCSS intégré

---

## 8. Tests

- Utiliser Vitest pour tester les composants React (rendu, interactions, gestion d’état).

---

## 9. Limitations

- Pas d’export externe (ZIP, Netlify, etc.)
- Pas de gestion multilingue pour l’instant

---

## 10. Évolutions possibles

v

- Ajout de l’export du site généré
- Authentification utilisateur
- Gestion multilingue
- Personnalisation avancée du
