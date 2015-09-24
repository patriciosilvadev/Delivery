'use strict';

angular.module('shipper.controllers')

.controller('InicioCtrl', ['$scope', '$location', '$ionicPopup', 'UsuarioModel', 'Database', 'API', 'AuthService', 'randomString',
    function($scope, $location, $ionicPopup, UsuarioModel, Database, API, AuthService, randomString) {
    	cordova.plugins.backgroundMode.onfailure = function(errorCode) {
            alert('No ha sido posible iniciar el Servicio de Segundo Plano');
        };

        $scope.mySlides = [
            'images/slide1.png',
            'images/slide2.png',
            'images/slide3.png',
        ];

        $scope.isLogged = true;
        var checkString = randomString(32);
        UsuarioModel.init(Database, API, AuthService).then(
            function(resultado) {
                UsuarioModel.isLogged(Database, checkString).then(
                    function(respuesta) {
                        $location.path('/app/home');
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    },
                    function(error) {
                        $scope.isLogged = false;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }
                );
            },
            function(error) {
                console.log(error);
                $scope.isLogged = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $ionicPopup.alert({
                    title: 'Ha ocurrido un error',
                    template: 'Ha ocurrido un error al inicar la aplicación, por favor reinicia la aplicación. El administrado ha sido notificado.'
                });
            }
        );
    }
]);