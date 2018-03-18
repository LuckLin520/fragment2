$(function(){
	let thisId = location.search.slice(12);
	$.get("/mock/position.json", function(data){
		let index = findPro(thisId, data);
		let obj = {pro: data[index]};
		let html = template("pro", obj);
		$("main").html(html);
	})

	function findPro(id, arr){
		id *= 1;
		for(let i = 0; i < arr.length; i++)
			if(id === arr[i].positionId)
				return i;
		return -1;
	}
})
