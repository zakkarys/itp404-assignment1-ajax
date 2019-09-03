$('#subreddit-link').submit(function(event) {
  event.preventDefault();
  $('#results').toggleClass('loader');
  $('#results').html('');
  


	let subredditsearch = $('#search').val(); 

	let promise = $.ajax({
		type: 'GET',
		url: 'https://www.reddit.com/r/' + subredditsearch + '.json'
	});

	// promise.then(function(listing) {
	// 	console.log(listing.data.children);
	// });
	promise.then(function(listing){
		let fragment = document.createDocumentFragment();

		listing.data.children.forEach(function(list){
			console.log(list); 
			let div = document.createElement('div');
			let a = document.createElement('a');
			a.target= "_blank"; 
			a.href= list.data.url;
			let p = document.createElement('p');
			let p2 = document.createElement('p');
			let hr = document.createElement('hr')

			a.innerText = "Title:" + " " + list.data.title; 
			p.innerText = "Score:" + " " + list.data.score; 
			p2.innerText = "Author:" + " " + list.data.author;
			
			div.append(a);
			div.append(p);
			div.append(p2);
			div.append(hr);
			fragment.append(div); 


		}); 
		$('#results').toggleClass('loader');
		$('#results').html(fragment); 

	});

	promise.fail(function(fail){
		$('#results').toggleClass('loader');
		$('#results').html('No ' + subredditsearch + ' subreddit found. Please search again.' )
	});


});