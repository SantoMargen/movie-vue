# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /movies`
- `GET /movies`
- `GET /movies/:movieId`
- `PUT /movies/movieId`
- `DELETE /movies/:id`
- `GET /genres`
- `GET /histories`

List endpoints Customer:

- `POST /customer/register`
- `POST /customer/login`
- `GET /customer/movies`
- `GET /customer/movies/:movieId`
- `POST /customer/bookmarks/:movieId`
- `GET /customer/bookmarks`
- `DELETE /customer/bookmarks/:bookmarkId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "phoneNumber is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "username must be unique"
}
OR
{
  "message": "Email must be unique"
}

```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "role": "string",
  "username": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

&nbsp;

## 3. POST /movies

Description:

- Add movie from database
  Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "string",
  "genreid": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 15,
  "title": "Manchester by the Sea (2019)",
  "synopsis": "Manchester by the Sea is a 2016 American drama film written and directed by Kenneth Lonergan that stars Casey Affleck, Michelle Williams, Kyle Chandler, and Lucas Hedges. The plot follows a depressed man who, after his brother dies, is entrusted with the care of the latter's teenage son.",
  "trailerUrl": "https://www.imdb.com/video/vi967947801?playlistId=tt4034228&ref_=tt_pr_ov_vi",
  "imgUrl": "https://miro.medium.com/max/1200/1*jL61HLrUowtYgOd0sHMJ4Q.jpeg",
  "rating": 5,
  "genreId": 4,
  "authorId": 4,
  "updatedAt": "2021-10-26T05:26:57.313Z",
  "createdAt": "2021-10-26T05:26:57.313Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Synopsis is required"
}
OR
{
  "message": "Synopsis is required"
}
OR
{
  "message": "Trailer is required"
}
OR
{
  "message": "ImgUrl is required"
}
OR
{
  "message": "Rating is required"
}
OR
{
  "message": "GenreId is required"
}
OR
{
  "message": "Rating minimal 1"
}
OR
{
  "message": "itle must be unique"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

&nbsp;

## 4. GET /movies

Description:

- Get all movie from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 3,
        "title": "Dunkirk (2018)",
        "synopsis": "Dunkirk portrays the evacuation with little dialogue, as Nolan sought instead to create suspense from cinematography and music. Filming began in May 2016 in Dunkirk and ended that September in Los Angeles, when post-production began. Cinematographer Hoyte van Hoytema shot the film on IMAX 65 mm and 65 mm large-format film stock. Dunkirk has extensive practical effects, and employed thousands of extras as well as historic boats from the evacuation, and period aeroplanes.",
        "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/id/1/15/Dunkirk_Film_poster.jpg",
        "rating": 5,
        "authorId": 2,
        "genreId": 2,
        "Genre": {
            "name": "Action"
        }
    },
    {
        "id": 7,
        "title": "Dunkirk (2021)",
        "synopsis": "Dunkirk portrays the evacuation with little dialogue, as Nolan sought instead to create suspense from cinematography and music. Filming began in May 2016 in Dunkirk and ended that September in Los Angeles, when post-production began. Cinematographer Hoyte van Hoytema shot the film on IMAX 65 mm and 65 mm large-format film stock. Dunkirk has extensive practical effects, and employed thousands of extras as well as historic boats from the evacuation, and period aeroplanes.",
        "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/id/1/15/Dunkirk_Film_poster.jpg",
        "rating": 5,
        "authorId": 2,
        "genreId": 2,
        "Genre": {
            "name": "Action"
        }
    }
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

&nbsp;

## 5. GET /movies/:movieId

Description:

