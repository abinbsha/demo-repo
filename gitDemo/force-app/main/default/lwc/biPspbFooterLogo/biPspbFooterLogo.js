//This component is used as Footer for all pages
// To import Libraries
import { LightningElement } from 'lwc';
import { resources } from 'c/biPspLabelAndResourceGeneral';
//Import Apex Classes
import USER_DETAILS from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
import PATIENT_STATUS from "@salesforce/apex/BI_PSPB_TreatmentVideoCtrl.patientStatus";
import GET_CAREGIVER_ACCOUNT from "@salesforce/apex/BI_PSP_CurrentUser.getCaregiverAccount";
// To import User Id.
import Id from '@salesforce/user/Id';
export default class BiPspbFooterLogo extends LightningElement {
	// Declaring variables.
	decidingBrandedOrUnassigned;
	userId = Id;
	decisionForNavBar=false;
	currentPageUrl;
	urlSegments;
	baseUrl;
	chronic = resources.CHRONIC_STATUS;
	//Assigning all imported variables to a variable to use in HTML.
	imageOfLogo = resources.IMAGE_FOR_FOOTER;
	questionnairePageOne=resources.QUESTIONNAIRE_ONE_URL;
	questionnairePageTwo=resources.QUESTIONNAIRE_TWO_URL;
	publicPrivacyNotice=resources.PUBLIC_PRIVACY_NOTICE;
	publicTermsOfUse=resources.PUBLIC_TERMS_OF_USE;
	publicContactUs=resources.PUBLIC_CONTACT_US;
	caregiverFirstAvatar = resources.CAREGIVER_FIRST_AVATAR;
	errorMsg = resources.ERROR_MESSAGE;
	errorVariant = resources.ERROR_VARIANT;
	brandedUrl = resources.BRANDED_URL;
	unassignedUrl = resources.UNASSIGNED_LABEL;
	brSiteUrl = resources.BRSITE_URL;
	unassignedSiteUrl = resources.UNASSIGNED_URL;
	contactUsLabel = resources.CONTACT_US;
	contactUsLogin = resources.CONTACT_US_LOGIN;
	termsOfUseLabel = resources.TERMS_OF_USE;
	termsOfLogin = resources.TERMS_LOGIN;
	privacyNoticeLabel = resources.PRIVACY_NOTICE;
	privacyLogin = resources.PRIVACY_LOGIN;
	contactUsLab = resources.CONTACT_US_LABEL;
	termsOfUseLab = resources.TERMS_OF_USE_LABEL;
	privacyNoticeLab = resources.PRIVACY_NOTICE_LABEL;
	copyrights = resources.COPYRIGHTS;
	displayErrorPage = resources.BI_PSP_DISPLAYERRORPAGE;
	siteUrlBranded = resources.BRSITE_URL;
	displayNavErrorPage = resources.DISPLAY_NAV_ERRORPAGE;
	patientStatusVal;
	userType;
	siteUrl=false;
	currentUserIfo;
	careGiverAcc;
	//ConnectedCallback used to find the site is Branded or Unassigned.

