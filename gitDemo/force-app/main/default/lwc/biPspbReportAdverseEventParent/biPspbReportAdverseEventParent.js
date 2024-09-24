// This LWC is designed for Adverse Event Main Page that contains consolidated components for avatar , message
// To import Libraries
import { LightningElement, track } from 'lwc';
// To import Custom Labels
import{support} from 'c/biPspbSupportCaseResources';
export default class BiPspbReportAdverseEventParent extends LightningElement 
{
	successMsg = support.SUPPORT_CENTER;
	myCase = support.MYCASE;
	finalPartOfUrl = support.ReportUrl;
	// Declaration of variable with @track
	@track valueError;
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	
	// To navigate to the My Support Page
	openSupportCenter() 
	{
		window.location.assign(this.urlq + support.SUPPORT_PAGE_URL);
	}
	// To navigate to the My Cases Page
	openMyCases() 
	{
		window.location.assign(this.urlq + support.MY_CASE_URL);
	}
	showToast(errorMessage) 
	{
		let global = window;
		global.location?.assign(this.urlq + support.ERROR_PAGE);
		global.sessionStorage.setItem('errorMessage', errorMessage);
	}
	
	
	avatarContent = false;

    handleDescriptionError(event) {
        this.avatarContent = event.detail.error;
    }
}