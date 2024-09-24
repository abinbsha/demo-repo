// This Lightning Web Component is a template with tab navigation for Challenges and Trophy Case, along with sections for Avatar Navigation and Challenge Component.
//To import Libraries
import { LightningElement } from 'lwc';
import { resources } from "c/biPspLabelAndResourceChallenges";
//To get Current UserId
import Id from '@salesforce/user/Id';


export default class BiPspbChallengesParent extends LightningElement {
  //Proper naming conventions with camel case for all the variable will be followed in the future releases
  currentXPvalue;
  userId = Id;
  urlq;
  slashUrl = resources.SLASH_URL;
  slashSite = resources.SLASH_SITEURL;
  siteChallengesUrlBranded = resources.BRANDED_CHALLENGES_SITEURL;
  siteTrophyCaseUrlBranded = resources.BR_TROPHY_CASE_SITE_URL;
  challengeNavValue = resources.CHALLANGENAVVALUE;
  tropyCaseNavValue = resources.TROPHYCASENAVVALUE;
   showSpinner = true;

   siteUrlq;

	finalPartOfUrl = this.siteChallengesUrlBranded;

	//To get site url
	handleUrlChange(event) {
		// Access the value from the event detail
		this.siteUrlq = event.detail.value;
	}

 

  // This is used for send the Xp value to child Avatar Component
  sendxpvalue(event) {
    this.currentXPvalue = event.detail;
  }

  // This is used for navigate to specific url to the Challenges Page
  openChallenges() {
    window.location.assign(this.siteChallengesUrlBranded);
  }

  // This is used for navigate to specific url to the Trophy Page
  openTrophyCase() {
    window.location.assign(this.siteTrophyCaseUrlBranded);
  }
  handleComponentLoad() {
    // Once the child component has finished loading, hide the spinner
    this.showSpinner = false;
  }
  
}