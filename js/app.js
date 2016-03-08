$(document).ready(function() {
	var form = $('#application-form form');
	
	form.submit(function(e) { e.preventDefault(); });

	form.on('valid', function () {
		form.hide();
		$('.spinner').show();

		var values = {};
		form.find("input, textarea").each(function() {
			if( $(this).val() !== "" ){
				var name = $(this).attr('name');
				values[name] = $(this).val();
			}
		})
		var jobsRef = new Firebase("https://weberemote.firebaseio.com/applicants/");
		var jobRef = jobsRef.child( slugify(values.jobId) );
		jobRef.push(values, function(error){
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

	function slugify(text){
		return text.toString().toLowerCase()
		.replace(/\s+/g, '-')           // Replace spaces with -
		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
	}
});