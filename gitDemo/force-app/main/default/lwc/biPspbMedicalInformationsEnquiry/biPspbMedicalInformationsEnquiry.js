// This LWC is used to create case records for Type - Medical Information Enquiry
// To import Libraries
import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadStyle } from 'lightning/platformResourceLoader';
// To import Apex Classes
import INSERT_UPDATE_LEAD_CONSENT from '@salesforce/apex/BI_PSPB_CreateSupportCaseCtrl.createCase';
import UPDATE_CASE from '@salesforce/apex/BI_PSPB_SupportCenterCtrl.updateCase';
import UPDATE_DRAFT from '@salesforce/apex/BI_PSPB_SupportCenterCtrl.updateDraft';
import CASE_DRAFT from '@salesforce/apex/BI_PSPB_CreateSupportCaseCtrl.caseDraft';
import CASE_RECORDS_GET from '@salesforce/apex/BI_PSPB_DraftSupportCtrl.getPSPCaseRecordsMedical';
import ENROLLE_GET from '@salesforce/apex/BI_PSP_ChallengeEnrolleCtrl.getEnrolle';
import getSavedImageUrls from '@salesforce/apex/BI_PSPB_DraftSupportCtrl.getSavedImageUrls';
import saveFilesToCase from '@salesforce/apex/BI_PSPB_CreateSupportCaseCtrl.saveFilesToCase';
import deleteFile from '@salesforce/apex/BI_PSPB_PatientCasesFilesCtrl.deleteFile';
import { support } from 'c/biPspbSupportCaseResources';
export default class BiPspbMedicalInformationEnquiry extends NavigationMixin(LightningElement)
{
	//Proper naming conventions with camel case for all the variable will be followed in the future releases
	// Declaration of variables with @api

	@api acceptedFormats = '.jpg,.jpeg,.png,.pdf'; // Set the accepted file formats
	@api recordId; // Pass the record ID if applicable
	@track fileSizes = []; // Track file sizes
	@track imageUrls = [];
	@track previewUrls = [];
	@track fileUploads = [];
	defaultUploader = true;
	customUploader = false;
	limitReach = support.LIMIT_REACH;
	wrongIcon = support.UPLOAD_IMAGE;
	allowedFiles = false;

	addPhotos = support.ADD_PHOTOS_TEXT;
	limitFive = support.FIVE_LIMIT;
	maxFile = support.MAX_FILE_ADD;
	fileMb = support.TOTAL_FILE_SIZE;
	fileTypeCheck = support.FILE_TYPE;
	InputOne = true;
	InputTwo = false;
	sizeOfFiles;
	sizeOfMb;
	symptomCompleteTick = support.ARROW_IMG;
	isLimitReached = false;
	maximumLimit = false;
	// Declaration of variables with @track
	showSpinner = true;
	casePopup = false;
	draftPopup = false;
	medicalInfoHead = support.MEDICAL_HEAD;
	backValue = support.BACK;
	createCase = support.CREATE_CASE;
	createDraft = support.CREATE_DRAFT;
	maxLimit = support.MAX_LIMIT;
	browesAndUpload = support.BROWS_AND_UPLOAD;
	fiveMb = support.FIVEMB;
	attachment = support.ATTACHMENT;
	descriptionValue = support.DESCRIPTION;
	selectType = support.SELECT_TYPE;
	successMsg = support.SUCCESS_MSG;
	successMessage = support.SUCCESS_MESSAGE;
	// to invoke CSS '' are useed
	back = false;
	classOne = 'buttonbox';
	classTwo = 'buttonbox';
	classThree = 'buttonbox';
	classFour = 'buttonbox';
	classFive = 'desc';
	classSix = 'desc';
	classSeven = 'desc';
	urlq;
	contact = true;
	showCollectButton = true;
	caseType;
	selectedOption;
	userId = support.ID;
	accName;
	showDivSubmit = false;
	showDivDraft = false;
	fileIcon = support.MY_ICON;
	isFormVisible = false;
	isFormVisibleOne = false;
	isFormVisibleTwo = false;
	isFormVisibleThree = false;
	fieldOne = '';
	fieldTwo = '';
	subTypError = false;
	descriptionError = false;
	files = [];
	caseRecord;
	caseMedicalId = null;
	medicalSubType;
	medicalDescription;
	dataValue;
	selectedOptionValues;
	description = '';
	medicalDataGet;
	descriptionLengthError = false;
	browserName = true;
	fileName;
	fileNames;
	showFileNames = false;
	radioBtnColorChange = '';
	faultValue = false;
	filess = [];
	fileDetails = [];
	errorMessage;
	caseSubType;
	caseDescription;
	isReadOnly = false;
	medStatus;
	selectedItemId;
	// Declaration of variables
	rightImg = support.TIC;
	iconWarning = support.WARNING;
	buttonImage = support.IMG;
	backArrow = support.ARROW;
	phnImg = support.PHN_IMG;
	emailImg = support.EMAIL_IMG;
	subType = ''; // Initialize with an empty string
	caseRecordId;
	checkCaseRadiBtn = '';
	isButtonDisabled = false;
	isSubmitButtonDisabled;
	pdfImg = false;
	pdfFile = support.PDF_IMG;
	// used in HTML file
	subTypeErr = support.SUBTYPE_ERROR;
	descriptionErr = support.DESCRIPTION_ERROR;
	descritionErrChar = support.DESCRIPTION_ERROR_CHAR;

