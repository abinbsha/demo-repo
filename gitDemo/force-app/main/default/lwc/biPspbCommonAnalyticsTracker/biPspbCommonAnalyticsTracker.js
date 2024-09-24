import { LightningElement } from 'lwc';
import USER_DETAILS from '@salesforce/apex/BI_PSP_CurrentUser.getCurrentUser';
import PATIENT_PROFILE from '@salesforce/label/c.BI_PSPB_PatientProfile';
import CAREGIVER_PROFILE from '@salesforce/label/c.BI_PSPB_CaregiverProfile';
import PATIENT from '@salesforce/label/c.BI_PSPB_PatientTxt';
import CAREGIVER from '@salesforce/label/c.BI_PSPB_CaregiverTxt';
import COMMUNITY_TXT from '@salesforce/label/c.BI_PSPB_CommunityLoginTxt';
import ERROR_PAGE from '@salesforce/label/c.BI_PSP_DisplayNavErrorPage';
export default class BiPspbCommonAnalyticsTracker extends LightningElement {
    globalThis = window;
    documentthis = document;
    connectedCallback() {

        this.userDetails();

    }



    userDetails() {
        USER_DETAILS()
            .then((user) => { // Null check for user record has been handled in its respective apex method.
                this.currentUserIfo = user;
                if (this.currentUserIfo.Profile.Name === PATIENT_PROFILE) {
                    this.addDivToBody(this.currentUserIfo.Id, 'PSPB', true);
                    this.startAnlyticsProcess();
                }
                else if (this.currentUserIfo.Profile.Name === CAREGIVER_PROFILE) {
                    this.addDivToBody(this.currentUserIfo.Id, 'PSPB', false);
                    this.startAnlyticsProcess();
                }
                else {
                    this.documentthis.dispatchEvent(
                        new CustomEvent('startAnalytics', {
                            detail: { start: true },
                        })
                    );
                }
            })
            .catch((error) => {
                this.globalThis.sessionStorage.setItem('errorMessage', error.body.message);
                this.globalThis.location?.assign(ERROR_PAGE);
            });


    }
    startAnlyticsProcess() {
        setTimeout(() => {
            this.documentthis.dispatchEvent(
                new CustomEvent('startAnalytics', {
                    detail: { start: true },
                })
            );
        }, 500);
    }

    addDivToBody(uid, uidType, patientProfile) {
        const div = this.documentthis.createElement('div');
        div.setAttribute('data-it-uid', uid);
        div.setAttribute('data-it-uid-type', uidType);
        div.setAttribute('data-it-logged-in', 'true');
        div.setAttribute('data-it-auth-method',COMMUNITY_TXT);

        if (patientProfile) {
            div.setAttribute('data-it-visitor-type', PATIENT);
        }
        else {
            div.setAttribute('data-it-visitor-type', CAREGIVER);
        }
        this.documentthis.body.appendChild(div);
    }
}