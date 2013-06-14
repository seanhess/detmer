/// <reference path="def/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="def/DefinitelyTyped/angularjs/angular.d.ts"/>
/// <reference path="def/DefinitelyTyped/angularjs/angular-resource.d.ts"/>
/// <reference path="def/DefinitelyTyped/underscore/underscore.d.ts"/>

import clients = module('views/clients')
import Client = module('services/Client')
import Disposition = module('services/Disposition')
import formcontrol = module('directives/formcontrol')
import dispositionSelector = module('directives/dispositionSelector')
import popup = module('directives/popup')

import toKey = module('filters/toKey')

console.log("Register: App2")
angular.module('app', ['ngResource', 'ui.bootstrap'])

.factory("ClientService", Client.main)
.factory("DispositionService", Disposition.main)

.directive("formcontrol", formcontrol.main)
.directive("dispositionSelector", dispositionSelector.main)
.directive("popup", popup.main)

.filter("toKey", toKey.main)

.config(function main($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    console.log("INSIDE ROUTER")
    $locationProvider.html5Mode(true)
    $routeProvider.when('/clients', {templateUrl: '/app/views/clients.html', controller: clients.main})
    $routeProvider.when('/clients/:id', {templateUrl: '/app/views/client_details.html', controller: clients.details})
    // $routeProvider.when('/admin/404', {templateUrl: '/partials/404.html'})
    // $routeProvider.when('/admin', {templateUrl: '/partials/admin.html', controller: "AdminCtrl"})
    // $routeProvider.when('/admin/books/:bookId', {templateUrl: '/partials/book.html', controller: "BookCtrl"})
    // $routeProvider.when('/admin/genres/:name/books', {templateUrl: '/partials/category.html', controller: "GenreCtrl"})
    // $routeProvider.when('/admin/authors/:name/books', {templateUrl: '/partials/category.html', controller: "AuthorCtrl"})
    // $routeProvider.when('/admin/migrations', {templateUrl: '/partials/migrations.html', controller: "MigrationsCtrl"})
    $routeProvider.otherwise({redirectTo: '/clients'})
})

angular.bootstrap($(document), ['app'])
