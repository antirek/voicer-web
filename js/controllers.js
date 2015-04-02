angular.module('resourceApp', [])
    .service('peernames', function () {
        return [
            {
                name: 'Василий', 
                variants: ['василий', 'вася', 'артем'],
                target: 'SIP/vasya'
            },
            {
                name: 'Петр Григорьевич', 
                variants: ['петр', 'петр григорьевич', 'директор'],
                target: 'SIP/1234'
            }
        ];
    })
    .controller('resourceListController', function (peernames) {
        var resourceList = this;
        resourceList.resources = peernames;
     
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
            resourceList.resources[resourceIndex].variants.push(resourceList.newVariant[resourceIndex]);
            resourceList.newVariant[resourceIndex] = '';
        };

        resourceList.deleteVariant = function (resourceIndex, variantIndex) {
            var oldVariants = resourceList.resources[resourceIndex].variants;
            peernames[resourceIndex].variants = [];
            delete oldVariants[variantIndex];
            angular.forEach(oldVariants, function (variant) {
                resourceList.resources[resourceIndex].variants.push(variant);
            });
        };
           
    });