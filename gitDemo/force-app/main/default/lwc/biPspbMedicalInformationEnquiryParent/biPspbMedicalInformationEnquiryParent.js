// This LWC is a design for Medical Information Enquiry main page which contains the consolidated components like Avatar and releavant Messages
// To import Libraries
import { LightningElement} from 'lwc';
// To import Custom Labels
import{support} from 'c/biPspbSupportCaseResources';
export default class BiPspbMedicalInformationEnquiryParent extends LightningElement 
{
	// Declaration of variables with @track
	supportCenter = support.SUPPORT_CENTER;
	myCase = support.MYCASE;
	finalPartOfUrl = support.MedicalUrl;
	valueError;
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	
	// To navidate to the My Support page
	openSupportCenter() {
		window.location.assign(this.urlq + support.SUPPORT_PAGE_URL);
	}
	// To navigate to the My Cases page
	openMyCases() {
		window.location.assign(this.urlq + support.MY_CASE_URL);
	}
	showToast(errorMessage) {
		let global = window;
	global.location?.assign(this.urlq + support.ERROR_PAGE);
	global.sessionStorage.setItem('errorMessage', errorMessage);
	}
	isMedicalValid = false;

	avatarContent = false;

    handleDescriptionError(event) {
        this.avatarContent = event.detail.error;
    }
	
}