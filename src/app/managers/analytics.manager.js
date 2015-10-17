(function() {
    'use strict';

    angular
        .module('rattus')
        .factory('ImageLatency', ['$resource', ImageLatency]);

    /** @ngInject */
    function ImageLatency($resource) {
        return $resource('http://localhost:8080/analytics/image-latency/:correct/daily', {correct: '@correct'}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data) {
                    return angular.fromJson(data).data;
                }
            }
        });
    }
})();
