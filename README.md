# Movie App

<div align="center" style="display: inline_block">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/82a63a5b-11a0-4d02-9d4b-aee7d233778d">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/daad879f-8b68-4ff1-abe7-a7c4175d584b">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/9e7e968c-eb44-4926-b20c-2def3723314c">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/364f9ccb-98ec-40fc-bc8b-687b05f0aa7a">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/928e8efa-fdfa-4264-aee3-4ef8625c1001">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/4720631f-e901-4be7-969f-292582c5edb1">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/e0ecb08e-4148-4eb8-a9e8-9436a869b701">
</div>

## Authentication & Authorization (JWT Token)

1. Generate & approve Request Token
2. Generate Access Token

## Storage (MMKV Storage)

A Singleton class maintaining following instances:-

1. App Storage
2. User Storage ( Secured )

## Screens

1. SignIn Page
2. Home Page
3. Search Page
4. Profile Page
5. Movie's Detail Page
6. ViewAll Movies Page
7. Movie Reviews Page

## User Engagement

1. Favorites
2. Watchlist
3. Rating

## Miscellaneous

### TMDB

- A movie database (TMDB) API

### TanStack Query

TanStack Query provides a high advantage in data fetching, caching, background updates and more.

- It manages loading, error, and data states.
- It manages refetchOnWindowFocus, retry when the network request fails and staleTime.

### JWT Token ( Javascript Web Token )

- JWT tokens are signed so TMDB services are protected from token alteration
- End users are protected with token validation
- End users approve the application request token
- Encryption can be AES with a 256 bits key (token is HS256 signed with a 256 bit key).

### MMKV Storage

MMKV is a Memory Map Key Value Storage.
(developed by WeChat)

- Encryption
  - Keychain on iOS
  - Keystore on android (API 23 and above)
- Faster performance
- Lesser Memory size
