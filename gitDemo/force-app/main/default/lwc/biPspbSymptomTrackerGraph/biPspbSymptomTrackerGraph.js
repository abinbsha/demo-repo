import {
	LightningElement
	, wire
}
	from 'lwc';
import GET_ENROLLE from "@salesforce/apex/BI_PSP_CurrentUser.getEnrolleeRecords";
import FETCH_SYMPTOM_EROLLE from '@salesforce/apex/BI_PSP_SymptomTrackerGraphCtrl.getSymptomTrackerDetails';
import GET_LATEST_SYMPTOM_RECORD from '@salesforce/apex/BI_PSPB_SymptomPrimaryPageCtrl.getLatestSymptomRecord';
import * as label from 'c/biPspbLabelAndResourceSymptom';
export default class BiPspbSymptomTrackerGraph extends LightningElement {
	// Variables declaration
	receivedValue;
	dateWithAllery = [];
	highlight = false;
	showDiv = false;
	remainingItems = [];
	pdfName;
	firstDate;
	lastDate;
	displayCurrentMonth;
	symptomIdGet;
	checkValue = false;
	showLine;
	currentDisplayIndex = 0;
	dateWithAlleryTwo = [];
	dateWithAlleryThree = [];
	dateWithAlleryFour = [];
	leftLess;
	rightLess;
	showSpinner = false;
	showChart = false;
	updateValue = false;
	understand = false;
	latestRecord;
	throwErrorMessage = false;
	defaultPlaceholder = 'Select month';
	showLoading = true;
	urlq;
	enrolleId;
	montss;
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
	bubbles = '';
	userId = label.Id;
	errorMessage;
	showError;
	CURRENT_INDEX = 0;
	disableDefaultOption = false;
	showPopup;
	placeholder = label.MONTH;
	symptomDeclaration = label.SYMPTOM_DECLARATION;
	comeTommorow = label.COME_TO_COMPLETE;
	symptomTrackerLabel = label.SYMPTOM_TRACKER_LABEL;
	noSymptomThisMonth = label.NO_SYMPTOM_THIS_MONTH;
	selectAnotherMonth = label.SELECT_ANOTHER_MONTH;
	addNewEntry = label.ADD_NEW_ENTRY;
	clickDateLabel = label.CLICK_DATE;
	pastEntries = label.PAST_ENTRIES;
	updateSymptoms = label.UPDATE_SYMPTOM;
	downloadLabel = label.DOWNLOAD_LABEL;
	itchinessLabel = label.ITCHINESS_VALUES;
	rednessLabel = label.REDNESS_VALUE;
	temperatureLabel = label.TEMPERATURE_VALUES;
	pustulesLabel = label.PUSTULES_VALUE;
	painLabel = label.PAIN_VALUES;
	fatigueLabel = label.FATIGUE_VALUES;
	moodLabel = label.MOOD_IMG;
	confirmSubmission = label.CONFIRM_SUBMISSION;
	aboveInformationCorrect = label.UNDERSTAND_PROVIDED_INFO;
	iUnderstand = label.I_UNDERSTAND;
	sureDownloadSymptom = label.SURE_DOWNLOAD_SYMPTOM;
	yesLabel = label.YES;
	noLabel = label.NO;
	selectedMonthValue;
	finalPartOfUrl = label.SYMPTOM_LANDING_URL;
	isNoSymptomDownBtn = 'isNoSymptomDownBtn';
	isNoSymptomPastEntryBtn = 'isNoSymptomDownBtn';
	ToastMsg = `${this.symptomDeclaration} ${this.comeTommorow}`;
	picklistOptions1 = [];
	filteredOptions;
	selectedOption1
	bars = [];
	currentYear = new Date()
		.getFullYear();
	currentMonth = new Date()
		.getMonth();
	currentIndex = 0;
	connectedCallback() {
		const globalThis = window;
		this.receivedValue = globalThis?.sessionStorage.getItem('someDynamicValue')
		if (this.receivedValue) {
			this.showDiv = true;
			globalThis.sessionStorage.clear();
		}
		this.setDefaultMonthValue(); 
		this.retrievePrimaryPage();
		this.fetchEnrollmentData();
		this.displayCurrentMonth = this.getCurrentMonthName();
	}
	sele = this.placeholder;
	renderedCallback() {
		// Set the default selection in the dropdown
		const selectElement = this.template.querySelector('.selectWidth');
		if (selectElement && this.throwErrorMessage === true) {
			this.sele =this.placeholder;
			this.isNoSymptomDownBtn = 'noSymptomDownBtnTrue';
			this.isNoSymptomPastEntryBtn = 'noSymptomPastEntryBtnTrue';

		}
		else{
			this.isNoSymptomDownBtn = 'noSymptomDownBtnFalse';
			this.isNoSymptomPastEntryBtn = 'noSymptomDownBtnFalse';
            selectElement.value = this.selectedOption1;
		}
	}
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	getCurrentMonthName() {
        const date = new Date();
        const options = { month: 'long' };
        return date.toLocaleDateString(undefined, options);
    }
	setDefaultMonthValue() {
		const currentDate = new Date();
		const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
		const currentYear = currentDate.getFullYear();
		this.selectedOption1 = `${currentMonthName} ${currentYear}`; // Set the current month and year as default
	}

