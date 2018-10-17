$(function(){

	//The inactive iFrame loses its bottom and right poition
	//The inactive iFrame has a parent div with a class of x-hide-display that is added when it bevome inactive

	/*
	Div with a class of sd_primary_container and without a class of x-hide-display
		iFrame child of that DIV
	*/

	//Set the iFrame DOM to a letiable
	//let iFrameDOM = $("#ext-comp-1012").contents
	let iFrameDOM;

	function findActiveiFrame() {
		iFrameDOM= $('.sd_primary_container').not('x-hide-display').find('iframe').contents();
		console.log(iFrameDOM);
		return iFrameDOM;
	}


	//Fill User Names Affected <input>
	function fillUserName(){
		let input = iFrameDOM.find("#00N300000018noG");
		input.attr('value', 'N/A');
	}

	//Fill Subject <input>
	function fillSubject(){
		let input = iFrameDOM.find("#cas14");
		input.attr('value', 'Incomplete Case (Script Generated)');
	}

	//Fill Description <textarea>
	function fillDescription(){
		let input = iFrameDOM.find("#cas15");
		input.append('ISSUE: \r\n\r\nTROUBLESHOOTING & NOTES: \r\n\r\nRESOLUTION:');
	}

	//Fill Product <select>
	function fillProduct(){
		let input = iFrameDOM.find("#00N80000005RDzA");
		input.val('N/A');
	}

	//Fill Service Issue <select>
	function fillServiceIssue(){
		let input = iFrameDOM.find("#00N300000018QgS");
		input.val('N/A');
	}

	//Fill Operating System Optgroup -> Option
	function fillOperatingSystem(){
		let input = iFrameDOM.find("#00N300000018QhL_selected").children();
		input.append('<option value="1">…</option>');
	}

	//Fill Device Optgroup -> Option
	function fillDevice(){
		let input = iFrameDOM.find("#00N300000018o2W_selected").children();
		input.append('<option value="16">…</option>');
	}

	//Group all previous functions under one super function to be run on response from the background script

	function autoCase() {
		findActiveiFrame(iFrameDOM);
		fillUserName();
		fillSubject();
		fillDescription();
		fillProduct();
		fillServiceIssue();
		fillOperatingSystem();
		fillDevice();
	}

	//Recieve Response from
	chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ? sender.tab.url :
								"autocase: Clicked");
		if (request.greeting == "hello") {
			sendResponse({farewell: "goodbye"});
			//Triggers the actual autofill script
			autoCase();
		}
	});

});
