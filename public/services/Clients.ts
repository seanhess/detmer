///<reference path="../types.ts"/>

interface ClientService extends ng.resource.IResourceClass {}

export function module($http: ng.IHttpService, $resource: ng.resource.IResourceService):ClientService {
    var Clients:ClientService = <any> $resource("/books/:bookId", {}, {})
    return Clients
})

