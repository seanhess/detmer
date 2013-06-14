
import types = module('../types')

// client service
export interface Service extends ng.resource.IResourceClass {
    allDispositions():types.Disposition;
}

export function main($resource: ng.resource.IResourceService):Service {
    var Disposition = <any> $resource("/api/clients/:clientId/dispositions", {clientId: '@clientId'})

    Disposition.allDispositions = function() {
        return [
            {value: 1, name: "Really Bad"},
            {value: 2, name: "At Risk"},
            {value: 3, name: "Kinda Bad"},
            {value: 4, name: "Ok"},
            {value: 5, name: "Good"},
            {value: 6, name: "¡Fantastico!"},
        ]
    }

    return Disposition
}
