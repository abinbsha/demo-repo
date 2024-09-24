import { LightningElement } from "lwc";


import {resources} from 'c/biPspbResourceProfileManager';
export default class  BiPspbPatientCaregiverParent extends LightningElement {
	//Proper naming conventions with camel case for all the variable will be followed in the future releases
	slashSiteUrl = resources.SLASH_URL;
	slashSitePageUrl = resources.SLASHSITE_URL;
	patientMyProfile = resources.PATIENT_MYPROFILE_URL;
	myCaregiver = resources.MYCAREGIVER_URL;
	patientSelectAvatar = resources.PATIENT_SELECTAVATAR_URL;
	patientNotification = resources.PATIENT_NOTIFICATION_URL;
	notificationSetting=resources.NOTIFIC_SETTING;
	selectAvatar=resources.SELECT_AVATAR;
	patientInfo=resources.PATIENT_INFO;
	myProfile=resources.MY_PROFILE;
	myCare=resources.MY_CAREGIVER;
	//connectedcallback is used for assign the url
	showSpinner=true;
	urlq;

	finalPartOfUrl = resources.MYCAREGIVER_URL;

	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	

	
	openPatMyCaregiver() {
		window.location.assign( this.urlq + this.myCaregiver);
	}

	handleComponentLoad() {
    // Once the child component has finished loading, hide the spinner
    this.showSpinner = false;
  }

}