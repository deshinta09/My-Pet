[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13816291&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

My Pet API Documentation

## Endpoint :
List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /communities`
- `POST /communities`
- `GET /posts/:id`


## 1. POST /register
Description:
- Post user to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "imageUrl": "string"
}
```

_Response (201 - OK)_
```json
{
  "id": "integer",
  "email": "string",
  "username": "string",
  "imageUrl": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email must be type email"
}
OR
{
  "message": "Username is require"
}
OR
{
  "message": "Password is require"
}
```
&nbsp;

## 2. LOGIN /login
Description:
- Post login from database

- body
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_
```json
{
  "access_token": "string"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Email must be type email"
}
OR
{
  "message": "Password is require"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "error invalid email or password"
}
```
&nbsp;


## 3. GET /communities
Description:
- Get all communities from database

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
        "name": "Wildlife Conservation Society",
        "imageUrl": "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "description": "Bergabunglah dalam upaya pelestarian alam dan perlindungan satwa liar di seluruh dunia.",
        "userId": 3,
        "createdAt": "2024-02-14T02:46:39.047Z",
        "updatedAt": "2024-02-14T02:46:39.047Z"
    },
  ...,
]
```

&nbsp;


## 4. POST /communities
Description:
- Post communities to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
    "name": "Wildlife Conservation Society",
    "imageUrl": "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Bergabunglah dalam upaya pelestarian alam dan perlindungan satwa liar di seluruh dunia."
}
```

_Response (201 - OK)_
```json
{
    "id": 3,
    "name": "Wildlife Conservation Society",
    "imageUrl": "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Bergabunglah dalam upaya pelestarian alam dan perlindungan satwa liar di seluruh dunia.",
    "userId": 3,
    "createdAt": "2024-02-14T02:46:39.047Z",
    "updatedAt": "2024-02-14T02:46:39.047Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is require"
}
OR
{
  "message": "Description is require"
}
&nbsp;


## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
&nbsp;

## 5. GET /posts/:id
Description:
- Get post by community from database

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
[
    {
        "id": 1,
        "title": "Mengagumi Keindahan Alam",
        "imageUrl": "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8em9vfGVufDB8fDB8fHww",
        "message": "Hari ini saya pergi ke kebun binatang dan terpesona dengan keindahan alam dan keunikkan setiap hewan. Berbagi foto-foto keseruan saya di sana!",
        "CommunityId": 2,
        "userId": 2,
        "createdAt": "2024-02-14T02:46:39.063Z",
        "updatedAt": "2024-02-14T02:46:39.063Z"
    },
  ...,
]
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```
&nbsp;



