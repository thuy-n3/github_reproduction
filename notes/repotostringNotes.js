var handleRepoPromise = function(repoResponseObj){
	// console.log(repoResponseObj)

	var repoToHTMLString = ""

	
	
	for(var i=0; i<objRepo.length; i++){

		var objRepo = repoResponseObj[i]

		// repoToHTMLString = 
		//dont assign obj to be string...can access from response obj [i]
		//if must turn obj to string....
		// var objRepo = repoResponseObj[i]//.toString() + ''
		// console.log("objRepo", objRepo)

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
    	repoToHTMLString = '<div class="repo">'
		repoToHTMLString +='<p class=repoName>' + objRepo.name + '</p>'
		repoToHTMLString += '<p class=repoDetail>' + objRepo.description + '</p>'
		repoToHTMLString += '<p class=updatedAt>' + objRepo.updated_at + '<p>'

		// repoToHTMLString += '<div class="repoRightDetails>'
		repoToHTMLString += '<p class=programLanguage>' + objRepo.language + '<p>'
		repoToHTMLString += '<p class=stargazers_count>' + objRepo.stargazers_count + '<p>'
		repoToHTMLString += '<p class=forks>' + objRepo.forks + '<p></div>'
		repoToHTMLString += '<hr/>'

	}

		repoContainer.innerHTML = repoToHTMLString
	// console.log(repoToHTMLString)
	
}






























//===========================================================================making promises

var userContainer = document.querySelector("#profileContainer")
var repoContainer = document.querySelector("#repoContainer") 


// console.log("fetchAndShow>>>>>",fetchAndShow)
var fetchAndShow = function(userNameInput){


	var userPromise = $.getJSON(userFullUrl)
	// console.log("userPromise>>>",userPromise)

	var repoPromise = $.getJSON(repoFullUrl)
	// console.log("repoPromise>>>>", repoPromise)

	// var userPromise = $.getJSON(userFullUrl(userNameInput))
	// var repoPromise = $.getJSON(repoFullUrl(userNameInput))

	userPromise.then(handleUserPromise)
	repoPromise.then(handleRepoPromise)





//==================================================================runs At Initilaization - What happen when the page first load 

//checking to see if there is a hash in the url bar 

var userInHash = window.location.hash.slice(1) //slicing of the # 

if(userInHash.length >= 1){	//if the length is more than one - there a name in the hash 
	fetchAndShow(userInHash)
}
else{
	fetchAndShow("thuy-n3") //if there is no name than go to "thuy-n3" page 

}

fetchAndShow(userNameInput)

}
//=======================================================================Routing on hashChange 

// window.addEventListener("hashchange", fetchAndShow)
//  console.log("hashChange")

// 	var bodyContainer = document.querySelector('#container')

// 	var userWithHash = window.location.hash 
// 	console.log("userWithHash>>>>", userWithHash)
// 	var userWithNoHash = userWithHash.slice(1)
// 	console.log("userWithNoHash>>>", userWithNoHash)

	

