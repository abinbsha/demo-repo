import { LightningElement } from "lwc";
import {resources} from 'c/biPspbResourceProfileManager';
export default class BiPspbPatientProfileParent extends LightningElement {
  notificationSetting=resources.NOTIFIC_SETTING;
	selectAvatar=resources.SELECT_AVATAR;
  myCaregiverLabel = resources.MY_CAREGIVER;
	myProfile=resources.MY_PROFILE;
  patientMyProfile = resources.PATIENT_MYPROFILE_URL;
	myCaregiver = resources.MYCAREGIVER_URL;
	patientSelectAvatar = resources.PATIENT_SELECTAVATAR_URL;
	patientNotification = resources.PATIENT_NOTIFICATION_URL;
showSpinner = true;
siteUrlq;

	finalPartOfUrl = this.patientMyProfile;

	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.siteUrlq = event.detail.value;
	}
 openPatMyProfile() {
		window.location.assign( this.patientMyProfile);
	}
	openPatSelectAvatar() {
		window.location.assign( this.patientSelectAvatar);
	}
	openPatNotSettings() {
		window.location.assign( this.patientNotification);
	}
  
   handleComponentLoad() {
    // Once the child component has finished loading, hide the spinner
    this.showSpinner = false;
  }

}