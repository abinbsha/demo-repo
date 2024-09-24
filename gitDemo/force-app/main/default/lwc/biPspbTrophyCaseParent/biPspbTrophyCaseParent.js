//This is consolidated component for trophy case page,which have a trophy coponent as a child and Avatar navigation as a child
//To import libraries
import { LightningElement } from 'lwc';

import { resources } from 'c/biPspLabelAndResourceChallenges';


export default class BiPspbTrophyCaseParent extends LightningElement {
	//Declare the variables
	urlq;
	slashUrl = resources.SLASH_URL;
	slashSite = resources.SLASH_SITEURL;
	siteChallengesUrlBranded = resources.BRANDED_CHALLENGES_SITEURL;
	siteTrophyCaseUrlBranded = resources.BR_TROPHY_CASE_SITE_URL;
	challengeNavValue = resources.CHALLANGENAVVALUE;
	tropyCaseNavValue = resources.TROPHYCASENAVVALUE;
	showSpinner = true;
	siteUrlq;

	finalPartOfUrl = this.siteTrophyCaseUrlBranded;

	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.siteUrlq = event.detail.value;
	}

	
	//this event is used for navigation to challenges page
	openChallenges() {
		window.location.assign(this.siteChallengesUrlBranded);
	}
	//this event is used for navigation to Trophy page
	openTrophyCase() {
		window.location.assign(this.siteTrophyCaseUrlBranded);
	}

	handleComponentLoad() {
		// Once the child component has finished loading, hide the spinner
		this.showSpinner = false;
	}

}