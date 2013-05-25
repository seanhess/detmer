///<reference path="def/angular.d.ts"/>

import router = module('router')
import test = module('controls/test')

console.log("Register: App3")

var app = angular.module('app', ['ngResource'])
  .config(router.main)
  .controller("test", test.main)

angular.bootstrap($(document), ['app'])