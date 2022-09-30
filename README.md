# Data Platform Project Setup

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README

## 1. Overview

Medium’s API is a JSON-based OAuth2 API. All requests are made to endpoints beginning:
`https://api.medium.com/v1`

All requests must be secure, i.e. `https`, not `http`.

#### Developer agreement

By using Medium’s API, you agree to our [terms of service](https://medium.com/@feerst/2b405a832a2f).


## 2. Resources

The API is RESTful and arranged around resources. All requests must be made with an integration token. All requests must be made using `https`.

Typically, the first request you make should be to acquire user details. This will confirm that your access token is valid, and give you a user id that you will need for subsequent requests.

### 2.1. Users

#### Getting the authenticated user’s details
Returns details of the user who has granted permission to the application.

```
GET https://api.medium.com/v1/me
```

Example request:

```
GET /v1/me HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8
```

The response is a User object within a data envelope.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": "5303d74c64f66366f00cb9b2a94f3251bf5",
    "username": "majelbstoat",
    "name": "Jamie Talbot",
    "url": "https://medium.com/@majelbstoat",
    "imageUrl": "https://images.medium.com/0*fkfQiTzT7TlUGGyI.png"
  }
}
```

Where a User object is:

| Field      | Type   | Description                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | A unique identifier for the user.               |
| username   | string | The user’s username on Medium.                  |
| name       | string | The user’s name on Medium.                      |
| url        | string | The URL to the user’s profile on Medium         |
| imageUrl   | string | The URL to the user’s avatar on Medium          |

Possible errors:

| Error code           | Description                                     |
| ---------------------|-------------------------------------------------|
| 401 Unauthorized     | The `accessToken` is invalid or has been revoked. |


### 2.2. Publications

#### Listing the user’s publications

Returns a full list of publications that the user is related to in some way: This includes all publications the user is subscribed to, writes to, or edits. This endpoint offers a set of data similar to what you’ll see at https://medium.com/me/publications when logged in.

The REST API endpoint exposes this list of publications as a collection of resources under the user. A request to fetch a list of publications for a user looks like this:

```
GET https://api.medium.com/v1/users/{{userId}}/publications
```

The response is a list of publication objects. An empty array is returned if user doesn’t have relations to any publications. The response array is wrapped in a data envelope. This endpoint will return all publications in which a user has a role of "editor" or "writer" along with a maximum of 200 other publications the user follows or has other relationships with.

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": [
    {
      "id": "b969ac62a46b",
      "name": "About Medium",
      "description": "What is this thing and how does it work?",
      "url": "https://medium.com/about",
      "imageUrl": "https://cdn-images-1.medium.com/fit/c/200/200/0*ae1jbP_od0W6EulE.jpeg"
    },
    {
      "id": "b45573563f5a",
      "name": "Developers",
      "description": "Medium’s Developer resources",
      "url": "https://medium.com/developers",
      "imageUrl": "https://cdn-images-1.medium.com/fit/c/200/200/1*ccokMT4VXmDDO1EoQQHkzg@2x.png"
    }
  ]
}
```

Where a Publication object is:

| Field       | Type   | Description                                     |
| ------------|--------|-------------------------------------------------|
| id          | string | A unique identifier for the publication.        |
| name        | string | The publication’s name on Medium.               |
| description | string | Short description of the publication            |
| url         | string | The URL to the publication’s homepage           |
| imageUrl    | string | The URL to the publication’s image/logo         |

Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 401 Unauthorized     | The `accessToken` is invalid, lacks the `listPublications` scope or has been revoked. |
| 403 Forbidden        | The request attempts to list publications for another user.                           |


#### Fetching contributors for a publication

This endpoint returns a list of contributors for a given publication. In other words, a list of Medium users who are allowed to publish under a publication, as well as a description of their exact role in the publication (for now, either an editor or a writer). The API endpoint exposes the contributors as list of resources under a publication. An example request looks like this:

```
GET https://api.medium.com/v1/publications/{{publicationId}}/contributors
```

