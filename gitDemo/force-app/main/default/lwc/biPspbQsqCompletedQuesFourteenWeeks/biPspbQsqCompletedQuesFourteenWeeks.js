//This is Qualitative satisfaction questionnaire COMPLETED Questionnaire(LWC). This allows you to see your submited Responses.
//To import Libraries
import { LightningElement, wire } from 'lwc';
//To import Apex classes
import GET_ASSESSMENT_QUESTIONS from '@salesforce/apex/BI_PSP_AssessmentQuestionsCtrl.getTheAssesmentQuestion';
import GET_TWO_MONTHS_RECORD from '@salesforce/apex/BI_PSP_QualitativeSatisfactionCtrl.getQSQCompletedQuestionaresFourteenWks';
import GET_TWO_MONTHS_EXPIRED from '@salesforce/apex/BI_PSP_QualitativeSatisfactionCtrl.getDatesOfCompletedQsq';
import GET_PATIENT_ENROLL_DATE from '@salesforce/apex/BI_PSP_QualitativeSatisfactionCtrl.getPatientEnrolleeDateAfterTwoMonthsAndFourteenWeeks';
import GET_ASSESSMENT_COUNT from '@salesforce/apex/BI_PSP_AssessmentCtrl.getAssessmentCountsByCurrentUserName';
//To import Static Resource
import PSS_IMAGE from '@salesforce/resourceUrl/BI_PSP_PssImage';
import INTRO_IMAGE from '@salesforce/resourceUrl/BI_PSP_LetsPersnlizeImg';
import DLQI_IMAGE from '@salesforce/resourceUrl/BI_PSP_DlqiImage';
import WPAI_IMAGE from '@salesforce/resourceUrl/BI_PSP_WpaiImage';
import QUALITATIVE_IMAGE from '@salesforce/resourceUrl/BI_PSP_QualitativeImage';
//To import Custom labels
import * as labels from 'c/biPspbLabelAndResourceForQuestionnaire';
//To get UserId
import Id from '@salesforce/user/Id';
export default class BiPspbQsqCompletedQuesFourteenWeeks extends LightningElement {
    isAfterTwoMonths = false;
    isAfterFourteenWeeks = false;
    isClicked = false;
    weeksAssessmentDate = '';
    twoMonthsAssessmentDate = '';
    firstQuestionText;
    secondQuestionText;
    thirdQuestionText;
    fourthQuestionText;
    fifthQuestionText;
    sixthQuestionText;
    seventhQuestionText;
    eightQuestionText;
    sliderValue = 0;
    sliderValuesec = 0;
    sliderValuethree = 0;
    //Global variables(without @track does not trigger automatic re-renders)
    informationCenter = labels.INFORMATION_CENTER_TXT;
    symptomTracker = labels.SYMPTOM_TRACKER_TXT;
    challenges = labels.CHALLENGES_TXT;
    questionnaire = labels.QUESTIONNAIRE_TXT;
    treatmentVideos = labels.TREATMENT_VIDEOS;
    support = labels.SUPPORT_TXT;
    userid = Id;
    records = [];
    questionData = [];
    urlq;
    storePss = 0;
    storeWpai = 0;
    storeQsq = 0;
    storeDlqi = 0;
    cardimage = INTRO_IMAGE;
    cardImageDlqi = DLQI_IMAGE;
    cardImagePss = PSS_IMAGE;
    cardImageWpai = WPAI_IMAGE;
    cardImageQsq = QUALITATIVE_IMAGE;
    completedOn = labels.COMPLETED;
    fifthQuestDisplay = true; //new one
    unselectedFifthQues = false;
    isFiveThere = null; //new one
    targetFourteenWeeksDate;
    targetTwoMonthsDate;
    introduction = labels.INTRODUCTION_CATEGORY;
    pss = labels.PSS_CATEGORY;
    dlqi = labels.DLQI_CATEGORY;
    wapi = labels.WPAI_CATEGORY;
    qsq = labels.QUALITATIVE_LABEL;
    workApi = labels.WPAI_TXT;
    completedQn = labels.COMPLETED_QUESTIONNAIRE_TXT;
    rollout = labels.ROLL_OUT_TXT;
    expiredOn = labels.EXPIRED_ON;
    selectMonth = labels.SELECT_MONTH;
    notFound = labels.NO_ASSESSMENT_RECORD_FOUND;
    qsqText = labels.QSQ_EG_TXT;
    rolloutDate;
    expireDate;
    assessments = [];
    assessmentResponseses = false;
    selectedAssessment;
    firstQuestionResponse;
    secondQuestionResponse;
    thirdQuestionResponse;
    fourthQuestionResponse;
    fifthQuestionResponse;
    sixthQuestionResponse;
    seventhQuestionResponse;
    eigthQuestionResponse;
    //To get site url
    renderedCallback() {
        try {
            let global = window;
            let currentURL = global.location.href;
            // Create a URL object
            let urlObject = new URL(currentURL);
            // Get the path
            let path = urlObject.pathname;
            // Split the path using '/' as a separator
            let pathComponents = path.split('/');
            // Find the component you need (in this case, 'Branded')
            let desiredComponent = pathComponents.find((component) =>
                [labels.BRANDED_URL.toLowerCase(), labels.UN_ASSIGNED_URL.toLowerCase()].includes(
                    component.toLowerCase()
                )
            );

            if (desiredComponent.toLowerCase() === labels.BRANDED_URL.toLowerCase()) {
                this.urlq = labels.BRANDED_NAVI_URL;
            } else {
                this.urlq = labels.UN_ASSIGNED_URL_NAVI;
            }
        } catch (error) {
            this.showToast(error.message, labels.ERROR_VARIANT); //Catching Potential Error
        }
    }

