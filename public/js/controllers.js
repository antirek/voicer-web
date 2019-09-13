angular.module('resourceApp', ['LocalStorageModule'])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('resourceApp');1
    })          
    .controller('resourceListController', function ($scope, localStorageService) {
        var resourceList = this;
        resourceList.name = '';
        resourceList.target = '';
        resourceList.resources = [];

        var data = JSON.parse(localStorageService.get('peernames'));
        if (data) { resourceList.resources = data; }

        resourceList.addResource = function () {
            if ((resourceList.name != '') && (resourceList.target != '')) {
                resourceList.resources.push({
                    name: resourceList.name, 
                    target: resourceList.target,
                    variants: [
                      resourceList.name.toLowerCase()
                    ]
                });
                resourceList.name = '';
                resourceList.target = '';
            }
        };

        resourceList.deleteResource = function (resourceIndex) {
            if (confirm("Delete resource?")) {
                resourceList.resources.splice(resourceIndex, 1);                
            }            
        };

        resourceList.addVariant = function (resourceIndex) {
            var newVariant = resourceList.newVariant[resourceIndex].toLowerCase();
            resourceList.resources[resourceIndex].variants.push(newVariant);
            resourceList.newVariant[resourceIndex] = '';
        };

        resourceList.deleteVariant = function (resourceIndex, variantIndex) {
            if (confirm("Delete variant?")) {
                resourceList.resources[resourceIndex].variants.splice(variantIndex, 1);                
            }
        };

        resourceList.save = function () {
            localStorageService.set('peernames', JSON.stringify(resourceList.resources));            
        };
        
    });