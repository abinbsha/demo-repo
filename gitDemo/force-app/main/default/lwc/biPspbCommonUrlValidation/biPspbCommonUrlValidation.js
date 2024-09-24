import { LightningElement, api } from 'lwc';
import GET_PATIENT_STATUS from '@salesforce/apex/BI_PSP_AssessmentQuestionsCtrl.patientstatusreturn';
import * as labels from 'c/biPspbLabelAndResourceForQuestionnaire';
import Id from '@salesforce/user/Id';

export default class BiPspbCommonUrlValidation extends LightningElement {

    @api finalPartOfUrl;
    urlq;
    patientStatus;
    userType;


    renderedCallback() {
        this.initialize();
    }

    initialize() {
        try {
            this.determineUrl();
            this.userType = typeof Id;
            if (this.userType !== 'undefined') {
                this.getPatientStatus();
            }
        } catch (error) {
            this.showToast(error.message);
        }
    }

    determineUrl() {
        let currentURL = window.location.href;
        let urlObject = new URL(currentURL);
        let path = urlObject.pathname;
        let pathComponents = path.split('/');
        this.desiredComponent = pathComponents.find((component) =>
            [labels.BRANDED_URL.toLowerCase(), labels.UN_ASSIGNED_URL.toLowerCase()].includes(
                component.toLowerCase()
            )
        );
        if (this.desiredComponent.toLowerCase() === labels.BRANDED_URL.toLowerCase()) {
            this.urlq = labels.BRANDED_NAVI_URL;
        } else {
            this.urlq = labels.UN_ASSIGNED_URL_NAVI;
        }
        this.valueToSend = this.urlq;
        const event = new CustomEvent('valuechange', {
            detail: { value: this.valueToSend }
        });
        this.dispatchEvent(event);

    }

    getPatientStatus() {
        GET_PATIENT_STATUS()
            .then(data => {
                if (data) {
                    this.patientStatus = data;
                    this.validateUrl();
                }
            })
            .catch(error => {
                this.showToast(error.message);
            });
    }

    validateUrl() {
        let fullUrl;
        if (this.patientStatus === labels.CHRONIC_STATUS && this.desiredComponent !== labels.BRANDED_URL) {
            fullUrl = labels.BRANDED_NAVI_URL + this.finalPartOfUrl;
        } else if ((this.patientStatus === labels.ACUTE_STATUS || this.patientStatus === labels.UNASSIGNED_STATUS) && this.desiredComponent !== labels.UN_ASSIGNED_URL) {
            fullUrl = labels.UN_ASSIGNED_URL_NAVI + this.finalPartOfUrl;
        }

        if (fullUrl) {
            window.location.assign(fullUrl);
        }
    }


    showToast(message) {
        let messageList = message;
        window.sessionStorage.setItem('errorMessage', messageList);
        window.location.assign(this.urlq + labels.ERROR_PAGE);
    }
}