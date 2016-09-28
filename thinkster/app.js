var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function () {
        var o = {
            posts: []
        };
        return o;
    }]);

app.controller('MainCtrl', [
    '$scope', 'posts',
    function ($scope, posts) {

        

        $scope.test = 'Hello world!';
        $scope.posts = [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 2},
            {title: 'post 3', upvotes: 15},
            {title: 'post 4', upvotes: 9},
            {title: 'post 5', upvotes: 4}
        ];

        $scope.addPost = function () {
            if (!$scope.title || $scope.title === '') {
                return;
            }
            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });
            posts.posts = $scope.posts;
            $scope.title = '';
            $scope.link = '';
        };
/* obsolete
        $scope.addComment = function () { console.log($scope.body);
            if ($scope.body === '') {
                return;
            }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });

            posts.post.comments  = $scope.post.comments;
            $scope.body = '';
        };
*/
        $scope.incrementUpvotes = function (post) {
            post.upvotes += 1;
        };

    }]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function ($scope, $stateParams, posts) { //console.log(posts);
        $scope.post = posts.posts[$stateParams.id];


        $scope.addComment = function () { //console.log($scope.body);
            if ($scope.body === '') {
                return;
            }
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 5
            });

            posts.post  = $scope.post;
            $scope.body = '';
        };

    }]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })

                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });


        $urlRouterProvider.otherwise('home');
    }]);
