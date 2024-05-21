# movie-recommendation


Front stack:
React 18.3.1
Typescript 4.9.5

react with Typescript
Back stack:
PostgreSQL 16.3.1
Spring boot 3.2.5
Java 17
Lombok, Hibernate
Python 3.12.3
Docker
Cron-job to ping the app every 10 minutes
Deployed on render

At first I was trying to make a movie-rental application but I thought it was pretty pointless considering I had no need for it at all.
After a bit of thinking I endend up with the diea of making a movie-recommendation app which I could even use for myself.
This way I can put more effort and passion into this project since it can solve a use for me.

TODO :
- check si API_TOKEN est needed dans le back
- faire une fonction qui call chaque semaine l'api avec /movie/latest et store ça dans la database?
NEW_MOVIES_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key={}&language=en-US&page=1'

3 api request : movie details + credits + image
                clic sur l'acteur:  https://api.themoviedb.org/3/person/person_id/movie_credits?api_key=### et surement taper sur movie/movie_id

                faire une fonction qui chaque semaine tape dans les "now playing de l'api et store ça en database
                 
- faire des petits boutons "popular", "recent", "upcoming" qui call l'api et qui fetch dans la db
    * popular: order by popularity DESC => store popularity
    * latest/now playing: order by release_date DESC => store relase_date OK
    * upcoming: a voir comment faire, peut etre juste released_date > today && order by release_date DESC
    * Top rated: order by vote_average DESC => store vote_average OK

- pour les actor, mon script peut, pour chauqe film, recuperer tous les credits avec le movie id. ensuite
on filtre par Acting et on store obligatoirement popularity, actor_id, name, profile_path, character
https://image.tmdb.org/t/p/original/ulbVvuBToBN3aCGcV028hwO0MOP.jpg

"adult": false,
      "gender": 2,
      "id": 4029,
      "known_for_department": "Acting",
      "name": "Bob Gunton",
      "original_name": "Bob Gunton",
      "popularity": 30.764,
      "profile_path": "/ulbVvuBToBN3aCGcV028hwO0MOP.jpg",
      "cast_id": 5,
      "character": "Warden Norton",
      "credit_id": "52fe4231c3a36847f800b139",
      "order": 2


- sur la movie page, on tape l'api pour avoir toutes les infos, on retape l'api pour avoir la liste d'acteurs, au clic sur l'acteur on arrive sur la page acteur on peut aussi taper l'api pour avoir sa liste de films, et enfin retaper l'api pour retrieve les films dans la database

- store les movie_ids dans la bdd en modifiant le script python

- recently released movies below, scroll down to load another âge (no next or previous page button, jsut expand the list vertically)
- in the header, sign up/log in on the far right
- on the left, popular movies / search by genre / search by language spoken
- filtre de recherche qui fait une requete a chaque input  et qui filtre sur els titres contenant la string
- un truc marrant : proposer 3 movies pour la soirée de genres différents avec une animation marrante un peu genre casino
- une fois le compte créé, mettre en place un système de favoris, et enfin un système de recommendation de movies:
    * basé sur une lsit de movie_id sur les favoris d'un utilisateur
    * taper sur recommednations de tmdb qui va donner une lsite de recommednations pour chauqe id, agréger les données
    * mettre en place plusieurs filtres (fréquence, similarité) puis mettre un poids sur ces filtres, les trier par poids et retourner les 20 plus hauts notés

use spring seucirty to build authentication feature in front and back
build a cart feature for each user

to get the credits of a movie, call the /credits method. To get the details about a specific person, call the /person/{id} method.

use postman
build api 
to unit testing with junit / mockito



Key challenges in this project include integrating with a movie API to fetch real-time data, designing an intuitive and visually appealing user interface, implementing navigation between different pages efficiently, managing state and data flow within the React components, and incorporating bonus features like user authentication, watchlists, and review functionalities seamlessly into the app.