    // Method to update the thumb label position
    updateThumbLabelPosition(sliderClass, thumbLabelClass, value) {
        Promise.resolve().then(() => {
            let slider = this.template.querySelector(sliderClass);
            let thumbLabel = this.template.querySelector(thumbLabelClass);

            if (!slider || !thumbLabel) return;

            let thumbWidth = parseFloat(window.getComputedStyle(thumbLabel).width);
            let sliderWidth = slider.offsetWidth;
            let thumbPosition = (value / slider.max) * (sliderWidth - thumbWidth);

            let newPosition = thumbPosition + thumbWidth / 2 - sliderWidth / 2;
            let maxPosition = sliderWidth - thumbWidth;

            thumbLabel.style.left = Math.min(maxPosition, Math.max(0, newPosition)) + 'px';
            thumbLabel.setAttribute('data-value', value);

            // Update the content of the thumb-label
            thumbLabel.textContent = value;
        });
    }

    dispatchValueChangeEvent() {
        const event = new CustomEvent('valuechange', {
            detail: { value: this.valueToSend }
        });
        this.dispatchEvent(event);
    }
    // To get assessment Question
    // There's no need to check for null because in Apex, we're throwing an AuraHandledException. Therefore, null data won't be encountered.
    @wire(GET_ASSESSMENT_QUESTIONS, { questionnaireName: '$qsq' })
    wiredAssessmentQuestion({ error, data }) {
        try {
            if (data) {
                this.questionData = data.map((question) => ({
                    id: question.Id,
                    questionText: question.QuestionText,
                    activeVersionId: question.ActiveVersion ? question.ActiveVersion.Id : null
                }));

                this.questionTexts = this.questionData.map(q => q.questionText);

                // Assign the question texts to properties
                [
                    this.firstQuestionText,
                    this.secondQuestionText,
                    this.thirdQuestionText,
                    this.fourthQuestionText,
                    this.fifthQuestionText,
                    this.sixthQuestionText,
                    this.seventhQuestionText,
                    this.eightQuestionText
                ] = this.questionTexts;

            } else if (error) {
                this.showToast(error.body.message, labels.ERROR_VARIANT); // Catching Potential Error Apex
            }
        } catch (err) {
            this.showToast(err.message, labels.ERROR_VARIANT); // Catching Potential Error LWC
        }
    }
    //To get Qualitative date for side bar navigation
    //There's no need to check for null because in Apex, we're throwing an AuraHandledException. Therefore, null data won't be encountered.
    @wire(GET_PATIENT_ENROLL_DATE)
    wiredResult({ error, data }) {
        try {
            if (error) {
                this.showToast(error.body.message, labels.ERROR_VARIANT); //Catching Potential Error Apex
            } else if (data) {
                this.targetTwoMonthsDate = data.targetTwoMonthsDate ?? null;
                this.targetFourteenWeeksDate = data.targetFourteenWeeksDate ?? null;
            }
        } catch (err) {
            this.showToast(err.message, labels.ERROR_VARIANT); //Catching Potential Error LWC
        }
    }
    //To get the expired and Effective date for all selected Records
    //There's no need to check for null because in Apex, we're throwing an AuraHandledException. Therefore, null data won't be encountered.
    @wire(GET_TWO_MONTHS_EXPIRED)
    wiredwapiexpiredResponses({ data, error }) {
        try {
            if (data) {
                this.assessmentResponseses = true;
                this.processAssessmentData(data);
            } else if (error) {
                this.showToast(error.body.message, labels.ERROR_VARIANT); //Catching Potential Error Apex
            }
        } catch (err) {
            this.showToast(err.message, labels.ERROR_VARIANT); //Catching Potential Error LWC
        }
    }

