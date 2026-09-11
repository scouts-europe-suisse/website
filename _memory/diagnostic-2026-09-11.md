---
name: diagnostic-2026-09-11
description: Diagnostic du site avant la refonte visuelle (plan 05) — ce qui est bon, ce qui fait amateur, les priorités
metadata:
  type: project
---

# Diagnostic du 2026-09-11, avant la refonte visuelle

Fait par Claude à la demande de Nicolas, en lecture seule, sur la version locale. Sert de point de
départ au plan 05. Les sections « à garder » disent ce que la refonte ne doit pas casser.

## À garder tel quel

- L'architecture Astro : une route unique, un gabarit, des collections validées par schéma.
- Le bilinguisme par `key`, les adresses françaises, les 50 redirections.
- Le script de publication et ses garde-fous (branche `gh-pages`, préfixe des adresses, noindex),
  le mode préparation/production par `SES_SITE_MODE`.
- Les fondations d'accessibilité : lien d'évitement, repères, focus visible, mouvement réduit.
  Lighthouse : accessibilité 96 mobile, 100 desktop.
- Les polices auto-hébergées, la colonne de lecture de 704 px à 17 px.
- Les couleurs de branche et le rouge de la croix. Le contenu de `src/content/`.

## Ce qui fait amateur

- **Titres plats** : h1 maigre à 30 px, h2 et h3 à la taille du texte. Une page longue se lit
  comme un document Word.
- **Feuille blanche sur fond beige** avec ombre, et **barre de menu anthracite** séparée de
  l'en-tête : deux motifs WordPress datés.
- **Carrousel muet** : six photos qui défilent sans titre ni appel à l'action.
- **Accueil sans parcours** : rien vers les implantations, rien pour devenir chef, rien sur
  l'Europe ni les réseaux.
- **Composants hétérogènes** : trois cartes codées à part, un seul bouton, liens rouges nus.
- **Rubriques vides** : « Notre scoutisme », « Le mouvement », « Nous rejoindre » n'ont qu'une
  image et une grille de liens.
- **Contact** réduit à un bouton mail avec un grand vide ; **404** en français seulement ; logo
  Carrick affiché à 1000 px.
- **Pied de page** pauvre : ni réseaux, ni implantations, ni UIGSE.
- **Mobile** : sous 640 px, ni langue, ni recherche, ni réseaux.
- **Allemand** : titre d'onglet et pied de page restent en français ; le bandeau « traduction non
  relue » n'apparaît jamais car aucun fichier ne porte `translated` ; actualités vides.
- **Identité** : rouge, jaune et écussons présents mais ensemble neutre et gris, sans photo grand
  format, sans matière graphique scoute.
- **Crédibilité** : pas de chiffres, pas d'affiliation visible, pas de schema.org, pas d'image
  de partage.

## Défauts techniques relevés

- Lien vers l'autre langue avec double barre (`/de//`, `/fr//`), aussi dans le hreflang.
- `pageKey="news-index"` ne correspond à aucune page : pas de bascule de langue sur l'index des
  actualités.
- `imageSize()` en double (`astro.config.mjs` et `src/lib/imageSize.ts`) ; libellés de branche
  écrits trois fois.
- `coverCredit` optionnel dans le schéma alors que la règle dit obligatoire ; les pages n'ont
  aucun champ de crédit.
- Pastilles du carrousel trop petites au doigt.
- Documentation périmée : `local-dev-and-deploy.md` (« pas de script de publication »),
  `state.md` (carte « à construire », dépôt « privé »), commentaires de `global.css` (Open Sans)
  et du `Footer` (réseaux « pas renseignés »), `CLAUDE.md` (`robots.txt` dans `public/`).

## Priorités proposées

1. Hero et accueil avec message et appels à l'action.
2. Échelle de titres réelle.
3. En-tête unifié, fin de la feuille blanche, langue accessible sur mobile.
4. `translated: false` posé, double barre et index des actualités corrigés.
5. Système de composants unique ; pied de page riche ; « Nous rejoindre » et contact refaits.
6. Jetons manquants (rayons, ombres, points de rupture) branchés dans Tailwind.
7. `og:image`, schema.org, crédits photo visibles, nettoyage des doublons et de la doc.
