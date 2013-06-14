
// client service
export interface Service extends ng.resource.IResourceClass {
    update:ng.resource.IActionCall;
}

export function main($http: ng.IHttpService, $resource: ng.resource.IResourceService):Service {
    var Clients:Service = <any> $resource("/api/clients/:id", {}, {
        update: {method:'PUT', params:{id:"@id"}}
    })
    return Clients
}
