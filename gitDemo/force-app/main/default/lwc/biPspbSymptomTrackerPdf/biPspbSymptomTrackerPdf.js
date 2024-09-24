//This LWC is used UserSymptomTracker graph download in pdf - biPspbSymptomTrackerPdf
// To import Libraries
import {LightningElement}from 'lwc';
import * as label from 'c/biPspbLabelAndResourceSymptom';
import FETCH_SYMPTOM_EROLLE from '@salesforce/apex/BI_PSP_SymptomTrackerGraphCtrl.getSymptomTrackerDetails';
import USER_DETAILS from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
import GET_SELECTED_PATIENT from '@salesforce/apex/BI_PSP_CurrentUser.returnTheAccounts';
export default class BiPspbSymptomTrackerPdf extends LightningElement {
	//Proper naming conventions with camel case for all the variable will be followed in the future releases
	dateWithAllery = [];
	remainingItems = [];
	highlight = false;
	showLine;
	showSpinner = true;
	dateWithAlleryTwo = [];
	dateWithAlleryThree = [];
	dateWithAlleryFour = [];
	dateWithAlleryFive = [];
	dateWithAlleryAll = [];
	rightLess;
	nextSeven;
	nextSevenOne;
	nextSevenTwo;
	nextSevenThree;
	//Variable declaration
	monthName;
	monthValue;
	currentYear;
	selectedMonthValue;
	yellowEllipse = label.YELLOW_ELLIPSE;
	rightImg = label.RIGHT_ICON;
	darkRedEllipse = label.DARK_RED_ELLIPSE;
	blueEllipse = label.BLUE_ELLIPSE;
	verticalLine = label.VERTICAL_LINE;
	greenEllipse = label.GREEN_ELLIPSE;
	violetEllipse = label.VIOLET_ELLIPSE;
	redEllipse = label.RED_ELLIPSE;
	darkYellowEllipse = label.DARK_YELLOW_ELLIPSE;
	alternateTextTickIcon = label.ALTERNATE_TICK;
	alternateTextVerticalLine = label.ALTERNATE_VERTICAL_LINE;
	alternateTextBallIcon = label.ALTERNATE_ALLERGY_ICON;
	navLogo = label.SITE_LOGO;
	userId = label.ID;
	errorMessage;
	userName;
	resultCount;
	patientName = label.PATIENT_NAME;
	periodLabel = label.PERIOD_LABEL;
	itchinessLabel = label.ITCHINESS_VALUES;
	rednessLabel = label.REDNESS_VALUE;
	temperatureLabel = label.TEMPERATURE_VALUES;
	pustulesLabel = label.PUSTULES_VALUE;
	painLabel = label.PAIN_VALUES;
	fatigueLabel = label.FATIGUE_VALUES;
	moodLabel = label.MOOD_IMG;
	placeholder = label.MONTH;
	showEditBtn = false;
	nohoto = false;
	nodisplay = true;
	url;
	selectedMonth;
	selectedYear;
	finalPartOfUrl = label.SYMPTOM_PDF_URL;
	//Each bar represents a date entry and its height is proportional to the number of image URLs.
	get bars() {
		return this.dateWithAllery.map(entry => ({
			height: `${entry.imageUrls.length * 20}px`
			, dates: entry.dates
			, imageUrls: entry.imageUrls
		}));
	}
	//Each bar represents a date entry and its height is proportional to the number of image URLs.
	get barsone() {
		return this.dateWithAlleryTwo.map(entry => ({
			height: `${entry.imageUrls.length * 20}px`
			, dates: entry.dates
			, imageUrls: entry.imageUrls
		}));
	}
	// Each bar represents a date entry and its height is proportional to the number of image URLs.
	get barsTwo() {
		return this.dateWithAlleryThree.map(entry => ({
			height: `${entry.imageUrls.length * 20}px`
			, dates: entry.dates
			, imageUrls: entry.imageUrls
		}));
	}
	//Each bar represents a date entry and its height is proportional to the number of image URLs.
	get barsThree() {
		return this.dateWithAlleryFour.map(entry => ({
			height: `${entry.imageUrls.length * 20}px`
			, dates: entry.dates
			, imageUrls: entry.imageUrls
		}));
	}
	//Each bar represents a date entry and its height is proportional to the number of image URLs.
	get barsFour() {
		return this.dateWithAlleryFive.map(entry => ({
			height: `${entry.imageUrls.length * 20}px`
			, dates: entry.dates
			, imageUrls: entry.imageUrls
		}));
	}
	//It retrieves URL parameters such as 'eroll', 'firstdate', and 'lastdate' to fetch symptom data for a specific enrollee within a given date range.
	connectedCallback() {
		let globalThis = window;
		let urlParams = new URLSearchParams(globalThis.location?.href.split(label.QUESTION_MARK)[1]);
		let eroll = urlParams.get(label.EROLLS);
		this.selectedMonth = urlParams.get(label.FIRST_DATE);
		this.selectedYear = urlParams.get(label.LAST_DATE);
		this.getsymptomdatewithallergy(eroll);
		if (label.ID !== null && label.ID !== undefined) {
			USER_DETAILS()
				// Null data is checked and AuraHandledException is thrown from the Apex
				.then(user => {
					if (user.BI_PSPB_Caregiver__c === false) {
						this.userName = user.FirstName + ' ' + user.LastName;
					}
					else {
						GET_SELECTED_PATIENT()
							.then(data => {
								// Null data is checked and AuraHandledException is thrown from the Apex
								this.userName = data[0].Name;
							})
							.catch(error => {
								this.handleError(error.body.message);
							})
					}
				})
				.catch(error => {
					this.handleError(error.body.message);
				})
		}
	}
	handleUrlChange(event) {
		// Access the value from the event detail
		this.url = event.detail.value;
	}
	parsedDat(dateToFormat) {
		const parsedDate = new Date(dateToFormat);
		// Formatting options: short month name and numeric day
		const options = {
			month: 'short'
			, day: '2-digit'
		};
		// Format the date to the desired format (e.g., "Aug 07")
		const formattedDate = parsedDate.toLocaleDateString(undefined, options);
		return formattedDate;
	}
	// Handles the change event when the user selects a new month in the category dropdown.
	//Handles errors by displaying a toast message.
	getsymptomdatewithallergy(erolles) {
		try {
			FETCH_SYMPTOM_EROLLE({
					erolleId: erolles
				})
				// Null data is checked and AuraHandledException is thrown from the Apex
				.then(result => {
					//If the result is not null, iterates through each item in the result array.
					if (result !== null) {
						const filterResultRecords = this.filterResultsByDate(result);
						this.resultCount = filterResultRecords.length;
						filterResultRecords.forEach(item => {
							//Checks if there is an existing date entry in the dateWithAllery array matching the date of the current item.
							const EXISTING_DATE = this.dateWithAllery.find(entry => entry.dates === this.parsedDat(item.dates));
							if (EXISTING_DATE) {
								const imageUrl = this.getImagesForName(item.name);
							if (imageUrl) {
								EXISTING_DATE.imageUrls.push(imageUrl);
							}
							}
							else {
								const imageUrl = this.getImagesForName(item.name);
							if (imageUrl) {
								this.dateWithAllery.push({
									dates:  this.parsedDat(item.dates),
									imageUrls: [imageUrl],
									symptom: item.symptom
								});
							}else {
							// If imageUrl is null, add an entry with an empty imageUrls array
							this.dateWithAllery.push({
								dates:  this.parsedDat(item.dates),
								imageUrls: [],
								symptom: item.symptom
							});
						}
							}
						});
						this.dateWithAllery.sort((a, b) => new Date(a.dates) - new Date(b.dates));
						this.rightLess = this.dateWithAllery.length > 7;
						this.dateWithAlleryAll = this.dateWithAllery;
						this.dateWithAllery = this.dateWithAlleryAll.slice(0, 7);
						//If there are entries in the dateWithAllery array after slicing, assigns a subset of the entries to the dateWithAlleryTwo property.
						if (this.dateWithAllery.length > 0) {
							this.dateWithAlleryTwo = this.dateWithAlleryAll.slice(7, 14);
							this.nextSeven = this.dateWithAlleryTwo.length > 0;
						}
						//If there are entries in the dateWithAllery array after slicing, assigns a subset of the entries to the dateWithAlleryThree property.
						if (this.dateWithAllery.length > 0) {
							this.dateWithAlleryThree = this.dateWithAlleryAll.slice(14, 21);
							this.nextSevenOne = this.dateWithAlleryThree.length > 0;
						}
						//If there are entries in the dateWithAllery array after slicing, assigns a subset of the entries to the dateWithAlleryFour property.
						if (this.dateWithAllery.length > 0) {
							this.dateWithAlleryFour = this.dateWithAlleryAll.slice(21, 28);
							this.nextSevenTwo = this.dateWithAlleryFour.length > 0;
						}
						//If there are entries in the dateWithAllery array after slicing, assigns a subset of the entries to the dateWithAlleryFive property.
						if (this.dateWithAllery.length > 0) {
							this.dateWithAlleryFive = this.dateWithAlleryAll.slice(28, 35);
							this.nextSevenThree = this.dateWithAlleryFive.length > 0;
						}
						this.showLine = this.dateWithAllery.length > 0;
					}
					this.showSpinner = false;
					if (this.showLine) {
						this.myFunction();
					}
				})
				.catch(error => {
					this.handleError(error.body.message);
				});
		}
		catch (error) {
			this.handleError(error.body.message);
		}
	}
	filterResultsByDate(results) {
		const selectedMonth = parseInt(this.selectedMonth, 10);
		const selectedYear = parseInt(this.selectedYear, 10);
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		this.monthName = monthNames[(this.selectedMonth) - 1];
		this.currentYear = selectedYear;
		return results.filter(item => {
			const itemDate = new Date(item.dates); // 'dates' field contains date string in 'YYYY-MM-DD' format
			const itemMonth = itemDate.getMonth() + 1; // getMonth() is zero-based, so add 1
			const itemYear = itemDate.getFullYear();
			// Compare itemMonth and itemYear with selectedMonth and selectedYear
			return itemMonth === selectedMonth && itemYear === selectedYear;
		});
	}
	findChartContainerByClassNameAndWaitWhenExits(className) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const element = this.template.querySelector(className);
            if (element) {
                clearInterval(interval);
                resolve();
            }
        }, 5000);
    });
}

