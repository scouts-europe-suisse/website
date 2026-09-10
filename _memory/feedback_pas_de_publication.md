---
name: feedback_pas_de_publication
description: Aucune mise en ligne tant que l'hébergement n'est pas décidé (plan 01). Ne pas improviser un déploiement, même si l'utilisateur le demande.
metadata:
  type: feedback
---

# Pas de mise en ligne pour l'instant

**L'hébergement du nouveau site n'est pas choisi. Aucune publication ne part d'ici.**

**Pourquoi :** publier, c'est irréversible du point de vue du public — l'adresse
`www.scouts-europe.ch` est imprimée sur des documents, citée par des groupes locaux, et sert
d'adresse de contact du mouvement. Basculer dessus se prépare (redirections des anciennes
adresses, sort de l'e-mail `info@`, qui garde les accès), ça ne s'improvise pas un soir parce
qu'une page est jolie. Le site WordPress actuel continue de tourner pendant ce temps, et rien de
ce qui est fait ici ne l'affecte.

C'est pour ça que ce dépôt ne contient volontairement **ni script de publication, ni fichier
`CNAME`, ni branche de déploiement**.

**Comment l'appliquer :** si quelqu'un demande à publier, mettre en ligne, « rendre le site
visible » :

1. Ne pas créer de script de déploiement à la volée, ne pas pousser vers un hébergeur.
2. Expliquer en une ou deux phrases que l'hébergement doit d'abord être décidé, et que c'est
   l'objet du plan 01.
3. Proposer l'alternative utile : faire tourner le site en local et le montrer, ou construire le
   site (`npm run build`) pour que l'utilisateur puisse envoyer le résultat à quelqu'un.

Quand le plan 01 sera fermé, cette règle sera remplacée par la procédure de publication
correspondante — y compris une règle de double confirmation avant toute mise en ligne.

Voir aussi [[local-dev-and-deploy]].
