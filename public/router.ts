export function main($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) {
  console.log("INSIDE ROUTER")
  $locationProvider.html5Mode(true)
  $routeProvider.when('/', {templateUrl: '/partials/test.html', controller: 'test'})
  // $routeProvider.when('/admin/404', {templateUrl: '/partials/404.html'})
  // $routeProvider.when('/admin', {templateUrl: '/partials/admin.html', controller: "AdminCtrl"})
  // $routeProvider.when('/admin/books/:bookId', {templateUrl: '/partials/book.html', controller: "BookCtrl"})
  // $routeProvider.when('/admin/genres/:name/books', {templateUrl: '/partials/category.html', controller: "GenreCtrl"})
  // $routeProvider.when('/admin/authors/:name/books', {templateUrl: '/partials/category.html', controller: "AuthorCtrl"})
  // $routeProvider.when('/admin/migrations', {templateUrl: '/partials/migrations.html', controller: "MigrationsCtrl"})
  $routeProvider.otherwise({redirectTo: '/'})
}
