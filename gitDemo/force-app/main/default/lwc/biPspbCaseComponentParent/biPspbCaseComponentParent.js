import { LightningElement } from 'lwc';

import{support} from 'c/biPspbSupportCaseResources';
export default class BiPspbCaseComponentParent extends LightningElement {
	supportCenter = support.SUPPORT_CENTER;
	myCase = support.MYCASE;
	finalPartOfUrl = support.MyCaseUrl;
		//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}

	showToast(errorMessage) {
		let global = window;
	global.location?.assign(this.urlq + support.ERROR_PAGE);
	global.sessionStorage.setItem('errorMessage', errorMessage);
	}
	openSupportCenter() {
		window.location.assign(support.SUPPORT_PAGE_URL);
	}
	openMyCases() {
		window.location.assign(support.MY_CASE_URL);
	}
}