myFunction() {
    let globalThis = window;
    this.showSpinner = true;

    this.findChartContainerByClassNameAndWaitWhenExits('.printDoc')
        .then(() => {
            const recordCount = this.resultCount;
            const delay = recordCount === 1 ? 400 : recordCount * 200;
            // Create a delay using a promise
            return new Promise(resolve => setTimeout(resolve, delay));
        })
        .then(() => {
            globalThis.print();
        })
        .catch(error => {
            this.handleError(error.body.message);
        })
        .finally(() => {
            this.showSpinner = false;
        });
}

	//The image URL corresponding to the symptom name.
	getImagesForName(name) {
		switch (name) {
			case label.REDNESS_VALUE:
				return label.RED_ELLIPSE;
			case label.ITCHINESS_VALUES:
				return label.DARK_YELLOW_ELLIPSE;
			case label.PAIN_VALUES:
				return label.VIOLET_ELLIPSE;
			case label.PUSTULES_VALUE:
				return label.GREEN_ELLIPSE;
			case label.FATIGUE_VALUES:
				return label.BLUE_ELLIPSE;
			case label.TEMPERATURE_VALUES:
				return label.DARK_RED_ELLIPSE;
			case label.MOOD_IMG:
				return label.YELLOW_ELLIPSE;
			case label.NO_SYMPTOM_RECORD:
				return null;
			default:
				return null;
		}
	}
	handleError(error) {
		let globalThis = window;
		globalThis.location.href = label.ERROR_PAGE;
		globalThis.sessionStorage.setItem('errorMessage', error);
	}
}