	handleCategoryChange(event) {
		this.selectedOption1 = event.target.value; 
		
		
		const currentDate = new Date();
		const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
		const currentYear = currentDate.getFullYear();
		const selectedMonthAndYear = `${currentMonthName} ${currentYear}`;
		if (this.selectedOption1 === 'default' && this.picklistOptions1.some(option => option.value === selectedMonthAndYear)) {
			this.setDefaultMonthValue();
		}
		this.checkValue = false;
		this.fetchAndDisplayDataForSelectedMonth(); // Fetch and display data based on the selected month
		this.getsymptomdatewithallergy(this.enrolleId); // Fetch allergy data if needed
	}
	handleRightClick(event) {
    event.preventDefault();
    
    // Determine how many records to move forward based on screen width
    const recordsToMove = window.innerWidth <= 1024 ? 4 : 7;

    if (this.rightLess) {
        this.currentIndex += recordsToMove;
        this.updateDisplayedRecords();
    }
}

handleLeftClick(event) {
    if (event.button === 0) { // Left mouse button click
        // Determine how many records to move backward based on screen width
        const recordsToMove = window.innerWidth <= 1024 ? 4 : 7;

        if (this.leftLess) {
            this.currentIndex -= recordsToMove;
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
            this.updateDisplayedRecords();
        }
    }
}


