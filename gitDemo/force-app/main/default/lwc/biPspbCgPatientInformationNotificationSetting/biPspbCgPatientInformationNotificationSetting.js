import { LightningElement } from 'lwc';
// Import Apex Classes
import PROFILE_DETAILS from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
// Importing all the resources used here from the file biPspbReminderNotificationSettResources.js.
import {resources} from 'c/biPspbNotificationReminderResources';

export default class BiPspbCgPatientInformationNotificationSetting extends LightningElement {

	// Variable declaration and assigning values to it.
	careGiverNotificationSettiong = resources.CAREGIVER_NOTIFY_SETTING_URL
    
	question = resources.INFORMATIONGENDERQUSTION;
	boxedIcon = resources.YELLOW_ICON;
	preferredWay = resources.INFORMATIONGENDERQUSTIONFERRDWAY;
	notificationSettings = resources.NOTIFICATION_SETTINGS;
	userId = resources.ID;
	caregiverNotificationUrl = resources.CAREGIVER_NOTIFICATION_URL;
	patientNotificationUrl = resources.PATIENT_NOTIFICATION_URL;
	systemAdmininstrator = resources.SYSTEM_ADMIN_PROFILE;
	patientProfile = resources.PATIENT_PROFILES;
	caregiverProfile = resources.CAREGIVER_PROFILES;
	siteUrlBranded = resources.BRANDED_URL;
	alternateForBackground = resources.ALTERNATE_BACKGROUND;
	baseUrl;
	notificationSettingsUrl;
	profileName;
	urlq;
	// To check on the page URLs while loading the page.
	connectedCallback() {
		try {
			this.setCurrentPageUrl();
			this.parseUrlSegments();	
			this.fetchProfileDetails();
		
				let globalThis=window;
			const currentURL = globalThis.location.href;
			// Create a URL object
			const urlObject = new URL(currentURL); // Get the path
			const path = urlObject.pathname; // Split the path using '/' as a separator
			const pathComponents = path.split("/"); // Find the component you need (in this case, 'Branded')
			const desiredComponent = pathComponents.find((component) =>
				[resources.BRANDED_SITE_URL.toLowerCase(), resources.UNASSIGNED_SITE_URL.toLowerCase()].includes(
					component.toLowerCase()
				)
			);
			if (desiredComponent && desiredComponent.toLowerCase() === resources.BRANDED_SITE_URL.toLowerCase()) {
				this.urlq = resources.BRANDED_SITE_URL;
			} else {
				this.urlq = resources.UNASSIGNED_SITE_URL;
			}
		}
		catch (err) {
			let globalThis=window;
			this.error=resources.RECORD_NOT_FOUND;
        globalThis.location.href = resources.ERROR_PAGE;        
        globalThis.sessionStorage.setItem('errorMessage', err);
		}
	}
	
	// To get the url of the current page.
	setCurrentPageUrl() {
		let globalThis = window;
		this.currentPageUrl = globalThis.location.href;
	}
	// To split the url based on protocol and host.
	parseUrlSegments() {
        let url = new URL(this.currentPageUrl);
        this.baseUrl = `${url.protocol}//${url.host}`;
    }
	// To fetch whether the user is a patient or a caregiver.
	fetchProfileDetails() {
		PROFILE_DETAILS()
			.then(result => {
				this.profileName = result.Profile.Name;
			})
			.catch((error) => {
				this.handleError(error.body.message);
			});
	}
	// Redirects users to their notification settings based on their profile (patient or caregiver).
	openNotificationSettings() 
	{	
		if (this.profileName === this.patientProfile) 
			{
			const MERGED_URL =  this.careGiverNotificationSettiong;
			window.location.assign(MERGED_URL);
			} 
		else if (this.profileName === this.caregiverProfile) 
			{
			if(this.urlq === resources.BRANDED_SITE_URL){
			window.location.assign( resources.CAREGIVER_NOTIFY_SETTING_URL );
		}else{
			window.location.assign( resources.CAREGIVER_NOTIFICATIONS );
		}
			
			}
	}
	handleError(error){
		let globalThis=window;
		globalThis.location.href = resources.ERROR_PAGE;
		globalThis.sessionStorage.setItem('errorMessage', error);
	}



}