'use strict';

//http://docs.cartodb.com/cartodb-platform/cartodb-js.html
function CartoDBSimpleExample($scope) {
    //cartodb.createVis('map', 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
    cartodb.createVis('map', 'https://elmesamola.cartodb.com/api/v2/viz/94e03810-f9c1-11e4-abb5-0e4fddd5de28/viz.json')
        .done(function(vis, layers) {
            // layer 0 is the base layer, layer 1 is cartodb layer
            // when setInteraction is disabled featureOver is triggered
            /*
                    layers[1].setInteraction(true);
                    layers[1].on('featureOver', function(e, latlng, pos, data, layerNumber) {
                        console.log(e, latlng, pos, data, layerNumber);
                    });
					*/

            // you can get the native map to work with it
            $scope.map = vis.getNativeMap();

            // now, perform any operations you need, e.g. assuming map is a L.Map object:
            // map.setZoom(3);
            // map.panTo([50.5, 30.5]);

            console.log('CartodbCtrl.CartoDBSimpleExample() - vis.getLayers(): %O', vis.getLayers());
        });

}

//https://elmesamola.cartodb.com/api/v2/viz/94e03810-f9c1-11e4-abb5-0e4fddd5de28/viz.json

////////////////////////////////////////////// 
///
/// Creating visualizations at runtime
/// 	http://docs.cartodb.com/cartodb-platform/cartodb-js.html#creating-visualizations-at-runtime
/// 
////////////////////////////////////////////// 
function CartoDBRuntimeExample($scope, leafletData) {
    /*
    var map;
    var mapOptions = {
        zoom: 5,
        center: [43, 0]
    };
    $scope.map = new L.Map('map', mapOptions);
	*/


    $scope.map = L.map('map').setView([40.416955, -3.703517], 11);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo($scope.map);

    // add a marker in the given location, attach some popup content to it and open the popup
    //L.marker([51.5, -0.09]).addTo($scope.map)
    //    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    //    .openPopup();

    cartodb.createLayer($scope.map, 'https://elmesamola.cartodb.com/api/v2/viz/94e03810-f9c1-11e4-abb5-0e4fddd5de28/viz.json')
        .addTo($scope.map)
        .on('done', function(layer) {
            console.log('CartodbCtrl.CartoDBRuntimeExample() - CartoDB Layer added');
        });

    /*
    var table_name = 'reformad_datagenerator_v1_2015_5_14_30000rows';
    cartodb.createLayer($scope.map, {
            user_name: 'elmesamola',
            type: 'cartodb',
            sublayers: [{
                sql: "SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows",
                cartocss: '#table_name {marker-fill: #F0F0F0;}'
            }]
        })
        .addTo($scope.map) // add the layer to our map which already contains 1 sublayer
        .done(function(layer) {

            // create and add a new sublayer
            layer.createSubLayer({
                sql: "SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows limit 200",
                cartocss: '#table_name {marker-fill: #F0F0F0;}'
            });

            // change the query for the first layer
            layer.getSubLayer(0).setSQL("SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows limit 10");

            //$scope.$apply();
        });
	*/

    /*
    leafletData.getMap('map_cartodb').then(function(map) {
        console.log('CartodbCtrl - CartoDBRuntimeExample - Raw leaflet map: %O', map);
        $scope.map = map;

        var table_name = 'reformad_datagenerator_v1_2015_5_14_30000rows';
        cartodb.createLayer($scope.map, {
                user_name: 'elmesamola',
                type: 'cartodb',
                sublayers: [{
                    sql: "SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows",
                    cartocss: '#table_name {marker-fill: #F0F0F0;}'
                }]
            })
            .addTo($scope.map) // add the layer to our map which already contains 1 sublayer
            .done(function(layer) {

                // create and add a new sublayer
                layer.createSubLayer({
                    sql: "SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows limit 200",
                    cartocss: '#table_name {marker-fill: #F0F0F0;}'
                });

                // change the query for the first layer
                layer.getSubLayer(0).setSQL("SELECT * FROM reformad_datagenerator_v1_2015_5_14_30000rows limit 10");

                //$scope.$apply();
            });
    });
	*/
}

/**
 * @ngdoc function
 * @name reforMadApp.controller:CartodbCtrl
 * @description
 * # CartodbCtrl
 * Controller of the reforMadApp
 */
angular.module('reforMadApp')
    .controller('CartodbCtrl', ['$scope', 'leafletData', function($scope, leafletData) {

        $scope.map = {
            center: {
                lat: 40.416955,
                lng: -3.703517,
                zoom: 11
            }
        };

        angular.element(document).ready(function() {
            console.log('CartodbCtrl - document.ready()');

            CartoDBSimpleExample($scope);

            //CartoDBRuntimeExample($scope, leafletData);



            ////////////////////////////////////////////// 
            ///
            /// ADDING CARTODB AS A LAYER TO A LEAFLET MAP ALREADY CREATED
            ///
            ////////////////////////////////////////////// 
            /*
            var map = new L.Map('map_canvas', {
                center: [0, 0],
                zoom: 2
            });

            cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
                .addTo(map)
                .on('done', function(layer) {
                    //do stuff
                })
                .on('error', function(err) {
                    alert("some error occurred: " + err);
                });
			*/
        });
    }]);