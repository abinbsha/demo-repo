//This component consolidates the display of the summary page
// To import libraries
import { LightningElement } from 'lwc';
// To Import Static Resources 
import { resource } from "c/biPspbEnrollmentFormResource";
export default class BiPspbHcpSummaryParent extends LightningElement {
	BGpp = resource.BGPP;
	footerSrc = resource.BIFOOTER_LOGO_JPEG_URL;
	logoSrc = resource.SPEVIGO_LOGO_JPEG_URL;
	selectedAvatarSrc = resource.AVATAR_IMG_HCP;
	selectedCare = resource.CAREGIVER_AVATAR;
	congratulation = resource.CONGRATULATION;
	caregiverValue = false;
	avatarvalue(event) {
		this.caregiverValue = event.detail;
	}
}