// This is consolidate component for unassigned patient notification
// To import Libraries
import { LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';
import {resources} from 'c/biPspbResourceProfileManager';
import PATIENT_STATUS from "@salesforce/apex/BI_PSPB_TreatmentVideoCtrl.patientStatus";
export default class BiPspbNotificationForPatient extends LightningElement {
	//Proper naming conventions with camel case for all the variables will be followed in the future releases
	// Declaration of Global variables
	showSpinner=true;
	unassignedUrl = resources.UNASSIGNED_SITE_URL;
	myProfile = resources.MY_PROFILE;
	myProfileUrl=resources.PATIENT_MYPROFILE_URL;
	mySelectAvatarUrl=resources.PATIENT_SELECTAVATAR_URL;
	myCaregiverUrl=resources.MYCAREGIVER_URL;
	myCaregiver = resources.MY_CAREGIVER;
	selectAvatar = resources.SELECT_AVATAR;
	patientNotification = resources.PATIENT_NOTIFICATION_URL;
	notificationSetting=resources.NOTIFIC_SETTING;
	patientInfo=resources.PATIENT_INFO;
	baseUrl;
	currentPageUrl;
	urlSegments;
	decidingBrandedOrUnassigned;
	patientStatusVal;
	isBranded;

	connectedCallback() {
		try {
			const globalThis = window;
			this.currentPageUrl = globalThis.location.href;
			this.urlSegments = this.currentPageUrl.split('/');
			this.baseUrl = `${this.urlSegments[0]}//${this.urlSegments[2]}`;
			this.detectBrandedOrUnassigned();
			this.getPatienStatus();
		}
		catch (error) {
		// 	let globalThis=window;
		// 	this.error=resources.RECORD_NOT_FOUND;
        // globalThis.location.href = resources.ERROR_PAGE;        
        // globalThis.sessionStorage.setItem('errorMessage', this.error);
		}
	}

	detectBrandedOrUnassigned() {
		let globalThis = window;
		let currentURL = globalThis.location?.href;
		let urlObject = new URL(currentURL);
		let path = urlObject.pathname;
		let pathComponents = path.split('/');
		let desiredComponent = pathComponents.find((component) =>
			[resources.UNASSIGNED_URL.toLowerCase(), resources.BRANDED_URL.toLowerCase()].includes(
			component.toLowerCase()
			)
		);
		if (
			desiredComponent &&
			desiredComponent.toLowerCase() === resources.BRANDED_URL.toLowerCase()
		) {
			this.decidingBrandedOrUnassigned = resources.BRANDED_SITE_URL;
		}
		//set the url and navigations are done within unassigned site
		else {
			this.decidingBrandedOrUnassigned = resources.UNASSIGNED_SITE_URL;
		}
	}

	getPatienStatus() {
		let globalThis = window;
		PATIENT_STATUS({ userId: Id })
			.then((data) => {
				this.patientStatusVal = data;
				if(this.patientStatusVal === resources.CHRONIC_STATUS){
					this.isBranded = true;
				}else{
					this.isBranded = false;
				}
				
			})
			.catch((error) => {
				globalThis.sessionStorage.setItem('errorMessage', error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayNavErrorPage); // Catching Potential Error from Apex
			});
	}

	// navigate unassigned site home page
	openHome() {
		window.location.assign(this.baseUrl + this.unassignedUrl);
	}
	// navigate unassigned site patientprofile page
	openPatMyProfile() {
		window.location.assign(this.baseUrl + this.unassignedUrl + this.myProfileUrl);
	}
	openPatSelectAvatar() {
		// navigate unassigned site patientselectavatar page
		window.location.assign(this.baseUrl + this.unassignedUrl + this.mySelectAvatarUrl);
	}
	// navigate unassigned site patientnotificationt page
	openPatNotSettings() {
		window.location.assign(this.baseUrl + this.decidingBrandedOrUnassigned + this.patientNotification);
	}
 handleComponentLoad() {
    // Once the child component has finished loading, hide the spinner
    this.showSpinner = false;
  }

}