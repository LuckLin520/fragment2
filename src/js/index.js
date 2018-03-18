$(function(){
	$.get("mock/position.json", function(data){
		let obj = {pro: data};
		let html = template("list", obj);
		$(".list").html(html);
		$(".list li").click(function(){
			let positionId = $(this).attr("positionId");
			location.assign("/html/detail.html?positionId="+positionId);

		})
	})

	
})