- Get movie by id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 12,
  "title": "Manchester by the Sea",
  "synopsis": "Manchester by the Sea is a 2016 American drama film written and directed by Kenneth Lonergan that stars Casey Affleck, Michelle Williams, Kyle Chandler, and Lucas Hedges. The plot follows a depressed man who, after his brother dies, is entrusted with the care of the latter's teenage son.",
  "trailerUrl": "https://www.imdb.com/video/vi967947801?playlistId=tt4034228&ref_=tt_pr_ov_vi",
  "imgUrl": "https://miro.medium.com/max/1200/1*jL61HLrUowtYgOd0sHMJ4Q.jpeg",
  "rating": 5,
  "authorId": 1,
  "genreId": 4
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "movie Not Found"
}
```

&nbsp;

## 6. PUT /movies/:movieId

Description:

- Update Movie

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 23,
  "title": "Manchester by the Sea (2017)-",
  "synopsis": "Manchester by the Sea is a 2016 American drama film written and directed by Kenneth Lonergan that stars Casey Affleck, Michelle Williams, Kyle Chandler, and Lucas Hedges. The plot follows a depressed man who, after his brother dies, is entrusted with the care of the latter's teenage son.",
  "trailerUrl": "https://www.imdb.com/video/vi967947801?playlistId=tt4034228&ref_=tt_pr_ov_vi",
  "imgUrl": "https://miro.medium.com/max/1200/1*jL61HLrUowtYgOd0sHMJ4Q.jpeg",
  "rating": 5,
  "authorId": 1,
  "genreId": 4,
  "createdAt": "2021-10-26T07:55:38.095Z",
  "updatedAt": "2021-10-26T08:07:17.689Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Data can't be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized"
}
OR
{
    "message": "Invalid Access Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You can't acccess"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "movie Not Found"
}
```

## 7. DELETE /movies/:movieId

Description:

- Delete movie by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "messsage": "movie Manchester by the Sea (2017) success to delete"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You can't acccess"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 8. GET /genres

Description:

- Get all Genre from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Horror",
        "Movies": []
    },
    {
        "id": 2,
        "name": "Action",
        "Movies": [
            {
                "title": "Dunkirk (2017)",
                "synopsis": "Dunkirk portrays the evacuation with little dialogue, as Nolan sought instead to create suspense from cinematography and music. Filming began in May 2016 in Dunkirk and ended that September in Los Angeles, when post-production began. Cinematographer Hoyte van Hoytema shot the film on IMAX 65 mm and 65 mm large-format film stock. Dunkirk has extensive practical effects, and employed thousands of extras as well as historic boats from the evacuation, and period aeroplanes.",
                "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
                "imgUrl": "https://upload.wikimedia.org/wikipedia/id/1/15/Dunkirk_Film_poster.jpg",
                "rating": 5,
                "authorId": 1,
                "genreId": 2
            },
            {
                "title": "Legend",
                "synopsis": "Identical twin gangsters Ronald and Reginald Kray terrorize London during the 1960s",
                "trailerUrl": "https://www.imdb.com/video/vi3234116377?playlistId=tt3569230&ref_=tt_ov_vi",
                "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-legend_F5Wf2_hy5.jpg",
                "rating": 5,
                "authorId": 2,
                "genreId": 2
            },
            {
                "title": "Dunkirk (2021)",
                "synopsis": "Dunkirk portrays the evacuation with little dialogue, as Nolan sought instead to create suspense from cinematography and music. Filming began in May 2016 in Dunkirk and ended that September in Los Angeles, when post-production began. Cinematographer Hoyte van Hoytema shot the film on IMAX 65 mm and 65 mm large-format film stock. Dunkirk has extensive practical effects, and employed thousands of extras as well as historic boats from the evacuation, and period aeroplanes.",
                "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
                "imgUrl": "https://upload.wikimedia.org/wikipedia/id/1/15/Dunkirk_Film_poster.jpg",
                "rating": 5,
                "authorId": 2,
                "genreId": 2
            }
        ]
    },
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

&nbsp;

## 9. GET /histories

Description:

