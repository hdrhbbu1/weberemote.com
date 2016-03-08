$(document).ready(function() {
	var form = $('#application-form form');
	
	form.submit(function(e) { e.preventDefault(); });

	form.on('valid', function () {
		form.hide();
		$('.spinner').show();

		var values = form.find("input, textarea").each(function() {  $(this).val() == "" && $(this).remove(); }).serialize();
		var values = unserialize( values );

		var jobsRef = new Firebase("https://weberemote.firebaseio.com/");
		jobsRef.push(values, function(error){
			if( error ){
		        $('#application-form').html('<div class="large-12 small-12 columns"><h2>Uh-oh, something went wrong!</h2><p>Looks like our API is down. Mind trying again in a few minutes?</p></div>');
			}else{
				$('#application-form').html('<div class="large-12 small-12 columns"><h2>Thanks for Applying!</h2><p>Your application was successfully submitted, keep an eye on your inbox for updates!</p></div>');
			}
		});
	});

	// Email signup thankyou
	if(window.location.hash == "#thankyou") {
		$("#mc_embed_signup").html("<h3 class='center'>Thanks for signing up!</h3>");
	}

	function unserialize(serializedString){
		var str = decodeURI(serializedString); 
		var pairs = str.split('&');
		var obj = {}, p, idx;
		for (var i=0, n=pairs.length; i < n; i++) {
			p = pairs[i].split('=');
			idx = p[0]; 
			if (obj[idx] === undefined) {
				obj[idx] = unescape(p[1]);
			}else{
				if (typeof obj[idx] == "string") {
					obj[idx]=[obj[idx]];
				}
				obj[idx].push(unescape(p[1]));
			}
		}
		return obj;
	};
});