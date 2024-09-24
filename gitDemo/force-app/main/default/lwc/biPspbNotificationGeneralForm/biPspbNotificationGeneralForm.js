//This component is used to Display Tasks based on the General notification on clicking the Notification icon from the Dashboard.
	//To import the libraries
	import { LightningElement} from 'lwc';
	import { NavigationMixin } from 'lightning/navigation';
	//To import the Apex class
	import GENERAL_TASK from '@salesforce/apex/BI_PSPB_MessageCenterCtrl.getGeneralNotifyRecords';
	import TASK_UPDATE from '@salesforce/apex/BI_PSPB_NotificationStatusCtrl.markTaskRead';
	import TREATMENT_RECORDS from '@salesforce/apex/BI_PSPB_InsiteTreatmentCtrl.getTreatmentRecords';
	import getUserRecord from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
	import {resources} from 'c/biPspbNotificationReminderResources';
	import { loadStyle } from "lightning/platformResourceLoader";

	export default class BiPspbNotificationGeneralForm extends NavigationMixin(LightningElement)
	{
		// Declaration of variables
		userId = resources.ID;
		allData = [];
		activeMenuItem = resources.GENERAL;
		noNotifications = '';
		notificationHeading = resources.NOTIFICATION_HEADING;
		symptomButton = resources.SYMPTOM_BUTTON;
		startButton = resources.START_BUTTON;
		readButton = resources.READ_BUTTON
		postButton = resources.POST_BUTTON
		commentButton = resources.COMMENT_BUTTON
		reactionButton = resources.REACTION_BUTTON
		followButton = resources.FOLLOWER_BUTTON
		watchButton = resources.WATCH_BUTTON
		loadMoreButton = resources.LOAD_MORE;
		alternateForSymptoms = resources.ALTERNATE_SYMPTOMS;
		alternateForChallenges = resources.ALTERNATE_CHALLENGES;
		alternateForQuestions = resources.ALTERNATE_QUESTIONS;
		alternateForReminders = resources.ALTERNATE_REMINDERS;
		alternateForCommunity = resources.ALTERNATE_COMMUNITY;
		reminderSetupPageLink = '';
		navigateToReminderSetup = '';
		noTreatmentRecords = false;
		value = resources.ALL;
		notificationCount;
		trackButton;
		viewButton;
		general = true;
		accountName;
		generalValue = [];
		displayCount = 3;
		showLoadMoreButton = false;
		noRecords = false;
		categoryType;
		selectedId;
		chatterType;
		isCaregiver;
		chatterFeedId;
		filteredData = [];
		showSpinner = true;
		// Declaration of variables and assigning image
		questionImg = resources.NOTIFY_QUESTION_IMG;
		contentImg = resources.NEW_CONTENT_IMAGE;
		symptomImg = resources.AVATAR_IMAGE;
		challengeImg = resources.CHALLENGES_IMG;
		communityImg = resources.COMMUNITY_IMAGE;
		treatmentImg = resources.NEW_CONTENT_IMAGE;
		treatmentVideoImg = resources.NEW_CONTENT_IMAGE;
		// Called when the component is inserted into the DOM
		connectedCallback() {
			try {
				loadStyle(this, resources.TEXT_ALIGN);
				this.determineSiteUrl();
				this.fetchUserRecord();
				this.fetchData();
			} catch(error) {
				this.handleError(error.body.message);
			}
		}
		get defaultValue() {
			return this.value;
		}
		fetchUserRecord() {
			getUserRecord()
				.then(result => {
					this.isCaregiver = result.BI_PSPB_Caregiver__c;
				})
				.catch(error => {
					this.handleError(error.body.message);
				});
		}
		// Determine the site URL and set options based on the site
		determineSiteUrl() {
			try{
				let globalThis = window;
				let CURRENT_URL = globalThis.location?.href;
				const URL_OBJECT = new URL(CURRENT_URL);
				const PATH = URL_OBJECT.pathname;
				const PATH_COMPONENTS = PATH.split('/');
				const DESIRED_COMPONENT = PATH_COMPONENTS.find(component =>
					[resources.BRANDED_SITE_URL.toLowerCase(), resources.UNASSIGNED_URL.toLowerCase()].includes(component.toLowerCase())
				);

				if (DESIRED_COMPONENT.toLowerCase() === resources.BRANDED_SITE_URL.toLowerCase()) {
					this.urlq = resources.BRANDED_SITE_URL;
					this.options = [
						{ label: resources.ALL, value: resources.ALL },
						{ label: resources.CHALLENGES, value: resources.CHALLENGES },
						{ label: resources.SYMPTOM, value: resources.SYMPTOM },
						{ label: resources.NEW_CONTENT, value: resources.NEW_CONTENT },
						{ label: resources.COMMUNITY, value: resources.COMMUNITY },
						{ label: resources.TREATMENT_REMINDERS, value: resources.TREATMENT_REMINDERS },
						{ label: resources.VIDEO_LABEL, value: resources.TREATMENT_VIDEO}
					];
				} else {
					this.urlq = resources.UNASSIGNED_SITE_URL;
					this.options = [
						{ label: resources.ALL, value: resources.ALL },
						{ label: resources.CHALLENGES, value: resources.CHALLENGES },
						{ label: resources.SYMPTOM, value: resources.SYMPTOM },
						{ label: resources.NEW_CONTENT, value: resources.NEW_CONTENT },
						{ label: resources.COMMUNITY, value: resources.COMMUNITY },
						{ label: resources.VIDEO_LABEL, value: resources.TREATMENT_VIDEO}
					];
				}
			} catch (error){
				this.handleError(resources.URL_TYPE_ERROR);
			}
		}
		// Fetch all general records
		fetchData() {
				GENERAL_TASK()
					.then(result => {
						const USERT_TYPE = this.isCaregiver ? 'Caregiver' : 'Patient';
						this.notificationCount = 
						result.filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE).filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE).length;
						this.showSpinner = false;
						this.allData = result;
						if (this.notificationCount > 3) {
							this.showLoadMoreButton = true;
						} else {
							this.showLoadMoreButton = false;
						}
						if (this.notificationCount === 0) {
							this.noNotifications = resources.NO_NOTIFICATIONS;
							this.noRecords = true;
							this.noTreatmentRecords = false;
						} else {
							this.noRecords = false;
						}
						this.generalValue = this.allData
						.filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE)
						.map(obj => ({
							...obj,
							trackButton: obj.BI_PSP_Category__c === resources.SYMPTOM,
							Readbutton: obj.BI_PSP_Category__c === resources.NEW_CONTENT,
							contentsimg: obj.BI_PSP_Category__c === resources.NEW_CONTENT,
							Comunityimage: obj.BI_PSP_Category__c === resources.COMMUNITY,
							Combutton: obj.BI_PSP_Category__c === resources.COMMUNITY && obj.BI_PSP_ChatterType__c === resources.CREATE_POST,
							Follwersbutton: obj.BI_PSP_Category__c === resources.COMMUNITY && obj.BI_PSP_ChatterType__c === resources.FOLLOW,
							Reactionbutton: obj.BI_PSP_Category__c === resources.COMMUNITY && obj.BI_PSP_ChatterType__c === resources.REACTION,
							Commentsbutton: obj.BI_PSP_Category__c === resources.COMMUNITY && obj.BI_PSP_ChatterType__c === resources.COMMENT,
							treatmentVideoButton: obj.BI_PSP_Category__c === resources.TREATMENT_VIDEO,
							sympimg: obj.BI_PSP_Category__c === resources.SYMPTOM,
							viewButton: obj.BI_PSP_Category__c === resources.CHALLENGES,
							challimg: obj.BI_PSP_Category__c === resources.CHALLENGES,
							Treatmentimg: obj.BI_PSP_Category__c === resources.TREATMENT,
							treatmentVideoImg: obj.BI_PSP_Category__c === resources.TREATMENT_VIDEO,
							FormattedDate: this.formatDate(obj.CreatedDate)
						}));
					})
					.catch((error) => {
						this.handleError(error.body.message);
					});
		}
		// To display recent 3 records, on clicking Load More, shows all the records
		get displayedGeneralValue() {
			this.notificationCount =  this.generalValue.length;
			return this.generalValue.slice(0, this.displayCount);
		}
		//This Function is used to load more notification
		loadMore() {
			this.displayCount += 9;
			this.showLoadMoreButton = this.displayCount < this.generalValue.length;
		}
		// To display the Date in the short format
		formatDate(createdDate) {
			const DATE_OBJECT = new Date(createdDate);
			// Get the day and month
			const DAY = DATE_OBJECT.getDate();
			const MONTH = DATE_OBJECT.toLocaleString('default', { month: 'short' });
			// Get the year in a 2-digit format
			const YEAR = DATE_OBJECT.getFullYear().toString().slice(-2);
			// Format the date
			const FORMATTED_DATE = `${DAY} ${MONTH} ’${YEAR}`;
			return FORMATTED_DATE;
		}
		//This is onchange function for filter the general notification
		handleChange(event) {
			this.value = event.target.value;
			this.displayCount = 3;	
			switch (this.value) {
				case resources.ALL:
					this.fetchData();
					break;
				case resources.SYMPTOM:
					this.noNotifications = resources.NO_NOTIFICATIONS;
					this.handleCategory(this.allData, resources.SYMPTOM, {
						trackButton: true,
						sympimg: true
					});
					this.notificationCount =  this.handleCategory().length();
					break;	
				case resources.CHALLENGES:
					this.noNotifications = resources.NO_NOTIFICATIONS;
					this.handleCategory(this.allData, resources.CHALLENGES, {
						viewButton: true,
						challimg: true
					});
					break;
				case resources.NEW_CONTENT:
					this.noNotifications = resources.NO_NOTIFICATIONS;
					this.handleCategory(this.allData, resources.NEW_CONTENT, {
						Readbutton: true,
						contentsimg: true
					});
					break;	
				case resources.COMMUNITY:
					this.noNotifications = resources.NO_NOTIFICATIONS;
					this.handleCategory(this.allData, resources.COMMUNITY, {
						Comunityimage: true,
						Combutton: (obj) => obj.BI_PSP_ChatterType__c === resources.CREATE_POST,
						Follwersbutton: (obj) => obj.BI_PSP_ChatterType__c === resources.FOLLOW,
						Reactionbutton: (obj) => obj.BI_PSP_ChatterType__c === resources.REACTION,
						Commentsbutton: (obj) => obj.BI_PSP_ChatterType__c === resources.COMMENT
					});
					break;	
				case resources.TREATMENT_REMINDERS:
					this.noNotifications = '';
					this.treatmentRecords();
					this.handleCategory(this.allData, resources.TREATMENT, {
						Treatmentimg: true
					});
					break;
				case resources.TREATMENT_VIDEO:
					this.noNotifications = resources.NO_NOTIFICATIONS;
					this.handleCategory(this.allData, resources.TREATMENT_VIDEO, {
						treatmentVideoImg: true,
						treatmentVideoButton: true
					});
					break;
				default:
					break;
			}
		}
		// Fetch general notifications based on the category
		handleCategory(data, category, additionalOptions = {}) {
			const USERT_TYPE = this.isCaregiver ? 'Caregiver' : 'Patient';
			this.filteredData = data.filter(obj =>
				obj.BI_PSP_Category__c === category && obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE
			);
			if (this.filteredData.length === 0 && category === resources.TREATMENT_REMINDERS){
				this.treatmentRecords();
			}
			this.showLoadMoreButton = this.filteredData.length > 3;
			this.noRecords = this.filteredData.length === 0;
			this.noTreatmentRecords = false;
			this.generalValue = this.filteredData.map(obj => {
				const item = {
					...obj,
					FormattedDate: this.formatDate(obj.CreatedDate)
				};
				const keys = Object.keys(additionalOptions);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					const value = additionalOptions[key];
					switch (key) {
						case 'Combutton':
						case 'Follwersbutton':
						case 'Reactionbutton':
						case 'Commentsbutton':
							item[key] = value(obj);
							break;
						default:
							if (value === true) {
								item[key] = true;
							}
					}
				}	
				return item;
			});
			this.notificationCount =  this.generalValue.length;
		}	
		//Navigate to respective page based on the category type
		updategeneraltask(event) {
				this.selectedId = event.currentTarget.dataset.taskId;
				TASK_UPDATE({ taskId: this.selectedId })
					.then(result => {
						this.categoryType = result[0].BI_PSP_Category__c;
						this.chatterType = result[0].BI_PSP_ChatterType__c;
						this.chatterFeedId = result[0].BI_PSP_ChatterFeedId__c;
						switch (this.categoryType) {
							case resources.SYMPTOM:
								this.navigatesymptom();
								break;
							case resources.CHALLENGES:
								this.navigatetochallnge();
								break;
							case resources.NEW_CONTENT:
								this.navigatetonewcontent();
								break;
							case resources.COMMUNITY:
								switch (this.chatterType) {
									case resources.FOLLOW:
										this.navtofollow();	
										break;
									case resources.CREATE_POST:
										this.navtopost();
										break;
									case resources.COMMENT:
										this.navtocomments();
										break;
									case resources.REACTION:
										this.navtoreaction();
										break;
									default:
										break;
								}
								break;
							case resources.TREATMENT_VIDEO:
								this.navtovideo();
								break;
							default:
								break;
						}
					})
					.catch((error) => {
						this.handleError(error.body.message);
					});
		}
		//Navigate to followers page
		navtofollow() {
			let globalThis = window;
			globalThis.location?.assign(resources.CHATTER_FOLLOWER);
		}
		// Navigate to my post page
		navtopost() {
			let globalThis = window;
			globalThis.localStorage?.setItem('selectedItemIdforCreatepost', this.chatterFeedId);
			globalThis.location?.assign(resources.ALL_POST_URL);
		}
		// Navigate to my post page
		navtocomments() {
			let globalThis = window;
			globalThis.localStorage?.setItem('selectedItemIdforComment', this.chatterFeedId);
			globalThis.location?.assign(resources.CHATTER_MY_POST);
		}
		// Navigate to my post page
		navtoreaction() {
			let globalThis = window;
			globalThis.localStorage?.setItem('selectedItemId', this.chatterFeedId);
			globalThis.location?.assign(resources.CHATTER_MY_POST);
		}
		// Navigate to symptom page
		navigatesymptom() {
			let globalThis = window;
			globalThis.location?.assign(resources.SYMPTOM_TRACKER_MAIN);
		}
		// Navigate to Outstanding questionnaire page
		navigatetonewcontent() {
			let globalThis = window;
			globalThis.location?.assign(resources.OUTSTANDING_QUESTIONNAIRE_URL);
		}
		// Navigate to challenges page
		navigatetochallnge() {
			let globalThis = window;
			globalThis.location?.assign(resources.CHALLENGES_URL);
		}
		// Navigate to treatment video page
		navtovideo() {
			let globalThis = window;
			globalThis.location?.assign(resources.INFORMATION_CENTER_URL);
		}
		handleError(error){
			let globalThis=window;
			globalThis.location.href = resources.ERROR_PAGE;
			globalThis.sessionStorage.setItem('errorMessage', error);
		}
		treatmentRecords() {
			this.noNotifications = '';
			TREATMENT_RECORDS()
				.then(result => {
						const activeTreatmentRecords = result.filter(record =>
							record.BI_PSPB_Status__c === 'Active' &&
							record.BI_PSPB_Reminder_Type__c === 'Treatment'
						);
						if (activeTreatmentRecords.length === 0){
							this.navigateToReminderSetup = resources.REMINDER_PAGE_URL;
							this.noNotifications = 'Your next treatment reminder is not scheduled. Please set your treatment date now to receive timely notifications. ';
							this.reminderSetupPageLink = 'Click here to schedule';
							this.noTreatmentRecords = true;
						} else if (activeTreatmentRecords.length > 0) {
							const TREATMENT_DATE = this.formatDateToDDMMYYYY(activeTreatmentRecords[0].BI_PSPB_Date_of_Treatment__c);				
							this.noNotifications = 'Your upcoming treatment is scheduled for ' + TREATMENT_DATE
								+ '. We\'ll send you timely reminders as the date approaches.';
							this.noTreatmentRecords = false;
						}
				})
				.catch((error) => {
					this.handleError(error.body.message);
				});
		}	
		formatDateToDDMMYYYY(dateString) {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				return 'Invalid Date';	
			}
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}
	}