- Get all history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "Jungle Cruise",
    "description": "Movie with Id 11 has been updated from inactive into archive",
    "updatedBy": "admin@mail.com"
  },
  {
    "id": 2,
    "name": "Transformers (2007)",
    "description": "Movie with Id 23 has been updated from archived into inactive",
    "updatedBy": "user1@mail.com"
  },
  {
    "id": 1,
    "name": "The Lion King",
    "description": "Movie with Id 1 has been updated from inactive into archived",
    "updatedBy": "user2@mail.com"
  }
]
```

## 10. POST /customer/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "phoneNumber is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "username must be unique"
}
```

&nbsp;

## 12. POST /customer/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "role": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
}
OR
{
    "message": "Invalid Access Token"
}
```

&nbsp;

## 13. GET /customer/movies

Description:

- Get all movie from database option (title, genreId, authorId, page, size)

Request:

- headers: not needed

_Response (200 - OK, with option (title: 'a', size: 9, genreid: 2, page: 1))_

`````json
{
    "totalItems": 8,
    "movies": [
        {
            "id": 7,
            "title": "Spider-Man: No Way Home",
            "synopsis": "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.—Sony Pictures Entertainment",
            "trailerUrl": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-spyderman_ZXTAW7E8q.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:20:16.734Z",
            "updatedAt": "2021-11-09T14:20:16.734Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 8,
            "title": "Star Wars: The Force Awakens",
            "synopsis": "While the First Order continues to ravage the galaxy, Rey finalizes her training as a Jedi. But danger suddenly rises from the ashes as the evil Emperor Palpatine mysteriously returns from the dead. While working with Finn and Poe Dameron to fulfill a new mission, Rey will not only face Kylo Ren once more, but she will also finally discover the truth about her parents as well as a deadly secret that could determine her future and the fate of the ultimate final showdown that is to come.",
            "trailerUrl": "https://www.youtube.com/watch?v=sGbxmsDFVnE",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/starwars_q-0sEgtXS.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:30:10.165Z",
            "updatedAt": "2021-11-09T14:30:10.165Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 9,
            "title": "Transformers: The Last Knight",
            "synopsis": "Optimus Prime finds his dead home planet, Cybertron, in which he comes to find he was responsible for its destruction. He finds a way to bring Cybertron back to life, but in order to do so, Optimus needs to find an artifact that is on Earth.",
            "trailerUrl": "https://www.imdb.com/video/vi4102142233?playlistId=tt3371366&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-transformers_sqYr9ifLj.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:31:30.069Z",
            "updatedAt": "2021-11-09T14:31:30.069Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 12,
            "title": "Palm Dunkik (2017)",
            "synopsis": "May/June 1940. Four hundred thousand British and French soldiers are hole up in the French port town of Dunkirk. The only way out is via sea, and the Germans have air superiority, bombing the British soldiers and ships without much opposition. The situation looks dire and, in desperation, Britain sends civilian boats in addition to its hard-pressed Navy to try to evacuate the beleaguered forces. This is that story, seen through the eyes of a soldier amongst those trapped forces, two Royal Air Force fighter pilots, and a group of civilians on their boat, part of the evacuation fleet.",
            "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/dunkirk_vTXZJGDRY.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:36:00.657Z",
            "updatedAt": "2021-11-09T14:36:00.657Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 15,
            "title": "Dunkik (2017) sample",
            "synopsis": "May/June 1940. Four hundred thousand British and French soldiers are hole up in the French port town of Dunkirk. The only way out is via sea, and the Germans have air superiority, bombing the British soldiers and ships without much opposition. The situation looks dire and, in desperation, Britain sends civilian boats in addition to its hard-pressed Navy to try to evacuate the beleaguered forces. This is that story, seen through the eyes of a soldier amongst those trapped forces, two Royal Air Force fighter pilots, and a group of civilians on their boat, part of the evacuation fleet.",
            "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/dunkirk_LxTcMQsfB.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T16:44:27.948Z",
            "updatedAt": "2021-11-09T16:44:27.948Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 31,
            "title": "Venom-a",
            "synopsis": "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
            "trailerUrl": "https://www.imdb.com/video/vi1186773529?playlistId=tt1270797&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/Venom-movie_EbM-g8Gcu.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 2,
            "genreId": 2,
            "createdAt": "2021-11-10T15:08:17.522Z",
            "updatedAt": "2021-11-10T15:08:17.522Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user2"
            }
        },
        {
            "id": 33,
            "title": "The Dark Knight",
            "synopsis": "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
            "trailerUrl": "https://www.imdb.com/video/vi1186773529?playlistId=tt1270797&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/TheAvengers2012Poster_3tSWA69MH.jpg",
            "rating": 4,
            "status": "active",
            "authorId": 2,
            "genreId": 2,
            "createdAt": "2021-11-10T15:11:51.910Z",
            "updatedAt": "2021-11-10T15:11:51.910Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user2"
            }
        },
        {
            "id": 34,
            "title": "Superman: Man of Steel",
            "synopsis": "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
            "trailerUrl": "https://www.imdb.com/video/vi1186773529?playlistId=tt1270797&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/superman-man-of-steel_1yrXsdGOA.jpg",
            "rating": 4,
            "status": "active",
            "authorId": 2,
            "genreId": 2,
            "createdAt": "2021-11-10T15:14:14.211Z",
            "updatedAt": "2021-11-10T15:14:14.211Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user2"
            }
        }
    ],
    "totalPages": 1,
    "currentPage": 1
}
```
_Response (200 - OK, without option)_

````json
{
    "totalItems": 31,
    "movies": [
        {
            "id": 2,
            "title": "Venom",
            "synopsis": "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
            "trailerUrl": "https://www.imdb.com/video/vi1186773529?playlistId=tt1270797&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/Venom-movie_-bcYnJXaZWL.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T06:07:23.238Z",
            "updatedAt": "2021-11-09T06:07:23.238Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 3,
            "title": "Jungle Cruise",
            "synopsis": "Based on Disneyland's theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.",
            "trailerUrl": "https://www.imdb.com/video/vi152748057?playlistId=tt0870154&ref_=tt_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/jungle-cruise-movie_PSA--wwCo.jpg",
            "rating": 4,
            "status": "active",
            "authorId": 1,
            "genreId": 5,
            "createdAt": "2021-11-09T14:12:08.455Z",
            "updatedAt": "2021-11-09T14:12:08.455Z",
            "Genre": {
                "name": "Comedy"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 4,
            "title": "Manchester by the Sea\n",
            "synopsis": "Lee Chandler is a brooding, irritable loner who works as a handyman for a Boston apartment block. One damp winter day he gets a call summoning him to his hometown, north of the city. His brother's heart has given out suddenly, and he's been named guardian to his 16-year-old nephew. As if losing his only sibling and doubts about raising a teenager weren't enough, his return to the past re-opens an unspeakable tragedy",
            "trailerUrl": "https://www.imdb.com/video/vi967947801?playlistId=tt4034228&ref_=tt_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie2_gqkG3RUZs.jpg",
            "rating": 4,
            "status": "active",
            "authorId": 1,
            "genreId": 4,
            "createdAt": "2021-11-09T14:14:31.467Z",
            "updatedAt": "2021-11-09T14:14:31.467Z",
            "Genre": {
                "name": "Drama"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 5,
            "title": "legend",
            "synopsis": "The true story of London's most notorious gangsters, twins Reggie and Ronnie Kray. As the brothers rise through the criminal underworld, Ronnie advances the family business with violence and intimidation while Reggie struggles to go legitimate for local girl Frances Shea. In and out of prison, Ronnie's unpredictable tendencies and the slow disintegration of Reggie's marriage threaten to bring the brothers' empire tumbling to the ground.",
            "trailerUrl": "https://www.imdb.com/video/vi3234116377?playlistId=tt3569230&ref_=tt_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie2_X5W5ge-kVGj.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:15:58.555Z",
            "updatedAt": "2021-11-09T14:15:58.555Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 6,
            "title": "Sonic the Hedgehog",
            "synopsis": "Based on the global blockbuster videogame franchise from Sega, SONIC THE HEDGEHOG tells the story of the world's speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend Tom (James Marsden) team up to defend the planet from the evil genius Dr. Robotnik (Jim Carrey) and his plans for world domination. The family-friendly film also stars Tika Sumpter and Ben Schwartz as the voice of Sonic.",
            "trailerUrl": "https://www.imdb.com/video/vi3662921497?playlistId=tt3794354&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie2_AgWNE0oxK.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 3,
            "createdAt": "2021-11-09T14:17:11.556Z",
            "updatedAt": "2021-11-09T14:17:11.556Z",
            "Genre": {
                "name": "Fantasy"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 7,
            "title": "Spider-Man: No Way Home",
            "synopsis": "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.—Sony Pictures Entertainment",
            "trailerUrl": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-spyderman_ZXTAW7E8q.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:20:16.734Z",
            "updatedAt": "2021-11-09T14:20:16.734Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 8,
            "title": "Star Wars: The Force Awakens",
            "synopsis": "While the First Order continues to ravage the galaxy, Rey finalizes her training as a Jedi. But danger suddenly rises from the ashes as the evil Emperor Palpatine mysteriously returns from the dead. While working with Finn and Poe Dameron to fulfill a new mission, Rey will not only face Kylo Ren once more, but she will also finally discover the truth about her parents as well as a deadly secret that could determine her future and the fate of the ultimate final showdown that is to come.",
            "trailerUrl": "https://www.youtube.com/watch?v=sGbxmsDFVnE",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/starwars_q-0sEgtXS.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:30:10.165Z",
            "updatedAt": "2021-11-09T14:30:10.165Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        },
        {
            "id": 9,
            "title": "Transformers: The Last Knight",
            "synopsis": "Optimus Prime finds his dead home planet, Cybertron, in which he comes to find he was responsible for its destruction. He finds a way to bring Cybertron back to life, but in order to do so, Optimus needs to find an artifact that is on Earth.",
            "trailerUrl": "https://www.imdb.com/video/vi4102142233?playlistId=tt3371366&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-transformers_sqYr9ifLj.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "createdAt": "2021-11-09T14:31:30.069Z",
            "updatedAt": "2021-11-09T14:31:30.069Z",
            "Genre": {
                "name": "Action"
            },
            "User": {
                "username": "user1"
            }
        }
    ],
    "totalPages": 4,
    "currentPage": 0
}
```
&nbsp;

