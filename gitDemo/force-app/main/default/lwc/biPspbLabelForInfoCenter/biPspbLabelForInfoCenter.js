import { LightningElement } from 'lwc';
import BRANDED_URL from '@salesforce/label/c.BI_PSPB_SiteLabel';
import UNASSIGNED_URL from '@salesforce/label/c.BI_PSPB_UnAssignedLabel';
import WHAT_GPP_LABEL from '@salesforce/label/c.BI_PSP_WhatGppLabel';
import FACTS_GPP_LABEL from '@salesforce/label/c.BI_PSP_FactsGppLabel';
import RARE_GPP_LABEL from '@salesforce/label/c.BI_PSP_RareGppLabel';
import WHY_DO_I_HAVE_GPP_LABEL from '@salesforce/label/c.BI_PSP_WhyDoIHaveGppLabel';
import DIAGNOSIS_GPP_LABEL from '@salesforce/label/c.BI_PSP_DiagnosisGppLabel';
import GPP_CONTAGIOUS_LABEL from '@salesforce/label/c.BI_PSP_GppContagiousLabel';
import FRIENDS_FAMILY_LABEL from '@salesforce/label/c.BI_PSP_FriendsFamilyLabel';
import FEELING_EXCLUDED_LABEL from '@salesforce/label/c.BI_PSP_FeelingExcludedLabel';
import GPP_INTIMACY_LABEL from '@salesforce/label/c.BI_PSP_GppIntimacyLabel';
import GPP_PREGNANCY_LABEL from '@salesforce/label/c.BI_PSP_GppPregnancyLabel';
import MANAGE_FLARE_LABEL from '@salesforce/label/c.BI_PSP_ManageFlareLabel';
import GPP_COMORBIDITIES_LABEL from '@salesforce/label/c.BI_PSP_GppComorbiditiesLabel';
import MANAGE_GPP_SYMPTOMS_LABEL from '@salesforce/label/c.BI_PSP_ManageGppSymptomsLabel';
import ASK_DOCTOR_LABEL from '@salesforce/label/c.BI_PSP_AskDoctorLabel';
import SEEK_MEDICARE_LABEL from '@salesforce/label/c.BI_PSP_SeekMediCareLabel';
import SEEK_EMERGENCY_LABEL from '@salesforce/label/c.BI_PSP_SeekEmergencyLabel';
import MANAGE_SCARS_LABEL from '@salesforce/label/c.BI_PSP_ManageScarsLabel';
import COMPLICAT_GPP_LABEL from '@salesforce/label/c.BI_PSP_ComplicatGppLabel';
import RECOGNIZING_FLARES_LABEL from '@salesforce/label/c.BI_PSP_RecognizingFlaresLabel';
import VISIT_DOCTOR_LABEL from '@salesforce/label/c.BI_PSP_VisitDoctorLabel';
import DERMATOLOGIST_LABEL from '@salesforce/label/c.BI_PSP_DermatologistLabel';
import TALK_GPP_LABEL from '@salesforce/label/c.BI_PSP_TalkGppLabel';
import NOT_ALONE_LABEL from '@salesforce/label/c.BI_PSP_NotAloneLabel';
import POSITIVE_CHOICES_LABEL from '@salesforce/label/c.BI_PSP_PositiveChoicesLabel';
import TREATING_GPP_LABEL from '@salesforce/label/c.BI_PSPB_TreatingGppLabel';
import SPEVIGO_INFUSION_LABEL from '@salesforce/label/c.BI_PSPB_SpevigoInfusionLabel';
import PREVENTION_GPP_LABEL from '@salesforce/label/c.BI_PSPB_PreventionGppLabel';
import SPEVIGO_INJECTION_LABEL from '@salesforce/label/c.BI_PSPB_SpevigoInjectionLabel';
import WORK_IN_GPP_LABEL from '@salesforce/label/c.BI_PSPB_WorkInGppLabel';
import CHRONIC_STATUS from '@salesforce/label/c.BI_PSPB_ChronicStatus';
import CHRONIC_CATEGORY from '@salesforce/label/c.BI_PSPB_ChronicCategory';
import ACUTE_CATEGORY from '@salesforce/label/c.BI_PSPB_AcuteCategory';
import CHANNEL_NAME from '@salesforce/label/c.BI_PSP_ChannelName';
import ACUTE_STATUS from '@salesforce/label/c.BI_PSPB_Acute';
import ARTICLE_STRING from '@salesforce/label/c.BI_PSPB_ArticleString';
import FLARE_TREATMENT_CATEGORY from '@salesforce/label/c.BI_PSPB_FlareTreatmentCategory';
import FLARE_PREVENTION_CATEGORY from '@salesforce/label/c.BI_PSPB_FlarePreventionCategory';
import WHAT_IS_GPP_LABEL from '@salesforce/label/c.BI_PSP_WhatIsGppLabel';
import GPP_HEALTH_LABEL from '@salesforce/label/c.BI_PSP_GppHealthLabel';
import TALK_HCP_LABEL from '@salesforce/label/c.BI_PSP_TalkHcpLabel';
import MANAGE_GPP_LABEL from '@salesforce/label/c.BI_PSP_ManageGppLabel';
import FLARES_LABEL from '@salesforce/label/c.BI_PSP_FlaresLabel';
import ERROR_VARIANT from '@salesforce/label/c.BI_PSP_ErrorVariantToast';
import ERROR_MESSAGE from '@salesforce/label/c.BI_PSP_ConsoleError';
import UNASSIGNED_STATUS from '@salesforce/label/c.BI_PSP_Unassigned';
import BRANDED_SITE_URL from '@salesforce/label/c.BI_PSPB_BrandedSiteNaviUrl';
import UNASSIGNED_SITE_URL from '@salesforce/label/c.BI_PSPB_UnAssignedNaviUrl';
import DETAIL_PAGE from '@salesforce/label/c.BI_PSPB_InfoCenterDetailUrl';
import WHAT_GPP_MINS from '@salesforce/label/c.BI_PSP_WhatGppReadTime';
import FACTS_GPP_MINS from '@salesforce/label/c.BI_PSP_FactsGppReadTime';
import RARE_GPP_MINS from '@salesforce/label/c.BI_PSP_RareGppReadTime';
import WHY_DO_I_HAVE_GPP_MINS from '@salesforce/label/c.BI_PSP_WhyDoIHaveGppReadTime';
import DIAGNOSIS_GPP_MINS from '@salesforce/label/c.BI_PSP_DiagnosisGppReadTime';
import GPP_CONTAGIOUS_MINS from '@salesforce/label/c.BI_PSP_GppContagiousReadTime';
import FRIENDS_FAMILY_MINS from '@salesforce/label/c.BI_PSP_FriendsFamilyReadTime';
import FEELING_EXCLUDED_MINS from '@salesforce/label/c.BI_PSP_FeelingExcludedReadTime';
import GPP_INTIMACY_MINS from '@salesforce/label/c.BI_PSP_GppIntimacyReadTime';
import GPP_PREGNANCY_MINS from '@salesforce/label/c.BI_PSP_GppPregnancyReadTime';
import MANAGE_FLARE_MINS from '@salesforce/label/c.BI_PSP_ManageFlareReadTime';
import GPP_COMORBIDITIES_MINS from '@salesforce/label/c.BI_PSP_GppComorbiditiesReadTime';
import MANAGE_GPP_SYMPTOMS_MINS from '@salesforce/label/c.BI_PSP_ManageGppSymptomsReadTime';
import ASK_DOCTOR_MINS from '@salesforce/label/c.BI_PSP_AskDoctorReadTime';
import SEEK_MEDICARE_MINS from '@salesforce/label/c.BI_PSP_SeekMediCareReadTime';
import SEEK_EMERGENCY_MINS from '@salesforce/label/c.BI_PSP_SeekEmergencyReadTime';
import MANAGE_SCARS_MINS from '@salesforce/label/c.BI_PSP_ManageScarsReadTime';
import COMPLICAT_GPP_MINS from '@salesforce/label/c.BI_PSP_ComplicatGppReadTime';
import RECOGNIZING_FLARES_MINS from '@salesforce/label/c.BI_PSP_RecognizingFlaresReadTime';
import VISIT_DOCTOR_MINS from '@salesforce/label/c.BI_PSP_VisitDoctorReadTime';
import DERMATOLOGIST_MINS from '@salesforce/label/c.BI_PSP_DermatologistReadTime';
import TALK_GPP_MINS from '@salesforce/label/c.BI_PSP_TalkGppReadTime';
import NOT_ALONE_MINS from '@salesforce/label/c.BI_PSP_NotAloneReadTime';
import POSITIVE_CHOICES_MINS from '@salesforce/label/c.BI_PSP_PositiveChoicesReadTime';
import TREATING_GPP_MINS from '@salesforce/label/c.BI_PSPB_TreatingGppReadTime';
import SPEVIGO_INFUSION_MINS from '@salesforce/label/c.BI_PSPB_SpevigoInfusionReadTime';
import PREVENTION_GPP_MINS from '@salesforce/label/c.BI_PSPB_PreventionGppReadTime';
import SPEVIGO_INJECTION_MINS from '@salesforce/label/c.BI_PSPB_SpevigoInjectionReadTime';
import WORK_IN_GPP_MINS from '@salesforce/label/c.BI_PSPB_WorkInGppReadTime';
import VIEW_LABEL from '@salesforce/label/c.BI_PSPB_View';
import ENTER_EVENT from '@salesforce/label/c.BI_PSP_EventEnter';
import CATEGORY_PAGE from '@salesforce/label/c.BI_PSPB_InfoCenterCategoryUrl';
import CHRONIC_VIDEO_PAGE from '@salesforce/label/c.BI_PSPB_ChronicVideoUrl';
import ACUTE_VIDEO_PAGE from '@salesforce/label/c.BI_PSPB_AcuteVideoPage';
import SEARCH_PAGE from '@salesforce/label/c.BI_PSPB_InfoCenterSearchUrl';
import FLARE_TREATMENT_LABEL from '@salesforce/label/c.BI_PSPB_FlareTreatmentLabel';
import FLARE_PREVENTION_LABEL from '@salesforce/label/c.BI_PSPB_FlarePreventionLabel';
import WHAT_IS_GPP_CATEGORY from '@salesforce/label/c.BI_PSP_WhatIsGppCategory';
import MANAGE_GPP_CATEGORY from '@salesforce/label/c.BI_PSP_ManageGppCategory';
import TALK_HCP_CATEGORY from '@salesforce/label/c.BI_PSP_TalkHcpCategory';
import GPP_HEALTH_CATEGORY from '@salesforce/label/c.BI_PSP_GppHealthCategory';
import INTRODUCTION_CATEGORY from '@salesforce/label/c.BI_PSP_IntroductionLabel';
import FLARES_CATEGORY from '@salesforce/label/c.BI_PSP_FlaresCategory';
import COMPLETE_STATUS from '@salesforce/label/c.BI_PSP_Complete';
import NO_SEARCH_RESULTS from '@salesforce/label/c.BI_PSP_SearchNoResults';
import JUST_FOR_ME_CATEGORY from '@salesforce/label/c.BI_PSP_JustForMeCategory';
import LANDING_PAGE from '@salesforce/label/c.BI_PSPB_InfoCenterLandingUrl';
import SPEVIGO_CATEGORY from '@salesforce/label/c.BI_PSPB_SpevigoCategory';
import GEN_CATEGORY from '@salesforce/label/c.BI_PSP_GenMessageCategory';
import SOCIAL_LIFE_CATEGORY from '@salesforce/label/c.BI_PSP_SocialLifeCategory';
import MANAGEMENT_CATEGORY from '@salesforce/label/c.BI_PSP_ManagementCategory';
import MENTAL_HEALTH_CATEGORY from '@salesforce/label/c.BI_PSP_MentalHealthCategory';
import HEALTHY_LIFE_CATEGORY from '@salesforce/label/c.BI_PSPB_HealthyLifeCategory';
import GPP_FLARE from '@salesforce/label/c.BI_PSPB_GppFlare';
import GPP_TAG from '@salesforce/label/c.BI_PSPB_GppTag';
import WHAT_COMORBIDITIES from '@salesforce/label/c.BI_PSPB_WhatComorbidities';
import GPP_TREATMENT from '@salesforce/label/c.BI_PSPB_GppTreatment';
import GPP_FLARE_PREVENTION from '@salesforce/label/c.BI_PSPB_GppFlarePrevention';
import SPEV_ACTION_DOSE from '@salesforce/label/c.BI_PSPB_SpevActionDose';
import PATIENT_INJECTION from '@salesforce/label/c.BI_PSPB_PatientInjection';
import PATIENT_INFUSION from '@salesforce/label/c.BI_PSPB_PatientInfusion';
import PREVENTION_INJECT from '@salesforce/label/c.BI_PSPB_PreventionInject';
import GPP_FLARE_SPEVINFU from '@salesforce/label/c.BI_PSPB_GppFlareInfusion';
import SPEVIGO_INFUSION from '@salesforce/label/c.BI_PSPB_SpevigoInfusion';
import GPP_SYMPTOMS from '@salesforce/label/c.BI_PSPB_GppSymptoms';
import GPP_FLARE_TREATMENT from '@salesforce/label/c.BI_PSPB_GppFlareTreatment';
import HEALTH_CENTER from '@salesforce/label/c.BI_PSP_HealthCenter';
import INTRAVENOUS from '@salesforce/label/c.BI_PSPB_Intravenous';
import EFISAYIL_TWO from '@salesforce/label/c.BI_PSPB_EffisayilTwo';
import SUBCUTANEOUS from '@salesforce/label/c.BI_PSPB_Subcutaneous';
import SELF_INJECTION from '@salesforce/label/c.BI_PSPB_SelfInjection';
import IL36 from '@salesforce/label/c.BI_PSPB_IlThirtySix';
import BLOCKING from '@salesforce/label/c.BI_PSPB_Blocking';
import ACTION from '@salesforce/label/c.BI_PSPB_Action';
import MECHANISM from '@salesforce/label/c.BI_PSPB_Mechanism';
import SPEVIGO_INJECTION from '@salesforce/label/c.BI_PSPB_SpevigoInjection';
import INFUSION from '@salesforce/label/c.BI_PSPB_Infusion';
import GPP_CONTAGIOUS from '@salesforce/label/c.BI_PSPB_GppContagious';
import GPP_SPREAD from '@salesforce/label/c.BI_PSPB_GppSpreadLabel';
import EXPLANING_GPP_LABEL from '@salesforce/label/c.BI_PSPB_ExplaningGppLabel';
import GPP_INTIMACY from '@salesforce/label/c.BI_PSP_GppIntimacy';
import GPP_DISCOMFORT from '@salesforce/label/c.BI_PSPB_GppDiscomfortLabel';
import GPP_COMORBIDITIES from '@salesforce/label/c.BI_PSPB_GppComorbiditiesLabel';
import COMORBIDITIES from '@salesforce/label/c.BI_PSPB_Comorbidities';
import LETTING_HCP from '@salesforce/label/c.BI_PSPB_LettingHcpLabel';
import CHECKLIST from '@salesforce/label/c.BI_PSP_Checklist';
import PREPARING_ADVANCE from '@salesforce/label/c.BI_PSP_PreparingAdvance';
import IMP_SIGNS from '@salesforce/label/c.BI_PSP_ImpSigns';
import EMERCARE from '@salesforce/label/c.BI_PSP_EmergencyCare';
import QS_ASK from '@salesforce/label/c.BI_PSP_QsAsk';
import TALKING_TO_HCP from '@salesforce/label/c.BI_PSP_TalkingToHcp';
import GPP_VISIT from '@salesforce/label/c.BI_PSP_GppVisit';
import SYMPTOM_LIST from '@salesforce/label/c.BI_PSP_SymptomList';
import GPP_TYPES from '@salesforce/label/c.BI_PSP_GppTypes';
import TREATMENT_HELP from '@salesforce/label/c.BI_PSP_TreatmentsHelp';
import SUPPORT_GPP from '@salesforce/label/c.BI_PSP_SupportGpp';
import MANAGE_GPP from '@salesforce/label/c.BI_PSP_ManageGpp';
import MANAGE_FLARES from '@salesforce/label/c.BI_PSP_Manageflares';
import MEDI_HELP from '@salesforce/label/c.BI_PSP_GetMediHelp';
import FLARES_CAUSES from '@salesforce/label/c.BI_PSP_FlaresAndCauses';
import EFFSAYIL_ONE from '@salesforce/label/c.BI_PSPB_EffsayilOne';
import GPP_QUES from '@salesforce/label/c.BI_PSP_GppQues';
import GPP_CARE from '@salesforce/label/c.BI_PSP_GppCare';
import GPP_PREG from '@salesforce/label/c.BI_PSP_GppPregnancy';
import TALK_PARTNER from '@salesforce/label/c.BI_PSP_TalkPartner';
import DISCOMFORT_STRING from '@salesforce/label/c.BI_PSP_Discomfort';
import INTIMACY_STR from '@salesforce/label/c.BI_PSP_IntimacyStr';
import PREGN_GPP from '@salesforce/label/c.BI_PSP_PregnancyGpp';
import HCP_INFO from '@salesforce/label/c.BI_PSP_HcpInfo';
import GPP_CHALLENGES from '@salesforce/label/c.BI_PSP_GppChallenges';
import GPP_DIAGNOSIS from '@salesforce/label/c.BI_PSP_GppDiagnosis';
import GPP_EXPERIENCES from '@salesforce/label/c.BI_PSP_GppExperiences';
import ACCEPTANCE_TREATMENT from '@salesforce/label/c.BI_PSP_AcceptanceTreatment';
import SCARPROCESS from '@salesforce/label/c.BI_PSP_Scarprocess';
import DEAL_STRING from '@salesforce/label/c.BI_PSP_DealString';
import SCAR_GPP from '@salesforce/label/c.BI_PSP_ScarGpp';
import PROTECT_GPP from '@salesforce/label/c.BI_PSP_ProtectGpp';
import GPP_COMPLICAT from '@salesforce/label/c.BI_PSP_GppComplicat';
import AVOID_COMPLICAT from '@salesforce/label/c.BI_PSP_AvoidComplicat';
import CHOICES_GPP from '@salesforce/label/c.BI_PSP_ChoicesGpp';
import GPP_EAT from '@salesforce/label/c.BI_PSP_GppEat';
import ACT_GPP from '@salesforce/label/c.BI_PSP_ActGpp';
import CHOICES from '@salesforce/label/c.BI_PSP_Choices';
import EATING from '@salesforce/label/c.BI_PSP_Eating';
import STIGMA from '@salesforce/label/c.BI_PSP_Stigma';
import CHALLENGES from '@salesforce/label/c.BI_PSP_ChallengesName';
import GETTING_SUPPORT from '@salesforce/label/c.BI_PSP_GettingSupport';
import DIAGNOSIS_METHOD from '@salesforce/label/c.BI_PSP_DiagnosisMethod';
import SHARE_EXPERI from '@salesforce/label/c.BI_PSP_ShareExperi';
import HOW_TO_TALK from '@salesforce/label/c.BI_PSP_HowToTalk';
import SHARING from '@salesforce/label/c.BI_PSP_Sharing';
import WHAT from '@salesforce/label/c.BI_PSP_What';
import WHY from '@salesforce/label/c.BI_PSP_Why';
import WHO_OF_GPP from '@salesforce/label/c.BI_PSP_WhoOfGpp';
import CAUSES_GPP from '@salesforce/label/c.BI_PSP_CausesGpp';
import CONTAGIOUSNESS from '@salesforce/label/c.BI_PSP_Contagiousness';
import EXPLAIN_TO_OTHERS from '@salesforce/label/c.BI_PSP_ExplainToOthers';
import FLARES from '@salesforce/label/c.BI_PSP_Flares';
import SYMPTOMS_TO_RECOGNIZE from '@salesforce/label/c.BI_PSP_SymptomsToRecognize';
import INCIDENCE from '@salesforce/label/c.BI_PSP_Incidence';
import MEAN_OF_RARE_GPP from '@salesforce/label/c.BI_PSP_MeanOfRareGpp';
import MEANING_OF_RARE from '@salesforce/label/c.BI_PSPB_MeaningOfRare';
import RARE_OF_GPP from '@salesforce/label/c.BI_PSP_RareOfGpp';
import PEOPLE_WITH_GPP from '@salesforce/label/c.BI_PSP_PeopleWithGpp';
import ACTIVITY_ETC from '@salesforce/label/c.BI_PSP_ActivityEtc';
import CARE from '@salesforce/label/c.BI_PSP_Care';
import TALK_GPP_TO_HCP from '@salesforce/label/c.BI_PSP_TalkGppToHcp';
import COLLEGUESETC from '@salesforce/label/c.BI_PSP_ColleguesExtra';
import HOW_TO from '@salesforce/label/c.BI_PSP_HowTo';
import ITS_TRIGGERS from '@salesforce/label/c.BI_PSP_ItsTriggers';
import GPP_CAUSES from '@salesforce/label/c.BI_PSP_GppCauses';
import TRIGGERS_FOR_GPP from '@salesforce/label/c.BI_PSP_TriggersForGpp';
import GPP_FEELINGS from '@salesforce/label/c.BI_PSP_GppFeelings';
import MANAGING_GPP from '@salesforce/label/c.BI_PSP_ManaginingGpp';
import TIPS_ON_GPP from '@salesforce/label/c.BI_PSP_TipsOnGpp';
import LIVING_WITH_GPP from '@salesforce/label/c.BI_PSP_LivingWithGpp';
import TIPS from '@salesforce/label/c.BI_PSP_Tips';
import MANAGE_FEELING_LABEL from '@salesforce/label/c.BI_PSPB_ManageFeelingsLabel';
import LIKE_ERROR from '@salesforce/label/c.BI_PSPB_LikeErrorMessage';
import DISLIKE_LABEL from '@salesforce/label/c.BI_PSP_Dislike';
import LIKE_LABEL from '@salesforce/label/c.BI_PSP_Like';
import REFERENCES from '@salesforce/label/c.BI_PSP_References';
import TAGS_LABEL from '@salesforce/label/c.BI_PSP_Tags';
import ERROR_PAGE from '@salesforce/label/c.BI_PSP_DisplayErrorPage';
import SPEVIGO_ARTICLES from '@salesforce/label/c.BI_PSPB_SpevigoArticles';
import PATIENT_TREATMENT_VIDEOS from '@salesforce/label/c.BI_PSPB_PatientTreatmentVideo';
import ARTICLES from '@salesforce/label/c.BI_PSPB_Articles';
import ARTICLE_CATEGORIES from '@salesforce/label/c.BI_PSPB_ArticleCategories';
import ARTICLE_LIKE_QUESTION from '@salesforce/label/c.BI_PSPB_ArticleLikeQuestion';
import ARTICLE_SEARCH_AVATAR_MESSAGE from '@salesforce/label/c.BI_PSPB_ArticleSearchAvatarMessage';
import INFO_CENTER_LANDING_MESSAGE from '@salesforce/label/c.BI_PSPB_InfoCenterLandMessage';
import INFO_CENTER_LANDING_DETAIL_MESSAGE from '@salesforce/label/c.BI_PSPB_InfoCenterLandDetailMessage';
import MINUTES from '@salesforce/label/c.BI_PSP_MinutesForChatter';
import PREVEIOUS from '@salesforce/label/c.BI_PSPB_Previous';
import NEXT from '@salesforce/label/c.BI_PSP_NextButton';
import LOAD_MORE from '@salesforce/label/c.BI_PSP_LoadMoreLabel';
import RECENT_ARTICLES from '@salesforce/label/c.BI_PSP_RecentArticles';
import VISUAL_LEARNING from '@salesforce/label/c.BI_PSPB_VisualLearningLabel';
import WATCH_LEARN from '@salesforce/label/c.BI_PSPB_WatchLearn';
import VIDEO_LANDING_MSG from '@salesforce/label/c.BI_PSPB_VideoLandingMsg';
import ACUTE_VIDEO_LANDING_MSG from '@salesforce/label/c.BI_PSPB_AcuteVideoLandingMsg';
import WATCH_VIDEO from '@salesforce/label/c.BI_PSPB_WatchVideoLabel';
import RELATED_ARTICLES from '@salesforce/label/c.BI_PSP_RelatedArticles';
import ARTICLES_FOR_YOU from '@salesforce/label/c.BI_PSP_ArticleForYouLabel';
import VISIT_INFORMATION_CENTER from '@salesforce/label/c.BI_PSP_VisitInformationCenterLabel';


