# 🎥 Movie Finder — Trouve des films gratuits en un clic  

## 📖 Description  
Vous est-il déjà arrivé de vouloir regarder un film sans avoir d’abonnement Netflix, Amazon Prime ou autres plateformes de streaming ?  
Moi aussi, et à force de passer des heures à taper :  
- "Tel film gratuit en streaming"  
- "Tel film complet en français"  
- "Lien Telegram de tel film en français"  

... je me suis dit : **Je fais de l’informatique, pourquoi ne pas automatiser ça ?** 😎  

C’est ainsi qu’est née **Movie Finder** :  
> Une application web qui facilite la recherche de films et séries accessibles gratuitement sur différentes plateformes, sans se casser la tête.  

---

## 🚀 Fonctionnalités  

### ✅ Recherche intelligente  
- Tape le nom d’un film ou d’une série  
- L’application lance automatiquement des recherches optimisées sur :  
  - **Telegram**  
  - Sites spécialisés  
  - Google via un dictionnaire de recherches pré-établi et enrichi régulièrement  

### ✅ Génération de requêtes multiples  
- L’appli utilise un **dictionnaire de recherche personnalisé** qui regroupe les phrases clés fréquemment utilisées pour trouver des films gratuitement.  
- Plus besoin d’ouvrir plusieurs onglets et tester manuellement chaque lien !  

### ✅ Liste de liens pertinents  
- Les résultats les plus probables sont affichés avec un aperçu.  
- Même si ce n’est pas toujours parfait, cela me fait gagner un temps fou.  

### ✅ Favoris  
- Possibilité d’ajouter les liens les plus fiables en favoris pour les retrouver rapidement.  

### ✅ Mises à jour en temps réel  
- Avec **Socket.io**, les résultats s’actualisent directement dans l’application pendant la recherche.  

---

## 🛠 Stack technique  

### Frontend  
- **React.js**  
- **Bootstrap** pour un design responsive et simple  
- **Framer Motion** pour les animations fluides  

### Backend  
- **Node.js** avec **Express**  
- **Puppeteer** pour automatiser les recherches sur Google et autres sources  
- **Socket.io** pour les mises à jour en temps réel  

---

## 🔮 Améliorations prévues  
- ✅ Filtrage automatique des faux liens et redirections inutiles  
- ✅ Intégration d’un lecteur vidéo directement dans l’application pour certains liens (Plyr ou Video.js)  
- ✅ Optimisation du dictionnaire de recherche avec des mises à jour automatiques  
- ✅ Option pour signaler un lien non fonctionnel  

---

## 📝 Disclaimer  
> Cette application est un projet personnel destiné à automatiser mes recherches.  
> Je n'héberge aucun contenu protégé et je n'encourage en aucun cas la violation des droits d’auteur.  
> L’utilisateur est seul responsable de l’utilisation des liens générés.  


