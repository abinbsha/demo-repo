//This Lightning Web Component retrieves and displays notification messages for patients from various sources within a Salesforce community.
// To import Libraries
import { LightningElement} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// To import Apex Classes
import DASHBOARD_NOTIFICATION from '@salesforce/apex/BI_PSPB_MessageCenterCtrl.getActionNotifyRecords';
import QUESTION_STATUS_UPDATE from '@salesforce/apex/BI_PSPB_TaskQuestionStatusCompleted.markTaskQuestionCompleted';
import TASK_UPDATE from '@salesforce/apex/BI_PSPB_NotificationStatusCtrl.markTaskCompleted';
import getUserRecord from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
import {resources} from 'c/biPspbNotificationReminderResources';
export default class BiPspbDashboardNotification extends NavigationMixin(LightningElement)
{
	// Variable declaration
	accountName;
	userId = resources.ID;
	tasks = false;
	contactIds;
	chatterFeedId;
	chatterType;
	categoryType;
	numberOfQuestions;
	notification=resources.NOTIFICATION;
	viewAllBtn=resources.VIEW_ALL;
	startBtn=resources.START_NEW_BUTTON;
	viewbtn=resources.VIEW_BUTTON;
	emptyNotification=resources.EMPTY_NOTIFICATION;
	close=resources.CLOSE;
	treatmentDate=resources.TREATMENT_DATE;
	enterDate=resources.ENTER_YOUR_DATE;
	dateOfTreatment=resources.DATE_TREATMENT;
	submitButton=resources.SUBMIT;
	cancelButton=resources.CANCEL_BUTTON;
	showModal = false;
	alarm = resources.ALARM_IMAGE;
	manageButton = resources.MANAGE;
	New = resources.NEW_IMG;
	comunityImg = resources.COMMUNITY_IMAGE;
	valueSelect;
	// Image URLs
	treatmentUrl = resources.NEW_CONTENT_IMAGE;
	injectionUrl = resources.INJECTION_IMAGE;
	challengeUrl = resources.CHALLENGES_IMAGE;
	questionaireUrl = resources.QUESTIONNAIRE_ONLY_IMAGE;
	symtomUrl = resources.SYMPTOMS_IMAGE;
	newContentUrl = resources.NEW_CONTENT_IMAGE;
	isCaregiver;
	qsqUrl = resources.QUESTIONNAIRE_IMAGE;
	timeElapsedMap = {}; 
	// To return icons related to the task
	get taskIcons() {
		return this.tasks.map(task => (
			{
				taskId: task.Id,
				iconUrl: this.getTaskIcon(task)
			}));
	}
	// Method to calculate time elapsed for tasks
	get timeElapsedForTasks() {
		if (Object.keys(this.timeElapsedMap).length === 0) {
			this.calculateTimeElapsed();
		}
		return this.tasks.map(task => (
			{
				...task,
				timeElapsed: this.timeElapsedMap[task.Id] || 'Not calculated yet'
			}));
	}
	checkQuestionStatus() {
		return QUESTION_STATUS_UPDATE()
			.then(result => {
				this.numberOfQuestions = result;
				return this.numberOfQuestions;
			})
			.catch((error) => {
				this.handleError(error.body.message);
				return null;
			});
	}
	fetchReminderEvents() {
        DASHBOARD_NOTIFICATION()
            .then(data => {	
                if (data.length > 0) {
					const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
					this.tasks = true;
						this.tasks = data
						.filter(obj => obj.BI_PSPB_Notification_User_Type__c === USERT_TYPE)
						.map(task => ({
                            Id: task.Id,
                            Subject: task.Subject,
                            CreatedDate: task.CreatedDate,
                            BI_PSP_Category__c: task.BI_PSP_Category__c,
                            showSetting: task.BI_PSP_Notification_Type__c === resources.ACTION && task.BI_PSP_Category__c === resources.NOTIFICATION_SETTING_CATEGORY,
                            BI_PSP_Notification_Type__c: task.BI_PSP_Notification_Type__c,
							showSymptom: task.BI_PSP_Notification_Type__c === resources.ACTION && task.BI_PSP_Category__c === resources.SYMPTOM,
                            showActionButton: task.BI_PSP_Notification_Type__c === resources.ACTION && task.BI_PSP_Category__c === resources.MY_QUESTIONNAIRES,
                            showDateOfTreatment: task.BI_PSP_Notification_Type__c === resources.ACTION && (task.BI_PSP_Category__c === resources.DATE_OF_TREATMENT || task.BI_PSP_Category__c === resources.TREATMENT) ,
                            showPrescription: task.BI_PSP_Notification_Type__c === resources.ACTION && task.BI_PSP_Category__c === resources.PRESCRIPTION_LABEL,
                            showWpai: (task.BI_PSP_Category__c === resources.WPAI_QUESTIONNAIRES) && task.BI_PSP_Notification_Type__c === resources.ACTION,
                            showQsq: (task.BI_PSP_Category__c === resources.QSQ_QUESTIONNAIRES) && task.BI_PSP_Notification_Type__c === resources.ACTION,
                            showPss: (task.BI_PSP_Category__c === resources.PSS_QUESTIONNAIRES) && task.BI_PSP_Notification_Type__c === resources.ACTION,
                            showDlqi: (task.BI_PSP_Category__c === resources.DLQI_QUESTIONNAIRES) && task.BI_PSP_Notification_Type__c === resources.ACTION,
                            iconUrl: this.getTaskIcon(task)
                        }));
						this.tasks.sort((a, b) => {
							if (a.BI_PSP_Category__c === resources.NOTIFICATION_SETTING_CATEGORY) return -1;
							if (b.BI_PSP_Category__c === resources.NOTIFICATION_SETTING_CATEGORY) return 1;
							if (a.BI_PSP_Category__c === resources.MY_QUESTIONNAIRES && a.Subject === resources.PERSONALISE_SUBJECT) return -1;
							if (b.BI_PSP_Category__c === resources.MY_QUESTIONNAIRES && b.Subject === resources.PERSONALISE_SUBJECT) return 1;
							return new Date(b.CreatedDate) - new Date(a.CreatedDate);
						});					
                        // Retain the top 3 tasks (or adjust the number as needed)
                        this.tasks = this.tasks.slice(0, 3);
						if(this.tasks.length === 0 ){
							this.tasks = false;
						}
                }
            })
            .catch((error) => {
				this.handleError(error.body.message);
            });
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
	// Fetch user's enrollment information
	connectedCallback() {
		try {
			this.checkQuestionStatus();
			this.fetchUserRecord();
			this.fetchReminderEvents();
			const globalThis = window;
			const CURRENT_URL = globalThis.location.href;
			const URL_OBJECT = new URL(CURRENT_URL);
			const PATH = URL_OBJECT.pathname;
			const PATH_COMPONENTS = PATH.split('/');
			const DESIRED_COMPONENT = PATH_COMPONENTS.find(component =>
				[resources.BRANDED_SITE_URL.toLowerCase(), resources.UNASSIGNED_URL.toLowerCase()].includes(component.toLowerCase())
			);
			if (typeof window !== 'undefined') {
				this.dispatchEvent(new CustomEvent('notification'));
			}
			if (DESIRED_COMPONENT.toLowerCase() === resources.BRANDED_SITE_URL.toLowerCase()) {
				this.urlq = resources.BRANDED_SITE_URL;		
			}
			else {
				this.urlq = resources.UNASSIGNED_URL;
			}
		} catch {
			this.handleError(resources.URL_TYPE_ERROR);
		}
	}
	getTaskIcon(task) {
		switch (task.BI_PSP_Category__c) {
			case resources.SYMPTOM:
				return this.symtomUrl;
			case resources.MY_QUESTIONNAIRES:
				return this.questionaireUrl;
			case resources.PRESCRIPTION_LABEL:
			case resources.TREATMENT:
			case resources.DATE_TREATMENT:
				return this.treatmentUrl;
			case resources.QSQ_QUESTIONNAIRES:
				return this.qsqUrl;
			case resources.DLQI_QUESTIONNAIRES:
				return this.qsqUrl;
			case resources.PSS_QUESTIONNAIRES:
				return this.qsqUrl;
			case resources.WPAI_QUESTIONNAIRES:
				return this.qsqUrl;
            case resources.NOTIFICATION_SETTING_CATEGORY:
                return resources.NOTIFICATION_SETTING;
			default:
				return null;
		}
	}
	// Method to navigate to QSQ page
	clickQuestionQsq() {
		this.redirectToUrl(resources.QSQ_QUESTIONNAIRE_URL);
	}
	// Method to navigate to PSS page
	clickQuestionPss() {
		this.redirectToUrl(resources.PSS_QUESTIONNAIRE_URL);
	}
	// Method to navigate to WPAI page
	clickQuestionWpai() {
		this.redirectToUrl(resources.WPAI_QUESTIONNAIRE_URL);
	}
	// Method to navigate to DLQI page
	clickQuestionDlqi() {
		this.redirectToUrl(resources.DLQI_QUESTIONNAIRE_URL);
	}
	// Method to navigate to QSQ page
	clickSetting() {
		const USERT_TYPE = this.isCaregiver ? resources.CAREGIVER : resources.PATIENT;
		if(USERT_TYPE === resources.PATIENT){
		this.redirectToUrl(resources.PATIENT_URL);
		} else {
			this.redirectToUrl(resources.CAREGIVER_URL);
		}
	}	
	// Method to calculate time elapsed for each task
	calculateTimeElapsed() {
		if (this.tasks.length > 0) {	
			this.tasks.forEach(task => {
				const CREATED_DATE = new Date(task.CreatedDate);
				const CURRENT_TIME = new Date();
				const TIME_DIFFERENCE = CURRENT_TIME.getTime() - CREATED_DATE.getTime();
				const HOURS_ELAPSED = Math.floor(TIME_DIFFERENCE / (1000 * 60 * 60));
				const MINUTES_ELAPSED = Math.floor((TIME_DIFFERENCE % (1000 * 60 * 60)) / (1000 * 60));
				
				let daysStr = '';
				let hoursStr = '';
				let minutesStr = '';
	
				if (HOURS_ELAPSED >= 24) {
					const DAYS_ELAPSED = Math.floor(HOURS_ELAPSED / 24);
					const REMAINING_HOURS = HOURS_ELAPSED % 24;
					daysStr = DAYS_ELAPSED === 1 ? '1 day' : `${DAYS_ELAPSED} days`;
					hoursStr = REMAINING_HOURS === 1 ? '1 hr' : `${REMAINING_HOURS} hrs`;
				} else {
					hoursStr = HOURS_ELAPSED === 1 ? '1 hr' : `${HOURS_ELAPSED} hrs`;
				}
	
				minutesStr = MINUTES_ELAPSED === 1 ? '1 min' : `${MINUTES_ELAPSED} mins`;
	
				if (HOURS_ELAPSED >= 24) {
					this.timeElapsedMap[task.Id] = `${daysStr} ${hoursStr} ${minutesStr} ago`;
				} else {
					this.timeElapsedMap[task.Id] = `${hoursStr} ${minutesStr} ago`;
				}
			});
		}
	}
	
	//this Function is used for Update the Symptoms Action records
	updatesymptomcompleted(symptomActiontask) {
		try {
			TASK_UPDATE({ taskId: symptomActiontask })
		}
		catch(error) {
			this.handleError(error.body.message);
		}
	}
	// Method to handle actionn response
	handleActionResponse() {
		this.redirectToUrl(resources.ACTION_URL);
	}
	// Method to navigate to the information center
	handleNavigateAll() {
		this.redirectToUrl(resources.INFORMATION_CENTER_URL);
	}
	// Method to navigate to the lets personalise questionnaires
	handleNavigateLetPers() {
		this.redirectToUrl(resources.PERSONALIZE_QUESTIONNAIRE_URL);
	}
	// Method to navigate to the symptom page
	handleNavigateSymptom(event){
		this.symptomTaskId = event.target.dataset.id;
		this.updatesymptomcompleted(this.symptomTaskId);
		this.redirectToUrl(resources.SYMPTOM_TRACKER_MAIN);
	}
	// Method to navigate to the action notification page
	handleNavigateAction(){
		this.redirectToUrl(resources.ACTION_URL);
		let globalThis = window;
		globalThis.location.assign(resources.ACTION_URL);
	}
	// Method to navigate to the respective url
	redirectToUrl(path) {
		let globalThis = window;
		globalThis.location.assign(path);
	}
	// Method to navigate to error page
	handleError(error){
		let globalThis=window;
		globalThis.location.href = resources.ERROR_PAGE;
		globalThis.sessionStorage.setItem('errorMessage',error);
	}
}