import SYMPTOM_SEARCH from '@salesforce/label/c.BI_PSPB_Symptoms';
import TRIGGERS from '@salesforce/label/c.BI_PSP_Triggers';
import TRIGGER from '@salesforce/label/c.BI_PSP_Trigger';
import SYMPTOM from '@salesforce/label/c.BI_PSP_SymptomLabel';
import FLARE from '@salesforce/label/c.BI_PSP_Flare';
import STRESS from '@salesforce/label/c.BI_PSP_Stress';
import PUSTULES from '@salesforce/label/c.BI_PSP_Pustules';
import SKIN_REDNESS from '@salesforce/label/c.BI_PSP_SkinRedness';
import FEVER from '@salesforce/label/c.BI_PSP_Fever';
import JOINT_PAIN from '@salesforce/label/c.BI_PSP_JointPain';
import FATIGUE from '@salesforce/label/c.BI_PSP_Fatique';
import PREGNANCY_SEARCH from '@salesforce/label/c.BI_PSP_Pregnancy';
import INFECTION from '@salesforce/label/c.BI_PSP_Infection';
import SUNLIGHT from '@salesforce/label/c.BI_PSP_Sunlight';
import SMOKING from '@salesforce/label/c.BI_PSP_Smoking';
import INFLAMMATION from '@salesforce/label/c.BI_PSP_Inflammation';
import FACTS from '@salesforce/label/c.BI_PSP_Facts';
import CAUSES from '@salesforce/label/c.BI_PSP_Causes';
import CHRONIC_CONDITION from '@salesforce/label/c.BI_PSP_ChronicCondition';
import RELAPSING_CONDITION from '@salesforce/label/c.BI_PSP_RelapsingCondition';
import RARE_DISEASE from '@salesforce/label/c.BI_PSP_RareDisease';
import CONTAGIOUS from '@salesforce/label/c.BI_PSP_Contagious';
import PLAQUES from '@salesforce/label/c.BI_PSP_Plaques';
import PSORIASIS from '@salesforce/label/c.BI_PSP_PsoriasisLabels';
import TREATMENT_OPTIONS from '@salesforce/label/c.BI_PSP_TreatmentOptions';
import SPREAD from '@salesforce/label/c.BI_PSP_Spread';
import RELATIONSHIPS from '@salesforce/label/c.BI_PSP_Relationships';
import RELATIONSHIP from '@salesforce/label/c.BI_PSP_Relationship';
import SEX from '@salesforce/label/c.BI_PSP_Sex';
import SEXUAL from '@salesforce/label/c.BI_PSP_Sexual';
import PUS from '@salesforce/label/c.BI_PSP_Pus';
import SCARRING from '@salesforce/label/c.BI_PSP_Scarring';
import SKIN_AND_GPP from '@salesforce/label/c.BI_PSP_SkinAndGPP';
import MANAGE from '@salesforce/label/c.BI_PSP_Manage';
import HYPERPIGMENTATION from '@salesforce/label/c.BI_PSP_Hyperpigmentation';
import PIGMENTATION from '@salesforce/label/c.BI_PSP_Pigmentation';
import PIGMENT from '@salesforce/label/c.BI_PSP_Pigment';
import ITCHING from '@salesforce/label/c.BI_PSPB_Itching';
import SUNSCREEN from '@salesforce/label/c.BI_PSP_Sunscreen';
import CLOTHING from '@salesforce/label/c.BI_PSP_Clothing';
import CLOTHES from '@salesforce/label/c.BI_PSP_Clothes';
import SUN_EXPOSURE from '@salesforce/label/c.BI_PSP_SunExposureLabel';
import SUN from '@salesforce/label/c.BI_PSP_Sun';
import COMPLICATIONS from '@salesforce/label/c.BI_PSP_Complications';
import MOTHER from '@salesforce/label/c.BI_PSP_Mother';
import PREGNANCYGPP from '@salesforce/label/c.BI_PSP_PregnancyGPPLabel';
import HEART from '@salesforce/label/c.BI_PSP_chatterHeart';
import KIDNEY from '@salesforce/label/c.BI_PSP_kidney';
import INFECTIONS from '@salesforce/label/c.BI_PSP_infections';
import REDNESS from '@salesforce/label/c.BI_PSP_Redness';
import SKIN_PAIN from '@salesforce/label/c.BI_PSP_SkinPain';
import PAIN from '@salesforce/label/c.BI_PSP_Pain';
import CHILLS from '@salesforce/label/c.BI_PSP_Chills';
import TIREDNESS from '@salesforce/label/c.BI_PSP_Tiredness';
import TIRED from '@salesforce/label/c.BI_PSP_Tired';
import SICK from '@salesforce/label/c.BI_PSP_Sick';
import WEAKNESS from '@salesforce/label/c.BI_PSP_Weakness';
import WEAK from '@salesforce/label/c.BI_PSP_Weak';
import JOINT from '@salesforce/label/c.BI_PSP_Joint';
import RARECONDITION from '@salesforce/label/c.BI_PSP_Rarecondition';
import RARE from '@salesforce/label/c.BI_PSP_Rare';
import GENETICS from '@salesforce/label/c.BI_PSP_Genetics';
import IL_PATHWAY from '@salesforce/label/c.BI_PSP_IL_pathway';
import GENETIC from '@salesforce/label/c.BI_PSP_Genetic';
import IMMUNE_SYSTEM from '@salesforce/label/c.BI_PSP_ImmuneSystem';
import IMMUNE from '@salesforce/label/c.BI_PSP_Immune';
import SKIN_PRODUCTS from '@salesforce/label/c.BI_PSP_SkinProducts';
import STEROID from '@salesforce/label/c.BI_PSP_Steroid';
import TALKGPP from '@salesforce/label/c.BI_PSP_TalkGPP';
import SPEAKUP from '@salesforce/label/c.BI_PSP_SpeakUp';
import HCPCONNECT from '@salesforce/label/c.BI_PSP_HCPConnect';
import COMMUNICATION from '@salesforce/label/c.BI_PSP_Communication';
import COMMUNICATE from '@salesforce/label/c.BI_PSP_Communicate';
import SUPPORT from '@salesforce/label/c.BI_PSP_SupportTxt';
import UNDERSTANDING from '@salesforce/label/c.BI_PSP_Understanding';
import UNDERSTAND from '@salesforce/label/c.BI_PSP_Understand';
import HELP from '@salesforce/label/c.BI_PSP_Help';
import IMPROVE from '@salesforce/label/c.BI_PSP_improve';
import GET_BETTER from '@salesforce/label/c.BI_PSP_GetBetter';
import THERAPY from '@salesforce/label/c.BI_PSP_Therapy';
import DISCUSS from '@salesforce/label/c.BI_PSP_Discuss';
import TALK from '@salesforce/label/c.BI_PSP_Talk';
import CONNECT from '@salesforce/label/c.BI_PSP_Connect';
import HCP from '@salesforce/label/c.BI_PSP_HCP';
import FEELINGS_SEARCH from '@salesforce/label/c.BI_PSP_Feelings';
import ALONE from '@salesforce/label/c.BI_PSP_alone';
import LONELY from '@salesforce/label/c.BI_PSP_Lonely';
import LONELINESS from '@salesforce/label/c.BI_PSP_Loneliness';
import DAILY from '@salesforce/label/c.BI_PSP_Daily';
import SELF_CARE from '@salesforce/label/c.BI_PSP_SelfCare';
import SOCIAL from '@salesforce/label/c.BI_PSP_Social';
import EXPERIENCE from '@salesforce/label/c.BI_PSP_Experience';

