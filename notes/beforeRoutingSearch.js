// console.log("hey there")
// console.log($)

//============================================================
//to get gh-pages to work without revoking token



// var name

// try {
// 	var token = GLOBAL_TOKEN
// }
// catch (e) {
// 	var token = ''
// }

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



var userUrl = "https://api.github.com/users/thuy-n3",
	repoUrl = "https://api.github.com/users/thuy-n3/repos",
	// myUser = "users/thuy-n3?"
	token = global_key,

	userParam = {
		access_token:  token 
	}, 
	repoParam = {
		// users: "thuy-n3",
		access_token: token
	} 

var generateParamString = function(paramObj){
	var outputString = ''
	// console.log("paramObj>>>",paramObj)
		for(var token in paramObj){
		// console.log("token>>",token) //value
		// console.log("paramObj[token]>>>>", paramObj[token]) //key

		outputString += "?" +  token  +  "=" + paramObj[token] 
		// console.log("outputString>>>", outputString) //users=thuy-n3? //need to be "users/thuy-n3?""

	}

	return outputString
	// return outputString.substr(0,outputString.length-1)
	// console.log(outputString)

}


var userFullUrl = userUrl   + generateParamString(userParam)
// console.log("userFullUrl>>>>",userFullUrl)

var repoFullUrl = repoUrl  + generateParamString(userParam)
// console.log("repoFullUrl>>>",repoFullUrl)

//====================================================================handling user promises 

var handleUserPromise = function(userResponseObj){
	console.log("userResponseObj>>>>",userResponseObj)

	console.log(userResponseObj.name)
	console.log(userResponseObj.avatar_url)

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
		profileToHTMLString += 		'<p class="email">' + userResponseObj.email + '</p>'
		profileToHTMLString += 		'<p class="blog">' + userResponseObj.blog + '</p>'
		profileToHTMLString += 		'<span class="joined"> Joined on</span>' + '<p>' + userResponseObj.created_at + '</p>'
		profileToHTMLString += '</div>'

		profileToHTMLString += '<div class="followerDetails">'
		profileToHTMLString += 		'<div class="followers">' + userResponseObj.followers + '<span class="followerTitle">Followers</span>' + '</div>'
		// profileToHTMLString += 		'<div class="starred">' + userResponseObj.starred + '</div>'
		profileToHTMLString += 		'<div class="following">' + userResponseObj.following + '<span class="followingTitle">Following</span>' + '</div>'
		profileToHTMLString += '</div>'

		// profileToHTMLString += '<div class="organizations">' + userResponseObj.organizations + '</div>'

	// }


	profileContainer.innerHTML = profileToHTMLString		

}




//====================================================================handling repo promises 

var handleRepoPromise = function(repoResponseObj){
	// console.log(repoResponseObj)

	var repoToHTMLString = ""

	for(var i=0; i<repoResponseObj.length; i++){

		// repoToHTMLString = 
		//dont assign obj to be string...can access from response obj [i]
		//if must turn obj to string....
		var objRepo = repoResponseObj[i]//.toString() + ''
		console.log("objRepo", objRepo)

		if(objRepo.description === null){
			objRepo.description = "no description"
		}
		if(objRepo.language === null){
			objRepo.description = "no description"
		}

		// var noDetail = function(){
		// 	if(objRepo === null){
		// 		objRepo = "no description"
		// 	}
		// }

		
    // repoToHTMLString += '<p class=repoName>' + repoResponseObj[i].name + '</p>'
		repoToHTMLString +='<div class="repo">'
		repoToHTMLString +='<p class=repoName>' + objRepo.name + '</p>'
		repoToHTMLString += '<p class=repoDetail>' + objRepo.description + '</p>'
		repoToHTMLString += '<p class=updatedAt>' + objRepo.updated_at + '<p>'

		// repoToHTMLString += '<div class="repoRightDetails>'
		repoToHTMLString += '<div class="repoRightSide">'
		repoToHTMLString += '<p class=language>' + objRepo.language + '<p>'
		repoToHTMLString += '<p class=stargazers_count>' + '<span class="octicon octicon-star"></span>' + objRepo.stargazers_count + '<p>'
		repoToHTMLString += '<p class=forks>' + '<span class="octicon octicon-git-branch"></span>' + objRepo.forks + '<p>'
		repoToHTMLString += '</div>'


		repoToHTMLString += '</div>'

	}

		repoContainer.innerHTML = repoToHTMLString
	// console.log(repoToHTMLString)
	
}

//==========================================================================profile search 

var searchBar = document.querySelector(".searchInput")




//===========================================================================making promises

var userContainer = document.querySelector("#profileContainer")
var repoContainer = document.querySelector("#repoContainer") 


// console.log(fetchAndShow)
var fetchAndShow = function(userNameInput){

	var userPromise = $.getJSON(userFullUrl)
	var repoPromise = $.getJSON(repoFullUrl)

	userPromise.then(handleUserPromise)
	repoPromise.then(handleRepoPromise)

}

fetchAndShow("thuy-n3")


//========================================================================================


