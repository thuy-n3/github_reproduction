// console.log("hey there")
// console.log($)

//============================================================
//to get gh-pages to work without revoking token



var name


// console.log(name)

// console.log('token>>>' + token)

// var url = 'https://api.github.com/users/thuy-n3/repos'

// var params = {
// 	access_token: token
// }


//===========================================genParamFunction

// var userUrl = "https://api.github.com/users/thuy-n3"
// var repoUrl = "https://api.github.com/users/thuy-n3/repos"
// https://api.github.com/users=thuy-n3?access_token=b14fb77cc2c0e457cd201b7234ed8382bbb51054

var baseUrl = "https://api.github.com/users/"

try {
	token = "?access_token=" + global_key
}
catch(e) {
	token = ''
}

	// usersName = searchValue

	// userParam = {
	// 	access_token:  token 
	// },
	// repoParam = {
	// 	access_token: token
	// } 

	// console.log("generateParamString", generateParamString)
	// var generateParamString = function(paramObject) {
 //    var outputString = '?'
 //    for (var key in paramObject) {
 //     	outputString += key + '=' + paramObject[key] + '&'
 //    }
 //    return outputString.substr(0,outputString.length - 1)

// }


//===========================================================================making promises

var userContainer = document.querySelector("#profileContainer")
var repoContainer = document.querySelector("#repoContainer") 


var createUserUrl = function(usersName){
	return baseUrl + usersName + token 
}

var createRepoUrl = function(usersName){
	return baseUrl + usersName + "/" + "repos" + token   
}


// console.log("fetchAndShow>>>>>",fetchAndShow)
var fetchAndShow = function(usersName){


	var userPromise = $.getJSON(createUserUrl(usersName))
	var repoPromise = $.getJSON(createRepoUrl(usersName))

	userPromise.then(handleUserPromise)
	repoPromise.then(handleRepoPromise)

}



//====================================================================handling user promises 

var handleUserPromise = function(userResponseObj){
	// console.log("userResponseObj>>>>",userResponseObj)

	// console.log(userResponseObj.name)
	// console.log(userResponseObj.avatar_url)

	var profileToHTMLString = ""

	// for(var i=0; i<userResponseObj.length; i++){

	// 	var userDataArr = userResponseObj[i]
	// 	console.log("userDataArr>>>>", userDataArr)

		profileToHTMLString += '<div class="profileNameBox">'
		profileToHTMLString += 		'<img class="profileImg" src="' + userResponseObj.avatar_url + '">'
		profileToHTMLString +=  	'<h1 class="loginName">' + userResponseObj.name + '</h1>'
		profileToHTMLString +=		'<h3 class="userName">' + userResponseObj.login + '</h3>'
		profileToHTMLString += '</div>' 


		profileToHTMLString += '<div class="profileDetails">'
		profileToHTMLString += 		'<p class="location">' + userResponseObj.location + '</p>'
		profileToHTMLString += 		'<a href="mailto:ms.thuynguyen@gmail.com">' + '<p class="email">' + userResponseObj.email + '</a>' + '</p>'
		profileToHTMLString += 		'<a href="https://medium.com/@ms.thuynguyen">' + '<p class="blog">' + userResponseObj.blog + '</a>' + '</p>'
		profileToHTMLString += 		'<p>' + '<p class="joined"> Joined on </span>' + userResponseObj.created_at + '</p>'
		profileToHTMLString += '</div>'

		profileToHTMLString += '<div class="followerDetails">'
		profileToHTMLString += 		'<div class="followers inside">' + '<p>' + userResponseObj.followers + '</p>' + '<span class="followerTitle">Followers</span>' + '</div>'
		// profileToHTMLString += 		'<div class="starred">' + userResponseObj.starred + '</div>'
		profileToHTMLString += 		'<div class="starred inside">' + '<p>' + '2' + '</p>' + 'Starred' + '</p>' + '</div>'
		profileToHTMLString += 		'<div class="following inside">' + '<p>' + userResponseObj.following + '</p>' +'<span class="followingTitle">Following</span>' + '</div>'
		profileToHTMLString += '</div>'

		// profileToHTMLString += '<div class="organizations">' + userResponseObj.organizations + '</div>'

	// }


	profileContainer.innerHTML = profileToHTMLString		

}



//================================================================================handling repo promises 

var handleRepoPromise = function(repoResponseObj){
	// console.log(repoResponseObj)

	var repoToHTMLString = ""

	for(var i=0; i<repoResponseObj.length; i++){

		// repoToHTMLString = 
		//dont assign obj to be string...can access from response obj [i]
		//if must turn obj to string....
		var objRepo = repoResponseObj[i]//.toString() + ''
		// console.log("objRepo", objRepo)

		if(objRepo.description === null){
			objRepo.description = "no description"
		}
		if(objRepo.language === null){
			objRepo.description = "no description"
		}

	
		
    // repoToHTMLString += '<p class=repoName>' + repoResponseObj[i].name + '</p>'
		repoToHTMLString +='<div class="repo">'
		repoToHTMLString += '<a href=' + objRepo.html_url + '>' + '<p class=repoName>' + '<h2>' + objRepo.name+ '</h2>' + '</a>' + '</p>'
		repoToHTMLString += '<p class=repoDetail>' + objRepo.description + '</p>'
		repoToHTMLString += '<p class=updatedAt>' + objRepo.updated_at + '<p>'

		// repoToHTMLString += '<div class="repoRightDetails>'
		repoToHTMLString += '<div class="repoRightSide">'
		repoToHTMLString += '<p class=language  >' + objRepo.language + '<p>'
		repoToHTMLString += '<p class=stargazers_count >' + '<span class="octicon octicon-star"></span>'  + objRepo.stargazers_count  + '<p>'
		repoToHTMLString += '<p class=forks >' + '<span class="octicon octicon-git-branch"></span>' + objRepo.forks + '<p>'
		repoToHTMLString += '</div>'


		repoToHTMLString += '</div>'

	}

		repoContainer.innerHTML = repoToHTMLString
	// console.log(repoToHTMLString)
	
}




//==========================================================================profile search 

var searchBarInput = document.querySelector(".searchInput")


var userSearchFunction = function(evtObj){
// console.log(evtObj)



	if(evtObj.keyCode === 13){

		var searchInput = evtObj.target
		var searchValue = searchInput.value
		console.log("searchInput>>>", searchValue)

		window.location.hash = "#" + searchValue
		searchInput.value = ""
	}

		

}

//=======================================================================Controller 



var controller = function(){


 	var bodyContainer = document.querySelector("#container")

 	var userInHash = window.location.hash.slice(1)
 	console.log("userInHash>>>>>", userInHash)

 	if(userInHash.length >= 1){
 		fetchAndShow(userInHash)
 	}
 	else{
 		fetchAndShow("thuy-n3")
 	}

 	// var userWithHash = window.location.hash
 	// // console.log("userWithHash",userWithHash)
 	// var userNoHash = userWithHash.slice(1)
 	// // console.log("userNoHash",userNoHash)

 	// fetchAndShow(userNoHash)

 }

controller()

searchBarInput.addEventListener('keydown', userSearchFunction)

window.addEventListener("hashchange", controller)




