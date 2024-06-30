# Movie App

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
