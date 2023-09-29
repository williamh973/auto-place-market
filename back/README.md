# Guide d'utilisation

Ce projet est la partie backend d'une communication client/server qui implémente le JWT. Le repository de la partie front se trouve ici : https://github.com/WildCodeSchool/-0423-BDX-POEC-SPRING-jwt-front. L'application utilise une base de données avec `MySQL`.

Il permet : 
- De créer une utilisateur
- De connecter un utilisateur
- D'attribuer un rôle à un utilisateur (USER ou ADMIN)
- De sécuriser l'accès à certaines ressources via le JWT 

Pour utiliser ce projet, `git clone`, se rendre dans le projet Spring et installer les dépendances (automatique). Créer une `base de données`. Dans le fichier `application.properties` : 
- Lier JDBC avec la base de données ;
- Créer les variables d'environnement : Mysql username, Mysql password, JWT secret key.

## Navigation
- [User](#user)
- [Auth](#auth)
- [Démo](#démo)
- [Filters](#filters)
- [Config](#config)

## User

### 👉 User (classe)

La classe `User` représente un utilisateur dans l'application.

#### Classe

La classe est définie dans le fichier `User.java` et elle est annotée avec `@Entity` pour indiquer qu'elle est une entité persistante dans le framework Jakarta Persistence.

Elle contient les champs suivants :

- `id` : l'identifiant de l'utilisateur (généré automatiquement à l'aide de `@GeneratedValue`).
- `firstname` : le prénom de l'utilisateur.
- `lastname` : le nom de famille de l'utilisateur.
- `email` : l'adresse email de l'utilisateur.
- `password` : le mot de passe de l'utilisateur (ignoré lors de la sérialisation JSON grâce à `@JsonIgnore`).
- `role` : le rôle de l'utilisateur.

Elle implémente l'interface `UserDetails` du framework Spring Security pour gérer les détails de l'utilisateur.

#### Dépendances

La classe utilise les dépendances suivantes :

- `GrantedAuthority` : une interface du framework Spring Security pour représenter les autorités d'un utilisateur.
- `SimpleGrantedAuthority` : une implémentation de `GrantedAuthority` pour représenter une autorité simple.
- `Collection` : une interface Java pour représenter une collection d'éléments.
- `List` : une implémentation de `Collection` pour représenter une liste ordonnée.

#### Méthodes

La classe `User` implémente les méthodes suivantes de l'interface `UserDetails` :

##### `getAuthorities()`

Cette méthode retourne la liste des autorités de l'utilisateur. Dans ce cas, une seule autorité est ajoutée, représentant le rôle de l'utilisateur.

##### `getUsername()`

Cette méthode retourne le nom d'utilisateur de l'utilisateur, qui est équivalent à l'adresse email.

##### `isAccountNonExpired()`

Cette méthode retourne toujours `true`, indiquant que le compte de l'utilisateur n'expire pas.

##### `isAccountNonLocked()`

Cette méthode retourne toujours `true`, indiquant que le compte de l'utilisateur n'est pas verrouillé.

##### `isCredentialsNonExpired()`

Cette méthode retourne toujours `true`, indiquant que les informations d'identification de l'utilisateur n'expirent pas.

##### `isEnabled()`

Cette méthode retourne toujours `true`, indiquant que le compte de l'utilisateur est activé.

### 👉 Role

L'énumération `Role` représente les rôles disponibles dans l'application.

#### Enumération

L'énumération est définie dans le fichier `Role.java` et elle contient les valeurs suivantes :

- `ADMIN` : représente le rôle d'administrateur.
- `USER` : représente le rôle d'utilisateur.

#### Utilisation

Pour utiliser l'énumération `Role`, vous pouvez l'utiliser dans votre code en tant que type pour définir le rôle d'un utilisateur. Par exemple :

```java
import user.project.autoplacemarket.Role;

public class User {
    private String username;
    private Role role;

    // ...
}

```
### 👉 UserController

La classe `UserController` est responsable de la gestion des requêtes liées aux utilisateurs dans l'API.

#### Contrôleur

Le contrôleur est défini dans le fichier `UserController.java` et est annoté avec `@RestController` pour indiquer qu'il s'agit d'un contrôleur REST. Il utilise le chemin de base `/api/v1/users` pour mapper les endpoints relatifs aux utilisateurs.

#### Dépendances

Le contrôleur dépend du repository `UserRepository` pour accéder aux données des utilisateurs.

#### Méthodes

Le contrôleur `UserController` expose les méthodes suivantes :

##### `getUserByEmail(String email, HttpServletRequest request)`

Cette méthode est annotée avec `@GetMapping("/email/{email}")` et permet de récupérer un utilisateur en fonction de son adresse e-mail. Elle utilise le `UserRepository` pour rechercher l'utilisateur correspondant. Avant de renvoyer l'utilisateur, elle vérifie les autorisations en fonction du nom d'utilisateur et du rôle de l'utilisateur actuellement authentifié.

Si l'utilisateur actuel a le même nom d'utilisateur que l'adresse e-mail spécifiée ou s'il a le rôle d'administrateur, la méthode renvoie une réponse contenant l'utilisateur correspondant. Sinon, elle lance une exception `AccessDeniedException` et renvoie un message d'erreur d'accès refusé.

##### `getAll(HttpServletRequest request)`

Cette méthode est annotée avec `@GetMapping("/all")` et permet de récupérer tous les utilisateurs. Elle utilise le `UserRepository` pour obtenir la liste complète des utilisateurs. Avant de renvoyer la liste, elle vérifie les autorisations en fonction du rôle de l'utilisateur actuellement authentifié.

Si l'utilisateur actuel a le rôle d'administrateur, la méthode renvoie la liste complète des utilisateurs. Sinon, elle lance une exception `AccessDeniedException` et renvoie un message d'erreur d'accès refusé.

#### Utilisation

Pour utiliser le contrôleur `UserController`, assurez-vous d'importer les dépendances nécessaires et de configurer les endpoints appropriés dans votre application Spring.

```java
import user.project.autoplacemarket.UserController;

// ...

@RestController
@RequestMapping("/api/v1/users")
public class MyController {
    private final UserController userController;

    // Inject dependencies and define methods that use UserController
}
```
### 👉 UserRepository

L'interface `UserRepository` est responsable de l'accès aux données des utilisateurs dans la base de données.

#### Repository

Le repository est défini dans le fichier `UserRepository.java` et étend l'interface `JpaRepository<User, Long>`. Il utilise le type `User` comme entité et le type `Long` comme type d'identifiant.

#### Méthodes

Le repository `UserRepository` expose la méthode suivante :

##### `findByEmail(String email)`

Cette méthode permet de rechercher un utilisateur en fonction de son adresse e-mail. Elle retourne un objet de type `Optional<User>`, qui peut être vide si aucun utilisateur correspondant n'est trouvé.

#### Utilisation

Pour utiliser le repository `UserRepository`, assurez-vous d'importer les dépendances nécessaires et d'injecter le repository dans les classes qui en ont besoin.

```java
import user.project.autoplacemarket.UserRepository;

// ...

@Service
public class MyService {
    private final UserRepository userRepository;

    // Inject dependencies and use UserRepository methods
}
```

## Auth

### 👉 AuthController

La classe `AuthController` est responsable de la gestion des opérations d'authentification dans l'API.

#### Contrôleur

Le contrôleur est défini dans le fichier `AuthController.java` et est annoté avec `@RestController` et `@RequestMapping("/api/v1/auth")` pour définir l'URL de base du contrôleur. Il gère les requêtes HTTP relatives à l'authentification des utilisateurs.

#### Dépendances

Le contrôleur utilise le service `AuthService` pour effectuer les opérations d'authentification.

#### Méthodes

Le contrôleur `AuthController` expose les méthodes suivantes :

##### `register(RegisterRequest request, HttpServletRequest httpRequest)`

Cette méthode est annotée avec `@PostMapping("/register")` et permet à un utilisateur de s'inscrire. Elle reçoit une requête de type `RegisterRequest` contenant les informations d'inscription de l'utilisateur et retourne une réponse de type `ResponseEntity<Map<String, String>>` contenant les détails de l'opération d'inscription.

##### `authenticate(AuthRequest request, HttpServletRequest httpRequest)`

Cette méthode est annotée avec `@PostMapping("/authenticate")` et permet à un utilisateur de s'authentifier. Elle reçoit une requête de type `AuthRequest` contenant les informations d'authentification de l'utilisateur et retourne une réponse de type `ResponseEntity<?>` contenant la réponse d'authentification, généralement un objet de type `AuthResponse` contenant le token JWT.

#### Utilisation

Pour utiliser le contrôleur `AuthController`, assurez-vous d'importer les dépendances nécessaires et de configurer les routes appropriées dans votre application.

Dans cet exemple, le contrôleur `AuthController` gère les routes "/api/v1/auth/register" et "/api/v1/auth/authenticate" pour les opérations d'inscription et d'authentification respectivement.

Assurez-vous de configurer correctement votre environnement de sécurité (par exemple, en utilisant Spring Security) pour protéger ces routes et vérifier les informations d'authentification.

### 👉 AuthService

La classe `AuthService` est responsable de la gestion des opérations d'authentification dans l'application.

#### Service

Le service est défini dans le fichier `AuthService.java` et est annoté avec `@Service` pour indiquer qu'il est un composant de service Spring. Il gère les opérations liées à l'authentification des utilisateurs.

#### Dépendances

Le service utilise les dépendances suivantes :

- `UserRepository` : pour accéder aux données des utilisateurs.
- `PasswordEncoder` : pour encoder les mots de passe des utilisateurs.
- `JwtService` : pour générer et valider les tokens JWT.
- `AuthenticationManager` : pour gérer l'authentification des utilisateurs.

#### Méthodes

Le service `AuthService` expose les méthodes suivantes :

##### `register(RegisterRequest request, HttpServletRequest httpRequest)`

Cette méthode permet à un utilisateur de s'inscrire. Elle reçoit une requête de type `RegisterRequest` contenant les informations d'inscription de l'utilisateur. Si l'utilisateur n'existe pas déjà, un nouveau compte utilisateur est créé avec les informations fournies. La méthode retourne une `Map<String, String>` contenant un message indiquant que le compte a été créé avec succès.

##### `authenticate(AuthRequest request, HttpServletRequest httpRequest)`

Cette méthode permet à un utilisateur de s'authentifier. Elle reçoit une requête de type `AuthRequest` contenant les informations d'authentification de l'utilisateur. La méthode utilise l'`AuthenticationManager` pour vérifier les informations d'identification. Si les informations sont valides, un token JWT est généré avec le rôle de l'utilisateur et retourné dans un objet `AuthResponse`. Sinon, une exception est levée.

#### Utilisation

Pour utiliser le service `AuthService`, assurez-vous d'importer les dépendances nécessaires et d'injecter le service dans les classes qui en ont besoin.

Assurez-vous également de configurer correctement l'environnement de sécurité de votre application (par exemple, en utilisant Spring Security) pour protéger les opérations d'authentification.

### 👉 RegisterRequest

La classe `RegisterRequest` est une classe de modèle utilisée pour représenter une requête d'inscription dans l'application.

#### Modèle

Le modèle est défini dans le fichier `RegisterRequest.java`. Il est utilisé pour capturer les informations fournies lors d'une demande d'inscription.

#### Propriétés

La classe `RegisterRequest` expose les propriétés suivantes :

- `firstname` : le prénom de l'utilisateur.
- `lastname` : le nom de famille de l'utilisateur.
- `email` : l'adresse e-mail de l'utilisateur.
- `password` : le mot de passe de l'utilisateur.
- `requiredRole` : le rôle requis pour l'inscription (cette propriété existe car on laisse l'utilisateur choisir son rôle ; à savoir ADMIN ou USER. C'est à des fins de démo. Dans une vraie application, cette propriété n'existe pas car une création de compte basique implique systématiquement un compte USER).

#### Utilisation

La classe `RegisterRequest` est utilisée comme objet de transfert de données pour capturer les informations d'inscription lors de l'appel de l'API d'inscription. Vous pouvez créer une instance de `RegisterRequest` en fournissant les valeurs appropriées pour chaque propriété.

Exemple :

```java
RegisterRequest request = RegisterRequest.builder()
    .firstname("John")
    .lastname("Doe")
    .email("john.doe@example.com")
    .password("password123")
    .requiredRole("ROLE_USER")
    .build();
```

### 👉 AuthRequest

La classe `AuthRequest` est une classe de modèle utilisée pour représenter une requête d'authentification dans l'application.

#### Modèle

Le modèle est défini dans le fichier `AuthRequest.java`. Il est utilisé pour capturer les informations fournies lors d'une demande d'authentification.

#### Propriétés

La classe `AuthRequest` expose les propriétés suivantes :

- `email` : l'adresse e-mail de l'utilisateur.
- `password` : le mot de passe de l'utilisateur.

#### Utilisation

La classe `AuthRequest` est utilisée comme objet de transfert de données pour capturer les informations d'authentification lors de l'appel de l'API d'authentification. Vous pouvez créer une instance de `AuthRequest` en fournissant les valeurs appropriées pour chaque propriété.

Exemple :

```java
AuthRequest request = AuthRequest.builder()
    .email("john.doe@example.com")
    .password("password123")
    .build();
```

### 👉 AuthResponse

La classe `AuthResponse` est une classe de modèle utilisée pour représenter la réponse d'authentification dans l'application.

#### Modèle

Le modèle est défini dans le fichier `AuthResponse.java`. Il est utilisé pour encapsuler les informations retournées après une demande d'authentification.

#### Propriétés

La classe `AuthResponse` expose les propriétés suivantes :

- `token` : le jeton d'authentification JWT généré après une authentification réussie.
- `message` : un message descriptif indiquant le statut de la demande d'authentification.

#### Utilisation

La classe `AuthResponse` est utilisée pour récupérer et traiter la réponse d'authentification retournée par l'API d'authentification. Vous pouvez accéder aux propriétés `token` et `message` pour obtenir les informations nécessaires.

Exemple :

```java
AuthResponse response = ... // Récupérer la réponse d'authentification depuis l'API
String token = response.getToken();
String message = response.getMessage();
```

## Démo
Ce package ne contient qu'une seule fichier, un Controller, dont le but est de tester l'accès (ou non) des routes en fonction du rôle de l'utilisateur. Ce n'est pas une classe à créer dans le cas d'une réelle application.

### 👉 DemoController

La classe `DemoController` est un contrôleur REST utilisé pour démontrer les autorisations basées sur les rôles dans l'application.

#### Contrôleur

Le contrôleur est défini dans le fichier `DemoController.java`. Il expose deux endpoints pour illustrer les autorisations basées sur les rôles.

#### Endpoints

Le contrôleur `DemoController` expose les endpoints suivants :

##### `GET /api/v1/demo/users-only`

Cet endpoint permet d'accéder à une ressource qui est accessible uniquement par les utilisateurs ayant le rôle "ROLE_USER". Si l'utilisateur n'a pas ce rôle, une réponse d'accès refusé sera renvoyée.

Exemple de réponse réussie :

OUAIS ACCESSIBLE QUE PAR UN ROLE_USER OMG


##### `GET /api/v1/demo/admin-only`

Cet endpoint permet d'accéder à une ressource qui est accessible uniquement par les utilisateurs ayant le rôle "ROLE_ADMIN". Si l'utilisateur n'a pas ce rôle, une réponse d'accès refusé sera renvoyée.

Exemple de réponse réussie :

OUAIS ACCESSIBLE QUE PAR UN ROLE_ADMIN


#### Utilisation

Le contrôleur `DemoController` illustre l'utilisation des annotations `@GetMapping` et `@RequestMapping` pour définir les endpoints. Ces endpoints peuvent être utilisés pour tester les autorisations basées sur les rôles dans votre application.

## Util
Ce package regroupe l'ensemble des classes "utilitaires" (ici : une seule). Une classe utilitaire est une classe regroupant une ou plusieurs méthodes encapsulant chacune un algorithme. Ces méthodes sont appellées par une autre classe, dite classe principale. Cela à pour intérêt de décharger la complexité algorithmique de la classe principale en appellant simplement les méthodes nécessaires au succès de l'algorithme principal de cette classe.

### 👉 JwtService

La classe `JwtService` est un service utilisé pour la génération et la validation des jetons JWT (JSON Web Tokens) dans l'application.

#### Service

Le service est défini dans le fichier `JwtService.java`. Il utilise la bibliothèque `io.jsonwebtoken` pour travailler avec les jetons JWT.

#### Fonctionnalités

La classe `JwtService` offre les fonctionnalités suivantes :

- Extraction du nom d'utilisateur à partir d'un jeton
- Extraction des revendications (claims) d'un jeton
- Génération d'un jeton avec des revendications personnalisées et les informations de l'utilisateur
- Validation d'un jeton pour s'assurer qu'il est valide et correspond à l'utilisateur fourni

#### Utilisation

Pour utiliser le service `JwtService`, vous devez injecter l'instance de ce service dans vos classes appropriées.

Voici comment vous pouvez utiliser les principales fonctionnalités du service :

##### Extraction du nom d'utilisateur à partir d'un jeton

```java
String token = "votre-jeton-jwt";
String username = jwtService.extractUsername(token);
```
#### extractUsername(String token) :

Cette méthode prend en paramètre un jeton JWT sous forme de chaîne de caractères.
Elle extrait le nom d'utilisateur (subject) à partir du jeton.
Elle retourne le nom d'utilisateur extrait.

####  extractClaim(String token, Function<Claims, T> claimsResolver) :

Cette méthode générique prend en paramètre un jeton JWT sous forme de chaîne de caractères et une fonction claimsResolver qui permet de résoudre une revendication spécifique.
Elle extrait toutes les revendications (claims) du jeton.
Elle applique la fonction claimsResolver pour extraire la revendication spécifiée.
Elle retourne la valeur de la revendication extraite.

#### extractAllClaims(String token) :

Cette méthode privée prend en paramètre un jeton JWT sous forme de chaîne de caractères.
Elle extrait toutes les revendications (claims) du jeton.
Elle retourne un objet Claims contenant toutes les revendications extraites.

#### generateToken(Map<String, Object> extraClaims, UserDetails userDetails) :

Cette méthode prend en paramètre un Map de revendications supplémentaires (extraClaims) et les informations de l'utilisateur (userDetails).
Elle génère un nouveau jeton JWT avec les revendications spécifiées et les informations de l'utilisateur.
Le jeton généré est signé à l'aide de la clé secrète spécifiée dans la variable SECRET_KEY de la classe.
Elle retourne le jeton JWT généré

#### getSignInKey() :

Cette méthode privée retourne la clé de signature utilisée pour signer les jetons JWT.
Elle décode la clé secrète spécifiée dans la variable SECRET_KEY en utilisant l'algorithme de décodage BASE64.
Elle retourne la clé de signature prête à être utilisée pour signer les jetons.

#### isTokenValid(String token, UserDetails userDetails) :

Cette méthode prend en paramètre un jeton JWT sous forme de chaîne de caractères et les informations de l'utilisateur (userDetails).
Elle vérifie si le jeton est valide en effectuant les vérifications suivantes :
Le nom d'utilisateur extrait du jeton correspond au nom d'utilisateur des informations de l'utilisateur fournies.
Le jeton n'est pas expiré.
Elle retourne true si le jeton est valide, sinon elle retourne false.
Ces méthodes vous permettent d'effectuer différentes opérations liées aux jetons JWT, telles que l'extraction d'informations, la génération de jetons avec des revendications personnalisées et la validation des jetons pour garantir leur authenticité et leur validité.

## Filters

### 👉 JwtAuthenticationFilter


La classe `JwtAuthenticationFilter` est une classe utilisée comme filtre pour intercepter les requêtes entrantes et gérer l'authentification basée sur les jetons JWT (JSON Web Tokens).

#### Annotations

La classe `JwtAuthenticationFilter` est annotée avec `@Component`, ce qui indique à Spring Framework de la gérer comme un composant dans le contexte de l'application. De plus, elle utilise l'annotation `@RequiredArgsConstructor` de Lombok pour générer automatiquement un constructeur avec les dépendances requises.

#### Propriétés

La classe `JwtAuthenticationFilter` possède deux propriétés :

-  `jwtService` : une dépendance de type `JwtService`, qui est utilisée pour effectuer des opérations liées aux jetons JWT, telles que l'extraction du nom d'utilisateur à partir du jeton et la validation du jeton lui-même.

-  `userDetailsService` : une dépendance de type `UserDetailsService`, qui est utilisée pour charger les détails de l'utilisateur à partir de la base de données en fonction de son nom d'utilisateur.

#### Méthodes

#### `doFilterInternal`

La méthode `doFilterInternal` est une méthode héritée de la classe `OncePerRequestFilter` et doit être implémentée pour effectuer le traitement du filtre sur chaque requête entrante.

1. Elle reçoit les objets `HttpServletRequest` et `HttpServletResponse`, ainsi qu'un objet `FilterChain` qui représente la chaîne des filtres à appeler.

2. La méthode commence par extraire la valeur du header `Authorization` de la requête entrante. Si le header est nul ou ne commence pas par "Bearer ", elle ajoute un attribut "no_jwt_provided" à la requête, puis appelle la méthode `doFilter` de la chaîne des filtres pour passer au filtre suivant.

3. Si le header `Authorization` est présent et commence par "Bearer ", la méthode poursuit son exécution.

4. Elle extrait le jeton JWT en supprimant les premiers 7 caractères de la valeur du header, qui correspondent à "Bearer ".

5. En utilisant le service `jwtService`, la méthode extrait le nom d'utilisateur à partir du jeton JWT.

6. Si le nom d'utilisateur n'est pas nul et qu'aucune authentification n'est déjà définie dans le `SecurityContextHolder`, la méthode poursuit son exécution.

7. Elle appelle le `userDetailsService` pour charger les détails de l'utilisateur à partir de la base de données en utilisant le nom d'utilisateur extrait.

8. Ensuite, elle utilise le `jwtService` pour valider le jeton JWT en vérifiant sa signature et sa validité.

9. Si le jeton est valide, la méthode crée un nouvel objet `UsernamePasswordAuthenticationToken` contenant les détails de l'utilisateur, tel que récupéré du `userDetailsService`, et l'authentification est considérée comme réussie.

10. Elle met à jour le `SecurityContextHolder` en définissant l'objet `UsernamePasswordAuthenticationToken` comme l'authentification actuelle.

11. Si une exception se produit pendant le processus d'authentification, telle qu'une expiration ou un format incorrect du jeton, la méthode capture l'exception et ajoute un attribut correspondant à l'erreur à la

## Config

### 👉 ApplicationConfig

La classe `ApplicationConfig` est une classe de configuration qui contient la configuration et la création de différents beans pour l'application.

#### Annotations

La classe `ApplicationConfig` est annotée avec `@Configuration`, ce qui indique à Spring Framework qu'il s'agit d'une classe de configuration. Elle est également annotée avec `@RequiredArgsConstructor` de Lombok, ce qui génère automatiquement un constructeur avec les dépendances requises.

#### Propriétés

La classe `ApplicationConfig` possède une propriété :

- `repository` : une dépendance de type `UserRepository`, qui est utilisée pour interagir avec la base de données et récupérer les informations de l'utilisateur.

#### Méthodes Bean

La classe `ApplicationConfig` contient plusieurs méthodes annotées avec `@Bean`. Ces méthodes créent et configurent différents beans utilisés dans l'application.

-  `userDetailsService()` : Cette méthode crée un bean de type `UserDetailsService`. Elle utilise une expression lambda pour définir la logique de recherche de l'utilisateur dans la base de données en fonction de son nom d'utilisateur. Si l'utilisateur n'est pas trouvé, une exception `UsernameNotFoundException` est levée.

-  `authenticationProvider()` : Cette méthode crée un bean de type `AuthenticationProvider`. Elle utilise `DaoAuthenticationProvider` pour fournir la logique d'authentification basée sur un `UserDetailsService`. Elle configure le `UserDetailsService` en utilisant le bean créé précédemment, puis définit un `PasswordEncoder` pour le hachage des mots de passe.

-  `passwordEncoder()` : Cette méthode crée un bean de type `PasswordEncoder`. Elle utilise `BCryptPasswordEncoder` de Spring Security pour le hachage des mots de passe.

-  `customAuthenticationManager()` : Cette méthode crée un bean de type `AuthenticationManager`. Elle utilise une instance de `AuthenticationConfiguration` pour obtenir l'`AuthenticationManager` configuré par défaut. Cet `AuthenticationManager` gère la logique d'authentification avec un nom d'utilisateur et un mot de passe.

-  `corsConfigurationSource()` : Cette méthode crée un bean de type `CorsConfigurationSource`. Elle configure les paramètres CORS (Cross-Origin Resource Sharing) pour permettre les requêtes provenant de différentes sources. Elle définit les origines autorisées, les méthodes HTTP autorisées, les en-têtes autorisés, etc.

#### Autres annotations

La classe `ApplicationConfig` utilise également l'annotation `@ComponentScan` pour scanner les composants dans le package actuel et ses sous-packages.

Les configurations et les beans définis dans la classe `ApplicationConfig` seront utilisés par Spring Framework pour gérer l'authentification, le chiffrement des mots de passe, la gestion des utilisateurs, la gestion des requêtes CORS, etc., dans l'application.

### 👉 SecurityConfig

La classe `SecurityConfig` est une classe de configuration qui définit la configuration de sécurité pour l'application.

#### Annotations

La classe `SecurityConfig` est annotée avec plusieurs annotations :

- `@Configuration` : Cette annotation indique à Spring Framework qu'il s'agit d'une classe de configuration.
- `@EnableWebSecurity` : Cette annotation active la sécurité Web de Spring pour l'application.
- `@EnableGlobalMethodSecurity(prePostEnabled = true)` : Cette annotation active la sécurité basée sur les méthodes de Spring, ce qui permet l'utilisation d'annotations de sécurité telles que `@PreAuthorize` et `@PostAuthorize`.
- `@RequiredArgsConstructor` : Cette annotation de Lombok génère automatiquement un constructeur avec les dépendances requises.

#### Propriétés

La classe `SecurityConfig` possède plusieurs propriétés :

- `jwtAuthenticationFilter` : une dépendance de type `JwtAuthenticationFilter` qui est utilisée comme filtre d'authentification JWT.
- `authenticationProvider` : une dépendance de type `AuthenticationProvider` qui fournit la logique d'authentification.
- `authenticationEntryPoint` : une dépendance utilisée pour gérer les points d'entrée de l'authentification.
- `accessDeniedHandler` : une dépendance utilisée pour gérer les accès refusés.

#### Méthodes Bean

La classe `SecurityConfig` contient une méthode annotée avec `@Bean` :

- `securityFilterChain(HttpSecurity http)` : Cette méthode crée un bean de type `SecurityFilterChain` qui configure la chaîne de filtres de sécurité. Elle prend un objet `HttpSecurity` en paramètre pour configurer la sécurité HTTP. La méthode désactive la protection CSRF, configure la gestion des sessions comme sans état, configure les gestionnaires pour les points d'entrée d'authentification et les accès refusés, déclare les autorisations pour les différentes URL de l'API en fonction des rôles, définit l'authentification fournie par le `authenticationProvider`, et ajoute le filtre d'authentification JWT (`jwtAuthenticationFilter`) avant le filtre d'authentification par nom d'utilisateur et mot de passe.

#### Configuration HTTP

La configuration HTTP est réalisée dans la méthode `securityFilterChain(HttpSecurity http)`. Voici les principales configurations effectuées :

- `cors()` : Cette configuration active la prise en charge des requêtes CORS (Cross-Origin Resource Sharing).
- `csrf().disable()` : Cette configuration désactive la protection CSRF (Cross-Site Request Forgery).
- `sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)` : Cette configuration spécifie que les sessions ne doivent pas être créées ni utilisées pour gérer l'état de l'authentification.
- `exceptionHandling()` : Cette configuration définit les gestionnaires pour les points d'entrée d'authentification (`authenticationEntryPoint`) et les accès refusés (`accessDeniedHandler`).
- `authorizeHttpRequests()` : Cette configuration permet de spécifier les autorisations pour les différentes requêtes HTTP en fonction des URL. Dans cet exemple, `/api/v1/auth/**` est accessible à tout le monde, `/api/v1/demo/users-only` nécessite le rôle `USER`, et `/api/v1/demo/admin-only` nécessite le rôle `ADMIN`.
- `anyRequest().authenticated()` : Cette configuration spécifie que toutes les autres

### 👉 AuthenticationEntryPoint

La classe `AuthenticationEntryPoint` est une classe qui implémente l'interface `org.springframework.security.web.AuthenticationEntryPoint`. Elle est utilisée pour renvoyer les erreurs liées aux problèmes d'authentification au front-end.

#### Méthode commence

La méthode `commence` est une méthode requise par l'interface `AuthenticationEntryPoint`. Elle est appelée lorsque l'authentification échoue.

La méthode prend les paramètres suivants :
- `request` : l'objet `HttpServletRequest` de la requête entrante.
- `response` : l'objet `HttpServletResponse` de la réponse sortante.
- `exception` : l'objet `AuthenticationException` représentant l'exception d'authentification.

###### Traitement des erreurs

Dans la méthode `commence`, différentes erreurs liées à l'authentification sont gérées. Selon le type d'erreur, un message d'erreur spécifique est renvoyé au front-end.

Voici les principales erreurs traitées :
- Si l'attribut de la requête "expired_exception" est présent, cela signifie que le JWT a expiré. Un message d'erreur indiquant que le JWT a expiré est renvoyé.
- Si l'attribut de la requête "malformed_exception" est présent, cela signifie que le JWT est mal formé. Un message d'erreur indiquant que le JWT est mal formé est renvoyé.
- Si l'attribut de la requête "username_taken_exception" est présent, cela signifie que l'adresse e-mail est déjà utilisée. Un message d'erreur indiquant que l'adresse e-mail est déjà prise est renvoyé.
- Si l'attribut de la requête "bad_credentials" est présent, cela signifie que les identifiants d'authentification sont incorrects. Un message d'erreur indiquant que le compte n'existe pas ou que les identifiants sont incorrects est renvoyé.
- Si l'attribut de la requête "no_jwt_provided" est présent, cela signifie qu'aucun JWT n'a été fourni. Un message d'erreur indiquant que aucun JWT n'a été fourni est renvoyé.

#### Réponse HTTP

La méthode `commence` configure la réponse HTTP en fonction de l'erreur rencontrée. Elle définit le statut de la réponse sur "401 Unauthorized" et le type de contenu sur "application/json". Elle ajoute également un en-tête "error" avec le message d'erreur correspondant à l'exception.

Ensuite, un objet `Map` contenant les informations d'erreur est créé en fonction de l'erreur détectée. Cet objet est ensuite converti en JSON à l'aide de la classe `ObjectMapper` de Jackson et écrit dans le flux de sortie de la réponse HTTP.

Cela permet de renvoyer au front-end les informations d'erreur sous forme de JSON, afin qu'elles puissent être traitées et affichées à l'utilisateur.

### 👉 AccessDeniedHandler

La classe `AccessDeniedHandler` est une classe qui implémente l'interface `org.springframework.security.web.access.AccessDeniedHandler`. Elle est utilisée pour renvoyer les erreurs liées aux problèmes d'accès à une ressource au front-end.

#### Méthode handle

La méthode `handle` est une méthode requise par l'interface `AccessDeniedHandler`. Elle est appelée lorsque l'accès à une ressource est refusé en raison de droits insuffisants.

La méthode prend les paramètres suivants :
- `request` : l'objet `HttpServletRequest` de la requête entrante.
- `response` : l'objet `HttpServletResponse` de la réponse sortante.
- `accessDeniedException` : l'objet `AccessDeniedException` représentant l'exception d'accès refusé.

#### Traitement de l'erreur

Dans la méthode `handle`, une erreur d'accès refusé est traitée. Un message d'erreur spécifique est renvoyé au front-end indiquant que l'utilisateur n'a pas les droits suffisants pour accéder à la ressource.

#### Réponse HTTP

La méthode `handle` configure la réponse HTTP en cas d'erreur d'accès refusé. Elle définit le statut de la réponse sur "401 Unauthorized" et le type de contenu sur "application/json".

Ensuite, un objet `Map` est créé pour contenir les informations d'erreur. Cet objet contient deux clés :
- "access_denied" avec la valeur "true" indiquant que l'accès a été refusé.
- "error_message" avec la valeur "You do not have sufficient rights to access this resource" indiquant le message d'erreur.

Cet objet est ensuite converti en JSON à l'aide de la classe `ObjectMapper` de Jackson et écrit dans le flux de sortie de la réponse HTTP.

Cela permet de renvoyer au front-end les informations d'erreur sous forme de JSON, afin qu'elles puissent être traitées et affichées à l'utilisateur.

