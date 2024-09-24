// This component is utilized for displaying a personalized message and patient's name.
// To import Libraries
import { LightningElement } from 'lwc';
// To import Apex Classes
import FETCH_PERSONALIZED_MESSAGES from '@salesforce/apex/BI_PSPB_PersonalizedMessagesCtrl.fetchPersonalizedMessages';
import GET_CATEGORY_MESSAGES from '@salesforce/apex/BI_PSPB_PersonalizedMessagesCtrl.getCategoryMessages';
import GET_LOGGEDIN_USER_ACCOUNT from '@salesforce/apex/BI_PSP_CurrentUser.getEnrolleeRecords';
// To import Static Resource
import {label} from 'c/biPspbAvatarResources';

export default class BiPspbWelcomeAvatar extends LightningElement {
	urlq;
	currentUserName = '';
	userId = label.ID;
	finalMessage;
	finalMessageList = [];
	selectedValue;
	loggedPatient = false;
	caregiver = false;
	message = '';
	personalizedMessages = [];
	generalMessages = [];
	genMessage = '';
	result = '';
	name = '';
	userContacts;
	selectedAvatarSrc = '';
	userAccounts;
	loggedUserData;
	welcomStr = label.WELCOME;
	isLoaded;
	baseUrl;
	urlSegments;
	currentPageUrl;
	siteUrlq;
	genMessageSecond;

	// To retrieve the logged in user name and selected avatar
	retrieveLoggedInUserAccount() {
		GET_LOGGEDIN_USER_ACCOUNT()
			.then((data) => {
				if (data) {
					this.name = data.length > 0 ? data[0]?.Account.Name : '';
					this.selectedAvatarSrc = data[0]?.BI_PSP_AvatarUrl__c ? data[0]?.BI_PSP_AvatarUrl__c : label.DEFAULT_AVATAR_IMG;
					this.mapMessage();
				}
			})
			.catch((error) => {
				this.handleError(error.body.message); // Catching potential error from Apex
			});
	}
	
	// To retrieve the personalized messages based on questionnaire data
	retrievePersonalizedMessages() {
		FETCH_PERSONALIZED_MESSAGES()
			.then((data) => {
				if (data && data.length > 0) {
					this.personalizedMessages = data;
					if (this.personalizedMessages.length > 0) {
						this.result = this.getRandomNumber(
							0,
							this.personalizedMessages.length - 1
						);
						this.message = this.personalizedMessages[this.result];
					}
				}
			})
			.catch((error) => {
				this.handleError(error.body.message); // Catching potential error from Apex
			});
	}

	// To render the personalized messages and name of the user
	mapMessage() {
		const globalThis = window;
		if (this.message && this.message.length !== 0) {
			this.finalMessageList.push(this.message.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name));
		}
		if (this.genMessage && this.genMessage.length !== 0) {
			this.finalMessageList.push(this.genMessage.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name));
		}
		let previousMessage = globalThis.sessionStorage.getItem('message');
		if (previousMessage) {
			// Remove the previous message from finalMessageList
			const replacePlaceholdersInMessage = (message) => {
				if (message) {
					let replacedMessage = message.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name);
					return replacedMessage;
				}
				return message;
			};
			if (this.name !==''){
				previousMessage = replacePlaceholdersInMessage(previousMessage);
			}
			let checkPrevious =this.genMessageSecond.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name);
			if (previousMessage!== checkPrevious){
				this.finalMessageList.push(this.genMessageSecond.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name));
			}
			else{
				this.genMessageSecond = this.generalMessages[1];
				this.finalMessageList.push(this.genMessageSecond.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name));

			}

			this.finalMessageList = this.finalMessageList.filter(message => message !== previousMessage);
		}
		if (this.finalMessageList.length === 1) {
			this.finalMessage = this.finalMessageList[0];
		} else if (this.finalMessageList.length > 1) {
			let finalans = this.getRandomNumber(0, this.finalMessageList.length-1);
			this.finalMessage = this.finalMessageList[finalans];
		}
		this.replacePlaceholders();
	}

	// To retrieve the general category messages and Monday, Friday messages
	connectedCallback() {
		// code
		try {
			this.isLoaded = true;
			GET_CATEGORY_MESSAGES({ categoryval: label.GEN_CATEGORY_MESSAGES })
				.then((result) => {
					this.generalMessages = result;
					this.result = this.getRandomNumber(
						0,
						this.generalMessages.length - 1
					);
					this.genMessage = this.generalMessages[this.result];
					this.genMessageSecond = this.generalMessages[0];
				})
				.catch((error) => {
					this.handleError(error.message); // Catching Potential Error from apex
				});
				this.getCurrentSiteUrl();
				this.retrievePersonalizedMessages();
				this.retrieveLoggedInUserAccount();
		} catch (err) {
			this.handleError(err.message); // Catching Potential Error from lwc
		}
	}

	// To retrieve current site url
	getCurrentSiteUrl(){
		let globalThis = window;
		let currentUrl = globalThis.location.href;
		let urlObject = new URL(currentUrl);
		let path = urlObject.pathname;
		let pathComponents = path.split('/');

		// Find the component you need (in this case, 'Branded')
		let desiredComponent = pathComponents.find((component) =>
			[label.BRANDED_URL.toLowerCase(), label.UNASSIGNED_URL.toLowerCase()].includes(
				component.toLowerCase()
			)
		);

		if (desiredComponent.toLowerCase() === label.BRANDED_URL.toLowerCase()) {
			this.urlq = label.BRANDED_URL;
			this.siteUrlq = label.BRANDEDSITE_URL;
		} else {
			this.urlq = label.UNASSIGNED_URL;
			this.siteUrlq = label.UNASSIGNEDSITE_URL;
		}
		this.currentPageUrl = globalThis.location.href;
		this.urlSegments = this.currentPageUrl.split('/');
		this.baseUrl = `${this.urlSegments[0]}//${this.urlSegments[2]}`;
	}

	// Generate a secure random integer between min (inclusive) and max (exclusive)
	getRandomNumber(min, max) {
		// Generate a secure random integer within the range [0, 2^32)
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array); // Generate a random value
		const randomDecimal = array[0] / (0xFFFFFFFF + 1); // Normalize to [0, 1)

		// Scale the random decimal to the range [min, max)
		const randomNumber = Math.floor(randomDecimal * (max - min)) + min;

		return randomNumber;
	}

	// Replace placeholders with the user's name
	replacePlaceholders() {
		let globalThis = window;
		if (!this.name) {
			return;
		}
	
		const replacePlaceholdersInMessage = (message) => {
			if (message) {
				let replacedMessage = message.replace(/\{!username\}/gu, this.name).replace(/XXX/gu, this.name);
				this.isLoaded = false;
				if (typeof window !== 'undefined') {
					this.dispatchEvent(new CustomEvent('avatarloaded'));
				}
				return replacedMessage;
			}
			return message;
		};
	
		this.message = replacePlaceholdersInMessage(this.message);
		this.genMessage = replacePlaceholdersInMessage(this.genMessage);
		this.finalMessage = replacePlaceholdersInMessage(this.finalMessage);
		globalThis.sessionStorage.setItem('message', this.finalMessage);

	}
	handleError(err){
		this.navigateToErrorPage(err);
	}

	// navigateToErrorPage used for all the error messages caught
	navigateToErrorPage(errorMessage) {
		let globalThis = window;
		globalThis.sessionStorage.setItem('errorMessage', errorMessage);
		globalThis.location.href = this.baseUrl + this.siteUrlq + label.ERROR_PAGE; 
	}
}