    processAssessmentData(data) {
        // Iterate over the assessment responses
        data.forEach(record => {
            // Check the value of BI_PSP_QsqAfterWeeks__c
            if (record.BI_PSP_QsqAfterWeeks__c === 'pageTwo') {
                // Assign the date from the field Assessment.BI_PSP_DateForCQ__c
                this.weeksAssessmentDate = record.Assessment.BI_PSP_DateForCQ__c;
            }

            // Check the value of BI_PSP_QsqAfter2months__c
            if (record.BI_PSP_QsqAfter2months__c === 'pageOne') {
                // Assign the date from the field Assessment.BI_PSP_DateForCQ__c
                this.twoMonthsAssessmentDate = record.Assessment.BI_PSP_DateForCQ__c;
            }
        });

        // Debugging: Log the stored dates

        if (this.isClicked !== true) {
            if (this.twoMonthsAssessmentDate !== '') {
                this.selectedAssessment = this.twoMonthsAssessmentDate;
            }
            else {
                this.selectedAssessment = this.weeksAssessmentDate;
            }
        }

    }

    get assessmentOptions() {
        const options = [];
        if (this.twoMonthsAssessmentDate !== '') {
            options.push({
                label: this.twoMonthsAssessmentDate,
                value: this.twoMonthsAssessmentDate
            });
        }
        if (this.weeksAssessmentDate !== '') {
            options.push({
                label: this.weeksAssessmentDate,
                value: this.weeksAssessmentDate
            });
        }
        return options;
    }

    handleAssessmentChange(event) {
        let selectedValues = event.target.value;
        this.selectedAssessment = selectedValues;
        this.isClicked = true;
    }

