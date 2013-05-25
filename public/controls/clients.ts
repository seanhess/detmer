export function main($scope:any, $http:ng.IHttpService, $resource:ng.resource.IResourceService) {
    var clients = $resource("/api/clients")
    $scope.test = "wahou"
    $scope.clients = clients.query()

    $scope.addClient = function() {
        console.log("GOGOG")
        clients.save({name:"willy"})
        $scope.clients = clients.query()
    }
}