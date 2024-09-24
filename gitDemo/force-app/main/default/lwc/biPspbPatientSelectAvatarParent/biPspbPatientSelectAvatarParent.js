import { LightningElement } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//custom label
import {label} from 'c/biPspbAvatarResources';
import {resources} from 'c/biPspbResourceProfileManager';

export default class BiPspbPatientSelectAvatarParent extends LightningElement {
	
	slashSiteUrl = label.SLASH_URL;
	slashSitePageUrl = label.SLASH_SITE_URL;
	patientMyProfile = resources.PATIENT_MYPROFILE_URL;
	myCaregiver = resources.MYCAREGIVER_URL;
	patientSelectAvatar = resources.PATIENT_SELECTAVATAR_URL;
	patientNotification = resources.PATIENT_NOTIFICATION_URL;
	notificationSetting=resources.NOTIFIC_SETTING;
	selectAvatar=resources.SELECT_AVATAR;
  myCare = resources.MY_CAREGIVER;
	myProfile=resources.MY_PROFILE;
	showSpinner = true;
	finalPartOfUrl=resources.PATIENT_SELECTAVATAR_URL;
	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	openPatMyProfile() {
		window.location.assign(this.urlq+this.patientMyProfile);
	}

	openPatSelectAvatar() {
		window.location.assign( this.urlq+ this.patientSelectAvatar);
	}
	openPatNotSettings() {
		window.location.assign(this.urlq+ this.patientNotification);
	}
	showToast(title, message, variant) {
        if (typeof window !== 'undefined') {
            const event = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            });
            this.dispatchEvent(event);
        } 
    }
	handleAvatarData() {
		// Once the child component has finished loading, hide the spinner
		this.showSpinner = false;
	}
}