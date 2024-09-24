//This components using patient new entry page all symptoms dispaly select your symptoms parts
import { LightningElement } from 'lwc';
import * as label from 'c/biPspbLabelAndResourceSymptom';
export default class BiPspbSymptomTrackerMainParent extends LightningElement {

showSpinner = true;
    handleAvatarData() {
        this.showSpinner = false;
    }
    finalPartOfUrl = label.SYMPTOM_MAIN_PAGE_URL;
    handleUrlChange(event) {
		// Access the value from the event detail
		this.urlq = event.detail.value;
	}

}