In the response, each contributor is represented with the ID of the publication, the ID of the user as well as the role of this user in this publication. An example response looks like this:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": [
    {
      "publicationId": "b45573563f5a",
      "userId": "13a06af8f81849c64dafbce822cbafbfab7ed7cecf82135bca946807ea351290d",
      "role": "editor"
    },
    {
      "publicationId": "b45573563f5a",
      "userId": "1c9c63b15b874d3e354340b7d7458d55e1dda0f6470074df1cc99608a372866ac",
      "role": "editor"
    },
    {
      "publicationId": "b45573563f5a",
      "userId": "1cc07499453463518b77d31650c0b53609dc973ad8ebd33690c7be9236e9384ad",
      "role": "editor"
    },
    {
      "publicationId": "b45573563f5a",
      "userId": "196f70942410555f4b3030debc4f199a0d5a0309a7b9df96c57b8ec6e4b5f11d7",
      "role": "writer"
    },
    {
      "publicationId": "b45573563f5a",
      "userId": "14d4a581f21ff537d245461b8ff2ae9b271b57d9554e25d863e3df6ef03ddd480",
      "role": "writer"
    }
  ]
}
```

Where a contributor is:

| Field         | Type   | Description                                                                                                |
| --------------|--------|------------------------------------------------------------------------------------------------------------|
| publicationId | string | An ID for the publication. This can be lifted from response of publications above                          |
| userId        | string | A user ID of the contributor.                                                                              |
| role          | string | Role of the user identified by userId in the publication identified by publicationId. 'editor' or 'writer' |

Possible errors:

| Error code           | Description                                                                           |
| ---------------------|---------------------------------------------------------------------------------------|
| 401 Unauthorized     | The `accessToken` is invalid, or has been revoked.                                    |

### 3.3. Posts

#### Creating a post
Creates a post on the authenticated user’s profile.

```
POST https://api.medium.com/v1/users/{{authorId}}/posts
```

Where authorId is the user id of the authenticated user.

Example request:

```
POST /v1/users/5303d74c64f66366f00cb9b2a94f3251bf5/posts HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "title": "Liverpool FC",
  "contentFormat": "html",
  "content": "<h1>Liverpool FC</h1><p>You’ll never walk alone.</p>",
  "canonicalUrl": "http://jamietalbot.com/posts/liverpool-fc",
  "tags": ["football", "sport", "Liverpool"],
  "publishStatus": "public"
}
```

With the following fields:

| Parameter       | Type         | Required?  | Description                                     |
| -------------   |--------------|------------|-------------------------------------------------|
| title           | string       | required   | The title of the post. Note that this title is used for SEO and when rendering the post as a listing, but will not appear in the actual post—for that, the title must be specified in the `content` field as well. Titles longer than 100 characters will be ignored. In that case, a title will be synthesized from the first content in the post when it is published.  |
| contentFormat   | string       | required   | The format of the "content" field. There are two valid values, "html", and "markdown" |
| content         | string       | required   | The body of the post, in a valid, semantic, HTML fragment, or Markdown. Further markups may be supported in the future. For a full list of accepted HTML tags, see [here](https://medium.com/@katie/a4367010924e). If you want your title to appear on the post page, you must also include it as part of the post content.                |
| tags            | string array | optional   | Tags to classify the post. Only the first three will be used. Tags longer than 25 characters will be ignored.                                        |
| canonicalUrl    | string       | optional   | The original home of this content, if it was originally published elsewhere.                         |
| publishStatus   | enum         | optional   | The status of the post. Valid values are “public”, “draft”, or “unlisted”. The default is “public”.  |
| license         | enum         | optional   | The license of the post. Valid values are “all-rights-reserved”, “cc-40-by”, “cc-40-by-sa”, “cc-40-by-nd”, “cc-40-by-nc”, “cc-40-by-nc-nd”, “cc-40-by-nc-sa”, “cc-40-zero”, “public-domain”. The default is “all-rights-reserved”. |
| notifyFollowers | bool         | optional   | Whether to notifyFollowers that the user has published. |

The response is a Post object within a data envelope. Example response:

```
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "id": "e6f36a",
    "title": "Liverpool FC",
    "authorId": "5303d74c64f66366f00cb9b2a94f3251bf5",
    "tags": ["football", "sport", "Liverpool"],
    "url": "https://medium.com/@majelbstoat/liverpool-fc-e6f36a",
    "canonicalUrl": "http://jamietalbot.com/posts/liverpool-fc",
    "publishStatus": "public",
    "publishedAt": 1442286338435,
    "license": "all-rights-reserved",
    "licenseUrl": "https://medium.com/policy/9db0094a1e0f"
  }
}
```

Where a Post object is:

| Field         | Type         | Description                                     |
| --------------|--------------|-------------------------------------------------|
| id            | string       | A unique identifier for the post.               |
| title         | string       | The post’s title                                |
| authorId      | string       | The userId of the post’s author                 |
| tags          | string array | The post’s tags                                 |
| url           | string       | The URL of the post on Medium                   |
| canonicalUrl  | string       | The canonical URL of the post. If canonicalUrl was not specified in the creation of the post, this field will not be present.  |
| publishStatus | string       | The publish status of the post.                 |
| publishedAt   | timestamp    | The post’s published date. If created as a draft, this field will not be present.                                              |
| license       | enum         | The license of the post.                        |
| licenseUrl    | string       | The URL to the license of the post.             |

Possible errors:

| Error code           | Description                                                                                                          |
| ---------------------|----------------------------------------------------------------------------------------------------------------------|
| 400 Bad Request      | Required fields were invalid, not specified.                                                                         |
| 401 Unauthorized     | The access token is invalid or has been revoked.                                                                     |
| 403 Forbidden        | The user does not have permission to publish, or the authorId in the request path points to wrong/non-existent user. |

#### Creating a post under a publication
This API allows creating a post and associating it with a publication on Medium. The request also shows this association, considering posts a collection of resources under a publication:

```
POST https://api.medium.com/v1/publications/{{publicationId}}/posts
```

Here `publicationId` is the id of the publication the post is being created under. The `publicationId` can be acquired from the API for listing user’s publications.

Example request:

```
POST /v1/publications/b45573563f5a/posts HTTP/1.1
Host: api.medium.com
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
Content-Type: application/json
Accept: application/json
Accept-Charset: utf-8

