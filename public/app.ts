/// <reference path="def/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="def/DefinitelyTyped/angularjs/angular.d.ts"/>
/// <reference path="def/DefinitelyTyped/angularjs/angular-resource.d.ts"/>
/// <reference path="def/DefinitelyTyped/underscore/underscore.d.ts"/>

import clients = module('controls/clients')

console.log("Register: App2")
angular.module('app', ['ngResource'])

.controller("ClientsControl", clients.main)
.controller("ClientControl", clients.details)
.factory("Clients", clients.service)

.config(function main($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    console.log("INSIDE ROUTER")
    $locationProvider.html5Mode(true)
    $routeProvider.when('/clients', {templateUrl: '/partials/clients.html', controller: 'ClientsControl'})
    $routeProvider.when('/clients/:id', {templateUrl: '/partials/client.html', controller: 'ClientControl'})
    // $routeProvider.when('/admin/404', {templateUrl: '/partials/404.html'})
    // $routeProvider.when('/admin', {templateUrl: '/partials/admin.html', controller: "AdminCtrl"})
    // $routeProvider.when('/admin/books/:bookId', {templateUrl: '/partials/book.html', controller: "BookCtrl"})
    // $routeProvider.when('/admin/genres/:name/books', {templateUrl: '/partials/category.html', controller: "GenreCtrl"})
    // $routeProvider.when('/admin/authors/:name/books', {templateUrl: '/partials/category.html', controller: "AuthorCtrl"})
    // $routeProvider.when('/admin/migrations', {templateUrl: '/partials/migrations.html', controller: "MigrationsCtrl"})
    $routeProvider.otherwise({redirectTo: '/clients'})
})

angular.bootstrap($(document), ['app'])