	connectedCallback() {
		let globalThis = window;
		try {
			
			this.currentPageUrl = globalThis.location?.href;
			this.urlSegments = this.currentPageUrl.split('/');
			this.baseUrl = `${this.urlSegments[0]}//${this.urlSegments[2]}`;
			this.userType = typeof Id;
			if (this.userType !== 'undefined')
			{
				this.detectBrandedOrUnassigned();
			}
			this.detectPageUrl();
		} catch (err) {
			globalThis.sessionStorage.setItem('errorMessage',err.body.message);
			globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayNavErrorPage); // Result Null/other Exception
		}
	}

	// To detect the site is branded or unassigned
	detectBrandedOrUnassigned() {
		let globalThis = window;
		USER_DETAILS()
			.then((user) => { // Null check for user record has been handled in its respective apex method.
				this.currentUserIfo = user;
				if (this.currentUserIfo.BI_PSPB_Caregiver__c === true) {
					GET_CAREGIVER_ACCOUNT()
						.then((data)=>{
							this.careGiverAcc = data;
							if(!this.careGiverAcc.BI_PSPB_Selected_Patient_ID__c)
							{
								this.siteUrl=true;
								this.decidingBrandedOrUnassigned = this.brSiteUrl;
							}else{
								this.getPatienStatus();
							}
						})
						.catch((error) => {
							globalThis.sessionStorage.setItem('errorMessage',error.body.message);
							globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayNavErrorPage);
						});
				}else if(this.currentUserIfo.BI_PSPB_Caregiver__c === false)
				{
					this.getPatienStatus();
				}
				
				})
			.catch((error) => {
				globalThis.sessionStorage.setItem('errorMessage',error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayNavErrorPage);
			});

			
	}

	getPatienStatus() {
		let globalThis = window;
		PATIENT_STATUS({ userId: Id })
			.then((data) => {
				this.patientStatusVal = data;
				if(this.patientStatusVal === this.chronic){
					this.decidingBrandedOrUnassigned = this.brSiteUrl;
					this.siteUrl=true;
				}
				else{
					this.decidingBrandedOrUnassigned = this.unassignedSiteUrl;
					this.siteUrl=false;
				}
			})
			.catch((error) => {
				globalThis.sessionStorage.setItem('errorMessage',error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayNavErrorPage); // Catching Potential Error from Apex
			});
	}
	
	
	detectPageUrl()
	{
		let globalThis = window;
		const currentTabName = globalThis.location?.pathname.split('/').pop();
		// Get the pathname from the URL
		let pathname = globalThis.location?.pathname;
		if (pathname === this.brSiteUrl || pathname === '' || currentTabName === this.questionnairePageOne ||
		currentTabName === this.questionnairePageTwo || currentTabName === this.publicPrivacyNotice || 
		currentTabName === this.publicTermsOfUse || currentTabName === this.publicContactUs || 
		currentTabName === this.caregiverFirstAvatar )
		{
			this.decisionForNavBar=true;
		}else{
			this.decisionForNavBar=false;
		}
	}
	

	// Navigate to Contact Us page.

	contactUs()
	{
		if (!this.userId) {
			window.location.assign(this.contactUsLabel);
		} else if (this.userId){
			if(this.decisionForNavBar)
			{
				if(this.siteUrl)
				{
					window.location.assign(this.brSiteUrl + this.publicContactUs);
				}else{
					window.location.assign(this.unassignedSiteUrl + this.publicContactUs);
				}
				
			}else {
				window.location.assign(this.decidingBrandedOrUnassigned + this.contactUsLogin);
			}
		}
	}
	// Navigate to Terms of use page.

	termsOfUse() 
	{
		if (!this.userId) {
			window.location.assign(this.termsOfUseLabel);
		} else if (this.userId){
			if(this.decisionForNavBar)
			{
				if(this.siteUrl)
				{
					window.location.assign(this.brSiteUrl + this.publicTermsOfUse);
				}else{
					window.location.assign(this.unassignedSiteUrl + this.publicTermsOfUse);
				}
			}else{
				window.location.assign(this.decidingBrandedOrUnassigned + this.termsOfLogin);
			}
		}
	}
	// Navigate to Privacy Notice page.

	privacyNotice() 
	{
		if (!this.userId) {
			window.location.assign(this.privacyNoticeLabel);
		}
		else if (this.userId) {
			if(this.decisionForNavBar)
			{
				if(this.siteUrl)
				{
					window.location.assign(this.brSiteUrl + this.publicPrivacyNotice);
				}else{
					window.location.assign(this.unassignedSiteUrl + this.publicPrivacyNotice);
				}
			}else{
				window.location.assign(this.decidingBrandedOrUnassigned + this.privacyLogin);
			}
		}
	}
}