//This Lightning Web Component fetches user enrollment, ranks, and completed challenges from Apex methods, dynamically updating the UI with pagination controls.
//To import Libraries
import { LightningElement } from 'lwc';
import { resources } from 'c/biPspLabelAndResourceChallenges';
//To get current user Id
import Id from "@salesforce/user/Id";
//To import apex classess
import ENROLLE_DETAILS from '@salesforce/apex/BI_PSP_ChallengeEnrolleCtrl.getEnrolle';
import RANDOM_CHALLENGES from '@salesforce/apex/BI_PSP_StatusBasedChallengesCtrl.getRandomChallenges';
import RANK_DETAILS from '@salesforce/apex/BI_PSP_ChallengeRankCtrl.getRank';

export default class BiPspbTrophyCaseComponent extends LightningElement {
	completedChallenges = [];
	imageRanks = [];
	imageRanksToSend = [];
	showInfo;
	userId = Id;
	displayedRecords = 3;
	showMore;
	showLess;
	selectedAvatarSrc;
	novice;
	beginner;
	intermediate;
	proficient;
	recordcount = 0;
	expert;
	showError;
	errorMessage;
	enrolleId;
	noviceImage = resources.NOVICE_IMAGE;
	beginnerImage = resources.BEGINNER_IMAGE;
	intermediateImage = resources.INTERMEDIATE_IMAGE;
	proficientImage = resources.PROFICIENT_IMAGE;
	expertImage = resources.EXPERT_IMAGE;
	noviceStar = resources.NOVICE_STAR;
	beginnerStar = resources.BEGINNER_STAR;
	immediateStar = resources.INTERMEDIATE_STAR;
	proficientStar = resources.PROFICIENT_STAR;
	expertStar = resources.EXPERT_STAR;
	rankLevelTwo = resources.RANK_LEVEL_TWO;
	rankLevelThree = resources.RANK_LEVEL_THREE;
	rankLevelFour = resources.RANK_LEVEL_FOUR;
	rankLevelFive = resources.RANK_LEVEL_FIVE;
	rankLevelSix = resources.RANK_LEVEL_SIX;
	statusCompleted = resources.LABLE_STATUS_COMPLETED;
	errorMsg = resources.ERROR_MESSAGES;
	errorVariant = resources.ERROR_VARIANT;
	expertGpp = resources.EXPERT_GPP;
	beginnerGpp = resources.BEGINNER_GPP;
	intermediateGpp = resources.INTERMEDIATE_GPP;
	noviceGpp = resources.NOVICE_GPP;
	proficientLabel = resources.PROFICIENT_GPP;
	trophyCase = resources.TROPHY_CASE;
	challengesCompleted = resources.CHALLENGES_COMPLETED;
	challengesNotCompleted = resources.CHALLENGES_NOT_COMPLETED;
	loadMore = resources.LOAD_MORE;
	loadLess = resources.LOAD_LESS;
	siteUrlBranded = resources.BRSITE_URL;
	displayErrorPage = resources.BI_PSP_DISPLAYERRORPAGE;
	baseUrl;
	currentPageUrl;
	urlSegments;
	//Used to format the passed date value
	formatDate(dateString) {
		const DATE = new Date(dateString);
		const MONTH = (DATE.getMonth() + 1).toString().padStart(2, '0');
		const DAY = DATE.getDate().toString().padStart(2, '0');
		const YEAR = DATE.getFullYear();
		return `${DAY}/${MONTH}/${YEAR}`;
	}
	//Used to get the patient's enrollee details, calulates the ranks to display the respective trophy
	connectedCallback() {
		let globalThis = window;
		try {
			this.currentPageUrl = globalThis.location?.href;
			this.urlSegments = this.currentPageUrl.split('/');
			this.baseUrl = `${this.urlSegments[0]}//${this.urlSegments[2]}`;
			ENROLLE_DETAILS({ userId: this.userId })
				.then(result => { // Null check has been handled in its respective apex method
					if (result[0].patientEnrolle !== null) {
						this.showError = false;
						this.enrolleId = result[0].patientEnrolle.Id;
						this.getRanks();
						this.getCompletedChallenge();
					} else if (result[0].error !== null) {
						this.showError = true;
						this.errorMessage = result[0].error;
					}
				})
				.catch(error => {
					globalThis.sessionStorage.setItem('errorMessage', error.body.message);
					globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
				})
		}
		catch (error) {
			globalThis.sessionStorage.setItem('errorMessage', error.body.message);
			globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
		}
	}

