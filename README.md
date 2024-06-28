# Movie App

## TanStack Query

TanStack Query provides a high advantage in data fetching, caching, background updates and more.

- It manages loading, error, and data states.
- It manages refetchOnWindowFocus, retry when the network request fails and staleTime.

## Authentication & Authorization

1. Generate Request Token
2. Approve Request Token
3. Generate Access Token

### JWT Token ( Javascript Web Token )

- JWT tokens are signed so TMDB services are protected from token alteration
- End users are protected with token validation
- End users approve the application request token
- Encryption can be AES with a 256 bits key (token is HS256 signed with a 256 bit key).

## Secured Storage ( MMKV Storage)

MMKV is a Memory Map Key Value Storage.
(developed by WeChat)

- Encryption
  - Keychain on iOS
  - Keystore on android (API 23 and above)
- Faster performance
- Lesser Memory size

## Screens

1. SignIn Screen
2. HomeScreen
3. Search Screen
4. Profile Screen
5. Movie's Detail Screen
6. Movie's ViewAll Screen
7. Movie's Favorite Screen
8. Movie's Watchlist Screen
