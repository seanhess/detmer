

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



export function main($scope:any, $location:ng.ILocationService, Clients:Service, $dialog) {
    load()

    function load() {
        $scope.clients = Clients.query()        
    }

    $scope.clientDetails = function(client) {
        $location.path("/clients/" + client.id)
    }

    $scope.addClient = function(client) {
        Clients.save(client, load)
    }

    $scope.openAddClient = function(client) {
        $dialog.dialog({
            backdrop: true,
            keyboard: true,
            dialogFade: true,
            backdropFade: true,
            backdropClick: true,
            templateUrl:  '/app/views/client_add.html',
            controller: add
        })
        .open().then(function(client) {
            if (client) $scope.addClient(client)
        })
    }
}



export function add($scope:any, dialog, Clients:Service) {
    $scope.client = {}
    console.log("DETAILS CONTROLLER", $scope.client)

    $scope.types = ["fake"];

    $scope.save = function() {
        dialog.close($scope.client)
    }
    $scope.close = function() {
        dialog.close()
    }
}

export function details($scope:any, $routeParams:any, Clients:Service, $location:ng.ILocationService) {
    var clientId = $routeParams.id
    $scope.client = Clients.get({id:clientId})
    $scope.remove = function() {
        Clients.remove({id:clientId})
        $location.path("/clients")
    }
}

