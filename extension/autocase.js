$(function(){
	//Set the iFrame DOM to a variable
	var iFrameDOM = $("#ext-comp-1012").contents();

	//Fill User Names Affected <input>
	function fillUserName(){
		var input = iFrameDOM.find("#00N300000018noG");
		input.attr('value', 'N/A');
	}

	//Fill Subject <input>
	function fillSubject(){
		var input = iFrameDOM.find("#cas14");
		input.attr('value', 'Incomplete Case (Script Generated)');
	}

	//Fill Description <textarea>
	function fillDescription(){
		var input = iFrameDOM.find("#cas15");
		input.append('ISSUE: \r\n\r\nTROUBLESHOOTING & NOTES: \r\n\r\nRESOLUTION:');
	}

	//Fill Product <select>
	function fillProduct(){
		var input = iFrameDOM.find("#00N80000005RDzA");
		input.val('N/A');
	}

	//Fill Service Issue <select>
	function fillServiceIssue(){
		var input = iFrameDOM.find("#00N300000018QgS");
		input.val('N/A');
	}

	//Fill Operating System Optgroup -> Option
	function fillOperatingSystem(){
		var input = iFrameDOM.find("#00N300000018QhL_selected").children();
		input.append('<option value="1">…</option>');
	}

	//Fill Device Optgroup -> Option
	function fillDevice(){
		var input = iFrameDOM.find("#00N300000018o2W_selected").children();
		input.append('<option value="16">…</option>');
	}

	//Group all previous functions under one super function to be run on response from the background script

	function autoCase() {
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
