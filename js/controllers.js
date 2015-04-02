angular.module('resourceApp', ['ngResource'])
    .factory("peernames", function ($resource) {
        return $resource(
            "/peernames.json", 
            {},
            {
                saveData: {
                    method: 'POST',
                    isArray: true
                }
            });
    })    
    .controller('resourceListController', function ($scope, peernames) {
        var resourceList = this;

        peernames.query(function (peers) {
            resourceList.resources = peers;
        });

        resourceList.addResource = function () {
            resourceList.resources.push({
                name: resourceList.name, 
                target: resourceList.target,
                variants: [
                  resourceList.name.toLowerCase()
                ]
            });
            resourceList.name = '';
            resourceList.target = '';
        };

        resourceList.deleteResource = function (resourceIndex) {
            var oldResources = resourceList.resources;
            resourceList.resources = [];
            delete oldResources[resourceIndex];
            angular.forEach(oldResources, function (resource) {
                resourceList.resources.push(resource);
            });
        };

        resourceList.addVariant = function (resourceIndex) {
            var newVariant = resourceList.newVariant[resourceIndex].toLowerCase();
            resourceList.resources[resourceIndex].variants.push(newVariant);
            resourceList.newVariant[resourceIndex] = '';
        };

        resourceList.deleteVariant = function (resourceIndex, variantIndex) {
            var oldVariants = resourceList.resources[resourceIndex].variants;
            resourceList.resources[resourceIndex].variants = [];
            delete oldVariants[variantIndex];
            angular.forEach(oldVariants, function (variant) {
                resourceList.resources[resourceIndex].variants.push(variant);
            });
        };

        resourceList.save = function () {
            peernames.saveData({}, resourceList.resources, function () {
                peernames.query(function (peers) {
                    resourceList.resources = peers;
                });
            });
        };
        
    });