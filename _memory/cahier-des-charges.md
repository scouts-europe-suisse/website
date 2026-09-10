---
name: cahier-des-charges
description: Résumé du document SES25 (janvier 2025) sur la révision de la charte graphique et du site, et ce qui en découle pour ce dépôt.
metadata:
  type: reference
---

# Le cahier des charges SES25 — ce qu'il demande

Document source : `_references/SES25 - Révision charte graphique - cahier des charges.pdf`
(version 1.0, 8 janvier 2025, par François de la Barre et Matthieu Lemaire, pour discussion au CA
du 14 janvier 2025). Origine : le week-end stratégique du Conseil d'administration de novembre
2024.

## Partie 1 — la charte graphique

Objectifs : harmoniser l'identité visuelle du SES, et donner un guide pratique aux membres qui
produisent des documents au nom du mouvement.

À produire : logo (croix à huit pointes conservée, texte à droite adapté), palette de couleurs
liée aux valeurs du mouvement (naturel, dynamisme, tradition, lien avec la croix scoute),
typographies lisibles à l'écran, modèles de documents (circulaires, rapports d'activité,
signatures d'e-mail, présentations), et un guide de style.

Deux recommandations explicites : mener une réflexion de fond plutôt qu'un simple
rafraîchissement, et contacter l'AGSE, dont le travail récent pourrait inspirer voire être repris.

**Point de vigilance :** vérifier la légalité de l'usage du drapeau suisse dans le logo (loi et
ordonnance sur la protection des armoiries).

## Partie 2 — le site internet

**Objectif principal : la communication externe.** Une vitrine pour les publics extérieurs —
autorités, presse, futurs scouts, Église — présentant l'association et son projet éducatif, avec
un accès clair aux informations locales.

**Ce que le site ne doit pas faire :** doublonner le Drive. Le Drive (lancé en 2019) reste
l'outil de communication interne et de gestion documentaire pour les chefs. Le cahier des charges
demande de limiter la communication semi-interne sur le site, en rappelant les tentatives
précédentes qui ont échoué (site des aînés, Fatima 2018).

**Public cible nommé :** les parents — d'enfants déjà inscrits, ou de futurs scouts.

Fonctionnalités demandées :

1. Site multilingue **français et allemand**.
2. Présentation du mouvement, projet éducatif, textes fondamentaux.
3. **Carte interactive** des implantations locales.
4. Liens vers les réseaux sociaux.
5. Mise en avant des publications issues des réseaux sociaux.
6. Une arborescence de départ : *décrire notre scoutisme* (historique, branches, dimension
   européenne) — *décrire notre mouvement* (identité, formation, encadrement, ESPAS ?, Carrick ?)
   — *nous rejoindre* (implantations, contacts, carte).

Recommandations d'outillage : un CMS facile à maintenir, conforme à la protection des données
suisse, à coût raisonnable ; s'inspirer de `www.scouts-europe.org` pour la structure.

## Ce qui en découle pour ce dépôt

- **L'arborescence** du site suit celle du document, ajustée à ce qui existe réellement
  aujourd'hui : voir [source-site.md](source-site.md).
- **Le bilinguisme** est intégré dès le départ (`/fr/` et `/de/`), même si l'allemand reste à
  écrire.
- **La charte d'abord.** Le site est construit sur des variables provisoires, remplaçables en un
  fichier quand la charte arrivera : voir [design-system.md](design-system.md).
- **Le choix technique diverge du document sur un point**, assumé : le cahier des charges suggère
  un CMS type WordPress ou Wix ; ce dépôt part sur un **site statique** (Astro). Les pages sont
  des fichiers texte, publiés sous forme de fichiers simples. C'est plus sûr (rien à pirater, pas
  de mises à jour de sécurité mensuelles), moins cher à héberger, et l'édition se fait ici, avec
  Claude, en langage courant — ce qui répond au besoin réel derrière « facilité de maintenance ».
  Si le mouvement préfère malgré tout une interface d'administration classique, c'est une
  décision à prendre et à écrire, avant que le contenu ne soit repris.
- **La carte interactive** et **les publications des réseaux sociaux** ne sont pas encore
  construites. Toutes deux touchent la protection des données (une carte chargée depuis un service
  externe, un widget de réseau social, font partir des données du visiteur chez un tiers) : à
  traiter comme un choix, pas comme un détail technique.

Voir aussi [[source-site]], [[design-system]], [[state]].