	subTypeOptions = [
		{ label: support.PRODUCT, value: support.PRODUCT },
		{ label: support.TREATMENT, value: support.TREATMENT }
	];

	connectedCallback() {
		try {
			this.handleSessionStorage();
			this.addEventListeners();
			this.loadCaseRecords();
			this.loadStyles();
			this.handleEnrollment();
			this.determineDesiredComponent();
		} catch (error) {
			this.navigateToAnotherPage(error.message);
		}
	}

	handleSessionStorage() {
		let globalThis = window;
		if (typeof globalThis !== support.UNDIFINED) {
			this.selectedItemId = globalThis.sessionStorage.getItem("caseRecordId");
		}
	}

	handleFileInputChange(event) {
		const files = event.target.files;
		
		let totalSize = 0;
		const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

		// Calculate the total size of all selected files
		for (let i = 0; i < files.length; i++) {
			totalSize += files[i].size;
		}

		// Get current total size of existing files
		const currentTotalSize = this.getCurrentTotalSize();

		// Check if file limit is reached
		if (files.length + this.fileUploads.length > 3) {
			this.isLimitReached = true;
			event.target.value = null; // Reset the file input
			return;
		}

		// Check if total size exceeds 5 MB (5 * 1024 * 1024 bytes)
		if (totalSize + currentTotalSize > 5 * 1024 * 1024) {
			this.maximumLimit = true;
			this.defaultUploader = false;
			this.customUploader = true;
			event.target.value = null; // Reset the file input
			return;
		}

		// Filter out unsupported file types
		const validFiles = Array.from(files).filter(file => allowedTypes.includes(file.type));

		if (validFiles.length !== files.length) {
			this.allowedFiles = true;
			event.target.value = null; // Reset the file input
			return;
		}
		this.allowedFiles = false;
		this.isLimitReached = false;
		this.maximumLimit = false;
		this.defaultUploader = true;
		this.customUploader = false;
		const promises = [];

		// Process each valid file
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			// Check if the file type is PDF
			if (file.type === support.APPLICATION_PDF) {
				this.pdfImg = true;
			} else {
				this.pdfImg = false;
			}
			// Convert the file to base64
			promises.push(this.readFileAsBase64(file));
		}