## 14. GET /customer/movies/:movieId

Description:

- Get detail movie by id from database

Request:

- headers: not needed
_Response (200 - OK)_

```json
{
    "id": 5,
    "title": "legend",
    "synopsis": "The true story of London's most notorious gangsters, twins Reggie and Ronnie Kray. As the brothers rise through the criminal underworld, Ronnie advances the family business with violence and intimidation while Reggie struggles to go legitimate for local girl Frances Shea. In and out of prison, Ronnie's unpredictable tendencies and the slow disintegration of Reggie's marriage threaten to bring the brothers' empire tumbling to the ground.",
    "trailerUrl": "https://www.imdb.com/video/vi3234116377?playlistId=tt3569230&ref_=tt_ov_vi",
    "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie2_X5W5ge-kVGj.jpg",
    "rating": 5,
    "status": "active",
    "authorId": 1,
    "genreId": 2,
    "Genre": {
        "name": "Action"
    },
    "User": {
        "username": "user1"
    }
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Movie Not Found"
}
```
&nbsp;


## 15. POST /bookmarks/:movieId

Description:

- Add Bokkmark from database
  Request:

- params: 
{
  "movieId": "Number"
}

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": 7,
    "title": "Spider-Man: No Way Home",
    "synopsis": "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.—Sony Pictures Entertainment",
    "trailerUrl": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
    "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-spyderman_ZXTAW7E8q.jpg",
    "rating": 5,
    "status": "active",
    "authorId": 1,
    "genreId": 2
}
```
_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Access Token"
}
```
_Response (403 - Forbidden)_

