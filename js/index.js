let newSubContainer = document.querySelector(".new__subscription")
let subscriptionList = document.querySelector(".subscriptions__content")
let subscriptionSection = document.querySelector(".subscriptions")
let submitBtn = document.querySelector(".new_sub_submit_btn");
let removeBtn = document.querySelector("#remove_sub_btn");
let newSubBtn = document.querySelector('#new_sub_btn');
let totalArray = []
let totalCostEl = document.querySelector(".sub-total");
let tryItBtn = document.querySelector(".header__btn")

addNewSubscription = (newSubName, newSubDate, newSubAmount, newSubRecurring) => {

	let subscriptionItem = document.createElement("li");
	let subname = document.createElement("span")
	let subdate = document.createElement("span")
	let subamount = document.createElement("span")
	// let subrecurring = document.createElement("span")

	subname.textContent = newSubName
	subdate.textContent = newSubDate
	subamount.textContent = newSubAmount
	// subrecurring.textContent = newSubRecurring

	subscriptionItem.classList.add('subscription')
	subname.classList.add('sub-name')
	subdate.classList.add('sub-date')
	subamount.classList.add('sub-amount')
	// subrecurring.classList.add('sub-recurring')

	subscriptionItem.appendChild(subdate)
	subscriptionItem.appendChild(subname)
	subscriptionItem.appendChild(subamount)
	// subscriptionItem.appendChild(subrecurring)
	subscriptionList.appendChild(subscriptionItem)

	console.log(`
	  ${newSubName}
	  ${newSubDate} 
	  ${newSubAmount}
	  `
	)
	clearForm();

}

clearForm = () => {
	document.querySelector("#new-sub-name").value = "";
	document.querySelector("#new-sub-date").value = "";
	document.querySelector("#new-sub-amount").value = "";
}

formatDates = () => {
	let subscriptions = document.querySelectorAll(".subscription")
	let span = document.querySelectorAll("span.sub-date")
	span.forEach((spanEl) => {
		if (spanEl.classList.contains('sub-date')) {
			let spanElContent = spanEl.textContent
			spanEl.textContent = ordinal_suffix_of(spanElContent)
		}
	})
}

//Add proper suffix to number
ordinal_suffix_of = i => {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}

validateForm = () => {
	let newSubName = document.querySelector("#new-sub-name").value;
	let newSubDate = document.querySelector("#new-sub-date").value;
	let newSubAmount = document.querySelector("#new-sub-amount").value;


	/////For Subscription Recurrance.
	// //Needed to loop though radio inputs to get value.
	// var radios = document.getElementsByName('new-sub__recurring');
	// getRadioValue = (radios) => {
	// 	for (var i = 0, length = radios.length; i < length; i++) {
	// 		if (radios[i].checked) {
	// 			return radios[i].value;
	// 		}
	// 	}
	// }
	// let newSubRecurring = getRadioValue(radios)



	//Text input validation and error messages
	if (newSubName == "") {
		alert('You must enter a name for your subscription')
	} else if (newSubDate == "" || newSubDate > 31 || newSubDate <= 0) {
		alert('You must enter a valid date  for your subscription; Make sure its between 1-31')
		newSubContainer.classList.add("show")
	} else if (newSubAmount == "") {
		alert('You must enter an amount for your subscription')
		newSubContainer.classList.add("show")
	} else {
		newSubName = document.querySelector("#new-sub-name").value;
		newSubDate = document.querySelector("#new-sub-date").value;
		newSubDate = ordinal_suffix_of(newSubDate);
		newSubAmount = document.querySelector("#new-sub-amount").value;
		newSubContainer.classList.remove("show")
		return [newSubName, newSubDate, newSubAmount, 
			//newSubRecurring]
		];
	}

}

calculateTotalCost = (amountsArray) => {
	amountsArray.forEach((amount) => {
		//had to change to number from string.
		totalArray.push(Number(amount.textContent));
	});

	let totalCost = totalArray.reduce((accumuluator, currentvalue) => accumuluator + currentvalue)

	totalCost = Math.round(totalCost * 100) / 100;

	amountsArray = [];;
	totalArray = [];
	return totalCost
}

updateSubscriptionTotal = () => {
	let amountsArray = document.querySelectorAll(".sub-amount");
	totalCostEl.textContent = calculateTotalCost(amountsArray);
}

removeSubscription = () => {
	let subscriptions = document.querySelectorAll(".subscription")
	subscriptions.forEach((subscription) => {
		if (subscription.classList.contains('selected')) {
			subscriptionList.removeChild(subscription)
		}
	})


	updateSubscriptionTotal()
}

subscriptionList.addEventListener("dblclick", e => {
	//Find closest ancestor that matches given parameter of "li". So in this case its parent, if a span gets clicked instead of the li itself.
	//Simple: find the closest Li to what you clicked.
	let closestLI = e.target.closest("li")
	closestLI.classList.toggle('selected')
})

newSubBtn.addEventListener("click", (e) => {
	newSubContainer.classList.toggle("hide")
	newSubContainer.scrollIntoView({
		behavior: "smooth"
	});
})

removeBtn.addEventListener("click", removeSubscription)


submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let [newSubName, newSubDate, newSubAmount,
		//  newSubRecurring
	] = validateForm();
	addNewSubscription(newSubName, newSubDate, newSubAmount,
		//  newSubRecurring
		 );
	updateSubscriptionTotal()
	newSubContainer.classList.toggle("hide")
})

tryItBtn.addEventListener("click", () => {
	subscriptionSection.classList.add("fadeInAni")
	tryItBtn.classList.add("hide")
	subscriptionList.scrollIntoView({
		block: "start"
	});
})

document.addEventListener("DOMContentLoaded", formatDates);