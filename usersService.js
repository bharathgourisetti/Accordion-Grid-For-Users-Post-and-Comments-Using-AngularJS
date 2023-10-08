usersApp.service('userDetailsService', userDetailsService)

userDetailsService.$inject = ['$http'] 

function userDetailsService($http){

  return {
    httpRequest,
    getUsersList,
    getPostsList,
    getCommentsList,
    // getAllListItems,
  }
  
  function getUsersList(){
     return this.httpRequest("https://jsonplaceholder.typicode.com/users").then(function(result){
          return {usersList: result.data};
     });
  }

   function getPostsList(){
     return this.httpRequest("https://jsonplaceholder.typicode.com/posts").then(function(result){
          return {postsList: result.data};
     });
  }

   function getCommentsList(){
     return this.httpRequest("https://jsonplaceholder.typicode.com/comments").then(function(result){
          return {commentsList: result.data};
     });
  }

  function httpRequest(methodUrl) {
    return $http({
      method: "GET",
      url: methodUrl,
    }).then((response) => {
      return response;
    })
  }
  
}