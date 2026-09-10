# Images reprises du site actuel

Relevé du 2026-09-10, depuis `www.scouts-europe.ch/SiteSES/wp-content/uploads/`.
**Ce dossier est une photographie de l'existant. Rien ici n'est publié automatiquement** :
ce qui part sur le nouveau site est copié dans `public/images/`, au cas par cas.

## Emblèmes du mouvement — repris

| Fichier | Ce que c'est | Copié dans |
|---|---|---|
| `logo-SES-long-2.png` | Le logo actuel (351×134), croix scoute rouge, fleur de lys jaune, nom et croix suisse. Mis en ligne en août 2026, c'est donc la version la plus récente. | `public/images/logo-ses.png` |
| `Logo-BJ.png` | Écusson de la branche jaune (louveteaux et louvettes) | `public/images/branche-jaune.png` |
| `Logo-BV.png` | Écusson de la branche verte (éclaireurs et éclaireuses) | `public/images/branche-verte.png` |
| `Logo-BR.png` | Écusson de la branche rouge (routiers et guides-aînées) | `public/images/branche-rouge.png` |

Les couleurs du site sont **prélevées dans ces fichiers**, pas approchées à l'œil :

| Couleur | Code | Prélevée dans |
|---|---|---|
| Rouge de la croix | `#e3051a` | `logo-SES-long-2.png` |
| Jaune de la fleur de lys | `#f8e900` | `logo-SES-long-2.png` |
| Branche jaune | `#ead728` | `Logo-BJ.png` |
| Branche verte | `#2c8d1b` | `Logo-BV.png` |
| Branche rouge | `#ba1b1b` | `Logo-BR.png` |

## Photos — reprises

Aucune personne n'y est reconnaissable.

| Fichier | Sujet | Copié dans |
|---|---|---|
| `AvantDernier_DSC_0898-1-1200x514.jpg` | Drapeaux (France, Europe, Allemagne, Suisse, scout) dans les arbres | `public/images/drapeaux.jpg` — fond du bandeau d'accueil |
| `IMAG2274-1200x514.jpg` | Chapelle sur une crête, silhouettes lointaines | `public/images/chapelle-montagne.jpg` |
| `IMG_8172a-1200x514.jpg` | Montée en file, en contre-jour, visages non identifiables | `public/images/montee-silhouettes.jpg` |

## Photos — NON reprises, en attente d'une vérification

**Des mineurs y sont clairement reconnaissables.** Elles sont déjà publiées sur le site actuel,
mais cela ne dit pas qu'une autorisation parentale a été recueillie, ni qu'elle couvre encore
ces enfants aujourd'hui : les photos datent de 2016, les enfants qui y figurent sont désormais
adultes.

| Fichier | Sujet |
|---|---|
| `0047-1200x514.jpg` | Quatre louveteaux devant un feu de camp, visages nets |
| `Devenir-chef-1200x514.jpg` | Une cheftaine et deux fillettes, visages nets |
| `DSCN0566-1200x514.jpg` | Cinq guides adolescentes, visages nets |

**À faire avant d'en publier une :** demander à l'ETN Photo si les autorisations parentales
existent pour ces prises de vue. Si elles n'existent pas ou ne sont pas retrouvables, préférer
des photos où les visages ne sont pas identifiables — le site en a déjà trois qui fonctionnent.

Voir la règle photos dans [`../../CLAUDE.md`](../../CLAUDE.md).

## Images du corps des pages

Toutes les images du site actuel ont été récupérées **par SSH depuis le serveur**, et non en
aspirant le site public : c'est plus sûr pour le serveur, qui avait fini par refuser les
téléchargements en série. Elles ne sont **pas** dans le dépôt — seul ce qui sert au nouveau site
y entre.

### Comment le tri s'est fait

Sur des **recadrages à 100 %**, pas sur des vignettes. Une silhouette minuscule dans une vignette
peut redevenir un visage parfaitement reconnaissable à pleine résolution : plusieurs images qui
semblaient anodines en petit ont été écartées après ce contrôle. Les photos de groupe posées ont
toutes été écartées, même prises de loin.

### Publiées (12)

Aucun visage identifiable, ou aucune personne du tout.

