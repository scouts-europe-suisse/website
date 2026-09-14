---
name: feedback_legendes
description: Une photo ne porte de légende que si l'ancien site en affichait une (bloc « caption » WordPress). Jamais de légende inventée, ni de description d'inventaire affichée.
metadata:
  type: feedback
---

# Les légendes des photos : uniquement celles de l'ancien site

**Décision de Nicolas, 2026-09-14 (issue #73).** « Les légendes comme "Marcheurs sur une route de
campagne" n'ont rien à faire là ! Elles n'étaient pas sur l'ancien site ! En revanche d'autres
légendes existaient, il faut les garder ! »

**La règle :** une photo reprise de l'ancien site porte une légende **si et seulement si**
l'ancien site l'affichait sous la photo (bloc « caption » de WordPress, classe
`wp-caption-text` ou `figcaption`). Un texte alternatif (`alt`) invisible n'était pas une
légende. Les descriptions écrites pendant la migration (colonne « Ce que ça montre » de
[`../_migrations/images/README.md`](../_migrations/images/README.md)) ne sont **pas** des
légendes.

**Pourquoi :** le site affiche le texte alternatif du markdown comme légende (greffon
`rehypeFigures`, issue #58). Pendant la migration, des descriptions d'inventaire avaient été
mises en `alt`, et elles sont apparues sous les photos. Une vraie légende (« En route sur le
chemin de Saint-Jacques », article Fatima) avait aussi été remplacée par une description.

**Comment l'appliquer :**
- Pour une photo reprise de l'ancien site : légende = celle de l'ancien site, mot pour mot
  (la typographie peut être corrigée, comme le reste des textes). Sinon `![](…)`, sans texte.
- Pour une photo nouvelle (Instagram, Facebook, Drive) : pas de légende, sauf si Nicolas en
  donne une.
- Ne jamais mettre en `alt` une description qu'on ne veut pas voir affichée.
- Les couvertures d'actualité n'ont pas de `coverCredit` inventé.
- Pour vérifier : le relevé se refait en lisant les anciennes pages sur www.scouts-europe.ch
  tant qu'il est en ligne (script de session, 2026-09-14 : image par image, légende réelle
  contre `alt` du markdown).

Voir aussi [[feedback_faits_du_mouvement]], [[ecrire-une-page]].
