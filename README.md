# Movie App

<div align="center" style="display: inline_block">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/82a63a5b-11a0-4d02-9d4b-aee7d233778d">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/a0e27851-6b64-4031-9280-596b1be60f50">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/9e7e968c-eb44-4926-b20c-2def3723314c">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/364f9ccb-98ec-40fc-bc8b-687b05f0aa7a">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/928e8efa-fdfa-4264-aee3-4ef8625c1001">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/c16e5c38-f766-4281-b4a6-0c37e8ae11ca">
  <img height="400em" src="https://github.com/MrAbhinavMahajan/RNMovieApp/assets/98639822/377801ed-4d2d-431a-b23a-074469afb50f">
</div>

## Screens

1. SignIn Page
2. Home Page
3. Search Page
4. Profile Page
5. Movie's Detail Page
6. ViewAll Movies Page
7. Movie Reviews Page

## User Engagement

1. Favorites & Watchlist
2. Add or Remove Rating
3. Recommended Movies
4. Similar Movies

## Authentication & Authorization (JWT Tokens)

- JWT tokens are signed so TMDB services are protected from token alteration
- End users are protected with token validation
- End users approve the application request token
- Encryption can be AES with a 256 bits key (token is HS256 signed with a 256 bit key).

## Storage (MMKV Storage)

A Singleton class maintaining following instances:-

1. App Storage
2. User Storage
3. Zustand Storage

## Miscellaneous

### TMDB

- A movie database (TMDB) API

### JSX

JSX is the syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.
The root element returned by a component, should be a single element.
Using curly brackets { } we can create a portal from JSX to Javascript Expression.

### Fragment

If we don’t want to add an extra View in our hierarchy we can use an empty tag <> </> , which is also called a Fragment.

### TanStack Query

TanStack Query provides a high advantage in data fetching, caching, background updates and more.

- It manages loading, error, and data states.
- It manages refetchOnWindowFocus, retry when the network request fails and staleTime.

### JWT Token ( Javascript Web Token )

JWT represents claim mechanism between two parties.

- JWT is built with three components:
  `<Component1>.<Component2>.<Component3>`

* Component1 signifies the encryption being used.
* Component2 determines the information.
* Component3 determines the signature.

- Follows security mechanism - Public/ Private cryptography.
  (means 2 keys are generated 1 is public and 1 is private.)
- It's a Stateless Mechanism ( It's state is not stored in Database ).
- It's valid for short time durations only.

### Zustand (State Management + MMKV Storage)

Zustand is a small, fast and scaleable state-management solution for React applications with minimal boilerplate.

### MMKV Storage

MMKV is a Memory Map Key Value Storage.
(30% faster than AsyncStorage, and is developed by WeChat)

- Encryption
  - Keychain on iOS
  - Keystore on android (API 23 and above)
- Synchronous
- Faster performance
- Lesser Memory size

### WebPage

### Masking

### Animations