import EXPLAIN from '@salesforce/label/c.BI_PSP_Explain';
import DEPRESSION from '@salesforce/label/c.BI_PSP_RbDepression';
import EMOTIONS from '@salesforce/label/c.BI_PSP_Emotions';
import EMOTIONAL from '@salesforce/label/c.BI_PSP_Emotional';
import GUIDE from '@salesforce/label/c.BI_PSP_Guide';
import GUIDANCE from '@salesforce/label/c.BI_PSP_Guidance';
import MORAL_SUPPORT from '@salesforce/label/c.BI_PSP_MoralSupport';
import COMPANION from '@salesforce/label/c.BI_PSP_Companion';
import FRIEND from '@salesforce/label/c.BI_PSP_NotificationFriend';
import FRIENDS from '@salesforce/label/c.BI_PSP_Friends';
import FAMILY from '@salesforce/label/c.BI_PSP_Family';
import TALKING from '@salesforce/label/c.BI_PSP_Talking';
import SPEAK from '@salesforce/label/c.BI_PSP_Speak';
import FEELING from '@salesforce/label/c.BI_PSP_Feeling';
import ENCOURAGE from '@salesforce/label/c.BI_PSP_Encourage';
import HONEST from '@salesforce/label/c.BI_PSP_Honest';
import PERSONAL from '@salesforce/label/c.BI_PSP_Personal';
import DIAGNOSIS from '@salesforce/label/c.BI_PSP_Diagnosis';
import SUPPORTGPP from '@salesforce/label/c.BI_PSP_SupportGPPLabel';
import TREATMENT_SEARCH from '@salesforce/label/c.BI_PSPB_Treatment';
import CHALLENGES_SEARCH from '@salesforce/label/c.BI_PSPB_Challenges';
import MISUNDERSTANDING from '@salesforce/label/c.BI_PSP_Misunderstanding';
import ISOLATED from '@salesforce/label/c.BI_PSP_Isolated';
import ISOLATION from '@salesforce/label/c.BI_PSP_Isolation';
import EXCLUDED from '@salesforce/label/c.BI_PSP_Excluded';
import MAKINGCHOICES from '@salesforce/label/c.BI_PSP_MakingChoices';
import STAYINGACTIVE from '@salesforce/label/c.BI_PSP_StayingActive';
import LIFESTYLE_CHANGES from '@salesforce/label/c.BI_PSP_LifestyleChanges';
import LIFESTYLE from '@salesforce/label/c.BI_PSP_Lifestyle';
import PREVENTION from '@salesforce/label/c.BI_PSP_Prevention';
import HEALTHY from '@salesforce/label/c.BI_PSP_Healthy';
import HEALTH from '@salesforce/label/c.BI_PSP_Health';
import SKINCARE_PRODUCTS from '@salesforce/label/c.BI_PSP_SkincareProducts';
import SKINCARE from '@salesforce/label/c.BI_PSP_Skincare';
import DIET from '@salesforce/label/c.BI_PSP_Diet';
import EXERCISE from '@salesforce/label/c.BI_PSP_Exercise';
import SUN_PROTECTION from '@salesforce/label/c.BI_PSP_SunProtection';
import PROTECTION from '@salesforce/label/c.BI_PSP_Protection';
import OBESITY from '@salesforce/label/c.BI_PSP_Obesity';
import BABY from '@salesforce/label/c.BI_PSP_Baby';
import DEVELOPMENT from '@salesforce/label/c.BI_PSP_Development';
import MOTHER_AND_BABY from '@salesforce/label/c.BI_PSP_MotherAndBaby';
import BALANCED_DIET from '@salesforce/label/c.BI_PSP_BalancedDiet';
import PREGNANT from '@salesforce/label/c.BI_PSP_Pregnant';
import PARTNER from '@salesforce/label/c.BI_PSP_Partner';   
import SEXUAL_HEALTH from '@salesforce/label/c.BI_PSP_SexualHealth';
import INTIMATE from '@salesforce/label/c.BI_PSP_intimate';
import SEXUAL_HEALTH_LABEL from '@salesforce/label/c.BI_PSP_sexualHealthLabel';
import PHYSICAL from '@salesforce/label/c.BI_PSP_Physical';
import PHYSICAL_DISCOMFORT from '@salesforce/label/c.BI_PSP_PhysicalDiscomfort';
import EMOTIONAL_IMPACT from '@salesforce/label/c.BI_PSP_EmotionalImpact';
import SELF_ESTEEM from '@salesforce/label/c.BI_PSP_RbSelfEsteem';
import SELF_ESTEEM_SEARCH from '@salesforce/label/c.BI_PSP_SelfEsteemLabel';
import GENITAL_AREA from '@salesforce/label/c.BI_PSP_GenitalArea';
import GENITALS from '@salesforce/label/c.BI_PSP_Genitals';
import GENITAL from '@salesforce/label/c.BI_PSP_Genital';

import MANAGING from '@salesforce/label/c.BI_PSP_Managing';
import TRACKING from '@salesforce/label/c.BI_PSP_Tracking';
import TRACK from '@salesforce/label/c.BI_PSP_Track';
import SYMPTOM_TRACKING from '@salesforce/label/c.BI_PSP_SymptomTracking';
import EMERGENCY from '@salesforce/label/c.BI_PSP_Emergency';
import MEDICAL_CARE from '@salesforce/label/c.BI_PSP_MedicalCare';
import SEVERE from '@salesforce/label/c.BI_PSP_RbSevere';
import COMORBIDITY from '@salesforce/label/c.BI_PSP_Comorbidity';
import DISEASE from '@salesforce/label/c.BI_PSP_Disease';
import DISEASE_MANAGEMENT from '@salesforce/label/c.BI_PSP_DiseaseManagement';
import MANAGE_DISEASE from '@salesforce/label/c.BI_PSP_ManageDisease';
import ANXIETY from '@salesforce/label/c.BI_PSP_Anxiety';
import ASTHMA from '@salesforce/label/c.BI_PSP_RbAsthma';
import CHRONIC_KIDNEY_DISEASE from '@salesforce/label/c.BI_PSP_ChronickidneyDisease';
import DIABETES from '@salesforce/label/c.BI_PSP_Diabetes';
import SINUS from '@salesforce/label/c.BI_PSP_Sinus';
import SINUS_INFECTION from '@salesforce/label/c.BI_PSP_SinusInfection';
import HIGH_BLOOD_PRESSURE from '@salesforce/label/c.BI_PSP_HighBloodPressure';
import BLOOD_PRESSURE from '@salesforce/label/c.BI_PSP_BloodPressure';
import BP from '@salesforce/label/c.BI_PSP_BP';
import HIGH_BP from '@salesforce/label/c.BI_PSP_HighBP';
import CHOLESTEROL from '@salesforce/label/c.BI_PSP_Cholesterol';
import HIGH_CHOLESTEROL from '@salesforce/label/c.BI_PSP_RbHighCholesterol';
import LUNGS from '@salesforce/label/c.BI_PSP_Lungs';
import LUNG from '@salesforce/label/c.BI_PSP_Lung';
import LUNG_DISEASES_OR_INFECTIONS from '@salesforce/label/c.BI_PSP_Lungdiseases';
import OSTEOPOROSIS  from '@salesforce/label/c.BI_PSP_Osteoporosis';
import PEPTIC_ULCERS from '@salesforce/label/c.BI_PSP_PepticUlcers';
import PSORIATIC_ARTHRITIS  from '@salesforce/label/c.BI_PSP_PsoriaticArthritis';
import ARTHRITIS from '@salesforce/label/c.BI_PSP_Arthritis';
import ULCERS from '@salesforce/label/c.BI_PSP_Ulcers';
import ULCER from '@salesforce/label/c.BI_PSP_UlcerLabel';
import EXTREME_TIREDNESS from '@salesforce/label/c.BI_PSP_ExtremeTiredness';
import RED_SKIN from '@salesforce/label/c.BI_PSP_RedSkin';
import TENDER_SKIN from '@salesforce/label/c.BI_PSP_TenderSkin';
import PAINFUL from '@salesforce/label/c.BI_PSPB_Painful';
import PAINFUL_PUSTULES from '@salesforce/label/c.BI_PSP_PainfulPustules';
import FLAKY from '@salesforce/label/c.BI_PSP_Flaky';
import SCALING_SKIN from '@salesforce/label/c.BI_PSP_ScalingSkin';
import DRYNESS from '@salesforce/label/c.BI_PSP_Dryness';
import BREATHING from '@salesforce/label/c.BI_PSP_Breathing';
import IL_THIRTYSIX_BLOCKER from '@salesforce/label/c.BI_PSPB_LThritySixBlocker';
import MOA from '@salesforce/label/c.BI_PSP_MOA';
import GPP_LABEL from '@salesforce/label/c.BI_PSP_GPPLabel';
import SKIN_INFLAMMATION from '@salesforce/label/c.BI_PSP_SkinInflammation';
import CHRONIC_PSORIASIS from '@salesforce/label/c.BI_PSP_ChronicPsoriasis';
import IMMUNE_SYSTEM_DISORDER from '@salesforce/label/c.BI_PSP_ImmuneSystemDisorders';
import SPEVIGO from '@salesforce/label/c.BI_PSP_Spevigo';
import SPESOLIMAB from '@salesforce/label/c.BI_PSP_Spesolimab';
import FDA_APPROVAL from '@salesforce/label/c.BI_PSP_FDAApproval';
import EMA_APPROVAL from '@salesforce/label/c.BI_PSP_EMAApproval';
import EMA from '@salesforce/label/c.BI_PSP_EMA';
import FDA from '@salesforce/label/c.BI_PSP_FDA';
import INTERLEUKIN_THIRTY_SIX from '@salesforce/label/c.BI_PSP_InterleukinThirtySix';
import SKIN_SYMPTOMS from '@salesforce/label/c.BI_PSP_SkinSymptoms';
import DISTRESS from '@salesforce/label/c.BI_PSP_Distress';
import EMOTIONAL_DISTRESS from '@salesforce/label/c.BI_PSP_EmotionalDistress';
import SCALING from '@salesforce/label/c.BI_PSP_Scaling';
import FLARE_SYMPTOMS from '@salesforce/label/c.BI_PSP_FlareSymptoms';
import FLARE_TRIGGERS from '@salesforce/label/c.BI_PSP_FlareTriggers';
import MEDICAL_SUPPORT from '@salesforce/label/c.BI_PSP_MedicalSupport';
import SKIN_CREAMS from '@salesforce/label/c.BI_PSP_SkinCreams';
import OINTMENTS from '@salesforce/label/c.BI_PSP_Ointments';
import LIGHT_THERAPY from '@salesforce/label/c.BI_PSP_LightTherapy';
import PILLS from '@salesforce/label/c.BI_PSP_Pills';
import INJECTABLE_DRUGS from '@salesforce/label/c.BI_PSP_InjectableDrugs';
import TREATMENT_PLAN from '@salesforce/label/c.BI_PSP_TreatmentPlan';
import ONGOING_RESEARCH from '@salesforce/label/c.BI_PSP_OngoingResearch';
import GPP_SPECIFIC_TREATMENTS from '@salesforce/label/c.BI_PSP_GPPSpecificTreatments';
import RESEARCH from '@salesforce/label/c.BI_PSP_Research';
import EVERYDAY_LIFE from '@salesforce/label/c.BI_PSP_EverydayLife';
import PHYSICAL_ACTIVITIES from '@salesforce/label/c.BI_PSP_PhysicalActivities';
import SOCIALIZATION from '@salesforce/label/c.BI_PSP_Socialization';
import QUALITY_OF_LIFE from '@salesforce/label/c.BI_PSP_QualityOfLife';
import QUALITY from '@salesforce/label/c.BI_PSP_Quality';
import EVERYDAY from '@salesforce/label/c.BI_PSP_Everyday';
import SYMPTOM_TRACKER from '@salesforce/label/c.BI_PSP_symptomtracker';
import MEDICAL_APPOINTMENTS from '@salesforce/label/c.BI_PSP_MedicalAppointments';
import PREPARATION from '@salesforce/label/c.BI_PSP_Preparation';
import STRESS_LEVEL from '@salesforce/label/c.BI_PSP_StressLevel';
import PHYSICAL_SYMPTOMS from '@salesforce/label/c.BI_PSP_PhysicalSymptoms';
import MENTAL_SYMPTOMS from '@salesforce/label/c.BI_PSP_MentalSymptoms';
import MENTAL from '@salesforce/label/c.BI_PSP_Mental';
import BODY_PARTS_AFFECTED from '@salesforce/label/c.BI_PSP_BodyPartsAffected';
import AFFECTED_BODY_PARTS from '@salesforce/label/c.BI_PSP_AffectedBodyParts';
import AFFECTED from '@salesforce/label/c.BI_PSP_Affected';
import SYMPTOM_DURATION from '@salesforce/label/c.BI_PSP_SymptomDuration';
import SEVERITY from '@salesforce/label/c.BI_PSP_Severity';
import FOOD from '@salesforce/label/c.BI_PSP_Food';
import MEDICATIONS from '@salesforce/label/c.BI_PSP_Medications';
import MEDICATION from '@salesforce/label/c.BI_PSP_Medication';
import DAILY_LIFE from '@salesforce/label/c.BI_PSP_DailyLife';
import SOCIAL_INTERACTIONS from '@salesforce/label/c.BI_PSP_SocialInteractions';
import GOOD_DAYS from '@salesforce/label/c.BI_PSP_GoodDays';
import BAD_DAYS from '@salesforce/label/c.BI_PSP_BadDays';
import ONGOING_SYMPTOMS from '@salesforce/label/c.BI_PSP_OngoingSymptoms';
import LIMITATIONS from '@salesforce/label/c.BI_PSP_Limitations';

