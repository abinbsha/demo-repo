// To import libraries
import { LightningElement, api, track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
//To Import apex clases
import CASE_RECORD_CREATE from '@salesforce/apex/BI_PSPB_PatientPrescriptionCtrl.createCaseRecordWithFiles';
import deleteFile from '@salesforce/apex/BI_PSPB_PatientCasesFilesCtrl.deleteFile';
import saveFilesToCase from '@salesforce/apex/BI_PSPB_CreateSupportCaseCtrl.saveFilesToCase';
// To Import Static Resources
import MY_ICON from '@salesforce/resourceUrl/BI_PSPB_UploadIcon';
import MY_ICON_ONE from '@salesforce/resourceUrl/BI_PSPB_RedUploadIcon';
import TIC from '@salesforce/resourceUrl/BI_PSP_ToastTickIcon';
import UPLOAD_FILE_CSS from '@salesforce/resourceUrl/BI_PSPB_UploadFileCss';
import WARNING_ICON from '@salesforce/resourceUrl/BI_PSP_WarningIcon';
import{support} from 'c/biPspbSupportCaseResources';
// To Import Custom Labels
import { LABELS } from 'c/biPspbLabelForUpdatePrescription';

export default class BiPspbUpdatePrescription extends LightningElement {
	@api siteUrlq;
	@api patientStatus;
	showSpinner = false;
	showDiv = false;
	PrescriptionErrorMessage = false;
	radioValueNine = true;
	imgOne = true;
	imgTwo = false;
	radioValueThree = false;
	fileUploadStar = true;
	fileUpload = "file";
	imgPad = "imagepad2";
	pharmacyValue = "";
	commentsValue = "";
	selectedValue;
	BI_PSPB_physical_copy__c = false;
	BI_PSPB_e_prescription__c = false;
	Message = false;
	radioValue = LABELS.YES;
	getAttachFile = "";
	starName = "";
	uploadFile = "uploadfile";
	ePrescriptionQuestion = false;
	files = [];
	radioValueSecond = "";
	fileName = "";
	handleUploadFinished = true;
	fileNames = [];
	browsCondition = true;
	canceLandSubmit = true;
	BrowseLabel = "Browselabelone";
	pharmacyLabel = LABELS.PHARMACY_LABEL;
	uploadErrorLabel = LABELS.UPLOAD_ERROR;
	fileIds = [];
	rightImg = TIC;
	uploadedAttachments = [];
	uploadedNotes = [];
	myIconUrl = MY_ICON;
	myIconUrlOne = MY_ICON_ONE;
	warningIcons = WARNING_ICON;
	value = "";
	updatePrescriptionLabel = LABELS.UPDATE_PRESCRIPTION_LABEL;
	prescriptionContactMsg = LABELS.PRESCRIPTION_CONTACT_MSG;
	latestPrescriptionQstn = LABELS.LATEST_PRESCRIPTION_QSTN;
	ePrescriptionQstn = LABELS.EPRESCRIPTION_QSTN;
	submitLabel = LABELS.SUBMIT;
	cancelLabel = LABELS.CANCEL;
	additionalCommentsLabel = LABELS.ADDITIONAL_COMMENTS;
	prescriptionToastMsg = LABELS.PRESCRIPTION_TOAST_MSG;
	pharmacyPrescriptionLabel = LABELS.PHARMACY_PRESCRIPTION_QSTN;
	optionsOne = [
		{ label: LABELS.YES, value: LABELS.YES },
		{ label: LABELS.NO, value: LABELS.NO }
	];
	optionsTwo = [
		{ label: LABELS.YES, value: LABELS.YES },
		{ label: LABELS.NO, value: LABELS.NO }
	];

	brandedUrl = LABELS.BRANDED_URL;
	unassignedUrl = LABELS.UNASSIGNED_URL;
	brandedUrlNavi = LABELS.BRANDED_URL_NAVI;
	updateRx = LABELS.UPDATERX;
	unAssignedUrlNavi = LABELS.UNASSIGNED_URL_NAVI;
	urlq;
	addiCmd ='addicomment';
	ePresErrMessage = false;
	radioBtnColorChange = '';
	attachment = support.ATTACHMENT;
	symptomCompleteTick = support.ARROW_IMG;
	pdfFile = support.PDF_IMG;
	@track previewUrls = [];
	@track fileUploads = [];
	maxFileSizeReached = false;
	isLimitReached = false;
	fileTypeCheck = support.FILE_TYPE;
	maxFile = support.MAX_FILE_ADD;
	fileMb = support.TOTAL_FILE_SIZE;
	allowedFiles = false;
	limitReach = support.LIMIT_REACH;
	limitFive = support.FIVE_LIMIT;
	wrongIcon = support.UPLOAD_IMAGE;
	defaultUploader = true;
	customUploader = false;
	addPhotos = support.ADD_PHOTOS_TEXT;
	uploadFileError = false;
	errorMessageLabel = LABELS.UPLOAD_ERROR;
	isSubmitButtonDisabled = false;
	// To get the current site path Branded or Unassigned and navigate to the respective page
	connectedCallback() {
		try {
			const globalThis = window;
			const CURRENT_URL = globalThis.location.href;
			const URL_OBJECT = new URL(CURRENT_URL); // Get the PATH
			const PATH = URL_OBJECT.pathname; // Split the PATH using '/' as a separator
			const PATH_COMPONENTS = PATH.split('/');
			const DESIRED_COMPONENTS = PATH_COMPONENTS.find((component) =>
				[
					this.brandedUrl.toLowerCase(),
					this.unassignedUrl.toLowerCase()
				].includes(component.toLowerCase())
			);

			if (DESIRED_COMPONENTS.toLowerCase() === this.brandedUrl.toLowerCase()) {
				this.urlq = this.brandedUrlNavi;
			} else {
				this.urlq = this.unAssignedUrlNavi;
			}
			loadStyle(this, UPLOAD_FILE_CSS);
			this.loadRadioBtnStyles();
		} catch (error) {
			// Handle error
			this.navigateToErrorPage(error.message);
		}
	}

	loadRadioBtnStyles() {
		loadStyle(this, support.CASE_RADIO_BTN);
		loadStyle(this, support.RADIO_BTN_COLOR_CHNAGE);
	}

	handleComments(event) {
		this.commentsValue = event.target.value;
	}
	handlePharmacyValue(event) {
		this.pharmacyValue = event.target.value;
		this.checkPharmacyValue();
	}

	//if the priscription value is "yes" Additional Comments,files will show
	handlePhysicalCopyRecord(event) {
		this.radioValue = event.target.value;
		this.validatePhysicalCopy(this.radioValue);
	}

	validatePhysicalCopy(val){
		this.radioValue = val;
		if (this.radioValue === LABELS.YES) {
			this.handleUploadFinished = true;
			this.ePrescriptionQuestion = false;
			this.Message = false;
			this.radioValueNine = true;
			this.fileUploadStar = true;
			this.starName = "starclass";
			this.radioValueThree = false;
			this.radioValueSecond = "";
			this.canceLandSubmit = true;
			this.PrescriptionErrorMessage = false;
			this.addiCmd = 'addicomment';
			this.ePresErrMessage = false;
			this.radioBtnColorChange = 'chnageradiobtn1';
		}
		//if the priscription value is "NO" epriscription and will show
		else {
			this.ePrescriptionQuestion = true;
			this.handleUploadFinished = true;
			this.radioValueNine = this.ePrescriptionQuestion && this.radioValue === LABELS.NO;
			this.radioValueThree = this.ePrescriptionQuestion && this.radioValue === LABELS.YES;
			this.fileUploadStar = false;
			this.starName = "";
			this.starName = "starclass";
			this.uploadFile = "uploadfile";
			this.fileUpload = "file";
			this.imgPad = "imagepad2";
			this.imgTwo = false;
			this.imgOne = true;
			this.uploadFileError = false;
			this.BrowseLabel = "Browselabelone";
			this.PrescriptionErrorMessage = false;
			this.addiCmd = 'addcmdepres';
		}
	}
	// if the e-priscription value is "yes" pysical copy,Additional Comments,file upload fields will show
	handleEprescription(event) {
		this.radioValueSecond = event.target.value;
		const RADIO = event.target.value;
		this.ePresErrMessage = false;
		this.radioBtnColorChange = 'chnageradiobtn1';
		if (RADIO === LABELS.YES) {
			this.radioValueThree = true;
			this.Message = false;
			this.handleUploadFinished = false;
			this.radioValueNine = true;
			this.canceLandSubmit = true;
		} else {
			this.handleUploadFinished = false;
			this.radioValueThree = false;
			this.Message = true;
			this.canceLandSubmit = false;
			this.radioValueNine = false;
		}
		if (this.radioValueSecond === LABELS.YES) {
			this.handleUploadFinished = true;
			this.PrescriptionErrorMessage = false;
		}
	}

	// clear file fuction

	clearFile() {
		const FILED_INPUT = this.template.querySelector('input[type="file"]');
		FILED_INPUT.value = "";
		this.fileName = "";
	}

	// if the  prescription input box is empty this error message will work
	errorvalidate() {
		let isValid = true;
		const PRESCRIPTION = this.template.querySelector(
			'lightning-input[data-field="prescription"]'
		);
		if (!PRESCRIPTION.value) {
			this.PrescriptionErrorMessage = true;
			isValid = false;
			PRESCRIPTION.className = "textInput-err";
			this.template.querySelector(
				'label[data-field="prescription"]'
			).className = "input-error-label";
		} else {
			this.PrescriptionErrorMessage = false;
			PRESCRIPTION.className = "textInput";
			this.template.querySelector(
				'label[data-field="prescription"]'
			).className = "input-label";
		}
		return isValid;
	}

	//  file  onupload fuctions
	handleUploadFinisheds(event) {
		this.files = event.detail.files;
		this.fileNames = this.files.map((file) => {
			const MAX_LENGTH = window.innerWidth > 768 ? 35 : 20; // Maximum length of displayed filename
			return file.name.length > MAX_LENGTH
				? file.name.substring(0, MAX_LENGTH) + "..."
				: file.name;
		});

		this.fileIds = this.files.map((file) => file.documentId);
		//if user select the file this functions will work
		if (this.files) {
			this.starName = "starclass";
			this.uploadFile = "uploadfile";
			this.fileUpload = "file";
			this.imgPad = "imagepad2";
			this.imgTwo = false;
			this.imgOne = true;
			this.uploadFileError = false;
			this.BrowseLabel = "Browselabelone";
			this.browsCondition = false;
		}
	}

	//user submit the record  all select value will saveed in the database

	handleSubmit() {
		let caseupdate = {
			eprescription: this.radioValueSecond,
			physicalCopy: this.radioValue,
			prescriptionSentTo: this.pharmacyValue,
			additionalComments: this.commentsValue
		};
		// Validate the form only when radioValue is 'no' and radioValueSecond is 'yes'
		const ISVALID =
			this.radioValue === LABELS.NO && this.radioValueSecond === LABELS.YES
				? this.errorvalidate()
				: true;
		
		if(this.radioValue === LABELS.NO && this.radioValueSecond === ''){
			this.ePresErrMessage = true;
			this.radioBtnColorChange = 'chnageradiobtn'; 

		}
		if (!ISVALID || (this.radioValue === LABELS.NO && this.radioValueSecond ==='')) {
			return;
		}
		// if radioValue and file is not selected this if class function are worked.
		if (this.fileUploads.length === 0 && this.radioValue === LABELS.YES) {
			this.starName = "starclass2";
			this.uploadFile = "uploadfile2";
			this.fileUpload = "file1";
			this.imgTwo = true;
			this.imgOne = false;
			this.uploadFileError = true;
			this.BrowseLabel = "Browselabeltwo";
		}
		// if radio value and all values is given the record was summited in this elesif function
		else if (
			this.radioValue === null ||
			(this.radioValue === LABELS.YES && this.fileUploads.length<=3) ||
			this.radioValue === LABELS.NO
		) {
			this.isSubmitButtonDisabled = true;
			CASE_RECORD_CREATE({
				wrapper: caseupdate,
				fileIds: this.fileIds
			})
				.then((result) => {
					this.prescriptionToastMsg = LABELS.PRESCRIPTION_TOAST_MSG;
					this.showDiv = true;
					this.isLimitReached = false;
					this.maxFileSizeReached = false;
					saveFilesToCase({ fileUploads: this.fileUploads, caseId: result })
					.then(() => {
					this.allowedFiles = false;
					window.scrollTo({ top: 0, behavior: "smooth" });
					this.reset();
					})
					
				})

				.catch((error) => {
					this.navigateToErrorPage(error.body.message);
				});
		}
	}

	// if the user click the cancel button all select value will removed

	reset() {
		if ((this.radioValue===LABELS.YES && this.commentsValue==='' && this.fileUploads.length === 0 && this.allowedFiles === false && this.uploadFileError !== true))
		{
			if(this.patientStatus === LABELS.CHRONIC_STATUS){
				window.location.assign(this.siteUrlq + LABELS.DASHBOARD);
			}
			else if(this.patientStatus === LABELS.ACUTE_STATUS){
				window.location.assign(this.siteUrlq + LABELS.ACUTE_DASHBOARD);
			}
			else{
				window.location.assign(this.siteUrlq);
			}
		}
		this.ePresErrMessage = false;
		this.radioBtnColorChange = 'chnageradiobtn1';
		this.radioValueSecond = "";
		this.pharmacyValue = "";
		this.commentsValue = "";
		this.starName = "starclass";
		this.uploadFile = "uploadfile";
		this.fileUpload = "file";
		this.imgPad = "imagepad2";
		this.imgTwo = false;
		this.imgOne = true;
		this.uploadFileError = false;
		this.files = [];
		this.fileNames = [];
		this.browsCondition = true;
		this.PrescriptionErrorMessage = false;
		this.fileUploads = [];
		this.previewUrls = [];
		this.radioValue = LABELS.YES;
		this.allowedFiles = false;
		this.clearPharmacyError();
		this.validatePhysicalCopy(this.radioValue);
		this.isSubmitButtonDisabled = false;
	}

	checkPharmacyValue(){
		const PRESCRIPTION = this.template.querySelector(
			'lightning-input[data-field="prescription"]'
		);
		if (this.pharmacyValue !== "") {
			this.PrescriptionErrorMessage = false;
			PRESCRIPTION.className = "textInput";
			this.template.querySelector(
				'label[data-field="prescription"]'
			).className = "input-label";
		}
		
	}

	clearPharmacyError(){
		const PRESCRIPTION = this.template.querySelector(
			'lightning-input[data-field="prescription"]'
		);
		if(PRESCRIPTION){
		this.PrescriptionErrorMessage = false;
		PRESCRIPTION.className = "textInput";
		this.template.querySelector(
			'label[data-field="prescription"]'
		).className = "input-label";
	}
	}

	closePopup(){
		this.showDiv = false;
		this.prescriptionToastMsg = false;
	}

		// used in HTML file
		handleFileInputChange(event) {
			const files = event.target.files;
			this.uploadFileError = false;
			let totalSize = 0;
			const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

			// Calculate the total size of all selected files
			for (let i = 0; i < files.length; i++) {
				totalSize += files[i].size;
			}
		// Get current total size of existing files
		const currentTotalSize = this.getCurrentTotalSize(); 
			// Check if file limit is reached
			if (files.length + this.fileUploads.length > 3 ) {
				this.isLimitReached = true;
				// Optionally, reset the file input
				event.target.value = null;
				return;
			}
				// Check if total size exceeds 5 MB (5 * 1024 * 1024 bytes)
				if (totalSize + currentTotalSize > 5 * 1024 * 1024) {
					this.maxFileSizeReached = true;
					this.defaultUploader = false;
					this.customUploader = true;
					event.target.value = null; // Reset the file input
					return;
				}
			if (files.length + this.fileUploads) {
				this.starName = "starclass";
				this.uploadFile = "uploadfile";
				this.fileUpload = "file";
				this.imgPad = "imagepad2";
				this.imgTwo = false;
				this.imgOne = true;
				this.uploadFileError = false;
				this.BrowseLabel = "Browselabelone";
				this.browsCondition = false;
			}
			for (let i = 0; i < files.length; i++) {
				if (!allowedTypes.includes(files[i].type)) {
					this.allowedFiles = true;
					event.target.value = null;
					return; // Stop checking further if an invalid file type is found
				}
			}
				// Filter out unsupported file types
				const validFiles = Array.from(files).filter(file => allowedTypes.includes(file.type));
				
				if (validFiles.length !== files.length) {
					this.allowedFiles = true;
					event.target.value = null; // Reset the file input
				}
				else{
				this.allowedFiles = false;
				}
				this.isLimitReached = false;
				this.maxFileSizeReached = false;
				this.customUploader = false;
				this.defaultUploader = true;
			
			const promises = [];
			
			// Process each file
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				
				// Check if the file type is PDF
				if (file.type === 'application/pdf') {
					this.pdfImg = true;
				}
				else{
					this.pdfImg = false;
				}
				
				promises.push(this.readFileAsBase64(file));
			}
			
			// Once all files are processed
			Promise.all(promises)
				.then(results => {
					// Validate results and update preview URLs and file uploads
					const validResults = results.filter(result => result?.base64Data && result?.fileName);
					const truncateFileName = (name) => {
						if (name.length > 15) {
							return name.substring(0, 15) + '...';
						}
						return name;
					};
					this.previewUrls = [
						...this.previewUrls, 
						...validResults.map(result => ({
							dataUrl: result.dataUrl,
							isPdf: result.fileName?.toLowerCase().endsWith('.pdf') || false,
							fileName: result.fileName?.toLowerCase().endsWith('.pdf') 
							? truncateFileName(result.fileName) : ''
						}))
					];	
						this.fileUploads = [...this.fileUploads, ...validResults.map(result => ({
						fileData: result.base64Data,
						fileName: result.fileName
					}))];
				})
				.catch(error => {
					this.navigateToErrorPage(error.body.message);
				});
				event.target.value = null;
		}

		removeImage(event) {
			const index = parseInt(event.target.dataset.index, 10);
			this.isLimitReached = false;
			this.maxFileSizeReached = false;
			this.customUploader = false;
			this.defaultUploader = true;
			// Check if the index is within bounds of the local file uploads list
			if (index >= 0 && index < this.fileUploads.length) {
				// Handle deletion for newly uploaded files
				this.fileUploads = this.fileUploads.filter((_, i) => i !== index);
				this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
				// Dispatch an event to notify that a file was deleted
				this.dispatchEvent(new CustomEvent('filedeleted', {
					detail: { index, type: 'uploaded' },
				}));
			} 
			// Adjust index for prepopulated images
			else {
				const adjustedIndex = index - this.fileUploads.length;
		
				if (adjustedIndex >= 0 && adjustedIndex < this.imageData.length) {
					// Retrieve the image data to be removed
					const fileIdToRemove = this.imageData[adjustedIndex].id;
		
					// Call deleteFile method with the correct fileId
					deleteFile({ caseId: this.caseMedicalId, fileId: fileIdToRemove })
						.then(() => {		
							// Update the image lists after successful deletion
							this.imageUrls = this.imageUrls.filter((_, i) => i !== adjustedIndex);
							this.previewUrls = this.previewUrls.filter((_, i) => i !== adjustedIndex);
							this.imageData = this.imageData.filter((_, i) => i !== adjustedIndex);
		
							// Dispatch an event to notify that a file was deleted
							this.dispatchEvent(new CustomEvent('filedeleted', {
								detail: { index: adjustedIndex, type: 'prepopulated' },
							}));
						})
						.catch(error => {
							this.navigateToErrorPage(error.body.message);
						});
				} 
			}
		}

	// Function to read file as base64
	readFileAsBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve({
					base64Data: reader.result.split(',')[1],
					dataUrl: reader.result,
					fileName: file.name
				});
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

		// Function to get the current total size of uploaded files
		getCurrentTotalSize() {
			// Calculate total size of fileUploads array assuming base64 encoded files
			return this.fileUploads.reduce((total, file) => {
				const base64Length = file.fileData.length;
				
				// Calculate padding based on the end of the base64 string
				let padding = 0;
				if (file.fileData.endsWith('==')) {
					padding = 2;
				} else if (file.fileData.endsWith('=')) {
					padding = 1;
				}
				
				// Length in bytes = (Base64 length / 4) * 3 - padding
				const fileSize = (base64Length * 3 / 4) - padding;
				return total + fileSize;
			}, 0);
		}


	navigateToErrorPage(errorMessage) {
		let globalThis = window;
		globalThis.sessionStorage.setItem('errorMessage', errorMessage);
		globalThis.location.href = this.urlq + LABELS.ERROR_PAGE;
	}
}