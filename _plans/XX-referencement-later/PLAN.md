# Plan XX — Être trouvé sur internet : appliquer la boîte à outils claude-seo

**Responsable :** à définir
**Date :** 2026-09-11
**Demandé par :** Perki
**Portée :** `src/layouts/`, `src/data/site.ts`, `public/robots.txt`, `scripts/publish.mjs`,
et tout ce qui touche aux adresses des pages

## Le problème, en langage courant

Une famille qui cherche « scoutisme Genève » ou « Pfadfinder Zürich » sur Google doit tomber sur
nous. C'est, concrètement, la première porte d'entrée du mouvement — avant le bouche-à-oreille
d'une paroisse ou d'une école. C'est ça, le référencement : pas une astuce, juste faire en sorte
qu'un moteur de recherche comprenne ce qu'est chaque page et à qui elle s'adresse.

Le site actuel est en ligne depuis des années et occupe cette place. **Le nouveau site doit la
reprendre sans la perdre en route.** C'est le vrai enjeu : une bascule mal faite peut faire
disparaître le mouvement des résultats de recherche pendant des mois, et personne ne s'en rend
compte avant que le téléphone arrête de sonner.

## Ce qu'est claude-seo

[`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) — une boîte à outils
gratuite qui s'ajoute à Claude Code. Elle regarde un site et dit ce qui cloche, avec 25 outils
spécialisés (technique, balises, multilingue, contenu, cartes, etc.).

Ce qu'il faut savoir avant de s'en servir :

- **Licence MIT**, donc librement utilisable. Très suivie (plus de 16 000 étoiles sur GitHub) et
  tenue à jour — dernière modification la veille de ce plan.
- **Elle tourne sur la machine**, sans rien envoyer à personne. Le cœur de l'outil ne contacte
  que le site qu'on lui demande d'analyser. C'est écrit dans son
  [PRIVACY.md](https://github.com/AgriciDaniel/claude-seo/blob/main/PRIVACY.md), et ça compte ici.
- **Des extensions payantes existent** (DataForSEO, Ahrefs, Firecrawl…). Elles envoient nos
  adresses à des sociétés tierces. **On ne les installe pas.** Rien dans ce plan n'en a besoin.
- **Elle installe Python et un navigateur de test** dans son coin. C'est du travail de
  développeur : Claude le fait, personne ici n'a de commande à taper.

**Elle est très largement surdimensionnée pour nous.** Elle est pensée pour des agences qui
suivent des sites marchands de milliers de pages. Nous avons 63 pages statiques et rien à vendre.
La stratégie ci-dessous consiste donc surtout à **choisir le petit quart qui nous concerne** et à
ignorer le reste sans culpabiliser.

## Ce qui est déjà en place — à ne pas refaire

En regardant le site construit, le travail de base est fait. Un audit va le confirmer ; autant le
savoir d'avance pour ne pas croire qu'on découvre quelque chose :

- **Les adresses du site actuel sont conservées à l'identique**, et les anciennes adresses
  bizarres de WordPress redirigent vers les bonnes. C'est, de loin, le point le plus important
  pour ne pas perdre sa place dans Google. La table fait foi :
  [`_migrations/url-map.md`](../../_migrations/url-map.md).
- **Chaque page a une adresse de référence** (`canonical`), un titre, un résumé.
- **Le bilinguisme est déclaré correctement** : chaque page dit où se trouve sa jumelle dans
  l'autre langue, dans les deux sens, avec une langue par défaut. C'est ce qui évite que Google
  prenne le français et l'allemand pour deux copies du même texte.
- **Un plan du site** est généré automatiquement, et la recherche interne fonctionne.
- **Les partages sur les réseaux sociaux** ont leur titre et leur description.

## Ce qui manque — constaté le 2026-09-11

1. **L'aperçu public est indexable par Google.** Voir le point urgent ci-dessous.
2. **Aucune fiche d'identité lisible par les machines.** Un site d'association devrait se
   déclarer comme telle — nom, adresse, contact, langues, zone desservie — dans un petit bloc de
   données que Google lit directement (`schema.org`). Nous n'en avons aucun. C'est ce qui permet
   à une recherche « scoutisme européen suisse » d'afficher une fiche à droite de l'écran.
3. **Pas d'image de partage** (`og:image`). Quand quelqu'un colle un lien du site dans WhatsApp
   ou sur Facebook, il n'y a pas de vignette. C'est déjà noté dans
   [`_memory/state.md`](../../_memory/state.md) et ça dépend de la charte
   ([plan 02](../02-charte-graphique-later/PLAN.md)).
4. **Le `robots.txt` renvoie à un plan qui n'existe plus** (`_plans/01-hebergement-et-mise-en-ligne/`,
   renommé depuis). Un détail, à corriger en passant.

## Le point urgent, qui ne dépend pas de l'outil

**L'aperçu public https://scouts-europe-suisse.github.io/website/ peut être indexé par Google
dès maintenant, et se présente comme un site à part entière.** Chaque page y déclare son adresse
de référence sur `github.io`, pas sur `scouts-europe.ch`.

Le risque : Google se retrouve avec **deux sites qui disent la même chose** — le WordPress
officiel et notre aperçu. Il en choisit un. S'il choisit l'aperçu, les visiteurs arrivent sur une
adresse `github.io` qui n'est pas le site du mouvement, et le vrai site perd des places.

Le `robots.txt` du dépôt anticipait déjà ce cas — « à passer en interdiction si le site est
publié quelque part en préparation ». Il l'est.

**Mais attention, et c'est le point technique qui compte :** un `robots.txt` n'est lu qu'à la
racine d'un domaine. Le nôtre est servi sous `/website/`, donc **les moteurs de recherche ne le
voient jamais.** Vérifié : `scouts-europe-suisse.github.io/robots.txt` n'existe pas. Interdire
l'indexation par ce fichier est donc sans effet, et il ne faut pas se rassurer à bon compte.

**La seule méthode qui marche ici** est de poser la mention « ne pas indexer » dans chaque page
au moment de construire l'aperçu — c'est-à-dire quand `npm run deploy` fabrique la version
`github.io`, et seulement dans ce cas. La version destinée au vrai domaine n'est pas touchée.
Une poignée de lignes dans [`scripts/publish.mjs`](../../scripts/publish.mjs) et le gabarit des
pages.

**Ça ne coûte rien et ça n'enlève rien** : l'aperçu reste visible pour qui a le lien. Il
disparaît seulement des résultats de recherche, ce qui est exactement ce qu'on veut d'un aperçu.

## La stratégie, dans l'ordre

### Étape 0 — Protéger l'aperçu *(à faire maintenant, sans attendre le reste)*

Poser la mention « ne pas indexer » sur l'aperçu `github.io` uniquement, comme expliqué ci-dessus.
Corriger au passage le renvoi périmé du `robots.txt`. Indépendant de claude-seo.

### Étape 1 — Installer la boîte à outils

Claude installe le greffon depuis GitHub et vérifie qu'il démarre. **Sans aucune extension
payante.** Si l'installation échoue ou réclame des comptes, on s'arrête et on en discute : rien
ici ne justifie de créer des comptes chez des prestataires.

### Étape 2 — Auditer la version locale, pas l'aperçu

On lance l'audit sur le site qui tourne en local (`http://localhost:4321`). **Pas sur
`github.io`** : l'audit y verrait les défauts de l'hébergement de test — le sous-dossier
`/website/`, les adresses de référence en `github.io` — et noierait les vrais problèmes sous des
faux.

L'audit produit un rapport et une liste d'actions classées. **On ne les applique pas toutes.**
Ce qui nous concerne se limite à quelques outils : le technique, le multilingue, les balises
`schema.org`, les images, et l'analyse page par page.

### Étape 3 — Traiter les résultats, dans cet ordre

1. **Le technique**, s'il reste quelque chose après l'étape 0.
2. **Le bilinguisme.** L'outil vérifie que chaque page pointe bien vers sa jumelle dans les deux
   sens. Deux pages françaises n'ont pas de jumelle allemande (`guides-ainees`, `fribourg`) : il
   faut s'assurer que l'outil le signale comme un manque de contenu et pas comme une erreur
   technique. C'est le [plan 04](../04-contenu-et-relecture-paused/PLAN.md) qui traite ça.
3. **La fiche d'identité `schema.org`.** Un bloc pour l'association, un pour les implantations.
   **Attention : ça demande des faits** — adresse exacte, contact, date de fondation, zone
   couverte. Voir la règle ci-dessous : on ne les invente pas.
4. **Les images** : texte de remplacement présent et utile sur chacune.

### Étape 4 — Ce qui ne peut venir qu'après la bascule du domaine

Tant que le site n'est pas sur `www.scouts-europe.ch`, ces choses-là n'ont pas de sens :

- Inscrire le site à la Search Console de Google et regarder les vraies positions.
- Vérifier que les anciennes adresses redirigent bien **en conditions réelles**.
- Mesurer la vitesse de chargement sur l'hébergement définitif.

**Ce plan dépend donc du [plan 01](../01-domaine-et-bascule-later/PLAN.md).** Tant qu'il est
parqué, on s'arrête à l'étape 3.

## Ce qu'on ne fera pas, et pourquoi

C'est la moitié utile de ce plan. La boîte à outils propose beaucoup de choses qui n'ont rien à
faire ici :

| Outil proposé | Pourquoi on l'écarte |
|---|---|
| Extensions payantes (DataForSEO, Ahrefs, Firecrawl…) | Envoient nos adresses à des sociétés tierces, et coûtent de l'argent. Aucun besoin. |
| Analyse des liens entrants (*backlinks*) | Sujet d'agence. On ne va pas démarcher des sites pour qu'ils pointent vers nous. |
| SEO pour boutique en ligne | Nous ne vendons rien. L'Économat Carrick est une page, pas une boutique. |
| Génération d'images par IA | **Interdit ici.** Les photos du site montrent des enfants réels ; la règle du dépôt est de créditer chaque photo et de ne jamais publier une image dont la licence est inconnue. Une image fabriquée par une machine n'a ni auteur ni autorisation. |
| Réécriture de contenu par l'outil | **Interdit ici.** Le contenu parle du mouvement. La règle du dépôt est de ne jamais inventer un fait — une date, un effectif, un nom — et de ne jamais présenter une traduction allemande comme validée. Un outil qui « optimise » un texte invente. |
| Fiche Google Business Profile, SEO local | Demande des comptes Google au nom du mouvement, et engage le SES. Pas une décision technique. À poser à l'équipe nationale, pas à faire en passant. |

**Et un avertissement de fond :** cette boîte à outils raisonne en anglais et pour des sites
marchands. Elle jugera nos textes français et allemands avec des critères qui ne sont pas les
nôtres — longueur, mots-clés, « signaux d'expertise ». **Ses conseils sur le contenu sont à
lire comme des suggestions, pas comme des consignes.** Ce qu'elle sait vraiment bien faire, c'est
la partie mécanique : balises, adresses, redirections, structure. C'est là qu'on l'utilise.

## Points de vigilance propres à ce dépôt

- **Le dépôt est public.** Les rapports d'audit peuvent contenir des adresses et des noms. On les
  garde hors du dépôt, ou on les relit avant de les enregistrer.
- **Aucun compte, aucune clé d'API** ne doit atterrir dans le dépôt.
- **On ne touche jamais aux adresses des pages françaises.** Elles sont celles du site actuel, et
  c'est ce qui protège notre place dans Google. Si un outil suggère de « nettoyer les URL », la
  réponse est non.

## Dépendances

- **[Plan 01 — domaine et bascule](../01-domaine-et-bascule-later/PLAN.md)** : bloque l'étape 4.
- **[Plan 02 — charte graphique](../02-charte-graphique-later/PLAN.md)** : fournit l'image de
  partage.
- **[Plan 04 — contenu et relecture](../04-contenu-et-relecture-paused/PLAN.md)** : l'allemand
  incomplet et les introductions manquantes sont aussi des sujets de référencement. On ne les
  traite pas ici, pour ne pas faire le travail en double.

## Ce que « terminé » veut dire

- L'aperçu public n'est plus indexable, et c'est vérifié sur le site en ligne, pas seulement
  dans le code.
- Un audit a été passé sur la version locale, et son rapport est lu.
- Chaque recommandation de ce rapport est soit appliquée, soit écartée **pour une raison
  écrite** — y compris « l'outil se trompe, voici pourquoi ».
- La fiche d'identité `schema.org` est en place, avec des faits confirmés par le mouvement, ou
  son report est écrit noir sur blanc.
- Ce qui dépend de la bascule du domaine est listé et rattaché au plan 01, pour ne pas être
  redécouvert le jour de la mise en ligne.