```json
{
    "message": "Sorry, Only 'Customer' can acccess"
}
```

_Response (404 - NotFound)_

```json
{
    "message": "Movie Not Found"
}
```
&nbsp;

## 16. GET /bookmarks

Description:

- Get all Bokkmark with user login from database
  Request:
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
[
    {
        "id": 5,
        "movieId": 2,
        "customerId": 1,
        "Movie": {
            "title": "Venom",
            "synopsis": "A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.",
            "trailerUrl": "https://www.imdb.com/video/vi1186773529?playlistId=tt1270797&ref_=tt_pr_ov_vi",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/Venom-movie_-bcYnJXaZWL.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "User": {
                "username": "user1"
            }
        }
    },
    {
        "id": 6,
        "movieId": 7,
        "customerId": 1,
        "Movie": {
            "title": "Spider-Man: No Way Home",
            "synopsis": "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.—Sony Pictures Entertainment",
            "trailerUrl": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-spyderman_ZXTAW7E8q.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "User": {
                "username": "user1"
            }
        }
    },
    {
        "id": 7,
        "movieId": 7,
        "customerId": 1,
        "Movie": {
            "title": "Spider-Man: No Way Home",
            "synopsis": "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.—Sony Pictures Entertainment",
            "trailerUrl": "https://www.youtube.com/watch?v=rt-2cxAiPJk",
            "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/movie-spyderman_ZXTAW7E8q.jpg",
            "rating": 5,
            "status": "active",
            "authorId": 1,
            "genreId": 2,
            "User": {
                "username": "user1"
            }
        }
    }
]
```
_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Access Token"
}
```
_Response (403 - Forbidden)_