| Fichier | Ce que ça montre |
|---|---|
| `rassemblement-drapeaux.jpg` | Rassemblement sous les arbres, drapeaux des pays d’Europe |
| `fatima-carte.jpg` | Carte du trajet vers Fatima |
| `fatima-budget.png` | Répartition du budget de la route vers Fatima |
| `marche-route.jpg` | Marcheurs sur une route de campagne |
| `eglise-facade.jpg` | Façade d’une église |
| `marche-foret.jpg` | Marche sur un chemin forestier |
| `eglise-interieur.jpg` | Intérieur d’une église |
| `procession-flambeaux.jpg` | Procession aux flambeaux, le soir |
| `croix-ciel.jpg` | Une croix se détachant sur le ciel |
| `pionnierage.jpg` | Installation de pionniérage |
| `crete-montagne.jpg` | Marche sur une crête |
| `route-ete.jpg` | Routiers en marche |

### En attente d'autorisation (18)

Des mineurs y sont reconnaissables. Chaque page concernée porte un commentaire **à l'endroit
exact** où l'image doit revenir : chercher `image à replacer` dans `src/content/`.

**À faire :** demander à l'ETN Photo si les autorisations parentales existent pour ces prises de
vue. Beaucoup datent de 2016 à 2018 ; les enfants qui y figurent sont aujourd'hui adultes.

| Image | Pages concernées |
|---|---|
| `2016/01/18078394070_61b4000ae4_o` | branche-rouge |
| `2016/01/DSCF1427` | branche-verte |
| `2016/01/DSC_2687` | branche-jaune |
| `2016/01/DSC_3995` | branche-verte |
| `2016/01/IMG_0974` | branche-rouge |
| `2016/01/Image_me_ZH` | que-faisons-nous |
| `2016/01/Nov_P1030695-e1454756970811` | branche-verte |
| `2016/02/A-56` | encadrement |
| `2016/02/IMG_4776` | que-faisons-nous |
| `2016/04/0044` | qui-sommes-nous |
| `2016/04/P1140040` | qui-sommes-nous |
| `2016/05/Conseil` | que-faisons-nous |
| `2016/05/DSC_0854` | encadrement |
| `2016/05/DSC_7866` | que-faisons-nous |
| `2016/05/DSC_8147` | branche-jaune |
| `2016/05/Devenir-chef` | devenir-chef |
| `2016/05/img_7322` | branche-jaune |
| `2017/10/WEKraalSESOct2017-56` | formation-des-chefs |

## Les images à la une (`_thumbnail_id`)

**Trouvées tard, et c'est instructif.** WordPress range l'image d'en-tête d'une page hors du
contenu, dans une table à part. La reprise ne lisait que le contenu : les **37** images à la une
ont donc toutes été manquées au premier passage. C'est ce qui explique qu'une page comme
« Le mouvement » arrivait sans sa photo de chapelle.

Sur ces 37 : **9 sont en place** (les trois écussons de branche, la chapelle, les drapeaux, la
marche, les logos Eurojam et Carrick), les autres sont retenues — ce sont des photos de groupe où
les visages sont nets.

**Le tri a été refait sur des recadrages à 100 %**, et il a de nouveau contredit les vignettes :
six vues « de loin » — grands rassemblements, lancers de chapeaux — laissaient parfaitement
reconnaître les visages à pleine résolution. Aucune n'est publiée.

## Le bandeau défilant

Le carrousel de la page d'accueil tourne sur **cinq** photos, celles où personne n'est
identifiable. Le carrousel du site actuel en montre davantage, mais ses vues sont des portraits
de scouts de face : elles attendent la même vérification.

## Les deux documents

Récupérés eux aussi, publiés ni l'un ni l'autre : **aucune page du site actuel ne les cite**.

| Fichier | Ce que c'est |
|---|---|
| `SES16_Fiche-LAS-…-Aout-2016.xls` | Fiche de liaison santé, version d'août 2016. Probablement périmée. |
| `LABEL_CONTACT_ESPAS_VECTOR.pdf` | Visuel ESPAS. |

À demander au mouvement : servent-ils encore ? Si oui, ils iront dans `public/documents/`.

## Ce qui n'est pas encore relevé

Ces dix fichiers sont ceux de la page d'accueil. Les pages intérieures en ont d'autres, à
inventorier lors de la reprise du contenu ([plan 03](../../_plans/03-migration-contenu-wordpress/PLAN.md)).
