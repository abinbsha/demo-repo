// To import libraries
import { LightningElement } from 'lwc';
// To Import Custom Labels
import { LABELS } from 'c/biPspbLabelForUpdatePrescription';
import PATIENT_STATUS from '@salesforce/apex/BI_PSPB_TreatmentVideoCtrl.patientStatus';

export default class BiPspbPrescriptionParent extends LightningElement {

	brandedUrl = LABELS.BRANDED_URL;
	unassignedUrl = LABELS.UNASSIGNED_URL;
	brandedUrlNavi = LABELS.BRANDED_URL_NAVI;
	updateRx = LABELS.UPDATERX;
	unAssignedUrlNavi = LABELS.UNASSIGNED_URL_NAVI;
	prescription = LABELS.PRESCRIPTION_STATUS;
	urlq;
	updatePrescriptionLabel = LABELS.UPDATE_PRESCRIPTION_LABEL;
	prescriptionStatusLabel = LABELS.PRESCRIPTION_STATUS_LABEL;
	showSpinner = true;
	patientStatus;
	currentUrlq;
	currentPageUrl;

	connectedCallback() {
		try {
			const globalThis = window;
			const CURRENT_URL = globalThis.location.href;
			this.currentPageUrl = CURRENT_URL;
			const URL_OBJECT = new URL(CURRENT_URL); // Get the PATH
			const PATH = URL_OBJECT.pathname; // Split the PATH using '/' as a separator
			const PATH_COMPONENTS = PATH.split('/'); // Find the component you need (in this case, 'Branded')
			const DESIRED_COMPONENTS = PATH_COMPONENTS.find((component) =>
				[this.brandedUrl.toLowerCase(), this.unassignedUrl.toLowerCase()].includes(
					component.toLowerCase()
				)
			);

			if (DESIRED_COMPONENTS.toLowerCase() === this.brandedUrl.toLowerCase()) {
				this.urlq = this.brandedUrlNavi;
				this.currentUrlq = this.brandedUrl;
			} else {
				this.urlq = this.unAssignedUrlNavi;
				this.currentUrlq = this.unassignedUrl;
			}
			this.getCurrentPatientStatus();

		} catch (error) {
			// Handle error
			this.navigateToErrorPage(error.message);
		}
	}

	// navigate the user into the unassigned update prescription cmp page
	openUpdatePrescription() {
		window.location.assign(this.urlq + this.updateRx);
	}
	// navigate the user into the unassigned priscription status  cmp page
	openStatus() {
		window.location.assign(this.urlq + this.prescription);
	}

	stopSpinner(){
		this.showSpinner = false;
	}
	getCurrentPatientStatus(){
		PATIENT_STATUS()
		.then(data => {
			this.patientStatus = data;
			this.navigatePatientSite();
		})
		.catch(error => {
			this.navigateToErrorPage(error.body.message); // Catching Potential Error from Apex
		})
	}

	navigatePatientSite(){
		const globalThis = window;
		if((this.patientStatus === LABELS.UNASSIGNED_STATUS|| this.patientStatus === LABELS.ACUTE_STATUS) 
			&& this.currentUrlq === LABELS.BRANDED_URL){
			globalThis.location.href = this.currentPageUrl.replace(LABELS.BRANDED_URL,LABELS.UNASSIGNED_URL);
		}else if(this.patientStatus === LABELS.CHRONIC_STATUS && this.currentUrlq === LABELS.UNASSIGNED_URL){
		globalThis.location.href = this.currentPageUrl.replace(LABELS.UNASSIGNED_URL,LABELS.BRANDED_URL);
	}
	}
	// navigateToErrorPage used for all the error messages caught
	navigateToErrorPage(errorMessage) {
		let globalThis = window;
		globalThis.sessionStorage.setItem('errorMessage', errorMessage);
		globalThis.location.href = this.urlq + LABELS.ERROR_PAGE;
	}
}