```json
{
    "message": "Sorry, Only 'Customer' can acccess"
}
```
&nbsp;

## 16. DELETE /customer/bookmarks/:bookmarkId

Description:

- Get all Bokkmark with user login from database
  Request:
- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - Ok)_

```json
{
    "message": "You'r bookmark has been remove"
}
```
_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Access Token"
}
```
_Response (403 - Forbidden)_

```json
{
    "message": "Can't Access because not your's"
}
```
_Response (404 - NotFound)_

```json
{
    "message": "Bookmark Not Found"
}
```

&nbsp;

## 17. GET /customer/bookmarks/:bookmarkId

- Get allDetail Bokkmark with user login from database
  Request:
- headers:

```json
{
  "access_token": "string"
}
```
_Response (200 - Ok)_

```json
{
    "id": 9,
    "movieId": 21,
    "customerId": 2,
    "Movie": {
        "title": "Testing3",
        "synopsis": "May/June 1940. Four hundred thousand British and French soldiers are hole up in the French port town of Dunkirk. The only way out is via sea, and the Germans have air superiority, bombing the British soldiers and ships without much opposition. The situation looks dire and, in desperation, Britain sends civilian boats in addition to its hard-pressed Navy to try to evacuate the beleaguered forces. This is that story, seen through the eyes of a soldier amongst those trapped forces, two Royal Air Force fighter pilots, and a group of civilians on their boat, part of the evacuation fleet.",
        "trailerUrl": "https://www.imdb.com/video/vi3402283289?playlistId=tt5013056&ref_=tt_pr_ov_vi",
        "imgUrl": "https://ik.imagekit.io/vldqjlthtc3/mustbe-crazy-movie_Xo9iqAB89.jpg",
        "rating": 5,
        "status": "active",
        "authorId": 1,
        "genreId": 4,
        "User": {
            "username": "user1"
        },
        "Genre": {
            "name": "Drama"
        }
    }
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Access Token"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Can't Access because not your's"
}
```

_Response (404 - NotFound)_

```json
{
    "message": "Bookmark Not Found"
}
```





&nbsp;
## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
`````