		// Once all files are processed
		Promise.all(promises)
    .then(results => {
        // Helper function to truncate file names longer than 15 characters
        const truncateFileName = (name) => {
            if (name.length > 15) {
                return name.substring(0, 15) + '...';
            }
            return name;
        };

        // Validate results and update preview URLs and file uploads
        const validResults = results.filter(result => result?.base64Data && result?.fileName);

        this.previewUrls = [
            ...this.previewUrls,
            ...validResults.map(result => ({
                dataUrl: result.dataUrl,
                isPdf: result.fileName?.toLowerCase().endsWith('.pdf') || false,
                fileName: result.fileName?.toLowerCase().endsWith('.pdf') 
                    ? truncateFileName(result.fileName) // Only include and truncate fileName for PDFs
                    : ''
            }))
        ];
        this.fileUploads = [
            ...this.fileUploads, 
            ...validResults.map(result => ({
                fileData: result.base64Data,
                fileName: result.fileName
            }))
        ];
    })
    .catch(error => {
        this.navigateToErrorPage(error.body.message);
    });
	}
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
			reader.readAsDataURL(file); // Read file as data URL
		});
	}
	handleFileInputPre(event) {
		const files = event.target.files;
		let totalSize = 0;
		const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

		// Validate each file
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB

			// Check if any individual file exceeds 5 MB
			if (fileSizeInMB > 5) {
				event.target.value = null; // Reset the file input
				return;
			}

			// Check if file type is allowed
			if (!allowedTypes.includes(file.type)) {
				this.allowedFiles = true;
				event.target.value = null; // Reset the file input
				return;
			}

			this.allowedFiles = false;
			totalSize += file.size;
		}

		// Get the current total size of existing files
		const currentTotalSize = this.getCurrentTotalSize();
		const currentTotalFilesCount = this.fileUploads.length + this.sizeOfFiles.length;

		// Check if the file limit is reached
		if (files.length + currentTotalFilesCount > 3) {
			this.isLimitReached = true;
			event.target.value = null; // Reset the file input
			return;
		}

		// Check if the total size exceeds 5 MB (5 * 1024 * 1024 bytes)
		if (totalSize + currentTotalSize > 5 * 1024 * 1024) {
			this.maximumLimit = true;
			event.target.value = null; // Reset the file input
			return;
		}

		this.isLimitReached = false;
		this.maximumLimit = false;

		const promises = [];

		// Process each file
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			// Convert the file to base64
			promises.push(this.readFileAsBase64(file));
		}

		// Once all files are processed
		Promise.all(promises)
    .then(results => {
        // Helper function to truncate file names longer than 15 characters
        const truncateFileName = (name) => {
            if (name.length > 15) {
                return name.substring(0, 15) + '...';
            }
            return name;
        };

        // Validate results and update preview URLs and file uploads
        const validResults = results.filter(result => result?.base64Data && result?.fileName);

        this.previewUrls = [
            ...this.previewUrls,
            ...validResults.map(result => ({
                dataUrl: result.dataUrl,
                isPdf: result.fileName?.toLowerCase().endsWith('.pdf') || false,
                fileName: result.fileName?.toLowerCase().endsWith('.pdf') 
                    ? truncateFileName(result.fileName) // Only include and truncate fileName for PDFs
                    : ''
            }))
        ];
        this.fileUploads = [
            ...this.fileUploads, 
            ...validResults.map(result => ({
                fileData: result.base64Data,
                fileName: result.fileName
            }))
        ];
    })
    .catch(error => {
        this.navigateToErrorPage(error.body.message);
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


	removeImage(event) {
		const index = parseInt(event.target.dataset.index, 10);
		this.isLimitReached = false;
	
		// Determine whether the index refers to an uploaded file or a prepopulated file
		if (index >= 0 && index < this.fileUploads.length) {
			// Handle deletion for newly uploaded files
			this.fileUploads = this.fileUploads.filter((_, i) => i !== index);
			this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
			if (typeof window !== 'undefined') {
				// Dispatch an event to notify that a file was deleted
				this.dispatchEvent(new CustomEvent('filedeleted', {
					detail: { index, type: 'uploaded' },
				}));
			}
		} else {
			// Adjust index for prepopulated images
			const adjustedIndex = index - this.fileUploads.length;

			if (adjustedIndex >= 0 && adjustedIndex < this.imageData.length) {
				// Retrieve the image data to be removed
				const fileIdToRemove = this.imageData[adjustedIndex].id;

				// Call deleteFile method with the correct fileId
				deleteFile({ caseId: this.caseMedicalId, fileId: fileIdToRemove })
					.then(() => {
						// Update the image lists after successful deletion
						this.imageUrls = this.imageUrls.filter((_, i) => i !== adjustedIndex);
						this.previewUrls = this.previewUrls.filter((_, i) => i !== index); // This should use the original index
						this.imageData = this.imageData.filter((_, i) => i !== adjustedIndex);

						// Also update sizeOfFiles and sizeOfMb arrays
						this.sizeOfFiles = this.sizeOfFiles.filter((_, i) => i !== adjustedIndex);
						this.sizeOfMb = this.sizeOfMb.filter((_, i) => i !== adjustedIndex);
						if (typeof window !== 'undefined') {
							// Dispatch an event to notify that a file was deleted
							this.dispatchEvent(new CustomEvent('filedeleted', {
								detail: { index: adjustedIndex + this.fileUploads.length, type: 'prepopulated' },
							}));
						}
					})
					.catch(error => {
						this.navigateToAnotherPage(error.body.message);
					});
			} else {
				this.navigateToAnotherPage(support.DELETE_FILE);
			}
		}
	}





	ClosePopup() {
		this.casePopup = false;
		this.draftPopup = false;
		this.isButtonDisabled = false;
		this.isSubmitButtonDisabled = false;
	}
	addEventListeners() {
		let globalThis = window;
		globalThis?.addEventListener('beforeunload', this.handlePageRefresh);
	}

	loadStyles() {
		loadStyle(this, support.CASE_RADIO_BTN);
		loadStyle(this, support.RADIO_BTN_COLOR_CHNAGE);
	}

	handleEnrollment() {
		ENROLLE_GET()
			.then((result) => {
				if (result !== null) {
					if (result[0].patientEnrolle !== null) {
						this.accName = result[0].patientEnrolle.Id;

					} else if (result[0].error !== null) {
						this.showError = true;
						this.errorMessage = result[0].error;
					}
					this.showSpinner = false;
				}
			})
			.catch((error) => {
				this.navigateToAnotherPage(support.ENROLL_NOT_GET, error.message);
			});
	}

	determineDesiredComponent() {
		let globalThis = window;
		const CURRENT_URL = globalThis.location?.href;
		const URL_OBJECT = new URL(CURRENT_URL);
		const PATH = URL_OBJECT.pathname;
		const PATH_COMPONENTS = PATH.split('/');
		const DESIRED_COMPONENT = PATH_COMPONENTS.find((component) =>
			[support.BRANDED_URL.toLowerCase(), support.UNASSIGNED_URL.toLowerCase()].includes(
				component.toLowerCase()
			)
		);

		if (DESIRED_COMPONENT.toLowerCase() === support.BRANDED_URL.toLowerCase()) {
			this.urlq = support.BRANDED_URL_NAVI;
		} else {
			this.urlq = support.UNASSIGNED_URL_NAVI;
		}
	}

	handlePageRefresh() {
		let globalThis = window;
		globalThis.sessionStorage?.clear();

	}

	handleclose() {
		this.showDivSubmit = false;
		this.showDivDraft = false;
		this.isButtonDisabled = false;
		this.isSubmitButtonDisabled = false;
	}
	loadCaseRecords() {
		const promise = CASE_RECORDS_GET({ accountId: this.selectedItemId });

		// Manually resolve the promise
		promise.then(data => {
			if (data && data.length > 0) {
				this.caseRecord = data[0];
				this.caseMedicalId = data[0].Id;
				this.caseType = data[0].Type;
				this.description1 = data[0].Description;
				this.selectedOptionValues = data[0].BI_PSPB_Sub_Type__c;
				this.selectedOption = this.selectedOptionValues;
				this.description = this.description1;
				this.medStatus = data[0].Status;

				if (this.medStatus === support.NEED_MORE_INFO) {
					this.isReadOnly = true;
				}
				this.loadSavedImageUrls();
			}
		});

	}


	loadSavedImageUrls() {
	
		getSavedImageUrls({ caseId: this.caseMedicalId })
			.then(result => {
				if (Array.isArray(result) && result.length > 0) {
					this.InputOne = false;
					this.InputTwo = true;
	
					// Store image data with URLs, IDs, sizes, lengths, types, and filenames
					this.imageData = result;
	
					// Create URLs array for preview and handle file type
					this.imageUrls = this.imageData.map(item => {
						if (item.type.toLowerCase() === support.PDF_TYPE) {
							// Replace URL with static image URL for PDFs
							return support.PDF_IMG;
						}
						return item.url;
					});
	
					// Extract IDs, sizes, lengths, and filenames
					this.imageIds = this.imageData.map(item => item.id);
					this.sizeOfMb = this.imageData.map(item => item.size); // in MB
					this.sizeOfFiles = this.imageData.map(item => item.length);
					this.fileNames = this.imageData.map(item => item.filename); // New addition
	
					// Convert image URLs to data URLs
					const promises = this.imageUrls.map(url => this.convertToDataURL(url));
	
					Promise.all(promises)
						.then(dataUrls => {
							// Include file type information for preview purposes
							this.previewUrls = dataUrls.map((dataUrl, index) => ({
								dataUrl: dataUrl,
								isPdf: this.imageData[index].type.toLowerCase() === support.PDF_TYPE,
								// Show truncated filename for PDFs only
								fileName: this.imageData[index].type.toLowerCase() === support.PDF_TYPE 
									? this.truncateFileName(this.fileNames[index]) 
									: ''
							}));
						})
						.catch(error => {
							this.navigateToAnotherPage(error.message);
						});
	
				} 
			})
			.catch(error => {
				this.navigateToAnotherPage(error.message);
			});
	}
	
	// Helper method to truncate file name
	truncateFileName(fileName) {
		return fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName;
	}


	convertToDataURL(url) {
		return new Promise((resolve, reject) => {
			const globul = window;
			const siteName = globul.location.pathname.split('/')[1];
			const attachmentUrl = '/'+siteName + url;
			fetch(attachmentUrl)
			
			
				.then(response => response.blob())
				.then(blob => {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				})
				.catch(reject);
		});
	}

	getmedicalinformation(event) {
		this.medicalDataGet = event.target.value;
	}
	handleRadioChange(event) {
		this.selectedOption = event.target.value;
		this.subTypError = false;
		this.radioBtnColorChange = 'chnageradiobtn1'; // invoked in CSS file
	}
	handledescription(event) {
		this.description = event.target.value;
		if (this.description) {
			this.descriptionError = false;
			// Double quotes can't be avoided since it's invoked from CSS
			this.Description();
			this.descriptionLengthError = false;
			if (typeof window !== 'undefined') {
				const errorEvent = new CustomEvent('descriptionerror', {
					detail: { error: this.descriptionError }
				});
				this.dispatchEvent(errorEvent);
			}
		}
		if (this.description && this.description.length > 1000) {
			this.descriptionError = false;
			// Double quotes can't be avoided since it's invoked from CSS
			this.descriptionErr();
			this.descriptionLengthError = true;
		}

		this.descriptionError = false;
	}
	Description() {
		this.template.querySelector("label[data-field='Description']").className =
			'input-error';
		this.classFive = 'desc';
	}
	DescriptionErr() {
		this.template.querySelector("label[data-field='Description']").className =
			'input-error-label';
		this.classFive = 'change';
	}
	handleUploadFinished(event) {
		const UPLOADED_FILES = event.detail.files;
		this.files = UPLOADED_FILES;

		this.fileNames = this.files.map((file) => {

			const MAX_LENGTH = 24; // Maximum length of displayed filename
			return file.name.length > MAX_LENGTH
				? file.name.substring(0, MAX_LENGTH) + '...'
				: file.name;
		});

		this.showFileNames = true;
		this.browserName = false;
	}
	handleInsertUpdate(event) {
		let globalThis = window;
		this.caseType = event.currentTarget.dataset.value;
		const FILE_IDS = this.files.map((file) => file.documentId);

		const PARAMETERS = {
			accountId: this.accName,
			type: this.caseType,
			subType: this.selectedOption,
			description: this.description
		};

		if (!this.validateInputs()) {
			return;
		}


		if (this.caseMedicalId === null) {
			this.insertCase(PARAMETERS, FILE_IDS, globalThis);
		} else {
			this.updateCase(PARAMETERS, FILE_IDS, globalThis);
		}
	}

	validateInputs() {
		const validationType = this.getValidationType();
		const MAX_LENGTH = 1000;
		let isValid = true;

		// Check if the description exceeds the maximum length
		if (this.description.length > MAX_LENGTH) {
			this.handleDescriptionLengthError();
			isValid = false;
		}

		// Check for missing option and description
		if (validationType === support.OPTION_AND_DESC) {
			this.handleMissingOptionAndDescription();
			isValid = false;
		}

		// Check for missing description only
		if (validationType === support.MISS_DESCRIPTION) {
			this.handleMissingDescription();
			isValid = false;
		}

		// Check for missing option only
		if (validationType === support.MISS_OPTION) {
			this.handleMissingOption();
			isValid = false;
		}
		if (typeof window !== 'undefined') {
			const errorEvent = new CustomEvent('descriptionerror', {
				detail: { error: this.descriptionError }
			});
			this.dispatchEvent(errorEvent);
		}

		// Return the final validation result
		return isValid;
	}






	getValidationType() {
		if (!this.selectedOption && !this.description) {
			return support.OPTION_AND_DESC;
		} else if (this.selectedOption && !this.description) {
			return support.MISS_DESCRIPTION;
		} else if (!this.selectedOption && this.description) {
			return support.MISS_OPTION;
		}
		return support.VALID;
	}

	handleMissingOptionAndDescription() {
		this.changeRadioBtnColor();
		this.descriptionLengthError = false;
		this.descriptionError = true;
		this.DescriptionErr();
		this.faultValue = true;
	}

	handleMissingDescription() {
		this.DescriptionErr();
		this.descriptionError = true;
		this.descriptionLengthError = false;
		this.faultValue = true;
	}

	handleMissingOption() {
		this.changeRadioBtnColor();
		this.descriptionError = false;

		this.faultValue = true;
	}

	handleDescriptionLengthError() {
		this.descriptionError = false;
		this.descriptionLengthError = true;
		this.DescriptionErr();
		this.faultValue = true;
	}
	navigateToAnotherPage(errorMessage) {
		let global = window;
		global.location?.assign(this.urlq + support.ERROR_PAGE);
		global.sessionStorage.setItem('errorMessage', errorMessage);
	}

	insertCase(PARAMETERS, FILE_IDS, globalThis) {
		try {
			this.isSubmitButtonDisabled = true;
			this.isButtonDisabled = true;
			INSERT_UPDATE_LEAD_CONSENT({ wrapper: PARAMETERS, fileIds: FILE_IDS })
				.then(result => {
					saveFilesToCase({ fileUploads: this.fileUploads, caseId: result })
						.then(() => {
							// Handle success
							this.showDivSubmit = true;
							this.showDivDraft = false;
							globalThis?.scrollTo({ top: 0, behavior: 'smooth' });
							this.makeEmptyField();
							this.casePopup = true;
							this.maximumLimit = false;
							this.isLimitReached = false;
							this.InputOne = true;
							this.InputTwo = false;
							this.fileUploads = [];  // Clear fileUploads array
							this.previewUrls = '';  // Clear preview URLs


							if (typeof window !== 'undefined') {
								const errorEvent = new CustomEvent('casepopup', {
									detail: { error: this.casePopup }
								});
								this.dispatchEvent(errorEvent);

								this.dispatchEvent(new CustomEvent('filesuploaded', {
									detail: { caseId: result },
								}));
							}
						})
						.catch(error => {
							this.navigateToAnotherPage(error.body.message);
						});
					// Handle successful operation

				})

		} catch (error) {
			this.navigateToAnotherPage(support.CASE_NOT_INSERT, error.message);
		}
	}

	updateCase(PARAMETERS, FILE_IDS, globalThis) {
		try {
			UPDATE_CASE({
				recId: this.caseMedicalId,
				//type: this.caseType,
				type: this.selectedOption,
				description: this.description,
				fileIds: FILE_IDS
			})
				.then(result => {
					saveFilesToCase({ fileUploads: this.fileUploads, caseId: result })
						.then(() => {
							// Handle success
							this.showDivSubmit = true;
							this.showDivDraft = false;
							globalThis?.scrollTo({ top: 0, behavior: 'smooth' });
							this.makeEmptyField();
							this.isReadOnly = false;
							this.casePopup = true;
							this.maximumLimit = false;
							this.isLimitReached = false;
							this.InputOne = true;
							this.InputTwo = false;
							this.fileUploads = [];  // Clear fileUploads array
							this.previewUrls = '';  // Clear preview URLs

						})
						.catch(error => {
							this.navigateToAnotherPage(error.body.message);
						});
					// Handle successful operation

				})

		} catch (error) {
			this.navigateToAnotherPage(support.CASE_NOT_UPDATE, error.message);
		}
	}

	handleInsertDraft(event) {

		this.caseType = event.currentTarget.dataset.value;

		const FILE_IDS = this.files.map((file) => file.documentId);
		const PARAMETERS = this.createParameters();


		if (!this.validateInputs()) {
			return;
		}
		if (this.caseMedicalId === null) {
			this.insertDraftCase(PARAMETERS, FILE_IDS);
		} else {
			this.updateDraftCase(PARAMETERS, FILE_IDS);
		}
	}

	createParameters() {
		return {
			accountId: this.accName,
			type: this.caseType,
			subType: this.selectedOption,
			description: this.description
		};
	}


	insertDraftCase(PARAMETERS, FILE_IDS) {

		let globalThis = window;
		const button = this.template.querySelector('.button2');
		this.dataValue = button.getAttribute('data-value');
		this.callfunction();
		try {
			this.isButtonDisabled = true;
			CASE_DRAFT({ wrapper: PARAMETERS, fileIds: FILE_IDS })
				.then(result => {
					saveFilesToCase({ fileUploads: this.fileUploads, caseId: result })
						.then(() => {
							this.showDivDraft = true;
							this.showDivSubmit = false;
							globalThis?.scrollTo({ top: 0, behavior: 'smooth' });
							this.errorMessage = '';
							this.classFive = 'desc';
							this.makeEmptyField();
							this.loadCaseRecords();
							this.draftPopup = true;
							this.maximumLimit = false;
							this.isLimitReached = false;
							this.InputOne = true;
							this.InputTwo = false;
							this.fileUploads = [];  // Clear fileUploads array
							this.previewUrls = [];  // Clear preview URLs


							if (typeof window !== 'undefined') {
								this.dispatchEvent(new CustomEvent('filesuploaded', {
									detail: { caseId: result },
								}));
							}
						})
						.catch(error => {
							this.navigateToAnotherPage(error.body.message);
						});
					// Handle successful operation

				})

		} catch (error) {
			this.navigateToAnotherPage(support.DRAFT_NOT_INSERT, error.message);
		}
	}

	updateDraftCase(PARAMETERS, FILE_IDS) {
		let globalThis = window;

		try {
			UPDATE_DRAFT({
				recId: this.caseMedicalId,
				// type: this.caseType,
				type: this.selectedOption,
				description: this.description,
				fileIds: FILE_IDS
			})
				.then(result => {
					saveFilesToCase({ fileUploads: this.fileUploads, caseId: result })
						.then(() => {
							// Handle success
							this.showDivDraft = true;
							this.showDivSubmit = false;
							globalThis?.scrollTo({ top: 0, behavior: 'smooth' });
							this.makeEmptyField();
							this.isReadOnly = false;
							this.draftPopup = true;
							this.maximumLimit = false;
							this.isLimitReached = false;
							this.InputOne = true;
							this.InputTwo = false;
							this.fileUploads = [];  // Clear fileUploads array
							this.previewUrls = '';  // Clear preview URLs

						})
						.catch(error => {
							this.navigateToAnotherPage(error.body.message);
						});
					// Handle successful operation

				})
		} catch (error) {
			this.navigateToAnotherPage(support.DRAFT_NOT_UPDATE, error.message);
		}
		this.callfunction();
	}



	makeEmptyField() {
		this.descriptionLengthError = false;
		this.caseType = '';
		this.selectedOption = '';
		this.description = '';
		this.fileNames = '';
		this.browserName = true;
	}
	changeRadioBtnColor() {
		this.radioBtnColorChange = 'chnageradiobtn';
		this.subTypError = true;
	}
	callfunction() {
		if (this.showDivDraft === true || this.dataValue) {
			this.isSubmitButtonDisabled = true;
		}
		else {
			this.isSubmitButtonDisabled = false;
		}
	}
	handleBack() {
		let globalThis = window;
		globalThis.location?.assign(this.urlq + support.SUPPORT_PAGE_URL);
	}

}