	// this event is used for get ranks in Trophy
	getRanks() {
		let globalThis = window;
		RANK_DETAILS({ personAccountId: this.enrolleId })
			.then(result => {// Null check has been handled in its respective apex method
				this.imageRanks = result;

				if (this.imageRanks[0].BI_PSP_DOC_Novice__c !== null) {
					const dateString = this.imageRanks[0].BI_PSP_DOC_Novice__c;
					this.novice = this.formatDate(dateString);
				}
				if (this.imageRanks[0].BI_PSP_DOC_Beginner__c !== null) {
					const dateString = this.imageRanks[0].BI_PSP_DOC_Beginner__c;
					this.beginner = this.formatDate(dateString);
				}

				if (this.imageRanks[0].BI_PSP_DOC_Intermediate__c !== null) {
					const dateString = this.imageRanks[0].BI_PSP_DOC_Intermediate__c;
					this.intermediate = this.formatDate(dateString);
				}

				if (this.imageRanks[0].BI_PSP_DOC_Proficient__c !== null) {
					const dateString = this.imageRanks[0].BI_PSP_DOC_Proficient__c;
					this.proficient = this.formatDate(dateString);
				}

				if (this.imageRanks[0].BI_PSP_DOC_Expert__c !== null) {
					const dateString = this.imageRanks[0].BI_PSP_DOC_Expert__c;
					this.expert = this.formatDate(dateString);
				}
				if (this.imageRanks[0].BI_PSP_Challenge_Rank__c === this.noviceGpp) {
					const imageData = { image: this.noviceImage, date: this.novice, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerStar, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.immediateStar, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientStar, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertStar, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				} else if (this.imageRanks[0].BI_PSP_Challenge_Rank__c === this.beginnerGpp) {
					const imageData = { image: this.noviceImage, date: this.novice, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerImage, date: this.beginner, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.immediateStar, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientStar, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertStar, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				} else if (this.imageRanks[0].BI_PSP_Challenge_Rank__c === this.intermediateGpp) {
					const imageData = { image: this.noviceImage, date: this.novice, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerImage, date: this.beginner, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.intermediateImage, date: this.intermediate, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientStar, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertStar, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				} else if (this.imageRanks[0].BI_PSP_Challenge_Rank__c === this.proficientLabel) {
					const imageData = { image: this.noviceImage, date: this.novice, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerImage, date: this.beginner, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.intermediateImage, date: this.intermediate, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientImage, date: this.proficient, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertStar, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				} else if (this.imageRanks[0].BI_PSP_Challenge_Rank__c === this.expertGpp) {
					const imageData = { image: this.noviceImage, date: this.novice, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerImage, date: this.beginner, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.intermediateImage, date: this.intermediate, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientImage, date: this.proficient, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertImage, date: this.expert, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				} else {
					const imageData = { image: this.noviceStar, level: this.rankLevelTwo };
					this.imageRanksToSend.push(imageData);
					const imageDataOne = { image: this.beginnerStar, level: this.rankLevelThree };
					this.imageRanksToSend.push(imageDataOne);
					const imageDataTwo = { image: this.immediateStar, level: this.rankLevelFour };
					this.imageRanksToSend.push(imageDataTwo);
					const imageDataThree = { image: this.proficientStar, level: this.rankLevelFive };
					this.imageRanksToSend.push(imageDataThree);
					const imageDataFive = { image: this.expertStar, level: this.rankLevelSix };
					this.imageRanksToSend.push(imageDataFive);
				}
				
				if (typeof window !== 'undefined') {
					this.dispatchEvent(new CustomEvent('load'));
				}
			})
			.catch(error => {
				globalThis.sessionStorage.setItem('errorMessage', error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
			})
	}

	// This event is used for get  Complete challenges record
	getCompletedChallenge() {
		let globalThis = window;
		let status = this.statusCompleted;
		RANDOM_CHALLENGES({ personAccountId: this.enrolleId, status: status })
			.then(results => {
				if (results !== null) {
					let result = results
					result = result.filter(obj => Object.keys(obj).length !== 0)
					this.completedChallenges = result;
					this.recordcount = result.length;
					if (result.length > 3) {
						this.completedChallenges = result.slice(0, this.displayedRecords);
						this.showMore = true;
						this.displayedRecords += 9;
					} else {
						this.showMore = false;
						this.completedChallenges = result;
					}
					this.showInfos();
				} 

			}).catch(error => {
				globalThis.sessionStorage.setItem('errorMessage', error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
			});
	}
	showInfos() {
		if (Array.isArray(this.completedChallenges) && this.completedChallenges.length === 0) {
			this.showInfo = true;
		} else {
			this.showInfo = false;
		}
	}

	// this event is used for show morw button
	handleShowMoreClick() {
		let globalThis = window;
		let status = this.statusCompleted;
		RANDOM_CHALLENGES({ personAccountId: this.enrolleId, status: status })
			.then(results => {
				if (results !== null) {
					let result = results
					result = result.filter(obj => Object.keys(obj).length !== 0);
					let filteredResult;
					if (result !== null || result !== '') {
						filteredResult = result;
						if (filteredResult.length < this.displayedRecords) {
							// If there are fewer than 3 records after filtering, set the initial 3 records
							this.completedChallenges = filteredResult;
							this.showMore = false;
							this.displayedRecords += 9;
						} else {
							// If there are 3 or more records after filtering, set the initial 3
							this.completedChallenges = filteredResult.slice(0, this.displayedRecords);
							this.showMore = true;
							
							this.displayedRecords += 9;
						}
						if (this.displayedRecords < this.completedChallenges.length) {
							// Increment the number of displayed records.
							this.displayedRecords += 9; // You can change this number as needed.
							this.showInfos();
						}
						if (filteredResult.length === this.completedChallenges.length) {
							this.showLess = true;
							this.showMore = false;
						} else {
							this.showLess = false;
							this.showMore = true;
						}
					}
				} 

			}).catch(error => {
				globalThis.sessionStorage.setItem('errorMessage', error.body.message);
				globalThis.location?.assign(this.baseUrl + this.siteUrlBranded + this.displayErrorPage);
			});

	}
	//Used for show less button functionality
	handleShowLessClick() {
		this.showLess = false;
		this.completedChallenges = [];
		this.displayedRecords = 3;
		this.getCompletedChallenge();
	}
}