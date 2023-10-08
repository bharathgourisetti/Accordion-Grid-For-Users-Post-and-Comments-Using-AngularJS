usersApp.controller('usersCtrl', usersCtrl);

usersCtrl.$inject = ['$scope', '$q', 'userDetailsService'];

function usersCtrl($scope, $q, userDetailsService) {

    let prevSelectedElements = {
        users: "",
        posts: "",
        comments: "",
    }
    this.$onInit = function () {
        getAllUsersList();
    }

    function getAllUsersList() {
        let usersList = userDetailsService.getUsersList();
        let postsList = userDetailsService.getPostsList();
        let commentsList = userDetailsService.getCommentsList();
        $q.all([usersList, postsList, commentsList]).then(function (serviceResponse) {
            // console.log("response from ctrl: " + JSON.stringify(serviceResponse));
            let usersObj = {
                usersList: [],
                postsList: [],
                commentsList: [],
                combinedUsersPostsCommentsList: []
            }
            angular.forEach(serviceResponse, function (response) {
                if (response.usersList) {
                    usersObj.usersList = response.usersList;
                }
                if (response.postsList) {
                    usersObj.postsList = response.postsList;
                }
                if (response.commentsList) {
                    usersObj.commentsList = response.commentsList;
                }
            })

            angular.forEach(usersObj.usersList, function (eachUser) {
                let buildUserObj = {
                    user: [],
                    posts: [],
                    comments: [],
                };
                buildUserObj.user.push(eachUser);
                angular.forEach(usersObj.postsList, function (eachPost) {
                    if (eachUser.id == eachPost.userId) {
                        buildUserObj.posts.push(eachPost);
                    }
                    angular.forEach(usersObj.commentsList, function (eachComment) {
                        if (eachUser.id == eachPost.id == eachComment.postId) {
                            buildUserObj.comments.push(eachComment);
                        }
                    })
                })
                usersObj.combinedUsersPostsCommentsList.push(buildUserObj);
            })


            // console.log(JSON.stringify(usersObj.combinedUsersPostsCommentsList));
            $scope.usersListObj = usersObj.combinedUsersPostsCommentsList;
        })
    }

    $scope.userLabelClick = function (userId) {
        debugger;
        if (prevSelectedElements.users) {
            removeElementsForID(prevSelectedElements.users);
            if (prevSelectedElements.users == `#posts_${userId}`) {
                prevSelectedElements.users = "";
                return;
            }
        }
        if (prevSelectedElements.posts) {
            removeElementsForID(prevSelectedElements.posts);
        }
        if (prevSelectedElements.comments) {
            removeElementsForID(prevSelectedElements.comments);
        }
        showElementsForID(`#posts_${userId}`)
        prevSelectedElements.users = `#posts_${userId}`;
    }

    $scope.postsLabelClick = function (postId) {
        if (prevSelectedElements.posts) {
            removeElementsForID(prevSelectedElements.posts);
            if (prevSelectedElements.posts == `#comments_${postId}`) {
                prevSelectedElements.posts = "";
                return;
            }
        }
        showElementsForID(`#comments_${postId}`)
        prevSelectedElements.posts = `#comments_${postId}`;
    }

    function showElementsForID(elementId) {
        document.querySelectorAll(elementId).forEach((eachItem) => { if (eachItem.classList) eachItem.classList.remove("hideBlock") });
    }
    function removeElementsForID(elementId) {
        document.querySelectorAll(elementId).forEach((eachItem) => { if (eachItem.classList) eachItem.classList.add("hideBlock") });
    }

}



