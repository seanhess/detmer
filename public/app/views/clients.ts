import types = module('../types')
import Client = module('../services/Client')
import Disposition = module('../services/Disposition')

export function main($scope:any, $location:ng.ILocationService, ClientService:Client.Service, $dialog) {
    load()

    function load() {
        $scope.clients = ClientService.query()        
    }

    $scope.clientDetails = function(client:types.Client) {
        $location.path("/clients/" + client.id)
    }

    $scope.addClient = function(client:types.Client) {
        ClientService.save(client, load)
    }

    $scope.openAddClient = function(client:types.Client) {
        $dialog.dialog({
            backdrop: true,
            keyboard: true,
            dialogFade: true,
            backdropFade: true,
            backdropClick: true,
            templateUrl:  '/app/views/client_add.html',
            controller: add
        })
        .open().then(function(client:types.Client) {
            if (client) $scope.addClient(client)
        })
    }
}



export function add($scope:any, dialog, ClientService:Client.Service) {
    $scope.client = {score: Math.floor(Math.random()*100)}

    $scope.types = ["fake"];

    $scope.save = function() {
        dialog.close($scope.client)
    }
    $scope.close = function() {
        dialog.close()
    }
}


export function details($scope:any, $routeParams:any, ClientService:Client.Service, DispositionService:Disposition.Service, $location:ng.ILocationService) {
    var clientId = $routeParams.id
    $scope.clientId = clientId;
    $scope.client = <types.Client> <any> ClientService.get({id:clientId})
    loadDispositions()
    
    function loadDispositions() {
        $scope.dispositions = DispositionService.query({clientId:clientId})    
    }

    $scope.remove = function() {
        ClientService.remove({id:clientId})
        $location.path("/clients")
    }

    $scope.selectDisposition = function(dispostion:types.Disposition, $event) {
        $scope.newDisposition = dispostion
        $scope.popupAnchor = $event.currentTarget
    }

    $scope.cancelDisposition = function() {
        $scope.popupAnchor = null
    }

    $scope.updateDisposition = function() {
        var disposition = $scope.newDisposition;
        disposition.clientId = clientId
        DispositionService.save(disposition, loadDispositions)
        $scope.cancelDisposition()
    }
}

