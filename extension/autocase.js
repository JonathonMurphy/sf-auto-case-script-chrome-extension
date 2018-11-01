$(function(){
	//Set and refresh the iFrame jQuery selector
	let iFrameDOM;
	function findActiveiFrame() {
		iFrameDOM= $('.sd_primary_container').not('x-hide-display').find('iframe').contents();
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
	//Fill Device Optgroup -> Option
	function fillDevice(){
		let available = iFrameDOM.find("#00N300000018o2W_unselected");
		available.val('16');
		let add = iFrameDOM.find('.multiSelectPicklistCell').eq(0).find('img').eq(0);
		add.trigger('click');
	}
	//Fill Operating System Optgroup -> Option
	function fillOperatingSystem(){
		let available = iFrameDOM.find("#00N300000018QhL_unselected");
		available.val('11');
		let add = iFrameDOM.find('.multiSelectPicklistCell').eq(1).find('img').eq(0);
		add.trigger('click');
	}

	//Group all previous functions under one super function to be run on response from the background script
	function autoCase() {
		findActiveiFrame(iFrameDOM);
		fillUserName();
		fillSubject();
		fillDescription();
		fillProduct();
		fillServiceIssue();
		fillDevice();
		fillOperatingSystem();
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
