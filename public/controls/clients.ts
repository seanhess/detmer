

// client service
export interface Service extends ng.resource.IResourceClass {
    update:ng.resource.IActionCall;
}

export function service($http: ng.IHttpService, $resource: ng.resource.IResourceService):Service {
    var Clients:Service = <any> $resource("/api/clients/:id", {}, {
        update: {method:'PUT', params:{id:"@id"}}
    })
    return Clients
}



export function main($scope:any, $resource:ng.resource.IResourceService, $location:ng.ILocationService, Clients:Service) {
    $scope.test = "wahou"
    $scope.clients = Clients.query()

    $scope.addClient = function(client) {
        Clients.save({}, function(client) {
            $location.path("/clients/" + client.id)
        })
    }
}




export function details($scope:any, $resource:ng.resource.IResourceService, $location:ng.ILocationService, $routeParams:any, Clients:Service) {
    console.log("DETAILS CONTROLLER", $routeParams)
    var clientId = $routeParams.id
    $scope.client = Clients.get({id:clientId})
    $scope.delete = function() {
        Clients.remove({id:clientId})
        $location.path("/clients")
    }
    $scope.save = function() {
        Clients.update($scope.client)
        $location.path("/clients")
    }
}