import QUESTIONS from '@salesforce/label/c.BI_PSP_Questions';
import DOCTOR from '@salesforce/label/c.BI_PSP_Doctor';
import DERMATOLOGIST_APPOINTMENT from '@salesforce/label/c.BI_PSP_DermatologistAppointment';
import DERMATOLOGIST from '@salesforce/label/c.BI_PSP_Dermatologist';
import DISEASE_MANAGEMENT_PLAN from '@salesforce/label/c.BI_PSP_DiseaseManagementPlan';
import DISCUSSION from '@salesforce/label/c.BI_PSP_Discussion';
import CONTROL from '@salesforce/label/c.BI_PSP_Control';
import CREAMS from '@salesforce/label/c.BI_PSP_Creams';
import HEALING from '@salesforce/label/c.BI_PSP_Healing';
import DAILY_ACTIVITIES from '@salesforce/label/c.BI_PSP_DailyActivities';
import HOSPITALIZATION from '@salesforce/label/c.BI_PSP_Hospitalization';
import DECISIONS from '@salesforce/label/c.BI_PSP_Decisions';
import PROS_AND_CONS from '@salesforce/label/c.BI_PSP_ProsAndCons';
import SPECIFIC_QUESTIONS from '@salesforce/label/c.BI_PSP_SpecificQuestions';
import BEST_TREATMENT from '@salesforce/label/c.BI_PSP_BestTreatment';
import TIMEFRAME from '@salesforce/label/c.BI_PSP_TimeFrame';
import ALTERNATIVES from '@salesforce/label/c.BI_PSP_Alternatives';
import SIDE_EFFECTS from '@salesforce/label/c.BI_PSP_SideEffects';
import SYMPTOMS_BETWEEN_FLARES from '@salesforce/label/c.BI_PSP_SymptomsBetweenFlares';
import FLARES_WHILE_TRAVELING from '@salesforce/label/c.BI_PSP_FlaresWhileTraveling';
import FLARE_PREVENTION from '@salesforce/label/c.BI_PSP_FlarePrevention';
import SYMPTOM_IMPROVEMENT from '@salesforce/label/c.BI_PSP_SymptomImprovement';
import DIET_OR_LIFESTYLE_CHANGES from '@salesforce/label/c.BI_PSP_DietOrLifestyleChanges';
import PSYCHOLOGIST from '@salesforce/label/c.BI_PSP_Psychologist';
import COUNSELOR from '@salesforce/label/c.BI_PSP_Counselor';
import RESOURCES from '@salesforce/label/c.BI_PSP_Resources';
import FLARE_ONSET from '@salesforce/label/c.BI_PSP_FlareOnset';
import VIDEO_APPOINTMENTS from '@salesforce/label/c.BI_PSP_VideoAppointments';
import TELEPHONE_APPOINTMENTS from '@salesforce/label/c.BI_PSP_TelephoneAppointments';
import SUPPORT_GROUPS from '@salesforce/label/c.BI_PSP_SupportGroups';
import APPOINTMENTS from '@salesforce/label/c.BI_PSP_Appointments';
import APPOINTMENT from '@salesforce/label/c.BI_PSP_Appointment';
import SERIOUS from '@salesforce/label/c.BI_PSP_Serious';
import LIFE_THREATENING from '@salesforce/label/c.BI_PSP_LifeThreatening';
import KIDNEY_FAILURE from '@salesforce/label/c.BI_PSP_KidneyFailure';
import LIVER_FAILURE from '@salesforce/label/c.BI_PSP_LiverFailure';
import LIVER from '@salesforce/label/c.BI_PSP_Liver';
import RESPIRATORY_FAILURE from '@salesforce/label/c.BI_PSP_RespiratoryFailure';
import HEART_FAILURE from '@salesforce/label/c.BI_PSP_HeartFailure';
import MEDICAL_ALERT_BRACELET from '@salesforce/label/c.BI_PSP_MedicalAlertBracelet';
import CARD from '@salesforce/label/c.BI_PSP_Card';
import GOALS from '@salesforce/label/c.BI_PSP_Goals';
import GOAL from '@salesforce/label/c.BI_PSP_Goal';
import APPOINTMENT_PREPARATION from '@salesforce/label/c.BI_PSP_AppointmentPreparation';
import SKIN_DISEASE from '@salesforce/label/c.BI_PSP_SkinDisease';

import GPPMAINTENANCE from '@salesforce/label/c.BI_PSP_GPPMaintenance';
import PREVENTINGFLARES from '@salesforce/label/c.BI_PSP_PreventingFlares';
import EFFISAYIL_2 from '@salesforce/label/c.BI_PSP_EffisayilTwo';
import CS_INJECTION from '@salesforce/label/c.BI_PSP_CSInjection';
import INJECTION from '@salesforce/label/c.BI_PSP_Injection';
import CLINICAL_TRIAL from '@salesforce/label/c.BI_PSP_ClinicalTrial';
import CLINICAL_TRIALS from '@salesforce/label/c.BI_PSP_ClinicalTrials';
import PRO from '@salesforce/label/c.BI_PSP_PRO';
import WORSENING from '@salesforce/label/c.BI_PSP_Worsening';
import EFFISAYIL from '@salesforce/label/c.BI_PSP_Effisayil';
import SELF_ADMINISTRATION from '@salesforce/label/c.BI_PSP_SelfAdministration';
import GUIDETOINJECTION from '@salesforce/label/c.BI_PSP_GuideToInjection';
import SELFINJECTION from '@salesforce/label/c.BI_PSP_SelfInjection';
import SUBCUTANEOUS_INJECTION from '@salesforce/label/c.BI_PSP_SubcutaneousInjection';
import SC_INJECTION from '@salesforce/label/c.BI_PSP_ScInjection';
import SC from '@salesforce/label/c.BI_PSP_Sc';
import INTERLEUKIN from '@salesforce/label/c.BI_PSP_Interleukin';
import SYRINGE from '@salesforce/label/c.BI_PSP_Syringe';
import DOSE from '@salesforce/label/c.BI_PSP_Dose';
import DOSAGE from '@salesforce/label/c.BI_PSP_Dosage';



import GUIDETOINFUSION from '@salesforce/label/c.BI_PSP_GuideToInfusion';
import IV from '@salesforce/label/c.BI_PSP_IV';
import SINGLE_DOSE_VIAL from '@salesforce/label/c.BI_PSP_SingleDoseVial';
import SINGLE_DOSE from '@salesforce/label/c.BI_PSP_SingleDose';
import INFUSION_THERAPY from '@salesforce/label/c.BI_PSP_InfusionTherapy';
import INFUSION_CENTER from '@salesforce/label/c.BI_PSP_InfusionCenter';

import TREATINGFLARES from '@salesforce/label/c.BI_PSP_TreatingFlares';
import GENERALIZED_PUSTULAR_PSORIASIS from '@salesforce/label/c.BI_PSP_GeneralizedPustularPsoriasis';
import INTERLEUKIN_SEARCH from '@salesforce/label/c.BI_PSP_InterleukinLabel';
import INTRAVENOUS_SEARCH from '@salesforce/label/c.BI_PSP_Intravenous';
import SKIN_LESIONS from '@salesforce/label/c.BI_PSP_SkinLesions';
import EFFICACY from '@salesforce/label/c.BI_PSP_Efficacy';
import SAFETY from '@salesforce/label/c.BI_PSP_Safety';
import PLACEBO from '@salesforce/label/c.BI_PSP_Placebo';
import GPPGA from '@salesforce/label/c.BI_PSP_Gppga';


