// This lightning web component is used for display the chronic patient customized video
// To import Libraries
import { LightningElement, wire,api } from 'lwc';
// To import Apex classes
import GET_RECORDS from '@salesforce/apex/BI_PSPB_TreatmentVideoCtrl.getRecords';
// To import Custom Labels
import { LABELS } from 'c/biPspbLabelForTreatmentVideo';
// To get Current UserId
import ID from '@salesforce/user/Id';

export default class BiPspbChronicVideo extends LightningElement {
	showContent = true;
	@api siteUrlq;
	videoUrl = '';
	isContentVisible = false;
	videoWidth='';
	userId = ID;
	flarePreventionHeadingChronic = LABELS.CHRONIC_VIDEO_HEADING;
	transcript = LABELS.TRANSCRIPT;
	disclaimer = LABELS.DISCLAIMER;
	disclaimerMessageChronic = LABELS.DISCLAIMER_MESSAGE_CHRONIC;
	standarItems = [];
	showPrevNext = false;
	// To retrieve the video Url
	@wire(GET_RECORDS)
	wiredVideoData({ data, error }) {
		try {
			if (data && data.length!==0) {
				// Assuming the data is an array with at least one record
				this.standarItems = data.map((record, index) => ({
						id: index + 1, // Assuming id is just a sequential number
						text: record.Name, // Assuming 'text' is mapped to 'Name'
						url: record.BI_PSPB_URL__c,
						transcript: record.BI_PSPB_Transcript__c,
						duration: record.BI_PSPB_Video_Duration__c,
						thumbnail: `background-image: url(${record.BI_PSPB_Video_Thumbnail__c}); background-size: cover; background-position: center; background-repeat: no-repeat;`
					}));
				
				this.mapVideoRecords(data);
			}else if(error) {
				this.navigateToErrorPage(error.body.message); 
			}
		} catch (err) {
			this.navigateToErrorPage(err.message); // Catching Potential Error from Lwc
		}
	}

	scrollAmount = 200; // Amount to scroll, adjust as needed

	mapVideoRecords(data){
		this.standarItems = this.standarItems.slice(0, data.length);
				this.standarItems.pop();
				this.videoUrl = data[data.length-1].BI_PSPB_URL__c;
				this.flarePreventionHeadingChronic = data[data.length-1].Name;
				this.transcriptValue = data[data.length-1].BI_PSPB_Transcript__c;
				this.durationMins= data[data.length-1].BI_PSPB_Video_Duration__c;
				this.thumbnail = `background-image: url(${data[data.length-1].BI_PSPB_Video_Thumbnail__c}); background-size: cover; background-position: center; background-repeat: no-repeat;`
				this.showContent = false;
		if(this.standarItems.length>=2){
			this.showPrevNext = true;
		}
	}
    handlePrevClick() {
        const videoPlayer = this.template.querySelector('.vertical-player');
        videoPlayer.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    }

    handleNextClick() {
        const videoPlayer = this.template.querySelector('.vertical-player');
        videoPlayer.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    }

	changeVideo(event){
	// Convert the id from string to a number
	let currentVideoIndex = parseInt(event.currentTarget.dataset.id, 10);
	// Ensure the index is within the bounds of the array
	if (currentVideoIndex >= 0 && currentVideoIndex <= this.standarItems.length) {

		let currentUrl = this.videoUrl;
		let currentTranscript = this.transcriptValue;
		let currentDuration = this.durationMins;
		let currentThumbnail = this.thumbnail;
		let currentHeading = this.flarePreventionHeadingChronic;


		// Update video and heading information
		this.videoUrl = this.standarItems[currentVideoIndex - 1].url;
		this.flarePreventionHeadingChronic = this.standarItems[currentVideoIndex - 1].text;
		this.durationMins = this.standarItems[currentVideoIndex - 1].duration;
		this.thumbnail = this.standarItems[currentVideoIndex - 1].thumbnail;
		this.transcriptValue = this.standarItems[currentVideoIndex - 1].transcript;
				// Update the specific item in the array
				this.standarItems[currentVideoIndex - 1] = {
					id: currentVideoIndex,
					text: currentHeading,
					url: currentUrl,
					transcript: currentTranscript,
					duration: currentDuration,
					thumbnail: currentThumbnail
				};
		// Scroll to the top smoothly
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	}
	// Getter method to determine the icon name based on content visibility
	get iconName() {
		return this.isContentVisible ? 'utility:chevronup' : 'utility:chevrondown';
	}

	// Getter method to determine the icon alt text based on content visibility
	get iconAltText() {
		return this.isContentVisible ? 'Collapse Content' : 'Expand Content';
	}

	// Getter method to determine the content class based on content visibility
	get contentClass() {
		return this.isContentVisible ? 'content visible' : 'content';
	}

	// Method to toggle the content visibility
	toggleContent() {
		this.isContentVisible = !this.isContentVisible;
	}

	connectedCallback() {
			const globalThis=window;
			// video width and height hardcoded because the UI is not align with the video player
			if(globalThis.innerWidth<=1200){
				this.videoWidth= '700';
			}
			else{
				this.videoWidth = '905';
			}
	}

	// navigateToErrorPage used for all the error messages caught
	navigateToErrorPage(errorMessage) {
		let globalThis = window;
		globalThis.sessionStorage.setItem('errorMessage', errorMessage);
		globalThis.location.assign(this.siteUrlq + LABELS.ERROR_PAGE);	
	}
}