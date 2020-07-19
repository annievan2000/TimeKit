// alert("connected")	


// we can check off specific To-Do by clicking
$("ul").on("click", "li", function(){
	// add strikethrough?, we can do toggle here
	// if gray -> black.
	$(this).toggleClass("completed")	
})



// click on X to delete todos
$("ul").on("click", "span", function(){

	$(this).parent().fadeOut(500, function(){

		$(this).remove();
	});

	event.stopPropagation();
})


$("input[type='text']").keypress(function(event){
	if(event.which===13){
		// take the text, and add new li
		var todoText = $(this).val();
		$(this).val("");

		// create a new li and append it to the new ul
		$("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " +
			 todoText + "</li>")

		// how to make it dynamically follow the previous code


	}
})








$(".fa-pencil-alt").click(function(){
	$("input[type='text']").fadeToggle();
})










