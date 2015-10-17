(function() {
    'use strict';

    angular
        .module('rattus')
        .controller('MainController', ['$q', 'ImageLatency', MainController]);

    /** @ngInject */
    function MainController($q, ImageLatency) {
        var vm = this;

        var correctDeferred = $q.defer();
        var correctImageLatencies = ImageLatency.query({correct: 'correct'}, function() {
            correctDeferred.resolve(correctImageLatencies);
        });

        var incorrectDeferred = $q.defer();
        var incorrectImageLatencies = ImageLatency.query({correct: 'incorrect'}, function() {
            incorrectDeferred.resolve(incorrectImageLatencies);
        });

        // wait for both calls
        $q.all([correctDeferred.promise, incorrectDeferred.promise]).then(function(data) {
            var correctSeries = {
                key: 'Correct Image Latency',
                values: []
            };
            angular.forEach(data[0], function(value) {
                correctSeries.values.push([value['distance-gp'], value['correct-image-response-latency']])
            });

            var incorrectSeries = {
                key: 'Incorrect Image Latency',
                values: []
            };
            angular.forEach(data[1], function(value) {
                incorrectSeries.values.push([value['distance-gp'], value['incorrect-image-latency']])
            });
            vm.data = [correctSeries, incorrectSeries];
        });

        vm.colors = function() {
            var colorArray = ['#FF0000', '#0000FF', '#FFFF00', '#00FFFF'];
            return function(d, i) {
                return colorArray[i];
            };
        };
    }
})();