{
  "title": "Hard things in software development",
  "contentFormat": "html",
  "content": "<p>Cache invalidation</p><p>Naming things</p>",
  "tags": ["development", "design"],
  "publishStatus": "draft"
}
```

The definition of request data is equal to the regular call to create a post above. The response is identical except for adding one additional field:

| Field         | Type         | Description                                                                                                            |
| --------------|--------------|------------------------------------------------------------------------------------------------------------------------|
| publicationId | string       | ID of the publication this post was created under. This matches the publication ID requested in the URL of the request |

There are additional rules around publishing that each request to this API must respect:
- If the authenticated user is an 'editor' for the publication, they can create posts with any publish status. Posts published as 'public' or 'unlisted' will appear in collection immediately, while posts created as 'draft' will remain in pending state under publication.
- If the authenticated user is a 'writer' for the chosen publication, they can only create a post as a 'draft'. That post will remain in pending state under publication until an editor for the publication approves it.
- If the authenticated user is neither a 'writer' nor an 'editor', they are not allowed to create any posts in a publication.

Possible errors:

| Error code           | Description                                                                                        |
| ---------------------|----------------------------------------------------------------------------------------------------|
| 400 Bad Request      | Required fields were invalid, not specified.                                                       |
| 401 Unauthorized     | The access token is invalid or has been revoked.                                                   |
| 403 Forbidden        | The `publicationId` in request path doesn’t point to a publication that the user can publish into. |




## 4. Testing

We do not have a sandbox environment yet. To test, please feel free to create a testing account. *We recommend you do this by registering using an email address rather than Facebook or Twitter, as registering with the latter two automatically creates follower relationships on Medium between your connections on those networks.*

These endpoints will perform actions on production data on `medium.com`. **Please test with care.**
