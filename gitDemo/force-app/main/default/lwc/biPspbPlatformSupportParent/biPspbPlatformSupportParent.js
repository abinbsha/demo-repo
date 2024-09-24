// This LWC is designed for Platform Support Main page and contains consolidated component for Avatar, Message
// To import Libraries
import { LightningElement } from 'lwc';
// To import Custom Labels

import{support} from 'c/biPspbSupportCaseResources';
export default class BiPspbPlatformSupportParent extends LightningElement 
{
	supportCenter = support.SUPPORT_CENTER;
	myCase = support.MYCASE;
	finalPartOfUrl = support.PspPlaformUrl;	
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}
	// To navidate to the My Support page
	openSupportCenter() 
	{
		window.location.assign( this.urlq + support.SUPPORT_PAGE_URL);
	}
	// To navigate to the My Cases page
	openMyCases() {
		window.location.assign(this.urlq + support.MY_CASE_URL);
	}
	showToast(errorMessage) 
	{ 
			let global = window;
			global.location?.assign(this.urlq + support.ERROR_PAGE);
			global.sessionStorage.setItem('errorMessage', errorMessage);
		}
	
}