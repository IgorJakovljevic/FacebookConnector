/**
* @namespace
* @author Igor Jakovljevic 
* @example  
* // Sets the Id of your facebook ap and loads user token
* FacebookConnector._appId = "999999999999999";
* FacebookConnector.ready();
* }); 
* @description Javascript API for facebook */
var FacebookConnector = {
    /**
    *@member {String}
    *@description FacebookApplication ID 
    */
    _appId : "xxxxxxxxxxxxxxxx",
    /** 
    *@member {String}
    *@description User token for sendin and recieving data 
    */
    _userAccesToken : '',
    /** 
    **@member {String}
    *@description Users full name 
    */
    _userName : '',
    /** 
    **@member {bool}
    *@description Flag for detecting if user has allowed tha usage of facebook app 
    */
    _accessAllowed : false,
    
    /** 
    * @description Loads Facebook Javascript API
    * @function ready
    */
    ready : function() {
        
    window.fbAsyncInit = function() {      
          FB.init({
          appId      : FacebookConnector._appId,
          xfbml      : true,
          version    : 'v2.3'
        });
    };

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk/debug.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    setTimeout(function(){ 
    FacebookConnector.InitializeUser(); 
    }, 3000);
    },
    
    /** 
    * @description Loads user token and data from facebook
    * @function InitializeUser
    */
    InitializeUser : function(){
        
    FB.login(function(response) {
        
    if (response.authResponse) {
         FacebookConnector._userAccesToken =   FB.getAuthResponse()['accessToken'];
         this._accessAllowed = true;
        
        if(_accessAllowed){
                FB.api('/me', function(response) {
                FacebookConnector._userName = response.name;
                document.getElementById('username').innerHTML =  FacebookConnector._userName;
                });
        }
    }
    else {
        alert("To use this aplication you have to allow acces to the application.");
    }
    }, {scope: 'email,user_likes,publish_actions,user_friends'});
     
    },
    /**
     * @function searchPlaces
     * @description Searches facebook for places with 
     * @param {string} searchText - Search parameter or url for next page in previous search
     * @example
     * // Searches places with text beer in their name
     * FacebookConnector.searchPlaces("beer", false, function(response){
     *  console.log(response);
     * });
     * @param {bool} isNextUrl - indicator if searchText url or search prameter
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    searchPlaces : function(searchText, isNextUrl, callback){
        if(_accessAllowed){            
            var xmlhttp;
            var url = "";
            if(isNextUrl){
                url = searchText;
            }
            else{
                url = "https://graph.facebook.com/v2.3/search?";

            url += 'q=' + searchText +'&type=place';
            url += '&access_token=' + this._userAccesToken;
            }
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }     
    },
    /**
     * @function searchUsers
     * @description Searches facebook for users containing search text 
     * @example
     * // Searches for all Igors on facebook
     * FacebookConnector.searchUsers("Igor", false, function(response){
     *  console.log(response);
     * });
     * @param {string} searchText - Search parameter or url for next page in previous search
     * @param {bool} isNextUrl - indicator if searchText url or search prameter
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    searchUsers : function(searchText, isNextUrl, callback){
        if(_accessAllowed){            
            var xmlhttp;
            var url = "";
            if(isNextUrl){
                url = searchText;
            }
            else{
                url = "https://graph.facebook.com/v2.3/search?";

            url += 'q=' + searchText +'&type=user';
            url += '&access_token=' + this._userAccesToken;
            }
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }     
    },
    /**
     * @function searchPages
     * @description Searches facebook for pages containing search text 
     * @example  
     * // Searches facebook pages that have the word Wohnung in their name
     * FacebookConnector.searchPages("Wohnung", false, function(response){
     * console.log(response);
     * });
     * @param {string} searchText - Search parameter or url for next page in previous search
     * @param {bool} isNextUrl - indicator if searchText url or search prameter
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    searchPages : function(searchText, isNextUrl, callback){
        if(_accessAllowed){            
            var xmlhttp;
            var url = "";
            if(isNextUrl){
                url = searchText;
            }
            else{
                url = "https://graph.facebook.com/v2.3/search?";

            url += 'q=' + searchText +'&type=page';
            url += '&access_token=' + this._userAccesToken;
            }
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }     
    },
     /**
     * @function searchEvents
     * @description Searches facebook for Events containing search text 
     * @example    
     * // Searches facebook for Events containing search text 
     * FacebookConnector.searchEvents("Party", false, function(response){
     * console.log(response);
     * });
     * @param {string} searchText - Search parameter or url for next page in previous search
     * @param {bool} isNextUrl - indicator if searchText url or search prameter
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    searchEvents : function(searchText, isNextUrl, callback){
        if(_accessAllowed){            
            var xmlhttp;
            var url = "";
            if(isNextUrl){
                url = searchText;
            }
            else{
                url = "https://graph.facebook.com/v2.3/search?";

            url += 'q=' + searchText +'&type=event';
            url += '&access_token=' + this._userAccesToken;
            }
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }     
    },
     /**
     * @function searchGroups
     * @description Searches facebook for groups containing search text 
     * @example
     * // Searches facebook for groups containing "graz" 
     * FacebookConnector.searchGroups("graz", false, function(response){
     * console.log(response);
     * });
     * @param {string} searchText - Search parameter or url for next page in previous search
     * @param {bool} isNextUrl - indicator if searchText url or search prameter
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    searchGroups : function(searchText, isNextUrl, callback){
        if(_accessAllowed){            
            var xmlhttp;
            var url = "";
            if(isNextUrl){
                url = searchText;
            }
            else{
                url = "https://graph.facebook.com/v2.3/search?";

            url += 'q=' + searchText +'&type=group';
            url += '&access_token=' + this._userAccesToken;
            }
            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url, true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }     
    },
    /**
     * @function share
     * @description Shares text on users facebook wall 
     * @param {string} shareText - Text that is shared on users wall
     */
    share : function(shareText){
        if(_accessAllowed){   
            var url = 'https://graph.facebook.com/v2.3/me/feed';
        
            var requestParameters = "";
            requestParameters += "message="+shareText;
            requestParameters += "&access_token="+this._userAccesToken;

            xmlhttp.open("POST", url);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(requestParameters);
        }
    },
    /**
     * @function getFriendCount
     * @description Gets count of friends of the current user
     * @example  
     * // Gets count of friends of the current user
     * FacebookConnector.getFriendCount(function(response){
     * console.log(response);
     * }); 
     * @param {function(string)} callback(responseText) - callback function that returns request result as a string
     */
    getFriendCount : function(callback){
        if(_accessAllowed){   
            var url = 'https://graph.facebook.com/v2.3/me/friends';
            url += '?access_token='+this._userAccesToken;

            if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
              xmlhttp=new XMLHttpRequest();
              }
            else
              {// code for IE6, IE5
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
            xmlhttp.onreadystatechange=function()
              {
              if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {       
                 callback(xmlhttp.responseText);
                }
              }

            xmlhttp.open("GET", url);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }
    },
    /** 
    * @description Tests if the js library works 
    * @function testAPI
    */
    testAPI : function(){
        if (_accessAllowed){   
            
        FacebookConnector.searchPlaces("beer", false, function(response){
         console.log(response);
        });
        
        FacebookConnector.searchUsers("Igor", false, function(response){
         console.log(response);
        });
            
        FacebookConnector.searchPages("Wohnung", false, function(response){
         console.log(response);
        });
            
        FacebookConnector.searchEvents("Party", false, function(response){
         console.log(response);
        });
            
        FacebookConnector.searchGroups("graz", false, function(response){
         console.log(response);
        });
            
            
        FacebookConnector.getFriendCount(function(response){
         console.log(response);
        }); 
            
        }
        else {
            console.log("User has not allowed usage of the app.");
        }
    }
}