// This Lightning Web Component serves as the navigation and parent component for the caregiver profile
// To import Libraries
import { LightningElement } from 'lwc';


import {resources} from 'c/biPspbResourceProfileManager';

export default class BiPspbCaregiverProfileParent extends LightningElement {
	// Declaration of global variables
	notificationSetting=resources.My_Notification;
	selectAvatar=resources.SELECT_AVATAR;
	patientInfo=resources.PATIENT_INFO;
	myProfile=resources.MY_PROFILE;
	siteUrlq;
	showSpinner=true;

	finalPartOfUrl = resources.CAREGIVER_PROFILE_URL;

	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.siteUrlq = event.detail.value;
	}
	// Navigate to the caregiver profile page
	openCarMyProfile() {
		window.location.assign(this.siteUrlq + resources.CAREGIVER_PROFILE_URL);
	}


	// Navigate to the caregiver notifications page
	openCarNotSettings() {
		if(this.siteUrlq === resources.UNASSIGNED_SITE_URL){
			window.location.assign(this.siteUrlq + resources.SettingCaregiver);
		}else{
		window.location.assign(this.siteUrlq + resources.CAREGIVER_NOTIFICATIONS);
		}
	}

	
 handleComponentLoad() {
    // Once the child component has finished loading, hide the spinner
    this.showSpinner = false;
  }
}