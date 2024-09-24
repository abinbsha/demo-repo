//This component is used to Display the Read,Complete,Expired notification based on  both General and Action Notification
//To import the Libraries
import { LightningElement } from 'lwc';
//To import the Apex class
import HISTORY_TASK from '@salesforce/apex/BI_PSPB_MessageCenterCtrl.getHistoryNotifyRecords';
import getUserRecord from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
import { resources } from 'c/biPspbNotificationReminderResources';
export default class BiPspbNotificationHistoryForm extends LightningElement {
	// Declaration of variables
	notificationOptions = [];
	accountName;
	userId = resources.ID;
	hasNoRecords = true;
	historyRecords = [];
	history = [];
	recordsToDisplay = 3;
	showLoadMoreButton = false;
	typeOfNotification = resources.ALL;
	notificationCount;
	imageForSetting = resources.NOTIFICATION_SETTING;
	typePlaceHolder = resources.TYPE_PLACEHOLDER;
	statusPlaceHolder = resources.STATUS_PLACEHOLDER;
	categoryPlaceHolder = resources.CATEGORY_PLACEHOLDER;
	alternateForDot = resources.ALTERNATE_DOT;
	alternateForReminders = resources.ALTERNATE_REMINDERS;
	alternateForQuestions = resources.ALTERNATE_QUESTIONS;
	alternateForSymptoms = resources.ALTERNATE_SYMPTOMS;
	alternateForChallenges = resources.ALTERNATE_CHALLENGES;
	alternateForCommunity = resources.ALTERNATE_COMMUNITY;
	categoryType = resources.ALL;
	historyHeading = resources.HISTORY_HEADING;
	noNotifications = resources.NO_HISTORY;
	loadMoreButton = resources.LOAD_MORE;
	disableCategory = true;
	isCaregiver;
	disableStatus = true;
	selectedContentCategory = resources.ALL;
	contentImg = resources.NEW_CONTENT_IMAGE;
	dotImg = resources.DOT_IMG;
	symptomImg = resources.AVATAR_IMAGE;
	challengeImg = resources.CHALLENGES_IMG;
	treatmentImg = resources.NEW_CONTENT_IMAGE;
	chatterImg = resources.COMMUNITY_IMAGE;
	questionnaireImg = resources.QUESTIONNAIRE_IMAGE;
	showSpinner = true;
	notifyTypeOptions = [
		{ label: resources.ALL, value: resources.ALL },
		{ label: resources.GENERAL_NOTIFICATION, value: resources.GENERAL },
		{ label: resources.ACTION_REQUIRED, value: resources.ACTION }
	];
	statusOptions = [
		{ label: resources.ALL, value: resources.ALL },
		{ label: resources.COMPLETED, value: resources.COMPLETED },
		{ label: resources.NOT_COMPLETED, value: resources.NOT_COMPLETED },
		{
			label: resources.STATUS_EXPIRED,
			value: resources.STATUS_EXPIRED
		},
		{ label: resources.READ, value: resources.READ }
	];
	// Called when the component is inserted into the DOM
	connectedCallback() {
		try {
			this.determineSiteUrlAndHistory();
			this.fetchUserRecord();
			this.historyAllRecords();
		} catch (error) {
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
	// Determine the site URL and history records
	determineSiteUrlAndHistory() {
		const { siteUrl } = this.getSiteUrlAndType();
		this.urlq = siteUrl;
	}
	// Determine the url type
	getSiteUrlAndType() {
		try {
			let globalThis = window;
			const CURRENT_URL = globalThis.location.href;
			const URL_OBJECT = new URL(CURRENT_URL);
			const PATH = URL_OBJECT.pathname;
			const PATH_COMPONENTS = PATH.split('/');
			const DESIRED_COMPONENT = PATH_COMPONENTS.find(component =>
				[resources.BRANDED_SITE_URL.toLowerCase(), resources.UNASSIGNED_URL.toLowerCase()].includes(component.toLowerCase())
			);
			if (DESIRED_COMPONENT?.toLowerCase() === resources.BRANDED_SITE_URL.toLowerCase()) {
				return { type: resources.BRANDED_SITE_URL.toLowerCase() };
			}
			return { type: resources.UNASSIGNED_URL.toLowerCase() };
		} catch (error) {
			this.handleError(error.body.message);
		}
		return { type: 'unknown' };
	}
	// To display recent 3 records, on clicking Load More, shows all the records
	get displayedHistoryValue() {
		return this.historyRecords.slice(0, this.recordsToDisplay);
	}
	//This Function is used to load more notification
	loadMore() {
		this.recordsToDisplay += 9;
		this.showLoadMoreButton = this.recordsToDisplay < this.historyRecords.length;
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
	// Handle changes in notification type
	handletypeChange(event) {
		this.typeOfNotification = event.target.value;
		this.categoryType = resources.ALL;
		this.disableCategory = false;
		this.typeOfStatus = resources.ALL;
		this.disableStatus = true;
		if (this.typeOfNotification === resources.GENERAL) {
			this.setGeneralOptions();
			this.handleGeneralCategoryChange(resources.ALL);
		} else if (this.typeOfNotification === resources.ACTION) {
			this.setActionOptions();
			this.handleActionCategoryChange(resources.ALL);
		} else if (this.typeOfNotification === resources.ALL) {
			this.historyAllRecords();
			this.disableCategory = true;
		}
	}
	// Set options for General notifications
	setGeneralOptions() {
		const { siteUrl, type } = this.getSiteUrlAndType();
		this.urlq = siteUrl;
		if (type === resources.BRANDED_SITE_URL.toLowerCase()) {
			this.notificationOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.CHALLENGES, value: resources.CHALLENGES },
				{ label: resources.SYMPTOM, value: resources.SYMPTOM },
				{ label: resources.NEW_CONTENT, value: resources.NEW_CONTENT },
				{ label: resources.COMMUNITY, value: resources.COMMUNITY },
				{ label: resources.TREATMENT_REMINDERS, value: resources.TREATMENT },
				{ label: resources.VIDEO_LABEL, value: resources.TREATMENT_VIDEO }
			];
			this.statusOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.STATUS_EXPIRED, value: resources.STATUS_EXPIRED },
				{ label: resources.READ, value: resources.READ }
			];
		} else if (type === resources.UNASSIGNED_URL.toLowerCase()) {
			this.notificationOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.CHALLENGES, value: resources.CHALLENGES },
				{ label: resources.SYMPTOM, value: resources.SYMPTOM },
				{ label: resources.NEW_CONTENT, value: resources.NEW_CONTENT },
				{ label: resources.COMMUNITY, value: resources.COMMUNITY },
				{ label: resources.VIDEO_LABEL, value: resources.TREATMENT_VIDEO }
			];
			this.statusOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.STATUS_EXPIRED, value: resources.STATUS_EXPIRED },
				{ label: resources.READ, value: resources.READ }
			];
		} else {
			this.handleError(resources.URL_TYPE_ERROR);
		}
	}
	// Set options for Action notifications
	setActionOptions() {
		const { siteUrl, type } = this.getSiteUrlAndType();
		this.urlq = siteUrl;
		if (type === resources.BRANDED_SITE_URL.toLowerCase()) {
			this.notificationOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.SYMPTOM, value: resources.SYMPTOM },
				{ label: resources.TREATMENT_REMINDERS, value: resources.TREATMENT },
				{ label: resources.MY_QUESTIONNAIRES, value: resources.MY_QUESTIONNAIRES },
				{ label: resources.PRESCRIPTION_OPTION, value: resources.PRESCRIPTION_LABEL }
			];
			this.statusOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.COMPLETED, value: resources.COMPLETED },
				{ label: resources.STATUS_EXPIRED, value: resources.STATUS_EXPIRED }
			];
		} else if (type === resources.UNASSIGNED_URL.toLowerCase()) {
			this.notificationOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.SYMPTOM, value: resources.SYMPTOM },
				{ label: resources.MY_QUESTIONNAIRES, value: resources.MY_QUESTIONNAIRES },
				{ label: resources.PRESCRIPTION_OPTION, value: resources.PRESCRIPTION_LABEL }
			];
			this.statusOptions = [
				{ label: resources.ALL, value: resources.ALL },
				{ label: resources.COMPLETED, value: resources.COMPLETED },
				{ label: resources.STATUS_EXPIRED, value: resources.STATUS_EXPIRED }
			];
		} else {
			this.handleError(resources.URL_TYPE_ERROR);
		}
	}
	// Fetch and format all history records
	historyAllRecords() {
		HISTORY_TASK()
			.then((result) => {
				this.categoryType = resources.ALL;
				this.showSpinner = false;
				if (result) {
					if (result.length > 3) {
						this.showLoadMoreButton = true;
					}
					else {
						this.showLoadMoreButton = false;
					}
					const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
					this.notificationCount = result.filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE).length;
					this.hasNoRecords = this.notificationCount === 0;
					this.historyRecords = result
						.filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE)
						.map((obj) => ({
							...obj,
							settingImage: obj.BI_PSP_Category__c === resources.NOTIFICATION_SETTING_CATEGORY,
							sympimg: obj.BI_PSP_Category__c === resources.SYMPTOM,
							quesImg: obj.BI_PSP_Category__c === resources.MY_QUESTIONNAIRES,
							pssImg: obj.BI_PSP_Category__c === resources.PSS_QUESTIONNAIRES,
							qsqImg: obj.BI_PSP_Category__c === resources.QSQ_QUESTIONNAIRES,
							wpaiImg: obj.BI_PSP_Category__c === resources.WPAI_QUESTIONNAIRES,
							dlqiImg: obj.BI_PSP_Category__c === resources.DLQI_QUESTIONNAIRES,
							contentsimg: obj.BI_PSP_Category__c === resources.NEW_CONTENT,
							treatimg:
								obj.BI_PSP_Category__c === resources.TREATMENT ||
								obj.BI_PSP_Category__c === resources.DATE_OF_TREATMENT ||
								obj.BI_PSP_Category__c === resources.TREATMENT_VIDEO ||
								obj.BI_PSP_Category__c === resources.PRESCRIPTION_LABEL,
							challimg: obj.BI_PSP_Category__c === resources.CHALLENGES,
							chatterImg: obj.BI_PSP_Category__c === resources.COMMUNITY,
							FormattedDate: this.formatDate(obj.CreatedDate)
						}));
					if (this.historyRecords.length < 3) {
						this.showLoadMoreButton = false;
					}
				}
			})
			.catch((error) => {
				this.handleError(error.body.message);
			});
	}
	// Handle changes in notification category
	handleCategoryChange(event) {
		this.categoryType = event.target.value;
		this.disableStatus = false;
		this.typeOfStatus = resources.ALL;
		if (this.typeOfNotification === resources.GENERAL) {
			this.handleGeneralCategoryChange(this.categoryType);
		} else if (this.typeOfNotification === resources.ACTION) {
			this.handleActionCategoryChange(this.categoryType);
		}
	}
	// Handle changes for General notification categories
	handleGeneralCategoryChange(categoryType) {
		const criteria = this.getCategoryCriteria(categoryType);
		// Call the general function to fetch and process the history data
		this.fetchAndProcessHistoryData(criteria);
	}
	// Define the filter criteria and mapping properties based on the category type
	getCategoryCriteria(categoryType) {
		switch (categoryType) {
			case resources.ALL:
				this.disableStatus = true;
				this.setGeneralOptions();
				this.categoryType = categoryType;
				return {
					type: resources.GENERAL,
					category: null,
					mapProps: {
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: resources.TREATMENT,
						challimg: resources.CHALLENGES,
						chatterImg: resources.COMMUNITY
					}
				};
			case resources.TREATMENT:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.TREATMENT,
					mapProps: { treatimg: resources.TREATMENT }
				};
			case resources.SYMPTOM:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.SYMPTOM,
					mapProps: { sympimg: resources.SYMPTOM }
				};
			case resources.NEW_CONTENT:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.NEW_CONTENT,
					mapProps: { contentsimg: resources.NEW_CONTENT }
				};
			case resources.COMMUNITY:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.COMMUNITY,
					mapProps: { chatterImg: resources.COMMUNITY }
				};
			case resources.CHALLENGES:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.CHALLENGES,
					mapProps: { challimg: resources.CHALLENGES }
				};
			case resources.TREATMENT_VIDEO:
				this.setGeneralOptions();
				return {
					type: resources.GENERAL,
					category: resources.TREATMENT_VIDEO,
					mapProps: { treatimg: resources.TREATMENT_VIDEO }
				};
			default:
				return {
					type: resources.GENERAL_NOTIFICATION,
					category: null,
					mapProps: {}
				};
		}
	}
	// Fetch and process history data based on criteria
	fetchAndProcessHistoryData(criteria) {
		HISTORY_TASK()
			.then((result) => {
				const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
				// Filter and map the result based on the criteria
				this.historyRecords = result
					.filter(notification =>
						(!criteria.category || notification.BI_PSP_Category__c === criteria.category) &&
						notification.BI_PSP_Notification_Type__c === criteria.type &&
						notification.BI_PSPB_Notification_User_Type__c === USERT_TYPE
					)
					.map(notification => ({
						...notification,
						...this.getMappingProperties(notification, criteria.mapProps),
						FormattedDate: this.formatDate(notification.CreatedDate)
					}));

				this.showLoadMoreButton = this.historyRecords.length >= 3;
				this.notificationCount = this.historyRecords.length;
				this.hasNoRecords = this.notificationCount === 0;
			})
			.catch((error) => {
				this.handleError(error.body.message);
			});
	}
	// Get mapping properties for notifications
	getMappingProperties(notification, mapProps) {
		return Object.keys(mapProps).reduce((acc, key) => {
			acc[key] = notification.BI_PSP_Category__c === mapProps[key];
			return acc;
		}, {});
	}
	// Handle changes for Action notification categories
	handleActionCategoryChange(categoryType) {
		this.disableStatus = false;
		this.typeOfStatus = resources.ALL;
		// Define the filter criteria and mapping properties based on the category type
		const criteria = this.getActionCategoryCriteria(categoryType);
		// Call the action function to fetch and process the history data
		this.fetchAndProcessHistoryAction(criteria);
	}
	// Define the filter criteria and mapping properties based on the category type for action notification
	getActionCategoryCriteria(categoryType) {
		const STATUS_OPTIONS = [
			{ label: resources.ALL, value: resources.ALL },
			{ label: resources.COMPLETED, value: resources.COMPLETED },
			{ label: resources.STATUS_EXPIRED, value: resources.STATUS_EXPIRED },
			{ label: resources.NOT_COMPLETED, value: resources.NOT_COMPLETED }
		];
		switch (categoryType) {
			case resources.ALL:
				this.disableStatus = true;
				this.setActionOptions();
				return {
					type: resources.ACTION,
					category: null,
					mapProps: {
						settingImage: resources.NOTIFICATION_SETTING_CATEGORY,
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: [resources.TREATMENT, resources.PRESCRIPTION_LABEL, resources.DATE_OF_TREATMENT],
						pssImg: [resources.MY_QUESTIONNAIRES, resources.PSS_QUESTIONNAIRES, resources.QSQ_QUESTIONNAIRES, resources.WPAI_QUESTIONNAIRES, resources.DLQI_QUESTIONNAIRES]
					}
				};
			case resources.SYMPTOM:
				this.setActionOptions();
				return {
					type: resources.ACTION,
					category: resources.SYMPTOM,
					mapProps: { sympimg: resources.SYMPTOM }
				};
			case resources.TREATMENT:
				this.statusOptions = [...STATUS_OPTIONS];
				return {
					type: resources.ACTION,
					category: [resources.TREATMENT, resources.DATE_OF_TREATMENT],
					mapProps: { treatimg: [resources.TREATMENT, resources.DATE_OF_TREATMENT] }
				};
			case resources.PRESCRIPTION_LABEL:
				this.statusOptions = [...STATUS_OPTIONS];
				return {
					type: resources.ACTION,
					category: resources.PRESCRIPTION_LABEL,
					mapProps: { treatimg: resources.PRESCRIPTION_LABEL }
				};
			case resources.MY_QUESTIONNAIRES:
				this.setActionOptions();
				return {
					type: resources.ACTION,
					category: [resources.MY_QUESTIONNAIRES, resources.PSS_QUESTIONNAIRES, resources.QSQ_QUESTIONNAIRES, resources.WPAI_QUESTIONNAIRES, resources.DLQI_QUESTIONNAIRES],
					mapProps: { pssImg: [resources.MY_QUESTIONNAIRES, resources.PSS_QUESTIONNAIRES, resources.QSQ_QUESTIONNAIRES, resources.WPAI_QUESTIONNAIRES, resources.DLQI_QUESTIONNAIRES] }
				};
			default:
				this.setActionOptions();
				return {
					type: resources.ACTION,
					category: null,
					mapProps: {}
				};
		}
	}
	// Fetch and process history data based on criteria for action notification
	fetchAndProcessHistoryAction(criteria) {
		HISTORY_TASK()
			.then((result) => {
				const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
				this.historyRecords = result
					.filter(notification =>
						(!criteria.category ||
							(Array.isArray(criteria.category)
								? criteria.category.includes(notification.BI_PSP_Category__c)
								: notification.BI_PSP_Category__c === criteria.category)) &&
						notification.BI_PSP_Notification_Type__c === criteria.type &&
						notification.BI_PSPB_Notification_User_Type__c === USERT_TYPE
					)
					.map(notification => ({
						...notification,
						...this.getMappingPropertiesAction(notification, criteria.mapProps),
						FormattedDate: this.formatDate(notification.CreatedDate)
					}));
				this.showLoadMoreButton = this.historyRecords.length >= 3;
				this.notificationCount = this.historyRecords.length;
				this.hasNoRecords = this.notificationCount === 0;
			})
			.catch((error) => {
				this.handleError(error.body.message);
			});
	}
	// Get mapping properties for action notifications
	getMappingPropertiesAction(notification, mapProps) {
		return Object.keys(mapProps).reduce((acc, key) => {
			if (Array.isArray(mapProps[key])) {
				acc[key] = mapProps[key].includes(notification.BI_PSP_Category__c);
			} else {
				acc[key] = notification.BI_PSP_Category__c === mapProps[key];
			}
			return acc;
		}, {});
	}
	// Handle the value changes in status
	handleStatusValueChange(event) {
		this.typeOfStatus = event.target.value;
		this.handleStatusChange(this.typeOfStatus, this.categoryType, this.typeOfNotification);
	}
	// Handle status changes based on type, category, and notification type , General
	handleGeneralStatus(status, category, notification) {
		switch (status) {
			case resources.ALL:
				this.selectedContentCategory = resources.ALL;
				this.handleStatusChange(status, category, notification);
				break;
			case resources.READ:
				this.handleStatusChange(status, category, notification);
				this.selectedContentCategory = resources.READ;
				break;
			case resources.STATUS_EXPIRED:
				this.handleStatusChange(status, category, notification);
				this.selectedContentCategory = resources.STATUS_EXPIRED;
				break;
			default:
				break;
		}
	}
	// Handle status changes based on type, category, and notification type , Action
	handleActionStatus(status, category, notification) {
		switch (status) {
			case resources.ALL:
				this.selectedContentCategory = resources.ALL;
				this.handleStatusChange(status, category, notification);
				break;
			case resources.COMPLETED:
				this.handleStatusChange(status, category, notification);
				this.selectedContentCategory = resources.COMPLETED;
				break;
			case resources.STATUS_EXPIRED:
				this.handleStatusChange(status, category, notification);
				this.selectedContentCategory = resources.STATUS_EXPIRED;
				break;
			case resources.NOT_COMPLETED:
				this.handleStatusChange(status, category, notification);
				this.selectedContentCategory = resources.NOT_COMPLETED_LABEL;
				break;
			default:
				break;
		}
	}
	// Handle the values of status and filtering
	handleStatusChange(statusValue, categoryType, notificationType) {
		switch (statusValue) {
			case resources.ALL:
				this.selectedContentCategory = resources.ALL;
				break;
			case resources.READ:
				this.selectedContentCategory = resources.READ;
				break;
			case resources.STATUS_EXPIRED:
				this.selectedContentCategory = resources.STATUS_EXPIRED;
				break;
			case resources.COMPLETED:
				this.selectedContentCategory = resources.COMPLETED;
				break;
			case resources.NOT_COMPLETED:
				this.selectedContentCategory = resources.NOT_COMPLETED_LABEL;
				break;
			default:
				break;
		}
		// Define the filter criteria and mapping properties based on the category type
		if (notificationType === resources.GENERAL) {
			const criteria = this.getHistoryStatusGeneral(statusValue, categoryType);
			this.fetchAndProcessStatusHistory(criteria);
		} else if (notificationType === resources.ACTION) {
			const criteria = this.getHistoryStatusAction(statusValue, categoryType);
			this.fetchAndProcessStatusHistory(criteria);
		}
	}
	// Fetch all the general and filter it by status
	getHistoryStatusGeneral(statusValue, categoryType) {
		switch (statusValue) {
			case resources.ALL:
				return {
					type: resources.GENERAL,
					status: resources.ALL,
					category: categoryType,
					mapProps: {
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: resources.TREATMENT,
						challimg: resources.CHALLENGES,
						chatterImg: resources.COMMUNITY
					}
				};
			case resources.STATUS_EXPIRED:
			case resources.READ:
				return {
					type: resources.GENERAL,
					status: statusValue,
					category: categoryType,
					mapProps: {
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: resources.TREATMENT,
						challimg: resources.CHALLENGES,
						chatterImg: resources.COMMUNITY
					}
				};
			default:
				return {
					type: resources.GENERAL,
					category: null,
					status: null,
					mapProps: {}
				};
		}
	}
	// Fetches all the action and filter it by status
	getHistoryStatusAction(statusValue, categoryType) {
		let treatimg = [resources.TREATMENT, resources.PRESCRIPTION_LABEL];
		// Adding resources.DATE_OF_TREATMENT if the categoryType is Treatment
		if (categoryType === resources.TREATMENT) {
			treatimg.push(resources.DATE_OF_TREATMENT);
		}
		// Defining the pssImg array
		let pssImg = [resources.MY_QUESTIONNAIRES];
		// Adding additional questionnaire types if the categoryType is MY_QUESTIONNAIRES
		if (categoryType === resources.MY_QUESTIONNAIRES) {
			pssImg.push(
				resources.PSS_QUESTIONNAIRES,
				resources.QSQ_QUESTIONNAIRES,
				resources.WPAI_QUESTIONNAIRES,
				resources.DLQI_QUESTIONNAIRES
			);
		}
		// Adding categoryType to the category array
		let categoryArray = [categoryType];
		// Adding resources.DATE_OF_TREATMENT if categoryType is Treatment
		if (categoryType === resources.TREATMENT) {
			categoryArray.push(resources.DATE_OF_TREATMENT);
		}
		// Add additional questionnaire types if categoryType is MY_QUESTIONNAIRES
		if (categoryType === resources.MY_QUESTIONNAIRES) {
			categoryArray.push(
				resources.PSS_QUESTIONNAIRES,
				resources.QSQ_QUESTIONNAIRES,
				resources.WPAI_QUESTIONNAIRES,
				resources.DLQI_QUESTIONNAIRES
			);
		}
		switch (statusValue) {
			case resources.ALL:
				return {
					type: resources.ACTION,
					status: resources.ALL,
					category: categoryArray,
					mapProps: {
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: treatimg,
						pssImg: pssImg
					}
				};
			case resources.STATUS_EXPIRED:
			case resources.COMPLETED:
			case resources.NOT_COMPLETED:
				return {
					type: resources.ACTION,
					status: statusValue,
					category: categoryArray,
					mapProps: {
						sympimg: resources.SYMPTOM,
						contentsimg: resources.NEW_CONTENT,
						treatimg: treatimg,
						pssImg: pssImg
					}
				};
			default:
				return {
					type: resources.ACTION,
					category: null,
					status: null,
					mapProps: {}
				};
		}
	}
	// Filtering the history data based on status
	fetchAndProcessStatusHistory(criteria) {
		HISTORY_TASK()
			.then((result) => {
				const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
				this.historyRecords = result.filter(notification => {
					const matchesCategory = !criteria.category ||
						(Array.isArray(criteria.category)
							? criteria.category.includes(notification.BI_PSP_Category__c)
							: notification.BI_PSP_Category__c === criteria.category);

					const matchesStatus = criteria.status === resources.ALL || notification.Status === criteria.status;

					const matchesType = notification.BI_PSP_Notification_Type__c === criteria.type;

					const matchesUserType = notification.BI_PSPB_Notification_User_Type__c === USERT_TYPE;

					return matchesCategory && matchesStatus && matchesType && matchesUserType;
				})
					.map(notification => ({
						...notification,
						...this.getMappingPropertiesHistory(notification, criteria.mapProps),
						FormattedDate: this.formatDate(notification.CreatedDate)
					}));

				this.showLoadMoreButton = this.historyRecords.length >= 3;
				this.notificationCount = this.historyRecords.length;
				this.hasNoRecords = this.notificationCount === 0;
			})
			.catch((error) => {
				this.handleError(error.body.message);
			});
	}
	// Mapping notification and contents to display
	getMappingPropertiesHistory(notification, mapProps) {
		return {
			sympimg: notification.BI_PSP_Category__c === mapProps.sympimg,
			contentsimg: notification.BI_PSP_Category__c === mapProps.contentsimg,
			treatimg: Array.isArray(mapProps.treatimg)
				? mapProps.treatimg.includes(notification.BI_PSP_Category__c)
				: notification.BI_PSP_Category__c === mapProps.treatimg,
			challimg: notification.BI_PSP_Category__c === mapProps.challimg,
			chatterImg: notification.BI_PSP_Category__c === mapProps.chatterImg,
			pssImg: Array.isArray(mapProps.pssImg)
				? mapProps.pssImg.includes(notification.BI_PSP_Category__c)
				: notification.BI_PSP_Category__c === mapProps.pssImg
		};
	}
	handleError(error) {
		let globalThis = window;
		globalThis.location.href = resources.ERROR_PAGE;
		globalThis.sessionStorage.setItem('errorMessage', error);
	}
}