# Outils de reprise

Des scripts, pas des sources : ils ne contiennent aucun contenu de l'ancien site, seulement la
façon de le lire. Ils ont besoin de l'export de la base, **qui ne doit pas entrer dans le
dépôt** (voir [`../README.md`](../README.md)).

## `comparer-contenu.py` — vérifier qu'aucun texte n'a été perdu

Compare, page par page, les mots de l'ancien site (lus dans la base) à ceux du nouveau (lus dans
`_build/`). Il compare les **mots**, pas la mise en forme : la question est « ce texte est-il
encore là ? », pas « est-il présenté pareil ? ».

Il signale toute page qui a perdu plus de 12 % de ses mots. Sortie du 2026-09-10 :
**55 pages comparées, 2 à regarder** — les deux étant la page sur la dimension européenne, dont
le texte historique est volontairement retenu tant que son auteur n'est pas identifié.

**À relancer avant la bascule**, et après toute reprise de contenu. C'est ce contrôle qui a
révélé qu'un témoignage entier avait disparu d'une actualité : une règle censée retenir les
citations non attribuées l'avait avalé, et le repère qu'elle laissait était lui-même effacé par
le nettoyage des balises. Rien ne se voyait à l'écran — la page semblait simplement courte.

**Les petites pertes (3 à 16 mots) sont normales** : ce sont les légendes des images retenues en
attente d'autorisation. Elles reviendront avec les images.

```bash
# depuis un dossier contenant posts_live.json et pages_live.json,
# extraits de l'export de la base
python3 comparer-contenu.py
```