	handleclose() {
		this.showDiv = false;
	}
	isLoading=false;
	getsymptomdatewithallergy(erolleId) {
		FETCH_SYMPTOM_EROLLE({
			erolleId
		})
			.then(result => {
				let globalThis = window;
			if(!result){
				this.isLoading=true;
				globalThis.location.assign(this.urlq + label.SYMPTOM_LANDING_URL);
			}

				if (result) {
					
					const uniqueMonthsYears = new Set();
					this.dateWithAllery = [];
					result.forEach(item => {
						const formattedDate = this.parseDate(item.dates);
						if (!formattedDate) return;
						const existingDate = this.dateWithAllery.find(entry => entry.dates === formattedDate);
						if (existingDate) {
							const imageUrl = this.getImagesForName(item.name);
							if (imageUrl) {
								existingDate.imageUrls.push(imageUrl);
							}
						}
						else {
							const imageUrl = this.getImagesForName(item.name);
							if (imageUrl) {
								this.dateWithAllery.push({
									dates: formattedDate,
									imageUrls: [imageUrl],
									symptom: item.symptom
								});
							}else {
							// If imageUrl is null, add an entry with an empty imageUrls array
							this.dateWithAllery.push({
								dates: formattedDate,
								imageUrls: [],
								symptom: item.symptom
							});
						}
						}
						const date = new Date(item.dates);
						if (!isNaN(date.getTime())) {
							const month = date.toLocaleString('default', {
								month: 'long'
							});
							const year = date.getFullYear();
							const monthYear = `${month} ${year}`;
							uniqueMonthsYears.add(monthYear);
						}
					});
					this.dateWithAllery.sort((a, b) => {
						const dateA = new Date(a.dates);
						const dateB = new Date(b.dates);
						return dateA - dateB; // Ascending order
					});
					this.picklistOptions1 = Array.from(uniqueMonthsYears)
    .sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const dateA = new Date(`${monthA} 1, ${yearA}`);
        const dateB = new Date(`${monthB} 1, ${yearB}`);
        return dateA - dateB;
    })
    .map(monthYear => ({
        label: monthYear,
        value: monthYear
    }));
					// Ensure that the default month and year data is displayed
					this.fetchAndDisplayDataForSelectedMonth();
				}
				else {
					this.showChart = false;
				}
			})
			.catch(error => {
				this.handleError(error.body.message);
			});
	}
	parseDate(dateString) {
		const date = new Date(dateString);
		return isNaN(date.getTime()) ? null : date.toISOString()
			.split('T')[0];
	}
	fetchAndDisplayDataForSelectedMonth() {
		if (!this.selectedOption1) return;

		const [monthName, year] = this.selectedOption1.split(' ');
		const selectedDate = new Date(`01 ${monthName} ${year}`);
		const selectedMonth = selectedDate.getMonth();
		this.selctmonthvalue = selectedMonth + 1;
		const selectedYear = selectedDate.getFullYear();
		this.selctyear = selectedYear;
		this.filteredOptions = this.dateWithAllery.filter(entry => {
			const entryDate = new Date(entry.dates);
			return entryDate.getMonth() === selectedMonth && entryDate.getFullYear() === selectedYear;
		});
		this.currentIndex = 0;
		this.updateDisplayedRecords(); // Update the displayed records based on the selected month
	}