export const LABELS = {
    VISIT_INFORMATION_CENTER,
    ARTICLES_FOR_YOU,
    RELATED_ARTICLES,
    WATCH_VIDEO,
    VIDEO_LANDING_MSG,
    ACUTE_VIDEO_LANDING_MSG,
    WATCH_LEARN,
    VISUAL_LEARNING,
    RECENT_ARTICLES,
    LOAD_MORE,
    PREVEIOUS,
    NEXT,
    MINUTES,
    INFO_CENTER_LANDING_MESSAGE,
    INFO_CENTER_LANDING_DETAIL_MESSAGE,
    ARTICLE_SEARCH_AVATAR_MESSAGE,
    ARTICLE_LIKE_QUESTION,
    ARTICLE_CATEGORIES,
    PATIENT_TREATMENT_VIDEOS,
    ARTICLES,
    SPEVIGO_ARTICLES,
    ERROR_PAGE,
    TAGS_LABEL,
    REFERENCES,
    LIKE_LABEL,
    DISLIKE_LABEL,
    LIKE_ERROR,
    GPP_FLARE,
    GEN_CATEGORY,
    SOCIAL_LIFE_CATEGORY,
    MANAGEMENT_CATEGORY,
    MENTAL_HEALTH_CATEGORY,
    HEALTHY_LIFE_CATEGORY,
    SPEVIGO_CATEGORY,
    LANDING_PAGE,
    JUST_FOR_ME_CATEGORY,
    NO_SEARCH_RESULTS,
    BRANDED_URL,
    UNASSIGNED_URL,
    WHAT_GPP_LABEL,
    FACTS_GPP_LABEL,
    RARE_GPP_LABEL,
    WHY_DO_I_HAVE_GPP_LABEL,
    DIAGNOSIS_GPP_LABEL,
    GPP_CONTAGIOUS_LABEL,
    FRIENDS_FAMILY_LABEL,
    FEELING_EXCLUDED_LABEL,
    GPP_INTIMACY_LABEL,
    GPP_PREGNANCY_LABEL,
    MANAGE_FLARE_LABEL,
    GPP_COMORBIDITIES_LABEL,
    MANAGE_GPP_SYMPTOMS_LABEL,
    ASK_DOCTOR_LABEL,
    SEEK_MEDICARE_LABEL,
    SEEK_EMERGENCY_LABEL,
    MANAGE_SCARS_LABEL,
    COMPLICAT_GPP_LABEL,
    RECOGNIZING_FLARES_LABEL,
    VISIT_DOCTOR_LABEL,
    DERMATOLOGIST_LABEL,
    TALK_GPP_LABEL,
    NOT_ALONE_LABEL,
    POSITIVE_CHOICES_LABEL,
    TREATING_GPP_LABEL,
    SPEVIGO_INFUSION_LABEL,
    PREVENTION_GPP_LABEL,
    SPEVIGO_INJECTION_LABEL,
    WORK_IN_GPP_LABEL,
    CHRONIC_STATUS,
    CHRONIC_CATEGORY,
    ACUTE_CATEGORY,
    CHANNEL_NAME,
    ACUTE_STATUS,
    ARTICLE_STRING,
    FLARE_TREATMENT_CATEGORY,
    FLARE_PREVENTION_CATEGORY,
    WHAT_IS_GPP_LABEL,
    GPP_HEALTH_LABEL,
    TALK_HCP_LABEL,
    MANAGE_GPP_LABEL,
    FLARES_LABEL,
    ERROR_VARIANT,
    ERROR_MESSAGE,
    UNASSIGNED_STATUS,
    BRANDED_SITE_URL,
    UNASSIGNED_SITE_URL,
    DETAIL_PAGE,
    WHAT_GPP_MINS,
    FACTS_GPP_MINS,
    RARE_GPP_MINS,
    WHY_DO_I_HAVE_GPP_MINS,
    DIAGNOSIS_GPP_MINS,
    GPP_CONTAGIOUS_MINS,
    FRIENDS_FAMILY_MINS,
    FEELING_EXCLUDED_MINS,
    GPP_INTIMACY_MINS,
    GPP_PREGNANCY_MINS,
    MANAGE_FLARE_MINS,
    GPP_COMORBIDITIES_MINS,
    MANAGE_GPP_SYMPTOMS_MINS,
    ASK_DOCTOR_MINS,
    SEEK_MEDICARE_MINS,
    SEEK_EMERGENCY_MINS,
    MANAGE_SCARS_MINS,
    COMPLICAT_GPP_MINS,
    RECOGNIZING_FLARES_MINS,
    VISIT_DOCTOR_MINS,
    DERMATOLOGIST_MINS,
    TALK_GPP_MINS,
    NOT_ALONE_MINS,
    POSITIVE_CHOICES_MINS,
    TREATING_GPP_MINS,
    SPEVIGO_INFUSION_MINS,
    PREVENTION_GPP_MINS,
    SPEVIGO_INJECTION_MINS,
    WORK_IN_GPP_MINS,
    VIEW_LABEL,
    ENTER_EVENT,
    CATEGORY_PAGE,
    CHRONIC_VIDEO_PAGE,
    ACUTE_VIDEO_PAGE,
    SEARCH_PAGE,
    FLARE_TREATMENT_LABEL,
    FLARE_PREVENTION_LABEL,
    WHAT_IS_GPP_CATEGORY,
    MANAGE_GPP_CATEGORY,
    TALK_HCP_CATEGORY,
    GPP_HEALTH_CATEGORY,
    INTRODUCTION_CATEGORY,
    FLARES_CATEGORY,
    COMPLETE_STATUS
};
export const MINSMAP = {
    [WHAT_GPP_LABEL]: [WHAT_GPP_MINS],
    [FACTS_GPP_LABEL]: [FACTS_GPP_MINS],
    [RARE_GPP_LABEL]: [RARE_GPP_MINS],
    [WHY_DO_I_HAVE_GPP_LABEL]: [WHY_DO_I_HAVE_GPP_MINS],
    [DIAGNOSIS_GPP_LABEL]: [DIAGNOSIS_GPP_MINS],
    [GPP_CONTAGIOUS_LABEL]: [GPP_CONTAGIOUS_MINS],
    [FRIENDS_FAMILY_LABEL]: [FRIENDS_FAMILY_MINS],
    [FEELING_EXCLUDED_LABEL]: [FEELING_EXCLUDED_MINS],
    [GPP_INTIMACY_LABEL]: [GPP_INTIMACY_MINS],
    [GPP_PREGNANCY_LABEL]: [GPP_PREGNANCY_MINS],
    [MANAGE_FLARE_LABEL]: [MANAGE_FLARE_MINS],
    [GPP_COMORBIDITIES_LABEL]: [GPP_COMORBIDITIES_MINS],
    [MANAGE_GPP_SYMPTOMS_LABEL]: [MANAGE_GPP_SYMPTOMS_MINS],
    [ASK_DOCTOR_LABEL]: [ASK_DOCTOR_MINS],
    [SEEK_MEDICARE_LABEL]: [SEEK_MEDICARE_MINS],
    [SEEK_EMERGENCY_LABEL]: [SEEK_EMERGENCY_MINS],
    [MANAGE_SCARS_LABEL]: [MANAGE_SCARS_MINS],
    [COMPLICAT_GPP_LABEL]: [COMPLICAT_GPP_MINS],
    [RECOGNIZING_FLARES_LABEL]: [RECOGNIZING_FLARES_MINS],
    [VISIT_DOCTOR_LABEL]: [VISIT_DOCTOR_MINS],
    [DERMATOLOGIST_LABEL]: [DERMATOLOGIST_MINS],
    [TALK_GPP_LABEL]: [TALK_GPP_MINS],
    [NOT_ALONE_LABEL]: [NOT_ALONE_MINS],
    [POSITIVE_CHOICES_LABEL]: [POSITIVE_CHOICES_MINS],
    [TREATING_GPP_LABEL]: [TREATING_GPP_MINS],
    [SPEVIGO_INFUSION_LABEL]: [SPEVIGO_INFUSION_MINS],
    [PREVENTION_GPP_LABEL]: [PREVENTION_GPP_MINS],
    [SPEVIGO_INJECTION_LABEL]: [SPEVIGO_INJECTION_MINS],
    [WORK_IN_GPP_LABEL]: [WORK_IN_GPP_MINS]
}
export const SEARCH_ARTICLE_MAP = [
    {
    tagValue: [GPP_SYMPTOMS],
    articles: [WHAT_GPP_LABEL, RECOGNIZING_FLARES_LABEL, SEEK_EMERGENCY_LABEL, MANAGE_GPP_SYMPTOMS_LABEL, VISIT_DOCTOR_LABEL, SEEK_MEDICARE_LABEL, DERMATOLOGIST_LABEL]
    },
    {
        tagValue: [GPP_TREATMENT],
        articles: [DIAGNOSIS_GPP_LABEL, MANAGE_GPP_SYMPTOMS_LABEL, SEEK_MEDICARE_LABEL]
        },
    {
        tagValue: [GPP_QUES],
        articles: [WHAT_GPP_LABEL, FACTS_GPP_LABEL]
    },
    {
        tagValue: [CAUSES_GPP],
        articles: [FACTS_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL]
    },
    {
        tagValue: [WHO_OF_GPP],
        articles: [FACTS_GPP_LABEL]
    },
    {
        tagValue: [GPP_CONTAGIOUS],
        articles: [FACTS_GPP_LABEL, GPP_CONTAGIOUS_LABEL]

    },
    {
        tagValue: [GPP_SPREAD],
        articles: [GPP_CONTAGIOUS_LABEL]
    },
    {
        tagValue: [EXPLANING_GPP_LABEL],
        articles: [GPP_CONTAGIOUS_LABEL, TALK_GPP_LABEL, FRIENDS_FAMILY_LABEL, GPP_INTIMACY_LABEL]
    },
    {
        tagValue: [SCAR_GPP],
        articles: [MANAGE_SCARS_LABEL]
    },
    {
        tagValue: [PROTECT_GPP],
        articles: [MANAGE_SCARS_LABEL]

    },
    {
        tagValue: [GPP_COMPLICAT],
        articles: [COMPLICAT_GPP_LABEL]
    },
    {
        tagValue: [GPP_PREG],
        articles: [COMPLICAT_GPP_LABEL, GPP_PREGNANCY_LABEL]

    },
    {
        tagValue: [GPP_FLARE],
        articles: [RECOGNIZING_FLARES_LABEL, SEEK_EMERGENCY_LABEL, MANAGE_GPP_SYMPTOMS_LABEL, SEEK_MEDICARE_LABEL]

    },
    {
        tagValue: [GPP_TYPES],
        articles: [RECOGNIZING_FLARES_LABEL, SEEK_EMERGENCY_LABEL]

    }
    ,
    {
        tagValue: [RARE_OF_GPP],
        articles: [RARE_GPP_LABEL]

    },
    {
        tagValue: [PEOPLE_WITH_GPP],
        articles: [RARE_GPP_LABEL]

    },
    {
        tagValue: [GPP_CAUSES],
        articles: [WHY_DO_I_HAVE_GPP_LABEL]

    },
    {
        tagValue: [TRIGGERS_FOR_GPP],
        articles: [WHY_DO_I_HAVE_GPP_LABEL]

    },
    {
        tagValue: [TALKING_TO_HCP],
        articles: [TALK_GPP_LABEL, GPP_PREGNANCY_LABEL, GPP_COMORBIDITIES_LABEL, VISIT_DOCTOR_LABEL, ASK_DOCTOR_LABEL]

    },
    {
        tagValue: [TIPS_ON_GPP],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [MANAGING_GPP],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [GPP_FEELINGS],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [GPP_EXPERIENCES],
        articles: [FRIENDS_FAMILY_LABEL]

    },
    {
        tagValue: [SHARING],
        articles: [FRIENDS_FAMILY_LABEL]

    },
    {
        tagValue: [GPP_DIAGNOSIS],
        articles: [DIAGNOSIS_GPP_LABEL]

    },
    {
        tagValue: [SUPPORT_GPP],
        articles: [DIAGNOSIS_GPP_LABEL, FEELING_EXCLUDED_LABEL, MANAGE_FLARE_LABEL, GPP_COMORBIDITIES_LABEL]

    },
    {
        tagValue: [GPP_CHALLENGES],
        articles: [FEELING_EXCLUDED_LABEL]

    },
    {
        tagValue: [CHOICES_GPP],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [GPP_EAT],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [ACT_GPP],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [GPP_CARE],
        articles: [GPP_PREGNANCY_LABEL]

    },
    {
        tagValue: [WHAT_COMORBIDITIES],
        articles: [GPP_COMORBIDITIES_LABEL]
    },
    {
        tagValue: [GPP_INTIMACY],
        articles: [GPP_INTIMACY_LABEL]

    },
    {
        tagValue: [GPP_DISCOMFORT],
        articles: [GPP_INTIMACY_LABEL]

    },
    {
        tagValue: [MANAGE_GPP],
        articles: [MANAGE_FLARE_LABEL]

    },
    {
        tagValue: [SUPPORT_GPP],
        articles: [MANAGE_FLARE_LABEL]

    },
    {
        tagValue: [GPP_COMORBIDITIES],
        articles: [GPP_COMORBIDITIES_LABEL]

    },
    {
        tagValue: [GPP_VISIT],
        articles: [VISIT_DOCTOR_LABEL,DERMATOLOGIST_LABEL]

    },
    {
        tagValue: [GPP_FLARE_TREATMENT],
        articles: [TREATING_GPP_LABEL]

    },
    {
        tagValue: [EFFSAYIL_ONE],
        articles: [TREATING_GPP_LABEL]

    },		{
        tagValue: [SPEVIGO_INFUSION],
        articles: [TREATING_GPP_LABEL]

    },	{
        tagValue: [QS_ASK],
        articles: [ASK_DOCTOR_LABEL]

    },	
    {
        tagValue: [SYMPTOM_LIST],
        articles: [VISIT_DOCTOR_LABEL]

    },
    {
        tagValue: [GPP_FLARE_PREVENTION],
        articles: [PREVENTION_GPP_LABEL]

    },
    {
        tagValue: [EFISAYIL_TWO],
        articles: [PREVENTION_GPP_LABEL]

    },
    {
        tagValue: [SPEVIGO_INJECTION],
        articles: [PREVENTION_GPP_LABEL]

    },		{
        tagValue: [INFUSION],
        articles: [SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL]

    },		{
        tagValue: [HEALTH_CENTER],
        articles: [SPEVIGO_INFUSION_LABEL]

    },		{
        tagValue: [INTRAVENOUS],
        articles: [SPEVIGO_INFUSION_LABEL]

    },		{
        tagValue: [SUBCUTANEOUS],
        articles: [SPEVIGO_INJECTION_LABEL]

    },		{
        tagValue: [SELF_INJECTION],
        articles: [SPEVIGO_INJECTION_LABEL]

    },		{
        tagValue: [IL36],
        articles: [WORK_IN_GPP_LABEL,]

    },		{
        tagValue: [BLOCKING],
        articles: [WORK_IN_GPP_LABEL]

    },		{
        tagValue: [ACTION],
        articles: [WORK_IN_GPP_LABEL]

    },{
        tagValue: [MECHANISM],
        articles: [WORK_IN_GPP_LABEL]
    },
    {
        tagValue: [FLARES_CAUSES],
        articles: [WHAT_GPP_LABEL]

    },
    {
        tagValue: [WHAT],
        articles: [FACTS_GPP_LABEL]

    },
    {
        tagValue: [WHY],
        articles: [FACTS_GPP_LABEL]

    },
    {
        tagValue: [WHO_OF_GPP],
        articles: [FACTS_GPP_LABEL]

    },
    {
        tagValue: [CONTAGIOUSNESS],
        articles: [GPP_CONTAGIOUS_LABEL]

    },
    {
        tagValue: [EXPLAIN_TO_OTHERS],
        articles: [GPP_CONTAGIOUS_LABEL]

    },
    {
        tagValue: [SCARPROCESS],
        articles: [MANAGE_SCARS_LABEL]

    },
    {
        tagValue: [DEAL_STRING],
        articles: [MANAGE_SCARS_LABEL]

    },
    {
        tagValue: [AVOID_COMPLICAT],
        articles: [COMPLICAT_GPP_LABEL]

    },
    {
        tagValue: [PREGNANCY_SEARCH],
        articles: [COMPLICAT_GPP_LABEL]

    },
    {
        tagValue: [FLARES],
        articles: [RECOGNIZING_FLARES_LABEL,SEEK_MEDICARE_LABEL]

    },
    {
        tagValue: [SYMPTOMS_TO_RECOGNIZE],
        articles: [RECOGNIZING_FLARES_LABEL]

    },
    {
        tagValue: [INCIDENCE],
        articles: [RARE_GPP_LABEL]

    },
    {
        tagValue: [MEAN_OF_RARE_GPP],
        articles: [RARE_GPP_LABEL]

    },
    {
        tagValue: [MEANING_OF_RARE],
        articles: [RARE_GPP_LABEL]

    },
    {
        tagValue: [ITS_TRIGGERS],
        articles: [WHY_DO_I_HAVE_GPP_LABEL]

    },
    {
        tagValue: [TALK_GPP_TO_HCP],
        articles: [TALK_GPP_LABEL]

    },
    {
        tagValue: [COLLEGUESETC],
        articles: [TALK_GPP_LABEL]

    },
    {
        tagValue: [HOW_TO],
        articles: [TALK_GPP_LABEL]

    },
    {
        tagValue: [LIVING_WITH_GPP],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [TIPS],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [MANAGE_FEELING_LABEL],
        articles: [NOT_ALONE_LABEL]

    },
    {
        tagValue: [SHARE_EXPERI],
        articles: [FRIENDS_FAMILY_LABEL]

    },
    {
        tagValue: [HOW_TO_TALK],
        articles: [FRIENDS_FAMILY_LABEL]

    },
    {
        tagValue: [DIAGNOSIS_METHOD],
        articles: [DIAGNOSIS_GPP_LABEL]

    },
    {
        tagValue: [ACCEPTANCE_TREATMENT],
        articles: [DIAGNOSIS_GPP_LABEL]

    },
    {
        tagValue: [STIGMA],
        articles: [FEELING_EXCLUDED_LABEL]

    },
    {
        tagValue: [CHALLENGES],
        articles: [FEELING_EXCLUDED_LABEL]

    },
    {
        tagValue: [GETTING_SUPPORT],
        articles: [FEELING_EXCLUDED_LABEL]

    },
    {
        tagValue: [CHOICES],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [EATING],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [ACTIVITY_ETC],
        articles: [POSITIVE_CHOICES_LABEL]

    },
    {
        tagValue: [PREGN_GPP],
        articles: [GPP_PREGNANCY_LABEL]

    },
    {
        tagValue: [CARE],
        articles: [GPP_PREGNANCY_LABEL,SEEK_EMERGENCY_LABEL]

    },
    {
        tagValue: [HCP_INFO],
        articles: [GPP_PREGNANCY_LABEL]

    },
    {
        tagValue: [INTIMACY_STR],
        articles: [GPP_INTIMACY_LABEL]

    },
    {
        tagValue: [TALK_PARTNER],
        articles: [GPP_INTIMACY_LABEL]

    },
    {
        tagValue: [DISCOMFORT_STRING],
        articles: [GPP_INTIMACY_LABEL]

    },
    {
        tagValue: [MANAGE_FLARES],
        articles: [MANAGE_FLARE_LABEL]

    },
    {
        tagValue: [MEDI_HELP],
        articles: [MANAGE_FLARE_LABEL]

    },
    {
        tagValue: [COMORBIDITIES],
        articles: [GPP_COMORBIDITIES_LABEL]

    },
    {
        tagValue: [LETTING_HCP],
        articles: [GPP_COMORBIDITIES_LABEL]

    },
    {
        tagValue: [RECOGNIZING_FLARES_LABEL],
        articles: [SEEK_EMERGENCY_LABEL]

    },
    {
        tagValue: [IMP_SIGNS],
        articles: [SEEK_EMERGENCY_LABEL]

    },
    {
        tagValue: [EMERCARE],
        articles: [SEEK_EMERGENCY_LABEL]

    },
    {
        tagValue: [RECOGNIZING_FLARES_LABEL],
        articles: [MANAGE_GPP_SYMPTOMS_LABEL]

    },
    {
        tagValue: [TREATMENT_HELP],
        articles: [MANAGE_GPP_SYMPTOMS_LABEL]

    },
    {
        tagValue: [RECOGNIZING_FLARES_LABEL],
        articles: [SEEK_MEDICARE_LABEL]

    },
    {
        tagValue: [IMP_SIGNS],
        articles: [SEEK_MEDICARE_LABEL]

    },
    {
        tagValue: [EMERCARE],
        articles: [SEEK_MEDICARE_LABEL]
    },
    {
        tagValue: [CHECKLIST],
        articles: [DERMATOLOGIST_LABEL,VISIT_DOCTOR_LABEL]

    },
    {
        tagValue: [PREPARING_ADVANCE],
        articles: [DERMATOLOGIST_LABEL]

    },
    {
        tagValue: [GPP_FLARE_SPEVINFU],
        articles: [TREATING_GPP_LABEL]

    },
    {
        tagValue: [PREVENTION_INJECT],
        articles: [PREVENTION_GPP_LABEL]

    },
    {
        tagValue: [PATIENT_INFUSION],
        articles: [SPEVIGO_INFUSION_LABEL]

    },
    {
        tagValue: [PATIENT_INJECTION],
        articles: [SPEVIGO_INJECTION_LABEL]

    },
    {
        tagValue: [SPEV_ACTION_DOSE],
        articles: [WORK_IN_GPP_LABEL]

    },
   

    { tagValue: [SYMPTOM_SEARCH], articles: [WHAT_GPP_LABEL,RECOGNIZING_FLARES_LABEL,TALK_GPP_LABEL,DIAGNOSIS_GPP_LABEL,GPP_PREGNANCY_LABEL,MANAGE_FLARE_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,VISIT_DOCTOR_LABEL,ASK_DOCTOR_LABEL,SEEK_MEDICARE_LABEL,DERMATOLOGIST_LABEL]},
    { tagValue: [FLARES], articles: [WHAT_GPP_LABEL,RECOGNIZING_FLARES_LABEL,MANAGE_FLARE_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL] },
    { tagValue: [GPP_TAG], articles: [WHAT_GPP_LABEL ,FACTS_GPP_LABEL,GPP_CONTAGIOUS_LABEL,MANAGE_SCARS_LABEL,COMPLICAT_GPP_LABEL,FRIENDS_FAMILY_LABEL,MANAGE_FLARE_LABEL,WORK_IN_GPP_LABEL,ASK_DOCTOR_LABEL,SEEK_MEDICARE_LABEL,PREVENTION_GPP_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL]},
    { tagValue: [TRIGGERS], articles: [WHAT_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL,GPP_PREGNANCY_LABEL,VISIT_DOCTOR_LABEL] },
    { tagValue: [TRIGGER], articles: [WHAT_GPP_LABEL,GPP_PREGNANCY_LABEL] },
    { tagValue: [SYMPTOM], articles: [WHAT_GPP_LABEL,MANAGE_FLARE_LABEL,SEEK_EMERGENCY_LABEL,VISIT_DOCTOR_LABEL] },
    { tagValue: [FLARE], articles: [WHAT_GPP_LABEL,MANAGE_SCARS_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL,MANAGE_FLARE_LABEL,SEEK_EMERGENCY_LABEL,SEEK_MEDICARE_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL] },
    {tagValue: [STRESS], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,GPP_PREGNANCY_LABEL,GPP_INTIMACY_LABEL,VISIT_DOCTOR_LABEL] },
    { tagValue: [PUSTULES], articles: [WHAT_GPP_LABEL, FACTS_GPP_LABEL,GPP_CONTAGIOUS_LABEL,RECOGNIZING_FLARES_LABEL,SEEK_EMERGENCY_LABEL,WORK_IN_GPP_LABEL,SEEK_MEDICARE_LABEL,TREATING_GPP_LABEL] },
    { tagValue: [SKIN_REDNESS], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL] },
    { tagValue: [FEVER], articles: [WHAT_GPP_LABEL,DIAGNOSIS_GPP_LABEL,RECOGNIZING_FLARES_LABEL,FACTS_GPP_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [JOINT_PAIN], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL, RECOGNIZING_FLARES_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL] },
    { tagValue: [FATIGUE], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [PREGNANCY_SEARCH], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,COMPLICAT_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [INFECTION], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,GPP_CONTAGIOUS_LABEL,COMPLICAT_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL,GPP_COMORBIDITIES_LABEL] },
    { tagValue: [SUNLIGHT], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL] },
    { tagValue: [SMOKING], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL] },
    { tagValue: [INFLAMMATION], articles: [WHAT_GPP_LABEL,FACTS_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL,WORK_IN_GPP_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL]},
    { tagValue: [FACTS], articles: [FACTS_GPP_LABEL] },
    { tagValue: [CAUSES], articles: [FACTS_GPP_LABEL,WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [CHRONIC_CONDITION], articles: [FACTS_GPP_LABEL] },
    { tagValue: [RELAPSING_CONDITION], articles: [FACTS_GPP_LABEL] },
    { tagValue: [RARE_DISEASE], articles: [FACTS_GPP_LABEL,RARE_GPP_LABEL,DIAGNOSIS_GPP_LABEL] },
    { tagValue: [CONTAGIOUS], articles: [FACTS_GPP_LABEL] },
    { tagValue: [PLAQUES], articles: [FACTS_GPP_LABEL] },
    { tagValue: [PSORIASIS], articles: [FACTS_GPP_LABEL,GPP_COMORBIDITIES_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [TREATMENT_OPTIONS], articles: [FACTS_GPP_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL] },
    { tagValue: [SPREAD], articles: [GPP_CONTAGIOUS_LABEL] },
    { tagValue: [INTIMACY_STR], articles: [GPP_CONTAGIOUS_LABEL,FRIENDS_FAMILY_LABEL,GPP_INTIMACY_LABEL] },
    { tagValue: [RELATIONSHIPS], articles: [GPP_CONTAGIOUS_LABEL,NOT_ALONE_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,VISIT_DOCTOR_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [RELATIONSHIP], articles: [GPP_CONTAGIOUS_LABEL,NOT_ALONE_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [SEX], articles: [GPP_CONTAGIOUS_LABEL,GPP_INTIMACY_LABEL,GPP_PREGNANCY_LABEL] },
    { tagValue: [SEXUAL], articles: [GPP_CONTAGIOUS_LABEL,GPP_INTIMACY_LABEL] },
    { tagValue: [PUS], articles: [GPP_CONTAGIOUS_LABEL,RECOGNIZING_FLARES_LABEL] },
    { tagValue: [SCARRING], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [SKIN_AND_GPP], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [MANAGE], articles: [MANAGE_SCARS_LABEL,POSITIVE_CHOICES_LABEL,MANAGE_FLARE_LABEL,GPP_COMORBIDITIES_LABEL,NOT_ALONE_LABEL] },
    { tagValue: [HYPERPIGMENTATION], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [PIGMENTATION], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [PIGMENT], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [ITCHING], articles: [MANAGE_SCARS_LABEL,RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [SUNSCREEN], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [CLOTHING], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [CLOTHES], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [SUN_EXPOSURE], articles: [MANAGE_SCARS_LABEL] },
    { tagValue: [SUN], articles: [MANAGE_SCARS_LABEL,WHY_DO_I_HAVE_GPP_LABEL,POSITIVE_CHOICES_LABEL] },
    { tagValue: [COMPLICATIONS], articles: [COMPLICAT_GPP_LABEL,ASK_DOCTOR_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [MOTHER], articles: [COMPLICAT_GPP_LABEL,GPP_PREGNANCY_LABEL] },
    { tagValue: [PREGNANCYGPP], articles: [COMPLICAT_GPP_LABEL,GPP_PREGNANCY_LABEL] },
    { tagValue: [HEART], articles: [COMPLICAT_GPP_LABEL,SEEK_EMERGENCY_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [KIDNEY], articles: [COMPLICAT_GPP_LABEL,GPP_COMORBIDITIES_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [INFECTIONS], articles: [COMPLICAT_GPP_LABEL,SEEK_EMERGENCY_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [REDNESS], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [SKIN_PAIN], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL] },
    { tagValue: [PAIN], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [CHILLS], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [TIREDNESS], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL] },
    { tagValue: [TIRED], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL,SEEK_EMERGENCY_LABEL] },
    { tagValue: [SICK], articles: [RECOGNIZING_FLARES_LABEL] },
    { tagValue: [WEAKNESS], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL] },
    { tagValue: [WEAK], articles: [RECOGNIZING_FLARES_LABEL,DIAGNOSIS_GPP_LABEL] },
    { tagValue: [JOINT], articles: [RECOGNIZING_FLARES_LABEL,MANAGE_GPP_SYMPTOMS_LABEL] },
    { tagValue: [INCIDENCE], articles: [RARE_GPP_LABEL] },
    { tagValue: [RARECONDITION], articles: [RARE_GPP_LABEL] },
    { tagValue: [RARE], articles: [RARE_GPP_LABEL,DIAGNOSIS_GPP_LABEL] },
    { tagValue: [GENETICS], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [IL_PATHWAY], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [IL36], articles: [WHY_DO_I_HAVE_GPP_LABEL,WORK_IN_GPP_LABEL,PREVENTION_GPP_LABEL,SPEVIGO_INFUSION_LABEL,SPEVIGO_INJECTION_LABEL] },
    { tagValue: [GENETIC], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [IMMUNE_SYSTEM], articles: [WHY_DO_I_HAVE_GPP_LABEL,WORK_IN_GPP_LABEL] },
    { tagValue: [IMMUNE], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [SKIN_PRODUCTS], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [STEROID], articles: [WHY_DO_I_HAVE_GPP_LABEL] },
    { tagValue: [TALKGPP], articles: [TALK_GPP_LABEL] },
    { tagValue: [SPEAKUP], articles: [TALK_GPP_LABEL,ASK_DOCTOR_LABEL] },
    { tagValue: [HCPCONNECT], articles: [TALK_GPP_LABEL,GPP_COMORBIDITIES_LABEL,GPP_PREGNANCY_LABEL,VISIT_DOCTOR_LABEL,ASK_DOCTOR_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [COMMUNICATION], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL] },
    { tagValue: [COMMUNICATE], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL] },
    { tagValue: [SUPPORT], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL,DIAGNOSIS_GPP_LABEL,GPP_PREGNANCY_LABEL,MANAGE_FLARE_LABEL] },
    { tagValue: [UNDERSTANDING], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL] },
    { tagValue: [UNDERSTAND], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL ]},
    { tagValue: [HELP], articles: [TALK_GPP_LABEL] },
    { tagValue: [IMPROVE], articles: [TALK_GPP_LABEL] },
    { tagValue: [GET_BETTER], articles: [TALK_GPP_LABEL] },
    { tagValue: [THERAPY], articles: [TALK_GPP_LABEL] },
    { tagValue: [DISCUSS], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL] },
    { tagValue: [TALK], articles: [TALK_GPP_LABEL,FRIENDS_FAMILY_LABEL] },
    { tagValue: [CONNECT], articles: [TALK_GPP_LABEL] },
    { tagValue: [HCP], articles: [TALK_GPP_LABEL] },
    { tagValue: [TIPS], articles: [NOT_ALONE_LABEL] },
    {tagValue: [FEELINGS_SEARCH], articles: [NOT_ALONE_LABEL,FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL] },
    { tagValue: [ALONE], articles: [NOT_ALONE_LABEL] },
    { tagValue: [LONELY], articles: [NOT_ALONE_LABEL] },
    { tagValue: [LONELINESS], articles: [NOT_ALONE_LABEL] },
    { tagValue: [DAILY], articles: [NOT_ALONE_LABEL] },
    { tagValue: [SELF_CARE], articles: [NOT_ALONE_LABEL] },
    { tagValue: [MENTAL_HEALTH_CATEGORY], articles: [NOT_ALONE_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [SOCIAL], articles: [NOT_ALONE_LABEL,FEELING_EXCLUDED_LABEL ]},
    { tagValue: [EXPERIENCE], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [SHARING], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [EXPLAIN], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [DEPRESSION], articles: [FRIENDS_FAMILY_LABEL,GPP_COMORBIDITIES_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL,DERMATOLOGIST_LABEL] },
    { tagValue: [EMOTIONS], articles: [FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,VISIT_DOCTOR_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [EMOTIONAL], articles: [FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,GPP_INTIMACY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,VISIT_DOCTOR_LABEL,SEEK_MEDICARE_LABEL] },
    { tagValue: [GUIDE], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [GUIDANCE], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [MORAL_SUPPORT], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [COMPANION], articles: [FRIENDS_FAMILY_LABEL] },
    { tagValue: [FRIEND], articles: [FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL] },
{ tagValue: [FRIENDS], articles: [FRIENDS_FAMILY_LABEL,FEELING_EXCLUDED_LABEL,DIAGNOSIS_GPP_LABEL] },
{ tagValue: [FAMILY], articles: [FRIENDS_FAMILY_LABEL,DIAGNOSIS_GPP_LABEL,FEELING_EXCLUDED_LABEL,] },
{ tagValue: [TALKING], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [SPEAK], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [FEELING], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [ENCOURAGE], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [HONEST], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [PERSONAL], articles: [FRIENDS_FAMILY_LABEL] },
{ tagValue: [DIAGNOSIS], articles: [DIAGNOSIS_GPP_LABEL] },
{ tagValue: [SUPPORTGPP], articles: [DIAGNOSIS_GPP_LABEL,FEELING_EXCLUDED_LABEL,GPP_COMORBIDITIES_LABEL] },
{ tagValue: [TREATMENT_SEARCH], articles: [DIAGNOSIS_GPP_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,PREVENTION_GPP_LABEL] },
{ tagValue: [CHALLENGES_SEARCH], articles: [DIAGNOSIS_GPP_LABEL] },
{ tagValue: [STIGMA], articles: [FEELING_EXCLUDED_LABEL] },
{ tagValue: [CHALLENGES_SEARCH], articles: [FEELING_EXCLUDED_LABEL] },
{ tagValue: [MISUNDERSTANDING], articles: [FEELING_EXCLUDED_LABEL] },
{ tagValue: [ISOLATED], articles: [FEELING_EXCLUDED_LABEL] },
{ tagValue: [ISOLATION], articles: [FEELING_EXCLUDED_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [EXCLUDED], articles: [FEELING_EXCLUDED_LABEL] },
{ tagValue: [MAKINGCHOICES], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [STAYINGACTIVE], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [LIFESTYLE_CHANGES], articles: [POSITIVE_CHOICES_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [LIFESTYLE], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [MANAGEMENT_CATEGORY], articles: [POSITIVE_CHOICES_LABEL,GPP_COMORBIDITIES_LABEL,GPP_PREGNANCY_LABEL] },
{ tagValue: [PREVENTION], articles: [POSITIVE_CHOICES_LABEL,SPEVIGO_INJECTION_LABEL] },
{ tagValue: [HEALTHY], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [HEALTH], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [SKINCARE_PRODUCTS], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [SKINCARE], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [DIET], articles: [POSITIVE_CHOICES_LABEL,VISIT_DOCTOR_LABEL] },
{ tagValue: [EXERCISE], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [SUN_PROTECTION], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [PROTECTION], articles: [POSITIVE_CHOICES_LABEL] },
{ tagValue: [OBESITY], articles: [POSITIVE_CHOICES_LABEL,GPP_COMORBIDITIES_LABEL] },
{ tagValue: [BABY], articles: [GPP_PREGNANCY_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [DEVELOPMENT], articles: [GPP_PREGNANCY_LABEL] },
{ tagValue: [MOTHER_AND_BABY], articles: [GPP_PREGNANCY_LABEL] },
{ tagValue: [TREATMENT_SEARCH], articles: [GPP_PREGNANCY_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL,SPEVIGO_INJECTION_LABEL,TREATING_GPP_LABEL]},
{ tagValue: [BALANCED_DIET], articles: [GPP_PREGNANCY_LABEL] },
{ tagValue: [PREGNANT], articles: [GPP_PREGNANCY_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [PARTNER], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [SEXUAL_HEALTH], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [INTIMATE], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [SEXUAL_HEALTH_LABEL], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [DISCOMFORT_STRING], articles: [GPP_INTIMACY_LABEL,SEEK_EMERGENCY_LABEL] },
{ tagValue: [PHYSICAL], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [PHYSICAL_DISCOMFORT], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [EMOTIONAL_IMPACT], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [SELF_ESTEEM], articles: [GPP_INTIMACY_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [SELF_ESTEEM_SEARCH], articles: [DERMATOLOGIST_LABEL] },
{ tagValue: [GENITAL_AREA], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [GENITALS], articles: [GPP_INTIMACY_LABEL] },
{ tagValue: [GENITAL], articles: [GPP_INTIMACY_LABEL] },

{ tagValue: [MANAGING], articles: [MANAGE_FLARE_LABEL] },
{ tagValue: [TRACKING], articles: [MANAGE_FLARE_LABEL] },
{ tagValue: [TRACK], articles: [MANAGE_FLARE_LABEL] },
{ tagValue: [SYMPTOM_TRACKING], articles: [MANAGE_FLARE_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [EMERGENCY], articles: [MANAGE_FLARE_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [MEDICAL_CARE], articles: [MANAGE_FLARE_LABEL,SEEK_EMERGENCY_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [SEVERE], articles: [MANAGE_FLARE_LABEL] },
{ tagValue: [COMORBIDITY], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [DISEASE], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [DISEASE_MANAGEMENT], articles: [GPP_COMORBIDITIES_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [MANAGE_DISEASE], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [ANXIETY], articles: [GPP_COMORBIDITIES_LABEL,MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [ASTHMA], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [CHRONIC_KIDNEY_DISEASE], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [DIABETES], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [SINUS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [SINUS_INFECTION], articles: [GPP_COMORBIDITIES_LABEL,SEEK_EMERGENCY_LABEL] },
{ tagValue: [HIGH_BLOOD_PRESSURE], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [BLOOD_PRESSURE], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [BP], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [HIGH_BP], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [CHOLESTEROL], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [ HIGH_CHOLESTEROL], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [LUNGS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [LUNG], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [LUNG_DISEASES_OR_INFECTIONS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [OSTEOPOROSIS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [PEPTIC_ULCERS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [PSORIATIC_ARTHRITIS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [ARTHRITIS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [ULCERS], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [ULCER], articles: [GPP_COMORBIDITIES_LABEL] },
{ tagValue: [EXTREME_TIREDNESS], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [RED_SKIN], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [TENDER_SKIN], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [PAINFUL], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [PAINFUL_PUSTULES], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [FLAKY], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [SCALING_SKIN], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [DRYNESS], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [EMERCARE], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [BREATHING], articles: [SEEK_EMERGENCY_LABEL] },
{ tagValue: [IL_THIRTYSIX_BLOCKER], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [MOA], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [GPP_LABEL], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [SKIN_INFLAMMATION], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [CHRONIC_PSORIASIS], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [IMMUNE_SYSTEM_DISORDER], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [SPEVIGO], articles: [WORK_IN_GPP_LABEL,PREVENTION_GPP_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [EMA_APPROVAL], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [SPESOLIMAB], articles: [WORK_IN_GPP_LABEL,PREVENTION_GPP_LABEL,SPEVIGO_INJECTION_LABEL,SPEVIGO_INFUSION_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [FDA_APPROVAL], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [EMA], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [FDA ], articles: [WORK_IN_GPP_LABEL] },
{ tagValue: [INTERLEUKIN_THIRTY_SIX], articles: [WORK_IN_GPP_LABEL,PREVENTION_GPP_LABEL,SPEVIGO_INFUSION_LABEL,SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SKIN_SYMPTOMS], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [DISTRESS], articles: [MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [EMOTIONAL_DISTRESS], articles: [MANAGE_GPP_SYMPTOMS_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [SCALING], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [FLARE_SYMPTOMS], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [FLARE_TRIGGERS], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [MEDICAL_SUPPORT], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [SKIN_CREAMS], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [OINTMENTS], articles: [MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [LIGHT_THERAPY], articles: [MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [PILLS], articles: [MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [INJECTABLE_DRUGS], articles: [MANAGE_GPP_SYMPTOMS_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [TREATMENT_PLAN], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [ONGOING_RESEARCH], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [GPP_SPECIFIC_TREATMENTS], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [RESEARCH], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [EVERYDAY_LIFE], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [PHYSICAL_ACTIVITIES], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [SOCIALIZATION], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [QUALITY_OF_LIFE], articles: [MANAGE_GPP_SYMPTOMS_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [QUALITY], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [EVERYDAY], articles: [MANAGE_GPP_SYMPTOMS_LABEL] },
{ tagValue: [SYMPTOM_TRACKER], articles: [MANAGE_GPP_SYMPTOMS_LABEL,VISIT_DOCTOR_LABEL] },
{ tagValue: [MEDICAL_APPOINTMENTS], articles: [VISIT_DOCTOR_LABEL,ASK_DOCTOR_LABEL] },
{ tagValue: [PREPARATION], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [STRESS_LEVEL], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [PHYSICAL_SYMPTOMS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [MENTAL_SYMPTOMS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [MENTAL], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [BODY_PARTS_AFFECTED], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [AFFECTED_BODY_PARTS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [AFFECTED], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [SYMPTOM_DURATION], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [SEVERITY], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [FOOD], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [MEDICATIONS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [MEDICATION], articles: [VISIT_DOCTOR_LABEL,DERMATOLOGIST_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [DAILY_LIFE], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [SOCIAL_INTERACTIONS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [GOOD_DAYS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [BAD_DAYS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [ONGOING_SYMPTOMS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [LIMITATIONS], articles: [VISIT_DOCTOR_LABEL] },
{ tagValue: [QUESTIONS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DOCTOR], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DERMATOLOGIST_APPOINTMENT], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DERMATOLOGIST], articles: [ASK_DOCTOR_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [DISEASE_MANAGEMENT_PLAN], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DISCUSSION], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [CONTROL], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [CREAMS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [HEALING], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DAILY_ACTIVITIES], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [HOSPITALIZATION], articles: [ASK_DOCTOR_LABEL,SEEK_MEDICARE_LABEL] },
{ tagValue: [DECISIONS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [PROS_AND_CONS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [SPECIFIC_QUESTIONS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [BEST_TREATMENT], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [TIMEFRAME], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [ALTERNATIVES], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [SIDE_EFFECTS], articles: [ASK_DOCTOR_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [SYMPTOMS_BETWEEN_FLARES], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [FLARES_WHILE_TRAVELING], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [FLARE_PREVENTION], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [SYMPTOM_IMPROVEMENT], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [DIET_OR_LIFESTYLE_CHANGES], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [PSYCHOLOGIST], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [COUNSELOR], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [RESOURCES], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [FLARE_ONSET], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [VIDEO_APPOINTMENTS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [TELEPHONE_APPOINTMENTS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [SUPPORT_GROUPS], articles: [ASK_DOCTOR_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [APPOINTMENTS], articles: [ASK_DOCTOR_LABEL] },
{ tagValue: [APPOINTMENT], articles: [ASK_DOCTOR_LABEL,DERMATOLOGIST_LABEL] },
{ tagValue: [SERIOUS], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [LIFE_THREATENING], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [KIDNEY_FAILURE], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [LIVER_FAILURE], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [LIVER], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [RESPIRATORY_FAILURE], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [HEART_FAILURE], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [MEDICAL_ALERT_BRACELET], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [CARD], articles: [SEEK_MEDICARE_LABEL] },
{ tagValue: [GOALS], articles: [DERMATOLOGIST_LABEL] },
{ tagValue: [GOAL], articles: [DERMATOLOGIST_LABEL] },
{ tagValue: [APPOINTMENT_PREPARATION], articles: [DERMATOLOGIST_LABEL] },
{ tagValue: [SKIN_DISEASE], articles: [DERMATOLOGIST_LABEL] },
{ tagValue: [ SUBCUTANEOUS], articles: [ PREVENTION_GPP_LABEL,SPEVIGO_INJECTION_LABEL] },

{ tagValue: [GPPMAINTENANCE], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [PREVENTINGFLARES], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [EFFISAYIL_2], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [CS_INJECTION], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [INJECTION], articles: [PREVENTION_GPP_LABEL,SPEVIGO_INJECTION_LABEL] },
{ tagValue: [CLINICAL_TRIAL], articles: [PREVENTION_GPP_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [CLINICAL_TRIALS], articles: [PREVENTION_GPP_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [PRO], articles: [PREVENTION_GPP_LABEL,TREATING_GPP_LABEL] },
{ tagValue: [WORSENING], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [EFFISAYIL], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [SELF_ADMINISTRATION], articles: [PREVENTION_GPP_LABEL] },
{ tagValue: [GUIDETOINJECTION], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SELFINJECTION], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SUBCUTANEOUS_INJECTION], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SC_INJECTION], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SC], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [INTERLEUKIN], articles: [SPEVIGO_INJECTION_LABEL,SPEVIGO_INJECTION_LABEL] },
{ tagValue: [SYRINGE], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [DOSE], articles: [SPEVIGO_INJECTION_LABEL] },
{ tagValue: [DOSAGE], articles: [SPEVIGO_INJECTION_LABEL] },





{ tagValue: [GUIDETOINFUSION], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [IV], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [SINGLE_DOSE_VIAL], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [SINGLE_DOSE], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [INFUSION_THERAPY], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [INFUSION_CENTER], articles: [SPEVIGO_INFUSION_LABEL] },
{ tagValue: [TREATINGFLARES], articles: [TREATING_GPP_LABEL] },
{ tagValue: [GENERALIZED_PUSTULAR_PSORIASIS], articles: [TREATING_GPP_LABEL] },
{ tagValue: [INTERLEUKIN_SEARCH], articles: [TREATING_GPP_LABEL] },
{ tagValue: [INTRAVENOUS_SEARCH], articles: [TREATING_GPP_LABEL] },
{ tagValue: [SKIN_LESIONS], articles: [TREATING_GPP_LABEL] },
{ tagValue: [EFFICACY], articles: [TREATING_GPP_LABEL] },
{ tagValue: [SAFETY], articles: [TREATING_GPP_LABEL] },
{ tagValue: [PLACEBO], articles: [TREATING_GPP_LABEL] },
{ tagValue: [GPPGA], articles: [TREATING_GPP_LABEL] }




]

export const TAGDATA = [
{
searchTermn: [GPP_TAG, FLARES_CAUSES],
standardItem: [
{ id: 1, title: GPP_SYMPTOMS },
{ id: 2, title: GPP_QUES }
]
},
{
searchTermn: [WHAT, WHY, WHO_OF_GPP],
standardItem: [
{ id: 3, title: GPP_QUES },
{ id: 4, title: CAUSES_GPP },
{ id: 5, title: GPP_CONTAGIOUS }
]
},
{
searchTermn: [CONTAGIOUSNESS, EXPLAIN_TO_OTHERS],
standardItem: [
{ id: 6, title: GPP_CONTAGIOUS },
{ id: 7, title: GPP_SPREAD },
{ id: 8, title: EXPLANING_GPP_LABEL }
]
},
{
searchTermn: [SCARPROCESS, DEAL_STRING],
standardItem: [
{ id: 9, title: SCAR_GPP },
{ id: 10, title: PROTECT_GPP }
]
},
{
searchTermn: [AVOID_COMPLICAT, PREGNANCY_SEARCH],
standardItem: [
{ id: 11, title: GPP_COMPLICAT },
{ id: 12, title: GPP_PREG }
]
},
{
searchTermn: [FLARES, SYMPTOMS_TO_RECOGNIZE],
standardItem: [
{ id: 13, title: GPP_FLARE },
{ id: 14, title: GPP_SYMPTOMS },
{ id: 15, title: GPP_TYPES }
]
},
{
searchTermn: [INCIDENCE, MEAN_OF_RARE_GPP,MEANING_OF_RARE],
standardItem: [
{ id: 16, title: RARE_OF_GPP },
{ id: 17, title: PEOPLE_WITH_GPP }
]
},
{
searchTermn: [ITS_TRIGGERS],
standardItem: [
{ id: 18, title: GPP_CAUSES },
{ id: 19, title: TRIGGERS_FOR_GPP }
]
},
{
searchTermn: [TALK_GPP_TO_HCP, COLLEGUESETC, HOW_TO],
standardItem: [
{ id: 20, title: EXPLANING_GPP_LABEL },
{ id: 21, title: TALKING_TO_HCP }
]
},
{
searchTermn: [LIVING_WITH_GPP, TIPS, MANAGE_FEELING_LABEL],
standardItem: [
{ id: 22, title: TIPS_ON_GPP },
{ id: 23, title: MANAGING_GPP },
{ id: 24, title: GPP_FEELINGS }
]
},
{
searchTermn: [SHARE_EXPERI, HOW_TO_TALK],
standardItem: [
{ id: 25, title: GPP_EXPERIENCES },
{ id: 26, title: SHARING },
{ id: 27, title: EXPLANING_GPP_LABEL }
]
},
{
searchTermn: [DIAGNOSIS_METHOD, ACCEPTANCE_TREATMENT],
standardItem: [
{ id: 28, title: GPP_DIAGNOSIS },
{ id: 29, title: SUPPORT_GPP },
{ id: 30, title: GPP_TREATMENT }
]
},
{
searchTermn: [STIGMA, CHALLENGES, GETTING_SUPPORT],
standardItem: [
{ id: 31, title: SUPPORT_GPP },
{ id: 32, title: GPP_CHALLENGES }
]
},
{
searchTermn: [CHOICES, EATING, ACTIVITY_ETC],
standardItem: [
{ id: 33, title: CHOICES_GPP },
{ id: 34, title: GPP_EAT },
{ id: 35, title: ACT_GPP }
]
},
{
searchTermn: [PREGN_GPP, CARE, HCP_INFO],
standardItem: [
{ id: 36, title: GPP_PREG },
{ id: 37, title: GPP_CARE },
{ id: 38, title: TALKING_TO_HCP }
]
},
{
searchTermn: [INTIMACY_STR, TALK_PARTNER, DISCOMFORT_STRING],
standardItem: [
{ id: 39, title: GPP_INTIMACY },
{ id: 40, title: GPP_DISCOMFORT },
{ id: 41, title: EXPLANING_GPP_LABEL }
]
},
{
searchTermn: [MANAGE_FLARES, MEDI_HELP],
standardItem: [
{ id: 42, title: MANAGE_GPP },
{ id: 43, title: SUPPORT_GPP }
]
},
{
searchTermn: [COMORBIDITIES, LETTING_HCP,WHAT_COMORBIDITIES],
standardItem: [
{ id: 44, title: GPP_COMORBIDITIES },
{ id: 45, title: SUPPORT_GPP },
{ id: 46, title: TALKING_TO_HCP }
]
},
{
searchTermn: [IMP_SIGNS, EMERCARE],
standardItem: [
{ id: 47, title:  GPP_FLARE},
{ id: 48, title:  GPP_SYMPTOMS},
{ id: 49, title:  GPP_TYPES},
{ id: 50, title:  GPP_TREATMENT}

]
},
{
searchTermn: [TREATMENT_HELP],
standardItem: [
{ id: 50, title: GPP_FLARE },
{ id: 51, title: GPP_SYMPTOMS },
{ id: 52, title: GPP_TREATMENT }
]
},
{
searchTermn: [RECOGNIZING_FLARES_LABEL],
standardItem: [
{ id: 571, title: GPP_FLARE },
{ id: 581, title: GPP_SYMPTOMS },
{ id: 591, title: GPP_TREATMENT },
{ id: 491, title: GPP_TYPES }
]
},
{
searchTermn: [SYMPTOM_LIST],
standardItem: [
{ id: 53, title: GPP_SYMPTOMS },
{ id: 54, title: TALKING_TO_HCP },
{ id: 55, title: GPP_VISIT }
]
},
{
searchTermn: [QS_ASK],
standardItem: [{ id: 56, title: TALKING_TO_HCP }]
},

{
searchTermn: [CHECKLIST, PREPARING_ADVANCE],
standardItem: [
{ id: 58, title: GPP_SYMPTOMS },
{ id: 57, title:  GPP_VISIT}

]
},
{
searchTermn: [GPP_FLARE_SPEVINFU],
standardItem: [
{ id: 57, title: GPP_FLARE_TREATMENT },
{ id: 58, title: EFFSAYIL_ONE },
{ id: 59, title:  SPEVIGO_INFUSION}
]
},
{
searchTermn: [PREVENTION_INJECT],
standardItem: [
{ id: 57, title: GPP_FLARE_PREVENTION },
{ id: 58, title: EFISAYIL_TWO },
{ id: 59, title:  SPEVIGO_INJECTION}
]
},
{
searchTermn: [PATIENT_INFUSION],
standardItem: [
{ id: 57, title: INFUSION },
{ id: 58, title: INTRAVENOUS },
{ id: 59, title:  HEALTH_CENTER}
]
},
{
searchTermn: [PATIENT_INJECTION],
standardItem: [
{ id: 57, title: SELF_INJECTION },
{ id: 58, title: SUBCUTANEOUS },
]
},
{
searchTermn: [SPEV_ACTION_DOSE],
standardItem: [
{ id: 57, title: IL36 },
{ id: 58, title: BLOCKING },
{ id: 59, title:  MECHANISM},
{ id: 60, title:  ACTION.toLowerCase()}

]
},
{
searchTermn: [BLOCKING, ACTION, MECHANISM, IL36 ],
standardItem: [
{ id: 57, title: IL36 },
{ id: 58, title: BLOCKING },
{ id: 59, title:  MECHANISM},
{ id: 60, title:  ACTION.toLowerCase()}

]
},
{
searchTermn: [SUBCUTANEOUS,SELF_INJECTION],
standardItem: [
{ id: 57, title: SELF_INJECTION },
{ id: 58, title:  SUBCUTANEOUS}
]
},{
searchTermn: [HEALTH_CENTER,INTRAVENOUS, INFUSION],
standardItem: [
{ id: 57, title: HEALTH_CENTER },
{ id: 58, title: INTRAVENOUS },
{ id: 59, title: INFUSION }

]
},{
searchTermn: [SPEVIGO_INJECTION, EFISAYIL_TWO, GPP_FLARE_PREVENTION],
standardItem: [
{ id: 57, title: GPP_FLARE_PREVENTION},
{ id: 58, title: EFISAYIL_TWO },
{ id: 59, title: SPEVIGO_INJECTION }

]
},{
searchTermn: [SPEVIGO_INFUSION, EFFSAYIL_ONE, GPP_FLARE_TREATMENT],
standardItem: [
{ id: 57, title: SPEVIGO_INFUSION},
{ id: 58, title: EFFSAYIL_ONE },
{ id: 59, title: GPP_FLARE_TREATMENT }

]
},{
searchTermn: [GPP_VISIT],
standardItem: [
{ id: 57, title: GPP_SYMPTOMS},
{ id: 58, title:  TALKING_TO_HCP},
{ id: 59, title:  GPP_VISIT}

]
},{
searchTermn: [GPP_COMORBIDITIES],
standardItem: [
{ id: 57, title: GPP_COMORBIDITIES},
{ id: 58, title:  SUPPORT_GPP},
{ id: 59, title:  TALKING_TO_HCP}

]
},
{
searchTermn: [MANAGE_GPP],
standardItem: [
{ id: 57, title: MANAGE_GPP},
{ id: 58, title:  SUPPORT_GPP}						
]
},{
searchTermn: [GPP_DISCOMFORT, GPP_INTIMACY],
standardItem: [
{ id: 57, title: GPP_DISCOMFORT},
{ id: 58, title:  GPP_INTIMACY},
{ id: 59, title:  EXPLANING_GPP_LABEL}

]
},{
searchTermn: [GPP_CARE],
standardItem: [
{ id: 57, title: GPP_PREG},
{ id: 58, title:  TALKING_TO_HCP},
{ id: 59, title:  GPP_CARE}

]
},{
searchTermn: [ACT_GPP,CHOICES_GPP,GPP_EAT],
standardItem: [
{ id: 57, title: CHOICES_GPP},
{ id: 58, title:  GPP_EAT},
{ id: 59, title:  ACT_GPP}

]
},{
searchTermn: [GPP_CHALLENGES],
standardItem: [
{ id: 57, title: GPP_CHALLENGES},
{ id: 58, title:  SUPPORT_GPP}
]
},{
searchTermn: [GPP_TREATMENT],
standardItem: [
{ id: 57, title: GPP_TREATMENT},
{ id: 58, title:  GPP_DIAGNOSIS},
{ id: 59, title:  SUPPORT_GPP},
{ id: 60, title:  GPP_FLARE},
{ id: 61, title:  GPP_SYMPTOMS}

]
},{
searchTermn: [SUPPORT_GPP],
standardItem: [
{ id: 57, title: GPP_DIAGNOSIS},
{ id: 58, title:  SUPPORT_GPP},
{ id: 59, title:  GPP_TREATMENT},
{ id: 60, title:  MANAGE_GPP},
{ id: 61, title:  GPP_COMORBIDITIES},
{ id: 62, title:  TALKING_TO_HCP},
{ id: 63, title:  GPP_CHALLENGES}



]
},{
searchTermn: [GPP_DIAGNOSIS],
standardItem: [
{ id: 57, title: GPP_DIAGNOSIS},
{ id: 58, title:  SUPPORT_GPP},
{ id: 59, title:  GPP_TREATMENT}
]
},{
searchTermn: [SHARING, GPP_EXPERIENCES],
standardItem: [
{ id: 57, title: SHARING},
{ id: 58, title:  GPP_EXPERIENCES},
{ id: 59, title:  EXPLANING_GPP_LABEL}
]
},{
searchTermn: [GPP_FEELINGS, MANAGING_GPP,TIPS_ON_GPP],
standardItem: [
{ id: 57, title: GPP_FEELINGS},
{ id: 58, title:  MANAGING_GPP},
{ id: 59, title:  TIPS_ON_GPP}
]
},{
searchTermn: [TALKING_TO_HCP],
standardItem: [
{ id: 57, title: EXPLANING_GPP_LABEL},
{ id: 58, title:  TALKING_TO_HCP},
{ id: 59, title:  GPP_PREG},
{ id: 60, title: GPP_COMORBIDITIES},
{ id: 61, title:  GPP_CARE},
{ id: 62, title:  SUPPORT_GPP},
{ id: 63, title: GPP_SYMPTOMS},
{ id: 64, title:  GPP_VISIT}																		]
},{
searchTermn: [EXPLANING_GPP_LABEL],
standardItem: [
{ id: 57, title: GPP_CONTAGIOUS},
{ id: 58, title:  GPP_SPREAD},
{ id: 59, title:  EXPLANING_GPP_LABEL},
{ id: 60, title: TALKING_TO_HCP},
{ id: 61, title:  GPP_EXPERIENCES},
{ id: 62, title:  SHARING},
{ id: 63, title: GPP_INTIMACY},
{ id: 64, title:  GPP_DISCOMFORT}																		]
},{
searchTermn: [TRIGGERS_FOR_GPP, GPP_CAUSES],
standardItem: [
{ id: 57, title: GPP_CAUSES},
{ id: 58, title:  TRIGGERS_FOR_GPP}
]
},{
searchTermn: [PEOPLE_WITH_GPP, RARE_OF_GPP],
standardItem: [
{ id: 57, title: PEOPLE_WITH_GPP},
{ id: 58, title:  RARE_OF_GPP}
]
},
{
searchTermn: [GPP_TYPES],
standardItem: [
{ id: 57, title: GPP_FLARE},
{ id: 58, title:  GPP_TYPES},
{ id: 59, title:  GPP_SYMPTOMS}

]
},
{
searchTermn: [GPP_FLARE],
standardItem: [
{ id: 57, title: GPP_FLARE},
{ id: 58, title:  GPP_SYMPTOMS},
{ id: 59, title:  GPP_TYPES},
{ id: 60, title:  GPP_TREATMENT}
]
},
{
searchTermn: [PREGN_GPP],
standardItem: [
{ id: 57, title: GPP_COMPLICAT},
{ id: 58, title:  PREGN_GPP},
{ id: 60, title:  TALK_GPP_TO_HCP}
]
},
{
searchTermn: [GPP_COMPLICAT],
standardItem: [
{ id: 57, title: GPP_COMPLICAT},
{ id: 58, title:  GPP_PREG}
]
},
{
searchTermn: [SCAR_GPP,PROTECT_GPP],
standardItem: [
{ id: 57, title: SCAR_GPP},
{ id: 58, title:  PROTECT_GPP}
]
},
{
searchTermn: [GPP_SPREAD],
standardItem: [
{ id: 57, title: GPP_CONTAGIOUS},
{ id: 58, title:  GPP_SPREAD},
{ id: 59, title: EXPLANING_GPP_LABEL}
]
},
{
searchTermn: [GPP_CONTAGIOUS],
standardItem: [
{ id: 57, title: GPP_QUES},
{ id: 58, title:  CAUSES_GPP},
{ id: 59, title: GPP_CONTAGIOUS},
{ id: 59, title: GPP_SPREAD},
{ id: 59, title: EXPLANING_GPP_LABEL}

]
},
{
searchTermn: [CAUSES_GPP],
standardItem: [
{ id: 57, title: CAUSES_GPP},
{ id: 58, title:  GPP_CONTAGIOUS},
{ id: 59, title: GPP_QUES}
]
},
{
searchTermn: [GPP_QUES],
standardItem: [
{ id: 57, title: GPP_SYMPTOMS},
{ id: 58, title:  CAUSES_GPP},
{ id: 59, title: GPP_QUES},
{ id: 60, title: GPP_CONTAGIOUS}

]
},
{
searchTermn: [GPP_PREG],
standardItem: [
{ id: 57, title: GPP_COMPLICAT},
{ id: 58, title:  GPP_PREG},
{ id: 59, title: GPP_CARE},
{ id: 60, title: TALKING_TO_HCP}

]
},
{
searchTermn: [GPP_SYMPTOMS],
standardItem: [
{ id: 57, title: GPP_SYMPTOMS},
{ id: 58, title:  GPP_QUES},
{ id: 59, title: GPP_FLARE},
{ id: 60, title: GPP_TYPES},
{ id: 61, title: GPP_TREATMENT},
{ id: 62, title: TALKING_TO_HCP},
{ id: 63, title: GPP_VISIT}

]
}
];
export default class BiPspbLabelForInfoCenter extends LightningElement {}