    // Getting assessment by selected target date
    @wire(GET_TWO_MONTHS_RECORD, { targetDate: '$selectedAssessment' })
    wiredAssessmentResponses({ error, data }) {
        try {
            if (data) {
                data.forEach((record) => {
                    switch (record.BI_PSP_ResponseOrder__c) {
                        case 1:
                            this.firstQuestionResponse = record.ResponseText;
                            break;
                        case 2:
                            this.secondQuestionResponse = record.ResponseText;
                            break;
                        case 3:
                            this.thirdQuestionResponse = record.ResponseText;
                            break;
                        case 4:
                            this.fourthQuestionResponse = record.ResponseText;
                            break;
                        case 5:
                            this.isFiveThere = labels.YES_LABEL; // New one
                            this.fifthQuestionResponse = Array.from(
                                record.ResponseText.split(',').filter(
                                    (element) => element.trim() !== ''
                                )
                            );
                            break;
                        case 6:
                            this.sixthQuestionResponse = record.ResponseText;
                            this.isAfterTwoMonths = true;
                            this.isAfterFourteenWeeks = false;
                            break;
                        case 7:
                            this.isAfterFourteenWeeks = true;
                            this.isAfterTwoMonths = false;
                            this.seventhQuestionResponse = record.ResponseText;
                            break;
                        case 8:
                            this.eigthQuestionResponse = record.ResponseText;
                            break;
                        default:
                            break;
                    }
                });

                this.updateThumbLabelPosition('.slider', '.thumb-label', this.firstQuestionResponse);
                this.updateThumbLabelPosition('.slidersec', '.thumb-labelsec', this.thirdQuestionResponse);
                this.updateThumbLabelPosition('.sliderthree', '.thumb-labelthree', this.fourthQuestionResponse);

                this.assessmentResponsesesdate = data.map((response) => ({
                    res: response.Assessment.EffectiveDateTime
                }));
                this.assessmentResponsesesdate1 = data.map((response) => ({
                    res: response.Assessment.BI_PSP_RolloutforCompletedQuestionnarie__c
                }));

                let effectiveDate = new Date(this.assessmentResponsesesdate[0].res);
                let rolloutDate = new Date(this.assessmentResponsesesdate1[0].res);

                this.expireDate = effectiveDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });

                this.rolloutDate = rolloutDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                this.checkFifthQuestion();
                this.dispatchValueChangeEvent();
            } else if (error) {
                this.showToast(error.message, labels.ERROR_VARIANT); // Catching Potential Error Apex
            }
        } catch (err) {
            this.showToast(err.message, labels.ERROR_VARIANT); // Catching Potential Error LWC
        }
    }
    checkFifthQuestion() {
        if (this.isFiveThere !== labels.YES_LABEL) {
            this.fifthQuestDisplay = false;
            this.unselectedFifthQues = false;
        } else {
            this.fifthQuestDisplay = true;
            this.unselectedFifthQues = false;
        }
    }

    //To get assessment Total count for side bar navigation
    //There's no need to check for null because in Apex, we're throwing an AuraHandledException. Therefore, null data won't be encountered.
    @wire(GET_ASSESSMENT_COUNT)
    wiredAssessmentResponsesqsq({ data, error }) {
        try {
            if (data) {
                this.count = data;

                if (this.count.length > 0) {
                    this.storeWpai = this.count[0];
                    this.storePss = this.count[1];
                    this.storeDlqi = this.count[2];
                    this.storeQsq = this.count[3];
                }
            } else if (error) {
                this.showToast(error.body.message, labels.ERROR_VARIANT); //Catching Potential Error Apex
            }
        } catch (err) {
            this.showToast(err.message, labels.ERROR_VARIANT); //Catching Potential Error LWC
        }
    }
    get checkdlqi() {
        return this.storeDlqi > 0 ? '' : 'disabled';
    }
    get checkpss() {
        return this.storePss > 0 ? '' : 'disabled';
    }

    get checkwai() {
        return this.storeWpai > 0 ? '' : 'disabled';
    }

    //Navigation for side bar
    navigateToCategory2() {
        window.location.assign(this.urlq + labels.DLQI_COMPLETED_URL);
    }
    navigateToCategory3() {
        window.location.assign(this.urlq + labels.PSS_COMPLETED_QUESTIONNAIRE_URL);
    }
    navigateToCategory4() {
        window.location.assign(this.urlq + labels.WPAI_COMPLETED_QUESTIONNAIRE);
    }

    // showToast used for all the error messages caught
    showToast(message, variant) {
        let messageList = message + ' ' + variant;
        let globalThis = window;
        globalThis.sessionStorage.setItem('errorMessage', messageList);
        globalThis.location.assign(this.urlq + labels.ERROR_PAGE);
    }

}