updateDisplayedRecords() {
    const totalRecords = this.filteredOptions.length;
	const globalThis = window;

    // Determine how many records to display based on screen width
    const recordsToDisplay = globalThis.innerWidth <= 1024 ? 4 : 7;

    if (this.currentIndex < 0) {
        this.currentIndex = 0;
    }

    this.leftLess = this.currentIndex > 0;
    this.rightLess = this.currentIndex + recordsToDisplay < totalRecords;
    this.dateWithAllery = this.filteredOptions.slice(this.currentIndex, this.currentIndex + recordsToDisplay);

    if (this.dateWithAllery.length > 0) {
        this.throwErrorMessage = false;
		this.isNoSymptomDownBtn = 'noSymptomDownBtnFalse';
		this.isNoSymptomPastEntryBtn = 'noSymptomDownBtnFalse';
        this.showLine = true;
        this.showChart = true;
        this.updateChartBars();
    } else {
        this.throwErrorMessage = true;
		this.isNoSymptomDownBtn = 'noSymptomDownBtnTrue';
		this.isNoSymptomPastEntryBtn = 'noSymptomPastEntryBtnTrue';
        this.showLine = false;
        this.showChart = false;
        this.bars = [];
    }
}

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
	retrievePrimaryPage() {
		let globalThis = window;
		const primaryPopup = globalThis.sessionStorage.getItem(label.PRIMARY_PAGES);
		if (primaryPopup) {
			this.openundersatand();
		}
	}
	fetchEnrollmentData() {
		GET_ENROLLE()
			// Null data is checked and AuraHandledException is thrown from the Apex
			.then((result) => {
				if (result && result[0].Id !== null) {
					this.enrolleId = result[0].Id;
					this.processURLParameters();
				}
			})
			.catch((error) => {
				// Handle any errors occurring during the promise chain
				this.handleError(error.body.message);
			});
	}
	processURLParameters() {
		const globalThis = window;
		const urlParams = new URLSearchParams(globalThis.location.search);
		const eroll = urlParams.get(label.EROLLS);
		const firstDate = urlParams.get(label.FIRST_DATE);
		const lastDate = urlParams.get(label.LAST_DATE);

		const month = urlParams.get(label.MONTHS);
		this.firstDate = firstDate;
		this.lastDate = lastDate;
		this.selectedMonthValue = month;
		if (eroll) {
			const selectElement = this.template.querySelector('.selectWidth');
			if (selectElement) {
				selectElement.value = month;
			}
			this.getsymptomdatewithallergy(eroll);
		}
	}
	updateChartBars() {

		this.bars = this.dateWithAllery.map(entry => {
			// Parse the date string into a Date object
			const date = new Date(entry.dates);
			// Format the date as "day month"
			const day = date.getDate()

				.toString()
				.padStart(2, '0'); // Ensures day is two digits

			const month = date.toLocaleString('default', {
				month: 'short'
			}); 
			const formattedDate = `${day} ${month}`;
			return {
				dateObject: date,
				height: `${entry.imageUrls.length * 20}px`
				, dates: formattedDate, // Use the formatted date here
				imageUrls: entry.imageUrls
			};
		})
		.sort((a, b) => a.dateObject - b.dateObject) // Sort by the original date objects
        .map(entry => ({
            height: entry.height,
            dates: entry.dates,
            imageUrls: entry.imageUrls
        }));
	}
	showHighlighter(event) {
		// Get the clicked key from the event
		const clickedKey = event.target.dataset.item;
		// Select all elements with the class 'bar'
		const bars = this.template.querySelectorAll('.bar');
		// Iterate over all the bar elements
		bars.forEach(bar => {
			if (bar.dataset.item === clickedKey) {
				// Highlight the clicked bar
				bar.style.backgroundColor = '#ECDCA8';
				bar.style.borderRadius = '12px';
			}
			else {
				// Reset the style for other bars
				bar.style.backgroundColor = '';
				bar.style.borderRadius = ''; // Make sure to reset borderRadius as well
			}
		});
		// Find the existing date object based on the clicked key
		const EXISTING_DATE = this.dateWithAllery.find(entry => {
			const date = new Date(entry.dates);
			const day = date.getDate()
				.toString()
				.padStart(2, '0');
			const month = date.toLocaleString('default', {
				month: 'short'
			});
			const formattedDate = `${day} ${month}`;
			return formattedDate === clickedKey;
		});
		// Update symptomIdGet with the symptom of the existing date
		this.symptomIdGet = EXISTING_DATE ? EXISTING_DATE.symptom : null;
		// Update checkValue based on the existence of symptomIdGet
		this.checkValue = !!this.symptomIdGet;
	}
	@wire(GET_LATEST_SYMPTOM_RECORD, {
		careProgramEnrolleeId: '$enrolleId'
	})
	wiredLatestRecord({
		error
		, data
	}) {
		try {
			if (data && data !== null) {
				this.latestRecord = data[0];
				this.errorMessage = ''; // Clear any previous error
			}
			else if (error) {
				this.latestRecord = null;
				this.errorMessage = label.LATEST_RECORD;
				this.handleError(error.body.message);
			}
		}
		catch (ex) {
			this.handleError(ex.body.message);
			this.errorMessage = label.UNEXPECTED_ERROR;
		}
	}
	// Function to update the displayed data to the next seven days
	updatesymptom() {
		this.showSpinner = true;
		let globalThis = window;
		globalThis.location.assign(this.urlq + label.SYMPTOM_MAIN_PAGE_URL);
		globalThis.localStorage.clear();

	}
	doNotLogout() {
		this.showPopup = false;
		document.body.style.overflow = ''; // Reset to default
	}
	openShowPopUp() {
		this.showPopup = true;
		document.body.style.overflow = 'hidden'; //This is the css property of overflow so this can't be through customlabel
	}
	captureComponent() {
		let globalThis = window;
		if (this.selectedMonthValue !== null && this.dateWithAllery !== null) {
			let currenturl = globalThis.location.href?.split(label.SLASH_LATTER)[0];
			globalThis.open(currenturl + label.SYMPTOM_TRACKER_PDF + this.enrolleId +
				label.FIRST_DATE_GRAPH + this.selctmonthvalue + label.LAST_DATE_GRAPH + this.selctyear);
		}
		this.doNotLogout()
	}
}