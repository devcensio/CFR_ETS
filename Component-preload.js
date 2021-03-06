jQuery.sap.registerPreloadedModules({
	"name": "cfr/etsapp/Component-preload",
	"version": "2.0",
	"modules": {
		"cfr/etsapp/Component.js": function() {
			/*
			 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
			 */
			jQuery.sap.declare("cfr.etsapp.manage.Component");
			jQuery.sap.require("sap.ca.scfld.md.ComponentBase");
			sap.ca.scfld.md.ComponentBase.extend("cfr.etsapp.manage.Component", {
				metadata: sap.ca.scfld.md.ComponentBase.createMetaData("FS", {
					"manifest": "json",
					"includes": [],
					"config": {
						"titleResource": "TIMESHEET_TITLE",
						"resourceBundle": "i18n/i18n.properties",
						"icon": "sap-icon://Fiori2/F0397",
						"favIcon": "./resources/sap/ca/ui/themes/base/img/favicon/My_Timesheet.ico",
						"homeScreenIconPhone": "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/57_iPhone_Desktop_Launch.png",
						"homeScreenIconPhone@2": "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/114_iPhone-Retina_Web_Clip.png",
						"homeScreenIconTablet": "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/72_iPad_Desktop_Launch.png",
						"homeScreenIconTablet@2": "./resources/sap/ca/ui/themes/base/img/launchicon/My_Timesheet/144_iPad_Retina_Web_Clip.png"
					},
					viewPath: "cfr.etsapp.manage.view",
					fullScreenPageRoutes: {
						"S3": {
							"pattern": "",
							"view": "S3"
						},
						"S31": {
							"pattern": "detail/{context}",
							"view": "S31"
						}
					}
				}),
				createContent: function() {
					var v = {
						component: this
					};
					return sap.ui.view({
						viewName: "cfr.etsapp.manage.Main",
						type: sap.ui.core.mvc.ViewType.XML,
						viewData: v
					});
				}
			});
		},
		"cfr/etsapp/Configuration.js": function() {
			jQuery.sap.declare("cfr.etsapp.manage.Configuration");
			jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
			jQuery.sap.require("sap.ca.scfld.md.app.Application");
			sap.ca.scfld.md.ConfigurationBase.extend("cfr.etsapp.manage.Configuration", {
				oServiceParams: {
					serviceList: [{
						name: "HCM_TIMESHEET_MAN_SRV",
						masterCollection: "Favorites",
						serviceUrl: cfr.etsapp.manage.Component.getMetadata().getManifestEntry("sap.app").dataSources["HCM_TIMESHEET_MAN_SRV"].uri,
						isDefault: true,
						mockedDataSource: "/hcm.emp.mytimesheet/model/metadata.xml"
					}]
				},
				getServiceParams: function() {
					return this.oServiceParams;
				},
				getAppConfig: function() {
					return this.oAppConfig;
				},
				getServiceList: function() {
					return this.oServiceParams.serviceList;
				}
			});
		},
		"cfr/etsapp/Main.controller.js": function() {
			sap.ui.controller("cfr.etsapp.manage.Main", {
				onInit: function() {
					jQuery.sap.require("sap.ca.scfld.md.Startup");
					sap.ca.scfld.md.Startup.init("cfr.etsapp.manage", this);
				},
				onExit: function() {
					try {
						jQuery.sap.require("cfr.etsapp.manage.utils.ConcurrentEmployment");
						var x = cfr.etsapp.manage.utils.ConcurrentEmployment.getControllerInstance();
						x.oCEDialog.Cancelled = true;
						x.oCEDialog.close();
						x.oApplication.pernr = "";
					} catch (e) {
						jQuery.sap.log.error("couldn't execute onExit", ["onExit failed in main controller"], ["cfr.etsapp.manage.Main"]);
					}
				}
			});
		},
		"cfr/etsapp/Main.view.xml": '<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<core:View xmlns:core="sap.ui.core"\n           xmlns="sap.m" controllerName="cfr.etsapp.manage.Main"  displayBlock="true" height="100%">\n        <App id="fioriContent" showHeader="false">\n        </App>\n</core:View>',
		"cfr/etsapp/i18n/i18n.properties": '# My Timesheet V2\n# __ldi.translation.uuid=98558aa0-590c-11e4-8ed6-0800200c9a66\n\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personnel Assignments\n\n#XFLD: label for from time\nFROM=from\n\n#XFLD: label for to time\nTO=to\n\n#XBUT: Button to cancel\nCANCEL=Cancel\n\n#XBUT: Button to close popover\nCLOSE=Close\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=YES\n\n#XBUT: Button to decline\nNO=NO\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=My Timesheet\n\n#XTIT:\nINTERNAL_ERROR = Internal Error\n\n#XTIT:\nERROR = Error\n\n#XFLD:\nINTERNAL_ERROR_BODY = There is an Internal error in the application related to the error handling\n\n# XTIT:\nFAV_DIALOG_BOX=Delete Favorites\n\n# XTIT: \nTIMESHEET=Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Create Entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Entry Details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Create Entry for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=January\n# XTIT: Month title for calendar\nMONTH_FULL_1=February\n# XTIT: Month title for calendar\nMONTH_FULL_2=March\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\n# XTIT: Month title for calendar\nMONTH_FULL_5=June\n# XTIT: Month title for calendar\nMONTH_FULL_6=July\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=October\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Action Required\n# XTIT: Legend filled day\nFILLED_DAY=Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejected\n# XFLD: Legend future working day\nWORKING_DAY=Working day\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Non-working day\n# XFLD: Legend selected working day\nSELECTED_DAY=Selected day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Selected Non-working day\n# XFLD: Legend current day\nCURRENT_DAY=Current day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total Missing Hours: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Save\n\n#XBUT: Button \nSUBMIT=Submit\n\n# XMSG\nFILL_ALL=Enter {0} hours for:\n\n#XFLD\nNO_TASK_TYPE=No Task Type\n\n#XFLD\nMISSING_DAYS=Missing Days:{0}\n\n#XBUT: Button\nHOME=Home\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Summary of time entries selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of time entries selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Summary of time entries selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} Hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} Hours / {1} Hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Target: {0} Hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} Time Assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 Time Assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=No Recordings\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} Hours Approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Save with time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Save without time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Manage favorites\n\n#XFLD: Week \nWEEK=Week\n\n#XFLD:\nMEET_TARGET_HOURS=Apply hours to:\n\n#XBUT\nALL_MISSING=All Missing Time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=Delete\n\n#XBUT: Copy Button Text\nCOPY=Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Add Entry\n\n#XFLD: label for duration\nDURATION=Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=Total Duration\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=End Time\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Select Favorite / Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=Select Worklist\n\n# XTIT: Favorite\nFAVORITE=Favorites\n\n# XTIT: Worklist\nWORKLIST=Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Load More\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Loading...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading...\n\n#XFLD: BLANK\nEMPTY=Empty\n\n#XFLD: None\nNONE=None\n\n#XFLD\nNO_WORKLIST = No worklist available\n\n#XFLD\nNO_FAVORITE = No favorites available\n\n# XTIT: Select\nSELECT=Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=Detail\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Request Submitted\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Please enter a favorite name\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Please enter some fields to store as your favorite\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Please enter a valid Duration\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Please enter valid Start and End Time\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Draft Saved Successfully\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorite Created\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorite Updated\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorite Deleted\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hours entered for this week.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Some entries are incorrect. Review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Time Entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0}hours {1}minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0}h {1}m\n\n#XBUT: Button to reset\nRESET=Reset\n\n#XBUT: Button to update\nUPDATE=Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Add Favorite\n\n#XBUT: Button to create\nCREATE=Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME= Existing Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME = New Favorite Name\n\n#XTIT: time\nTIME = Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Request Deleted\n\n#XTIT:\nWARNING = Warning',
		"cfr/etsapp/i18n/i18n_ar.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0627\\u062E\\u062A\\u0631 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u0645\\u0648\\u0638\\u0641\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u0645\\u0648\\u0638\\u0641\\u064A\\u0646\n\n#XFLD: label for from time\nFROM=\\u0645\\u0646\n\n#XFLD: label for to time\nTO=\\u0625\\u0644\\u0649\n\n#XBUT: Button to cancel\nCANCEL=\\u0625\\u0644\\u063A\\u0627\\u0621\n\n#XBUT: Button to close popover\nCLOSE=\\u0625\\u063A\\u0644\\u0627\\u0642\n\n#XBUT: Button to accept\nOK=\\u0645\\u0648\\u0627\\u0641\\u0642\n\n#XBUT: Button to affirm\nYES=\\u0646\\u0639\\u0645\n\n#XBUT: Button to decline\nNO=\\u0644\\u0627\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\n\n# XTIT: \nTIMESHEET_TITLE=\\u0633\\u062C\\u0644 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631 \\u0627\\u0644\\u062E\\u0627\\u0635 \\u0628\\u064A\n\n#XTIT:\nINTERNAL_ERROR=\\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A\n\n#XTIT:\nERROR=\\u062E\\u0637\\u0623\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u062D\\u062F\\u062B \\u062E\\u0637\\u0623 \\u062F\\u0627\\u062E\\u0644\\u064A \\u0645\\u0631\\u062A\\u0628\\u0637 \\u0628\\u0645\\u0639\\u0627\\u0644\\u062C\\u0629 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0641\\u064A \\u0627\\u0644\\u062A\\u0637\\u0628\\u064A\\u0642.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: \nTIMESHEET=\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0635\\u062D\\u064A\\u0641\\u0629 \\u0627\\u0644\\u062D\\u0636\\u0648\\u0631\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0633\\u0631\\u064A\\u0639\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0639\\u0644\\u0649\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0648\\u0642\\u062A\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0625\\u0646\\u0634\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0644\\u0639\\u062F\\u062F {0}\n\n# XTIT: Month short header\nMONTH_0=\\u064A\\u0646\\u0627\\u064A\\u0631\n# XTIT: Month short header\nMONTH_1=\\u0641\\u0628\\u0631\\u0627\\u064A\\u0631\n# XTIT: Month short header\nMONTH_2=\\u0645\\u0627\\u0631\\u0633\n# XTIT: Month short header\nMONTH_3=\\u0623\\u0628\\u0631\\u064A\\u0644\n# XTIT: Month short header\nMONTH_4=\\u0645\\u0627\\u064A\\u0648\n# XTIT: Month short header\nMONTH_5=\\u064A\\u0648\\u0646\\u064A\\u0648\n# XTIT: Month short header\nMONTH_6=\\u064A\\u0648\\u0644\\u064A\\u0648\n# XTIT: Month short header\nMONTH_7=\\u0623\\u063A\\u0633\\u0637\\u0633\n# XTIT: Month short header\nMONTH_8=\\u0633\\u0628\\u062A\\u0645\\u0628\\u0631\n# XTIT: Month short header\nMONTH_9=\\u0623\\u0643\\u062A\\u0648\\u0628\\u0631\n# XTIT: Month short header\nMONTH_10=\\u0646\\u0648\\u0641\\u0645\\u0628\\u0631\n# XTIT: Month short header\nMONTH_11=\\u062F\\u064A\\u0633\\u0645\\u0628\\u0631\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u064A\\u0646\\u0627\\u064A\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0641\\u0628\\u0631\\u0627\\u064A\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u0645\\u0627\\u0631\\u0633\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0623\\u0628\\u0631\\u064A\\u0644\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u0645\\u0627\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u064A\\u0648\\u0646\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u064A\\u0648\\u0644\\u064A\\u0648\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0623\\u063A\\u0633\\u0637\\u0633\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0633\\u0628\\u062A\\u0645\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u0623\\u0643\\u062A\\u0648\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u0646\\u0648\\u0641\\u0645\\u0628\\u0631\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u062F\\u064A\\u0633\\u0645\\u0628\\u0631\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0627\\u0644\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0637\\u0644\\u0648\\u0628\n# XTIT: Legend filled day\nFILLED_DAY=\\u062A\\u0645\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u0625\\u062C\\u0631\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0639\\u062A\\u0645\\u0650\\u062F \\u0645\\u0637\\u0644\\u0648\\u0628\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u0645\\u0631\\u0641\\u0648\\u0636\n# XFLD: Legend future working day\nWORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0645\\u0644\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u064A\\u0648\\u0645 \\u0639\\u0637\\u0644\\u0629\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u064A\\u0648\\u0645 \\u0627\\u0644\\u0639\\u0637\\u0644\\u0629 \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\n# XFLD: Legend current day\nCURRENT_DAY=\\u0627\\u0644\\u064A\\u0648\\u0645 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\n\n#XBUT: Button\nSAVE=\\u062D\\u0641\\u0638\n\n#XBUT: Button \nSUBMIT=\\u062A\\u0642\\u062F\\u064A\\u0645\n\n# XMSG\nFILL_ALL=\\u0623\\u062F\\u062E\\u0644 {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0640\\:\n\n#XFLD\nNO_TASK_TYPE=\\u0628\\u062F\\u0648\\u0646 \\u0646\\u0648\\u0639 \\u0645\\u0647\\u0645\\u0629\n\n#XFLD\nMISSING_DAYS=\\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F\\u0629\\: {0}\n\n#XBUT: Button\nHOME=\\u0627\\u0644\\u0635\\u0641\\u062D\\u0629 \\u0627\\u0644\\u0631\\u0626\\u064A\\u0633\\u064A\\u0629\n\n#XTIT: confirmation header\nCONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u062D\\u0630\\u0641\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u062A\\u0623\\u0643\\u064A\\u062F \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u062D\\u0630\\u0641\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629 \\u0644\\u0644\\u0625\\u0631\\u0633\\u0627\\u0644\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u0645\\u0644\\u062E\\u0635 \\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u062D\\u062F\\u062F\\u0629\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0639\\u062F\\u062F \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XBUT: Confirm Button\nCONFIRM=\\u062A\\u0623\\u0643\\u064A\\u062F\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0633\\u0627\\u0639\\u0629 / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0633\\u0627\\u0639\\u0627\\u062A / {1} \\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0627\\u0644\\u0645\\u0633\\u062A\\u0647\\u062F\\u0641\\: {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u0645\\u0646 \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u0644\\u0627 \\u062A\\u0648\\u062C\\u062F \\u062A\\u0639\\u064A\\u064A\\u0646\\u0627\\u062A\n\n#XMSG: No Recordings\nNO_RECORDING=\\u0644\\u0627 \\u064A\\u0648\\u062C\\u062F \\u062A\\u0633\\u062C\\u064A\\u0644\\u0627\\u062A\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=\\u062A\\u0645 \\u0627\\u0639\\u062A\\u0645\\u0627\\u062F {0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u062D\\u0641\\u0638 \\u0628\\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u062D\\u0641\\u0638 \\u0628\\u062F\\u0648\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u062D\\u0641\\u0638 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0625\\u062F\\u0627\\u0631\\u0629 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: Week \nWEEK=\\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639\n\n#XFLD:\nMEET_TARGET_HOURS=\\u062A\\u0637\\u0628\\u064A\\u0642 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0639\\u0644\\u0649\\:\n\n#XBUT\nALL_MISSING=\\u0627\\u0644\\u0648\\u0642\\u062A \\u0627\\u0644\\u0645\\u0641\\u0642\\u0648\\u062F \\u0628\\u0627\\u0644\\u0643\\u0627\\u0645\\u0644 ({0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A)\n\n#XBUT: Delete Button Text\nDELETE=\\u062D\\u0630\\u0641\n\n#XBUT: Copy Button Text\nCOPY=\\u0646\\u0633\\u062E\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0625\\u062F\\u062E\\u0627\\u0644\n\n#XFLD: label for duration\nDURATION=\\u0627\\u0644\\u0645\\u062F\\u0629\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u0625\\u062C\\u0645\\u0627\\u0644\\u064A \\u0627\\u0644\\u0645\\u062F\\u0629\n\n#XFLD: label for status\nSTATUS=\\u0627\\u0644\\u062D\\u0627\\u0644\\u0629\n\n#XFLD: label for start time\nSTART_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0628\\u062F\\u0621\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: label for end Time\nEND_TIME=\\u0648\\u0642\\u062A \\u0627\\u0644\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621\n\n#XFLD: label for note\nNOTE=\\u0645\\u0644\\u0627\\u062D\\u0638\\u0629\n\n#XBUT: Done button\nDONE=\\u062A\\u0645\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u064A\\u062F\\u0648\\u064A\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0623\\u0648 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u062A\\u062D\\u062F\\u064A\\u062F \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: Favorite\nFAVORITE=\\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Worklist\nWORKLIST=\\u0642\\u0627\\u0626\\u0645\\u0629 \\u0627\\u0644\\u0639\\u0645\\u0644\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u062A\\u062D\\u0645\\u064A\\u0644 \\u0627\\u0644\\u0645\\u0632\\u064A\\u062F...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0627\\u0644\\u0628\\u062D\\u062B \\u0641\\u064A \\u0627\\u0644\\u062E\\u0627\\u062F\\u0645...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u062C\\u0627\\u0631\\u064D \\u0627\\u0644\\u062A\\u062D\\u0645\\u064A\\u0644 ...\n\n#XFLD: BLANK\nEMPTY=\\u0641\\u0627\\u0631\\u063A\n\n#XFLD: None\nNONE=\\u0644\\u0627 \\u0634\\u064A\\u0621\n\n#XFLD\nNO_WORKLIST=\\u0628\\u062F\\u0648\\u0646 \\u0642\\u0627\\u0626\\u0645\\u0629 \\u0639\\u0645\\u0644 \\u0645\\u062A\\u0648\\u0641\\u0631\\u0629\n\n#XFLD\nNO_FAVORITE=\\u0644\\u0627 \\u062A\\u062A\\u0648\\u0641\\u0631 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n# XTIT: Select\nSELECT=\\u062D\\u062F\\u062F {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u062A\\u062D\\u062F\\u064A\\u062F\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u0628\\u062D\\u062B...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0633\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u062F\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u062F\\u0642\\u0627\\u0626\\u0642\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=\\u062A\\u0641\\u0627\\u0635\\u064A\\u0644\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u0627\\u0644\\u0625\\u0639\\u062F\\u0627\\u062F\\u0627\\u062A\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u0633\\u0648\\u0641 \\u064A\\u062A\\u0645 \\u062A\\u062C\\u0627\\u0647\\u0644 \\u0623\\u064A\\u0629 \\u0628\\u064A\\u0627\\u0646\\u0627\\u062A \\u0644\\u0645 \\u064A\\u062A\\u0645 \\u062D\\u0641\\u0638\\u0647\\u0627. \\u0647\\u0644 \\u062A\\u0631\\u064A\\u062F \\u0627\\u0644\\u0645\\u062A\\u0627\\u0628\\u0639\\u0629 \\u0628\\u0627\\u0644\\u062A\\u0623\\u0643\\u064A\\u062F\\u061F\n\n# XTIT: \nUNSAVED_CHANGES=\\u062A\\u063A\\u064A\\u064A\\u0631\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0645\\u062D\\u0641\\u0648\\u0638\\u0629\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u062A\\u0645 \\u062A\\u0642\\u062F\\u064A\\u0645 \\u0627\\u0644\\u0637\\u0644\\u0628.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0633\\u0645 \\u0645\\u0641\\u0636\\u0644\\u0629 \\u0641\\u064A \\u062D\\u0642\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644 "\\u062A\\u0639\\u064A\\u064A\\u0646 \\u0627\\u0644\\u0648\\u0642\\u062A".\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0627\\u062C\\u0639\\u0644 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u0644\\u0644\\u062A\\u062E\\u0632\\u064A\\u0646 \\u0643\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0644\\u062F\\u064A\\u0643.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u0627\\u0644\\u0631\\u062C\\u0627\\u0621 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0645\\u062F\\u0629 \\u0635\\u0627\\u0644\\u062D\\u0629.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0623\\u062F\\u062E\\u0644 \\u0648\\u0642\\u062A \\u0628\\u062F\\u0627\\u064A\\u0629 \\u0648\\u0627\\u0646\\u062A\\u0647\\u0627\\u0621 \\u0635\\u0627\\u0644\\u062D\\u064B\\u0627.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u062A\\u0645 \\u062D\\u0641\\u0638 \\u0627\\u0644\\u0645\\u0633\\u0648\\u062F\\u0629 \\u0628\\u0646\\u062C\\u0627\\u062D.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u062A\\u0645 \\u0625\\u0646\\u0634\\u0627\\u0621 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u062A\\u0645 \\u062A\\u062D\\u062F\\u064A\\u062B \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629.\n\n#XBUT:\nHELP=\\u0645\\u0633\\u0627\\u0639\\u062F\\u0629\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u062A\\u0645 \\u0625\\u062F\\u062E\\u0627\\u0644 {0}/{1} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A \\u0644\\u0647\\u0630\\u0627 \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0642\\u0645 \\u0628\\u062A\\u0634\\u063A\\u064A\\u0644 \\u0645\\u064A\\u0632\\u0629 \\u0627\\u0644\\u0645\\u0644\\u0621 \\u0627\\u0644\\u0645\\u0633\\u0628\\u0642 \\u0644\\u062A\\u0648\\u0632\\u064A\\u0639 \\u0633\\u0627\\u0639\\u0627\\u062A \\u0627\\u0644\\u0623\\u0633\\u0628\\u0648\\u0639 \\u0628\\u0633\\u0631\\u0639\\u0629 \\u0627\\u0633\\u062A\\u0646\\u0627\\u062F\\u064B\\u0627 \\u0625\\u0644\\u0649 \\u0622\\u062E\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0646\\u0627\\u062C\\u062D.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u0628\\u0639\\u0636 \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A \\u063A\\u064A\\u0631 \\u0635\\u062D\\u064A\\u062D\\u0629. \\u0628\\u0631\\u062C\\u0627\\u0621 \\u0645\\u0631\\u0627\\u062C\\u0639\\u0629 \\u062A\\u0641\\u0627\\u0635\\u064A\\u0644 \\u0627\\u0644\\u0623\\u062E\\u0637\\u0627\\u0621 \\u0648\\u0642\\u0645 \\u0628\\u062A\\u0635\\u062D\\u064A\\u062D \\u0627\\u0644\\u0625\\u062F\\u062E\\u0627\\u0644\\u0627\\u062A.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0} \\u0648{1} \\u0645\\u0646 \\u0627\\u0644\\u0623\\u064A\\u0627\\u0645 \\u0627\\u0644\\u0623\\u062E\\u0631\\u0649\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u062A\\u062D\\u0631\\u064A\\u0631 \\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0625\\u062F\\u062E\\u0627\\u0644 \\u0627\\u0644\\u0648\\u0642\\u062A \\u0644\\u0639\\u062F\\u062F {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0645\\u0646 \\u0627\\u0644\\u0633\\u0627\\u0639\\u0627\\u062A {1} \\u0645\\u0646 \\u0627\\u0644\\u062F\\u0642\\u0627\\u0626\\u0642\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0633{1} \\u062F\n\n#XBUT: Button to reset\nRESET=\\u0625\\u0639\\u0627\\u062F\\u0629 \\u062A\\u0639\\u064A\\u064A\\u0646\n\n#XBUT: Button to update\nUPDATE=\\u062A\\u062D\\u062F\\u064A\\u062B\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0625\\u0636\\u0627\\u0641\\u0629 \\u0645\\u0641\\u0636\\u0644\\u0629\n\n#XBUT: Button to create\nCREATE=\\u0625\\u0646\\u0634\\u0627\\u0621\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062D\\u0627\\u0644\\u064A\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0645\\u0641\\u0636\\u0644\\u0629 \\u0627\\u0644\\u062C\\u062F\\u064A\\u062F\n\n#XTIT: time\nTIME=\\u0627\\u0644\\u0648\\u0642\\u062A\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u062A\\u0645 \\u062D\\u0630\\u0641 \\u0627\\u0644\\u0637\\u0644\\u0628\n\n#XTIT:\nWARNING=\\u062A\\u062D\\u0630\\u064A\\u0631\n',
		"cfr/etsapp/i18n/i18n_bg.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0418\\u0437\\u0431\\u0435\\u0440\\u0435\\u0442\\u0435 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043F\\u0435\\u0440\\u0441\\u043E\\u043D\\u0430\\u043B\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F \\u043D\\u0430 \\u043F\\u0435\\u0440\\u0441\\u043E\\u043D\\u0430\\u043B\n\n#XFLD: label for from time\nFROM=\\u041E\\u0442\n\n#XFLD: label for to time\nTO=\\u0414\\u043E\n\n#XBUT: Button to cancel\nCANCEL=\\u041E\\u0442\\u043A\\u0430\\u0437\n\n#XBUT: Button to close popover\nCLOSE=\\u0417\\u0430\\u0442\\u0432\\u0430\\u0440\\u044F\\u043D\\u0435\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u0414\\u0430\n\n#XBUT: Button to decline\nNO=\\u041D\\u0435\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430\n\n# XTIT: \nTIMESHEET_TITLE=\\u041C\\u043E\\u044F \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0440\\u0430\\u0437\\u0447\\u0435\\u0442\n\n#XTIT:\nINTERNAL_ERROR=\\u0412\\u044A\\u0442\\u0440\\u0435\\u0448\\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0430\n\n#XTIT:\nERROR=\\u0413\\u0440\\u0435\\u0448\\u043A\\u0430\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u0412\\u044A\\u0437\\u043D\\u0438\\u043A\\u043D\\u0430 \\u0432\\u044A\\u0442\\u0440\\u0435\\u0448\\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0430 \\u0432 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0435\\u0442\\u043E, \\u0441\\u0432\\u044A\\u0440\\u0437\\u0430\\u043D\\u0430 \\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0438.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: \nTIMESHEET=\\u0417\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432\\u044A\\u0432 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0440\\u0430\\u0437\\u0447\\u0435\\u0442\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0411\\u044A\\u0440\\u0437\\u043E \\u0432\\u044A\\u0432\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u041F\\u0440\\u0438\\u043B\\u0430\\u0433\\u0430\\u043D\\u0435 \\u0437\\u0430\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0} \\u0434\\u043D\\u0438\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0437\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XTIT: Month short header\nMONTH_0=\\u042F\\u043D\\u0443\n# XTIT: Month short header\nMONTH_1=\\u0424\\u0435\\u0432\n# XTIT: Month short header\nMONTH_2=\\u041C\\u0430\\u0440\n# XTIT: Month short header\nMONTH_3=\\u0410\\u043F\\u0440\n# XTIT: Month short header\nMONTH_4=\\u041C\\u0430\\u0439\n# XTIT: Month short header\nMONTH_5=\\u042E\\u043D\\u0438\n# XTIT: Month short header\nMONTH_6=\\u042E\\u043B\\u0438\n# XTIT: Month short header\nMONTH_7=\\u0410\\u0432\\u0433\n# XTIT: Month short header\nMONTH_8=\\u0421\\u0435\\u043F\n# XTIT: Month short header\nMONTH_9=\\u041E\\u043A\\u0442\n# XTIT: Month short header\nMONTH_10=\\u041D\\u043E\\u0435\n# XTIT: Month short header\nMONTH_11=\\u0414\\u0435\\u043A\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u042F\\u043D\\u0443\\u0430\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0424\\u0435\\u0432\\u0440\\u0443\\u0430\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u041C\\u0430\\u0440\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0410\\u043F\\u0440\\u0438\\u043B\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u041C\\u0430\\u0439\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u042E\\u043D\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u042E\\u043B\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0410\\u0432\\u0433\\u0443\\u0441\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0421\\u0435\\u043F\\u0442\\u0435\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u041E\\u043A\\u0442\\u043E\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u041D\\u043E\\u0435\\u043C\\u0432\\u0440\\u0438\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u0414\\u0435\\u043A\\u0435\\u043C\\u0432\\u0440\\u0438\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0418\\u0437\\u0438\\u0441\\u043A\\u0432\\u0430 \\u0441\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435\n# XTIT: Legend filled day\nFILLED_DAY=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u041D\\u0435\\u043E\\u0431\\u0445\\u043E\\u0434\\u0438\\u043C\\u043E \\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435 \\u043D\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u044F\\u0432\\u0430\\u0449\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u041E\\u0442\\u0445\\u0432\\u044A\\u0440\\u043B\\u0435\\u043D\n# XFLD: Legend future working day\nWORKING_DAY=\\u0420\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u041D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D \\u043D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0434\\u0435\\u043D\n# XFLD: Legend current day\nCURRENT_DAY=\\u0422\\u0435\\u043A\\u0443\\u0449 \\u0434\\u0435\\u043D\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u041E\\u0431\\u0449\\u043E \\u043B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u0438 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435)\n\n#XBUT: Button\nSAVE=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Button \nSUBMIT=\\u0418\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n# XMSG\nFILL_ALL=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 {0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0437\\u0430\\:\n\n#XFLD\nNO_TASK_TYPE=\\u041D\\u044F\\u043C\\u0430 \\u0432\\u0438\\u0434 \\u0437\\u0430\\u0434\\u0430\\u0447\\u0430\n\n#XFLD\nMISSING_DAYS=\\u041B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u0438 \\u0434\\u043D\\u0438\\: {0}\n\n#XBUT: Button\nHOME=\\u041D\\u0430\\u0447\\u0430\\u043B\\u043E\n\n#XTIT: confirmation header\nCONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438, \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0437\\u0430 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438, \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0437\\u0430 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0449\\u0430\\u043D\\u0435\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u0438 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0411\\u0440\\u043E\\u0439 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0411\\u0440\\u043E\\u0439 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XBUT: Confirm Button\nCONFIRM=\\u041F\\u043E\\u0442\\u0432\\u044A\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0447\\u0430\\u0441 / {1} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0447\\u0430\\u0441\\u0430 / {1} \\u0447\\u0430\\u0441\\u0430\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0426\\u0435\\u043B\\: {0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u043E \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u041D\\u044F\\u043C\\u0430 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: No Recordings\nNO_RECORDING=\\u041D\\u044F\\u043C\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u0447\\u0430\\u0441\\u0430 \\u043E\\u0434\\u043E\\u0431\\u0440\\u0435\\u043D\\u0438\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u0441 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u0431\\u0435\\u0437 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u0417\\u0430\\u043F\\u0430\\u0437\\u0432\\u0430\\u043D\\u0435 \\u043A\\u0430\\u0442\\u043E \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0423\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XFLD: Week \nWEEK=\\u0421\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\n\n#XFLD:\nMEET_TARGET_HOURS=\\u041F\\u0440\\u0438\\u043B\\u0430\\u0433\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0437\\u0430\\:\n\n#XBUT\nALL_MISSING=\\u0426\\u044F\\u043B\\u043E\\u0442\\u043E \\u043B\\u0438\\u043F\\u0441\\u0432\\u0430\\u0449\\u043E \\u0432\\u0440\\u0435\\u043C\\u0435 ({0} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435)\n\n#XBUT: Delete Button Text\nDELETE=\\u0418\\u0437\\u0442\\u0440\\u0438\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Copy Button Text\nCOPY=\\u041A\\u043E\\u043F\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n#XFLD: label for duration\nDURATION=\\u041F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u041E\\u0431\\u0449\\u043E \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442\n\n#XFLD: label for status\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD: label for start time\nSTART_TIME=\\u041D\\u0430\\u0447\\u0430\\u043B\\u0435\\u043D \\u0447\\u0430\\u0441\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0418\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XFLD: label for end Time\nEND_TIME=\\u041A\\u0440\\u0430\\u0435\\u043D \\u0447\\u0430\\u0441\n\n#XFLD: label for note\nNOTE=\\u0417\\u0430\\u0431\\u0435\\u043B\\u0435\\u0436\\u043A\\u0430\n\n#XBUT: Done button\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u0420\\u044A\\u0447\\u043D\\u043E\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u0418\\u0437\\u0431\\u043E\\u0440 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442 \\u043E\\u0442 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0418\\u0437\\u0431\\u043E\\u0440 \\u043D\\u0430 \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: Favorite\nFAVORITE=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: Worklist\nWORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043E\\u0449\\u0435 ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u041F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0430\\u0432\\u0430 \\u0442\\u044A\\u0440\\u0441\\u0435\\u043D\\u0435 \\u043D\\u0430 \\u0441\\u044A\\u0440\\u0432\\u044A\\u0440...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u0417\\u0430\\u0440\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435...\n\n#XFLD: BLANK\nEMPTY=\\u041F\\u0440\\u0430\\u0437\\u043D\\u043E\n\n#XFLD: None\nNONE=\\u041D\\u044F\\u043C\\u0430\n\n#XFLD\nNO_WORKLIST=\\u041D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u0435\\u043D \\u0440\\u0430\\u0431\\u043E\\u0442\\u0435\\u043D \\u0441\\u043F\\u0438\\u0441\\u044A\\u043A\n\n#XFLD\nNO_FAVORITE=\\u041D\\u044F\\u043C\\u0430 \\u043D\\u0430\\u043B\\u0438\\u0447\\u043D\\u0438 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u0438\n\n# XTIT: Select\nSELECT=\\u0418\\u0437\\u0431\\u0435\\u0440\\u0435\\u0442\\u0435 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u0418\\u0437\\u0431\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u0422\\u044A\\u0440\\u0441\\u0435\\u043D\\u0435...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0447\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u043C\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0427\\u0430\\u0441\\u043E\\u0432\\u0435\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u041C\\u0438\\u043D\\u0443\\u0442\\u0438\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=\\u041C\\u041C\\u041C \\u0414\\u0414, \\u0413\\u0413\\u0413\\u0413\n\n#XBUT:\nDETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438 \\u0434\\u0430\\u043D\\u043D\\u0438\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0449\\u0435 \\u0431\\u044A\\u0434\\u0430\\u0442 \\u0438\\u0437\\u0433\\u0443\\u0431\\u0435\\u043D\\u0438. \\u0421\\u0438\\u0433\\u0443\\u0440\\u043D\\u0438 \\u043B\\u0438 \\u0441\\u0442\\u0435, \\u0447\\u0435 \\u0436\\u0435\\u043B\\u0430\\u0435\\u0442\\u0435 \\u0434\\u0430 \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435?\n\n# XTIT: \nUNSAVED_CHANGES=\\u041D\\u0435\\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0438 \\u043F\\u0440\\u043E\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0435 \\u0438\\u0437\\u043F\\u0440\\u0430\\u0442\\u0435\\u043D\\u0430.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u041C\\u043E\\u043B\\u044F, \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442 \\u0432 \\u043F\\u043E\\u043B\\u0435\\u0442\\u043E \\u0437\\u0430 \\u0432\\u044A\\u0432\\u0435\\u0436\\u0434\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u043F\\u0440\\u0438\\u0441\\u044A\\u0435\\u0434\\u0438\\u043D\\u044F\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438, \\u0437\\u0430 \\u0434\\u0430 \\u0433\\u0438 \\u0441\\u044A\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u0435 \\u043A\\u0430\\u0442\\u043E \\u0432\\u0430\\u0448 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u041C\\u043E\\u043B\\u044F, \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0432\\u0430\\u043B\\u0438\\u0434\\u043D\\u0430 \\u043F\\u0440\\u043E\\u0434\\u044A\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E\\u0441\\u0442.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0412\\u044A\\u0432\\u0435\\u0434\\u0435\\u0442\\u0435 \\u0432\\u0430\\u043B\\u0438\\u0434\\u0435\\u043D \\u043D\\u0430\\u0447\\u0430\\u043B\\u0435\\u043D \\u0438 \\u043A\\u0440\\u0430\\u0435\\u043D \\u0447\\u0430\\u0441.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u0427\\u0435\\u0440\\u043D\\u043E\\u0432\\u0430 \\u0435 \\u0443\\u0441\\u043F\\u0435\\u0448\\u043D\\u043E \\u0437\\u0430\\u043F\\u0430\\u0437\\u0435\\u043D\\u0430.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0441\\u044A\\u0437\\u0434\\u0430\\u0434\\u0435\\u043D.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0430\\u043A\\u0442\\u0443\\u0430\\u043B\\u0438\\u0437\\u0438\\u0440\\u0430\\u043D.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u0424\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\\u044A\\u0442 \\u0435 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0442.\n\n#XBUT:\nHELP=\\u041F\\u043E\\u043C\\u043E\\u0449\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435 \\u0432\\u044A\\u0432\\u0435\\u0434\\u0435\\u043D\\u0438 \\u0437\\u0430 \\u0442\\u0430\\u0437\\u0438 \\u0441\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0412\\u043A\\u043B\\u044E\\u0447\\u0435\\u0442\\u0435 \\u043F\\u0440\\u0435\\u0434\\u0432\\u0430\\u0440\\u0438\\u0442\\u0435\\u043B\\u043D\\u043E \\u043F\\u043E\\u043F\\u044A\\u043B\\u0432\\u0430\\u043D\\u0435 \\u0437\\u0430 \\u0431\\u044A\\u0440\\u0437\\u043E \\u043F\\u043E\\u043F\\u044A\\u043B\\u0432\\u0430\\u043D\\u0435 \\u043D\\u0430 \\u0447\\u0430\\u0441\\u043E\\u0432\\u0435\\u0442\\u0435 \\u0437\\u0430 \\u0441\\u0435\\u0434\\u043C\\u0438\\u0446\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u0431\\u0430\\u0437\\u0430\\u0442\\u0430 \\u043D\\u0430 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u043D\\u0438\\u0442\\u0435 \\u0443\\u0441\\u043F\\u0435\\u0448\\u043D\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u041D\\u044F\\u043A\\u043E\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0441\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043D\\u0438. \\u041C\\u043E\\u043B\\u044F, \\u043F\\u0440\\u0435\\u0433\\u043B\\u0435\\u0434\\u0430\\u0439\\u0442\\u0435 \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u0438\\u0442\\u0435 \\u0434\\u0430\\u043D\\u043D\\u0438 \\u0437\\u0430 \\u0433\\u0440\\u0435\\u0448\\u043A\\u0438\\u0442\\u0435 \\u0438 \\u043A\\u043E\\u0440\\u0438\\u0433\\u0438\\u0440\\u0430\\u0439\\u0442\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438\\u0442\\u0435.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0417\\u0430\\u043F\\u0438\\u0441 \\u0432\\u0440\\u0435\\u043C\\u0435 \\u0437\\u0430 {0} \\u0438 {1} \\u043F\\u043E\\u0432\\u0435\\u0447\\u0435 \\u0434\\u043D\\u0438\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0446\\u0438\\u044F \\u043D\\u0430 \\u0432\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0412\\u0440\\u0435\\u043C\\u0435\\u0432\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441 \\u0437\\u0430 {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0447\\u0430\\u0441\\u0430 {1} \\u043C\\u0438\\u043D\\u0443\\u0442\\u0438\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\n\n#XBUT: Button to reset\nRESET=\\u041F\\u043E\\u0432\\u0442\\u043E\\u0440\\u043D\\u043E \\u0437\\u0430\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435\n\n#XBUT: Button to update\nUPDATE=\\u0410\\u043A\\u0442\\u0443\\u0430\\u043B\\u0438\\u0437\\u0438\\u0440\\u0430\\u043D\\u0435\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0414\\u043E\\u0431\\u0430\\u0432\\u044F\\u043D\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XBUT: Button to create\nCREATE=\\u0421\\u044A\\u0437\\u0434\\u0430\\u0432\\u0430\\u043D\\u0435\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0422\\u0435\\u043A\\u0443\\u0449\\u043E \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u041D\\u043E\\u0432\\u043E \\u0438\\u043C\\u0435 \\u043D\\u0430 \\u0444\\u0430\\u0432\\u043E\\u0440\\u0438\\u0442\n\n#XTIT: time\nTIME=\\u0412\\u0440\\u0435\\u043C\\u0435\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430\\u0442\\u0430 \\u0435 \\u0438\\u0437\\u0442\\u0440\\u0438\\u0442\\u0430\n\n#XTIT:\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n',
		"cfr/etsapp/i18n/i18n_cs.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Zvolte pracovn\\u00ED smlouvu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pracovn\\u00ED smlouvy\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Zru\\u0161it\n\n#XBUT: Button to close popover\nCLOSE=Zav\\u0159\\u00EDt\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ano\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Ulo\\u017Eit n\\u00E1vrh\n\n# XTIT: \nTIMESHEET_TITLE=Moje evidence \\u010Dasu\n\n#XTIT:\nINTERNAL_ERROR=Intern\\u00ED chyba\n\n#XTIT:\nERROR=Chyba\n\n#XFLD:\nINTERNAL_ERROR_BODY=V aplikaci do\\u0161lo k intern\\u00ED chyb\\u011B souvisej\\u00EDc\\u00ED se zpracov\\u00E1n\\u00EDm chyby.\n\n# XTIT:\nFAV_DIALOG_BOX=Vymazat obl\\u00EDben\\u00E9\n\n# XTIT: \nTIMESHEET=Z\\u00E1znamy evidence \\u010Dasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=Rychl\\u00FD z\\u00E1znam\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Pou\\u017E\\u00EDt na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaily\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Vytvo\\u0159it \\u010Dasov\\u00FD z\\u00E1znam\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0} dn\\u00ED\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detaily z\\u00E1znamu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detaily z\\u00E1znamu pro {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Vytvo\\u0159it z\\u00E1znam pro {0}\n\n# XTIT: Month short header\nMONTH_0=Led\n# XTIT: Month short header\nMONTH_1=\\u00DAno\n# XTIT: Month short header\nMONTH_2=B\\u0159e\n# XTIT: Month short header\nMONTH_3=Dub\n# XTIT: Month short header\nMONTH_4=Kv\\u011B\n# XTIT: Month short header\nMONTH_5=\\u010Cer\n# XTIT: Month short header\nMONTH_6=\\u010Cvc\n# XTIT: Month short header\nMONTH_7=Srp\n# XTIT: Month short header\nMONTH_8=Z\\u00E1\\u0159\n# XTIT: Month short header\nMONTH_9=\\u0158\\u00EDj\n# XTIT: Month short header\nMONTH_10=Lis\n# XTIT: Month short header\nMONTH_11=Pro\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Leden\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u00DAnor\n# XTIT: Month title for calendar\nMONTH_FULL_2=B\\u0159ezen\n# XTIT: Month title for calendar\nMONTH_FULL_3=Duben\n# XTIT: Month title for calendar\nMONTH_FULL_4=Kv\\u011Bten\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u010Cerven\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u010Cervenec\n# XTIT: Month title for calendar\nMONTH_FULL_7=Srpen\n# XTIT: Month title for calendar\nMONTH_FULL_8=Z\\u00E1\\u0159\\u00ED\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u0158\\u00EDjen\n# XTIT: Month title for calendar\nMONTH_FULL_10=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_11=Prosinec\n\n# XTIT: Legend missing day\nMISSING_DAY=Vy\\u017Eadov\\u00E1na akce\n# XTIT: Legend filled day\nFILLED_DAY=Hotovo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Je po\\u017Eadov\\u00E1na akce schvalovatele\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zam\\u00EDtnuto\n# XFLD: Legend future working day\nWORKING_DAY=Pracovn\\u00ED den\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nepracovn\\u00ED den\n# XFLD: Legend selected working day\nSELECTED_DAY=Vybran\\u00FD den\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Vybran\\u00FD nepracovn\\u00ED den\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1ln\\u00ED den\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Celkem chyb\\u00ED hodin\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hodin)\n\n#XBUT: Button\nSAVE=Ulo\\u017Eit\n\n#XBUT: Button \nSUBMIT=Odeslat\n\n# XMSG\nFILL_ALL=Zadat {0} hodin pro\\:\n\n#XFLD\nNO_TASK_TYPE=\\u017D\\u00E1dn\\u00FD typ \\u00FAlohy\n\n#XFLD\nMISSING_DAYS=Chyb\\u011Bj\\u00EDc\\u00ED dny\\:  {0}\n\n#XBUT: Button\nHOME=Dom\\u016F\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrzen\\u00ED\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdit vymaz\\u00E1n\\u00ED\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdit odesl\\u00E1n\\u00ED\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdit n\\u00E1vrh\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F k vymaz\\u00E1n\\u00ED\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Souhrn \\u010Dasov\\u00FDch z\\u00E1znam\\u016F vybran\\u00FDch k odesl\\u00E1n\\u00ED\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Souhrn vybran\\u00FDch \\u010Dasov\\u00FDch z\\u00E1znam\\u016F\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Po\\u010Det z\\u00E1znam\\u016F\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Po\\u010Det hodin\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdit\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hodina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hodin\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hodina / {1} hodiny \n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hodin / {1} hodin\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=C\\u00EDl\\: {0} hodin \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\\: {0} \n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=Jednor\\u00E1zov\\u00E9 p\\u0159i\\u0159azen\\u00ED\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u017D\\u00E1dn\\u00E9 p\\u0159i\\u0159azen\\u00ED\n\n#XMSG: No Recordings\nNO_RECORDING=\\u017D\\u00E1dn\\u00E9 z\\u00E1znamy\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=Schv\\u00E1len\\u00E9 hodiny\\: {0} \n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ulo\\u017Eit s \\u010Dasem\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ulo\\u017Eit bez \\u010Dasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Vymazat obl\\u00EDben\\u00E9\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ulo\\u017Eit jako obl\\u00EDben\\u00E9\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Spr\\u00E1va obl\\u00EDben\\u00FDch\n\n#XFLD: Week \nWEEK=T\\u00FDden\n\n#XFLD:\nMEET_TARGET_HOURS=Pou\\u017E\\u00EDt hodiny na\\:\n\n#XBUT\nALL_MISSING=Ve\\u0161ker\\u00FD chyb\\u011Bj\\u00EDc\\u00ED \\u010Das (hodin\\: {0})\n\n#XBUT: Delete Button Text\nDELETE=Vymazat\n\n#XBUT: Copy Button Text\nCOPY=Kop\\u00EDrov\\u00E1n\\u00ED\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=P\\u0159idat z\\u00E1znam\n\n#XFLD: label for duration\nDURATION=Trv\\u00E1n\\u00ED\n\n#XFLD: label for total duration\nTOTAL_DURATION=Celkov\\u00E9 trv\\u00E1n\\u00ED\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Po\\u010D\\u00E1te\\u010Dn\\u00ED \\u010Das\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=N\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas ukon\\u010Den\\u00ED\n\n#XFLD: label for note\nNOTE=Pozn\\u00E1mka\n\n#XBUT: Done button\nDONE=Hotovo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1ln\\u011B\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Upravit z\\u00E1znam\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=P\\u0159i\\u0159azen\\u00ED \\u010Dasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Vybrat obl\\u00EDben\\u00E9 nebo z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: select worklist\nSELECT_WORKLIST=Vybrat z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: Favorite\nFAVORITE=Obl\\u00EDben\\u00E9\n\n# XTIT: Worklist\nWORKLIST=Z\\u00E1soba pr\\u00E1ce\n\n# XTIT: Add Favorite\nADD_FAVORITE=P\\u0159idat k obl\\u00EDben\\u00FDm\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Upravit obl\\u00EDben\\u00E9\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Na\\u010D\\u00EDst v\\u00EDce...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Pokra\\u010Dovat v hled\\u00E1n\\u00ED na serveru...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Na\\u010D\\u00EDt\\u00E1n\\u00ED...\n\n#XFLD: BLANK\nEMPTY=Pr\\u00E1zdn.\n\n#XFLD: None\nNONE=Nic\n\n#XFLD\nNO_WORKLIST=Z\\u00E1soba pr\\u00E1ce nen\\u00ED k dispozici\n\n#XFLD\nNO_FAVORITE=Nejsou k dispozici \\u017E\\u00E1dn\\u00E9 obl\\u00EDben\\u00E9 polo\\u017Eky\n\n# XTIT: Select\nSELECT=Vybrat {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Vybrat\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Hled\\u00E1n\\u00ED...\n\n#XFLD: short label for hours\nHOURS_LABEL=hod.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min.\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hodiny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, RRRR\n\n#XBUT:\nDETAIL=Detaily\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastaven\\u00ED\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=V\\u0161echna neulo\\u017Een\\u00E1 data budou zru\\u0161ena. Chcete pokra\\u010Dovat?\n\n# XTIT: \nUNSAVED_CHANGES=Neulo\\u017Een\\u00E9 zm\\u011Bny\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Po\\u017Eadavek byl odesl\\u00E1n.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zadejte n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky do vstupn\\u00EDho pole p\\u0159i\\u0159azen\\u00ED \\u010Dasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vypl\\u0148te z\\u00E1znamy k ulo\\u017Een\\u00ED mezi obl\\u00ED\\u017Een\\u00E9 polo\\u017Eky.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Zadejte platn\\u00E9 trv\\u00E1n\\u00ED.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Zadejte platn\\u00FD po\\u010D\\u00E1te\\u010Dn\\u00ED a koncov\\u00FD \\u010Das.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=N\\u00E1vrh byl \\u00FAsp\\u011B\\u0161n\\u011B ulo\\u017Een.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vytvo\\u0159ena.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla aktualizov\\u00E1na.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Obl\\u00EDben\\u00E1 polo\\u017Eka byla vymaz\\u00E1na.\n\n#XBUT:\nHELP=N\\u00E1pov\\u011Bda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hodin zad\\u00E1no pro tento t\\u00FDden\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Zapnout automatick\\u00E9 vypln\\u011Bn\\u00ED a rychle vyplnit hodiny pro dan\\u00FD t\\u00FDden na z\\u00E1klad\\u011B posledn\\u00EDho \\u00FAsp\\u011B\\u0161n\\u00E9ho z\\u00E1znamu.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=N\\u011Bkter\\u00E9 z\\u00E1znamy nejsou spr\\u00E1vn\\u00E9. Zkontrolujte detaily chyby a opravte z\\u00E1znamy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Evidence \\u010Dasu pro {0} a {1} dal\\u0161\\u00EDch dn\\u00ED\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Upravit \\u010Dasov\\u00FD z\\u00E1znam\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u010Casov\\u00FD z\\u00E1znam pro {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hodin {1} minut\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} hod. {1} min.\n\n#XBUT: Button to reset\nRESET=Resetovat\n\n#XBUT: Button to update\nUPDATE=Aktualizovat\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=P\\u0159idat k obl\\u00EDben\\u00FDm\n\n#XBUT: Button to create\nCREATE=Vytvo\\u0159it\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1ln\\u00ED n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nov\\u00FD n\\u00E1zev obl\\u00EDben\\u00E9 polo\\u017Eky\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Po\\u017Eadavek vymaz\\u00E1n\n\n#XTIT:\nWARNING=Upozorn\\u011Bn\\u00ED\n',
		"cfr/etsapp/i18n/i18n_de.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=W\\u00E4hlen Sie einen Besch\\u00E4ftigungsvertrag\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Besch\\u00E4ftigungsvertr\\u00E4ge\n\n#XFLD: label for from time\nFROM=Von\n\n#XFLD: label for to time\nTO=Bis\n\n#XBUT: Button to cancel\nCANCEL=Abbrechen\n\n#XBUT: Button to close popover\nCLOSE=Schlie\\u00DFen\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ja\n\n#XBUT: Button to decline\nNO=Nein\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Entwurf sichern\n\n# XTIT: \nTIMESHEET_TITLE=Zeiterfassung\n\n#XTIT:\nINTERNAL_ERROR=Interner Fehler\n\n#XTIT:\nERROR=Fehler\n\n#XFLD:\nINTERNAL_ERROR_BODY=In der Anwendung ist bei der Fehlerbehandlung ein interner Fehler aufgetreten.\n\n# XTIT:\nFAV_DIALOG_BOX=Favoriten l\\u00F6schen\n\n# XTIT: \nTIMESHEET=Arbeitszeiteintr\\u00E4ge\n\n#XBUT: Button for quick entry\nQUICK_FILL=Schnellerfassung\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Anwenden auf\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Zeiteintrag anlegen\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Zeit f\\u00FCr {0} Tage erfassen\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Details zum Eintrag\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Zeiterfassung \\u2013 Details f\\u00FCr {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Zeit f\\u00FCr {0} erfassen\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=M\\u00E4r\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dez\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=M\\u00E4rz\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juni\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juli\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dezember\n\n# XTIT: Legend missing day\nMISSING_DAY=Aktion erforderlich\n# XTIT: Legend filled day\nFILLED_DAY=Fertig\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Genehmigung ausstehend\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Abgelehnt\n# XFLD: Legend future working day\nWORKING_DAY=Arbeitstag\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Arbeitsfreier Tag\n# XFLD: Legend selected working day\nSELECTED_DAY=Ausgew\\u00E4hlter Tag\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Ausgew\\u00E4hlter arbeitsfreier Tag\n# XFLD: Legend current day\nCURRENT_DAY=Aktueller Tag\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Insgesamt fehlende Stunden\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} Stunden)\n\n#XBUT: Button\nSAVE=Sichern\n\n#XBUT: Button \nSUBMIT=Absenden\n\n# XMSG\nFILL_ALL={0} Stunden erfassen f\\u00FCr\\:\n\n#XFLD\nNO_TASK_TYPE=Kein Aufgabentyp\n\n#XFLD\nMISSING_DAYS=Fehlende Tage\\: {0}\n\n#XBUT: Button\nHOME=Startseite\n\n#XTIT: confirmation header\nCONFIRMATION=Best\\u00E4tigung\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=L\\u00F6schen best\\u00E4tigen\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Senden best\\u00E4tigen\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Entwurf best\\u00E4tigen\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum L\\u00F6schen ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber zum Senden ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u00DCbersicht \\u00FCber ausgew\\u00E4hlte Zeiteintr\\u00E4ge\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Anzahl der Eintr\\u00E4ge\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Stundenanzahl\n\n#XBUT: Confirm Button\nCONFIRM=Best\\u00E4tigen\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Stunde\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} Stunden\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} Stunde/{1} Stunden\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} Stunden/{1} Stunden\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Soll\\: {0} Stunden \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} Zeitzuordnungen\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 Zeitzuordnung\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Keine Zuordnungen\n\n#XMSG: No Recordings\nNO_RECORDING=Keine Datens\\u00E4tze\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} Stunden genehmigt\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Mit Zeit sichern\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ohne Zeit sichern\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Favoriten l\\u00F6schen\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Als Favorit sichern\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Favoriten verwalten\n\n#XFLD: Week \nWEEK=Woche\n\n#XFLD:\nMEET_TARGET_HOURS=Stunden anwenden auf\\:\n\n#XBUT\nALL_MISSING=Alle fehlenden Zeiten ({0} Stunden)\n\n#XBUT: Delete Button Text\nDELETE=L\\u00F6schen\n\n#XBUT: Copy Button Text\nCOPY=Kopieren\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Eintrag hinzuf\\u00FCgen\n\n#XFLD: label for duration\nDURATION=Dauer\n\n#XFLD: label for total duration\nTOTAL_DURATION=Gesamtdauer\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Beginn (Zeit)\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favoritenname\n\n#XFLD: label for end Time\nEND_TIME=Ende (Zeit)\n\n#XFLD: label for note\nNOTE=Notiz\n\n#XBUT: Done button\nDONE=Fertig\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuell\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Eintrag bearbeiten\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Zeitzuordnung\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Favorit oder Arbeitsvorrat ausw\\u00E4hlen\n\n# XTIT: select worklist\nSELECT_WORKLIST=Arbeitsvorrat ausw\\u00E4hlen\n\n# XTIT: Favorite\nFAVORITE=Favoriten\n\n# XTIT: Worklist\nWORKLIST=Arbeitsvorrat\n\n# XTIT: Add Favorite\nADD_FAVORITE=Favorit hinzuf\\u00FCgen\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Favoriten bearbeiten\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Weitere laden ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Ladevorgang l\\u00E4uft ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Suche auf Server fortsetzen ...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Ladevorgang l\\u00E4uft ...\n\n#XFLD: BLANK\nEMPTY=Leer\n\n#XFLD: None\nNONE=Keine\n\n#XFLD\nNO_WORKLIST=Kein Arbeitsvorrat verf\\u00FCgbar\n\n#XFLD\nNO_FAVORITE=Keine Favoriten verf\\u00FCgbar\n\n# XTIT: Select\nSELECT={0} ausw\\u00E4hlen\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Ausw\\u00E4hlen\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Suche...\n\n#XFLD: short label for hours\nHOURS_LABEL=Std.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=Min.\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Stunden\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuten\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM YYYY\n\n#XBUT:\nDETAIL=Details\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Einstellungen\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Ungesicherte Daten gehen verloren. M\\u00F6chten Sie fortfahren?\n\n# XTIT: \nUNSAVED_CHANGES=Ungesicherte \\u00C4nderungen\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Der Antrag wurde gesendet.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Geben Sie im Bereich \'\'Zeitzuordnung\'\' einen Favoritennamen ein.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Nehmen Sie Eintr\\u00E4ge vor, die sie als Favoriten hinterlegen m\\u00F6chten.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Geben Sie eine g\\u00FCltige Dauer an.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Geben Sie einen g\\u00FCltigen Beginn und ein g\\u00FCltiges Ende an.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Der Entwurf wurde gesichert.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Der Favorit wurde angelegt.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Der Favorit wurde aktualisiert.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Der Favorit wurde gel\\u00F6scht.\n\n#XBUT:\nHELP=Hilfe\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} Stunden f\\u00FCr diese Woche erfasst.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Um Wochenstunden auf Basis des zuletzt gemachten Eintrags automatisch zu erfassen, aktivieren Sie \'\'Vorbelegen\'\'.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Einige Eintr\\u00E4ge sind fehlerhaft. Pr\\u00FCfen Sie die Fehlerdetails, und korrigieren Sie die Eingaben.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Zeiteintrag f\\u00FCr {0} und {1} weiteren Tag/weitere Tage\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zeiteintrag bearbeiten\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Zeiteintrag f\\u00FCr {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} Stunden {1} Minuten\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} Std. {1} Min.\n\n#XBUT: Button to reset\nRESET=Zur\\u00FCcksetzen\n\n#XBUT: Button to update\nUPDATE=Aktualisieren\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Favorit hinzuf\\u00FCgen\n\n#XBUT: Button to create\nCREATE=Anlegen\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktueller Favoritenname\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Neuer Favoritenname\n\n#XTIT: time\nTIME=Zeit\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Der Antrag wurde gel\\u00F6scht.\n\n#XTIT:\nWARNING=Warnung\n',
		"cfr/etsapp/i18n/i18n_en.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personnel Assignments\n\n#XFLD: label for from time\nFROM=From\n\n#XFLD: label for to time\nTO=To\n\n#XBUT: Button to cancel\nCANCEL=Cancel\n\n#XBUT: Button to close popover\nCLOSE=Close\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Yes\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=My Timesheet\n\n#XTIT:\nINTERNAL_ERROR=Internal Error\n\n#XTIT:\nERROR=Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=An internal error related to the error handling has occured in the application.\n\n# XTIT:\nFAV_DIALOG_BOX=Delete Favorites\n\n# XTIT: \nTIMESHEET=Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Create entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Entry details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Create entry for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=January\n# XTIT: Month title for calendar\nMONTH_FULL_1=February\n# XTIT: Month title for calendar\nMONTH_FULL_2=March\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\n# XTIT: Month title for calendar\nMONTH_FULL_5=June\n# XTIT: Month title for calendar\nMONTH_FULL_6=July\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=October\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Action Required\n# XTIT: Legend filled day\nFILLED_DAY=Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejected\n# XFLD: Legend future working day\nWORKING_DAY=Workday\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Non-Working Day\n# XFLD: Legend selected working day\nSELECTED_DAY=Selected Day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Selected Non-Working Day\n# XFLD: Legend current day\nCURRENT_DAY=Current Day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total missing hours\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Save\n\n#XBUT: Button \nSUBMIT=Submit\n\n# XMSG\nFILL_ALL=Enter {0} hours for\\:\n\n#XFLD\nNO_TASK_TYPE=No Task Type\n\n#XFLD\nMISSING_DAYS=Missing days\\: {0}\n\n#XBUT: Button\nHOME=Home\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Summary of Time Entries Selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Summary of Time Entries Selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hours / {1} hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Target\\: {0} hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} time assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 time assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=No Records\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} hours approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Save With Time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Save Without Time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Manage Favorites\n\n#XFLD: Week \nWEEK=Week\n\n#XFLD:\nMEET_TARGET_HOURS=Apply hours to\\:\n\n#XBUT\nALL_MISSING=All missing time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=Delete\n\n#XBUT: Copy Button Text\nCOPY=Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Add Entry\n\n#XFLD: label for duration\nDURATION=Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=Total Duration\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=End Time\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Select Favorite or Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=Select Worklist\n\n# XTIT: Favorite\nFAVORITE=Favorites\n\n# XTIT: Worklist\nWORKLIST=Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Load More...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Loading ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Loading ...\n\n#XFLD: BLANK\nEMPTY=Empty\n\n#XFLD: None\nNONE=None\n\n#XFLD\nNO_WORKLIST=No Worklist Available\n\n#XFLD\nNO_FAVORITE=No Favorites Available\n\n# XTIT: Select\nSELECT=Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, YYYY\n\n#XBUT:\nDETAIL=Details\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Request was submitted.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Please enter a favorite name in the Time Assignment input field.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Make entries to store as your favorite.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Please enter a valid duration.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Enter a valid start and end time.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Draft was saved successfully.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorite was created.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorite was updated.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorite was deleted.\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hours entered for this week\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Some entries are incorrect. Please review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Time entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hours {1} minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reset\n\n#XBUT: Button to update\nUPDATE=Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Add Favorite\n\n#XBUT: Button to create\nCREATE=Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Current Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=New Favorite Name\n\n#XTIT: time\nTIME=Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Request Deleted\n\n#XTIT:\nWARNING=Warning\n',
		"cfr/etsapp/i18n/i18n_en_US_sappsd.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=[[[\\u0108\\u0125\\u014F\\u014F\\u015F\\u0113 \\u0105 \\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=[[[\\u01A4\\u0113\\u0157\\u015F\\u014F\\u014B\\u014B\\u0113\\u013A \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for from time\nFROM=[[[\\u0192\\u0157\\u014F\\u0271]]]\n\n#XFLD: label for to time\nTO=[[[\\u0163\\u014F\\u2219\\u2219]]]\n\n#XBUT: Button to cancel\nCANCEL=[[[\\u0108\\u0105\\u014B\\u010B\\u0113\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to close popover\nCLOSE=[[[\\u0108\\u013A\\u014F\\u015F\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to accept\nOK=[[[\\u014E\\u0136\\u2219\\u2219]]]\n\n#XBUT: Button to affirm\nYES=[[[\\u0176\\u0114\\u015C\\u2219]]]\n\n#XBUT: Button to decline\nNO=[[[\\u0143\\u014E\\u2219\\u2219]]]\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=[[[\\u015C\\u0105\\u028B\\u0113 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET_TITLE=[[[\\u039C\\u0177 \\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nINTERNAL_ERROR=[[[\\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0114\\u0157\\u0157\\u014F\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nERROR=[[[\\u0114\\u0157\\u0157\\u014F\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD:\nINTERNAL_ERROR_BODY=[[[\\u0162\\u0125\\u0113\\u0157\\u0113 \\u012F\\u015F \\u0105\\u014B \\u012C\\u014B\\u0163\\u0113\\u0157\\u014B\\u0105\\u013A \\u0113\\u0157\\u0157\\u014F\\u0157 \\u012F\\u014B \\u0163\\u0125\\u0113 \\u0105\\u03C1\\u03C1\\u013A\\u012F\\u010B\\u0105\\u0163\\u012F\\u014F\\u014B \\u0157\\u0113\\u013A\\u0105\\u0163\\u0113\\u018C \\u0163\\u014F \\u0163\\u0125\\u0113 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u0125\\u0105\\u014B\\u018C\\u013A\\u012F\\u014B\\u011F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT:\nFAV_DIALOG_BOX=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET=[[[\\u0162\\u012F\\u0271\\u0113\\u015F\\u0125\\u0113\\u0113\\u0163 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button for quick entry\nQUICK_FILL=[[[\\u01EC\\u0171\\u012F\\u010B\\u0137 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0162\\u014F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u018C\\u0105\\u0177\\u015F]]]\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=[[[\\u0114\\u014B\\u0163\\u0157\\u0177 \\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0192\\u014F\\u0157 {0}]]]\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\n\n# XTIT: Month short header\nMONTH_0=[[[\\u0134\\u0105\\u014B\\u2219]]]\n# XTIT: Month short header\nMONTH_1=[[[\\u0191\\u0113\\u0183\\u2219]]]\n# XTIT: Month short header\nMONTH_2=[[[\\u039C\\u0105\\u0157\\u2219]]]\n# XTIT: Month short header\nMONTH_3=[[[\\u0100\\u03C1\\u0157\\u2219]]]\n# XTIT: Month short header\nMONTH_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\n# XTIT: Month short header\nMONTH_5=[[[\\u0134\\u0171\\u014B\\u2219]]]\n# XTIT: Month short header\nMONTH_6=[[[\\u0134\\u0171\\u013A\\u2219]]]\n# XTIT: Month short header\nMONTH_7=[[[\\u0100\\u0171\\u011F\\u2219]]]\n# XTIT: Month short header\nMONTH_8=[[[\\u015C\\u0113\\u03C1\\u2219]]]\n# XTIT: Month short header\nMONTH_9=[[[\\u014E\\u010B\\u0163\\u2219]]]\n# XTIT: Month short header\nMONTH_10=[[[\\u0143\\u014F\\u028B\\u2219]]]\n# XTIT: Month short header\nMONTH_11=[[[\\u010E\\u0113\\u010B\\u2219]]]\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=[[[\\u0134\\u0105\\u014B\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_1=[[[\\u0191\\u0113\\u0183\\u0157\\u0171\\u0105\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_2=[[[\\u039C\\u0105\\u0157\\u010B\\u0125\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_3=[[[\\u0100\\u03C1\\u0157\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_4=[[[\\u039C\\u0105\\u0177\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_5=[[[\\u0134\\u0171\\u014B\\u0113]]]\n# XTIT: Month title for calendar\nMONTH_FULL_6=[[[\\u0134\\u0171\\u013A\\u0177]]]\n# XTIT: Month title for calendar\nMONTH_FULL_7=[[[\\u0100\\u0171\\u011F\\u0171\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_8=[[[\\u015C\\u0113\\u03C1\\u0163\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_9=[[[\\u014E\\u010B\\u0163\\u014F\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_10=[[[\\u0143\\u014F\\u028B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Month title for calendar\nMONTH_FULL_11=[[[\\u010E\\u0113\\u010B\\u0113\\u0271\\u0183\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Legend missing day\nMISSING_DAY=[[[\\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0158\\u0113\\u01A3\\u0171\\u012F\\u0157\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219]]]\n# XTIT: Legend filled day\nFILLED_DAY=[[[\\u010E\\u014F\\u014B\\u0113]]]\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=[[[\\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u0157 \\u0100\\u010B\\u0163\\u012F\\u014F\\u014B \\u0143\\u0113\\u0113\\u018C\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=[[[\\u0158\\u0113\\u0135\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend future working day\nWORKING_DAY=[[[\\u0174\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend non-working day\nNON_WORKING_DAY=[[[\\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend selected working day\nSELECTED_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0143\\u014F\\u014B-\\u0175\\u014F\\u0157\\u0137\\u012F\\u014B\\u011F \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n# XFLD: Legend current day\nCURRENT_DAY=[[[\\u0108\\u0171\\u0157\\u0157\\u0113\\u014B\\u0163 \\u018C\\u0105\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0124\\u014F\\u0171\\u0157\\u015F\\: {0}]]]\n\n#XFLD:\nMONTH_YEAR=[[[{0} {1} ({2} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\n\n#XBUT: Button\nSAVE=[[[\\u015C\\u0105\\u028B\\u0113]]]\n\n#XBUT: Button \nSUBMIT=[[[\\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG\nFILL_ALL=[[[\\u0114\\u014B\\u0163\\u0113\\u0157 {0} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157\\:]]]\n\n#XFLD\nNO_TASK_TYPE=[[[\\u0143\\u014F \\u0162\\u0105\\u015F\\u0137 \\u0162\\u0177\\u03C1\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD\nMISSING_DAYS=[[[\\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u010E\\u0105\\u0177\\u015F\\:{0}]]]\n\n#XBUT: Button\nHOME=[[[\\u0124\\u014F\\u0271\\u0113]]]\n\n#XTIT: confirmation header\nCONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271 \\u010E\\u0157\\u0105\\u0192\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u010E\\u0113\\u013A\\u0113\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C \\u0192\\u014F\\u0157 \\u015C\\u0171\\u0183\\u0271\\u012F\\u015F\\u015F\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=[[[\\u015C\\u0171\\u0271\\u0271\\u0105\\u0157\\u0177 \\u014F\\u0192 \\u0163\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u015F\\u0113\\u013A\\u0113\\u010B\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0114\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=[[[\\u0143\\u0171\\u0271\\u0183\\u0113\\u0157 \\u014F\\u0192 \\u0124\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Confirm Button\nCONFIRM=[[[\\u0108\\u014F\\u014B\\u0192\\u012F\\u0157\\u0271\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY=[[[{0} - {1}]]]\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE=[[[{0} - {1}]]]\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=[[[{0} \\u0124\\u014F\\u0171\\u0157]]]\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=[[[{0} \\u0125\\u014F\\u0171\\u0157 / {1} \\u0125\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F / {1} \\u0124\\u014F\\u0171\\u0157\\u015F]]]\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=[[[\\u0162\\u0105\\u0157\\u011F\\u0113\\u0163\\: {0} \\u0124\\u014F\\u0171\\u0157\\u015F ]]]\n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=[[[{0} \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F]]]\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=[[[1 \\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=[[[\\u0143\\u014F \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: No Recordings\nNO_RECORDING=[[[\\u0143\\u014F \\u0158\\u0113\\u010B\\u014F\\u0157\\u018C\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=[[[{0} \\u0124\\u014F\\u0171\\u0157\\u015F \\u0100\\u03C1\\u03C1\\u0157\\u014F\\u028B\\u0113\\u018C]]]\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=[[[\\u015C\\u0105\\u028B\\u0113 \\u0175\\u012F\\u0163\\u0125\\u014F\\u0171\\u0163 \\u0163\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=[[[\\u015C\\u0105\\u028B\\u0113 \\u0105\\u015F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Week \nWEEK=[[[\\u0174\\u0113\\u0113\\u0137]]]\n\n#XFLD:\nMEET_TARGET_HOURS=[[[\\u0100\\u03C1\\u03C1\\u013A\\u0177 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0163\\u014F\\:\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT\nALL_MISSING=[[[\\u0100\\u013A\\u013A \\u039C\\u012F\\u015F\\u015F\\u012F\\u014B\\u011F \\u0162\\u012F\\u0271\\u0113 ({0} \\u0125\\u014F\\u0171\\u0157\\u015F)]]]\n\n#XBUT: Delete Button Text\nDELETE=[[[\\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Copy Button Text\nCOPY=[[[\\u0108\\u014F\\u03C1\\u0177]]]\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=[[[\\u0100\\u018C\\u018C \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for duration\nDURATION=[[[\\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for total duration\nTOTAL_DURATION=[[[\\u0162\\u014F\\u0163\\u0105\\u013A \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for status\nSTATUS=[[[\\u015C\\u0163\\u0105\\u0163\\u0171\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for start time\nSTART_TIME=[[[\\u015C\\u0163\\u0105\\u0157\\u0163 \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for end Time\nEND_TIME=[[[\\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for note\nNOTE=[[[\\u0143\\u014F\\u0163\\u0113]]]\n\n#XBUT: Done button\nDONE=[[[\\u010E\\u014F\\u014B\\u0113]]]\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=[[[\\u039C\\u0105\\u014B\\u0171\\u0105\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=[[[\\u0114\\u018C\\u012F\\u0163 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0100\\u015F\\u015F\\u012F\\u011F\\u014B\\u0271\\u0113\\u014B\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 / \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: select worklist\nSELECT_WORKLIST=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 \\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Favorite\nFAVORITE=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Worklist\nWORKLIST=[[[\\u0174\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Add Favorite\nADD_FAVORITE=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=[[[\\u0114\\u018C\\u012F\\u0163 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=[[[\\u013B\\u014F\\u0105\\u018C \\u039C\\u014F\\u0157\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=[[[\\u0108\\u014F\\u014B\\u0163\\u012F\\u014B\\u0171\\u0113 \\u015C\\u0113\\u0105\\u0157\\u010B\\u0125 \\u014F\\u014B \\u015C\\u0113\\u0157\\u028B\\u0113\\u0157...\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=[[[\\u013B\\u014F\\u0105\\u018C\\u012F\\u014B\\u011F...\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: BLANK\nEMPTY=[[[\\u0114\\u0271\\u03C1\\u0163\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: None\nNONE=[[[\\u0143\\u014F\\u014B\\u0113]]]\n\n#XFLD\nNO_WORKLIST=[[[\\u0143\\u014F \\u0175\\u014F\\u0157\\u0137\\u013A\\u012F\\u015F\\u0163 \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD\nNO_FAVORITE=[[[\\u0143\\u014F \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u015F \\u0105\\u028B\\u0105\\u012F\\u013A\\u0105\\u0183\\u013A\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: Select\nSELECT=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163 {0}]]]\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=[[[\\u015C\\u0113\\u013A\\u0113\\u010B\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=[[[\\u015C\\u0113\\u0105\\u0157\\u010B\\u0125...\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: short label for hours\nHOURS_LABEL=[[[\\u0125\\u2219\\u2219\\u2219]]]\n\n#XFLD: short label for minutes\nMINUTES_LABEL=[[[\\u0271\\u2219\\u2219\\u2219]]]\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=[[[\\u0125\\u014F\\u0171\\u0157\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=[[[\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=[[[\\u039C\\u039C\\u039C \\u010E\\u010E, \\u0176\\u0176\\u0176\\u0176\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT:\nDETAIL=[[[\\u010E\\u0113\\u0163\\u0105\\u012F\\u013A\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=[[[\\u015C\\u0113\\u0163\\u0163\\u012F\\u014B\\u011F\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=[[[\\u0100\\u014B\\u0177 \\u0171\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u018C\\u0105\\u0163\\u0105 \\u0175\\u012F\\u013A\\u013A \\u0183\\u0113 \\u018C\\u012F\\u015F\\u010B\\u0105\\u0157\\u018C\\u0113\\u018C. \\u0100\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u015F\\u0171\\u0157\\u0113 \\u0177\\u014F\\u0171 \\u0175\\u0105\\u014B\\u0163 \\u0163\\u014F \\u03C1\\u0157\\u014F\\u010B\\u0113\\u0113\\u018C?\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n# XTIT: \nUNSAVED_CHANGES=[[[\\u016E\\u014B\\u015F\\u0105\\u028B\\u0113\\u018C \\u0108\\u0125\\u0105\\u014B\\u011F\\u0113\\u015F\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u015C\\u0171\\u0183\\u0271\\u012F\\u0163\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u014B\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u015F\\u014F\\u0271\\u0113 \\u0192\\u012F\\u0113\\u013A\\u018C\\u015F \\u0163\\u014F \\u015F\\u0163\\u014F\\u0157\\u0113 \\u0105\\u015F \\u0177\\u014F\\u0171\\u0157 \\u0192\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u0105 \\u028B\\u0105\\u013A\\u012F\\u018C \\u010E\\u0171\\u0157\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=[[[\\u01A4\\u013A\\u0113\\u0105\\u015F\\u0113 \\u0113\\u014B\\u0163\\u0113\\u0157 \\u028B\\u0105\\u013A\\u012F\\u018C \\u015C\\u0163\\u0105\\u0157\\u0163 \\u0105\\u014B\\u018C \\u0114\\u014B\\u018C \\u0162\\u012F\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=[[[\\u010E\\u0157\\u0105\\u0192\\u0163 \\u015C\\u0105\\u028B\\u0113\\u018C \\u015C\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A\\u013A\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=[[[\\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT:\nHELP=[[[\\u0124\\u0113\\u013A\\u03C1]]]\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=[[[{0}/{1} \\u0125\\u014F\\u0171\\u0157\\u015F \\u0113\\u014B\\u0163\\u0113\\u0157\\u0113\\u018C \\u0192\\u014F\\u0157 \\u0163\\u0125\\u012F\\u015F \\u0175\\u0113\\u0113\\u0137.]]]\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=[[[\\u0162\\u0171\\u0157\\u014B \\u014E\\u0143 \\u01A4\\u0157\\u0113-\\u0191\\u012F\\u013A\\u013A \\u0163\\u014F \\u01A3\\u0171\\u012F\\u010B\\u0137\\u013A\\u0177 \\u03C1\\u014F\\u03C1\\u0171\\u013A\\u0105\\u0163\\u0113 \\u0125\\u014F\\u0171\\u0157\\u015F \\u0192\\u014F\\u0157 \\u0163\\u0125\\u0113 \\u0175\\u0113\\u0113\\u0137 \\u0183\\u0105\\u015F\\u0113\\u018C \\u014F\\u014B \\u0177\\u014F\\u0171\\u0157 \\u013A\\u0105\\u015F\\u0163 \\u015F\\u0171\\u010B\\u010B\\u0113\\u015F\\u015F\\u0192\\u0171\\u013A \\u0113\\u014B\\u0163\\u0157\\u0177.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=[[[\\u015C\\u014F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F \\u0105\\u0157\\u0113 \\u012F\\u014B\\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163. \\u0158\\u0113\\u028B\\u012F\\u0113\\u0175 \\u0113\\u0157\\u0157\\u014F\\u0157 \\u018C\\u0113\\u0163\\u0105\\u012F\\u013A\\u015F \\u0105\\u014B\\u018C \\u010B\\u014F\\u0157\\u0157\\u0113\\u010B\\u0163 \\u0113\\u014B\\u0163\\u0157\\u012F\\u0113\\u015F.\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=[[[\\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0} \\u0105\\u014B\\u018C {1} \\u0271\\u014F\\u0157\\u0113 \\u018C\\u0105\\u0177(\\u015F)]]]\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=[[[\\u0114\\u018C\\u012F\\u0163 \\u0162\\u012F\\u0271\\u0113 \\u0114\\u014B\\u0163\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219]]]\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=[[[\\u0162\\u012F\\u0271\\u0113 \\u0113\\u014B\\u0163\\u0157\\u0177 \\u0192\\u014F\\u0157 {0}]]]\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN=[[[{0}\\u0125\\u014F\\u0171\\u0157\\u015F {1}\\u0271\\u012F\\u014B\\u0171\\u0163\\u0113\\u015F]]]\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN=[[[{0}\\u0125 {1}\\u0271]]]\n\n#XBUT: Button to reset\nRESET=[[[\\u0158\\u0113\\u015F\\u0113\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to update\nUPDATE=[[[\\u016E\\u03C1\\u018C\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=[[[\\u0100\\u018C\\u018C \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XBUT: Button to create\nCREATE=[[[\\u0108\\u0157\\u0113\\u0105\\u0163\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=[[[\\u0114\\u03C7\\u012F\\u015F\\u0163\\u012F\\u014B\\u011F \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=[[[\\u0143\\u0113\\u0175 \\u0191\\u0105\\u028B\\u014F\\u0157\\u012F\\u0163\\u0113 \\u0143\\u0105\\u0271\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT: time\nTIME=[[[\\u0162\\u012F\\u0271\\u0113]]]\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=[[[\\u0158\\u0113\\u01A3\\u0171\\u0113\\u015F\\u0163 \\u010E\\u0113\\u013A\\u0113\\u0163\\u0113\\u018C\\u2219\\u2219\\u2219\\u2219]]]\n\n#XTIT:\nWARNING=[[[\\u0174\\u0105\\u0157\\u014B\\u012F\\u014B\\u011F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\n',
		"cfr/etsapp/i18n/i18n_en_US_saptrc.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=EL+T5a2Vbrij85iZGFvMtA_Choose a Personnel Assignment\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=QeCUSBtCPoG4E1OELtxmsg_Personnel Assignments\n\n#XFLD: label for from time\nFROM=j+DLW4+7jIImb4C10bR93g_from\n\n#XFLD: label for to time\nTO=/vTRUk+RQ4FAlD8d1DCb7g_to\n\n#XBUT: Button to cancel\nCANCEL=87kCER4/L4Brz+H6+bNG9Q_Cancel\n\n#XBUT: Button to close popover\nCLOSE=s57Rys/SJv3BBlurEIBh6A_Close\n\n#XBUT: Button to accept\nOK=/UFh/irrHCylGpWsqIPc7Q_OK\n\n#XBUT: Button to affirm\nYES=LpuJVytifnbMNnAfqev9GQ_YES\n\n#XBUT: Button to decline\nNO=laUdvYkE/Aw2zDkFyOcGOQ_NO\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=JYdVyYpNpV2jUaGs9UgUmA_Save Draft\n\n# XTIT: \nTIMESHEET_TITLE=lHKK83T2ZMS2uSW/hCcvAg_My Timesheet\n\n#XTIT:\nINTERNAL_ERROR=YyXrNCNJbgtbkNkOWwn63g_Internal Error\n\n#XTIT:\nERROR=EAcG4da6z0eZtLoO7dfECA_Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=4W+OAm2wgsEoMKrTr0rYKg_There is an Internal error in the application related to the error handling\n\n# XTIT:\nFAV_DIALOG_BOX=gc1ViRZr54/MSzCK8IjYdA_Delete Favorites\n\n# XTIT: \nTIMESHEET=S7EpfvnYy3+r2Hk8+iCmdg_Timesheet Entries\n\n#XBUT: Button for quick entry\nQUICK_FILL=+6aJkPn56Csoj28zhSqiSQ_Quick Entry\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=+NW1+1dEBXd2tUoNmZIkJA_Apply To\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=X1Adj1bA0G2J6ie8VFxaYw_Details\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=aVUgu3tay3EMJi2hqwoBTw_Create Time Entry\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Yb0BzGhJDUZ45d7/oinmMg_Create Entry for {0} days\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=99GsOG3gku/i4/4sUfxjCQ_Entry Details\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=ybwRG8BXO9fuUUVM0+8X+w_Entry Details for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=/WAepUdUwTUufdu035Q1XA_Create Entry for {0}\n\n# XTIT: Month short header\nMONTH_0=TDLRyrQhwef+7RdkUj0q0g_Jan\n# XTIT: Month short header\nMONTH_1=6cboJMxd8z+g1DqMcM4zkw_Feb\n# XTIT: Month short header\nMONTH_2=5XmekwxYQ23OWUDabMs3rw_Mar\n# XTIT: Month short header\nMONTH_3=F7oEk+nc/cO1a1SqE1mWtg_Apr\n# XTIT: Month short header\nMONTH_4=GNZRi9ZjE9/NSDIfMUU12A_May\n# XTIT: Month short header\nMONTH_5=TJLiMZydCLbFlAFHBNWK1g_Jun\n# XTIT: Month short header\nMONTH_6=T7/WavWoDHMcPp5aqLRedA_Jul\n# XTIT: Month short header\nMONTH_7=u1bNwe+jache3n+YuaYARA_Aug\n# XTIT: Month short header\nMONTH_8=jTNKT83ajgKGxyfdmuKvNA_Sep\n# XTIT: Month short header\nMONTH_9=iDMoZSVkGLPaBdCgTj5K5g_Oct\n# XTIT: Month short header\nMONTH_10=5/4uM/RK/OehXbCTMvYCKA_Nov\n# XTIT: Month short header\nMONTH_11=z2+UhbNRkpFrL1/IjddInQ_Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=A9iWyHc+QoVTNEARn8ZDCA_January\n# XTIT: Month title for calendar\nMONTH_FULL_1=ntP/dEzVU+14JDHJ5DTf1A_February\n# XTIT: Month title for calendar\nMONTH_FULL_2=I/TTAi/A8W92HmoXZ4kDEQ_March\n# XTIT: Month title for calendar\nMONTH_FULL_3=4wRgbu3jpP+zlI+NJsxTnQ_April\n# XTIT: Month title for calendar\nMONTH_FULL_4=WOqnHCrMA5PvyJYvTOMGFA_May\n# XTIT: Month title for calendar\nMONTH_FULL_5=dSM5aWS/jMqxKF+qt3dt8w_June\n# XTIT: Month title for calendar\nMONTH_FULL_6=Q+tVvLFdTNPLb35m2R+8AA_July\n# XTIT: Month title for calendar\nMONTH_FULL_7=YUF5ceVC3W58q+/REM5k1w_August\n# XTIT: Month title for calendar\nMONTH_FULL_8=zBIobLuHKU3CfDHNZZgLMA_September\n# XTIT: Month title for calendar\nMONTH_FULL_9=PCOsHJKxYIHbqoyDINPOAw_October\n# XTIT: Month title for calendar\nMONTH_FULL_10=+VRN+upXOCvqBiy0IGq0DQ_November\n# XTIT: Month title for calendar\nMONTH_FULL_11=zaES3f+kmvYHIqJCGwAG0A_December\n\n# XTIT: Legend missing day\nMISSING_DAY=AonMsJkaqWWFI9OWr0IxMw_Action Required\n# XTIT: Legend filled day\nFILLED_DAY=CzzpjdTfdlmbER7Rtv7Nqg_Done\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=M6ImHVitxGJbHaOJ9ELwmw_Approver Action Needed\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=NIb9ctYoJr8IgMLdk6KpPw_Rejected\n# XFLD: Legend future working day\nWORKING_DAY=SSug9NNlRBfDlSnAUSkS1w_Working day\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Vy1M3L0IC+fq9o395NJVvQ_Non-working day\n# XFLD: Legend selected working day\nSELECTED_DAY=OLoUF1/D9qCUeS1M5M8GFg_Selected day\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=wGuz6MV9RsC1z9KwEKl5/w_Selected Non-working day\n# XFLD: Legend current day\nCURRENT_DAY=xm0KkE4jHB6+tqPVsnpi/w_Current day\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=OXZsA9aKwhOJcHwJwCEskA_Total Missing Hours\\: {0}\n\n#XFLD:\nMONTH_YEAR=WQIsFIFPjmqDLVMXeP11GA_{0} {1} ({2} hours)\n\n#XBUT: Button\nSAVE=Hjm4BleW2adZX8xtE1oFXg_Save\n\n#XBUT: Button \nSUBMIT=ckSDEW9wPsgQjnlUMDX9sg_Submit\n\n# XMSG\nFILL_ALL=oRJKrJ9n5dRZQ3e3Si12hw_Enter {0} hours for\\:\n\n#XFLD\nNO_TASK_TYPE=/NZZjTZ6lFZLDEUbbzgwIw_No Task Type\n\n#XFLD\nMISSING_DAYS=yVhhr9Kp1eYWzkUUdJh1Eg_Missing Days\\:{0}\n\n#XBUT: Button\nHOME=UIBSo/1DAJ1dQb6chHrSbA_Home\n\n#XTIT: confirmation header\nCONFIRMATION=A/oRNaubPzTcQko3+0MQLg_Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=4LeQ784gDIw645hQp0v+0w_Confirm Deletion\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=ZQQ2ZUG8ZH+JBdH9CM0oTw_Confirm Submission\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Kbc2bPZgSCFS2NIBSC+bow_Confirm Draft\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=mQ07GanWFpsP7EM1xqp46Q_Summary of time entries selected for Deletion\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=ryqvaLZNikMb5Lj1Y21qVA_Summary of time entries selected for Submission\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=tAssNTno+v8TAeGz/F15+g_Summary of time entries selected\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=IkjleOoX9B6iOHShTxjw7Q_Number of Entries\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=geFcwQpHEGOAHp4bUICLlA_Number of Hours\n\n#XBUT: Confirm Button\nCONFIRM=y++PNd3uZu3Tl7+hRVjffQ_Confirm\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY=b0mF42QRDNwbCCfThG2qNQ_{0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE=vEzkBHCO56GH1E62KN+/pg_{0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=oCvnq5VKqONLi+fqXwmDZA_{0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS=WcLzqHof0/jMkuVQHZxSqQ_{0} Hours\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=ZGbOC+P9roPtf/VUtulq3w_{0} hour / {1} hours\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS=2QXTOuGVgM+ns3SEH3Rz4g_{0} Hours / {1} Hours\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=npojzJ0cNonG+b0+a8NAwA_Target\\: {0} Hours \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=i2bGkoczcKHU9v8pqZInRA_{0} Time Assignments\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=SAD6cAfuoB09367Jrt6+Bw_1 Time Assignment\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=yCthBmqiPRz9PYwy+4F1YA_No Assignments\n\n#XMSG: No Recordings\nNO_RECORDING=VYatqVoOX49HovJus5Tf9w_No Recordings\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=+D2GljbqWhewX31glr0Qqw_{0} Hours Approved\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=BXl2JHYrjrpgRTyVPrsQhQ_Save with time\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=EZcr9tVrS+lAUesBQVghxA_Save without time\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=AZwnzfO4UNgQ/BozrhwBTw_Delete Favorites\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=NaAx/HgcLZmQp7MsoVXAQg_Save as Favorite\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=A/6dbCFT4vdULEjdz2e6Bw_Manage favorites\n\n#XFLD: Week \nWEEK=aHqQ9DhFNWk0lFzDpYX50A_Week\n\n#XFLD:\nMEET_TARGET_HOURS=wMy+8Ow5icxJROenV5HlPA_Apply hours to\\:\n\n#XBUT\nALL_MISSING=MefBKdehOF1gqn3GHGTH2w_All Missing Time ({0} hours)\n\n#XBUT: Delete Button Text\nDELETE=g3Mh262K6p4dCxeLebEozg_Delete\n\n#XBUT: Copy Button Text\nCOPY=conQw2ib5o88KUjHQj9EIg_Copy\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=LLJ0duO1pPXvZ31HZl4BGg_Add Entry\n\n#XFLD: label for duration\nDURATION=keeR8Qen47l4o8Cz6FlggA_Duration\n\n#XFLD: label for total duration\nTOTAL_DURATION=mQeOGg+OkM40ZhahOOk/SA_Total Duration\n\n#XFLD: label for status\nSTATUS=RUgBf+3gBC5qG4swvO2C6A_Status\n\n#XFLD: label for start time\nSTART_TIME=4UPMFtH3iesRTYmSI2rVaw_Start Time\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=iaFUVcVj3uBFQZngvbHLKA_Favorite Name\n\n#XFLD: label for end Time\nEND_TIME=zzmA3zvtKDGFh7hGKhjqHg_End Time\n\n#XFLD: label for note\nNOTE=eI/Axs2ZBcQIMo0TSp2mUg_Note\n\n#XBUT: Done button\nDONE=+QPnVExP/ZCyX84/iYAjog_Done\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=QbOqEN5U9Q4A2mVwOri6sA_Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=ea1KBff1cWKvHpAwbH+v9g_Edit Entry\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=2QRTw2jo0iwE9dVNX6KoCg_Time Assignment\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=JVzDLT3S02ayT8l9okvUSQ_Select Favorite / Worklist\n\n# XTIT: select worklist\nSELECT_WORKLIST=iqtqz64YdTv5571GE2Z7LQ_Select Worklist\n\n# XTIT: Favorite\nFAVORITE=K7sWuvziMlku9VKtKClF/A_Favorites\n\n# XTIT: Worklist\nWORKLIST=Dq8B8QS8/LnckNx1ZT0fPQ_Worklist\n\n# XTIT: Add Favorite\nADD_FAVORITE=p3FIPzmsV0bb/yhlyNJzQA_Add Favorite\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Wy3trhXWgrjPdMwBfAYEeA_Edit Favorites\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=64f79Cd1dxBvAECPxx6OyA_Load More\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=96Z6xvXC1wNVhB/ivYDkVg_Loading...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=7MYP30KxmOFL4PF71bw/7w_Continue Search on Server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=26Ie+N94XSkCQ1tWGaQCvg_Loading...\n\n#XFLD: BLANK\nEMPTY=rLnJSwDYBMrX1+8aHbFu5Q_Empty\n\n#XFLD: None\nNONE=WCpZ5goggiA4JIyYcqd/dg_None\n\n#XFLD\nNO_WORKLIST=qSSqvr/rcN3gY5KfKghC5w_No worklist available\n\n#XFLD\nNO_FAVORITE=lZ3J0gN4aMos3wIDVe61DQ_No favorites available\n\n# XTIT: Select\nSELECT=bg1I8YlS4/0ncF/ZRKbmBQ_Select {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=fRLkPwksRgEOznsUcZqCuw_Select\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=wBLOQ+MYzCAwDTrFefy0rw_Search...\n\n#XFLD: short label for hours\nHOURS_LABEL=s0QdXjMPCd811r/MIfBkaA_h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=I4pPGefQpigNWwZi45dbIA_m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=MlnrFv46Q/KKzT95ud+eiA_hours\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=jR72qvIAo27W/Du/jvJc5w_minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=op/hiIY8ufnvbCCImynBPw_MMM DD, YYYY\n\n#XBUT:\nDETAIL=+hRUylLnkm7/iQQkqOZ+8A_Detail\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=UgwZtphkgFkc0Pdieo/mGg_Settings\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=EGYu/BtRyWp4bG2duLG5aQ_Any unsaved data will be discarded. Are you sure you want to proceed?\n\n# XTIT: \nUNSAVED_CHANGES=fG+N6PK1bJRyJh7FCASG4A_Unsaved Changes\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=sdZDu06GcFMCxIS2y0f02A_Request Submitted\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=F6adSoJq42UFqndV3fkB3w_Please enter a favorite name\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=m/27iY/EkW5dm+CuuXh8nQ_Please enter some fields to store as your favorite\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Uka/RC6V3RMydMfdzVRffw_Please enter a valid Duration\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=uFoqCHJZ4Cpto8OrZFRkGw_Please enter valid Start and End Time\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=vQf9104g1R4H/0ZPp5jQ0g_Draft Saved Successfully\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=sc9ThsRAdG1QP6ADuA01lQ_Favorite Created\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=JTpg2mD/Qde/3Z7218t5lQ_Favorite Updated\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=E5Fe9joePwnSI62SZWwCxQ_Favorite Deleted\n\n#XBUT:\nHELP=k38v8TOT2oWliR5w2qRrXA_Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Bu2eSUmsKQvRh7ChM9yBQw_{0}/{1} hours entered for this week.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=GgePeDwhZT1Ap0JpVutJgQ_Turn ON Pre-Fill to quickly populate hours for the week based on your last successful entry.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=c2evz6DIYDAZMiWMoAxUzQ_Some entries are incorrect. Review error details and correct entries.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=rLgK56ClbqYXWOmCS3y+xQ_Time Entry for {0} and {1} more day(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=J5qELvsS4sVdGcnCHUgdQA_Edit Time Entry\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=qAtrqrDetV5kTtKS/Ab++Q_Time entry for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN=vwQw1IdUHKfXmOYEA5C2Cg_{0}hours {1}minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN=7TELbCAzm3jbqj3o9NYVug_{0}h {1}m\n\n#XBUT: Button to reset\nRESET=pM43lnpf+fKVL2NkyssCpQ_Reset\n\n#XBUT: Button to update\nUPDATE=6KW2grbpSud2SiITndNYYQ_Update\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=fQTBMYJ5fYukHrgQw9nBZw_Add Favorite\n\n#XBUT: Button to create\nCREATE=UEZ4AROCqFn3rjm7ZvfarA_Create\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=iFygYqCOuurdm5/CSV/RKA_Existing Favorite Name\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=0HNHedYkMX0d0TsfmVq26g_New Favorite Name\n\n#XTIT: time\nTIME=/WXTjwfEpkjk9qOHJnF0hw_Time\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=orAHV82RtCOFb4Bxm9wT/g_Request Deleted\n\n#XTIT:\nWARNING=6ykRKCbnDTrGeyEwP3fSpw_Warning\n',
		"cfr/etsapp/i18n/i18n_es.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Seleccione un contrato de ocupaci\\u00F3n\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratos de ocupaci\\u00F3n\n\n#XFLD: label for from time\nFROM=De\\:\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Cancelar\n\n#XBUT: Button to close popover\nCLOSE=Cerrar\n\n#XBUT: Button to accept\nOK=Aceptar\n\n#XBUT: Button to affirm\nYES=S\\u00ED\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Guardar borrador\n\n# XTIT: \nTIMESHEET_TITLE=Registro de tiempos\n\n#XTIT:\nINTERNAL_ERROR=Error interno\n\n#XTIT:\nERROR=Error\n\n#XFLD:\nINTERNAL_ERROR_BODY=Se ha producido un error interno relacionado con el tratamiento de errores en la aplicaci\\u00F3n\n\n# XTIT:\nFAV_DIALOG_BOX=Eliminar Favoritos\n\n# XTIT: \nTIMESHEET=Entradas en registro de tiempos\n\n#XBUT: Button for quick entry\nQUICK_FILL=Entrada r\\u00E1pida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicar a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalles\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Crear entrada para fecha\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Crear entrada para {0} d\\u00EDas\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalles de entrada\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalles de entrada para {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Crear entrada para {0}\n\n# XTIT: Month short header\nMONTH_0=Ene\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Abr\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dic\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Enero\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febrero\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzo\n# XTIT: Month title for calendar\nMONTH_FULL_3=Abril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mayo\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junio\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julio\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septiembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octubre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Noviembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=Diciembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Acci\\u00F3n necesaria\n# XTIT: Legend filled day\nFILLED_DAY=Finalizar\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Es necesaria la acci\\u00F3n del autorizador\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rechazadas\n# XFLD: Legend future working day\nWORKING_DAY=D\\u00EDa laborable\n# XFLD: Legend non-working day\nNON_WORKING_DAY=D\\u00EDa no laborable\n# XFLD: Legend selected working day\nSELECTED_DAY=D\\u00EDa seleccionado\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=D\\u00EDa festivo seleccionado\n# XFLD: Legend current day\nCURRENT_DAY=D\\u00EDa actual\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total de horas que faltan\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} horas)\n\n#XBUT: Button\nSAVE=Grabar\n\n#XBUT: Button \nSUBMIT=Enviar\n\n# XMSG\nFILL_ALL=Introducir {0} horas para\\:\n\n#XFLD\nNO_TASK_TYPE=No hay tipo de tarea\n\n#XFLD\nMISSING_DAYS=D\\u00EDas que faltan\\: {0}\n\n#XBUT: Button\nHOME=P\\u00E1gina principal\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmaci\\u00F3n\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmar borrado\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmar env\\u00EDo\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmar borrador\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para borrado\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Total de valores para fecha seleccionados para gastos\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Resumen de entradas de tiempos seleccionadas\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Cantidad de entradas\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Cantidad de horas\n\n#XBUT: Confirm Button\nCONFIRM=Confirmar\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} horas\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} horas\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Objetivo\\: {0} horas \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} asignaciones de tiempos\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 asignaci\\u00F3n de tiempos\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Sin asignaciones\n\n#XMSG: No Recordings\nNO_RECORDING=Sin registros\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} horas autorizadas\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Grabar con tiempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Grabar sin tiempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Eliminar Favoritos\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Guardar como favorito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestionar favoritos\n\n#XFLD: Week \nWEEK=Semana\n\n#XFLD:\nMEET_TARGET_HOURS=Imputar horas a\\:\n\n#XBUT\nALL_MISSING=Tiempo que falta en total ({0} horas)\n\n#XBUT: Delete Button Text\nDELETE=Eliminar\n\n#XBUT: Copy Button Text\nCOPY=Copiar\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=A\\u00F1adir entrada\n\n#XFLD: label for duration\nDURATION=Duraci\\u00F3n\n\n#XFLD: label for total duration\nTOTAL_DURATION=Duraci\\u00F3n total\n\n#XFLD: label for status\nSTATUS=Estado\n\n#XFLD: label for start time\nSTART_TIME=Hora de inicio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nombre de favorito\n\n#XFLD: label for end Time\nEND_TIME=Hora de fin\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Finalizar\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Editar entrada\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Asignaci\\u00F3n de tiempo\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Seleccionar favorito o lista de trabajo\n\n# XTIT: select worklist\nSELECT_WORKLIST=Seleccionar lista de trabajo\n\n# XTIT: Favorite\nFAVORITE=Favoritos\n\n# XTIT: Worklist\nWORKLIST=Lista de trabajo\n\n# XTIT: Add Favorite\nADD_FAVORITE=A\\u00F1adir favorito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Tratar favoritos\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Cargar m\\u00E1s...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Cargando...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuar la b\\u00FAsqueda en el servidor...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Cargando...\n\n#XFLD: BLANK\nEMPTY=Vac\\u00EDo\n\n#XFLD: None\nNONE=Ninguno\n\n#XFLD\nNO_WORKLIST=Ninguna lista de trabajo disponible\n\n#XFLD\nNO_FAVORITE=No hay favoritos disponibles\n\n# XTIT: Select\nSELECT=Seleccionar {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Seleccionar\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Buscar...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Horas\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutos\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Detalles\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Opciones\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Todos los datos no grabados se descartar\\u00E1n. \\u00BFDesea continuar?\n\n# XTIT: \nUNSAVED_CHANGES=Modificaciones no guardadas\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Solicitud enviada\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Introduzca un nombre de favorito en el campo de entrada Asignaci\\u00F3nn de tiempo\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Complete los campos para almacenar como favoritos\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Introduzca una duraci\\u00F3n v\\u00E1lida\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Introduzca una fecha de inicio y una fecha de fin v\\u00E1lidas\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Borrador guardado correctamente\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorito enviado\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorito actualizado\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorito eliminado\n\n#XBUT:\nHELP=Ayuda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} horas introducidas para esta semana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Pulse Prerrellenar para completar r\\u00E1pidamente horas de la semana basada en su \\u00FAltima entrada correcta.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Algunas entradas son incorrectas. Revise los detalles del error y corrija las entradas.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Entrada de tiempo para {0} y {1} d\\u00EDa(s) de m\\u00E1s\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar entrada de tiempo\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tiempo para {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} horas {1} minutos\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reinicializar\n\n#XBUT: Button to update\nUPDATE=Actualizar\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=A\\u00F1adir favorito\n\n#XBUT: Button to create\nCREATE=Crear\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nombre actual de favorito\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nuevo nombre de favorito\n\n#XTIT: time\nTIME=Tiempo\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Solicitud eliminada\n\n#XTIT:\nWARNING=Advertencia\n',
		"cfr/etsapp/i18n/i18n_fr.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=S\\u00E9lectionner un contrat de travail\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contrats de travail\n\n#XFLD: label for from time\nFROM=De\n\n#XFLD: label for to time\nTO=\\u00C0\n\n#XBUT: Button to cancel\nCANCEL=Annuler\n\n#XBUT: Button to close popover\nCLOSE=Fermer\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Oui\n\n#XBUT: Button to decline\nNO=Non\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Sauvegarder version pr\\u00E9liminaire\n\n# XTIT: \nTIMESHEET_TITLE=Ma feuille de saisie des temps\n\n#XTIT:\nINTERNAL_ERROR=Erreur interne\n\n#XTIT:\nERROR=Erreur\n\n#XFLD:\nINTERNAL_ERROR_BODY=Une erreur interne li\\u00E9e \\u00E0 la correction des erreurs s\'est produite dans l\'application.\n\n# XTIT:\nFAV_DIALOG_BOX=Supprimer favoris\n\n# XTIT: \nTIMESHEET=Entr\\u00E9es sur la feuille de saisie des temps\n\n#XBUT: Button for quick entry\nQUICK_FILL=Saisie rapide\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Appliquer \\u00E0\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=D\\u00E9tails\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Cr\\u00E9er saisie des temps\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Cr\\u00E9er entr\\u00E9e pour {0} jours\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=D\\u00E9tails de l\'entr\\u00E9e\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=D\\u00E9tails d\'\'entr\\u00E9e pour {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Cr\\u00E9er entr\\u00E9e pour {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=F\\u00E9v\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Avr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jin\n# XTIT: Month short header\nMONTH_6=Juil\n# XTIT: Month short header\nMONTH_7=Ao\\u00FB\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=D\\u00E9c\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janvier\n# XTIT: Month title for calendar\nMONTH_FULL_1=F\\u00E9vrier\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mars\n# XTIT: Month title for calendar\nMONTH_FULL_3=Avril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juin\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juillet\n# XTIT: Month title for calendar\nMONTH_FULL_7=Ao\\u00FBt\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octobre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=D\\u00E9cembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Action requise\n# XTIT: Legend filled day\nFILLED_DAY=Termin\\u00E9\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Action de l\'approbateur requise\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejet\\u00E9\n# XFLD: Legend future working day\nWORKING_DAY=Jour ouvr\\u00E9\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Jour ch\\u00F4m\\u00E9\n# XFLD: Legend selected working day\nSELECTED_DAY=Jour s\\u00E9lectionn\\u00E9\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Jour s\\u00E9lectionn\\u00E9 non ouvr\\u00E9\n# XFLD: Legend current day\nCURRENT_DAY=Jour actuel\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Heures manquantes au total\\u00A0\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} heures)\n\n#XBUT: Button\nSAVE=Sauvegarder\n\n#XBUT: Button \nSUBMIT=Envoyer\n\n# XMSG\nFILL_ALL=Saisir {0} heures pour\\u00A0\\:\n\n#XFLD\nNO_TASK_TYPE=Aucun type de t\\u00E2che\n\n#XFLD\nMISSING_DAYS=Jours manquants\\u00A0\\: {0}\n\n#XBUT: Button\nHOME=Page d\'accueil\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmation\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmer la suppression\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmer l\'envoi\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmer version pr\\u00E9liminaire\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour suppression\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Synth\\u00E8se des saisies des temps marqu\\u00E9es pour envoi\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=R\\u00E9sum\\u00E9 des saisies des temps s\\u00E9lectionn\\u00E9es\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Nombre d\'entr\\u00E9es\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Nombre d\'heures\n\n#XBUT: Confirm Button\nCONFIRM=Confirmer\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0}\\u00A0heure\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} heures\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0}\\u00A0heure\\u00A0/\\u00A0{1}\\u00A0heures\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} heures\\u00A0/\\u00A0{1} heures\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Objectif\\u00A0\\: {0} heures \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} affectations des temps\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 affectation des temps\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Aucune affectation\n\n#XMSG: No Recordings\nNO_RECORDING=Aucun enregistrement\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} heures approuv\\u00E9es\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Sauvegarder avec les temps\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Sauvegarder sans les temps\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Supprimer favoris\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ajouter aux favoris\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Organiser favoris\n\n#XFLD: Week \nWEEK=Semaine\n\n#XFLD:\nMEET_TARGET_HOURS=Appliquer les heures \\u00E0 \\:\n\n#XBUT\nALL_MISSING=Temps manquant au total ({0} heure/s)\n\n#XBUT: Delete Button Text\nDELETE=Supprimer\n\n#XBUT: Copy Button Text\nCOPY=Copier\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Ajouter entr\\u00E9e\n\n#XFLD: label for duration\nDURATION=Dur\\u00E9e\n\n#XFLD: label for total duration\nTOTAL_DURATION=Dur\\u00E9e totale\n\n#XFLD: label for status\nSTATUS=Statut\n\n#XFLD: label for start time\nSTART_TIME=Heure de d\\u00E9but\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nom du favori\n\n#XFLD: label for end Time\nEND_TIME=Heure de fin\n\n#XFLD: label for note\nNOTE=Note\n\n#XBUT: Done button\nDONE=Termin\\u00E9\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuellement\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Traiter entr\\u00E9e\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Affectation temps\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=S\\u00E9lection de favori ou r\\u00E9serve de travail\n\n# XTIT: select worklist\nSELECT_WORKLIST=S\\u00E9lection de r\\u00E9serve de travail\n\n# XTIT: Favorite\nFAVORITE=Favoris\n\n# XTIT: Worklist\nWORKLIST=R\\u00E9serve de travail\n\n# XTIT: Add Favorite\nADD_FAVORITE=Ajouter favori\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Modifier favoris\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Charger plus...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Chargement...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuer la recherche sur le serveur...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Chargement...\n\n#XFLD: BLANK\nEMPTY=Vide\n\n#XFLD: None\nNONE=N\\u00E9ant\n\n#XFLD\nNO_WORKLIST=Aucune r\\u00E9serve de travail disponible\n\n#XFLD\nNO_FAVORITE=Aucun favori disponible\n\n# XTIT: Select\nSELECT=S\\u00E9lectionner {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=S\\u00E9lectionner\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Rechercher...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Heures\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutes\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=D\\u00E9tails\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Options\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Toutes les donn\\u00E9es non sauvegard\\u00E9es seront perdues. Voulez-vous continuer ?\n\n# XTIT: \nUNSAVED_CHANGES=Modifications non sauvegard\\u00E9es\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Demande correctement envoy\\u00E9e\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Saisissez un nom de favori dans la zone de saisie Affectation des temps\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Effectuez des entr\\u00E9es \\u00E0 archiver comme favoris\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Saisissez une dur\\u00E9e valide\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Saisissez une heure de d\\u00E9but et de fin valide\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Version pr\\u00E9liminaire correctement sauvegard\\u00E9e\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favori cr\\u00E9\\u00E9\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favori mis \\u00E0 jour\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favori supprim\\u00E9\n\n#XBUT:\nHELP=Aide\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} heures saisies pour cette semaine\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Activez l\'option Pr\\u00E9-remplissage pour renseigner rapidement les heures de la semaine, bas\\u00E9es sur votre derni\\u00E8re entr\\u00E9e r\\u00E9ussie.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Certaines entr\\u00E9es sont incorrectes. Examinez les d\\u00E9tails d\'erreur et corrigez les entr\\u00E9es.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Saisie des temps pour {0} et {1} jour(s) de plus\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Modifier saisie des temps\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Cr\\u00E9er saisie des temps pour {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} heures {1} minutes\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=R\\u00E9initialiser\n\n#XBUT: Button to update\nUPDATE=Mettre \\u00E0 jour\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ajouter favori\n\n#XBUT: Button to create\nCREATE=Cr\\u00E9er\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nom de favori actuel\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nouveau nom de favori\n\n#XTIT: time\nTIME=Heure\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Demande supprim\\u00E9e\n\n#XTIT:\nWARNING=Avertissement\n',
		"cfr/etsapp/i18n/i18n_hr.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izaberite ugovor o radu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ugovori o radu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Otka\\u017Ei\n\n#XBUT: Button to close popover\nCLOSE=Zatvori\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Snimi nacrt\n\n# XTIT: \nTIMESHEET_TITLE=Moje bilje\\u017Eenje vremena\n\n#XTIT:\nINTERNAL_ERROR=Interna gre\\u0161ka\n\n#XTIT:\nERROR=Gre\\u0161ka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Pojavila se interna gre\\u0161ka povezana s obradom gre\\u0161aka u aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i favorite\n\n# XTIT: \nTIMESHEET=Unosi liste za bilje\\u017Eenje radnog vremena\n\n#XBUT: Button for quick entry\nQUICK_FILL=Brzi unos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Primijeni na\\:\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalji\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiraj vremenski unos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreiraj unos za {0} dana\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalji unosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalji unosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreiraj unos za {0}\n\n# XTIT: Month short header\nMONTH_0=Sij\n# XTIT: Month short header\nMONTH_1=Vlj\n# XTIT: Month short header\nMONTH_2=O\\u017Eu\n# XTIT: Month short header\nMONTH_3=Tra\n# XTIT: Month short header\nMONTH_4=Svi\n# XTIT: Month short header\nMONTH_5=Lip\n# XTIT: Month short header\nMONTH_6=Srp\n# XTIT: Month short header\nMONTH_7=Kolovoz\n# XTIT: Month short header\nMONTH_8=Rujan\n# XTIT: Month short header\nMONTH_9=Listopad\n# XTIT: Month short header\nMONTH_10=Studeni\n# XTIT: Month short header\nMONTH_11=Prosinac\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Sije\\u010Danj\n# XTIT: Month title for calendar\nMONTH_FULL_1=Velja\\u010Da\n# XTIT: Month title for calendar\nMONTH_FULL_2=O\\u017Eujak\n# XTIT: Month title for calendar\nMONTH_FULL_3=Travanj\n# XTIT: Month title for calendar\nMONTH_FULL_4=Svibanj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Lipanj\n# XTIT: Month title for calendar\nMONTH_FULL_6=Srpanj\n# XTIT: Month title for calendar\nMONTH_FULL_7=Kolovoz\n# XTIT: Month title for calendar\nMONTH_FULL_8=Rujan\n# XTIT: Month title for calendar\nMONTH_FULL_9=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_10=Studeni\n# XTIT: Month title for calendar\nMONTH_FULL_11=Prosinac\n\n# XTIT: Legend missing day\nMISSING_DAY=Radnja obavezna\n# XTIT: Legend filled day\nFILLED_DAY=Izvr\\u0161eno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Radnja odobravatelja potrebna\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odbijeno\n# XFLD: Legend future working day\nWORKING_DAY=Radni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Neradni dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Odabrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Odabrani neradni dan\n# XFLD: Legend current day\nCURRENT_DAY=Teku\\u0107i dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Ukupno nedostaje sati\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} sati)\n\n#XBUT: Button\nSAVE=Snimi\n\n#XBUT: Button \nSUBMIT=Podnesi\n\n# XMSG\nFILL_ALL=Unesi sate {0} za\\:\n\n#XFLD\nNO_TASK_TYPE=Nema tipa zadatka\n\n#XFLD\nMISSING_DAYS=Dani koji nedostaju\\: {0}\n\n#XBUT: Button\nHOME=Po\\u010Detna stranica\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrda\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi brisanje\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi podno\\u0161enje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi nacrt\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Sa\\u017Eetak vremenskih unosa odabranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Sa\\u017Eetak vremenskih unosa odabranih za podno\\u0161enje\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Sa\\u017Eetak odabranih vremenskih unosa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Broj unosa\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Broj sati\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} sat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} sati\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} sat/ {1} sati\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} sati / {1} sati\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} sati \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} dodjele vremena\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 dodjela vremena\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nema dodjela\n\n#XMSG: No Recordings\nNO_RECORDING=Nema slogova\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} sati odobreno\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Snimi s vremenom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Snimi bez vremena\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i favorite\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Snimi kao favorit\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljaj favoritima\n\n#XFLD: Week \nWEEK=Tjedan\n\n#XFLD:\nMEET_TARGET_HOURS=Primijeni sate na\\:\n\n#XBUT\nALL_MISSING=Ukupno vrijeme koje nedostaje ({0} sati)\n\n#XBUT: Delete Button Text\nDELETE=Izbri\\u0161i\n\n#XBUT: Copy Button Text\nCOPY=Kopiraj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj unos\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Ukupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Po\\u010Detno vrijeme\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Naziv favorita\n\n#XFLD: label for end Time\nEND_TIME=Zavr\\u0161no vrijeme\n\n#XFLD: label for note\nNOTE=Bilje\\u0161ka\n\n#XBUT: Done button\nDONE=Izvr\\u0161eno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ru\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Uredi unos\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodjela vremena\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Snimi favorit ili radnu listu\n\n# XTIT: select worklist\nSELECT_WORKLIST=Odaberi radnu listu\n\n# XTIT: Favorite\nFAVORITE=Favoriti\n\n# XTIT: Worklist\nWORKLIST=Radna lista\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj favorit\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Uredi favorite\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=U\\u010Ditaj vi\\u0161e...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=U\\u010Ditavanje...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nastavi tra\\u017Eenje na poslu\\u017Eitelju...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=U\\u010Ditavanje...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Ni\\u0161ta\n\n#XFLD\nNO_WORKLIST=Radna lista nije raspolo\\u017Eiva\n\n#XFLD\nNO_FAVORITE=Favoriti nisu raspolo\\u017Eivi\n\n# XTIT: Select\nSELECT=Odaberi {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Odaberi\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Tra\\u017Eenje...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Sati\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM, YYYY\n\n#XBUT:\nDETAIL=Detalji\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Postave\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Nesnimljeni podaci \\u0107e se odbaciti. \\u017Delite li zaista nastaviti?\n\n# XTIT: \nUNSAVED_CHANGES=Nesnimljene promjene\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahtjev podnesen.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Molimo, unesite naziv favorita u polje unosa dodjele vremena.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Kreiraj unose za pohranu kao favorit.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Molimo, unesite va\\u017Ee\\u0107e trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Unesite va\\u017Ee\\u0107e po\\u010Detno i zavr\\u0161no vrijeme.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Nacrt uspje\\u0161no snimljen.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorit kreiran.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorit a\\u017Euriran.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorit izbrisan.\n\n#XBUT:\nHELP=Pomo\\u0107\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} sati uneseno je za ovaj tjedan\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Uklju\\u010Dite predpopunjavanje za brzo popunjavanje sati za tjedan na osnovi zadnjeg uspje\\u0161nog unosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Neki unosi neto\\u010Dni; molimo, pregledajte detalje gre\\u0161ke i ispravite unose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Unos vremena za {0} i {1} vi\\u0161e dana\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Uredi vremenski unos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Unos vremena za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} sati {1} minuta\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Ponovno postavi\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriraj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj favorit\n\n#XBUT: Button to create\nCREATE=Kreiraj\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Trenutni naziv favorita\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Novi naziv favorita\n\n#XTIT: time\nTIME=Vrijeme\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahtjev izbrisan\n\n#XTIT:\nWARNING=Upozorenje\n',
		"cfr/etsapp/i18n/i18n_hu.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Foglalkoztat\\u00E1si szerz\\u0151d\\u00E9s v\\u00E1laszt\\u00E1sa\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Foglalkoztat\\u00E1si szerz\\u0151d\\u00E9sek\n\n#XFLD: label for from time\nFROM=Kezdete\\:\n\n#XFLD: label for to time\nTO=V\\u00E9ge\\:\n\n#XBUT: Button to cancel\nCANCEL=M\\u00E9gse\n\n#XBUT: Button to close popover\nCLOSE=Bez\\u00E1r\\u00E1s\n\n#XBUT: Button to accept\nOK=Rendben\n\n#XBUT: Button to affirm\nYES=Igen\n\n#XBUT: Button to decline\nNO=Nem\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Tervezet ment\\u00E9se\n\n# XTIT: \nTIMESHEET_TITLE=Saj\\u00E1t id\\u0151adatlap\n\n#XTIT:\nINTERNAL_ERROR=Bels\\u0151 hiba\n\n#XTIT:\nERROR=Hiba\n\n#XFLD:\nINTERNAL_ERROR_BODY=Hibakezel\\u00E9ssel \\u00F6sszef\\u00FCgg\\u0151 bels\\u0151 hiba t\\u00F6rt\\u00E9nt az alkalmaz\\u00E1sban.\n\n# XTIT:\nFAV_DIALOG_BOX=Kedvencek t\\u00F6rl\\u00E9se\n\n# XTIT: \nTIMESHEET=Id\\u0151adatlap-bejegyz\\u00E9sek\n\n#XBUT: Button for quick entry\nQUICK_FILL=Gyors bejegyz\\u00E9s\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Alkalmaz\\u00E1s\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=R\\u00E9szletek\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Id\\u0151bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa {0} naphoz\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Bejegyz\\u00E9s r\\u00E9szletei\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Bejegyz\\u00E9s r\\u00E9szletei - {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Bejegyz\\u00E9s l\\u00E9trehoz\\u00E1sa - {0}\n\n# XTIT: Month short header\nMONTH_0=Jan.\n# XTIT: Month short header\nMONTH_1=Febr.\n# XTIT: Month short header\nMONTH_2=M\\u00E1rc.\n# XTIT: Month short header\nMONTH_3=\\u00C1pr.\n# XTIT: Month short header\nMONTH_4=M\\u00E1j.\n# XTIT: Month short header\nMONTH_5=J\\u00FAn.\n# XTIT: Month short header\nMONTH_6=J\\u00FAl.\n# XTIT: Month short header\nMONTH_7=Aug.\n# XTIT: Month short header\nMONTH_8=Szept.\n# XTIT: Month short header\nMONTH_9=Okt.\n# XTIT: Month short header\nMONTH_10=Nov.\n# XTIT: Month short header\nMONTH_11=Dec.\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janu\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febru\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_2=M\\u00E1rcius\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u00C1prilis\n# XTIT: Month title for calendar\nMONTH_FULL_4=M\\u00E1jus\n# XTIT: Month title for calendar\nMONTH_FULL_5=J\\u00FAnius\n# XTIT: Month title for calendar\nMONTH_FULL_6=J\\u00FAlius\n# XTIT: Month title for calendar\nMONTH_FULL_7=Augusztus\n# XTIT: Month title for calendar\nMONTH_FULL_8=Szeptember\n# XTIT: Month title for calendar\nMONTH_FULL_9=Okt\\u00F3ber\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=M\\u0171velet sz\\u00FCks\\u00E9ges\n# XTIT: Legend filled day\nFILLED_DAY=K\\u00E9sz\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Enged\\u00E9lyez\\u0151i m\\u0171velet kell\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Elutas\\u00EDtva\n# XFLD: Legend future working day\nWORKING_DAY=Munkanap\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nem munkanap\n# XFLD: Legend selected working day\nSELECTED_DAY=Kiv\\u00E1lasztott nap\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Kiv\\u00E1lasztott szabadnap\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1lis nap\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 \\u00F3ra\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u00F3ra)\n\n#XBUT: Button\nSAVE=Ment\\u00E9s\n\n#XBUT: Button \nSUBMIT=Elk\\u00FCld\\u00E9s\n\n# XMSG\nFILL_ALL={0} \\u00F3ra megad\\u00E1sa a k\\u00F6vetkez\\u0151h\\u00F6z\\:\n\n#XFLD\nNO_TASK_TYPE=Nincs feladatt\\u00EDpus\n\n#XFLD\nMISSING_DAYS=Hi\\u00E1nyz\\u00F3 napok\\:  {0}\n\n#XBUT: Button\nHOME=Kezd\\u0151lap\n\n#XTIT: confirmation header\nCONFIRMATION=Visszaigazol\\u00E1s\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=T\\u00F6rl\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=K\\u00FCld\\u00E9s meger\\u0151s\\u00EDt\\u00E9se\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Tervezet meger\\u0151s\\u00EDt\\u00E9se\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=T\\u00F6rl\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=K\\u00FCld\\u00E9sre kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=A kiv\\u00E1lasztott id\\u0151bejegyz\\u00E9sek \\u00F6sszegz\\u00E9se\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Bejegyz\\u00E9sek sz\\u00E1ma\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u00D3r\\u00E1k sz\\u00E1ma\n\n#XBUT: Confirm Button\nCONFIRM=Visszaigazol\\u00E1s\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u00F3ra / {1} \\u00F3ra\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u00F3ra / {1} \\u00F3ra\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=C\\u00E9l\\: {0} \\u00F3ra \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nincs hozz\\u00E1rendel\\u00E9s\n\n#XMSG: No Recordings\nNO_RECORDING=Nincs rekord\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u00F3ra enged\\u00E9lyezve\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ment\\u00E9s id\\u0151vel\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ment\\u00E9s id\\u0151 n\\u00E9lk\\u00FCl\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Kedvencek t\\u00F6rl\\u00E9se\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ment\\u00E9s a kedvencek k\\u00F6z\\u00E9\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Kedvencek kezel\\u00E9se\n\n#XFLD: Week \nWEEK=H\\u00E9t\n\n#XFLD:\nMEET_TARGET_HOURS=\\u00D3r\\u00E1k alkalmaz\\u00E1sa\\:\n\n#XBUT\nALL_MISSING=\\u00D6sszes hi\\u00E1nyz\\u00F3 id\\u0151 ({0} \\u00F3ra)\n\n#XBUT: Delete Button Text\nDELETE=T\\u00F6rl\\u00E9s\n\n#XBUT: Copy Button Text\nCOPY=M\\u00E1sol\\u00E1s\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Bejegyz\\u00E9s hozz\\u00E1ad\\u00E1sa\n\n#XFLD: label for duration\nDURATION=Id\\u0151tartam\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u00D6sszid\\u0151tartam\n\n#XFLD: label for status\nSTATUS=St\\u00E1tus\n\n#XFLD: label for start time\nSTART_TIME=Kezd\\u00E9s id\\u0151pontja\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Kedvenc neve\n\n#XFLD: label for end Time\nEND_TIME=Befejez\\u00E9s id\\u0151pontja\n\n#XFLD: label for note\nNOTE=Megjegyz\\u00E9s\n\n#XBUT: Done button\nDONE=K\\u00E9sz\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1lis\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Bejegyz\\u00E9s feldolgoz\\u00E1sa\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Id\\u0151-hozz\\u00E1rendel\\u00E9s\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=V\\u00E1lassza ki a kedvenceket vagy a munka\\u00E1llom\\u00E1nyt\n\n# XTIT: select worklist\nSELECT_WORKLIST=Munka\\u00E1llom\\u00E1ny kiv\\u00E1laszt\\u00E1sa\n\n# XTIT: Favorite\nFAVORITE=Kedvencek\n\n# XTIT: Worklist\nWORKLIST=Munka\\u00E1llom\\u00E1ny\n\n# XTIT: Add Favorite\nADD_FAVORITE=Kedvenc hozz\\u00E1ad\\u00E1sa\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Kedvencek szerkeszt\\u00E9se\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=T\\u00F6bb bet\\u00F6lt\\u00E9se...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Bet\\u00F6lt\\u00E9s...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Keres\\u00E9s folytat\\u00E1sa a szerveren...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Bet\\u00F6lt\\u00E9s...\n\n#XFLD: BLANK\nEMPTY=\\u00DCres\n\n#XFLD: None\nNONE=Nincs\n\n#XFLD\nNO_WORKLIST=Nem \\u00E1ll rendelkez\\u00E9sre munka\\u00E1llom\\u00E1ny\n\n#XFLD\nNO_FAVORITE=Nem \\u00E1llnak rendelkez\\u00E9sre kedvencek\n\n# XTIT: Select\nSELECT={0} kiv\\u00E1laszt\\u00E1sa\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Kiv\\u00E1laszt\\u00E1s\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Keres\\u00E9s...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u00F3\n\n#XFLD: short label for minutes\nMINUTES_LABEL=p\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u00F3ra\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Percek\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY. MMM DD.\n\n#XBUT:\nDETAIL=R\\u00E9szletek\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Be\\u00E1ll\\u00EDt\\u00E1sok\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=A nem mentett adatok el lesznek vetve. Biztosan folytatja?\n\n# XTIT: \nUNSAVED_CHANGES=Nem mentett m\\u00F3dos\\u00EDt\\u00E1sok\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=K\\u00E9relem elk\\u00FCldve.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=K\\u00E9rem, adjon meg egy kedvenc nevet az id\\u0151-hozz\\u00E1rendel\\u00E9s beviteli mez\\u0151j\\u00E9ben.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=K\\u00E9rem, t\\u00F6ltse ki a mez\\u0151ket, hogy a kedvencek k\\u00F6z\\u00E9 tudja menteni.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=K\\u00E9rem, adjon meg \\u00E9rv\\u00E9nyes id\\u0151tartamot.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=K\\u00E9rem, \\u00E9rv\\u00E9nyes kezd\\u0151 \\u00E9s z\\u00E1r\\u00F3 d\\u00E1tumot adjon meg.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=A tervezet sikeresen elmentve.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Kedvenc l\\u00E9trehozva.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Kedvencek friss\\u00EDtve.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=T\\u00F6r\\u00F6lve a kedvencekb\\u0151l.\n\n#XBUT:\nHELP=Seg\\u00EDts\\u00E9g\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u00F3ra lett be\\u00EDrva erre a h\\u00E9tre.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Kapcsolja be az el\\u0151zetes kit\\u00F6lt\\u00E9st, ha gyorsan fel szeretn\\u00E9 t\\u00F6lteni a h\\u00E9t \\u00F3r\\u00E1it az utols\\u00F3 sikeres bejegyz\\u00E9s alapj\\u00E1n.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=N\\u00E9h\\u00E1ny bejegyz\\u00E9s helytelen. Vizsg\\u00E1lja meg a hib\\u00E1t, \\u00E9s jav\\u00EDtsa a bejegyz\\u00E9seket.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Id\\u0151bejegyz\\u00E9s a k\\u00F6vetkez\\u0151h\\u00F6z\\: {0} \\u00E9s {1} tov\\u00E1bbi nap\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Id\\u0151bejegyz\\u00E9s feldolgoz\\u00E1sa\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Id\\u0151bejegyz\\u00E9s - {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u00F3ra {1} perc\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u00F3 {1} p\n\n#XBUT: Button to reset\nRESET=Vissza\\u00E1ll\\u00EDt\\u00E1s\n\n#XBUT: Button to update\nUPDATE=Friss\\u00EDt\\u00E9s\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Kedvenc hozz\\u00E1ad\\u00E1sa\n\n#XBUT: Button to create\nCREATE=L\\u00E9trehoz\\u00E1s\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1lis kedvencn\\u00E9v\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u00DAj kedvencn\\u00E9v\n\n#XTIT: time\nTIME=Id\\u0151pont\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=K\\u00E9relem t\\u00F6r\\u00F6lve\n\n#XTIT:\nWARNING=Figyelmeztet\\u00E9s\n',
		"cfr/etsapp/i18n/i18n_it.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Seleziona un contratto d\'impiego\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratti d\'impiego\n\n#XFLD: label for from time\nFROM=Da\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Annulla\n\n#XBUT: Button to close popover\nCLOSE=Chiudi\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=S\\u00EC\n\n#XBUT: Button to decline\nNO=No\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Salva bozza\n\n# XTIT: \nTIMESHEET_TITLE=Il mio timesheet\n\n#XTIT:\nINTERNAL_ERROR=Errore interno\n\n#XTIT:\nERROR=Errore\n\n#XFLD:\nINTERNAL_ERROR_BODY=Nell\'applicazione si \\u00E8 verificato un errore interno legato al trattamento degli errori.\n\n# XTIT:\nFAV_DIALOG_BOX=Elimina preferiti\n\n# XTIT: \nTIMESHEET=Inserimenti timesheet\n\n#XBUT: Button for quick entry\nQUICK_FILL=Acquisizione rapida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Applica a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Dettagli\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Crea inserimento orari\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Crea inserimento per {0} giorni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Dettagli inserimento\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Dettagli inserimento per {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Crea inserimento per {0}\n\n# XTIT: Month short header\nMONTH_0=Gen\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mag\n# XTIT: Month short header\nMONTH_5=Giu\n# XTIT: Month short header\nMONTH_6=Lug\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Set\n# XTIT: Month short header\nMONTH_9=Ott\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dic\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Gennaio\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febbraio\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzo\n# XTIT: Month title for calendar\nMONTH_FULL_3=Aprile\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maggio\n# XTIT: Month title for calendar\nMONTH_FULL_5=Giugno\n# XTIT: Month title for calendar\nMONTH_FULL_6=Luglio\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Settembre\n# XTIT: Month title for calendar\nMONTH_FULL_9=Ottobre\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembre\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dicembre\n\n# XTIT: Legend missing day\nMISSING_DAY=Azione necessaria\n# XTIT: Legend filled day\nFILLED_DAY=Fatto\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Approvazione in sospeso\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rifiutato\n# XFLD: Legend future working day\nWORKING_DAY=Giorno lavorativo\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Giorno non lavorativo\n# XFLD: Legend selected working day\nSELECTED_DAY=Giorno selezionato\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Giorno non lavorativo selezionato\n# XFLD: Legend current day\nCURRENT_DAY=Giorno corrente\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Totale ore mancanti\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ore)\n\n#XBUT: Button\nSAVE=Salva\n\n#XBUT: Button \nSUBMIT=Invia\n\n# XMSG\nFILL_ALL=Inserisci {0} ore per\\:\n\n#XFLD\nNO_TASK_TYPE=Nessun tipo di task\n\n#XFLD\nMISSING_DAYS=Giorni mancanti\\: {0}\n\n#XBUT: Button\nHOME=Pagina iniziale\n\n#XTIT: confirmation header\nCONFIRMATION=Conferma\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Conferma eliminazione\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Conferma invio\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Conferma bozza\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per eliminazione\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato per invio\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Riepilogo di inserimenti orari selezionato\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Numero di inserimenti\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Numero di ore\n\n#XBUT: Confirm Button\nCONFIRM=Conferma\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} ora\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ore\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} ora / {1} ore\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ore / {1} ore\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Obiettivo\\: {0} ore \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} assegnazioni orari\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 assegnazione orari\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nessuna assegnazione\n\n#XMSG: No Recordings\nNO_RECORDING=Nessun record\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} ore approvate\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Salva con tempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Salva senza tempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Elimina preferiti\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Salva come Preferito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestisci Preferiti\n\n#XFLD: Week \nWEEK=Settimana\n\n#XFLD:\nMEET_TARGET_HOURS=Applica ore a\\:\n\n#XBUT\nALL_MISSING=Tutti gli orari mancanti ({0} ore)\n\n#XBUT: Delete Button Text\nDELETE=Elimina\n\n#XBUT: Copy Button Text\nCOPY=Copia\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Aggiungi inserimento\n\n#XFLD: label for duration\nDURATION=Durata\n\n#XFLD: label for total duration\nTOTAL_DURATION=Durata totale\n\n#XFLD: label for status\nSTATUS=Stato\n\n#XFLD: label for start time\nSTART_TIME=Ora di inizio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nome Preferito\n\n#XFLD: label for end Time\nEND_TIME=Ora di fine\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Fatto\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuale\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Elabora inserimento\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Assegnazione orari\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Seleziona preferito o lista di lavoro\n\n# XTIT: select worklist\nSELECT_WORKLIST=Seleziona lista di lavoro\n\n# XTIT: Favorite\nFAVORITE=Preferiti\n\n# XTIT: Worklist\nWORKLIST=Lista di lavoro\n\n# XTIT: Add Favorite\nADD_FAVORITE=Aggiungi Preferito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Elabora Preferiti\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Carica altro...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=In caricamento ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continua ricerca sul server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=In caricamento ...\n\n#XFLD: BLANK\nEMPTY=Vuoto\n\n#XFLD: None\nNONE=Nessun elemento\n\n#XFLD\nNO_WORKLIST=Nessuna lista di lavoro disponibile\n\n#XFLD\nNO_FAVORITE=Nessun preferito disponibile\n\n# XTIT: Select\nSELECT=Seleziona {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Seleziona\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Cerca...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ore\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuti\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Dettagli\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Impostazioni\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=I dati non salvati andranno persi. Continuare?\n\n# XTIT: \nUNSAVED_CHANGES=Modifiche non salvate\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Richiesta inviata.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Inserisci un nome di un Preferito nel campo di input Assegnazione orari.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Inserisci valori da archiviare come Preferiti.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Inserisci una durata valida.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Inserisci un\'ora d\'inizio e di fine valide.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Bozza salvata correttamente.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Preferito creato.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Preferito aggiornato.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Preferito eliminato.\n\n#XBUT:\nHELP=Help\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ore inserite per questa settimana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Attiva Precompila per acquisire rapidamente ore della settimana in base all\'ultimo inserimento effettuato.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Alcuni inserimenti sono errati; verifica dettagli errore e correggi gli inserimenti.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Inserimento orari per {0} e {1} pi\\u00F9 giorni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Elabora inserimento orari\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Inserimento orari per {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ore {1} minuti\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Resetta\n\n#XBUT: Button to update\nUPDATE=Aggiorna\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Aggiungi Preferito\n\n#XBUT: Button to create\nCREATE=Crea\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nome Preferito attuale\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nuovo nome Preferito\n\n#XTIT: time\nTIME=Ora\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Richiesta eliminata\n\n#XTIT:\nWARNING=Messaggio di avvertimento\n',
		"cfr/etsapp/i18n/i18n_iw.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u05D1\\u05D7\\u05E8 \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E2\\u05D5\\u05D1\\u05D3\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05E2\\u05D5\\u05D1\\u05D3\\u05D9\\u05DD\n\n#XFLD: label for from time\nFROM=\\u05DE-\n\n#XFLD: label for to time\nTO=\\u05E2\\u05D3\n\n#XBUT: Button to cancel\nCANCEL=\\u05D1\\u05D8\\u05DC\n\n#XBUT: Button to close popover\nCLOSE=\\u05E1\\u05D2\\u05D5\\u05E8\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u05DB\\u05DF\n\n#XBUT: Button to decline\nNO=\\u05DC\\u05D0\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\n\n# XTIT: \nTIMESHEET_TITLE=\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05D4\\u05E9\\u05E2\\u05D5\\u05EA \\u05E9\\u05DC\\u05D9\n\n#XTIT:\nINTERNAL_ERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA\n\n#XTIT:\nERROR=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05E4\\u05E0\\u05D9\\u05DE\\u05D9\\u05EA \\u05D4\\u05E7\\u05E9\\u05D5\\u05E8\\u05D4 \\u05DC\\u05D8\\u05D9\\u05E4\\u05D5\\u05DC \\u05D1\\u05E9\\u05D2\\u05D9\\u05D0\\u05D5\\u05EA \\u05D0\\u05D9\\u05E8\\u05E2\\u05D4 \\u05D1\\u05D9\\u05D9\\u05E9\\u05D5\\u05DD.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n# XTIT: \nTIMESHEET=\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05D1\\u05D2\\u05D9\\u05DC\\u05D9\\u05D5\\u05DF \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u05D4\\u05D6\\u05E0\\u05D4 \\u05DE\\u05D4\\u05D9\\u05E8\\u05D4\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u05D4\\u05D7\\u05DC \\u05E2\\u05DC\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D9\\u05DE\\u05D9\\u05DD\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XTIT: Month short header\nMONTH_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\n# XTIT: Month short header\nMONTH_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\n# XTIT: Month short header\nMONTH_2=\\u05DE\\u05E8\\u05E5\n# XTIT: Month short header\nMONTH_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\n# XTIT: Month short header\nMONTH_4=\\u05DE\\u05D0\\u05D9\n# XTIT: Month short header\nMONTH_5=\\u05D9\\u05D5\\u05E0\\u05D9\n# XTIT: Month short header\nMONTH_6=\\u05D9\\u05D5\\u05DC\\u05D9\n# XTIT: Month short header\nMONTH_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\n# XTIT: Month short header\nMONTH_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\n# XTIT: Month short header\nMONTH_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u05D9\\u05E0\\u05D5\\u05D0\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u05E4\\u05D1\\u05E8\\u05D5\\u05D0\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u05DE\\u05E8\\u05E5\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u05D0\\u05E4\\u05E8\\u05D9\\u05DC\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u05DE\\u05D0\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u05D9\\u05D5\\u05E0\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u05D9\\u05D5\\u05DC\\u05D9\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u05D0\\u05D5\\u05D2\\u05D5\\u05E1\\u05D8\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u05E1\\u05E4\\u05D8\\u05DE\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u05D0\\u05D5\\u05E7\\u05D8\\u05D5\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u05E0\\u05D5\\u05D1\\u05DE\\u05D1\\u05E8\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u05D3\\u05E6\\u05DE\\u05D1\\u05E8\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u05E4\\u05E2\\u05D5\\u05DC\\u05D4 \\u05E0\\u05D3\\u05E8\\u05E9\\u05EA\n# XTIT: Legend filled day\nFILLED_DAY=\\u05D1\\u05D5\\u05E6\\u05E2\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u05E0\\u05D3\\u05E8\\u05E9\\u05EA \\u05E4\\u05E2\\u05D9\\u05DC\\u05D5\\u05EA \\u05DE\\u05E6\\u05D3 \\u05D4\\u05DE\\u05D0\\u05E9\\u05E8\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u05E0\\u05D3\\u05D7\\u05D4\n# XFLD: Legend future working day\nWORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u05D9\\u05D5\\u05DD \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D1\\u05D7\\u05E8 \\u05E9\\u05D0\\u05D9\\u05E0\\u05D5 \\u05D9\\u05D5\\u05DD \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n# XFLD: Legend current day\nCURRENT_DAY=\\u05D9\\u05D5\\u05DD \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u05E1\\u05D4"\\u05DB \\u05E9\\u05E2\\u05D5\\u05EA \\u05D7\\u05E1\\u05E8\\u05D5\\u05EA\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u05E9\\u05E2\\u05D5\\u05EA)\n\n#XBUT: Button\nSAVE=\\u05E9\\u05DE\\u05D5\\u05E8\n\n#XBUT: Button \nSUBMIT=\\u05D4\\u05D2\\u05E9\n\n# XMSG\nFILL_ALL=\\u05D4\\u05D6\\u05DF {0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8\\:\n\n#XFLD\nNO_TASK_TYPE=\\u05D0\\u05D9\\u05DF \\u05E1\\u05D5\\u05D2 \\u05DE\\u05E9\\u05D9\\u05DE\\u05D4\n\n#XFLD\nMISSING_DAYS=\\u05D9\\u05DE\\u05D9\\u05DD \\u05D7\\u05E1\\u05E8\\u05D9\\u05DD\\: {0}\n\n#XBUT: Button\nHOME=\\u05D3\\u05E3 \\u05D4\\u05D1\\u05D9\\u05EA\n\n#XTIT: confirmation header\nCONFIRMATION=\\u05D0\\u05D9\\u05E9\\u05D5\\u05E8\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D4\\u05D2\\u05E9\\u05D4\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u05D0\\u05E9\\u05E8 \\u05D8\\u05D9\\u05D5\\u05D8\\u05D4\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05DE\\u05D7\\u05D9\\u05E7\\u05D4\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5 \\u05DC\\u05D4\\u05D2\\u05E9\\u05D4\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u05E1\\u05D9\\u05DB\\u05D5\\u05DD \\u05E9\\u05DC \\u05E8\\u05D9\\u05E9\\u05D5\\u05DE\\u05D9 \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E9\\u05E0\\u05D1\\u05D7\\u05E8\\u05D5\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u05DE\\u05E1\\u05E4\\u05E8 \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XBUT: Confirm Button\nCONFIRM=\\u05D0\\u05E9\\u05E8\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} \n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR=\\u05E9\\u05E2\\u05D4 {0} / {1} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA / {1} \\u05E9\\u05E2\\u05D5\\u05EA\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u05D9\\u05E2\\u05D3\\: {0} \\u05E9\\u05E2\\u05D5\\u05EA \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA \\u05D6\\u05DE\\u05DF\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D6\\u05DE\\u05DF 1\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u05DC\\u05DC\\u05D0 \\u05D4\\u05E7\\u05E6\\u05D0\\u05D5\\u05EA\n\n#XMSG: No Recordings\nNO_RECORDING=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D5\\u05DE\\u05D5\\u05EA\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D0\\u05D5\\u05E9\\u05E8\\u05D5\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05E2\\u05DD \\u05D6\\u05DE\\u05DF\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DC\\u05DC\\u05D0 \\u05D6\\u05DE\\u05DF\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u05DE\\u05D7\\u05E7 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u05E9\\u05DE\\u05D5\\u05E8 \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u05E0\\u05D4\\u05DC \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XFLD: Week \nWEEK=\\u05E9\\u05D1\\u05D5\\u05E2\n\n#XFLD:\nMEET_TARGET_HOURS=\\u05D4\\u05D7\\u05DC \\u05E9\\u05E2\\u05D5\\u05EA \\u05DC\\:\n\n#XBUT\nALL_MISSING=\\u05DB\\u05DC \\u05D4\\u05D6\\u05DE\\u05DF \\u05D4\\u05D7\\u05E1\\u05E8 ({0} \\u05E9\\u05E2\\u05D5\\u05EA)\n\n#XBUT: Delete Button Text\nDELETE=\\u05DE\\u05D7\\u05E7\n\n#XBUT: Copy Button Text\nCOPY=\\u05D4\\u05E2\\u05EA\\u05E7\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05D4\\u05D6\\u05E0\\u05D4\n\n#XFLD: label for duration\nDURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05DB\\u05D5\\u05DC\\u05DC\n\n#XFLD: label for status\nSTATUS=\\u05E1\\u05D8\\u05D0\\u05D8\\u05D5\\u05E1\n\n#XFLD: label for start time\nSTART_TIME=\\u05E9\\u05E2\\u05EA \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XFLD: label for end Time\nEND_TIME=\\u05E9\\u05E2\\u05EA \\u05E1\\u05D9\\u05D5\\u05DD\n\n#XFLD: label for note\nNOTE=\\u05D4\\u05E2\\u05E8\\u05D4\n\n#XBUT: Done button\nDONE=\\u05D1\\u05D5\\u05E6\\u05E2\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u05D9\\u05D3\\u05E0\\u05D9\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u05E2\\u05E8\\u05D5\\u05DA \\u05D4\\u05D6\\u05E0\\u05D4\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05E9\\u05E2\\u05D4\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u05D1\\u05D7\\u05E8 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D0\\u05D5 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u05D1\\u05D7\\u05E8 \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Favorite\nFAVORITE=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n# XTIT: Worklist\nWORKLIST=\\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u05E2\\u05E8\\u05D5\\u05DA \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u05D8\\u05E2\\u05DF \\u05E2\\u05D5\\u05D3...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u05D4\\u05DE\\u05E9\\u05DA \\u05D7\\u05D9\\u05E4\\u05D5\\u05E9 \\u05D1\\u05E9\\u05E8\\u05EA...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u05D8\\u05D5\\u05E2\\u05DF ...\n\n#XFLD: BLANK\nEMPTY=\\u05E8\\u05D9\\u05E7\n\n#XFLD: None\nNONE=\\u05D0\\u05E3 \\u05D0\\u05D7\\u05D3\n\n#XFLD\nNO_WORKLIST=\\u05D0\\u05D9\\u05DF \\u05E8\\u05E9\\u05D9\\u05DE\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05D6\\u05DE\\u05D9\\u05E0\\u05D4\n\n#XFLD\nNO_FAVORITE=\\u05D0\\u05D9\\u05DF \\u05DE\\u05D5\\u05E2\\u05D3\\u05E4\\u05D9\\u05DD \\u05D6\\u05DE\\u05D9\\u05E0\\u05D9\\u05DD\n\n# XTIT: Select\nSELECT=\\u05D1\\u05D7\\u05E8 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u05D1\\u05D7\\u05E8\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u05D7\\u05E4\\u05E9...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u05E9\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u05D3\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u05E9\\u05E2\\u05D5\\u05EA\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u05D3\\u05E7\\u05D5\\u05EA\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=\\u05E4\\u05E8\\u05D8\\u05D9\\u05DD\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u05D4\\u05D2\\u05D3\\u05E8\\u05D5\\u05EA\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u05E0\\u05EA\\u05D5\\u05E0\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05D9\\u05D9\\u05E9\\u05DE\\u05E8\\u05D5 \\u05D9\\u05D5\\u05E1\\u05E8\\u05D5. \\u05D4\\u05D0\\u05DD \\u05D0\\u05EA\\u05D4 \\u05D1\\u05D8\\u05D5\\u05D7 \\u05E9\\u05D1\\u05E8\\u05E6\\u05D5\\u05E0\\u05DA \\u05DC\\u05D4\\u05DE\\u05E9\\u05D9\\u05DA?\n\n# XTIT: \nUNSAVED_CHANGES=\\u05E9\\u05D9\\u05E0\\u05D5\\u05D9\\u05D9\\u05DD \\u05E9\\u05DC\\u05D0 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D5\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u05D4\\u05D1\\u05E7\\u05E9\\u05D4 \\u05D4\\u05D5\\u05D2\\u05E9\\u05D4.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u05D4\\u05D6\\u05DF \\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D1\\u05E9\\u05D3\\u05D4 \\u05D4\\u05E7\\u05DC\\u05D8 \\u05E9\\u05DC \\u05D4\\u05E7\\u05E6\\u05D0\\u05EA \\u05D4\\u05E9\\u05E2\\u05D4.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u05E6\\u05D5\\u05E8 \\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05DC\\u05D0\\u05D7\\u05E1\\u05D5\\u05DF \\u05DB\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E9\\u05DC\\u05DA.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05DE\\u05E9\\u05DA \\u05D6\\u05DE\\u05DF \\u05D7\\u05D5\\u05E7\\u05D9.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u05D4\\u05D6\\u05DF \\u05D6\\u05DE\\u05DF \\u05D4\\u05EA\\u05D7\\u05DC\\u05D4 \\u05D5\\u05D6\\u05DE\\u05DF \\u05E1\\u05D9\\u05D5\\u05DD \\u05D7\\u05D5\\u05E7\\u05D9\\u05D9\\u05DD.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u05D4\\u05D8\\u05D9\\u05D5\\u05D8\\u05D4 \\u05E0\\u05E9\\u05DE\\u05E8\\u05D4 \\u05D1\\u05D4\\u05E6\\u05DC\\u05D7\\u05D4.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05E6\\u05E8.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E2\\u05D5\\u05D3\\u05DB\\u05DF.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05DE\\u05D7\\u05E7.\n\n#XBUT:\nHELP=\\u05E2\\u05D6\\u05E8\\u05D4\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u05E9\\u05E2\\u05D5\\u05EA \\u05D4\\u05D5\\u05D6\\u05E0\\u05D5 \\u05E2\\u05D1\\u05D5\\u05E8 \\u05E9\\u05D1\\u05D5\\u05E2 \\u05D6\\u05D4\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u05D4\\u05E4\\u05E2\\u05DC \\u05DE\\u05D9\\u05DC\\u05D5\\u05D9 \\u05DE\\u05E8\\u05D0\\u05E9 \\u05DB\\u05D3\\u05D9 \\u05DC\\u05D4\\u05D6\\u05D9\\u05DF \\u05D1\\u05DE\\u05D4\\u05D9\\u05E8\\u05D5\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 \\u05D4\\u05E9\\u05D1\\u05D5\\u05E2 \\u05E2\\u05DC \\u05D1\\u05E1\\u05D9\\u05E1 \\u05D4\\u05D4\\u05D6\\u05E0\\u05D4 \\u05D4\\u05DE\\u05D5\\u05E6\\u05DC\\u05D7\\u05EA \\u05D4\\u05D0\\u05D7\\u05E8\\u05D5\\u05E0\\u05D4 \\u05E9\\u05DC\\u05DA.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u05D7\\u05DC\\u05E7 \\u05DE\\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA \\u05E9\\u05D2\\u05D5\\u05D9\\u05D5\\u05EA. \\u05E1\\u05E7\\u05D5\\u05E8 \\u05D0\\u05EA \\u05E4\\u05E8\\u05D8\\u05D9 \\u05D4\\u05E9\\u05D2\\u05D9\\u05D0\\u05D4 \\u05D5\\u05EA\\u05E7\\u05DF \\u05D0\\u05EA \\u05D4\\u05D4\\u05D6\\u05E0\\u05D5\\u05EA.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u05D4\\u05D6\\u05E0\\u05EA \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05E8 {0} \\u05D5-{1} \\u05D9\\u05DE\\u05D9\\u05DD \\u05E0\\u05D5\\u05E1\\u05E4\\u05D9\\u05DD\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u05E2\\u05E8\\u05D5\\u05DA \\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u05E8\\u05D9\\u05E9\\u05D5\\u05DD \\u05E9\\u05E2\\u05D5\\u05EA \\u05E2\\u05D1\\u05D5\\u05D3\\u05D4 \\u05E2\\u05D1\\u05D5\\u05E8 {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u05E9\\u05E2\\u05D5\\u05EA {1} \\u05D3\\u05E7\\u05D5\\u05EA\n\n#XBUT: Button to reset\nRESET=\\u05D0\\u05E4\\u05E1\n\n#XBUT: Button to update\nUPDATE=\\u05E2\\u05D3\\u05DB\\u05DF\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u05D4\\u05D5\\u05E1\\u05E3 \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3\n\n#XBUT: Button to create\nCREATE=\\u05E6\\u05D5\\u05E8\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05E0\\u05D5\\u05DB\\u05D7\\u05D9\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u05E9\\u05DD \\u05DE\\u05D5\\u05E2\\u05D3\\u05E3 \\u05D7\\u05D3\\u05E9\n\n#XTIT: time\nTIME=\\u05E9\\u05E2\\u05D4\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u05D4\\u05D1\\u05E7\\u05E9\\u05D4 \\u05E0\\u05DE\\u05D7\\u05E7\\u05D4\n\n#XTIT:\nWARNING=\\u05D0\\u05D6\\u05D4\\u05E8\\u05D4\n',
		"cfr/etsapp/i18n/i18n_ja.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u5F93\\u696D\\u54E1\\u5272\\u5F53\\u306E\\u9078\\u629E\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u5F93\\u696D\\u54E1\\u5272\\u5F53\n\n#XFLD: label for from time\nFROM=\\u958B\\u59CB\n\n#XFLD: label for to time\nTO=\\u7D42\\u4E86\n\n#XBUT: Button to cancel\nCANCEL=\\u4E2D\\u6B62\n\n#XBUT: Button to close popover\nCLOSE=\\u9589\\u3058\\u308B\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u306F\\u3044\n\n#XBUT: Button to decline\nNO=\\u3044\\u3044\\u3048\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u30C9\\u30E9\\u30D5\\u30C8\\u4FDD\\u5B58\n\n# XTIT: \nTIMESHEET_TITLE=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\n\n#XTIT:\nINTERNAL_ERROR=\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\n\n#XTIT:\nERROR=\\u30A8\\u30E9\\u30FC\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u30A8\\u30E9\\u30FC\\u51E6\\u7406\\u306B\\u95A2\\u9023\\u3059\\u308B\\u5185\\u90E8\\u30A8\\u30E9\\u30FC\\u304C\\u30A2\\u30D7\\u30EA\\u30B1\\u30FC\\u30B7\\u30E7\\u30F3\\u3067\\u767A\\u751F\\u3057\\u307E\\u3057\\u305F\\u3002\n\n# XTIT:\nFAV_DIALOG_BOX=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\n\n# XTIT: \nTIMESHEET=\\u30BF\\u30A4\\u30E0\\u30B7\\u30FC\\u30C8\\u5165\\u529B\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u7C21\\u6613\\u5165\\u529B\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u9069\\u7528\\u5148\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u8A73\\u7D30\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u6642\\u9593\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE={0} \\u65E5\\u9593\\u306E\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u5165\\u529B\\u8A73\\u7D30\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u8A73\\u7D30\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE={0} \\u306E\\u5165\\u529B\\u767B\\u9332\n\n# XTIT: Month short header\nMONTH_0=1 \\u6708\n# XTIT: Month short header\nMONTH_1=2 \\u6708\n# XTIT: Month short header\nMONTH_2=3 \\u6708\n# XTIT: Month short header\nMONTH_3=4 \\u6708\n# XTIT: Month short header\nMONTH_4=5 \\u6708\n# XTIT: Month short header\nMONTH_5=6 \\u6708\n# XTIT: Month short header\nMONTH_6=7 \\u6708\n# XTIT: Month short header\nMONTH_7=8 \\u6708\n# XTIT: Month short header\nMONTH_8=9 \\u6708\n# XTIT: Month short header\nMONTH_9=10 \\u6708\n# XTIT: Month short header\nMONTH_10=11 \\u6708\n# XTIT: Month short header\nMONTH_11=12 \\u6708\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=1 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_1=2 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_2=3 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_3=4 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_4=5 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_5=6 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_6=7 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_7=8 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_8=9 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_9=10 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_10=11 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_11=12 \\u6708\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\n# XTIT: Legend filled day\nFILLED_DAY=\\u5B8C\\u4E86\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u627F\\u8A8D\\u8005\\u30A2\\u30AF\\u30B7\\u30E7\\u30F3\\u5FC5\\u9808\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u5374\\u4E0B\\u6E08\n# XFLD: Legend future working day\nWORKING_DAY=\\u52E4\\u52D9\\u65E5\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u4F11\\u65E5\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u9078\\u629E\\u65E5\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u9078\\u629E\\u6E08\\u306E\\u4F11\\u65E5\n# XFLD: Legend current day\nCURRENT_DAY=\\u73FE\\u5728\\u65E5\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u5408\\u8A08\\u4E0D\\u8DB3\\u6642\\u9593\\u6570\\:  {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} \\u65E5 ({2} \\u6642\\u9593)\n\n#XBUT: Button\nSAVE=\\u4FDD\\u5B58\n\n#XBUT: Button \nSUBMIT=\\u9001\\u4FE1\n\n# XMSG\nFILL_ALL={0} \\u6642\\u9593\\u3092\\u5165\\u529B\\: \n\n#XFLD\nNO_TASK_TYPE=\\u30BF\\u30B9\\u30AF\\u30BF\\u30A4\\u30D7\\u306A\\u3057\n\n#XFLD\nMISSING_DAYS=\\u4E0D\\u8DB3\\u65E5\\u6570\\: {0}\n\n#XBUT: Button\nHOME=\\u30DB\\u30FC\\u30E0\n\n#XTIT: confirmation header\nCONFIRMATION=\\u78BA\\u8A8D\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u524A\\u9664\\u78BA\\u8A8D\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u9001\\u4FE1\\u78BA\\u8A8D\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u30C9\\u30E9\\u30D5\\u30C8\\u78BA\\u8A8D\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u524A\\u9664\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u9001\\u4FE1\\u5BFE\\u8C61\\u3068\\u3057\\u3066\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u9078\\u629E\\u3055\\u308C\\u305F\\u6642\\u9593\\u5165\\u529B\\u306E\\u30B5\\u30DE\\u30EA\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u5165\\u529B\\u6570\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u6642\\u9593\\u6570\n\n#XBUT: Confirm Button\nCONFIRM=\\u78BA\\u8A8D\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} \\u65E5 - {1}  \\u65E5\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} \\u65E5 - {1} \\u65E5\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Hour\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u6642\\u9593\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u6642\\u9593/{1} \\u6642\\u9593\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u6642\\u9593/{1} \\u6642\\u9593\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u76EE\\u6A19\\:  {0} \\u6642\\u9593 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u6642\\u9593\\u5272\\u5F53\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u6642\\u9593\\u5272\\u5F53\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u5272\\u5F53\\u306A\\u3057\n\n#XMSG: No Recordings\nNO_RECORDING=\\u30EC\\u30B3\\u30FC\\u30C9\\u306A\\u3057\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u6642\\u9593\\u304C\\u627F\\u8A8D\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u3042\\u308A)\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58 (\\u6642\\u9593\\u306A\\u3057)\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u524A\\u9664\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u7BA1\\u7406\n\n#XFLD: Week \nWEEK=\\u9031\n\n#XFLD:\nMEET_TARGET_HOURS=\\u6642\\u9593\\u9069\\u7528\\u5148\\:\n\n#XBUT\nALL_MISSING=\\u5168\\u4E0D\\u8DB3\\u6642\\u9593 ({0} \\u6642\\u9593)\n\n#XBUT: Delete Button Text\nDELETE=\\u524A\\u9664\n\n#XBUT: Copy Button Text\nCOPY=\\u30B3\\u30D4\\u30FC\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u5165\\u529B\\u8FFD\\u52A0\n\n#XFLD: label for duration\nDURATION=\\u671F\\u9593\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u5408\\u8A08\\u671F\\u9593\n\n#XFLD: label for status\nSTATUS=\\u30B9\\u30C6\\u30FC\\u30BF\\u30B9\n\n#XFLD: label for start time\nSTART_TIME=\\u958B\\u59CB\\u6642\\u523B\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\n\n#XFLD: label for end Time\nEND_TIME=\\u7D42\\u4E86\\u6642\\u523B\n\n#XFLD: label for note\nNOTE=\\u30E1\\u30E2\n\n#XBUT: Done button\nDONE=\\u5B8C\\u4E86\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u30DE\\u30CB\\u30E5\\u30A2\\u30EB\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u5165\\u529B\\u306E\\u7DE8\\u96C6\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u6642\\u9593\\u5272\\u5F53\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u307E\\u305F\\u306F\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306E\\u9078\\u629E\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u9078\\u629E\n\n# XTIT: Favorite\nFAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\n\n# XTIT: Worklist\nWORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u7DE8\\u96C6\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u8FFD\\u52A0\\u30ED\\u30FC\\u30C9...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u30B5\\u30FC\\u30D0\\u3067\\u306E\\u691C\\u7D22\\u3092\\u7D9A\\u884C...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u30ED\\u30FC\\u30C9\\u4E2D...\n\n#XFLD: BLANK\nEMPTY=\\u7A7A\\u767D\n\n#XFLD: None\nNONE=\\u306A\\u3057\n\n#XFLD\nNO_WORKLIST=\\u30EF\\u30FC\\u30AF\\u30EA\\u30B9\\u30C8\\u306A\\u3057\n\n#XFLD\nNO_FAVORITE=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306A\\u3057\n\n# XTIT: Select\nSELECT={0} \\u306E\\u9078\\u629E\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u9078\\u629E\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u691C\\u7D22...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u6642\\u9593\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u5206\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u6642\\u9593\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u5206\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY/MM/DD\n\n#XBUT:\nDETAIL=\\u8A73\\u7D30\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u8A2D\\u5B9A\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u672A\\u4FDD\\u5B58\\u306E\\u30C7\\u30FC\\u30BF\\u306F\\u3059\\u3079\\u3066\\u7834\\u68C4\\u3055\\u308C\\u307E\\u3059\\u3002\\u7D9A\\u884C\\u3057\\u307E\\u3059\\u304B\\u3002\n\n# XTIT: \nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u306E\\u5909\\u66F4\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u7533\\u8ACB\\u304C\\u9001\\u4FE1\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u6642\\u9593\\u5272\\u5F53\\u5165\\u529B\\u9805\\u76EE\\u306B\\u304A\\u6C17\\u306B\\u5165\\u308A\\u306E\\u540D\\u79F0\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u3068\\u3057\\u3066\\u4FDD\\u5B58\\u3059\\u308B\\u9805\\u76EE\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u6709\\u52B9\\u306A\\u671F\\u9593\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u6709\\u52B9\\u306A\\u958B\\u59CB\\u6642\\u523B\\u304A\\u3088\\u3073\\u7D42\\u4E86\\u6642\\u523B\\u3092\\u5165\\u529B\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u30C9\\u30E9\\u30D5\\u30C8\\u304C\\u4FDD\\u5B58\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u767B\\u9332\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u66F4\\u65B0\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\\u3002\n\n#XBUT:\nHELP=\\u30D8\\u30EB\\u30D7\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u4ECA\\u9031\\u306B\\u3064\\u3044\\u3066 {0}/{1} \\u6642\\u9593\\u304C\\u5165\\u529B\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u4E8B\\u524D\\u5165\\u529B\\u3092\\u6709\\u52B9\\u306B\\u3059\\u308B\\u3068\\u3001\\u524D\\u56DE\\u306E\\u9069\\u5207\\u306A\\u5165\\u529B\\u306B\\u57FA\\u3065\\u3044\\u3066\\u9031\\u306E\\u6642\\u9593\\u3092\\u7C21\\u5358\\u306B\\u5165\\u529B\\u3059\\u308B\\u3053\\u3068\\u304C\\u3067\\u304D\\u307E\\u3059\\u3002\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u5165\\u529B\\u306E\\u4E00\\u90E8\\u304C\\u4E0D\\u9069\\u5207\\u3067\\u3059\\u3002\\u30A8\\u30E9\\u30FC\\u8A73\\u7D30\\u3092\\u78BA\\u8A8D\\u3057\\u3001\\u5165\\u529B\\u3092\\u4FEE\\u6B63\\u3057\\u3066\\u304F\\u3060\\u3055\\u3044\\u3002\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} \\u65E5\\u9593\\u3068\\u3055\\u3089\\u306B {1} \\u65E5\\u9593\\u306E\\u6642\\u9593\\u5165\\u529B\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u6642\\u9593\\u5165\\u529B\\u7DE8\\u96C6\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u65E5\\u306E\\u6642\\u9593\\u5165\\u529B\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u6642\\u9593 {1} \\u5206\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=\\u30EA\\u30BB\\u30C3\\u30C8\n\n#XBUT: Button to update\nUPDATE=\\u66F4\\u65B0\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u304A\\u6C17\\u306B\\u5165\\u308A\\u8FFD\\u52A0\n\n#XBUT: Button to create\nCREATE=\\u767B\\u9332\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u73FE\\u5728\\u306E\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u65B0\\u898F\\u304A\\u6C17\\u306B\\u5165\\u308A\\u540D\n\n#XTIT: time\nTIME=\\u6642\\u9593\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u7533\\u8ACB\\u304C\\u524A\\u9664\\u3055\\u308C\\u307E\\u3057\\u305F\n\n#XTIT:\nWARNING=\\u8B66\\u544A\n',
		"cfr/etsapp/i18n/i18n_no.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Velg en ansettelseskontrakt\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ansettelseskontrakter\n\n#XFLD: label for from time\nFROM=Fra\n\n#XFLD: label for to time\nTO=Til\n\n#XBUT: Button to cancel\nCANCEL=Avbryt\n\n#XBUT: Button to close popover\nCLOSE=Lukk\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Ja\n\n#XBUT: Button to decline\nNO=Nei\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Lagre utkast\n\n# XTIT: \nTIMESHEET_TITLE=Min tidsregistrering\n\n#XTIT:\nINTERNAL_ERROR=Intern feil\n\n#XTIT:\nERROR=Feil\n\n#XFLD:\nINTERNAL_ERROR_BODY=En intern feil relatert til feilbehandling har oppst\\u00E5tt i applikasjonen\n\n# XTIT:\nFAV_DIALOG_BOX=Slett Favoritter\n\n# XTIT: \nTIMESHEET=Tidsregistreringsposter\n\n#XBUT: Button for quick entry\nQUICK_FILL=Hurtigregistrering\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Bruk p\\u00E5\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaljer\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Opprett tidsregistrering\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Registrer timer for {0} dager\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Postdetaljer\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Registreringsdetaljer for {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Registrer timer for {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Des\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mars\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Juni\n# XTIT: Month title for calendar\nMONTH_FULL_6=Juli\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=Desember\n\n# XTIT: Legend missing day\nMISSING_DAY=Aktivitet kreves\n# XTIT: Legend filled day\nFILLED_DAY=Utf\\u00F8rt\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Venter p\\u00E5 godkjenning\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Avvist\n# XFLD: Legend future working day\nWORKING_DAY=Arbeidsdag\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Fridag\n# XFLD: Legend selected working day\nSELECTED_DAY=Valgt dag\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Valgt fridag\n# XFLD: Legend current day\nCURRENT_DAY=Gjeldende dag\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Totalt antall manglende timer\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} timer)\n\n#XBUT: Button\nSAVE=Lagre\n\n#XBUT: Button \nSUBMIT=Send\n\n# XMSG\nFILL_ALL=Registrer {0} timer for\\:\n\n#XFLD\nNO_TASK_TYPE=Ingen oppgavetype\n\n#XFLD\nMISSING_DAYS=Manglende dager\\: {0}\n\n#XBUT: Button\nHOME=Startside\n\n#XTIT: confirmation header\nCONFIRMATION=Bekreftelse\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Bekreft sletting\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Bekreft sending\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Bekreft utkast\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sletting\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Sammenfatning av tidsdataregistreringer valgt for sending\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Oversikt over valgte tidsdataregistreringer\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Antall poster\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Antall timer\n\n#XBUT: Confirm Button\nCONFIRM=Bekreft\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} Time\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} timer\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} time / {1} timer\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} timer / {1} timer\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=M\\u00E5l\\: {0} timer \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} tidstilordninger\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 tidstilordning\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Ingen tilordninger\n\n#XMSG: No Recordings\nNO_RECORDING=Ingen poster\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} godkjente timer\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Lagre med tidspunkt\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Lagre uten tidspunkt\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Slett Favoritter\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Lagre som favoritt\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Administrer favoritter\n\n#XFLD: Week \nWEEK=Uke\n\n#XFLD:\nMEET_TARGET_HOURS=Bruk timer p\\u00E5\\:\n\n#XBUT\nALL_MISSING=All manglende tid ({0} timer)\n\n#XBUT: Delete Button Text\nDELETE=Slett\n\n#XBUT: Copy Button Text\nCOPY=Kopier\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Tilf\\u00F8y post\n\n#XFLD: label for duration\nDURATION=Varighet\n\n#XFLD: label for total duration\nTOTAL_DURATION=Samlet varighet\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Starttidspunkt\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Navn p\\u00E5 favoritt\n\n#XFLD: label for end Time\nEND_TIME=Sluttidspunkt\n\n#XFLD: label for note\nNOTE=Merknad\n\n#XBUT: Done button\nDONE=Utf\\u00F8rt\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manuell\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Rediger post\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Tidstilordning\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Velg favoritt eller arbeidsliste\n\n# XTIT: select worklist\nSELECT_WORKLIST=Velg arbeidsliste\n\n# XTIT: Favorite\nFAVORITE=Favoritter\n\n# XTIT: Worklist\nWORKLIST=Arbeidsliste\n\n# XTIT: Add Favorite\nADD_FAVORITE=Tilf\\u00F8y favoritt\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Rediger favoritter\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Last mer...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Laster ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Fortsett s\\u00F8k p\\u00E5 server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Laster ...\n\n#XFLD: BLANK\nEMPTY=Tom\n\n#XFLD: None\nNONE=Ingen\n\n#XFLD\nNO_WORKLIST=Det finnes ingen arbeidsliste\n\n#XFLD\nNO_FAVORITE=Det finnes ingen favoritter\n\n# XTIT: Select\nSELECT=Velg {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Velg\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=S\\u00F8k...\n\n#XFLD: short label for hours\nHOURS_LABEL=t\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Timer\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutter\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, YYYY\n\n#XBUT:\nDETAIL=Detaljer\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Innstillinger\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Du vil miste data som ikke er lagret. Er du sikker p\\u00E5 at du vil fortsette?\n\n# XTIT: \nUNSAVED_CHANGES=Ulagrede endringer\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Foresp\\u00F8rsel er sendt\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Oppgi et favorittnavn i inndatafeltet Tidstilordning\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Utf\\u00F8r registreringer for \\u00E5 lagre som din favoritt\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Oppgi en gyldig varighet\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Oppgi en gyldig start- og sluttid\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Utkast er lagret\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favoritt er sendt\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favoritt oppdatert\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favoritt slettet\n\n#XBUT:\nHELP=Hjelp\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} timer registrert for denne uken\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Aktiver "forh\\u00E5ndsdefinisjon" for \\u00E5 fylle ut timer per uke automatisk basert p\\u00E5 din siste registrering\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Noen poster er feil. Kontroller feildetaljer og korriger poster.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Tidsregistrering for {0} og {1} flere dag(er)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Rediger tidsregistrering\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Tidsregistrering for {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} timer {1} minutter\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} t {1} m\n\n#XBUT: Button to reset\nRESET=Tilbakestill\n\n#XBUT: Button to update\nUPDATE=Oppdater\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Tilf\\u00F8y favoritt\n\n#XBUT: Button to create\nCREATE=Opprett\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktuelt favorittnavn\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nytt favorittnavn\n\n#XTIT: time\nTIME=Tid\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Foresp\\u00F8rsel er slettet\n\n#XTIT:\nWARNING=Advarsel\n',
		"cfr/etsapp/i18n/i18n_pl.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Wybierz umow\\u0119 o prac\\u0119\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Umowy o prac\\u0119\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Anuluj\n\n#XBUT: Button to close popover\nCLOSE=Zamknij\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Tak\n\n#XBUT: Button to decline\nNO=Nie\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Zapisz wersj\\u0119 robocz\\u0105\n\n# XTIT: \nTIMESHEET_TITLE=Rejestracja czasu\n\n#XTIT:\nINTERNAL_ERROR=B\\u0142\\u0105d wewn\\u0119trzny\n\n#XTIT:\nERROR=B\\u0142\\u0105d\n\n#XFLD:\nINTERNAL_ERROR_BODY=W aplikacji wyst\\u0105pi\\u0142 b\\u0142\\u0105d wewn\\u0119trzny zwi\\u0105zany z obs\\u0142ug\\u0105 b\\u0142\\u0119du.\n\n# XTIT:\nFAV_DIALOG_BOX=Usu\\u0144 Ulubione\n\n# XTIT: \nTIMESHEET=Wpisy rejestracji czasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=Szybki wpis\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Zastosuj do\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Szczeg\\u00F3\\u0142y\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Utw\\u00F3rz wpis daty\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Utw\\u00F3rz wpis dla {0} dni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Szczeg\\u00F3\\u0142y wpisu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Szczeg\\u00F3\\u0142y wpisu dla {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Utw\\u00F3rz wpis dla {0}\n\n# XTIT: Month short header\nMONTH_0=Sty\n# XTIT: Month short header\nMONTH_1=Lut\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Kwi\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Cze\n# XTIT: Month short header\nMONTH_6=Lip\n# XTIT: Month short header\nMONTH_7=Sie\n# XTIT: Month short header\nMONTH_8=Wrz\n# XTIT: Month short header\nMONTH_9=Pa\\u017A\n# XTIT: Month short header\nMONTH_10=Lis\n# XTIT: Month short header\nMONTH_11=Gru\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Stycze\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_1=Luty\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marzec\n# XTIT: Month title for calendar\nMONTH_FULL_3=Kwiecie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Czerwiec\n# XTIT: Month title for calendar\nMONTH_FULL_6=Lipiec\n# XTIT: Month title for calendar\nMONTH_FULL_7=Sierpie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_8=Wrzesie\\u0144\n# XTIT: Month title for calendar\nMONTH_FULL_9=Pa\\u017Adziernik\n# XTIT: Month title for calendar\nMONTH_FULL_10=Listopad\n# XTIT: Month title for calendar\nMONTH_FULL_11=Grudzie\\u0144\n\n# XTIT: Legend missing day\nMISSING_DAY=Wymagana czynno\\u015B\\u0107\n# XTIT: Legend filled day\nFILLED_DAY=Gotowe\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Wymagana czynno\\u015B\\u0107 zatwierdzaj\\u0105cego\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odrzucone\n# XFLD: Legend future working day\nWORKING_DAY=Dzie\\u0144 roboczy\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dzie\\u0144 wolny od pracy\n# XFLD: Legend selected working day\nSELECTED_DAY=Wybrany dzie\\u0144\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Wybrany dzie\\u0144 wolny od pracy\n# XFLD: Legend current day\nCURRENT_DAY=Bie\\u017C\\u0105cy dzie\\u0144\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Suma brakuj\\u0105cych godzin\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} godz.)\n\n#XBUT: Button\nSAVE=Zapisz\n\n#XBUT: Button \nSUBMIT=Wy\\u015Blij\n\n# XMSG\nFILL_ALL=Wpisz {0} godz. dla\\:\n\n#XFLD\nNO_TASK_TYPE=Bez typu zadania\n\n#XFLD\nMISSING_DAYS=Brakuj\\u0105ce dni\\: {0}\n\n#XBUT: Button\nHOME=Ekran g\\u0142\\u00F3wny\n\n#XTIT: confirmation header\nCONFIRMATION=Potwierdzenie\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potwierdzanie usuwania\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potwierdzanie przesy\\u0142ania\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potwierdzanie wersji roboczej\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla usuwania\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Podsumowanie wpis\\u00F3w czasu wybranych dla przesy\\u0142ania\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Podsumowanie wybranych wpis\\u00F3w daty\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Liczba wpis\\u00F3w\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Liczba godzin\n\n#XBUT: Confirm Button\nCONFIRM=Potwierd\\u017A\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} godzina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} godz.\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} godz./{1} godz.\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} godz. / {1} godz.\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cel\\: {0} godz. \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS=Liczba przypisa\\u0144 czasu\\: {0}\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 przypisanie czasu\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Brak przypisa\\u0144\n\n#XMSG: No Recordings\nNO_RECORDING=Brak rekord\\u00F3w\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS=Zatwierdzono godzin\\: {0}\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Zapisz z czasem\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Zapisz bez czasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Usu\\u0144 Ulubione\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Zapisz jako Ulubione\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Zarz\\u0105dzaj Ulubionymi\n\n#XFLD: Week \nWEEK=Tydzie\\u0144\n\n#XFLD:\nMEET_TARGET_HOURS=Zastosuj godziny do\\:\n\n#XBUT\nALL_MISSING=\\u0141\\u0105czny brakuj\\u0105cy czas({0} godz.)\n\n#XBUT: Delete Button Text\nDELETE=Usu\\u0144\n\n#XBUT: Copy Button Text\nCOPY=Kopiuj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj wpis\n\n#XFLD: label for duration\nDURATION=Czas trwania\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u0141\\u0105czny czas trwania\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Czas rozpocz\\u0119cia\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nazwa ulubionych\n\n#XFLD: label for end Time\nEND_TIME=Czas zako\\u0144czenia\n\n#XFLD: label for note\nNOTE=Notatka\n\n#XBUT: Done button\nDONE=Gotowe\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=R\\u0119czne\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Edytuj wpis\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Przypisanie czasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Wyb\\u00F3r Ulubionych lub listy roboczej\n\n# XTIT: select worklist\nSELECT_WORKLIST=Wyb\\u00F3r listy roboczej\n\n# XTIT: Favorite\nFAVORITE=Ulubione\n\n# XTIT: Worklist\nWORKLIST=Lista robocza\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj ulubione\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Edytuj ulubione\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Wczytaj wi\\u0119cej...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Wczytywanie...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Kontynuuj szukanie na serwerze...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Wczytywanie...\n\n#XFLD: BLANK\nEMPTY=Puste\n\n#XFLD: None\nNONE=Brak\n\n#XFLD\nNO_WORKLIST=Brak dost\\u0119pnej listy roboczej\n\n#XFLD\nNO_FAVORITE=Brak dost\\u0119pnych Ulubionych\n\n# XTIT: Select\nSELECT=Wybierz {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Wybierz\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Szukaj...\n\n#XFLD: short label for hours\nHOURS_LABEL=godz.\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Godziny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=Szczeg\\u00F3\\u0142y\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Ustawienia\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Wszystkie niezapisane dane zostan\\u0105 odrzucone. Czy na pewno chcesz kontynuowa\\u0107?\n\n# XTIT: \nUNSAVED_CHANGES=Niezapami\\u0119tane zmiany\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Wniosek wys\\u0142any.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Wprowad\\u017A nazw\\u0119 ulubionych w polu wej\\u015Bciowym Przypisanie czasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Dokonaj wpis\\u00F3w, aby zapisa\\u0107 jako Ulubione.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas trwania.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Wprowad\\u017A prawid\\u0142owy czas rozpocz\\u0119cia i zako\\u0144czenia.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Pomy\\u015Blnie zapisano wersj\\u0119 robocz\\u0105.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Utworzono ulubione.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Zaktualizowano Ulubione.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Usuni\\u0119to ulubione.\n\n#XBUT:\nHELP=Pomoc\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Wprowadzono {0}/{1} godz. dla tego tygodnia.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Aby szybko wype\\u0142ni\\u0107 godziny na podstawie ostatniego pomy\\u015Blnego wpisu, w\\u0142\\u0105cz wst\\u0119pne wype\\u0142nianie.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Niekt\\u00F3re wpisy s\\u0105 nieprawid\\u0142owe. Sprawd\\u017A szczeg\\u00F3\\u0142y b\\u0142\\u0119du i popraw wpisy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Wpis daty dla {0} i {1} dni wi\\u0119cej\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Edycja wpisu daty\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Wpis daty dla {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} godz. {1} min\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} godz. {1} min\n\n#XBUT: Button to reset\nRESET=Resetuj\n\n#XBUT: Button to update\nUPDATE=Aktualizuj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj ulubione\n\n#XBUT: Button to create\nCREATE=Utw\\u00F3rz\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktualna nazwa Ulubionego\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nowa nazwa Ulubionego\n\n#XTIT: time\nTIME=Czas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Wniosek usuni\\u0119ty\n\n#XTIT:\nWARNING=Ostrze\\u017Cenie\n',
		"cfr/etsapp/i18n/i18n_pt.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Selecionar um contrato de emprego\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contratos de emprego\n\n#XFLD: label for from time\nFROM=De\n\n#XFLD: label for to time\nTO=A\n\n#XBUT: Button to cancel\nCANCEL=Anular\n\n#XBUT: Button to close popover\nCLOSE=Fechar\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Sim\n\n#XBUT: Button to decline\nNO=N\\u00E3o\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Gravar esbo\\u00E7o\n\n# XTIT: \nTIMESHEET_TITLE=Minha folha de horas\n\n#XTIT:\nINTERNAL_ERROR=Erro interno\n\n#XTIT:\nERROR=Erro\n\n#XFLD:\nINTERNAL_ERROR_BODY=Ocorreu um erro interno relacionado ao tratamento de erros no aplicativo.\n\n# XTIT:\nFAV_DIALOG_BOX=Excluir favoritos\n\n# XTIT: \nTIMESHEET=Entradas da folha de horas\n\n#XBUT: Button for quick entry\nQUICK_FILL=Entrada r\\u00E1pida\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicar a\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalhes\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Criar registro de tempos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Criar entrada para {0} dias\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalhes da entrada\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalhes de entrada para {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Criar entrada para {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Fev\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Abr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Ago\n# XTIT: Month short header\nMONTH_8=Set\n# XTIT: Month short header\nMONTH_9=Out\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dez\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janeiro\n# XTIT: Month title for calendar\nMONTH_FULL_1=Fevereiro\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mar\\u00E7o\n# XTIT: Month title for calendar\nMONTH_FULL_3=Abril\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maio\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junho\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julho\n# XTIT: Month title for calendar\nMONTH_FULL_7=Agosto\n# XTIT: Month title for calendar\nMONTH_FULL_8=Setembro\n# XTIT: Month title for calendar\nMONTH_FULL_9=Outubro\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembro\n# XTIT: Month title for calendar\nMONTH_FULL_11=Dezembro\n\n# XTIT: Legend missing day\nMISSING_DAY=A\\u00E7\\u00E3o necess\\u00E1ria\n# XTIT: Legend filled day\nFILLED_DAY=Conclu\\u00EDdo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Aprova\\u00E7\\u00E3o necess\\u00E1ria\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Rejeitado\n# XFLD: Legend future working day\nWORKING_DAY=Dia de trabalho\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dia livre\n# XFLD: Legend selected working day\nSELECTED_DAY=Dia selecionado\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Dia livre n\\u00E3o selecionado\n# XFLD: Legend current day\nCURRENT_DAY=Dia atual\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total de horas em falta\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} horas)\n\n#XBUT: Button\nSAVE=Gravar\n\n#XBUT: Button \nSUBMIT=Enviar\n\n# XMSG\nFILL_ALL=Inserir {0} horas para\\:\n\n#XFLD\nNO_TASK_TYPE=Nenhum tipo de tarefa\n\n#XFLD\nMISSING_DAYS=Dias em falta\\: {0}\n\n#XBUT: Button\nHOME=In\\u00EDcio\n\n#XTIT: confirmation header\nCONFIRMATION=Confirma\\u00E7\\u00E3o\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmar exclus\\u00E3o\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmar envio\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmar esbo\\u00E7o\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para exclus\\u00E3o\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Resumo de entradas de tempos selecionado para envio\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Resumo de entradas de horas selecionadas\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=N\\u00BA de entradas\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=N\\u00FAmero de horas\n\n#XBUT: Confirm Button\nCONFIRM=Confirmar\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hora\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} horas\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hora / {1} horas\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} horas / {1} horas\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Te\\u00F3rico\\: {0} horas \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} atribui\\u00E7\\u00F5es de tempo\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 atribui\\u00E7\\u00E3o de tempo\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nenhuma atribui\\u00E7\\u00E3o\n\n#XMSG: No Recordings\nNO_RECORDING=Nenhum registro\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} horas aprovadas\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Gravar com tempo\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Gravar sem tempo\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Excluir favoritos\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Gravar como favorito\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gerenciar favoritos\n\n#XFLD: Week \nWEEK=Semana\n\n#XFLD:\nMEET_TARGET_HOURS=Aplicar horas a\\:\n\n#XBUT\nALL_MISSING=Todas as horas em falta ({0} horas)\n\n#XBUT: Delete Button Text\nDELETE=Excluir\n\n#XBUT: Copy Button Text\nCOPY=Copiar\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Inserir entr.\n\n#XFLD: label for duration\nDURATION=Dura\\u00E7\\u00E3o\n\n#XFLD: label for total duration\nTOTAL_DURATION=Dura\\u00E7\\u00E3o total\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Hora de in\\u00EDcio\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nome do favorito\n\n#XFLD: label for end Time\nEND_TIME=Hora de fim\n\n#XFLD: label for note\nNOTE=Nota\n\n#XBUT: Done button\nDONE=Conclu\\u00EDdo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Processar entrada\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Atribui\\u00E7\\u00E3o de tempo\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Selecionar favorito ou lista de trabalho\n\n# XTIT: select worklist\nSELECT_WORKLIST=Selecionar lista de trabalho\n\n# XTIT: Favorite\nFAVORITE=Favoritos\n\n# XTIT: Worklist\nWORKLIST=Lista de trabalho\n\n# XTIT: Add Favorite\nADD_FAVORITE=Inserir favorito\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Processar favoritos\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Carregar mais...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Carregando...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuar procura no servidor...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Carregando...\n\n#XFLD: BLANK\nEMPTY=Vazio\n\n#XFLD: None\nNONE=Nenhum\n\n#XFLD\nNO_WORKLIST=Nenhuma lista de trabalho dispon\\u00EDvel\n\n#XFLD\nNO_FAVORITE=Nenhum favorito dispon\\u00EDvel\n\n# XTIT: Select\nSELECT=Selecionar {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Selecionar\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Procurar...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Horas\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minutos\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, AAAA\n\n#XBUT:\nDETAIL=Detalhes\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Configura\\u00E7\\u00F5es\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Os dados n\\u00E3o gravados ser\\u00E3o rejeitados. Continuar?\n\n# XTIT: \nUNSAVED_CHANGES=Modifica\\u00E7\\u00F5es n\\u00E3o gravadas\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Solicita\\u00E7\\u00E3o enviada.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Insira um nome de favorito no campo de entrada Atribui\\u00E7\\u00E3o de tempo.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Efetue entradas para gravar como favoritos.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Insira uma dura\\u00E7\\u00E3o v\\u00E1lida.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Insira hora de in\\u00EDcio e hora final v\\u00E1lidas.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Esbo\\u00E7o gravado com \\u00EAxito.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorito criado.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorito atualizado.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorito exclu\\u00EDdo.\n\n#XBUT:\nHELP=Ajuda\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} horas inseridas para essa semana\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Ativar Predefinir para inserir automaticamente as horas para semana com base em sua \\u00FAltima entrada.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Algumas entradas est\\u00E3o incorretas. Verifique detalhes de erro e corrija as entradas.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Entrada de tempos para {0} e {1} mais dia(s)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editar registro de tempos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Entrada de tempo para {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} horas e {1} minutos\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Reinicializar\n\n#XBUT: Button to update\nUPDATE=Atualizar\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ins.favorito\n\n#XBUT: Button to create\nCREATE=Criar\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nome do favorito atual\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nome de novo favorito\n\n#XTIT: time\nTIME=Hora\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Solicita\\u00E7\\u00E3o exclu\\u00EDda\n\n#XTIT:\nWARNING=Advert\\u00EAncia\n',
		"cfr/etsapp/i18n/i18n_ro.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Alege\\u0163i un contract de munc\\u0103\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Contracte de munc\\u0103\n\n#XFLD: label for from time\nFROM=De la\n\n#XFLD: label for to time\nTO=P\\u00E2n\\u0103 la\n\n#XBUT: Button to cancel\nCANCEL=Anulare\n\n#XBUT: Button to close popover\nCLOSE=\\u00CEnchidere\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Nu\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Salvare versiune preliminar\\u0103\n\n# XTIT: \nTIMESHEET_TITLE=Fi\\u015Fa mea de timp\n\n#XTIT:\nINTERNAL_ERROR=Eroare intern\\u0103\n\n#XTIT:\nERROR=Eroare\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u00CEn aplica\\u0163ie a ap\\u0103rut o eroare intern\\u0103 aferent\\u0103 pt.tratare erori.\n\n# XTIT:\nFAV_DIALOG_BOX=\\u015Etergere favorite\n\n# XTIT: \nTIMESHEET=Intr\\u0103ri fi\\u015F\\u0103 de timp\n\n#XBUT: Button for quick entry\nQUICK_FILL=Intrare rapid\\u0103\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Aplicare la\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalii\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Creare intrare de timp\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Creare intrare pt. {0} zile\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalii pt.intrare\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalii intrare pt. {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Creare intrare pt. {0} \n\n# XTIT: Month short header\nMONTH_0=Ian\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Martie\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Mai\n# XTIT: Month short header\nMONTH_5=Iun\n# XTIT: Month short header\nMONTH_6=Iul\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Oct\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Ianuarie\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februarie\n# XTIT: Month title for calendar\nMONTH_FULL_2=Martie\n# XTIT: Month title for calendar\nMONTH_FULL_3=Aprilie\n# XTIT: Month title for calendar\nMONTH_FULL_4=Mai\n# XTIT: Month title for calendar\nMONTH_FULL_5=Iunie\n# XTIT: Month title for calendar\nMONTH_FULL_6=Iulie\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembrie\n# XTIT: Month title for calendar\nMONTH_FULL_9=Octombrie\n# XTIT: Month title for calendar\nMONTH_FULL_10=Noiembrie\n# XTIT: Month title for calendar\nMONTH_FULL_11=Decembrie\n\n# XTIT: Legend missing day\nMISSING_DAY=Ac\\u0163iune necesar\\u0103\n# XTIT: Legend filled day\nFILLED_DAY=Efectuat\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Ac\\u0163iune aprobator este necesar\\u0103\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Respins\n# XFLD: Legend future working day\nWORKING_DAY=Zi lucr\\u0103toare\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Zi nelucr\\u0103toare\n# XFLD: Legend selected working day\nSELECTED_DAY=Zi selectat\\u0103\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Zi nelucr\\u0103toare selectat\\u0103\n# XFLD: Legend current day\nCURRENT_DAY=Zi curent\\u0103\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Total ore necompletate\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ore)\n\n#XBUT: Button\nSAVE=Salvare\n\n#XBUT: Button \nSUBMIT=Transmitere\n\n# XMSG\nFILL_ALL=Introduce\\u0163i {0} ore pt. \\:\n\n#XFLD\nNO_TASK_TYPE=Niciun tip de sarcin\\u0103\n\n#XFLD\nMISSING_DAYS=Zile necompletate\\: {0}\n\n#XBUT: Button\nHOME=Pagin\\u0103 ini\\u0163ial\\u0103\n\n#XTIT: confirmation header\nCONFIRMATION=Confirmare\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Confirmare \\u015Ftergere\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Confirmare transmitere\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Confirmare versiune preliminar\\u0103\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate pt.\\u015Ftergere\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate pt.transmitere\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Rezumat intr\\u0103ri de timp selectate\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Num\\u0103r de intr\\u0103ri\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Num\\u0103r de ore\n\n#XBUT: Confirm Button\nCONFIRM=Confirmare\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} or\\u0103\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ore\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} or\\u0103 / {1} ore\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ore / {1} ore\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0162int\\u0103\\: {0} ore \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} aloc\\u0103ri de timp\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 alocare de timp\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=F\\u0103r\\u0103 aloc\\u0103ri\n\n#XMSG: No Recordings\nNO_RECORDING=F\\u0103r\\u0103 \\u00EEnregistr\\u0103ri\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} ore aprobate\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Salvare cu timp\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Salvare f\\u0103r\\u0103 timp\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u015Etergere favorite\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Salvare ca favorit\\u0103\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Gestionare favorite\n\n#XFLD: Week \nWEEK=S\\u0103pt\\u0103m\\u00E2n\\u0103\n\n#XFLD:\nMEET_TARGET_HOURS=Aplicare ore la\\:\n\n#XBUT\nALL_MISSING=Tot timpul lips\\u0103 ({0} ore)\n\n#XBUT: Delete Button Text\nDELETE=\\u015Etergere\n\n#XBUT: Copy Button Text\nCOPY=Copiere\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Ad\\u0103ugare intrare\n\n#XFLD: label for duration\nDURATION=Durat\\u0103\n\n#XFLD: label for total duration\nTOTAL_DURATION=Durat\\u0103 total\\u0103\n\n#XFLD: label for status\nSTATUS=Stare\n\n#XFLD: label for start time\nSTART_TIME=Or\\u0103 de \\u00EEnceput\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Nume favorit\\u0103\n\n#XFLD: label for end Time\nEND_TIME=Or\\u0103 de sf\\u00E2r\\u015Fit\n\n#XFLD: label for note\nNOTE=Not\\u0103\n\n#XBUT: Done button\nDONE=Efectuat\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manual\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Editare intrare\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Alocare timp\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Selectare favorit\\u0103 sau list\\u0103 de lucru\n\n# XTIT: select worklist\nSELECT_WORKLIST=Selectare list\\u0103 de lucru\n\n# XTIT: Favorite\nFAVORITE=Favorite\n\n# XTIT: Worklist\nWORKLIST=List\\u0103 de lucru\n\n# XTIT: Add Favorite\nADD_FAVORITE=Ad\\u0103ugare favorit\\u0103\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Editare favorite\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u00CEnc\\u0103rcare mai mult...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u00CEnc\\u0103rcare ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Continuare c\\u0103utare pe server...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u00CEnc\\u0103rcare ...\n\n#XFLD: BLANK\nEMPTY=Gol\n\n#XFLD: None\nNONE=Nimic\n\n#XFLD\nNO_WORKLIST=Nicio list\\u0103 de lucru disponibil\\u0103\n\n#XFLD\nNO_FAVORITE=F\\u0103r\\u0103 favorite disponibile\n\n# XTIT: Select\nSELECT=Selectare {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Selectare\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=C\\u0103utare...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ore\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM, AAAA\n\n#XBUT:\nDETAIL=Detalii\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Set\\u0103ri\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Orice date nesalvate vor fi respinse. Sigur dori\\u0163i s\\u0103 continua\\u0163i?\n\n# XTIT: \nUNSAVED_CHANGES=Modific\\u0103ri nesalvate\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Cerere a fost transmis\\u0103.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Introduce\\u0163i un nume de favorit\\u0103 \\u00EEn c\\u00E2mpul de intrare Alocare timp.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Efectua\\u0163i intr\\u0103ri de arhivat ca favorita dvs.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Introduce\\u0163i o durat\\u0103 valabil\\u0103.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Introduce\\u0163i o or\\u0103 valabil\\u0103 de \\u00EEnceput \\u015Fi de sf\\u00E2r\\u015Fit.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Versiune preliminar\\u0103 a fost salvat\\u0103 cu succes.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favorita a fost creat\\u0103.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favorita a fost actualizat\\u0103.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favorita a fost \\u015Ftears\\u0103.\n\n#XBUT:\nHELP=Ajutor\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ore introduse pt. aceast\\u0103 s\\u0103pt\\u0103m\\u00E2n\\u0103\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Activa\\u0163i completare preliminar\\u0103 pt.a popula rapid orele pt.s\\u0103pt\\u0103m\\u00E2n\\u0103 bazate pe ultima dvs.intrare reu\\u015Fit\\u0103.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Unele intr\\u0103ri sunt incorecte. Revizui\\u0163i detaliile de eroare \\u015Fi corecta\\u0163i intr\\u0103rile.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Intrare timp pt. {0} \\u015Fi \\u00EEnc\\u0103 {1} zi(le)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Editare intrare de timp\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Intrare timp pt. {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ore {1} minute\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Resetare\n\n#XBUT: Button to update\nUPDATE=Actualizare\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Ad\\u0103ugare favorit\\u0103\n\n#XBUT: Button to create\nCREATE=Creare\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Nume curent de favorit\\u0103\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nume nou de favorit\\u0103\n\n#XTIT: time\nTIME=Or\\u0103\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Cerere \\u015Ftears\\u0103\n\n#XTIT:\nWARNING=Avertizare\n',
		"cfr/etsapp/i18n/i18n_ru.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0442\\u0440\\u0443\\u0434\\u043E\\u0432\\u043E\\u0439 \\u0434\\u043E\\u0433\\u043E\\u0432\\u043E\\u0440\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u0422\\u0440\\u0443\\u0434\\u043E\\u0432\\u044B\\u0435 \\u0434\\u043E\\u0433\\u043E\\u0432\\u043E\\u0440\\u044B\n\n#XFLD: label for from time\nFROM=\\u0421\n\n#XFLD: label for to time\nTO=\\u041F\\u043E\n\n#XBUT: Button to cancel\nCANCEL=\\u041E\\u0442\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C\n\n#XBUT: Button to close popover\nCLOSE=\\u0417\\u0430\\u043A\\u0440\\u044B\\u0442\\u044C\n\n#XBUT: Button to accept\nOK=\\u041E\\u041A\n\n#XBUT: Button to affirm\nYES=\\u0414\\u0430\n\n#XBUT: Button to decline\nNO=\\u041D\\u0435\\u0442\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\n\n# XTIT: \nTIMESHEET_TITLE=\\u041C\\u043E\\u0439 \\u0442\\u0430\\u0431\\u0435\\u043B\\u044C\n\n#XTIT:\nINTERNAL_ERROR=\\u0412\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XTIT:\nERROR=\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u0412 \\u043F\\u0440\\u0438\\u043B\\u043E\\u0436\\u0435\\u043D\\u0438\\u0438 \\u0432\\u043E\\u0437\\u043D\\u0438\\u043A\\u043B\\u0430 \\u0432\\u043D\\u0443\\u0442\\u0440\\u0435\\u043D\\u043D\\u044F\\u044F \\u043E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u0432 \\u0441\\u0432\\u044F\\u0437\\u0438 \\u0441 \\u043E\\u0431\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u043E\\u0439 \\u043E\\u0448\\u0438\\u0431\\u043E\\u043A\n\n# XTIT:\nFAV_DIALOG_BOX=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: \nTIMESHEET=\\u0417\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0432 \\u0442\\u0430\\u0431\\u0435\\u043B\\u0435\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u0411\\u044B\\u0441\\u0442\\u0440\\u044B\\u0439 \\u0432\\u0432\\u043E\\u0434\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u043A\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0} \\u0434\\u043D.\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u043F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\\u0441\\u0442\\u0438 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u0434\\u043B\\u044F {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0434\\u043B\\u044F {0}\n\n# XTIT: Month short header\nMONTH_0=\\u042F\\u043D\\u0432\n# XTIT: Month short header\nMONTH_1=\\u0424\\u0435\\u0432\n# XTIT: Month short header\nMONTH_2=\\u041C\\u0430\\u0440\n# XTIT: Month short header\nMONTH_3=\\u0410\\u043F\\u0440\n# XTIT: Month short header\nMONTH_4=\\u041C\\u0430\\u0439\n# XTIT: Month short header\nMONTH_5=\\u0418\\u044E\\u043D\n# XTIT: Month short header\nMONTH_6=\\u0418\\u044E\\u043B\n# XTIT: Month short header\nMONTH_7=\\u0410\\u0432\\u0433\n# XTIT: Month short header\nMONTH_8=\\u0421\\u0435\\u043D\n# XTIT: Month short header\nMONTH_9=\\u041E\\u043A\\u0442\n# XTIT: Month short header\nMONTH_10=\\u041D\\u043E\\u044F\n# XTIT: Month short header\nMONTH_11=\\u0414\\u0435\\u043A\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=\\u042F\\u043D\\u0432\\u0430\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u0424\\u0435\\u0432\\u0440\\u0430\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_2=\\u041C\\u0430\\u0440\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_3=\\u0410\\u043F\\u0440\\u0435\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_4=\\u041C\\u0430\\u0439\n# XTIT: Month title for calendar\nMONTH_FULL_5=\\u0418\\u044E\\u043D\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_6=\\u0418\\u044E\\u043B\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_7=\\u0410\\u0432\\u0433\\u0443\\u0441\\u0442\n# XTIT: Month title for calendar\nMONTH_FULL_8=\\u0421\\u0435\\u043D\\u0442\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_9=\\u041E\\u043A\\u0442\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_10=\\u041D\\u043E\\u044F\\u0431\\u0440\\u044C\n# XTIT: Month title for calendar\nMONTH_FULL_11=\\u0414\\u0435\\u043A\\u0430\\u0431\\u0440\\u044C\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435\n# XTIT: Legend filled day\nFILLED_DAY=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u0422\\u0440\\u0435\\u0431\\u0443\\u0435\\u0442\\u0441\\u044F \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0435 \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0430\\u044E\\u0449\\u0435\\u0433\\u043E\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u041E\\u0442\\u043A\\u043B\\u043E\\u043D\\u0435\\u043D\\u043E\n# XFLD: Legend future working day\nWORKING_DAY=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u041D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u0412\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0439 \\u043D\\u0435\\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n# XFLD: Legend current day\nCURRENT_DAY=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0438\\u0439 \\u0434\\u0435\\u043D\\u044C\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u041E\\u0431\\u0449\\u0435\\u0435 \\u043A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} \\u0447)\n\n#XBUT: Button\nSAVE=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C\n\n#XBUT: Button \nSUBMIT=\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u0438\\u0442\\u044C\n\n# XMSG\nFILL_ALL=\\u0412\\u0432\\u0435\\u0441\\u0442\\u0438 {0} \\u0447 \\u0434\\u043B\\u044F\\:\n\n#XFLD\nNO_TASK_TYPE=\\u041D\\u0435\\u0442 \\u0442\\u0438\\u043F\\u0430 \\u0437\\u0430\\u0434\\u0430\\u0447\n\n#XFLD\nMISSING_DAYS=\\u0414\\u043D\\u0438 \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F\\: {0}\n\n#XBUT: Button\nHOME=\\u0414\\u043E\\u043C\\u043E\\u0439\n\n#XTIT: confirmation header\nCONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u0435\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0443\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C \\u0447\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u044F\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F \\u043E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0438\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u041E\\u0431\\u0437\\u043E\\u0440 \\u0432\\u044B\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u041A\\u043E\\u043B\\u0438\\u0447\\u0435\\u0441\\u0442\\u0432\\u043E \\u0447\\u0430\\u0441\\u043E\\u0432\n\n#XBUT: Confirm Button\nCONFIRM=\\u041F\\u043E\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0438\\u0442\\u044C\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u0447.\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u0447.\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u0447 / {1} \\u0447\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u0447 / {1} \\u0447\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u0426\\u0435\\u043B\\u044C\\: {0} \\u0447. \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u043F\\u0440\\u0438\\u0441\\u0432. \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=\\u041E\\u0434\\u043D\\u043E \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u041D\\u0435\\u0442 \\u043F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0439\n\n#XMSG: No Recordings\nNO_RECORDING=\\u041D\\u0435\\u0442 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u0447. \\u0443\\u0442\\u0432\\u0435\\u0440\\u0436\\u0434\\u0435\\u043D\\u043E\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0441\\u043E \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0435\\u043C\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0431\\u0435\\u0437 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u0421\\u043E\\u0445\\u0440\\u0430\\u043D\\u0438\\u0442\\u044C \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u0423\\u043F\\u0440\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u044B\\u043C\n\n#XFLD: Week \nWEEK=\\u041D\\u0435\\u0434\\u0435\\u043B\\u044F\n\n#XFLD:\nMEET_TARGET_HOURS=\\u041F\\u0440\\u0438\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C \\u0447\\u0430\\u0441\\u044B \\u043A\\:\n\n#XBUT\nALL_MISSING=\\u0412\\u0441\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043E\\u0442\\u0441\\u0443\\u0442\\u0441\\u0442\\u0432\\u0438\\u044F ({0} \\u0447)\n\n#XBUT: Delete Button Text\nDELETE=\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C\n\n#XBUT: Copy Button Text\nCOPY=\\u0421\\u043A\\u043E\\u043F\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\n\n#XFLD: label for duration\nDURATION=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u041E\\u0431\\u0449\\u0430\\u044F \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XFLD: label for status\nSTATUS=\\u0421\\u0442\\u0430\\u0442\\u0443\\u0441\n\n#XFLD: label for start time\nSTART_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u0418\\u043C\\u044F \\u044D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442\\u0430 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XFLD: label for end Time\nEND_TIME=\\u0412\\u0440\\u0435\\u043C\\u044F \\u043E\\u043A\\u043E\\u043D\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XFLD: label for note\nNOTE=\\u041F\\u0440\\u0438\\u043C\\u0435\\u0447\\u0430\\u043D\\u0438\\u0435\n\n#XBUT: Done button\nDONE=\\u0413\\u043E\\u0442\\u043E\\u0432\\u043E\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u0412\\u0440\\u0443\\u0447\\u043D\\u0443\\u044E\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u0438\\u043B\\u0438 \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: Favorite\nFAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: Worklist\nWORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u0438\\u0442\\u044C \\u0435\\u0449\\u0435...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C \\u043F\\u043E\\u0438\\u0441\\u043A \\u043D\\u0430 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u0435...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u0417\\u0430\\u0433\\u0440\\u0443\\u0437\\u043A\\u0430 ...\n\n#XFLD: BLANK\nEMPTY=\\u041F\\u0443\\u0441\\u0442\\u043E\n\n#XFLD: None\nNONE=\\u041D\\u0435\\u0442\n\n#XFLD\nNO_WORKLIST=\\u0420\\u0430\\u0431\\u043E\\u0447\\u0438\\u0439 \\u0441\\u043F\\u0438\\u0441\\u043E\\u043A \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u0435\\u043D\n\n#XFLD\nNO_FAVORITE=\\u0418\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435 \\u043D\\u0435\\u0434\\u043E\\u0441\\u0442\\u0443\\u043F\\u043D\\u043E\n\n# XTIT: Select\nSELECT=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u0412\\u044B\\u0431\\u0440\\u0430\\u0442\\u044C\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u041F\\u043E\\u0438\\u0441\\u043A...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u0447\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u043C\\u0438\\u043D\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u0427\\u0430\\u0441\\u044B\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u041C\\u0438\\u043D\\u0443\\u0442\\u044B\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=\\u041F\\u043E\\u0434\\u0440\\u043E\\u0431\\u043D\\u043E\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u041D\\u0430\\u0441\\u0442\\u0440\\u043E\\u0439\\u043A\\u0438\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u0412\\u0441\\u0435 \\u043D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0434\\u0430\\u043D\\u043D\\u044B\\u0435 \\u0431\\u0443\\u0434\\u0443\\u0442 \\u043F\\u043E\\u0442\\u0435\\u0440\\u044F\\u043D\\u044B. \\u041F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u044C?\n\n# XTIT: \nUNSAVED_CHANGES=\\u041D\\u0435\\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u043D\\u044B\\u0435 \\u0438\\u0437\\u043C\\u0435\\u043D\\u0435\\u043D\\u0438\\u044F\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u0417\\u0430\\u044F\\u0432\\u043A\\u0430 \\u043F\\u0435\\u0440\\u0435\\u0434\\u0430\\u043D\\u0430\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0432 \\u043F\\u043E\\u043B\\u0435 \\u0432\\u0432\\u043E\\u0434\\u0430 \\u041F\\u0440\\u0438\\u0441\\u0432\\u043E\\u0435\\u043D\\u0438\\u0435 \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u0417\\u0430\\u043F\\u043E\\u043B\\u043D\\u0438\\u0442\\u0435 \\u043F\\u043E\\u043B\\u044F \\u0434\\u043B\\u044F \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\\u0438\\u044F \\u0432 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u043C\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u0443\\u044E \\u043F\\u0440\\u043E\\u0434\\u043E\\u043B\\u0436\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0441\\u0442\\u044C\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0434\\u0435\\u0439\\u0441\\u0442\\u0432\\u0438\\u0442\\u0435\\u043B\\u044C\\u043D\\u043E\\u0435 \\u0432\\u0440\\u0435\\u043C\\u044F \\u043D\\u0430\\u0447\\u0430\\u043B\\u0430 \\u0438 \\u043E\\u043A\\u043E\\u043D\\u0447\\u0430\\u043D\\u0438\\u044F\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u0427\\u0435\\u0440\\u043D\\u043E\\u0432\\u0438\\u043A \\u0441\\u043E\\u0445\\u0440\\u0430\\u043D\\u0435\\u043D\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0441\\u043E\\u0437\\u0434\\u0430\\u043D\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u042D\\u043B\\u0435\\u043C\\u0435\\u043D\\u0442 \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\n\n#XBUT:\nHELP=\\u0421\\u043F\\u0440\\u0430\\u0432\\u043A\\u0430\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} \\u0447 \\u0432\\u0432\\u0435\\u0434\\u0435\\u043D\\u043E \\u0434\\u043B\\u044F \\u044D\\u0442\\u043E\\u0439 \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438.\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u0412\\u043A\\u043B\\u044E\\u0447\\u0438\\u0442\\u044C \\u0430\\u0432\\u0442\\u043E\\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u0435 \\u0434\\u043B\\u044F \\u0431\\u044B\\u0441\\u0442\\u0440\\u043E\\u0433\\u043E \\u0437\\u0430\\u043F\\u043E\\u043B\\u043D\\u0435\\u043D\\u0438\\u044F \\u0447\\u0430\\u0441\\u043E\\u0432 \\u0434\\u043B\\u044F \\u043D\\u0435\\u0434\\u0435\\u043B\\u0438 \\u043D\\u0430 \\u043E\\u0441\\u043D\\u043E\\u0432\\u0435 \\u043F\\u043E\\u0441\\u043B\\u0435\\u0434\\u043D\\u0438\\u0445 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0435\\u0439\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u041D\\u0435\\u043A\\u043E\\u0442\\u043E\\u0440\\u044B\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438 \\u043D\\u0435\\u043A\\u043E\\u0440\\u0440\\u0435\\u043A\\u0442\\u043D\\u044B. \\u0418\\u0437\\u0443\\u0447\\u0438\\u0442\\u0435 \\u0441\\u0432\\u0435\\u0434\\u0435\\u043D\\u0438\\u044F \\u043E\\u0431 \\u043E\\u0448\\u0438\\u0431\\u043A\\u0435 \\u0438 \\u0438\\u0441\\u043F\\u0440\\u0430\\u0432\\u044C\\u0442\\u0435 \\u0437\\u0430\\u043F\\u0438\\u0441\\u0438.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0} \\u043F\\u043B\\u044E\\u0441 {1} \\u0434\\u043D.\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u0420\\u0435\\u0434\\u0430\\u043A\\u0442\\u0438\\u0440\\u043E\\u0432\\u0430\\u0442\\u044C \\u0437\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u0417\\u0430\\u043F\\u0438\\u0441\\u044C \\u0432\\u0440\\u0435\\u043C\\u0435\\u043D\\u0438 \\u0434\\u043B\\u044F {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} \\u0447 {1} \\u043C\\u0438\\u043D.\n\n#XBUT: Button to reset\nRESET=\\u0421\\u0431\\u0440\\u043E\\u0441\\u0438\\u0442\\u044C\n\n#XBUT: Button to update\nUPDATE=\\u041E\\u0431\\u043D\\u043E\\u0432\\u0438\\u0442\\u044C\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u0414\\u043E\\u0431\\u0430\\u0432\\u0438\\u0442\\u044C \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0435\n\n#XBUT: Button to create\nCREATE=\\u0421\\u043E\\u0437\\u0434\\u0430\\u0442\\u044C\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u0422\\u0435\\u043A\\u0443\\u0449\\u0435\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u041D\\u043E\\u0432\\u043E\\u0435 \\u0438\\u043C\\u044F \\u0438\\u0437\\u0431\\u0440\\u0430\\u043D\\u043D\\u043E\\u0433\\u043E\n\n#XTIT: time\nTIME=\\u0412\\u0440\\u0435\\u043C\\u044F\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u0417\\u0430\\u043F\\u0440\\u043E\\u0441 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\n\n#XTIT:\nWARNING=\\u041F\\u0440\\u0435\\u0434\\u0443\\u043F\\u0440\\u0435\\u0436\\u0434\\u0435\\u043D\\u0438\\u0435\n',
		"cfr/etsapp/i18n/i18n_sh.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izaberite ugovor o radu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Ugovori o radu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Odustani\n\n#XBUT: Button to close popover\nCLOSE=Zatvori\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Sa\\u010Duvaj nacrt\n\n# XTIT: \nTIMESHEET_TITLE=Moja lista radnog vremena\n\n#XTIT:\nINTERNAL_ERROR=Interna gre\\u0161ka\n\n#XTIT:\nERROR=Gre\\u0161ka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Interna gre\\u0161ka povezana sa obradom gre\\u0161aka pojavila se u aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i omiljene\n\n# XTIT: \nTIMESHEET=Unosi liste radnog vremena\n\n#XBUT: Button for quick entry\nQUICK_FILL=Brzi unos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Primeni na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detalji\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiraj vremenski unos\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreirajte unos za {0} dana\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detalji unosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detalji unosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreirajte unos za {0} \n\n# XTIT: Month short header\nMONTH_0=Januar\n# XTIT: Month short header\nMONTH_1=Februar\n# XTIT: Month short header\nMONTH_2=Mart\n# XTIT: Month short header\nMONTH_3=April\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Avgust\n# XTIT: Month short header\nMONTH_8=Septembar\n# XTIT: Month short header\nMONTH_9=Oktobar\n# XTIT: Month short header\nMONTH_10=Novembar\n# XTIT: Month short header\nMONTH_11=Decembar\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mart\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Jun\n# XTIT: Month title for calendar\nMONTH_FULL_6=Jul\n# XTIT: Month title for calendar\nMONTH_FULL_7=Avgust\n# XTIT: Month title for calendar\nMONTH_FULL_8=Septembar\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktobar\n# XTIT: Month title for calendar\nMONTH_FULL_10=Novembar\n# XTIT: Month title for calendar\nMONTH_FULL_11=Decembar\n\n# XTIT: Legend missing day\nMISSING_DAY=Potrebna je radnja\n# XTIT: Legend filled day\nFILLED_DAY=Izvr\\u0161eno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Potrebna je radnja davaoca odobrenja\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Odbijeno\n# XFLD: Legend future working day\nWORKING_DAY=Radni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Neradni dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Odabrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Odabrani neradni dan\n# XFLD: Legend current day\nCURRENT_DAY=Teku\\u0107i dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Ukupno sati koji nedostaju\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} sati)\n\n#XBUT: Button\nSAVE=Sa\\u010Duvaj\n\n#XBUT: Button \nSUBMIT=Podnesi\n\n# XMSG\nFILL_ALL=Unesite {0} sati za\\:\n\n#XFLD\nNO_TASK_TYPE=Nema tipa zadatka\n\n#XFLD\nMISSING_DAYS=Dani koji nedostaju\\: {0}\n\n#XBUT: Button\nHOME=Po\\u010Detna stranica\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrda\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi brisanje\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi podno\\u0161enje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi nacrt\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Rezime vremenskih unosa odabranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Rezime vremenskih unosa odabranih za podno\\u0161enje\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Rezime odabranih vremenskih unosa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Broj unosa\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Broj sati\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} sat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} sati\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} sat / {1} sati\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} sati / {1} sati\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} sati \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} dodele vremena\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 dodela vremena\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Nema dodela\n\n#XMSG: No Recordings\nNO_RECORDING=Nema zapisa\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} sati odobreno\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Sa\\u010Duvati sa vremenom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Sa\\u0107uvati bez vremena\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i omiljene\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Sa\\u010Duvaj kao omiljeni\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljaj omiljenima\n\n#XFLD: Week \nWEEK=Nedelja\n\n#XFLD:\nMEET_TARGET_HOURS=Primeni sate na\\:\n\n#XBUT\nALL_MISSING=Sve vreme koje nedostaje ({0} sati)\n\n#XBUT: Delete Button Text\nDELETE=Izbri\\u0161i\n\n#XBUT: Copy Button Text\nCOPY=Kopiraj\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodaj unos\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Ukupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=Vreme po\\u010Detka\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Naziv omiljenog\n\n#XFLD: label for end Time\nEND_TIME=Vreme zavr\\u0161etka\n\n#XFLD: label for note\nNOTE=Bele\\u0161ka\n\n#XBUT: Done button\nDONE=Izvr\\u0161eno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ru\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Uredi unos\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodela vremena\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Odaberi omiljene ili radnu listu\n\n# XTIT: select worklist\nSELECT_WORKLIST=Odaberi radnu listu\n\n# XTIT: Favorite\nFAVORITE=Omiljeni\n\n# XTIT: Worklist\nWORKLIST=Radna lista\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodaj omiljene\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Uredi omiljene\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=U\\u010Ditaj vi\\u0161e...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=U\\u010Ditavanje ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nastavi tra\\u017Eenje na serveru...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=U\\u010Ditavanje ...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Nijedan\n\n#XFLD\nNO_WORKLIST=Radne liste nisu dostupne\n\n#XFLD\nNO_FAVORITE=Omiljeni nisu dostupni\n\n# XTIT: Select\nSELECT=Odaberite {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Odaberi\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Tra\\u017Eenje...\n\n#XFLD: short label for hours\nHOURS_LABEL=h\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Sati\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minuti\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD. MMM YYYY.\n\n#XBUT:\nDETAIL=Detalji\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Pode\\u0161avanja\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Svi nesa\\u010Duvani podaci \\u0107e biti odba\\u010Deni. Da li sigurno \\u017Eelite da nastavite?\n\n# XTIT: \nUNSAVED_CHANGES=Nesa\\u010Duvane promene\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahtev je podnet.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Unesite naziv omiljenog u polje unosa dodele vremena.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Napravite unose koje \\u0107ete snimiti kao omiljene.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Unesite va\\u017Ee\\u0107e trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Unesite va\\u017Ee\\u0107e vreme po\\u010Detka i zavr\\u0161etka.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Nacrt je uspe\\u0161no sa\\u010Duvan.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Omiljeni je kreiran.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Omiljeni je a\\u017Euriran.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Omiljeni je izbrisan.\n\n#XBUT:\nHELP=Pomo\\u0107\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} sati uneti za ovu nedelju\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Uklju\\u010Dite prethodno popunjavanje za brzo popunjavanje sati za nedelju na osnovu poslednjeg uspe\\u0161nog unosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Neki unosi su neta\\u010Dni. Proverite detalje gre\\u0161ke i ispravite unose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Unos vremena za {0} i {1} vi\\u0161e dan(a)\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Uredi vremenski unos\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Unos vremena za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} sati {1} minuti\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} s {1} m\n\n#XBUT: Button to reset\nRESET=Ponovo postavi\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriraj\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodaj omiljene\n\n#XBUT: Button to create\nCREATE=Kreiraj\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Trenutni naziv omiljenog\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Novi naziv omiljenog\n\n#XTIT: time\nTIME=Vreme\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahtev izbrisan\n\n#XTIT:\nWARNING=Upozorenje\n',
		"cfr/etsapp/i18n/i18n_sk.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Vyberte pracovn\\u00FA zmluvu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pracovn\\u00E9 zmluvy\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Zru\\u0161i\\u0165\n\n#XBUT: Button to close popover\nCLOSE=Zavrie\\u0165\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=\\u00C1no\n\n#XBUT: Button to decline\nNO=Nie\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Ulo\\u017Ei\\u0165 n\\u00E1vrh\n\n# XTIT: \nTIMESHEET_TITLE=Moja evidencia \\u010Dasu\n\n#XTIT:\nINTERNAL_ERROR=Intern\\u00E1 chyba\n\n#XTIT:\nERROR=Chyba\n\n#XFLD:\nINTERNAL_ERROR_BODY=V aplik\\u00E1cii sa vyskytla intern\\u00E1 chyba s\\u00FAvisiaca so spracovan\\u00EDm chyby.\n\n# XTIT:\nFAV_DIALOG_BOX=Vymaza\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n# XTIT: \nTIMESHEET=Z\\u00E1znamy evidencie \\u010Dasu\n\n#XBUT: Button for quick entry\nQUICK_FILL=R\\u00FDchly z\\u00E1znam\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Pou\\u017Ei\\u0165 na\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detaily\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Vytvori\\u0165 \\u010Dasov\\u00FD z\\u00E1znam\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Vytvori\\u0165 z\\u00E1znam pre {0} dn\\u00ED\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detaily z\\u00E1znamu\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detaily z\\u00E1znamu pre {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Vytvori\\u0165 z\\u00E1znam pre {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=M\\u00E1j\n# XTIT: Month short header\nMONTH_5=J\\u00FAn\n# XTIT: Month short header\nMONTH_6=J\\u00FAl\n# XTIT: Month short header\nMONTH_7=Aug\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Janu\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_1=Febru\\u00E1r\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marec\n# XTIT: Month title for calendar\nMONTH_FULL_3=Apr\\u00EDl\n# XTIT: Month title for calendar\nMONTH_FULL_4=M\\u00E1j\n# XTIT: Month title for calendar\nMONTH_FULL_5=J\\u00FAn\n# XTIT: Month title for calendar\nMONTH_FULL_6=J\\u00FAl\n# XTIT: Month title for calendar\nMONTH_FULL_7=August\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Okt\\u00F3ber\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Vy\\u017Eaduje sa akcia\n# XTIT: Legend filled day\nFILLED_DAY=Hotovo\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Vy\\u017Eaduje sa akcia schva\\u013Eovate\\u013Ea\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zamietnut\\u00E9\n# XFLD: Legend future working day\nWORKING_DAY=Pracovn\\u00FD de\\u0148\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Nepracovn\\u00FD de\\u0148\n# XFLD: Legend selected working day\nSELECTED_DAY=Vybran\\u00FD de\\u0148\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Vybran\\u00FD nepracovn\\u00FD de\\u0148\n# XFLD: Legend current day\nCURRENT_DAY=Aktu\\u00E1lny de\\u0148\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=S\\u00FA\\u010Det ch\\u00FDbaj\\u00FAcich hod\\u00EDn\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} hod\\u00EDn)\n\n#XBUT: Button\nSAVE=Ulo\\u017Ei\\u0165\n\n#XBUT: Button \nSUBMIT=Odosla\\u0165\n\n# XMSG\nFILL_ALL=Zada\\u0165 {0} hod\\u00EDn pre\\:\n\n#XFLD\nNO_TASK_TYPE=\\u017Diadny typ \\u00FAlohy\n\n#XFLD\nMISSING_DAYS=Ch\\u00FDbaj\\u00FAce dni\\: {0}\n\n#XBUT: Button\nHOME=Domovsk\\u00E1 str\\u00E1nka\n\n#XTIT: confirmation header\nCONFIRMATION=Potvrdenie\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potvrdi\\u0165 odstr\\u00E1nenie\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potvrdi\\u0165 odoslanie\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potvrdi\\u0165 n\\u00E1vrh\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Preh\\u013Ead \\u010Dasov\\u00FDch z\\u00E1znamov vybrat\\u00FDch na odstr\\u00E1nenie\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Preh\\u013Ead \\u010Dasov\\u00FDch z\\u00E1znamov vybrat\\u00FDch na odoslanie\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Preh\\u013Ead vybrat\\u00FDch \\u010Dasov\\u00FDch z\\u00E1znamov\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Po\\u010Det z\\u00E1znamov\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Po\\u010Det hod\\u00EDn\n\n#XBUT: Confirm Button\nCONFIRM=Potvrdi\\u0165\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} hodina\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} hod\\u00EDn\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} hodina / {1} hod\\u00EDn\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} hod\\u00EDn / {1} hod\\u00EDn\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cie\\u013E\\: {0} hod\\u00EDn \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} priraden\\u00ED \\u010Dasu\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 priradenie \\u010Dasu\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u017Diadne priradenia\n\n#XMSG: No Recordings\nNO_RECORDING=\\u017Diadne z\\u00E1znamy\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} schv\\u00E1len\\u00FDch hod\\u00EDn\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Ulo\\u017Ei\\u0165 s \\u010Dasom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Ulo\\u017Ei\\u0165 bez \\u010Dasu\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Vymaza\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Ulo\\u017Ei\\u0165 ako ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Spr\\u00E1va ob\\u013E\\u00FAben\\u00FDch\n\n#XFLD: Week \nWEEK=T\\u00FD\\u017Ede\\u0148\n\n#XFLD:\nMEET_TARGET_HOURS=Pou\\u017Ei\\u0165 hodiny na\\:\n\n#XBUT\nALL_MISSING=V\\u0161etok ch\\u00FDbaj\\u00FAci \\u010Das ({0} hod\\u00EDn)\n\n#XBUT: Delete Button Text\nDELETE=Odstr\\u00E1ni\\u0165\n\n#XBUT: Copy Button Text\nCOPY=Kop\\u00EDrova\\u0165\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Prida\\u0165 z\\u00E1znam\n\n#XFLD: label for duration\nDURATION=Trvanie\n\n#XFLD: label for total duration\nTOTAL_DURATION=Celkov\\u00E9 trvanie\n\n#XFLD: label for status\nSTATUS=Stav\n\n#XFLD: label for start time\nSTART_TIME=\\u010Cas za\\u010Diatku\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=N\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas ukon\\u010Denia\n\n#XFLD: label for note\nNOTE=Pozn\\u00E1mka\n\n#XBUT: Done button\nDONE=Hotovo\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Manu\\u00E1lne\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Upravi\\u0165 z\\u00E1znam\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Priradenie \\u010Dasu\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Vybra\\u0165 ob\\u013E\\u00FAben\\u00E9 alebo z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: select worklist\nSELECT_WORKLIST=Vybra\\u0165 z\\u00E1sobu pr\\u00E1ce\n\n# XTIT: Favorite\nFAVORITE=Ob\\u013E\\u00FAben\\u00E9\n\n# XTIT: Worklist\nWORKLIST=Z\\u00E1soba pr\\u00E1ce\n\n# XTIT: Add Favorite\nADD_FAVORITE=Prida\\u0165 ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Upravi\\u0165 ob\\u013E\\u00FAben\\u00E9\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Na\\u010D\\u00EDta\\u0165 viac...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Na\\u010D\\u00EDtava sa ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Pokra\\u010Dova\\u0165 v h\\u013Eadan\\u00ED na serveri...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Na\\u010D\\u00EDtava sa ...\n\n#XFLD: BLANK\nEMPTY=Pr\\u00E1zdne\n\n#XFLD: None\nNONE=\\u017Diadne\n\n#XFLD\nNO_WORKLIST=Nie je k dispoz\\u00EDcii \\u017Eiadna z\\u00E1soba pr\\u00E1ce\n\n#XFLD\nNO_FAVORITE=Nie s\\u00FA k dispoz\\u00EDcii \\u017Eiadne ob\\u013E\\u00FAben\\u00E9 polo\\u017Eky\n\n# XTIT: Select\nSELECT=Vybra\\u0165 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Vybra\\u0165\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=H\\u013Eadanie...\n\n#XFLD: short label for hours\nHOURS_LABEL=hod\n\n#XFLD: short label for minutes\nMINUTES_LABEL=min\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Hodiny\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Min\\u00FAty\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=MMM DD, RRRR\n\n#XBUT:\nDETAIL=Detaily\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastavenia\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=V\\u0161etky neulo\\u017Een\\u00E9 d\\u00E1ta sa zru\\u0161ia. Naozaj chcete pokra\\u010Dova\\u0165?\n\n# XTIT: \nUNSAVED_CHANGES=Neulo\\u017Een\\u00E9 zmeny\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Po\\u017Eiadavka bola odoslan\\u00E1.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zadajte n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky do vstupn\\u00E9ho po\\u013Ea priradenia \\u010Dasu.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vykonajte z\\u00E1znamy, ktor\\u00E9 chcete ulo\\u017Ei\\u0165 ako ob\\u013E\\u00FAben\\u00E9 polo\\u017Eky.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Zadajte platn\\u00FA dobu trvania.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Zadajte platn\\u00FD \\u010Das za\\u010Diatku a ukon\\u010Denia.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=N\\u00E1vrh bol \\u00FAspe\\u0161ne ulo\\u017Een\\u00FD.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola vytvoren\\u00E1.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola aktualizovan\\u00E1.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Ob\\u013E\\u00FAben\\u00E1 polo\\u017Eka bola vymazan\\u00E1.\n\n#XBUT:\nHELP=N\\u00E1pove\\u010F\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} hod\\u00EDn zadan\\u00FDch pre tento t\\u00FD\\u017Ede\\u0148\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Zapnite automatick\\u00E9 vyplnenie, aby sa r\\u00FDchlo doplnili hodiny pre dan\\u00FD t\\u00FD\\u017Ede\\u0148 na z\\u00E1klade posledn\\u00E9ho \\u00FAspe\\u0161n\\u00E9ho z\\u00E1znamu.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Niektor\\u00E9 z\\u00E1znamy s\\u00FA nespr\\u00E1vne. Skontrolujte detaily chyby a opravte z\\u00E1znamy.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=\\u010Casov\\u00FD z\\u00E1znam pre {0} a {1} \\u010Fal\\u0161ie dni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Upravi\\u0165 \\u010Dasov\\u00FD z\\u00E1znam\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=\\u010Casov\\u00FD z\\u00E1znam pre {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} hod\\u00EDn {1} min\\u00FAt\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} hod {1} min\n\n#XBUT: Button to reset\nRESET=Resetova\\u0165\n\n#XBUT: Button to update\nUPDATE=Aktualizova\\u0165\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Prida\\u0165 ob\\u013E\\u00FAben\\u00FA polo\\u017Eku\n\n#XBUT: Button to create\nCREATE=Vytvori\\u0165\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Aktu\\u00E1lny n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Nov\\u00FD n\\u00E1zov ob\\u013E\\u00FAbenej polo\\u017Eky\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Po\\u017Eiadavka vymazan\\u00E1\n\n#XTIT:\nWARNING=Upozornenie\n',
		"cfr/etsapp/i18n/i18n_sl.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Izberite pogodbo o delu\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Pogodbe o delu\n\n#XFLD: label for from time\nFROM=Od\n\n#XFLD: label for to time\nTO=Do\n\n#XBUT: Button to cancel\nCANCEL=Prekinitev\n\n#XBUT: Button to close popover\nCLOSE=Zapiranje\n\n#XBUT: Button to accept\nOK=OK\n\n#XBUT: Button to affirm\nYES=Da\n\n#XBUT: Button to decline\nNO=Ne\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Vmesno shranjevanje\n\n# XTIT: \nTIMESHEET_TITLE=Moja evidenca delovnega \\u010Dasa\n\n#XTIT:\nINTERNAL_ERROR=Interna napaka\n\n#XTIT:\nERROR=Napaka\n\n#XFLD:\nINTERNAL_ERROR_BODY=Pri\\u0161lo je do interne napake v zvezi z obdelavo napak v aplikaciji.\n\n# XTIT:\nFAV_DIALOG_BOX=Izbri\\u0161i Priljubljene\n\n# XTIT: \nTIMESHEET=Vnosi v evidenci delovnega \\u010Dasa\n\n#XBUT: Button for quick entry\nQUICK_FILL=Hitri vnos\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Uporabi za\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Detajli\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Kreiranje vnosa \\u010Dasa\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=Kreiranje vnosa za {0} dni\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Detajli vnosa\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE=Detajli vnosa za {0}\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=Kreiranje vnosa za {0}\n\n# XTIT: Month short header\nMONTH_0=Jan\n# XTIT: Month short header\nMONTH_1=Feb\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Apr\n# XTIT: Month short header\nMONTH_4=Maj\n# XTIT: Month short header\nMONTH_5=Jun\n# XTIT: Month short header\nMONTH_6=Jul\n# XTIT: Month short header\nMONTH_7=Avg\n# XTIT: Month short header\nMONTH_8=Sep\n# XTIT: Month short header\nMONTH_9=Okt\n# XTIT: Month short header\nMONTH_10=Nov\n# XTIT: Month short header\nMONTH_11=Dec\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Januar\n# XTIT: Month title for calendar\nMONTH_FULL_1=Februar\n# XTIT: Month title for calendar\nMONTH_FULL_2=Marec\n# XTIT: Month title for calendar\nMONTH_FULL_3=April\n# XTIT: Month title for calendar\nMONTH_FULL_4=Maj\n# XTIT: Month title for calendar\nMONTH_FULL_5=Junij\n# XTIT: Month title for calendar\nMONTH_FULL_6=Julij\n# XTIT: Month title for calendar\nMONTH_FULL_7=Avgust\n# XTIT: Month title for calendar\nMONTH_FULL_8=September\n# XTIT: Month title for calendar\nMONTH_FULL_9=Oktober\n# XTIT: Month title for calendar\nMONTH_FULL_10=November\n# XTIT: Month title for calendar\nMONTH_FULL_11=December\n\n# XTIT: Legend missing day\nMISSING_DAY=Zahtevana akcija\n# XTIT: Legend filled day\nFILLED_DAY=Zaklju\\u010Deno\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Potrebna je akcija odobritelja\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Zavrnjeno\n# XFLD: Legend future working day\nWORKING_DAY=Delovni dan\n# XFLD: Legend non-working day\nNON_WORKING_DAY=Dela prost dan\n# XFLD: Legend selected working day\nSELECTED_DAY=Izbrani dan\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Izbrani dela prost dan\n# XFLD: Legend current day\nCURRENT_DAY=Trenutni dan\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Skupno \\u0161tevilo manjkajo\\u010Dih ur\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} ur)\n\n#XBUT: Button\nSAVE=Shranjevanje\n\n#XBUT: Button \nSUBMIT=Po\\u0161iljanje\n\n# XMSG\nFILL_ALL=Vnesite {0} ur za\\:\n\n#XFLD\nNO_TASK_TYPE=Brez tipa naloge\n\n#XFLD\nMISSING_DAYS=Manjkajo\\u010Di dnevi\\:  {0}\n\n#XBUT: Button\nHOME=Doma\\u010Da stran\n\n#XTIT: confirmation header\nCONFIRMATION=Potrditev\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Potrditev brisanja\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=Potrditev oddaje\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Potrditev osnutka\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Povzetek vnosov \\u010Dasa, izbranih za brisanje\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=Povzetek vnosov \\u010Dasa, izbranih za oddajo\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Povzetek izbranih vnosov \\u010Dasa\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u0160tevilo vnosov\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u0160tevilo ur\n\n#XBUT: Confirm Button\nCONFIRM=Potrditev\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} ura\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} ur\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} ura/{1} ure\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} ur/ {1} ur\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Cilj\\: {0} ur \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u010Dasovnih dodelitev\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=Enkratna dodelitev\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Ni dodelitev\n\n#XMSG: No Recordings\nNO_RECORDING=Ni zapisov\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} odobrenih ur\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Shranjevanje s \\u010Dasom\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Shranjevanje brez \\u010Dasa\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Izbri\\u0161i Priljubljene\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Shranjevanje kot priljubljene\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Upravljanje priljubljenih\n\n#XFLD: Week \nWEEK=Teden\n\n#XFLD:\nMEET_TARGET_HOURS=Uporabi ure za\\:\n\n#XBUT\nALL_MISSING=Ves manjkajo\\u010Di \\u010Das ({0} ur)\n\n#XBUT: Delete Button Text\nDELETE=Brisanje\n\n#XBUT: Copy Button Text\nCOPY=Kopiranje\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Dodajanje vnosa\n\n#XFLD: label for duration\nDURATION=Trajanje\n\n#XFLD: label for total duration\nTOTAL_DURATION=Skupno trajanje\n\n#XFLD: label for status\nSTATUS=Status\n\n#XFLD: label for start time\nSTART_TIME=\\u010Cas za\\u010Detka\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Ime priljubljene\n\n#XFLD: label for end Time\nEND_TIME=\\u010Cas konca\n\n#XFLD: label for note\nNOTE=Opomba\n\n#XBUT: Done button\nDONE=Zaklju\\u010Deno\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Ro\\u010Dno\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Urejanje vnosa\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Dodelitev \\u010Dasa\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Izbira priljubljene ali delovnega seznama\n\n# XTIT: select worklist\nSELECT_WORKLIST=Izbira delovnega seznama\n\n# XTIT: Favorite\nFAVORITE=Priljubljeni\n\n# XTIT: Worklist\nWORKLIST=Delovni seznam\n\n# XTIT: Add Favorite\nADD_FAVORITE=Dodajanje priljubljene\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Urejanje priljubljenih\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Nalo\\u017Ei ve\\u010D ...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Nalaganje ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Nadaljuj iskanje v stre\\u017Eniku ...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Nalaganje ...\n\n#XFLD: BLANK\nEMPTY=Prazno\n\n#XFLD: None\nNONE=Brez\n\n#XFLD\nNO_WORKLIST=Delovni seznam ni na voljo\n\n#XFLD\nNO_FAVORITE=Priljubljene niso na voljo\n\n# XTIT: Select\nSELECT=Izberite {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Izbira\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Iskanje ...\n\n#XFLD: short label for hours\nHOURS_LABEL=u\n\n#XFLD: short label for minutes\nMINUTES_LABEL=m\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Ure\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Minute\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=DD MMM YYYY\n\n#XBUT:\nDETAIL=Detajli\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Nastavitve\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Neshranjeni podatki bodo opu\\u0161\\u010Deni. Res \\u017Eelite nadaljevati?\n\n# XTIT: \nUNSAVED_CHANGES=Neshranjene spremembe\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Zahteva je bila poslana.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Vnesite ime priljubljene v polje vnosa Dodelitev \\u010Dasa.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Vnesite tiste, ki jih boste shranili kot priljubljene.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Vnesite veljavno trajanje.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Vnesite veljaven \\u010Das za\\u010Detka in konca\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Osnutek je bil uspe\\u0161no shranjen.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Priljubljena je kreirana.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Priljubljena je posodobljena.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Priljubljena je izbrisana.\n\n#XBUT:\nHELP=Pomo\\u010D\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED={0}/{1} ur je vnesenih za ta teden\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Vklju\\u010Dite predhodno polnjenje za hitro izpolnitev tedenskih ur na podlagi va\\u0161ega zadnjega uspe\\u0161nega vnosa.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Nekateri vnosi niso pravilni. Preglejte detajle o napakah in popravite vnose.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT=Vnos \\u010Dasa za {0} in dodatnih {1} dni\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Urejanje vnosa \\u010Dasa\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE=Vnos \\u010Dasa za {0}\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} ur {1} minut\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=Ponastavitev\n\n#XBUT: Button to update\nUPDATE=A\\u017Euriranje\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Dodajanje priljubljene\n\n#XBUT: Button to create\nCREATE=Kreiranje\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Ime trenutne priljubljene\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Ime nove priljubljene\n\n#XTIT: time\nTIME=\\u010Cas\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Zahteva izbrisana\n\n#XTIT:\nWARNING=Opozorilo\n',
		"cfr/etsapp/i18n/i18n_tr.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=Personel tayini se\\u00E7\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=Personel tayinleri\n\n#XFLD: label for from time\nFROM=Ba\\u015Flang\\u0131\\u00E7\n\n#XFLD: label for to time\nTO=Biti\\u015F\n\n#XBUT: Button to cancel\nCANCEL=\\u0130ptal\n\n#XBUT: Button to close popover\nCLOSE=Kapat\n\n#XBUT: Button to accept\nOK=Tamam\n\n#XBUT: Button to affirm\nYES=Evet\n\n#XBUT: Button to decline\nNO=Hay\\u0131r\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=Tasla\\u011F\\u0131 kaydet\n\n# XTIT: \nTIMESHEET_TITLE=Zaman \\u00E7izelgem\n\n#XTIT:\nINTERNAL_ERROR=Dahili hata\n\n#XTIT:\nERROR=Hata\n\n#XFLD:\nINTERNAL_ERROR_BODY=Uygulamada hata i\\u015Flemeye ili\\u015Fkin dahili hata ortaya \\u00E7\\u0131kt\\u0131.\n\n# XTIT:\nFAV_DIALOG_BOX=Favorileri sil\n\n# XTIT: \nTIMESHEET=Zaman \\u00E7izelgesi giri\\u015Fleri\n\n#XBUT: Button for quick entry\nQUICK_FILL=H\\u0131zl\\u0131 giri\\u015F\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=Uygula\\:\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=Ayr\\u0131nt\\u0131lar\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=Zaman giri\\u015Fi olu\\u015Ftur\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE={0} g\\u00FCn i\\u00E7in giri\\u015F olu\\u015Ftur\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=Giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} i\\u00E7in giri\\u015F ayr\\u0131nt\\u0131lar\\u0131\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE={0} i\\u00E7in giri\\u015F olu\\u015Ftur\n\n# XTIT: Month short header\nMONTH_0=Oca\n# XTIT: Month short header\nMONTH_1=\\u015Eub\n# XTIT: Month short header\nMONTH_2=Mar\n# XTIT: Month short header\nMONTH_3=Nis\n# XTIT: Month short header\nMONTH_4=May\n# XTIT: Month short header\nMONTH_5=Haz\n# XTIT: Month short header\nMONTH_6=Tem\n# XTIT: Month short header\nMONTH_7=A\\u011Fu\n# XTIT: Month short header\nMONTH_8=Eyl\n# XTIT: Month short header\nMONTH_9=Eki\n# XTIT: Month short header\nMONTH_10=Kas\n# XTIT: Month short header\nMONTH_11=Ara\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=Ocak\n# XTIT: Month title for calendar\nMONTH_FULL_1=\\u015Eubat\n# XTIT: Month title for calendar\nMONTH_FULL_2=Mart\n# XTIT: Month title for calendar\nMONTH_FULL_3=Nisan\n# XTIT: Month title for calendar\nMONTH_FULL_4=May\\u0131s\n# XTIT: Month title for calendar\nMONTH_FULL_5=Haziran\n# XTIT: Month title for calendar\nMONTH_FULL_6=Temmuz\n# XTIT: Month title for calendar\nMONTH_FULL_7=A\\u011Fustos\n# XTIT: Month title for calendar\nMONTH_FULL_8=Eyl\\u00FCl\n# XTIT: Month title for calendar\nMONTH_FULL_9=Ekim\n# XTIT: Month title for calendar\nMONTH_FULL_10=Kas\\u0131m\n# XTIT: Month title for calendar\nMONTH_FULL_11=Aral\\u0131k\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u0130\\u015Flem gerekli\n# XTIT: Legend filled day\nFILLED_DAY=Bitti\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=Onaylayan i\\u015Flemi gerekli\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=Reddedildi\n# XFLD: Legend future working day\nWORKING_DAY=\\u0130\\u015Fg\\u00FCn\\u00FC\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u00C7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\n# XFLD: Legend selected working day\nSELECTED_DAY=Se\\u00E7ilen g\\u00FCn\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=Se\\u00E7ilen \\u00E7al\\u0131\\u015F\\u0131lmayan g\\u00FCn\n# XFLD: Legend current day\nCURRENT_DAY=Ge\\u00E7erli g\\u00FCn\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=Toplam eksik saat\\: {0}\n\n#XFLD:\nMONTH_YEAR={0} {1} ({2} saat)\n\n#XBUT: Button\nSAVE=Kaydet\n\n#XBUT: Button \nSUBMIT=G\\u00F6nder\n\n# XMSG\nFILL_ALL=\\u015Eunun i\\u00E7in {0} saat gir\\:\n\n#XFLD\nNO_TASK_TYPE=G\\u00F6rev t\\u00FCr\\u00FC yok\n\n#XFLD\nMISSING_DAYS=Eksik g\\u00FCnler\\:  {0}\n\n#XBUT: Button\nHOME=Ana sayfa\n\n#XTIT: confirmation header\nCONFIRMATION=Teyit\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=Silmeyi teyit et\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=G\\u00F6ndermeyi teyit et\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=Tasla\\u011F\\u0131 teyit et\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=Silme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=G\\u00F6nderme i\\u00E7in se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=Se\\u00E7ilen zaman giri\\u015Flerinin \\u00F6zeti\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=Giri\\u015F say\\u0131s\\u0131\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=Saat say\\u0131s\\u0131\n\n#XBUT: Confirm Button\nCONFIRM=Teyit et\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} saat\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} saat\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} saat / {1} saat\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} saat / {1} saat\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=Hedef\\: {0} saat \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} zaman tayinleri\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 zaman tayini\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=Tayin yok\n\n#XMSG: No Recordings\nNO_RECORDING=Kay\\u0131t yok\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} saat onayland\\u0131\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=Zamanla kaydet\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=Zaman olmadan kaydet\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=Favorileri sil\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=Favori olarak kaydet\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=Favorileri y\\u00F6net\n\n#XFLD: Week \nWEEK=Hafta\n\n#XFLD:\nMEET_TARGET_HOURS=Saatleri uygula\\:\n\n#XBUT\nALL_MISSING=T\\u00FCm eksik zamanlar ({0} saat)\n\n#XBUT: Delete Button Text\nDELETE=Sil\n\n#XBUT: Copy Button Text\nCOPY=Kopyala\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=Giri\\u015F ekle\n\n#XFLD: label for duration\nDURATION=S\\u00FCre\n\n#XFLD: label for total duration\nTOTAL_DURATION=Toplam s\\u00FCre\n\n#XFLD: label for status\nSTATUS=Durum\n\n#XFLD: label for start time\nSTART_TIME=Ba\\u015Flang\\u0131\\u00E7 saati\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=Favori ad\n\n#XFLD: label for end Time\nEND_TIME=Biti\\u015F saati\n\n#XFLD: label for note\nNOTE=Not\n\n#XBUT: Done button\nDONE=Bitti\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=Man\\u00FCel\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=Giri\\u015Fi d\\u00FCzenle\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=Zaman tayini\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=Favori veya i\\u015F listesi se\\u00E7\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u0130\\u015F listesi se\\u00E7\n\n# XTIT: Favorite\nFAVORITE=Favoriler\n\n# XTIT: Worklist\nWORKLIST=\\u0130\\u015F listesi\n\n# XTIT: Add Favorite\nADD_FAVORITE=Favori ekle\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=Favorileri d\\u00FCzenle\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=Daha fazla y\\u00FCkle...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=Y\\u00FCkleniyor ...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=Sunucuda aramaya devam et...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=Y\\u00FCkleniyor ...\n\n#XFLD: BLANK\nEMPTY=Bo\\u015F\n\n#XFLD: None\nNONE=Hi\\u00E7biri\n\n#XFLD\nNO_WORKLIST=\\u0130\\u015F listesi mevcut de\\u011Fil\n\n#XFLD\nNO_FAVORITE=Favori mevcut de\\u011Fil\n\n# XTIT: Select\nSELECT={0} se\\u00E7\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=Se\\u00E7\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=Ara...\n\n#XFLD: short label for hours\nHOURS_LABEL=s\n\n#XFLD: short label for minutes\nMINUTES_LABEL=d\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=Saat\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=Dakika\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=AAA GG, YYYY\n\n#XBUT:\nDETAIL=Ayr\\u0131nt\\u0131lar\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=Ayarlar\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=Kaydedilmeyen veriler at\\u0131lacak. Devam etmek istedi\\u011Finizden emin misiniz?\n\n# XTIT: \nUNSAVED_CHANGES=Kaydedilmeyen de\\u011Fi\\u015Fiklikler\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=Talep g\\u00F6nderildi.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=Zaman tayini giri\\u015F alan\\u0131nda favori ad girin.\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=Favoriniz olarak saklamak i\\u00E7in giri\\u015F yap\\u0131n.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=Ge\\u00E7erli s\\u00FCre girin.\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=Ge\\u00E7erli ba\\u015Flang\\u0131\\u00E7 ve biti\\u015F saati girin.\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=Taslak ba\\u015Far\\u0131yla kaydedildi.\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=Favori olu\\u015Fturuldu.\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=Favori g\\u00FCncellendi.\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=Favori silindi.\n\n#XBUT:\nHELP=Yard\\u0131m\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=Bu hafta i\\u00E7in {0}/{1} saat girildi\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=Son ba\\u015Far\\u0131l\\u0131 giri\\u015Finizi temel alan haftaya ili\\u015Fkin saatleri toplamak i\\u00E7in \\u00D6n de\\u011Ferleri y\\u00FCkle\'yi a\\u00E7\\u0131n.\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=Baz\\u0131 giri\\u015Fler do\\u011Fru de\\u011Fil. Hata ayr\\u0131nt\\u0131lar\\u0131n\\u0131 g\\u00F6zden ge\\u00E7irin ve giri\\u015Fleri d\\u00FCzeltin.\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} ve fazladan {1} g\\u00FCn i\\u00E7in zaman giri\\u015Fi\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=Zaman giri\\u015Fini d\\u00FCzenle\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} i\\u00E7in zaman giri\\u015Fi\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} saat {1} dakika\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} s {1} d\n\n#XBUT: Button to reset\nRESET=S\\u0131f\\u0131rla\n\n#XBUT: Button to update\nUPDATE=G\\u00FCncelle\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=Favori ekle\n\n#XBUT: Button to create\nCREATE=Olu\\u015Ftur\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=Ge\\u00E7erli favori ad\\u0131\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=Yeni favori ad\\u0131\n\n#XTIT: time\nTIME=Zaman\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=Talep silindi\n\n#XTIT:\nWARNING=Uyar\\u0131\n',
		"cfr/etsapp/i18n/i18n_zh_CN.properties": '\n\n#XFLD: Select Personnel Assignment Label\nPERSONAL_ASSIGN=\\u9009\\u62E9\\u4EBA\\u4E8B\\u5206\\u914D\n\n#XTIT: Select Personnel Assignment Title\nPERSONAL_ASSIGN_TITLE=\\u4EBA\\u4E8B\\u5206\\u914D\n\n#XFLD: label for from time\nFROM=\\u81EA\n\n#XFLD: label for to time\nTO=\\u81F3\n\n#XBUT: Button to cancel\nCANCEL=\\u53D6\\u6D88\n\n#XBUT: Button to close popover\nCLOSE=\\u5173\\u95ED\n\n#XBUT: Button to accept\nOK=\\u786E\\u5B9A\n\n#XBUT: Button to affirm\nYES=\\u662F\n\n#XBUT: Button to decline\nNO=\\u5426\n\n#XBUT: Button to Save Draft\nSAVE_DRAFT=\\u4FDD\\u5B58\\u8349\\u7A3F\n\n# XTIT: \nTIMESHEET_TITLE=\\u6211\\u7684\\u5DE5\\u65F6\\u8868\n\n#XTIT:\nINTERNAL_ERROR=\\u5185\\u90E8\\u9519\\u8BEF\n\n#XTIT:\nERROR=\\u9519\\u8BEF\n\n#XFLD:\nINTERNAL_ERROR_BODY=\\u5E94\\u7528\\u4E2D\\u53D1\\u751F\\u4E0E\\u9519\\u8BEF\\u5904\\u7406\\u76F8\\u5173\\u7684\\u5185\\u90E8\\u9519\\u8BEF\\u3002\n\n# XTIT:\nFAV_DIALOG_BOX=\\u5220\\u9664\\u6536\\u85CF\\u5939\n\n# XTIT: \nTIMESHEET=\\u5DE5\\u65F6\\u8868\\u6761\\u76EE\n\n#XBUT: Button for quick entry\nQUICK_FILL=\\u5FEB\\u6377\\u8F93\\u5165\n\n# XFLD: Apply to\nENTRY_VIEW_APPLY_TO=\\u5E94\\u7528\\u4E8E\n\n# XTIT: \nTIMESHEET_DETAILS_TITLE=\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for create entry view\nTIMESHEET_CREATE_ENTRY_TITLE=\\u521B\\u5EFA\\u65F6\\u95F4\\u6761\\u76EE\n\n# XTIT: Title for create entry view with multiple days selected\nTIMESHEET_CREATE_ENTRIES_TITLE=\\u9488\\u5BF9 {0} \\u5929\\u521B\\u5EFA\\u6761\\u76EE\n\n# XTIT: Title for Entry Details\nENTRY_DETAILS=\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for edit entry view for a particular date ({0} = date)\nTIMESHEET_EDIT_ENTRY_TITLE={0} \\u7684\\u6761\\u76EE\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n# XTIT: Title for create entry view for a particular date ({0} = date)\nTIMESHEET_NEW_ENTRY_TITLE=\\u9488\\u5BF9 {0} \\u521B\\u5EFA\\u6761\\u76EE\n\n# XTIT: Month short header\nMONTH_0=01\n# XTIT: Month short header\nMONTH_1=02\n# XTIT: Month short header\nMONTH_2=03\n# XTIT: Month short header\nMONTH_3=04\n# XTIT: Month short header\nMONTH_4=05\n# XTIT: Month short header\nMONTH_5=06\n# XTIT: Month short header\nMONTH_6=07\n# XTIT: Month short header\nMONTH_7=08\n# XTIT: Month short header\nMONTH_8=09\n# XTIT: Month short header\nMONTH_9=10\n# XTIT: Month short header\nMONTH_10=11\n# XTIT: Month short header\nMONTH_11=12\n\n# XTIT: Month title for calendar\nMONTH_FULL_0=1 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_1=2 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_2=3 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_3=4 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_4=5 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_5=6 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_6=7 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_7=8 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_8=9 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_9=10 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_10=11 \\u6708\n# XTIT: Month title for calendar\nMONTH_FULL_11=12 \\u6708\n\n# XTIT: Legend missing day\nMISSING_DAY=\\u9700\\u8981\\u91C7\\u53D6\\u63AA\\u65BD\n# XTIT: Legend filled day\nFILLED_DAY=\\u5B8C\\u6210\n# XTIT: Legend filled in process, manager action needed\nFILLED_MANAGER=\\u9700\\u8981\\u5BA1\\u6279\\u4EBA\\u64CD\\u4F5C\n# XFLD: Rejected by manager - this appears on the legend\nREJECTED=\\u5DF2\\u62D2\\u7EDD\n# XFLD: Legend future working day\nWORKING_DAY=\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend non-working day\nNON_WORKING_DAY=\\u975E\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend selected working day\nSELECTED_DAY=\\u6240\\u9009\\u65E5\\u671F\n# XFLD: Legend selected non-working day\nSELECTED_NW_DAY=\\u6240\\u9009\\u975E\\u5DE5\\u4F5C\\u65E5\n# XFLD: Legend current day\nCURRENT_DAY=\\u5F53\\u65E5\n\n# XMSG: Footer information about missing hours\nTOTAL_MISSING=\\u7F3A\\u5C11\\u65F6\\u6570\\u603B\\u8BA1\\uFF1A{0}\n\n#XFLD:\nMONTH_YEAR={0} {1}\\uFF08{2} \\u5C0F\\u65F6\\uFF09\n\n#XBUT: Button\nSAVE=\\u4FDD\\u5B58\n\n#XBUT: Button \nSUBMIT=\\u63D0\\u4EA4\n\n# XMSG\nFILL_ALL=\\u4E3A\\u4EE5\\u4E0B\\u9879\\u8F93\\u5165 {0} \\u5C0F\\u65F6\\uFF1A\n\n#XFLD\nNO_TASK_TYPE=\\u65E0\\u4EFB\\u52A1\\u7C7B\\u578B\n\n#XFLD\nMISSING_DAYS=\\u7F3A\\u5C11\\u5929\\u6570\\uFF1A{0}\n\n#XBUT: Button\nHOME=\\u4E3B\\u5C4F\\u5E55\n\n#XTIT: confirmation header\nCONFIRMATION=\\u786E\\u8BA4\n\n#XTIT: deletion confirmation header\nDELETE_CONFIRMATION=\\u786E\\u8BA4\\u5220\\u9664\n\n#XTIT: submission confirmation header\nSUBMISSION_CONFIRMATION=\\u786E\\u8BA4\\u63D0\\u4EA4\n\n#XTIT: Draft submission confirmation header\nDRAFT_CONFIRMATION=\\u786E\\u8BA4\\u8349\\u7A3F\n\n#XFLD: label for Deletion summary in Dialog\nDELETE_CONFIRMATION_SUMMARY=\\u5F85\\u5220\\u9664\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Submission summary in Dialog\nSUBMISSION_CONFIRMATION_SUMMARY=\\u5F85\\u63D0\\u4EA4\\u7684\\u9009\\u4E2D\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Draft Submission summary in Dialog\nDRAFT_CONFIRMATION_SUMMARY=\\u6240\\u9009\\u65F6\\u95F4\\u6761\\u76EE\\u6C47\\u603B\n\n#XFLD: label for Number of entries in Dialog\nDELETE_CONFIRMATION_SUMMARY_ENTRIES=\\u6761\\u76EE\\u6570\n\n#XFLD: label for Number of hours in Dialog\nDELETE_CONFIRMATION_SUMMARY_HOURS=\\u5C0F\\u65F6\\u6570\n\n#XBUT: Confirm Button\nCONFIRM=\\u786E\\u8BA4\n\n#XMSG: Summary for confirmation - these are two dates\nSUMMARY={0} - {1}\n\n#XMSG: Date Range for a particular week\nWEEK_DATE_RANGE={0} - {1}\n\n#XMSG: Recorded hour equals to one\nTOTAL_RECORDED_HOUR={0} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week\nTOTAL_RECORDED_HOURS={0} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week per target hours,if the recorded hours equals to one\nWEEKLY_RECORDED_HOUR={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\n\n#XMSG: Total recorded hours for a particular week per target hours\nWEEKLY_RECORDED_HOURS={0} \\u5C0F\\u65F6 / {1} \\u5C0F\\u65F6\n\n#XMSG: Total target hours for a particular week\nTOTAL_TARGET_HOURS=\\u76EE\\u6807\\uFF1A{0} \\u5C0F\\u65F6 \n\n#XMSG: Total assignments for multiple entries\nTOTAL_ASSIGNMENTS={0} \\u65F6\\u95F4\\u5206\\u914D\n\n#XMSG: Total assignments for one entry\nTOTAL_ASSIGNMENT=1 \\u9879\\u65F6\\u95F4\\u5206\\u914D\n\n#XMSG: No Assignments\nNO_ASSIGNMENT=\\u65E0\\u5206\\u914D\n\n#XMSG: No Recordings\nNO_RECORDING=\\u65E0\\u8BB0\\u5F55\n\n#XMSG: Total approved hours for a particular week\nTOTAL_APPROVED_HOURS={0} \\u5C0F\\u65F6\\u5DF2\\u83B7\\u6279\\u51C6\n\n#XMSG: Save Favorite with time \nSAVE_FAVORITE_WITH_TIME=\\u4FDD\\u5B58\\uFF08\\u6709\\u65F6\\u95F4\\uFF09\n\n#XMSG: Save Favorite without time \nSAVE_FAVORITE_WITHOUT_TIME=\\u4FDD\\u5B58\\uFF08\\u65E0\\u65F6\\u95F4\\uFF09\n\n#XMSG: Delete Favorites\nDELETE_FAVORITES=\\u5220\\u9664\\u6536\\u85CF\\u5939\n\n#XBUT: Save as favorite\nSAVE_AS_FAV=\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\n\n#XBUT: Manage favorites\nMANAGE_FAVORITES=\\u7BA1\\u7406\\u6536\\u85CF\\u5939\n\n#XFLD: Week \nWEEK=\\u5468\n\n#XFLD:\nMEET_TARGET_HOURS=\\u5C06\\u5C0F\\u65F6\\u6570\\u5E94\\u7528\\u4E8E\\uFF1A\n\n#XBUT\nALL_MISSING=\\u7F3A\\u5C11\\u65F6\\u95F4\\u603B\\u8BA1\\uFF08{0} \\u5C0F\\u65F6\\uFF09\n\n#XBUT: Delete Button Text\nDELETE=\\u5220\\u9664\n\n#XBUT: Copy Button Text\nCOPY=\\u590D\\u5236\n\n#XBUT: Add Button Text for Weekly Entry nav button\nNAV_ADD=\\u6DFB\\u52A0\\u6761\\u76EE\n\n#XFLD: label for duration\nDURATION=\\u6301\\u7EED\\u65F6\\u95F4\n\n#XFLD: label for total duration\nTOTAL_DURATION=\\u603B\\u6301\\u7EED\\u65F6\\u95F4\n\n#XFLD: label for status\nSTATUS=\\u72B6\\u6001\n\n#XFLD: label for start time\nSTART_TIME=\\u5F00\\u59CB\\u65F6\\u95F4\n\n#XFLD: label for Favorite Name\nFAVORITE_NAME=\\u6536\\u85CF\\u9879\\u540D\\u79F0\n\n#XFLD: label for end Time\nEND_TIME=\\u7ED3\\u675F\\u65F6\\u95F4\n\n#XFLD: label for note\nNOTE=\\u6CE8\\u91CA\n\n#XBUT: Done button\nDONE=\\u5B8C\\u6210\n\n# XTIT: Manual Input Add\nMANUAL_INPUT_ADD=\\u624B\\u52A8\n\n# XTIT: Manual Input Edit\nMANUAL_INPUT_EDIT=\\u7F16\\u8F91\\u6761\\u76EE\n\n# XTIT: Cost Assignment\nCOST_ASSIGNMENT=\\u65F6\\u95F4\\u5206\\u914D\n\n# XTIT: select favorite or worklist\nSELECT_FAVORITE=\\u9009\\u62E9\\u6536\\u85CF\\u9879\\u6216\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: select worklist\nSELECT_WORKLIST=\\u9009\\u62E9\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: Favorite\nFAVORITE=\\u6536\\u85CF\\u5939\n\n# XTIT: Worklist\nWORKLIST=\\u5DE5\\u4F5C\\u6E05\\u5355\n\n# XTIT: Add Favorite\nADD_FAVORITE=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\n\n# XTIT: Edit Favorite\nEDIT_FAVORITE=\\u7F16\\u8F91\\u6536\\u85CF\\u5939\n\n#XFLD: Tap to Load More\nTAP_TO_LOAD_MORE=\\u52A0\\u8F7D\\u66F4\\u591A...\n\n#XFLD: Tap to Load More Loading\nTAP_TO_LOAD_MORE_LOADING=\\u52A0\\u8F7D\\u4E2D...\n\n#XFLD: Continue Search on Server\nCONTINUE_SEARCH_ON_SERVER=\\u7EE7\\u7EED\\u5728\\u670D\\u52A1\\u5668\\u4E0A\\u641C\\u7D22...\n\n#XFLD: Continue Search on Server Loading\nCONTINUE_SEARCH_ON_SERVER_LOADING=\\u52A0\\u8F7D\\u4E2D...\n\n#XFLD: BLANK\nEMPTY=\\u7A7A\n\n#XFLD: None\nNONE=\\u65E0\n\n#XFLD\nNO_WORKLIST=\\u65E0\\u53EF\\u7528\\u5DE5\\u4F5C\\u6E05\\u5355\n\n#XFLD\nNO_FAVORITE=\\u65E0\\u53EF\\u7528\\u6536\\u85CF\\u9879\n\n# XTIT: Select\nSELECT=\\u9009\\u62E9 {0}\n\n# XTIT: Placeholder for Cost Assignment Picker indicating Select action\nSELECT_PLACEHOLDER=\\u9009\\u62E9\n\n#XFLD: Placeholder for cost assignment type search\nSEARCH=\\u641C\\u7D22...\n\n#XFLD: short label for hours\nHOURS_LABEL=\\u5C0F\\u65F6\n\n#XFLD: short label for minutes\nMINUTES_LABEL=\\u5206\n\n#XFLD: full label for hours \nHOURS_LABEL_FULL=\\u5C0F\\u65F6\n\n#XFLD: full label for minutes\nMINUTES_LABEL_FULL=\\u5206\\u949F\n\n#XFLD: label for date. When localizing do not change the MMM DD or YYYY, just the order of them\nDATE_LOCALE=YYYY, MMM DD\n\n#XBUT:\nDETAIL=\\u8BE6\\u7EC6\\u4FE1\\u606F\n\n#XFLD: label for Settings title\nSETTINGS_TITLE=\\u8BBE\\u7F6E\n\n# XMSG: \nCONFIRM_LEAVE_PAGE=\\u6240\\u6709\\u672A\\u4FDD\\u5B58\\u7684\\u6570\\u636E\\u90FD\\u5C06\\u653E\\u5F03\\u3002\\u662F\\u5426\\u786E\\u5B9A\\u7EE7\\u7EED\\uFF1F\n\n# XTIT: \nUNSAVED_CHANGES=\\u672A\\u4FDD\\u5B58\\u7684\\u66F4\\u6539\n\n#XMSG: toast message for successful submit\nSUBMIT_SUCCESS=\\u5DF2\\u63D0\\u4EA4\\u7533\\u8BF7\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_NAME_ERROR=\\u8BF7\\u5728\\u201C\\u65F6\\u95F4\\u5206\\u914D\\u201D\\u8F93\\u5165\\u5B57\\u6BB5\\u4E2D\\u8F93\\u5165\\u6536\\u85CF\\u9879\\u540D\\u79F0\\u3002\n\n#XMSG: toast message if favorite data is not recorded\nFAV_DATA_ERROR=\\u8F93\\u5165\\u5185\\u5BB9\\u4EE5\\u5C06\\u5176\\u53E6\\u5B58\\u4E3A\\u6536\\u85CF\\u9879\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_TIME_ERROR=\\u8BF7\\u8F93\\u5165\\u6709\\u6548\\u6301\\u7EED\\u65F6\\u95F4\\u3002\n\n#XMSG: toast message if favorite time is not recorded\nFAV_CLOCK_TIME_ERROR=\\u8F93\\u5165\\u6709\\u6548\\u5F00\\u59CB\\u65F6\\u95F4\\u548C\\u7ED3\\u675F\\u65F6\\u95F4\\u3002\n\n#XMSG: toast message for successful draft submit\nDRAFT_SUCCESS=\\u5DF2\\u6210\\u529F\\u4FDD\\u5B58\\u8349\\u7A3F\\u3002\n\n#XMSG: toast message for successful submit favorites\nFAVORITE_SUBMIT_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u521B\\u5EFA\\u3002\n\n#XMSG: toast message for successful updating of favorites\nFAVORITE_UPDATE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u66F4\\u65B0\\u3002\n\n#XMSG: toast message for successful delete of a favorite\nFAVORITE_DELETE_SUCCESS=\\u6536\\u85CF\\u9879\\u5DF2\\u5220\\u9664\\u3002\n\n#XBUT:\nHELP=\\u5E2E\\u52A9\n\n#XMSG: confirmation message for week entry\nTOTAL_BOOKED=\\u5DF2\\u4E3A\\u6B64\\u661F\\u671F\\u8F93\\u5165 {0}/{1} \\u5C0F\\u65F6\n\n#XMSG: help text for pre-fill option\nHELP_PREFILL=\\u6253\\u5F00\\u9884\\u586B\\u5145\\uFF0C\\u57FA\\u4E8E\\u60A8\\u6700\\u540E\\u6210\\u529F\\u8F93\\u5165\\u7684\\u5185\\u5BB9\\u5FEB\\u901F\\u586B\\u5145\\u8BE5\\u5468\\u7684\\u5C0F\\u65F6\\u6570\\u3002\n\n#XMSG: error pop-up message text\nERROR_SUBMIT=\\u67D0\\u4E9B\\u6761\\u76EE\\u4E0D\\u6B63\\u786E\\u3002\\u8BF7\\u68C0\\u67E5\\u9519\\u8BEF\\u8BE6\\u7EC6\\u4FE1\\u606F\\u5E76\\u66F4\\u6B63\\u6761\\u76EE\\u3002\n\n#XMSG: error pop-up message text\nSUBMIT_HEADER_TEXT={0} \\u548C {1} \\u5929\\u7684\\u65F6\\u95F4\\u6761\\u76EE\n\n# XTIT: Title for create entry view\nTIMESHEET_EDIT_ENTRY_TITLE_SCREEN=\\u7F16\\u8F91\\u65F6\\u95F4\\u6761\\u76EE\n\n#XMSG: Header in edit screen for single date\nSUBMIT_HEADER_TEXT_SINGLE={0} \\u7684\\u65F6\\u95F4\\u6761\\u76EE\n\n# XFLD: Concatenate hours and minutes full\nFULL_CONCATENATE_HOURSMIN={0} \\u5C0F\\u65F6 {1} \\u5206\n\n# XFLD: Concatenate hours and minutes full\nSHORT_CONCATENATE_HOURSMIN={0} h {1} m\n\n#XBUT: Button to reset\nRESET=\\u91CD\\u7F6E\n\n#XBUT: Button to update\nUPDATE=\\u66F4\\u65B0\n\n#XBUT: Button to add favorite\nFAVORITE_BTN=\\u6DFB\\u52A0\\u6536\\u85CF\\u9879\n\n#XBUT: Button to create\nCREATE=\\u521B\\u5EFA\n\n#XTIT: Existing favorite name\nEXISTING_FAV_NAME=\\u5F53\\u524D\\u6536\\u85CF\\u5939\\u540D\\u79F0\n\n#XTIT: new favorite name\nNEW_FAVORITE_NAME=\\u65B0\\u6536\\u85CF\\u5939\\u540D\\u79F0\n\n#XTIT: time\nTIME=\\u65F6\\u95F4\n\n#XMSG: toast message for successful submit\nDELETE_SUCCESS=\\u5DF2\\u5220\\u9664\\u7533\\u8BF7\n\n#XTIT:\nWARNING=\\u8B66\\u544A\n',
		"cfr/etsapp/model/TimeEntry.js": function() {
			jQuery.sap.declare("cfr.etsapp.manage.model.TimeEntry");
			cfr.etsapp.manage.model.TimeEntry = function(t, c, s, e) {
				this.time = t;
				this.hours = Math.floor(t);
				this.minutes = Math.round((t - Math.floor(t)) * 60);
				this.suggestion = s === undefined ? false : s;
				this.newEntry = !e;
				this.mainItem = null;
				this.subItems = c;
				this.notes = null;
				this.startTime = "";
				this.endTime = "";
				this.counter = "";
				this.hasNotes = false;
				this.showTime = e;
				this.showError = false;
				this.error = "";
				this.status = "";
				this.statusId = "";
			};
			cfr.etsapp.manage.model.TimeEntry.prototype.setStartEndTimes = function(d, e, m, w) {
				var l = e.length - 1;
				while (l >= 0 && e[e.length - 1].deleted) {
					l--;
				}
				var s = this.createTime(d, l >= 0 ? e[l].endTime : w.startTime);
				var a = this.createTime(d, w ? w.lunchStart : "000000");
				var b = this.createTime(d, w ? w.lunchEnd : "000000");
				if (s.getTime() === a.getTime()) {
					s.setTime(s.getTime() + b.getTime() - a.getTime());
				}
				var c = new Date(s.getTime() + m * 3600000);
				if (s.getTime() < a.getTime()) {
					c.setTime(c.getTime() + b.getTime() - a.getTime());
				}
				this.startTime = (s.getHours() + 100).toString().substring(1, 3) + (s.getMinutes() + 100).toString().substring(1, 3) + "00";
				this.endTime = (c.getHours() + 100).toString().substring(1, 3) + (c.getMinutes() + 100).toString().substring(1, 3) + "00";
			};
			cfr.etsapp.manage.model.TimeEntry.prototype.createTime = function(d, t) {
				var a = new Date(d.getTime());
				a.setHours(parseInt(t.substring(0, 2), 10), parseInt(t.substring(2, 4), 10));
				return a;
			};
			cfr.etsapp.manage.model.TimeEntry.prototype.setData = function(d) {
				if (d.FieldName === "TIME") {
					this.recordNumber = d.RecordNumber;
					this.time = parseFloat(d.FieldValue.trim());
					this.hours = Math.floor(this.time);
					this.minutes = Math.round((this.time - this.hours) * 60);
					this.startTime = d.StartTime;
					this.endTime = d.EndTime;
				} else if (d.FieldName === "NOTES") {
					this.notes = d.FieldValueText;
					if (this.notes && this.notes.length > 0) {
						this.hasNotes = true;
					}
				} else if (d.FieldName === "STARTTIME") {
					this.startTime = d.FieldValueText;
				} else if (d.FieldName === "ENDTIME") {
					this.endTime = d.FieldValueText;
				} else if (d.FieldName === "COUNTER") {
					this.counter = d.FieldValueText;
				} else if (d.FieldName === "REASON") {
					this.rejectionReason = d.FieldValueText;
				} else if (d.FieldName === "STATUS") {
					this.status = d.FieldValueText;
					this.statusId = d.FieldValue;
				} else if (d.Level === "0") {
					this.mainItem = d.FieldValueText;
					this.mainCode = d.FieldValue;
					this.mainName = d.FieldName;
				} else {
					if (this.subItems) {
						this.subItems += ", " + d.FieldValueText;
						this.childItems.push(d.FieldValueText);
						this.childCodes.push(d.FieldValue);
						this.childNames.push(d.FieldName);
					} else {
						this.subItems = d.FieldValueText;
						this.childItems = [d.FieldValueText];
						this.childCodes = [d.FieldValue];
						this.childNames = [d.FieldName];
					}
				}
			};
		},
		"cfr/etsapp/utils/ConcurrentEmployment.js": function() {
			jQuery.sap.declare("cfr.etsapp.manage.utils.ConcurrentEmployment");
			cfr.etsapp.manage.utils.ConcurrentEmployment = {
				getCEEnablement: function(s, a) {
					this.initialize(s, a);
					var m = new sap.ui.model.json.JSONModel();
					s.oService.getPersonellAssignments(s, function(d) {
						if (d.length > 1) {
							m.setData(d);
							s.oCEForm.setModel(m);
							s.oCEDialog.open();
						} else {
							s.oApplication.pernr = d[0].Pernr;
							a();
						}
					});
				},
				initialize: function(s, a) {
					this.setControllerInstance(s);
					var i = new sap.m.RadioButton({
						text: "{AssignmentText}",
						customData: new sap.ui.core.CustomData({
							"key": "Pernr",
							"value": "{Pernr}"
						})
					});
					s.oCESelect = new sap.m.RadioButtonGroup().bindAggregation("buttons", "/", i);
					s.oCEForm = new sap.ui.layout.form.Form({
						maxContainerCols: 2,
						class: "sapUiLargeMarginTopBottom",
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanL: 12,
							labelSpanM: 12,
							labelSpanS: 12,
							columnsL: 2,
							columnsM: 2
						}),
						formContainers: new sap.ui.layout.form.FormContainer({
							formElements: [new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: s.oBundle.getText("PERSONAL_ASSIGN")
								}),
								fields: s.oCESelect
							})]
						})
					});
					s.oCEDialog = new sap.m.Dialog({
						title: s.oBundle.getText("PERSONAL_ASSIGN_TITLE"),
						class: "sapUiContentPadding sapUiLargeMarginTopBottom",
						content: s.oCEForm,
						buttons: [new sap.m.Button({
							text: s.oBundle.getText("OK"),
							press: function() {
								s.oCEDialog.close();
								s.oApplication.pernr = s.oCESelect.getSelectedButton().data().Pernr;
								a();
							}
						}), new sap.m.Button({
							text: s.oBundle.getText("CANCEL"),
							press: function() {
								s.oCEDialog.close();
								s.oCEDialog.Cancelled = true;
								window.history.go(-1);
							}
						})]
					});
					s.oCEDialog.attachAfterClose(function() {
						if (!s.oApplication.pernr && s.oCEDialog.Cancelled !== true) {
							s.oCEDialog.open();
						}
					});
				},
				setControllerInstance: function(m) {
					this.me = m;
				},
				getControllerInstance: function() {
					return this.me;
				}
			};
		},
		"cfr/etsapp/utils/DataManager.js": function() {
			jQuery.sap.declare("cfr.etsapp.manage.utils.DataManager");
			jQuery.sap.require("sap.ui.model.odata.datajs");
			jQuery.sap.require("sap.m.MessageToast");
			jQuery.sap.require("sap.ca.ui.message.message");
			jQuery.sap.require("sap.ui.base.EventProvider");
			jQuery.sap.require("cfr.etsapp.manage.utils.InitialConfigHelper");
			jQuery.sap.require("sap.m.MessageBox");
			sap.ui.base.EventProvider.extend("cfr.etsapp.manage.Service", {
				metadata: {
					publicMethods: ["getModel", "getGeneralParameters", "getSpendingDataByHierarhyNodesAndPeriod",
						"getGenericLineItemsByHierNodesAndPeriod", "getTrendDataByHierarchyNodes", "setBundle"
					]
				},
				constructor: function() {
					this._nCounter = 0;
					this._busyDialog = new sap.m.BusyDialog();
				},
				_initialize: function(a) {
					if (!this.oApplication) {
						this.oApplication = a.oApplicationFacade.oApplicationImplementation;
						this.oConfiguration = a.oConfiguration;
						this.oConnectionManager = a.oApplication.getConnectionManager();
					}
					if (!this.oBundle) {
						this.oBundle = a.oApplicationFacade.oApplicationImplementation.getResourceBundle();
					}
					this.oConfiguration.setResourceBundle(this.oBundle);
					this.oDataModel = this.oConnectionManager.getModel();
					this.oDataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
				},
				processError: function(E) {
					var m = "";
					var a = "";
					if (E.response) {
						var b = E.response.body;
						try {
							b = JSON.parse(b);
							if (b.error.innererror && b.error.innererror.errordetails) {
								var c = b.error.innererror.errordetails;
								for (var i = 0; i < c.length; i++) {
									if (c[i].code.match("/IWBEP")) {
										continue;
									}
									a += c[i].code + " : " + c[i].message + "\n";
								}
							}
							if (a === "") {
								a = b.error.code + " : " + b.error.message.value;
							}
							m = b.error.message.value;
						} catch (e) {
							jQuery.sap.log.warning("Could parse the response", ["parseError"], ["cfr.etsapp.manage"]);
						}
					}
					if (m === "") {
						m = this.oBundle.getText("INTERNAL_ERROR");
					}
					if (a === "") {
						a = this.oBundle.getText("INTERNAL_ERROR_BODY");
					}
					var M = {
						message: m,
						details: a,
						type: sap.m.MessageBox.Icon.ERROR
					};
					try {
						sap.m.MessageBox.show(M.message, {
							icon: M.type,
							title: this.oBundle.getText("ERROR"),
							actions: [sap.m.MessageBox.Action.OK],
							details: M.details,
							onClose: function(A) {}
						});
					} catch (o) {
						M.type = sap.ca.ui.message.Type.ERROR;
						sap.ca.ui.message.showMessageBox({
							type: sap.ca.ui.message.Type.ERROR,
							message: M.message,
							details: M.details
						});
					}
				},
				getPersonellAssignments: function(a, s) {
					var b = this;
					this._initialize(a);
					this.oDataModel.read("/ConcurrentEmploymentSet", null, [], true, function(d) {
						s(d.results);
					}, function(e) {
						b.processError(e);
					});
				},
				getWorkDays: function(a, p, b, e, s) {
					var c = this;
					this._initialize(a);
					this.oDataModel.read("/WorkCalendars", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e +
						"'"
					], true, function(d) {
						s(d.results);
					}, function(E) {
						c.processError(E);
					});
				},
				getFavorites: function(a, p, s) {
					this.showBusy();
					var b = this;
					this._initialize(a);
					this.oDataModel.read("/Favorites", null, ["$filter=Pernr eq '" + p + "'"], true, function(d) {
						b.hideBusy();
						s(d.results);
					}, function(e) {
						b.hideBusy(true);
						b.processError(e);
					});
				},
				createFavorite: function(a, f, s) {
					this.showBusy();
					var b = this;
					this._initialize(a);
					this.oDataModel.create("/Favorites", f, null, function(d) {
						b.hideBusy();
						var t = b.oBundle.getText("FAVORITE_SUBMIT_SUCCESS");
						sap.m.MessageToast.show(t, {
							duration: 3000
						});
						s(d);
					}, function(e) {
						b.processError(e);
						b.hideBusy();
					});
				},
				updateFavorite: function(a, f, s) {
					this.showBusy();
					var b = this;
					this._initialize(a);
					var p = "/Favorites(ID='" + f.ID.trim() + "',Pernr='" + f.Pernr + "')";
					this.oDataModel.update(p, f, null, function(d) {
						b.hideBusy();
						var t = b.oBundle.getText("FAVORITE_UPDATE_SUCCESS");
						sap.m.MessageToast.show(t, {
							duration: 3000
						});
						s(d);
					}, function(e) {
						b.processError(e);
						b.hideBusy();
					});
				},
				deleteFavorite: function(a, f, s) {
					var b = this;
					this._initialize(a);
					var p = "/Favorites(ID='" + f.ID.trim() + "',Pernr='" + f.Pernr + "')";
					this.oDataModel.remove(p, null, function(d) {
						b.hideBusy();
						var t = b.oBundle.getText("FAVORITE_DELETE_SUCCESS");
						sap.m.MessageToast.show(t, {
							duration: 3000
						});
						s(d);
					}, function(e) {
						b.processError(e);
						b.hideBusy();
					});
				},
				getTimeDataList: function(a, p, b, e, s) {
					this.showBusy();
					var c = this;
					this._initialize(a);
					this.oDataModel.read("/TimeDataList", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e +
						"'"
					], true, function(d) {
						for (var i = 0; i < d.results.length; i++) {
							d.results[i].Level = d.results[i].Level.toString().trim();
						}
						c.hideBusy();
						s(d.results);
					}, function(E) {
						c.hideBusy(true);
						c.processError(E);
					});
				},
				getWorkListCollection: function(a, p, b, e, s) {
					this.showBusy();
					var c = this;
					this._initialize(a);
					this.oDataModel.read("/WorkListCollection", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" +
						e + "'"
					], true, function(d) {
						c.hideBusy();
						s(d.results);
					}, function(E) {
						c.hideBusy(true);
						c.processError(E);
					});
				},
				getProfileFields: function(a, p, s) {
					this.showBusy();
					var b = this;
					this._initialize(a);
					this.oDataModel.read("/ProfileFields", null, ["$filter=Pernr eq '" + p + "'"], true, function(d) {
						b.hideBusy();
						s(d.results);
					}, function(e) {
						b.hideBusy(true);
						b.processError(e);
					});
				},
				getValueHelpList: function(p, f, t, s, a, b, c, e, S) {
					this.showBusy();
					var d = this;
					var q = ["$filter=Pernr eq '" + p + "' and FieldName eq '" + f + "'"];
					q[0] += " and StartDate eq '" + encodeURIComponent(c) + "'" + " and EndDate eq '" + encodeURIComponent(e) + "' ";
					if (a) {
						q[0] += "and substringof('" + encodeURIComponent(a) + "',FieldValue)";
					}
					if (b) {
						q[0] += "and FieldRelated eq '" + encodeURIComponent(b) + "'";
					}
					q[0] += "&$top=" + t + "&$skip=" + s;
					this._initialize();
					this.oDataModel.read("/ValueHelpList", null, q, true, function(D) {
						d.hideBusy();
						S(D.results);
					}, function(E) {
						d.hideBusy(true);
						d.processError(E);
					});
				},
				getInitialInfos: function(a, p, b, e) {
					this._initialize(a);
					var s = this;
					this.oDataModel.read("/InitialInfos", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e +
						"'"
					], false, function(d) {
						s.oConfiguration.setInitialInfoModel(d.results[0]);
					}, function(E) {
						s.processError(E);
					});
				},
				submitTimeEntry: function(a, t, b, c, s, f) {
					this.showBusy();
					this._initialize(a);
					var g = this;
					var h = t.concat(b);
					var k = h.concat(c);
					var l = this.oDataModel;
					this.errors = [];
					this.responseData = [];
					l.refreshSecurityToken(function() {
						for (var i = 0; i < k.length; i++) {
							g.data = k[i];
							var n = l.createBatchOperation("/TimeEntries", "POST", g.data);
							var p = [];
							p.push(n);
							l.addBatchChangeOperations(p);
						}
						l.submitBatch(function(D) {
							var q = [],
								r = "",
								u = "",
								v = false;
							g.errors = [];
							for (i = 0; i < D.__batchResponses.length; i++) {
								u = "";
								if (D.__batchResponses[i].response) {
									var w = D.__batchResponses[i].response.body;
									try {
										w = JSON.parse(w);
										if (r === "") {
											r = w.error.message.value;
										}
										var x = w.error.innererror.errordetails;
										for (var j = 0; j < x.length; j++) {
											if (x[j].code.match("/IWBEP")) {
												continue;
											}
											u += x[j].code + ":" + x[j].message + "\n";
											if (x[j].severity === "error") {
												v = true;
											}
										}
									} catch (e) {
										jQuery.sap.log.warning("Could parse the response", ["submitTimeEntry"], ["cfr.etsapp.manage"]);
									}
									g.errors.push({
										counter: k[i].Counter,
										workdate: k[i].TimeEntryDataFields.WORKDATE,
										time: k[i].TimeEntryDataFields.CATSHOURS,
										message: u,
										messageHdr: r,
										errorFlag: v,
										body: w
									});
								} else if (D.__batchResponses[i].__changeResponses) {
									q[i] = false;
									g.responseData.push(D.__batchResponses[i].__changeResponses[0].data);
								}
							}
							g.hideBusy(true);
							g._initialize();
							var z = [];
							if (g.errors.length > 0) {
								var A = "";
								for (i = 0; i < g.errors.length; i++) {
									var B = g.errors[i].workdate;
									var y = parseInt(B.substr(0, 4), 10);
									var m = parseInt(B.substr(5, 2), 10) - 1;
									var d = parseInt(B.substr(8, 2), 10);
									var C = g.formatDateMMMDD(new Date(y, m, d, 0, 0, 0, 0));
									z.push((new Date(y, m, d, 0, 0, 0, 0)).toDateString());
									A += C + ":- \n" + g.errors[i].message + "\r\n";
								}
								var E;
								if (v) {
									E = sap.m.MessageBox.Icon.ERROR;
								} else {
									E = sap.m.MessageBox.Icon.WARNING;
								}
								if (r === "") {
									r = g.oBundle.getText("INTERNAL_ERROR");
								}
								if (g.errors.length === 1 && g.errors[0].message === "") {
									A = g.oBundle.getText("INTERNAL_ERROR_BODY");
								}
								var M = {
									message: r,
									details: A,
									type: E
								};
								try {
									if (v) {
										sap.m.MessageBox.show(M.message, {
											icon: M.type,
											title: g.oBundle.getText("ERROR"),
											actions: [sap.m.MessageBox.Action.OK],
											details: M.details
										});
									} else {
										sap.m.MessageBox.show(M.message, {
											icon: M.type,
											title: g.oBundle.getText("WARNING"),
											actions: [sap.m.MessageBox.Action.OK],
											onClose: function(F) {
												if (F === g.oBundle.getText("OK")) {
													s();
												}
											},
											details: M.details
										});
									}
									f(q, z);
								} catch (o) {
									if (E === sap.m.MessageBox.Icon.ERROR) {
										M.type = sap.ca.ui.message.Type.ERROR;
									} else {
										M.type = sap.ca.ui.message.Type.WARNING;
									}
									sap.ca.ui.message.showMessageBox({
										type: M.type,
										message: M.message,
										details: M.details
									}, f(q, z));
								}
							} else {
								s();
							}
						}, function(e) {
							g.hideBusy(true);
							g.processError(e);
						});
					}, function(e) {
						g.hideBusy(true);
						g.processError(e);
					}, true);
				},
				formatDateMMMDD: function(d) {
					var m = d.getMonth();
					var a = d.getDate();
					var b = this.oBundle.getText("MONTH_" + m) + " " + a;
					return b;
				},
				showBusy: function() {
					this._nCounter++;
					if (this._nCounter === 1) {
						this._busyDialog.open();
					}
				},
				hideBusy: function(f) {
					if (this._nCounter === 0) {
						return;
					}
					this._nCounter = f ? 0 : Math.max(0, this._nCounter - 1);
					if (this._nCounter > 0) {
						return;
					}
					this._busyDialog.close();
				}
			});
		},
		"cfr/etsapp/utils/InitialConfigHelper.js": function() {
			jQuery.sap.declare("cfr.etsapp.manage.utils.InitialConfigHelper");
			jQuery.sap.require("cfr.etsapp.manage.utils.DataManager");
			cfr.etsapp.manage.Configuration.extend("cfr.etsapp.manage.utils.InitialConfigHelper", {
				getText: function(k, p) {
					return this.oBundle.getText(k, p);
				},
				getInitialInfoModel: function() {
					return this.initialInfoModel;
				},
				setInitialInfoModel: function(i) {
					this.initialInfoModel = i;
				},
				setResourceBundle: function(r) {
					this.oBundle = r;
				}
			});
		},
		"cfr/etsapp/view/S3.controller.js": function() {
			jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
			jQuery.sap.require("cfr.etsapp.manage.utils.DataManager");
			jQuery.sap.require("cfr.etsapp.manage.utils.ConcurrentEmployment");
			jQuery.sap.require("cfr.etsapp.manage.model.TimeEntry");
			jQuery.sap.require("sap.ca.ui.dialog.factory");
			jQuery.sap.require("sap.ca.ui.dialog.Dialog");
			jQuery.sap.require("sap.ca.ui.message.message");
			jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
			jQuery.sap.require("cfr.etsapp.manage.utils.InitialConfigHelper");
			jQuery.sap.require("sap.ca.ui.model.type.Number");
			sap.ca.scfld.md.controller.BaseFullscreenController.extend("cfr.etsapp.manage.view.S3", {
				extHookChangeHeaderFooterOptions: null,
				extHookAlterColumns: null,
				extHookChangeObjectBeforePost: null,
				extHookChangeFormatTime: null,
				onInit: function() {
					sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
					this.oApplication = this.oApplicationFacade.oApplicationImplementation;
					this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
					this.oConfiguration = new cfr.etsapp.manage.utils.InitialConfigHelper();
					this.oConfiguration.setResourceBundle(this.oBundle);
					if (!this.oService) {
						this.oService = new cfr.etsapp.manage.Service();
					}
					var s = this;
					sap.ui.Device.orientation.attachHandler(function(e) {
						if (e.landscape) {
							if (sap.ui.Device.system.phone) {
								s.byId("MTS3_SUMMARY_GRID").setDefaultSpan("L6 M12 S12");
								s.byId("MTS3_SUMMARY_GRID").rerender();
							}
						}
					});
					this.oRouter.attachRouteMatched(function(e) {
						if (e.getParameter("name") === "S3") {
							if (s.oApplication.pernr) {
								s.initializeView();
								s.updateData();
							}
						}
					});
				},
				onAfterRendering: function() {
					var s = this;
					if (!this.oApplication.pernr) {
						try {
							var c = sap.ui.core.Component.getOwnerIdFor(this.getView());
							var S = sap.ui.component(c).getComponentData().startupParameters;
							this.oApplication.pernr = S.pernr[0];
							this.initializeView();
							this.initializeTable();
							this.updateData();
						} catch (o) {
							cfr.etsapp.manage.utils.ConcurrentEmployment.getCEEnablement(this, function() {
								s.initializeView();
								s.initializeTable();
								s.updateData();
							});
						}
					}
				},
				initializeView: function() {
					var c = new Date();
					var m;
					var s = this.oApplication.getModel("S3exchangeModel");
					if (s) {
						m = this.setInitialInfoModelData(s.getProperty("/currentDate"));
						this.oApplication.setModel(null, "S3exchangeModel");
					} else {
						m = this.setInitialInfoModelData(c);
					}
					this.getView().setModel(m);
					this.byId("WEEKLY_CALENDAR").setModel(m);
					this.calendarModel = m;
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
					this.setBtnText("copyBtn", this.oApplicationFacade.getResourceBundle().getText("COPY"));
					this.setBtnEnabled("copyBtn", false);
					this.checkboxList = [];
					var S = new sap.ui.model.json.JSONModel();
					this.oApplication.setModel(S, "S31modelexch");
				},
				setInitialInfoModelData: function(c) {
					var m = new sap.ui.model.json.JSONModel({
						phone: sap.ui.Device.system.phone
					});
					var n = 13;
					if (sap.ui.Device.system.phone) {
						n = 6;
						this.byId("WEEKLY_CALENDAR").setWeeksPerRow(1);
						this.byId("MTS3_SECOND_INFO").setVisible(false);
						this.byId("MTS3_SUMMARY_GRID").rerender();
					}
					var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(),
						c.getDay()));
					var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + n);
					this.oApplication.setModel(m, "TSM_WEEKLY");
					this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(c), this.getDateStr(c));
					m.setProperty("/showSubmit", false);
					m.setProperty("/selected", this.getDateStr(c));
					m.setProperty("/selectedDate", c);
					m.setProperty("/year", c.getFullYear());
					m.setProperty("/start", this.getDateStr(c));
					m.setProperty("/weekStart", this.getDateStr(f));
					m.setProperty("/weekEnd", this.getDateStr(l));
					var I = this.oConfiguration.getInitialInfoModel();
					this.releaseAllowed = I.ReleaseDirectly === "TRUE";
					m.setProperty("/releaseAllowed", this.releaseAllowed);
					this.releaseFuture = (I.ReleaseFuture === "TRUE");
					m.setProperty("/releaseFuture", this.releaseFuture);
					m.setProperty("/favoriteAvailable", I.FavoriteAvailable);
					this.FavoriteAvailable = I.FavoriteAvailable;
					this.setBtnEnabled("SUBMIT_BTN", false);
					this.clockEntry = (I.ClockEntry === "TRUE");
					m.setProperty("/clockEntry", this.clockEntry);
					this.withTargetHours = I.WithTargetHours;
					return m;
				},
				setWeekOverviews: function(n) {
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var w = m.getProperty("/days");
					var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
					var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(),
						c.getDay()));
					var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (7 * n - 1));
					m.setProperty("/weekStart", this.getDateStr(f));
					m.setProperty("/weekEnd", this.getDateStr(l));
					var a = f.getTime();
					var b, s, i, t, r, d;
					var e, g, h, j, k, o, p, q, u;
					h = [];
					h[0] = this.formatDateMMMDD(f);
					if (n === 1) {
						h[1] = this.formatDateMMMDD(l);
						g = this.oBundle.getText("WEEK_DATE_RANGE", [h[0], h[1]]);
						this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(g);
						j = 0;
						k = 0;
						o = 0;
						t = 0;
						q = [];
						for (i = 0; i < w.length; i++) {
							j += w[i].targetHours;
							k += w[i].recordedHours;
							o += w[i].approvedHours;
							if (w[i].entries.length) {
								q = this.pushUniqueElements(w[i].entries, q);
							}
						}
						t = q.length;
						if (j !== 0) {
							j = this.formatTime(j.toFixed(2));
						}
						if (k !== 0) {
							k = this.formatTime(k.toFixed(2));
						}
						if (o !== 0) {
							o = this.formatTime(o.toFixed(2));
						}
						if (k !== 0) {
							r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k]);
						} else {
							r = this.oBundle.getText("NO_RECORDING");
						}
						if (t === 1) {
							d = this.oBundle.getText("TOTAL_ASSIGNMENT");
						} else if (t === 0) {
							d = this.oBundle.getText("NO_ASSIGNMENT");
						} else {
							d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t]);
						}
						if (o === 0) {
							p = " ";
						} else {
							p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o]);
						}
						if (j !== 0 && this.withTargetHours) {
							e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j]);
						} else {
							e = "  ";
						}
						this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(r);
						this.byId("MTS3_TARGET_TIME_1").setText(e);
						this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(d);
						this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(p);
					} else {
						b = a + ((7 * 1 - 1) * 24 * 60 * 60 * 1000);
						b = new Date(b);
						s = a + 7 * 24 * 60 * 60 * 1000;
						s = new Date(s);
						f.setHours(0, 0, 0, 0);
						b.setHours(0, 0, 0, 0);
						s.setHours(0, 0, 0, 0);
						l.setHours(0, 0, 0, 0);
						h[1] = this.formatDateMMMDD(b);
						g = this.oBundle.getText("WEEK_DATE_RANGE", [h[0], h[1]]);
						this.byId("MTS3_CURRENT_WEEK_INFO_1").setTitle(g);
						h[2] = this.formatDateMMMDD(s);
						h[3] = this.formatDateMMMDD(l);
						g = this.oBundle.getText("WEEK_DATE_RANGE", [h[2], h[3]]);
						this.byId("MTS3_CURRENT_WEEK_INFO_2").setTitle(g);
						j = [0, 0];
						k = [0, 0];
						o = [0, 0];
						t = [0, 0];
						q = [];
						u = [];
						for (i = 0; i < w.length; i++) {
							if (w[i].date.getTime() < s.getTime()) {
								j[0] += w[i].targetHours;
								k[0] += w[i].recordedHours;
								o[0] += w[i].approvedHours;
								if (w[i].entries.length) {
									q = this.pushUniqueElements(w[i].entries, q);
								}
							} else {
								j[1] += w[i].targetHours;
								k[1] += w[i].recordedHours;
								o[1] += w[i].approvedHours;
								if (w[i].entries.length) {
									u = this.pushUniqueElements(w[i].entries, u);
								}
							}
						}
						t[0] = q.length;
						t[1] = u.length;
						for (i = 0; i < 2; i++) {
							if (j[i] !== 0) {
								j[i] = this.formatTime(j[i].toFixed(2));
							}
							if (k[i] !== 0) {
								k[i] = this.formatTime(k[i].toFixed(2));
							}
							if (o[i] !== 0) {
								o[i] = this.formatTime(o[i].toFixed(2));
							}
						}
						if (k[0] !== 0) {
							if (k[0] === "01:00") {
								r = this.oBundle.getText("TOTAL_RECORDED_HOUR", [k[0]]);
							} else {
								r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k[0]]);
							}
						} else {
							r = this.oBundle.getText("NO_RECORDING");
						}
						if (t[0] === 1) {
							d = this.oBundle.getText("TOTAL_ASSIGNMENT");
						} else if (t[0] === 0) {
							d = this.oBundle.getText("NO_ASSIGNMENT");
						} else {
							d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t[0]]);
						}
						if (o[0] === 0) {
							p = " ";
						} else {
							p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o[0]]);
						}
						if (j[0] !== 0 && this.withTargetHours) {
							e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j[0]]);
						} else {
							e = "  ";
						}
						this.byId("MTS3_CURRENT_WEEK_INFO_1").setNumber(r);
						this.byId("MTS3_TARGET_TIME_1").setText(e);
						this.byId("MTS3_TXT_ASSIGNMENTS_1").setText(d);
						this.byId("MTS3_TXT_APPROVED_HOURS_1").setText(p);
						if (k[1] !== 0) {
							if (k[1] === "01:00") {
								r = this.oBundle.getText("TOTAL_RECORDED_HOUR", [k[1]]);
							} else {
								r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [k[1]]);
							}
						} else {
							r = this.oBundle.getText("NO_RECORDING");
						}
						if (t[1] === 1) {
							d = this.oBundle.getText("TOTAL_ASSIGNMENT");
						} else if (t[1] === 0) {
							d = this.oBundle.getText("NO_ASSIGNMENT");
						} else {
							d = this.oBundle.getText("TOTAL_ASSIGNMENTS", [t[1]]);
						}
						if (o[1] === 0) {
							p = " ";
						} else {
							p = this.oBundle.getText("TOTAL_APPROVED_HOURS", [o[1]]);
						}
						if (j[1] !== 0 && this.withTargetHours) {
							e = this.oBundle.getText("TOTAL_TARGET_HOURS", [j[1]]);
						} else {
							e = "  ";
						}
						this.byId("MTS3_CURRENT_WEEK_INFO_2").setNumber(r);
						this.byId("MTS3_TARGET_TIME_2").setText(e);
						this.byId("MTS3_TXT_ASSIGNMENTS_2").setText(d);
						this.byId("MTS3_TXT_APPROVED_HOURS_2").setText(p);
					}
				},
				getActualOffset: function(f, c) {
					var a = 7;
					if (f > c) {
						return c + a - f;
					} else {
						return c - f;
					}
				},
				pushUniqueElements: function(e, a) {
					if (!e) {
						return null;
					}
					for (var j = 0; j < e.length; j++) {
						var s = e[j].mainName + ":" + e[j].mainCode + ",";
						for (var i = 0; typeof(e[j].childNames) !== "undefined" && i < e[j].childNames.length; i++) {
							s += e[j].childNames[i] + ":" + e[j].childCodes[i] + ",";
						}
						if (a.length) {
							for (i = 0; i < a.length; i++) {
								if (s === a[i]) {
									break;
								}
							}
							if (i === a.length) {
								a.push(s);
							}
						} else {
							a.push(s);
						}
					}
					return a;
				},
				formatDateMMMDD: function(d) {
					var m = d.getMonth();
					var a = d.getDate();
					var b = this.oBundle.getText("MONTH_" + m) + " " + a;
					return b;
				},
				formatTime: function(t) {
					var a;
					if (this.extHookChangeFormatTime) {
						a = extHookChangeFormatTime(t);
					} else {
						var b = t * 60;
						var h = Math.floor(b / 60).toString();
						if (h.length === 1) {
							h = "0" + h;
						}
						var m = (b % 60).toFixed(0);
						if (m.length === 1) {
							m = "0" + m;
						}
						a = h + ":" + m;
					}
					return a;
				},
				parseDateYYYYMMdd: function(d) {
					var a = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});
					return a.parse(d);
				},
				formatDateYYYYMMdd: function(d) {
					if (typeof d === "string") {
						d = new Date(d);
					}
					var a = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});
					return a.format(d);
				},
				getPostData: function(d, e) {
					var p = {};
					p.day = d;
					p.entry = e;
					return p;
				},
				openConfirmationPopup: function(s, a) {
					var b = this;
					var e = [];
					for (var i = 0; i < s.additionalInformation.length; i++) {
						e.push(new sap.m.Label({
							text: s.additionalInformation[i].label,
							design: "Bold"
						}));
						e.push(new sap.m.Text({
							text: s.additionalInformation[i].text
						}));
					}
					var f = new sap.ui.layout.form.SimpleForm({
						minWidth: 1024,
						editable: false,
						maxContainerCols: 2,
						layout: "ResponsiveGridLayout",
						labelSpanL: 7,
						labelSpanM: 7,
						labelSpanS: 7,
						emptySpanL: 1,
						emptySpanM: 1,
						emptySpanS: 1,
						columnsL: 1,
						columnsM: 1,
						columnsS: 1,
						content: e
					});
					var c = new sap.m.Dialog({
						title: s.title,
						content: [f],
						beginButton: new sap.m.Button({
							text: s.confirmButtonLabel,
							press: function() {
								b.submitTime(a);
								c.close();
							}
						}),
						endButton: new sap.m.Button({
							text: this.oBundle.getText("CANCEL"),
							press: function() {
								c.close();
							}
						})
					});
					c.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
					c.open();
				},
				releaseEntriesSummary: function(u) {
					var t = this.byId("ENTRY_LIST_CONTENTS");
					var s = t.getSelectedItems();
					var d = 0,
						a = 0,
						b = 0,
						n = 0;
					var c, e, f, g, h = new Date();
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var p = m.getData();
					for (var i = 0; i < s.length; i++) {
						if (!s[i].data().header) {
							c = s[i].data().day;
							e = s[i].data().entry;
							f = p.days[c].entries[e];
							g = s[i].data().dateSelected;
							if (!f) {
								continue;
							}
							if (f.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(g, h))) {
								if (u) {
									this.updatePageData(false, c, f, true);
								}
								d += f.hours;
								a += f.minutes;
								b += f.time;
								b = parseFloat(b.toFixed(2));
								n++;
							}
							if (a > 59) {
								a -= 60;
								d++;
							}
						}
					}
					var r = [];
					if (this.clockEntry) {
						b = d;
						b += (a / 60);
						b = parseFloat(b.toFixed(2));
					}
					r.push(n);
					r.push(d);
					r.push(a);
					r.push(b);
					return r;
				},
				onSubmit: function() {
					var r = [];
					var s = null,
						t;
					r = this.releaseEntriesSummary(false);
					t = this.formatTime(r[3].toString());
					if (!this.clockEntry) {
						var a = this.oBundle.getText("TOTAL_DURATION");
						s = {
							question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
							additionalInformation: [{
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
								text: r[0].toString()
							}, {
								label: a,
								text: t
							}],
							showNote: false,
							title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					} else {
						s = {
							question: this.oBundle.getText("SUBMISSION_CONFIRMATION_SUMMARY"),
							additionalInformation: [{
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
								text: this.formatTime(r[0].toString())
							}, {
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
								text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [r[1], r[2]])
							}],
							showNote: false,
							title: this.oConfiguration.getText("SUBMISSION_CONFIRMATION"),
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					}
					this.openConfirmationPopup(s, true);
				},
				submitTime: function(s) {
					var a = this;
					if (s) {
						this.releaseEntriesSummary(true);
					}
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var n = m.getData().days;
					this.errors = null;
					var u = [];
					var d = [];
					for (var i = 0; i < n.length; i++) {
						for (var j = 0; j < n[i].entries.length; j++) {
							if (n[i].entries[j].deleted && (n[i].entries[j].counter !== "" || n[i].entries[j].counter === null)) {
								d.push(this.getPostData(this.getDateTimeStr(n[i].date), n[i].entries[j]));
							} else {
								if (this.oldDays[i]) {
									for (var k = 0; k < this.oldDays[i].entries.length; k++) {
										if (n[i].entries[j].counter === this.oldDays[i].entries[k].counter && n[i].entries[j].counter !== "") {
											var b = n[i].entries[j];
											var c = this.oldDays[i].entries[k];
											if (b.time !== c.time || b.notes !== c.notes || b.mainItem !== c.mainItem || b.subItems !== c.subItems || b.hours !== c.hours ||
												b.minutes !== c.minutes || b.startTime !== c.startTime || b.endTime !== c.endTime) {
												if (!n[i].entries[j].deleted) {
													u.push(this.getPostData(this.getDateTimeStr(n[i].date), n[i].entries[j]));
												}
											}
										}
									}
								}
							}
							if (n[i].entries[j].statusId === "MSAVE" && n[i].entries[j].bToBeReleased) {
								u.push(this.getPostData(this.getDateTimeStr(n[i].date), n[i].entries[j]));
							}
						}
					}
					var e = [];
					var f = [];
					if (u.length !== 0) {
						for (i = 0; i < u.length; i++) {
							u[i].entry = this.replaceSpecialChar(u[i].entry);
							e.push(a.setPostObject(u[i].entry.counter, "U", u[i].day, u[i].entry.time, u[i].entry.mainName, u[i].entry.mainCode, u[i].entry
								.notes, u[i].entry.startTime, u[i].entry.endTime, u[i].entry.subItems, u[i].entry.childCodes, u[i].entry.childNames));
						}
					}
					if (d.length !== 0) {
						for (i = 0; i < d.length; i++) {
							d[i].entry = this.replaceSpecialChar(d[i].entry);
							f.push(a.setPostObject(d[i].entry.counter, "D", d[i].day, d[i].entry.time, d[i].entry.mainName, d[i].entry.mainCode, d[i].entry
								.notes, d[i].entry.startTime, d[i].entry.endTime, d[i].entry.subItems, d[i].entry.childCodes, d[i].entry.childNames));
						}
					}
					if (e.length === 0 && f.length === 0) {
						sap.m.MessageToast.show(a.oConfiguration.getText("SUBMIT_SUCCESS"));
					} else {
						a.oService.submitTimeEntry(a, [], e, f, function() {
							if (f.length !== 0) {
								sap.m.MessageToast.show(a.oConfiguration.getText("DELETE_SUCCESS"));
							} else {
								sap.m.MessageToast.show(a.oConfiguration.getText("SUBMIT_SUCCESS"));
							}
							if (!a.errors) {
								a.updateData();
							}
						}, function(h, g) {
							a.updateData();
						});
					}
				},
				setPostObject: function(C, T, W, a, N, b, n, s, e, c, d, f) {
					var t = {
						Counter: C,
						TimeEntryOperation: T,
						TimeEntryDataFields: {
							WORKDATE: W,
							CATSAMOUNT: "" + a,
							BEGUZ: s,
							ENDUZ: e
						}
					};
					if (T !== "D") {
						t.TimeEntryRelease = "X";
					}
					if (this.checkFieldName(N) === true) {
						t.TimeEntryDataFields[N] = b;
					}
					if (c && c !== "") {
						for (var i = 0; i < f.length; i++) {
							if (this.checkFieldName(f[i]) === true) {
								t.TimeEntryDataFields[f[i]] = d[i];
							}
						}
					}
					if (n && n !== "") {
						t.TimeEntryDataFields.LONGTEXT_DATA = n;
						t.TimeEntryDataFields.LONGTEXT = "X";
					}
					if (this.extHookChangeObjectBeforePost) {
						t = this.extHookChangeObjectBeforePost(t);
					}
					return t;
				},
				checkDate: function(d, c) {
					if (d.getFullYear() >= c.getFullYear() && d.getMonth() >= c.getMonth() && d.getDate() > c.getDate()) {
						return true;
					}
					return false;
				},
				checkFieldName: function(f) {
					var c = f;
					if (c.match("DISPTEXT")) {
						return false;
					}
					if (c.match("CPR_OBJTEXT")) {
						return false;
					}
					if (c.match("CPR_TEXT")) {
						return false;
					}
					return true;
				},
				replaceAllOccurances: function(s) {
					if (typeof s === "undefined") {
						return null;
					}
					var S = "/";
					var r = "-";
					while (s.indexOf(S) > -1) {
						s = s.replace(S, r);
					}
					return s;
				},
				replaceSpecialChar: function(e) {
					if (typeof e.mainName !== "undefined") {
						e.mainName = this.replaceAllOccurances(e.mainName);
					}
					if (typeof e.subItems !== "undefined") {
						e.subItems = this.replaceAllOccurances(e.subItems);
					}
					if (typeof e.childNames !== "undefined") {
						for (var i = 0; i < e.childNames.length; i++) {
							e.childNames[i] = this.replaceAllOccurances(e.childNames[i]);
						}
					}
					return e;
				},
				onCopy: function() {
					var m, p, v;
					var d;
					var e;
					var t = this.byId("ENTRY_LIST_CONTENTS");
					var s = [];
					s = t.getSelectedItems();
					d = s[0].data().day;
					e = s[0].data().entry;
					m = this.oApplication.getModel("TSM_WEEKLY");
					p = m.getData();
					p.days[d].entries[e].counter = "";
					v = {
						entry: p.days[d].entries[e],
						pageData: p,
						dayIndex: d,
						entryIndex: e
					};
					this.oApplication.getModel("S31modelexch").setProperty("/editeddata", v);
					this.oApplication.getModel("S31modelexch").setProperty("/copySelected", true);
					this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", []);
					this.oRouter.navTo("S31", {
						context: m.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
					}, true);
				},
				onItemSelectGotoEdit: function(e) {
					var i = e.getSource();
					var a = i.data();
					var m, p, v;
					var d = a.day;
					var b = a.entry;
					m = this.oApplication.getModel("TSM_WEEKLY");
					p = m.getData();
					v = {
						entry: p.days[d].entries[b],
						pageData: p,
						dayIndex: d,
						entryIndex: b
					};
					this.oApplication.getModel("S31modelexch").setProperty("/editeddata", v);
					this.oApplication.getModel("S31modelexch").setProperty("/editentryview", true);
					this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", [a.dateSelected]);
					this.oRouter.navTo("S31", {
						context: m.getProperty("/selectedDate").toDateString() + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
					}, true);
				},
				onItemSelect: function(e) {
					this.selectDateOnAllCheckBoxSelection(e.getSource());
					if (e.getSource().getSelectedItems().length === 0) {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
						this.setBtnEnabled("deleteBtn", false);
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
						this.setBtnEnabled("SUBMIT_BTN", false);
						this.setBtnEnabled("copyBtn", false);
					} else {
						var s = e.getSource().getSelectedItems();
						var a;
						for (var i = 0; i < s.length; i++) {
							a = s[i].data().header;
							if (!a) {
								this.findCount(e);
							}
						}
					}
				},
				findCount: function(e) {
					var s = e.getSource().getSelectedItems();
					var a, b, c = new Date(),
						d, f, g;
					var h = 0,
						j = 0;
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var p = m.getData();
					for (var i = 0; i < s.length; i++) {
						a = s[i].data().header;
						b = s[i].data().dateSelected;
						if (!a) {
							h++;
							d = s[i].data().day;
							f = s[i].data().entry;
							g = p.days[d].entries[f];
							if (g.statusId === "MSAVE" && !(!this.releaseFuture && this.checkDate(b, c))) {
								j++;
							}
						}
					}
					if (j === 0) {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
						this.setBtnEnabled("SUBMIT_BTN", false);
					} else {
						this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + j + ")");
						this.setBtnEnabled("SUBMIT_BTN", true);
					}
					if (h === 0) {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
						this.setBtnEnabled("deleteBtn", false);
					} else {
						this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + h + ")");
						this.setBtnEnabled("deleteBtn", true);
					}
					if (h === 1 && e.getSource().getSelectedItems().length === 1) {
						this.setBtnEnabled("copyBtn", true);
					} else {
						this.setBtnEnabled("copyBtn", false);
					}
				},
				onSelect: function(e) {
					var s = new Date(e.getParameter("date"));
					var d = e.getParameter("didSelect");
					this.selectDate(s, d);
				},
				scrollTo: function(i) {
					var l = this.byId("ENTRY_LIST_CONTENTS");
					var a = l.getItems()[i];
					var s = a.$().get(0).offsetTop;
					this.byId("scroller").scrollTo(0, s, 500);
				},
				compareDays: function(a, b) {
					if (parseInt(a.dateStr, 10) > parseInt(b.dateStr, 10)) {
						return 1;
					} else {
						return -1;
					}
				},
				selectDate: function(s, a) {
					var d = s.toDateString();
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var b = 0;
					m.setProperty("/selected", d);
					if (this.entryListContents) {
						var c = this.entryListContents.getItems();
						var e;
						for (var i = 0; i < c.length; i++) {
							e = c[i].data();
							if (e.dateSelected.toDateString() === d && !e.header) {
								c[i].setSelected(a);
								b = i;
							}
						}
						var f = this.byId("ENTRY_LIST_CONTENTS").getSelectedItems();
						if (f.length === 0) {
							this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
							this.setBtnEnabled("deleteBtn", false);
						} else {
							this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE") + "(" + f.length + ")");
							this.setBtnEnabled("deleteBtn", true);
						}
						var r = this.releaseEntriesSummary(false);
						if (r[0] === 0) {
							this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
							this.setBtnEnabled("SUBMIT_BTN", false);
						} else {
							this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT") + "(" + r[0] + ")");
							this.setBtnEnabled("SUBMIT_BTN", true);
						}
						if (f.length === 1) {
							this.setBtnEnabled("copyBtn", true);
						} else {
							this.setBtnEnabled("copyBtn", false);
						}
						if (a && b !== 0) {
							this.scrollTo(b);
						}
					}
				},
				updateData: function() {
					var n;
					var m = this.oApplication.getModel("TSM_WEEKLY");
					m.setProperty("/red", "");
					m.setProperty("/green", "");
					m.setProperty("/grey", "");
					m.setProperty("/yellow", "");
					m.setProperty("/rejected", "");
					var w = this.byId("WEEKLY_CALENDAR");
					w.removeTypesOfAllDates();
					w.unselectAllDates();
					m.setProperty("/activities", null);
					m.setProperty("/workingDayList", null);
					var s = this;
					var I = this.oConfiguration.getInitialInfoModel();
					if (sap.ui.Device.system.phone) {
						n = 1;
					} else {
						n = 2;
					}
					var c = new Date(this.byId("WEEKLY_CALENDAR").getCurrentDate());
					var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(new Date(I.StartDate.substring(0, 4) + "/" +
						I.StartDate.substring(4, 6) + "/" + I.StartDate.substring(6, 8)).getDay(), c.getDay()));
					var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + (7 * n - 1));
					this.oService.getWorkDays(this, this.oApplication.pernr, this.getDateStr(f), this.getDateStr(l), function(d) {
						s.getTimeSheetCalendar(d);
						if (m.getData().activities) {
							s.setWeeklyData(m.getData().activities);
						}
					});
					this.oService.getTimeDataList(this, this.oApplication.pernr, this.getDateStr(f), this.getDateStr(l), function(d) {
						m.setProperty("/activities", d);
						if (m.getData().workingDayList) {
							s.setWeeklyData(d);
						}
					});
					this.setBtnText("deleteBtn", s.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
					this.setBtnText("SUBMIT_BTN", s.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
					this.setBtnEnabled("copyBtn", false);
				},
				getTimeSheetCalendar: function(d) {
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var n = new Date(),
						g = [],
						y = [],
						a = [],
						b = [],
						r = [];
					var c = m.getData().selected,
						f = null,
						e = [],
						h = [];
					var j = false;
					var w = [];
					var k = -1;
					if (d.length > 0) {
						var l = d[0].FirstDayOfWeek;
						if (l === null) {
							k = -1;
						} else if (l === "MONDAY") {
							k = 1;
						} else if (l === "TUESDAY") {
							k = 2;
						} else if (l === "WEDNESDAY") {
							k = 3;
						} else if (l === "THURSDAY") {
							k = 4;
						} else if (l === "FRIDAY") {
							k = 5;
						} else if (l === "SATURDAY") {
							k = 6;
						} else if (l === "SUNDAY") {
							k = 0;
						}
					}
					for (var i = 0; i < d.length; i++) {
						var o = d[i].Date;
						var p = d[i].WorkingDay === "TRUE";
						var q = new Date(parseInt(o.substring(0, 4), 10), parseInt(o.substring(4, 6), 10) - 1, parseInt(o.substring(6, 8), 10));
						w.push({
							date: o,
							workingDay: p,
							targetHours: parseFloat(d[i].TargetHours.trim()),
							startTime: d[i].StartTime,
							endTime: d[i].EndTime
						});
						var s = d[i].Status;
						if (!p) {
							g.push(q);
						} else {
							if (!f) {
								f = o;
							}
							if (!j && c === o) {
								j = true;
							}
							if (s === "YACTION") {
								h.push(d[i].Date);
								if (n.getTime() > q.getTime()) {
									y.push(q);
								} else {
									e.push(q);
								}
							} else if (s === "MACTION") {
								b.push(q);
							} else if (s === "REJECTED") {
								r.push(q);
							} else if (s === "DONE") {
								a.push(q);
							}
						}
					}
					m.setProperty("/workingDayList", w);
					var t = this.byId("WEEKLY_CALENDAR");
					if (k > 0) {
						t.setFirstDayOffset(k);
					}
					t.toggleDatesType(e, sap.me.CalendarEventType.Type10, true);
					t.toggleDatesType(b, sap.me.CalendarEventType.Type04, true);
					t.toggleDatesType(a, sap.me.CalendarEventType.Type01, true);
					t.toggleDatesType(g, sap.me.CalendarEventType.Type00, true);
					t.toggleDatesType(y, sap.me.CalendarEventType.Type07, true);
					t.toggleDatesType(r, sap.me.CalendarEventType.Type06, true);
					var L = {
						'yellow': b,
						'green': a,
						'grey': g,
						'red': y,
						'rejected': r,
						'FutureWorkingDays': e
					};
					var u = this.byId("LEGEND");
					if (a.length > 0) {
						u.setLegendForType01(this.oBundle.getText("FILLED_DAY"));
					} else if (u.getLegendForType01()) {
						u.setLegendForType01(null);
					}
					if (b.length > 0) {
						u.setLegendForType04(this.oBundle.getText("FILLED_MANAGER"));
					} else if (u.getLegendForType04()) {
						u.setLegendForType04(null);
					}
					if (y.length > 0) {
						u.setLegendForType07(this.oBundle.getText("MISSING_DAY"));
					} else if (u.getLegendForType07()) {
						u.setLegendForType07(null);
					}
					if (r.length > 0) {
						u.setLegendForType06(this.oBundle.getText("REJECTED"));
					} else if (u.getLegendForType06()) {
						u.setLegendForType06(null);
					}
					if (e.length > 0) {
						u.setLegendForNormal(this.oBundle.getText("WORKING_DAY"));
					} else if (u.getLegendForNormal()) {
						u.setLegendForNormal(null);
					}
					if (g.length > 0) {
						u.setLegendForType00(this.oBundle.getText("NON_WORKING_DAY"));
					} else if (u.getLegendForType00()) {
						u.setLegendForType00(null);
					}
					u.setLegendForToday(this.oBundle.getText("CURRENT_DAY"));
					u.setLegendForSelected(this.oBundle.getText("SELECTED_DAY"));
					u.setLegendForSelected00(this.oBundle.getText("SELECTED_NW_DAY"));
					m = this.oApplication.getModel("TSM_WEEKLY");
					m.setProperty("/legendforS31", L);
				},
				onAddNewEntry: function() {
					var s = this.byId("WEEKLY_CALENDAR").getSelectedDates();
					var d;
					for (var i = 0; i < s.length; i++) {
						s[i] = new Date(s[i]);
					}
					d = this.byId("WEEKLY_CALENDAR").getCurrentDate();
					this.oApplication.getModel("S31modelexch").setProperty("/selectedDates", s);
					this.oApplication.getModel("S31modelexch").setProperty("/editentryview", false);
					this.oRouter.navTo("S31", {
						context: d + "offset" + this.byId("WEEKLY_CALENDAR").getFirstDayOffset()
					}, true);
				},
				onCalendarWeekChange: function(e) {
					var c = new Date(e.getParameter("currentDate"));
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var s = e.getSource().getSelectedDates();
					var n = 13;
					if (sap.ui.Device.system.phone) {
						n = 6;
					}
					var f = new Date(c.getFullYear(), c.getMonth(), c.getDate() - this.getActualOffset(this.byId("WEEKLY_CALENDAR").getFirstDayOffset(),
						c.getDay()));
					var l = new Date(f.getFullYear(), f.getMonth(), f.getDate() + n);
					m.setProperty("/showSubmit", false);
					m.setProperty("/selected", this.getDateStr(c));
					m.setProperty("/selectedDate", c);
					m.setProperty("/year", c.getFullYear());
					m.setProperty("/weekStart", this.getDateStr(f));
					m.setProperty("/weekEnd", this.getDateStr(l));
					this.setBtnEnabled("SUBMIT_BTN", false);
					this.lastSelected = m.getData().selected;
					this.updateData();
					this.calendarModel = m;
					var d, a = [];
					for (var i = 0; i < s.length; i++) {
						d = new Date(s[i]);
						if (d.getTime() >= f && d.getTime() <= l.getTime()) {
							a.push(d);
						}
					}
					if (a.length > 0) {
						e.getSource().toggleDatesSelection(a, true);
					}
					this.setBtnText("deleteBtn", this.oApplicationFacade.getResourceBundle().getText("DELETE"));
					this.setBtnEnabled("deleteBtn", false);
					this.setBtnText("SUBMIT_BTN", this.oApplicationFacade.getResourceBundle().getText("SUBMIT"));
					this.setBtnEnabled("SUBMIT_BTN", false);
					this.setBtnEnabled("copyBtn", false);
				},
				getDateStr: function(d) {
					return "" + d.getFullYear() + ("" + (d.getMonth() + 101)).substring(1) + ("" + (d.getDate() + 100)).substring(1);
				},
				getDateTimeStr: function(d) {
					return "" + d.getFullYear() + "-" + ("" + (d.getMonth() + 101)).substring(1) + "-" + ("" + (d.getDate() + 100)).substring(1) +
						"T00:00:00";
				},
				setWeeklyData: function(d) {
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var p = {
						days: []
					};
					var l = null,
						D = null,
						a;
					var r, b, i, j, h, c, e = null;
					var E = {};
					var w = m.getData().workingDayList;
					for (i = 0; i < d.length; i++) {
						if (d[i].FieldName === "WORKDATE") {
							if (e === null || d[i].FieldValue !== e) {
								e = d[i].FieldValue;
								a = new Date(parseInt(d[i].FieldValue.substring(0, 4), 10), parseInt(d[i].FieldValue.substring(4, 6), 10) - 1, parseInt(d[i].FieldValue
									.substring(6, 8), 10));
								D = {
									date: a,
									dateStr: d[i].FieldValue,
									dateFormatted: this.convertDateFormat(a),
									targetHours: this.getTargetHours(d[i].FieldValue, w),
									entries: [],
									workingDay: this.getWorkingDay(d[i].FieldValue, w)
								};
								p.days.push(D);
								l = null;
							}
						}
						if (l === null || d[i].RecordNumber !== l) {
							l = d[i].RecordNumber;
							E = new cfr.etsapp.manage.model.TimeEntry(0, "", d[i].Suggested === "TRUE", true);
							D.entries.push(E);
						}
						if (d[i].FieldName === "MEINH") {
							E.timeUnit = d[i].FieldValue;
						}
						E.setData(d[i]);
					}
					p.days.sort(this.compareDays);
					for (i = 0; i < w.length; i++) {
						if (w[i].workingDay) {
							h = false;
							c = p.days.length;
							for (j = 0; j < p.days.length; j++) {
								if (w[i].date === p.days[j].dateStr) {
									h = true;
									break;
								}
								if (w[i].date < p.days[j].dateStr) {
									c = j;
									break;
								}
							}
							if (!h) {
								a = new Date(parseInt(w[i].date.substring(0, 4), 10), parseInt(w[i].date.substring(4, 6), 10) - 1, parseInt(w[i].date.substring(
									6, 8), 10));
								D = {
									date: a,
									dateStr: w[i].date,
									dateFormatted: this.convertDateFormat(a),
									targetHours: this.getTargetHours(w[i].date, w),
									workingDay: w[i],
									entries: []
								};
								p.days.splice(c, 0, D);
							}
						}
					}
					for (i = 0; i < p.days.length; i++) {
						r = 0;
						b = 0;
						for (j = 0; j < p.days[i].entries.length; j++) {
							r += p.days[i].entries[j].time;
							if (p.days[i].entries[j].statusId === "DONE") {
								b += p.days[i].entries[j].time;
							}
						}
						p.days[i].recordedHours = r;
						p.days[i].approvedHours = b;
					}
					this.oldDays = jQuery.extend(true, {}, p.days);
					m.setProperty("/days", p.days);
					this.loadListWithoPageData(p);
				},
				TimeEntry: function(t, c, e) {
					var x = {};
					x.time = t;
					x.hours = Math.floor(t);
					x.minutes = Math.round((t - Math.floor(t)) * 60);
					x.newEntry = !e;
					x.mainItem = null;
					x.subItems = c;
					x.notes = null;
					x.startTime = "";
					x.endTime = "";
					x.counter = "";
					x.hasNotes = false;
					x.showTime = e;
					x.showError = false;
					x.error = "";
					x.status = "";
					x.statusId = "";
					return x;
				},
				getWorkingDay: function(d, w) {
					if (w) {
						for (var i = 0; i < w.length; i++) {
							if (w[i].date === d) {
								return w[i];
							}
						}
					}
					return null;
				},
				getTargetHours: function(d, w) {
					var a = this.getWorkingDay(d, w);
					if (a) {
						return a.targetHours;
					}
					return 0;
				},
				convertDateFormat: function(d) {
					return sap.ui.core.format.DateFormat.getDateInstance({
						style: "medium"
					}).format(d);
				},
				YYYYMMDDtoDate: function(a) {
					var y = parseInt(a.substr(0, 4), 10);
					var m = parseInt(a.substr(4, 2), 10) - 1;
					var d = parseInt(a.substr(6, 2), 10);
					return new Date(y, m, d, 0, 0, 0, 0);
				},
				loadListWithoModel: function() {
					var m = this.oApplication.getModel("TSM_WEEKLY");
					this.loadListWithoPageData(m.getData());
				},
				loadListWithoPageData: function(p) {
					if (p.days === null) {
						return;
					}
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var s = this.convertDateFormat(this.YYYYMMDDtoDate(m.getData().selected));
					for (var i = 0; i < p.days.length; i++) {
						var d = p.days[i];
						d.selected = (s === d.dateFormatted);
					}
					this.loadList(p.days);
				},
				initializeTable: function() {
					this.entryListContents = this.byId("ENTRY_LIST_CONTENTS");
					var h = new sap.m.Column({
						hAlign: "Left",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>COST_ASSIGNMENT}"
						})
					});
					this.entryListContents.addColumn(h);
					if (this.clockEntry) {
						h = new sap.m.Column({
							hAlign: "Center",
							demandPopin: true,
							minScreenWidth: "Tablet",
							popinDisplay: "Inline",
							header: new sap.m.Label({
								design: "Bold",
								text: "{i18n>START_TIME}"
							})
						});
						this.entryListContents.addColumn(h);
						h = new sap.m.Column({
							hAlign: "Center",
							demandPopin: true,
							minScreenWidth: "Tablet",
							popinDisplay: "Inline",
							header: new sap.m.Label({
								design: "Bold",
								text: "{i18n>END_TIME}"
							})
						});
						this.entryListContents.addColumn(h);
					}
					h = new sap.m.Column({
						hAlign: "Center",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>DURATION}"
						})
					});
					this.entryListContents.addColumn(h);
					h = new sap.m.Column({
						hAlign: "Right",
						demandPopin: true,
						minScreenWidth: "Tablet",
						popinDisplay: "Inline",
						header: new sap.m.Label({
							design: "Bold",
							text: "{i18n>STATUS}"
						})
					});
					if (this.extHookAlterColumns) {
						h = this.extHookAlterColumns(h);
					}
					this.entryListContents.addColumn(h);
				},
				loadList: function() {
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var d = m.getData().days;
					var s = this,
						r, a, t, b;
					this.entryListContents.removeAllItems();
					for (var i = 0; i < d.length; i++) {
						if (d[i].entries.length) {
							a = d[i].date;
							a = this.formatDateMMMDD(a);
							var w = new sap.m.GroupHeaderListItem({
								title: a,
								upperCase: false
							});
							w.addCustomData(new sap.ui.core.CustomData({
								key: "dateSelected",
								value: d[i].date
							}));
							w.addCustomData(new sap.ui.core.CustomData({
								key: "header",
								value: true
							}));
							var o = new sap.m.ObjectIdentifier({
								title: a
							});
							t = this.formatTime(d[i].targetHours.toFixed(2));
							b = this.formatTime(d[i].recordedHours.toFixed(2));
							if (parseFloat(t, 10) !== 0 && this.withTargetHours) {
								if (parseFloat(b, 10) === 1) {
									r = this.oBundle.getText("WEEKLY_RECORDED_HOUR", [b, t]);
								} else {
									r = this.oBundle.getText("WEEKLY_RECORDED_HOURS", [b, t]);
								}
							} else {
								r = this.oBundle.getText("TOTAL_RECORDED_HOURS", [b]);
							}
							w.setCount(r);
							this.entryListContents.addItem(w);
							for (var j = 0; j < d[i].entries.length; j++) {
								var l = d[i].entries[j];
								var S = new sap.m.ColumnListItem({
									type: "Navigation",
									tap: function(E) {
										s.onItemSelectGotoEdit(E);
									}
								});
								S.addCustomData(new sap.ui.core.CustomData({
									key: "day",
									value: i
								}));
								S.addCustomData(new sap.ui.core.CustomData({
									key: "entry",
									value: j
								}));
								S.addCustomData(new sap.ui.core.CustomData({
									key: "dateformated",
									value: d[i].dateFormatted
								}));
								S.addCustomData(new sap.ui.core.CustomData({
									key: "dateSelected",
									value: d[i].date
								}));
								S.addCustomData(new sap.ui.core.CustomData({
									key: "selectedDate",
									value: d[i].dateStr
								}));
								S.addCustomData(new sap.ui.core.CustomData({
									key: "header",
									value: false
								}));
								o = new sap.m.ObjectIdentifier({
									title: l.mainItem,
									text: l.subItems,
									badgeNotes: l.hasNotes
								});
								if (l.showError || l.rejectionReason) {
									var c = new sap.ui.layout.VerticalLayout();
									c.addContent(o);
									if (l.showError) {
										c.addContent(new sap.m.ObjectStatus({
											text: l.error,
											state: sap.ui.core.ValueState.Error
										}));
									} else {
										c.addContent(new sap.m.ObjectStatus({
											text: l.rejectionReason,
											state: sap.ui.core.ValueState.Error
										}));
									}
									S.addCell(c);
								} else {
									S.addCell(o);
								}
								var e = sap.ca.ui.model.format.DateFormat.getTimeInstance({
									pattern: "HHmmss"
								});
								var f = sap.ca.ui.model.format.DateFormat.getTimeInstance({
									style: "medium"
								});
								var g;
								var h;
								var k = this.formatTime(l.time.toFixed(2));
								if (this.clockEntry) {
									if (l.startTime !== l.endTime) {
										g = e.parse(l.startTime);
										S.addCell(new sap.m.Label({
											text: f.format(g),
											design: "Bold"
										}));
										h = e.parse(l.endTime);
										S.addCell(new sap.m.Label({
											text: f.format(h),
											design: "Bold"
										}));
										S.addCell(new sap.m.Label({
											text: k,
											design: "Bold"
										}));
									} else {
										S.addCell(new sap.m.Label({
											text: "-",
											design: "Bold"
										}));
										S.addCell(new sap.m.Label({
											text: "-",
											design: "Bold"
										}));
										S.addCell(new sap.m.Label({
											text: k,
											design: "Bold"
										}));
									}
								} else {
									S.addCell(new sap.m.Label({
										text: k,
										design: "Bold"
									}));
								}
								var n;
								if (l.statusId === "REJECTED") {
									n = sap.ui.core.ValueState.Error;
								} else if (l.statusId === "MSAVE") {
									n = sap.ui.core.ValueState.NONE;
								} else {
									n = sap.ui.core.ValueState.Success;
								}
								S.setType("Navigation");
								S.addCell(new sap.m.ObjectStatus({
									text: l.status,
									state: n
								}));
								this.entryListContents.addItem(S);
							}
						}
					}
					if (sap.ui.Device.system.phone) {
						this.setWeekOverviews(1);
					} else {
						this.setWeekOverviews(2);
					}
				},
				onDelete: function() {
					var t = this.byId("ENTRY_LIST_CONTENTS");
					var s = [];
					s = t.getSelectedItems();
					var d = 0;
					var a = 0;
					var b = 0;
					var n;
					var c;
					var e;
					var f;
					var m = this.oApplication.getModel("TSM_WEEKLY");
					var p = m.getData();
					var S = null;
					n = s.length;
					for (var i = 0; i < s.length; i++) {
						c = s[i].data().day;
						e = s[i].data().entry;
						f = p.days[c].entries[e];
						this.updatePageData(true, c, f, false);
						if (f.subItems !== this.oApplicationFacade.getResourceBundle().getText("ADD_NEW")) {
							d += f.hours;
							a += f.minutes;
							b += f.time;
							b = parseFloat(b.toFixed(2));
						} else {
							n--;
						}
						if (a > 59) {
							a -= 60;
							d++;
						}
					}
					if (this.clockEntry) {
						S = {
							question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
							additionalInformation: [{
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
								text: n.toString()
							}, {
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_HOURS"),
								text: this.oBundle.getText("FULL_CONCATENATE_HOURSMIN", [d, a])
							}],
							showNote: false,
							title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					} else {
						var g = this.oBundle.getText("TOTAL_DURATION");
						S = {
							question: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY"),
							additionalInformation: [{
								label: this.oBundle.getText("DELETE_CONFIRMATION_SUMMARY_ENTRIES"),
								text: n.toString()
							}, {
								label: g,
								text: this.formatTime(b.toString())
							}],
							showNote: false,
							title: this.oConfiguration.getText("DELETE_CONFIRMATION"),
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					}
					this.openConfirmationPopup(S, false);
				},
				updatePageData: function(d, a, e, t) {
					if (!e) {
						return;
					}
					this.entry = e;
					this.dayIndex = a;
					if (d) {
						this.entry.deleted = true;
					}
					if (t) {
						this.entry.bToBeReleased = true;
					}
					this.entry.newEntry = false;
					this.entry.showTime = true;
					if (!this.clockEntry) {
						this.entry.hours = parseInt(this.entry.hours, 10);
						this.entry.minutes = parseInt(this.entry.minutes, 10);
					} else {
						this.entry.startTime = e.startTime;
						this.entry.endTime = e.endTime;
						this.entry.hours = e.hours;
						this.entry.minutes = e.minutes;
						this.entry.time = e.time;
					}
					this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;
				},
				selectDateOnAllCheckBoxSelection: function(t) {
					var l = t.getItems();
					var s = t.getSelectedItems();
					var a = [];
					var u = [];
					var j = 0;
					for (var i = 0; i < l.length; i++) {
						if (s[j] && (l[i].data().dateSelected === s[j].data().dateSelected)) {
							a.push(s[j].data().dateSelected);
							if (j < s.length) {
								j++;
							}
						} else {
							u.push(l[i].data().dateSelected);
						}
					}
					this.byId("WEEKLY_CALENDAR").toggleDatesSelection(u, false);
					this.byId("WEEKLY_CALENDAR").toggleDatesSelection(a, true);
					a = [];
					u = [];
				},
				getHeaderFooterOptions: function() {
					var t = this;
					var o = {
						sI18NFullscreenTitle: "TIMESHEET_TITLE",
						oEditBtn: {
							id: "QUICK_FILL_BTN",
							sI18nBtnTxt: "CREATE",
							onBtnPressed: function(e) {
								t.onAddNewEntry(e);
							}
						},
						buttonList: [{
							sId: "copyBtn",
							sI18nBtnTxt: "Copy",
							onBtnPressed: function(e) {
								t.onCopy(e);
							}
						}, {
							sId: "deleteBtn",
							sI18nBtnTxt: "DELETE",
							onBtnPressed: function(e) {
								t.onDelete(e);
							}
						}, {
							sId: "SUBMIT_BTN",
							sI18nBtnTxt: "SUBMIT",
							onBtnPressed: function(e) {
								t.onSubmit(e);
							}
						}]
					};
					var m = new sap.ui.core.routing.HashChanger();
					var u = m.getHash();
					if (u.indexOf("Shell-runStandaloneApp") >= 0) {
						o.bSuppressBookmarkButton = true;
					}
					if (this.extHookChangeHeaderFooterOptions) {
						o = this.extHookChangeHeaderFooterOptions(o);
					}
					return o;
				}
			});
		},
		"cfr/etsapp/view/S3.view.xml": '<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="cfr.etsapp.manage.view.S3"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="WEEKLY_PAGE" title="{i18n>WEEKENTRY_TITLE}"\n\t\tenableScrolling="false">\n\t\t<content>\n\t\t<sap.ui.layout:FixFlex>\n\t\t\t<sap.ui.layout:fixContent>\n\t\t\t<sap.me:Calendar id="WEEKLY_CALENDAR"\n\t\t\t\tswipeToNavigate="true" design="Approval" singleRow="true"\n\t\t\t\tweeksPerRow="2" hideNavControls="false"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onSelect" enableMultiselection=\'true\' changeCurrentDate="onCalendarWeekChange">\n\t\t\t</sap.me:Calendar>\n\t\t\t</sap.ui.layout:fixContent>\n\t\t\t\n\t\t\t<sap.ui.layout:flexContent>\n\t\t\t<ScrollContainer id="scroller"\n                vertical="true"\n                height="100%"\n                focusable="true"\n                >\n                <content>\n                \n\n\t\t\t\t\t<sap.ui.layout:Grid id="MTS3_SUMMARY_GRID" defaultSpan="L6 M6 S12">\n\t\t\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_FIRST_INFO"\n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_1"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_1"  state="Error">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_1" state="Success">\n\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<attributes>\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute />\n    \t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_1"/>\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t\t<sap.ui.layout:VerticalLayout id="MTS3_SECOND_INFO" \n\t\t\t\t\t\t\t\twidth="100%">\n\n\t\t\t\t\t\t\t\t<ObjectListItem id="MTS3_CURRENT_WEEK_INFO_2">\n\t\t\t\t\t\t\t\t\t\t<firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_ASSIGNMENTS_2" \n\t\t\t\t\t\t\t\t\t\t\t\tstate="Error">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t</firstStatus>\n\t\t\t\t\t\t\t\t\t\t\t<secondStatus>\n\t\t\t\t\t\t\t\t\t\t\t\t<ObjectStatus id="MTS3_TXT_APPROVED_HOURS_2" \n\t\t\t\t\t\t\t\t\t\t\t\t\tstate="Success">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t</ObjectStatus>\n\t\t\t\t\t\t\t\t\t\t\t</secondStatus>\n\t\t\t\t\t\t\t\t\t<attributes>\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute />\n\t\t\t\t\t\t\t\t\t\t<ObjectAttribute id="MTS3_TARGET_TIME_2" />\n\t\t\t\t\t\t\t\t\t</attributes>\n\t\t\t\t\t\t\t\t</ObjectListItem>\n\t\t\t\t\t\t\t</sap.ui.layout:VerticalLayout>\n\t\t\t\t\t\t</sap.ui.layout:content>\n\t\t\t\t\t</sap.ui.layout:Grid>\n\t\t\t\t\n\t\t\t<Table id="ENTRY_LIST_CONTENTS" mode="MultiSelect" select="onItemSelect">\n\t\t\t\n\t\t\t</Table>\n\t\t\t\n\n        <sap.me:CalendarLegend id="LEGEND" design="Approval">\n\t\t\t</sap.me:CalendarLegend>\n\t\t\t</content>\n\t\t\t</ScrollContainer>\n\t\t\t</sap.ui.layout:flexContent>\n\t\t\t</sap.ui.layout:FixFlex>\n        </content>\n\t</Page>\n</sap.ui.core:View>\n',
		"cfr/etsapp/view/S31.controller.js": function() {
			jQuery.sap.require("sap.ui.core.mvc.Controller");
			jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
			jQuery.sap.require("sap.ui.model.odata.datajs");
			jQuery.sap.require("cfr.etsapp.manage.model.TimeEntry");
			jQuery.sap.require("cfr.etsapp.manage.utils.DataManager");
			jQuery.sap.require("cfr.etsapp.manage.utils.ConcurrentEmployment");
			jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
			jQuery.sap.require("sap.ca.ui.model.type.Number");
			sap.ca.scfld.md.controller.BaseFullscreenController.extend("cfr.etsapp.manage.view.S31", {
				extHookChangeHeaderFooterOptions: null,
				extHookChangeObjectBeforePost: null,
				onInit: function() {
					sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
					this.RESULTS_TOP = 30;
					this.top = this.RESULTS_TOP;
					this.localSkip = 0;
					this.remoteSkip = 0;
					this.MODEL_SIZE_LIMIT = 1000;
					this.gv_fieldRelated = "";
					this.searchField_begDa = "";
					this.searchField_endDa = "";
					this.pagingEnabled = false;
					this.localTypeList = [];
					this.favoriteDeletedIds = [];
					this.remoteTypeList = [];
					this.resultsTotalCount = 0;
					this.remoteSearchPhrase = "";
					this.favoriteSelected = false;
					this.worklistSelectedObj = {};
					this.worklistItemSelected = false;
					this.continueSearchOnServerActive = false;
					this.initialize();
					this.entry = new cfr.etsapp.manage.model.TimeEntry(0, "", false, true);
					var s = this;
					this.oRouter.attachRouteMatched(function(e) {
						if (e.getParameter("name") === "S31") {
							if (s.oApplication.pernr) {
								s.initializeView(e.getParameter("arguments").context);
							} else {
								s.context = e.getParameter("arguments").context;
							}
						}
					}, this);
				},
				onAfterRendering: function() {
					var s = this;
					if (!this.oApplication.pernr) {
						cfr.etsapp.manage.utils.ConcurrentEmployment.getCEEnablement(this, function() {
							if (s.context) {
								s.initializeView(s.context);
							}
						});
					}
				},
				initializeView: function(c) {
					this.noneText = "(" + this.oBundle.getText("None") + ")";
					if (!this.oApplication.getModel("TSM_WEEKLY")) {
						var a = new Date();
						this.setInitialInfoModelData(a);
					}
					this.getHderFooterOptions();
					var b = new sap.ui.model.json.JSONModel();
					this.oApplication.setModel(b, "createScreenModel");
					this.worklistItemSelected = false;
					this.worklistSelectedObj = {};
					this.entry = new cfr.etsapp.manage.model.TimeEntry(0, "", false, true);
					var f = parseInt(c[c.indexOf("offset") + 6], 10);
					this.byId("weeklyCalendar").setFirstDayOffset(f);
					var d = decodeURIComponent(c),
						n;
					d = d.replace("offset", "");
					d = d.slice(0, -1);
					var w = this.oApplication.getModel("TSM_WEEKLY");
					var e = new Date(d);
					if (sap.ui.Device.system.phone) {
						this.byId("weeklyCalendar").setWeeksPerRow(1);
						n = 6;
					} else {
						n = 13;
					}
					var g = new Date(e.getFullYear(), e.getMonth(), e.getDate() - this.getActualOffset(f, e.getDay()));
					var l = new Date(g.getFullYear(), g.getMonth(), g.getDate() + n);
					if (w.getData().createdFromS31) {
						this.clockEntry = w.getProperty("/clockEntry");
						b.setProperty("/start", this.getDateStr(g));
						b.setProperty("/weekStart", this.getDateStr(g));
						b.setProperty("/weekEnd", this.getDateStr(l));
						w.setProperty("/weekStart", this.getDateStr(g));
						w.setProperty("/weekEnd", this.getDateStr(l));
					} else {
						b.setProperty("/start", this.getDateStr(g));
						b.setProperty("/weekStart", this.getDateStr(g));
						b.setProperty("/weekEnd", this.getDateStr(l));
						this.clockEntry = w.getProperty("/clockEntry");
						this.releaseFuture = w.getProperty("/releaseFuture");
						this.releaseAllowed = w.getProperty("/releaseAllowed");
						this.FavoriteAvailable = w.getProperty("/favoriteAvailable");
					}
					b.setProperty("/clockEntry", this.clockEntry);
					b.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
					b.setProperty("/editButtonEnabled", false);
					b.setProperty("/updateButtonEnabled", false);
					this.initView();
					this.getProfileFields();
					this.getWorkListCollection();
					this.getFavoritesCollection();
					this.getView().setModel(b);
				},
				initialize: function() {
					if (!this.oApplication) {
						this.oApplication = this.oApplicationFacade.oApplicationImplementation;
						this.oConfiguration = new cfr.etsapp.manage.utils.InitialConfigHelper();
						this.oService = new cfr.etsapp.manage.Service();
						this.oConnectionManager = this.oApplication.oConnectionManager;
						this.oBundle = this.oApplicationFacade.oApplicationImplementation.getResourceBundle();
						this.oConfiguration.setResourceBundle(this.oBundle);
					}
				},
				setInitialInfoModelData: function(c) {
					var m = new sap.ui.model.json.JSONModel();
					var n = 13;
					if (sap.ui.Device.system.phone) {
						n = 6;
						this.byId("weeklyCalendar").setWeeksPerRow(1);
					}
					var f = c.getTime() - (c.getDay() * 24 * 60 * 60 * 1000);
					var l = f + (n * 24 * 60 * 60 * 1000);
					var a = new Date(f);
					var b = new Date(l);
					this.oApplication.setModel(m, "TSM_WEEKLY");
					this.oService.getInitialInfos(this, this.oApplication.pernr, this.getDateStr(c), this.getDateStr(c));
					m.setProperty("/showSubmit", false);
					m.setProperty("/selected", this.getDateStr(c));
					m.setProperty("/selectedDate", c);
					m.setProperty("/year", c.getFullYear());
					m.setProperty("/start", this.getDateStr(a));
					m.setProperty("/weekStart", this.getDateStr(a));
					m.setProperty("/weekEnd", this.getDateStr(b));
					m.setProperty("/createdFromS31", true);
					var I = this.oConfiguration.getInitialInfoModel();
					this.releaseAllowed = I.ReleaseDirectly === "TRUE";
					m.setProperty("/releaseAllowed", this.releaseAllowed);
					m.setProperty("/releaseFuture", I.ReleaseFuture);
					this.releaseFuture = I.ReleaseFuture;
					m.setProperty("/favoriteAvailable", I.FavoriteAvailable);
					this.FavoriteAvailable = I.FavoriteAvailable;
					this.clockEntry = (I.ClockEntry === "TRUE");
					m.setProperty("/clockEntry", this.clockEntry);
					m.setProperty("/decimalTimeEntryVisible", !this.clockEntry);
					return m;
				},
				initView: function() {
					var s = this.oApplication.getModel("S31modelexch");
					var w = this.oApplication.getModel("TSM_WEEKLY");
					this.byId("timeAssignment").setValue("");
					var c = this.oApplication.getModel("createScreenModel");
					var d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
					if (!s) {
						s = new sap.ui.model.json.JSONModel();
						s.setProperty("/selectedDates", w.getProperty("/selectedDate"));
						s.setProperty("/editentryview", false);
						this.oApplication.setModel(s, "S31modelexch");
					}
					if (!this.FavoriteAvailable) {
						this.byId("timeAssignmentLbl").setText(this.oBundle.getText("SELECT_WORKLIST"));
					}
					var a = this.byId("weeklyCalendar");
					a.setEnableMultiselection(true);
					a.unselectAllDates();
					if (!s.getProperty("/editentryview")) {
						a.setEnableMultiselection(true);
						a.toggleDatesSelection(s.getData().selectedDates, true);
						if (s.getProperty("/copySelected")) {
							this.edit_entry = false;
							this.edit_entry_data = this.clone(s.getData().editeddata);
							this.byId("accountingInfoPanel").setExpanded(true);
							this.editdatafroms3 = s.getData().editeddata;
							this.entry = this.editdatafroms3.entry;
							this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
								style: "standard"
							}).format(this.entry.time);
							c.setProperty("/entry", this.entry);
							if (this.isClockEntry()) {
								this.byId("startTime").setValue(this.entry.startTime);
								this.byId("endTime").setValue(this.entry.endTime);
							} else {
								this.byId("decimalTimeEntryValue").setValue(this.entry.time);
							}
							if (this.entry.hasNotes) {
								this.byId("S31TextArea").setValue(this.entry.notes);
							}
						} else {
							this.edit_entry = false;
							this.byId("decimalTimeEntryValue").setValue("");
							this.byId("startTime").setValue("");
							this.byId("endTime").setValue("");
							this.byId("timeAssignment").setValue("");
						}
					} else {
						a.toggleDatesSelection(s.getData().selectedDates, true);
						this.edit_entry = true;
						this.edit_entry_data = this.clone(s.getData().editeddata);
						this.byId("accountingInfoPanel").setExpanded(true);
						a.setEnableMultiselection(true);
						this.editdatafroms3 = s.getData().editeddata;
						this.entry = this.editdatafroms3.entry;
						this.entry.time = sap.ca.ui.model.format.NumberFormat.getInstance({
							style: "standard"
						}).format(this.entry.time);
						c.setProperty("/entry", this.entry);
						if (this.isClockEntry()) {
							if (this.entry.startTime !== this.entry.endTime) {
								this.byId("startTime").setValue(this.entry.startTime);
								this.byId("endTime").setValue(this.entry.endTime);
							} else {
								this.byId("ClkTimeDecimalTimeEntryValue").setValue(this.entry.time);
							}
						} else {
							this.byId("decimalTimeEntryValue").setValue(this.entry.time);
						}
						if (this.entry.hasNotes) {
							this.byId("S31TextArea").setValue(this.entry.notes);
						}
					}
					if (a.getSelectedDates().length > 1) {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT", [this.formatDateMMMDD(new Date(a.getSelectedDates()[
							0])), a.getSelectedDates().length - 1]));
					} else if (a.getSelectedDates().length === 1) {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(a.getSelectedDates()[
							0]))]));
					} else {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
						this.setBtnEnabled("SUBMIT_BTN", false);
					}
					if (s.getData().pageData) {
						var l = s.getData().pageData.legendforS31;
						a.toggleDatesType(l.yellow, sap.me.CalendarEventType.Type04, true);
						a.toggleDatesType(l.green, sap.me.CalendarEventType.Type01, true);
						a.toggleDatesType(l.grey, sap.me.CalendarEventType.Type00, true);
						a.toggleDatesType(l.red, sap.me.CalendarEventType.Type07, true);
						a.toggleDatesType(l.rejected, sap.me.CalendarEventType.Type06, true);
					}
				},
				clone: function(o) {
					if (o === null || typeof o !== "object") {
						return o;
					}
					if (o instanceof Object) {
						var c = {};
						var a = null;
						for (a in o) {
							if (o.hasOwnProperty(a)) {
								c[a] = this.clone(o[a]);
							}
						}
						return c;
					}
					throw new Error("Unable to copy obj! Its type isn't supported.");
				},
				formatDateMMMDD: function(d) {
					var m = d.getMonth();
					var a = d.getDate();
					var b = this.oBundle.getText("MONTH_" + m) + " " + a;
					return b;
				},
				getActualOffset: function(f, c) {
					var a = 7;
					if (f > c) {
						return c + a - f;
					} else {
						return c - f;
					}
				},
				validate: function() {
					if (this.favoriteSelected) {
						this.byId("timeAssignment").setValue("");
					}
					this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
					this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false);
					this.dateTimeModified = true;
					this.validateSaveBtnVisibility();
				},
				check_for_changed_data: function() {
					var c = this.byId("weeklyCalendar");
					var s = c.getSelectedDates();
					var d = null;
					if (this.isClockEntry()) {
						var a = this.byId('startTime').getValue();
						var e = this.byId('endTime').getValue();
					} else {
						d = this.byId('decimalTimeEntryValue').getValue();
					}
					var n = this.byId('S31TextArea').getValue();
					var b = this.byId('COST_ASSIGNMENT_RECENTLY_USED_LIST').getValue();
					if (this.edit_entry) {
						var f = this.edit_entry_data;
						var g = this.getDateStr(new Date(s[0]));
						var o = f.pageData.days[f.dayIndex].dateStr;
						var h = f.entry.notes;
						var j = f.entry.mainName;
						var k = f.entry.mainCode;
						var l = this.getView().getModel('fordynamictypes').getData().types;
						var m;
						var p;
						var q;
						var r, t;
						var u, v;
						if (this.isClockEntry()) {
							var w = f.entry.startTime;
							var x = f.entry.endTime;
							if (w !== a || x !== e) return true;
						} else {
							var y = f.entry.time;
							if (y !== d) return true;
						}
						for (u = 0; u < l.length; u++) {
							m = l[u].fieldName;
							if (m === j) {
								q = l[u].value;
								r = l[u].value.indexOf('(');
								t = l[u].value.indexOf(')');
								p = l[u].value.substring(r + 1, t);
								if (p !== k) {
									return true;
								}
							}
							for (v = 0; f.entry.childItems && f.entry.childItems[v]; v++) {
								if (f.entry.childNames[v] === m) {
									q = l[u].value;
									r = l[u].value.indexOf('(');
									t = l[u].value.indexOf(')');
									p = l[u].value.substring(r + 1, t);
									if (f.entry.childCodes[v] !== p) {
										return true;
									}
								}
							}
						}
						if (s.length > 1 || o !== g || h !== n) {
							return true;
						}
						return false;
					} else {
						var z = false;
						var A = this.getView().getModel('fordynamictypes').getData().types;
						if (A) {
							for (var i = 0; i < A.length; i++) {
								if (A[i].value.trim()) {
									z = true;
								}
							}
						}
						if (this.isClockEntry()) {
							if (s.length !== 0 || a !== "" || e !== "" || b !== "" || z) return true;
						} else {
							if (s.length !== 0 || (d !== "0" && d !== "") || b !== "" || z) return true;
						}
						return false;
					}
				},
				onTapOnDate: function(e) {
					var d = e.getSource().getSelectedDates();
					var n = d.length;
					if (this.edit_entry) {
						var a = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "YYYYMMdd"
						});
						var b = a.parse(this.edit_entry_data.pageData.days[this.edit_entry_data.dayIndex].dateStr);
						for (var i = 0; i < n; i++) {
							var c = new Date(d[i]);
							if (!(c.getFullYear() === b.getFullYear() && c.getMonth() === b.getMonth() && c.getDate() === b.getDate())) {
								e.getSource().toggleDatesSelection([c.toDateString()], false);
							}
						}
						this.validateSaveBtnVisibility(e);
						return;
					}
					this.validateSaveBtnVisibility(e);
					if (n > 1) {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT", [this.formatDateMMMDD(new Date(d[0])), n - 1]));
					} else if (n === 1) {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("SUBMIT_HEADER_TEXT_SINGLE", [this.formatDateMMMDD(new Date(d[0]))]));
					} else if (n === 0) {
						this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
					}
				},
				validateSaveBtnVisibility: function() {
					var t = false;
					if (this.isClockEntry()) {
						var s = this.byId("startTime").getValue();
						var e = this.byId("endTime").getValue();
						var c = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
						if ((c !== "0") && c !== "") {
							this.clkTimeDurationFilled = true;
						} else {
							this.clkTimeDurationFilled = false;
						}
						if (((s && e) && s !== e) || this.clkTimeDurationFilled) {
							t = true;
						} else {
							t = false;
						}
					} else {
						var d = this.byId("decimalTimeEntryValue").getValue();
						if ((d !== "0") && d !== "") {
							if (this._isValidDecimalNumber(d)) {
								t = true;
							} else {
								t = false;
							}
						} else {
							t = false;
						}
					}
					var a = this.byId("weeklyCalendar").getSelectedDates().length;
					var f = false;
					var b = this.getView().getModel().getData().types;
					if (this.worklistItemSelected) {
						f = true;
					} else if (b) {
						for (var i = 0; i < b.length; i++) {
							if (b[i].value.trim() || b[i].valueStateText.trim()) {
								f = true;
								break;
							}
						}
					}
					if (f && a && t) {
						this.setBtnEnabled("SUBMIT_BTN", true);
					} else {
						this.setBtnEnabled("SUBMIT_BTN", false);
					}
				},
				suggestionHelpChange: function(e) {
					e.getSource().setValue("");
					this.validateSaveBtnVisibility(e);
				},
				onFavoriteItemSelection: function(e) {
					this.validateSaveBtnVisibility(e);
				},
				onFavValueChange: function() {
					this.byId("timeAssignment").setValue("");
				},
				onManualItemSelection: function(e) {
					this.validateSaveBtnVisibility(e);
				},
				timeAssignmentLiveChange: function() {
					this.byId("timeAssignment").setValue("");
				},
				manualHelpChange: function(e) {
					if (this.favoriteSelected) {
						this.byId("timeAssignment").setValue("");
					}
					e.getSource().setValueStateText(e.getSource().getValue());
					e.getSource().setValue(e.getSource().getValue());
					this.validateSaveBtnVisibility(e);
				},
				onDurationValueChange: function(e) {
					this.validateSaveBtnVisibility(e);
				},
				onDecimalTimeValueChange: function(e) {
					if (this.favoriteSelected) {
						this.byId("timeAssignment").setValue("");
					}
					this.dateTimeModified = true;
					var d;
					if (!this.isClockEntry()) {
						d = this.byId("decimalTimeEntryValue").getValue();
					} else {
						d = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
					}
					if (this._isValidDecimalNumber(d)) {
						this.validateSaveBtnVisibility(e);
					} else {
						this.setBtnEnabled("SUBMIT_BTN", false);
					}
				},
				_isValidDecimalNumber: function(n) {
					var a = n.toString();
					var d = a.indexOf(".");
					var c = a.indexOf(",");
					if (d > 0 && c > 0) {
						return false;
					}
					var s = d;
					if (s < 0) {
						s = a.indexOf(",");
					}
					var b = "0123456789";
					var i;
					var f;
					var e = 0;
					var h = false;
					if (s === -1) {
						i = a;
						f = "";
					} else {
						i = a.slice(0, s);
						f = a.slice(s + 1, a.length);
					}
					if (i.length > 5) {
						return false;
					}
					for (e = 0; e < i.length; e++) {
						if (b.indexOf(i[e]) === -1) {
							return false;
						} else {
							h = true;
						}
					}
					if (f.length > 2) {
						return false;
					}
					for (e = 0; e < f.length; e++) {
						if (b.indexOf(f[e]) === -1) {
							return false;
						} else {
							h = true;
						}
					}
					if (h === false) {
						return false;
					}
					return true;
				},
				onNavButton: function() {
					var c = this.byId("weeklyCalendar");
					var s = c.getCurrentDate();
					var d = s;
					s = d + "offset" + c.getFirstDayOffset();
					var m = new sap.ui.model.json.JSONModel();
					m.setProperty("/currentDate", new Date(d));
					this.oApplication.setModel(m, "S3exchangeModel");
					this.cleanUpOnBack();
					delete this.entry;
					this.oRouter.navTo("S3", {
						context: s
					}, true);
				},
				cleanUpOnBack: function() {
					this.byId("timeAssignment").setValue("");
					this.byId("decimalTimeEntryValue").setValue("");
					this.byId("startTime").setValue("");
					this.byId("endTime").setValue("");
					delete this.worklistSelectedObj;
					this.worklistItemSelected = false;
					this.byId("weeklyCalendar").setDisabledWeekDays([]);
					this.byId("weeklyCalendar").unselectAllDates();
					this.byId("S31TextArea").setValue("");
					this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
					var t = this.oApplication.getModel("accountingInfoModel").getData().types;
					for (var i = 0; i < t.length; i++) {
						if (t[i].value !== "" || t[i].valueStateText !== "") {
							t[i].value = "";
							t[i].valueStateText = "";
						}
					}
					this.byId("accountingInfoPanel").setExpanded(false);
					this.getView().getModel().setProperty("/types", t);
					this.oApplication.getModel("accountingInfoModel").setProperty("/types", t);
				},
				getDateStr: function(d) {
					return "" + d.getFullYear() + ("" + (d.getMonth() + 101)).substring(1) + ("" + (d.getDate() + 100)).substring(1);
				},
				getDateTimeStr: function(d) {
					return "" + d.getFullYear() + "-" + ("" + (d.getMonth() + 101)).substring(1) + "-" + ("" + (d.getDate() + 100)).substring(1) +
						"T00:00:00";
				},
				getValueHelpCollection: function(o) {
					var s = this;
					var c = 0;
					var d = (o && o.fieldName);
					if (this.remoteSearchPhrase) {
						c = this.remoteSkip;
					} else {
						c = this.localSkip;
					}
					var l = ";;";
					var e = "";
					var f = this.getView().getModel('accountingInfoModel').getData().types.length;
					for (var i = 0; i < f; i++) {
						var g = this.getView().getModel('accountingInfoModel').getData().types[i].valueStateText;
						var h = this.getView().getModel('accountingInfoModel').getData().types[i].fieldName;
						if (g.length !== 0 && h !== d) {
							var k = h + "=" + g;
							if (e) {
								e += l + k;
							} else {
								e += k;
							}
						}
					}
					this.gv_fieldRelated = e;
					var m = this.byId("weeklyCalendar");
					var n = m.getSelectedDates();
					if (n[0]) {
						var p = n.length;
						this.searchField_begDa = this.getDateStr(new Date(n[0]));
						this.searchField_endDa = this.getDateStr(new Date(n[p - 1]));
					} else {
						var M = this.oApplication.getModel("TSM_WEEKLY");
						this.searchField_begDa = (M.getProperty("/weekStart"));
						this.searchField_endDa = (M.getProperty("/weekEnd"));
					}
					this.oService.getValueHelpList(this.oApplication.pernr, (d || this.fieldName), this.top, c, this.remoteSearchPhrase, this.gv_fieldRelated,
						this.searchField_begDa, this.searchField_endDa,
						function(q) {
							s.remoteSearchActive = false;
							var t = [];
							if (s.remoteSearch()) {
								t = s.localTypeList;
								s.remoteSearchActive = true;
								s.lastRemoteSearchPhrase = s.remoteSearchPhrase;
							} else {
								t = s.localTypeList;
							}
							if (q.length > 0 && t.length === 0) {
								t.push({
									fieldValueId: s.noneText,
									fieldValue: s.noneText,
									fieldId: ""
								});
							}
							var r;
							for (var i = 0; i < q.length; i++) {
								r = 1;
								for (var j = 0; j < t.length; j++) {
									var C = "(" + q[i].FieldId + ")";
									if (t[j].fieldValue === q[i].FieldValue && t[j].fieldId === C) {
										r = 0;
										break;
									}
								}
								if (r === 1) {
									t.push({
										fieldValue: q[i].FieldValue,
										fieldId: "(" + q[i].FieldId + ")",
										fieldValueId: q[i].FieldValue + " (" + q[i].FieldId + ")"
									});
								}
							}

							function u(v) {
								var w = 1;
								if (v[0] === "-") {
									w = -1;
									v = v.substr(1);
								}
								return function(a, b) {
									var x = (a[v] < b[v]) ? -1 : (a[v] > b[v]) ? 1 : 0;
									return x * w;
								};
							}
							t.sort(u("fieldId"));
							s.oApplication.getModel("createScreenModel").setProperty("/" + (o && o.fieldName), t);
							s.oApplication.getModel("createScreenModel").updateBindings();
							if (s.remoteSearch()) {
								s.remoteResultsLength = q.length;
								s.checkRemotePaging(s.remoteResultsLength);
							} else {
								s.localResultsLength = q.length;
								s.checkLocalPaging(s.localResultsLength, o && o.fieldName);
							}
						});
				},
				remoteSearch: function() {
					if ("remoteSearchPhrase" in this) {
						if (this.remoteSearchPhrase) {
							return this.remoteSearchPhrase;
						}
					}
					return false;
				},
				checkLocalPaging: function(r) {
					var t = this.typeListControl.getItems();
					var a = t.length;
					if (a === 0 || a >= this.MODEL_SIZE_LIMIT) {
						return;
					}
					if (t) {
						if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE_LOADING")) {
							this.typeListControl.removeItem(t[a - 1]);
						}
					}
					if (r < this.top) {
						if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE") || t[a - 1].getTitle() === this.oBundle.getText(
								"CONTINUE_SEARCH_ON_SERVER")) {
							this.typeListControl.removeItem(t[a - 1]);
						}
					} else if (r >= this.top) {
						if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE")) {
							return;
						} else {
							if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
								t[a - 1].setTitle(this.oBundle.getText("TAP_TO_LOAD_MORE"));
							} else {
								this.loadMoreItem = new sap.m.StandardListItem({
									title: this.oBundle.getText("TAP_TO_LOAD_MORE"),
									active: true
								});
								this.typeListControl.addItem(this.loadMoreItem);
							}
						}
					}
				},
				checkRemotePaging: function(r) {
					if (r >= this.top || !this.remoteSearchActive || this.lastRemoteSearchPhrase !== this.remoteSearchPhrase) {
						var t = this.typeListControl.getItems();
						var a = t.length;
						if (a === 0 || a >= this.MODEL_SIZE_LIMIT) {
							this.noneTextItem = new sap.m.StandardListItem({
								title: this.noneText,
								active: true
							});
							this.typeListControl.insertItem(this.noneTextItem, 0);
							this.addContinueSearchItem(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
							return;
						}
						if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
							return;
						} else {
							if (t[a - 1].getTitle() === this.oBundle.getText("TAP_TO_LOAD_MORE")) {
								t[a - 1].setTitle(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
							} else {
								this.addContinueSearchItem(this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"));
							}
						}
					} else {
						t = this.typeListControl.getItems();
						a = t.length;
						if (t[a - 1].getTitle() === this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER") && r < this.top) {
							this.typeListControl.removeItem(t[a - 1]);
						}
					}
				},
				addContinueSearchItem: function() {
					this.continueSearchItem = new sap.m.StandardListItem({
						title: this.oBundle.getText("CONTINUE_SEARCH_ON_SERVER"),
						active: true
					});
					this.typeListControl.addItem(this.continueSearchItem);
					this.continueSearchItem.addEventDelegate({
						onAfterRendering: function() {
							$(this.continueSearchItem.$().context.firstChild).attr("colspan", "2");
						}
					}, this);
				},
				tapToLoadMore: function(s) {
					this.localSkip += this.top;
					this.getValueHelpCollection(s);
				},
				continueSearchOnServer: function(s) {
					this.remoteSearchPhrase = this.searchPhrase;
					if (this.firstRemoteSearch) {
						this.firstRemoteSearch = false;
						this.continueSearchOnServerActive = true;
					} else {
						this.remoteSkip += this.top;
					}
					this.getValueHelpCollection(s);
					return this.remoteSearchPhrase;
				},
				refineSearchResult: function() {
					this.typeBinding = this.typeListControl.getBinding("items");
					var f = [];
					if (this.searchPhrase) {
						f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, this.searchPhrase));
						f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, this.noneText));
					}
					this.typeBinding.filter(f);
				},
				onLiveFavChange: function(e) {
					var f = e.getParameter("value");
					f = f.toLowerCase();
					var l = e.getSource().getItems();
					var v;
					var g = null;
					var c = 0;
					for (var i = 0; i < l.length; i++) {
						if (l[i] instanceof sap.m.GroupHeaderListItem) {
							if (g) {
								g.setCount(c);
							}
							g = l[i];
							c = 0;
						} else {
							v = this.applySearchPatternToListItem(l[i], f);
							l[i].setVisible(v);
							if (v) {
								c++;
							}
						}
					}
					if (g) {
						if (g.getTitle() !== this.oBundle.getText("NO_WORKLIST") || g.getTitle() !== this.oBundle.getText("NO_WORKLIST")) {
							g.setCount(c);
						}
					}
				},
				applySearchPatternToListItem: function(i, f) {
					if (f === "") {
						return true;
					}
					if ((i.getTitle() && i.getTitle().toLowerCase().indexOf(f) !== -1) || (i.getDescription() && i.getDescription().toLowerCase().indexOf(
							f) !== -1) || (i.getInfo() && i.getInfo().toLowerCase().indexOf(f) !== -1)) {
						return true;
					}
					return false;
				},
				onLiveChange: function(e) {
					var v = e.getParameter("value");
					var f = [];
					f.push(new sap.ui.model.Filter("fieldValueId", sap.ui.model.FilterOperator.Contains, v));
					this.searchPhrase = e.getParameter("value");
					this.searchField = e.getSource();
					if (this.searchPhrase) {
						this.refineSearchResult();
						if (this.searchPhrase !== this.remoteSearchPhrase) {
							this.resetRemoteSearch();
						}
						this.remoteSearchPhrase = this.searchPhrase;
						this.checkRemotePaging(this.remoteResultsLength);
					} else {
						this.refineSearchResult();
						this.remoteSearchPhrase = "";
						if (this.oApplication.getModel("createScrenModel")) {
							this.oApplication.getModel("createScrenModel").setProperty("typeList", this.localTypeList);
						}
						this.remoteSearchActive = false;
						this.checkLocalPaging(this.localResultsLength);
						this.resetRemoteSearch();
					}
				},
				resetRemoteSearch: function() {
					this.firstRemoteSearch = true;
					this.remoteSkip = 0;
					this.remoteTypeList = [];
					this.continueSearchOnServerActive = false;
					this.remoteSearchPhrase = "";
					this.remoteSearchActive = false;
				},
				clearSearchField: function() {
					if ("searchField" in this) {
						this.searchField.setValue("");
						this.typeBinding.filter([]);
					}
				},
				bindFavDialog: function(s) {
					var c, a = this;
					var m = a.oApplication.getModel("createScreenModel");
					var w = new sap.m.GroupHeaderListItem({
						title: a.oBundle.getText("WORKLIST"),
						upperCase: false,
						count: m.getProperty("/projects").length
					});
					var n = new sap.m.GroupHeaderListItem({
						title: a.oBundle.getText("NO_WORKLIST"),
						upperCase: false
					});
					if (this.FavoriteAvailable) {
						var f = new sap.m.GroupHeaderListItem({
							title: a.oBundle.getText("FAVORITE"),
							upperCase: false,
							count: m.getProperty("/favorites").length
						});
						var b = new sap.m.GroupHeaderListItem({
							title: a.oBundle.getText("NO_FAVORITE"),
							upperCase: false
						});
						c = m.getProperty("/favorites").concat(m.getProperty("/projects"));
					} else {
						c = m.getProperty("/projects");
					}
					m.setProperty("/combinedFavList", c);
					var i = new sap.m.StandardListItem({
						title: "{name}",
						description: "{subText}",
						info: "{info}",
						customData: [{
							key: "items",
							value: "{childs}"
						}, {
							key: "type",
							value: "{type}"
						}, {
							key: "id",
							value: "{id}"
						}, {
							key: "fieldId",
							value: "{fieldName}"
						}, {
							key: "fieldValue",
							value: "{fieldValue}"
						}]
					});
					s.setModel(a.oApplication.getModel("createScreenModel"));
					s.bindAggregation("items", "/combinedFavList", i);
					this.favoriteDialog = s;
					if (this.FavoriteAvailable) {
						if (m.getProperty("/favorites").length === 0) {
							s.insertItem(b, 0);
						} else {
							s.insertItem(f, 0);
						}
						if (m.getProperty("/projects").length === 0) {
							s.insertItem(n, m.getProperty("/favorites").length + 1);
						} else {
							s.insertItem(w, m.getProperty("/favorites").length + 1);
						}
					} else {
						if (m.getProperty("/projects").length === 0) {
							s.insertItem(n, 0);
						} else {
							s.insertItem(w, 0);
						}
					}
				},
				onFavoriteInputHelp: function(e) {
					var s = this,
						D;
					this.favDialogHeaders = [];
					if (this.FavoriteAvailable) {
						D = this.oBundle.getText("SELECT_FAVORITE");
					} else {
						D = this.oBundle.getText("SELECT_WORKLIST");
					}
					var S = new sap.m.SelectDialog({
						title: D,
						liveChange: [this.onLiveFavChange, this]
					});
					this.bindFavDialog(S);
					S.open();
					var a = arguments[0].getSource(),
						t, b, c;
					s = this;
					S.attachConfirm(function(d) {
						var f = d.getParameter("selectedItem");
						if (f.data().type) {
							s.favoriteSelected = true;
							s.worklistItemSelected = false;
							t = f.data().type;
							b = f.data().items;
							c = f.data().id;
							var g = 0,
								h = 0,
								k = 0,
								i, j, l;
							if (f) {
								a.setValue(f.getTitle());
							}
							if (t === "F") {
								for (var m = 0; m < s.favorites.length; m++) {
									if (s.favorites[m].id === c) {
										if (!s.isClockEntry()) {
											h = s.favorites[m].FavoriteDataFields.CATSHOURS;
											h = parseFloat(h, 10).toFixed(2);
											s.byId("decimalTimeEntryValue").setValue(h);
										} else {
											g = s.favorites[m].FavoriteDataFields.BEGUZ;
											k = s.favorites[m].FavoriteDataFields.ENDUZ;
											if (g !== k) {
												var n = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													pattern: "HHmm"
												});
												var o = sap.ca.ui.model.format.DateFormat.getTimeInstance({
													style: "short"
												});
												g = n.parse(g);
												g = o.format(g);
												k = n.parse(k);
												k = o.format(k);
												s.byId("startTime").setValue(s.favorites[m].FavoriteDataFields.BEGUZ);
												s.byId("endTime").setValue(s.favorites[m].FavoriteDataFields.ENDUZ);
												s.byId("ClkTimeDecimalTimeEntryValue").setEnabled(false);
											} else {
												h = s.favorites[m].FavoriteDataFields.CATSHOURS;
												h = parseFloat(h, 10).toFixed(2);
												s.byId("ClkTimeDecimalTimeEntryValue").setValue(h);
											}
										}
									}
								}
							} else {
								s.byId("decimalTimeEntryValue").setValue("");
								s.byId("startTime").setValue("");
								s.byId("endTime").setValue("");
								s.byId("ClkTimeDecimalTimeEntryValue").setValue("");
							}
							l = s.oApplication.getModel("accountingInfoModel").getData().types;
							for (i = 0; i < l.length; i++) {
								l[i].value = "";
							}
							for (j = 0; j < b.length; j++) {
								for (i = 0; i < l.length; i++) {
									if (l[i].fieldName === b[j].name) {
										l[i].value = b[j].value;
										l[i].valueStateText = b[j].value;
										break;
									}
								}
							}
							s.byId("accountingInfoPanel").setExpanded(true);
							s.getView().getModel().setProperty("/types", l);
							s.oApplication.getModel("accountingInfoModel").setProperty("/types", l);
							s.validateSaveBtnVisibility(d);
						} else {
							s.worklistItemSelected = true;
							s.favoriteSelected = false;
							a.setValue(f.getTitle());
							b = f.data().items;
							var p = f.data().fieldId,
								q = f.data().fieldValue;
							l = s.oApplication.getModel("accountingInfoModel").getData().types;
							for (i = 0; i < l.length; i++) {
								l[i].value = "";
							}
							if (!s.worklistSelectedObj) {
								s.worklistSelectedObj = {};
							}
							if (s.checkFieldName(p)) {
								s.worklistSelectedObj[p] = q;
							}
							for (j = 0; j < b.length; j++) {
								if (s.checkFieldName(b[j].fieldName)) {
									s.worklistSelectedObj[b[j].fieldName] = b[j].fieldValue;
								}
								for (i = 0; i < l.length; i++) {
									if (b[j].fieldName === "LTXA1") {
										s.byId("S31TextArea").setValue(b[j].name);
									}
									var r = f.getTitle() + " " + "(" + q + ")";
									if (l[i].fieldName === p && l[i].value !== r) {
										l[i].value = r;
										l[i].valueStateText = q;
									}
									if (l[i].fieldName === b[j].fieldName) {
										l[i].value = b[j].fieldValue;
										l[i].valueStateText = b[j].name;
										break;
									}
								}
							}
							s.byId("accountingInfoPanel").setExpanded(true);
							s.getView().getModel().setProperty("/types", l);
							s.oApplication.getModel("accountingInfoModel").setProperty("/types", l);
							s.validateSaveBtnVisibility(d);
						}
						S.destroy();
						S = null;
					});
				},
				onInputHelp: function() {
					var s = this;
					var a = {};
					a.name = arguments[0].getSource().getValueStateText();
					a.fieldName = arguments[0].getSource().getName();
					var S = arguments[0].getSource().getParent().getLabel().getText();
					var o = new sap.m.SelectDialog({
						title: S,
						search: [this.onLiveChange, this],
						liveChange: [this.onLiveChange, this]
					});
					var i = new sap.m.StandardListItem({
						title: "{fieldValue}",
						description: "{fieldId}",
						active: true
					});
					s.typeListControl = o;
					s.getValueHelpCollection(a);
					o.setModel(s.oApplication.getModel("createScreenModel"));
					if (a.fieldName.indexOf("/") >= 0) {
						a.fieldName = a.fieldName.split("/").join("-");
					}
					o.bindAggregation("items", "/" + a.fieldName, i);
					o.open();
					var b = arguments[0].getSource();
					o.attachConfirm(function(e) {
						var c = e.getParameter("selectedItem");
						if (c) {
							s.selectedIndex = e.getParameter("selectedItem").getParent().indexOfItem(e.getParameter("selectedItem"));
							if (c.getTitle() === s.oBundle.getText("TAP_TO_LOAD_MORE")) {
								s.tapToLoadMore(a);
								o.open();
								return;
							} else if (c.getTitle() === s.oBundle.getText("CONTINUE_SEARCH_ON_SERVER")) {
								var d = s.continueSearchOnServer(a);
								o.open(d);
								return;
							} else if (c.getTitle() === "(None)") {
								b.setValue("");
								b.setValueStateText("");
							} else {
								b.setValue(c.getTitle() + " " + c.getDescription());
								b.setValueStateText(c.getDescription().replace('(', "").replace(")", ""));
							}
							s.validateSaveBtnVisibility(e);
						}
						o.destroy();
						o = null;
						s.localTypeList = [];
						s.remoteTypeList = [];
						s.resetRemoteSearch();
						s.top = s.RESULTS_TOP;
						s.remoteSkip = 0;
						s.localSkip = 0;
					});
					o.attachCancel(function() {
						o = null;
						s.localTypeList = [];
						s.remoteTypeList = [];
						s.resetRemoteSearch();
						s.top = s.RESULTS_TOP;
						s.remoteSkip = 0;
						s.localSkip = 0;
					});
				},
				getFavoritesCollection: function() {
					var s = this;
					var F, a;
					if (this.FavoriteAvailable) {
						this.oService.getFavorites(this, this.oApplication.pernr, function(d) {
							var f = 0;
							s.favorites = [];
							for (var i = 0; i < d.length; i++) {
								if (d[i].ObjType === "FW") {
									s.favorites[f] = {
										name: d[i].Name,
										type: d[i].ObjType,
										id: d[i].ID,
										FavoriteDataFields: d[i].FavoriteDataFields,
										childs: [],
										info: "",
										active: true,
										subText: d[i].Field_Text
									};
								} else {
									if (parseFloat(d[i].FavoriteDataFields.CATSHOURS)) {
										a = s.oBundle.getText("TOTAL_RECORDED_HOURS", [d[i].FavoriteDataFields.CATSHOURS]);
										if (a.indexOf("Target:") >= 0) {
											a = d[i].FavoriteDataFields.CATSHOURS + " h";
										}
									} else {
										var b = d[i].FavoriteDataFields.BEGUZ,
											e = d[i].FavoriteDataFields.ENDUZ;
										var t = sap.ca.ui.model.format.DateFormat.getTimeInstance({
											pattern: "HHmm"
										});
										var c = sap.ca.ui.model.format.DateFormat.getTimeInstance({
											style: "short"
										});
										b = t.parse(b);
										b = c.format(b);
										e = t.parse(e);
										e = c.format(e);
										a = s.oBundle.getText("WEEK_DATE_RANGE", [b, e]);
									}
									s.favorites[f] = {
										name: d[i].Name,
										type: d[i].ObjType,
										id: d[i].ID,
										FavoriteDataFields: d[i].FavoriteDataFields,
										childs: [],
										info: a,
										active: true,
										subText: d[i].Field_Text
									};
								}
								f++;
							}
							for (i = 0; i < f; i++) {
								F = s.favorites[i].FavoriteDataFields;
								for (var p in F) {
									if (p !== "CATSHOURS" && p !== "PERNR" && p !== "BEGUZ" && p !== "ENDUZ") {
										if (F[p] !== "" && typeof(F[p]) !== "undefined" && parseInt(F[p], 10) !== 0) {
											s.favorites[i].childs.push({
												name: p,
												value: F[p]
											});
										}
									}
								}
							}
							s.oApplication.getModel("createScreenModel").setProperty("/favorites", s.favorites);
							if (s.oApplication.getModel("createScreenModel").getProperty("/projects")) {
								if (s.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 && s.oApplication.getModel(
										"createScreenModel").getProperty("/projects").length === 0) {
									s.byId("accountingInfoPanel").setExpanded(true);
									s.byId("timeAssignmentLbl").setVisible(false);
									s.byId("timeAssignment").setVisible(false);
								}
							}
						});
					}
				},
				getWorkListCollection: function() {
					this.workList = [];
					this.workListType = [];
					var s = this;
					var m = this.oApplication.getModel("TSM_WEEKLY");
					this.searchField_begDa = (m.getProperty("/weekStart"));
					this.searchField_endDa = (m.getProperty("/weekEnd"));
					this.oService.getWorkListCollection(this, this.oApplication.pernr, this.searchField_begDa, this.searchField_endDa, function(d) {
						var w = 0;
						for (var i = 0; i < d.length; i++) {
							if (d[i].Level === 0) {
								s.workList[w] = {
									name: d[i].FieldValueText,
									childs: [],
									fieldName: d[i].FieldName,
									fieldValue: d[i].FieldValue,
									recordNumber: d[i].RecordNumber
								};
								w++;
							}
						}
						for (i = 0; i < d.length; i++) {
							if (d[i].Level !== 0) {
								for (var j = 0; j < s.workList.length; j++) {
									if (s.workList[j].recordNumber === d[i].RecordNumber) {
										s.workList[j].childs.push({
											name: d[i].FieldValueText,
											fieldName: d[i].FieldName,
											fieldValue: d[i].FieldValue
										});
									}
								}
							}
						}
						var p = [];
						for (i = 0; i < s.workList.length; i++) {
							var c = [];
							var a = [];
							var b = [];
							for (j = 0; j < s.workList[i].childs.length; j++) {
								c.push(s.workList[i].childs[j].name);
								a.push(s.workList[i].childs[j].fieldName);
								b.push(s.workList[i].childs[j].fieldValue);
							}
							p.push({
								name: s.workList[i].name,
								subText: c.join(", "),
								type: false,
								childs: s.workList[i].childs,
								fieldName: s.workList[i].fieldName,
								fieldValue: s.workList[i].fieldValue,
								fieldValueId: s.workList[i].name + c.join(", ")
							});
						}
						s.workList = p;
						s.oApplication.getModel("createScreenModel").setProperty("/projects", s.workList);
						if (s.FavoriteAvailable) {
							if (s.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
								if (s.oApplication.getModel("createScreenModel").getProperty("/favorites").length === 0 && s.oApplication.getModel(
										"createScreenModel").getProperty("/projects").length === 0) {
									s.byId("accountingInfoPanel").setExpanded(true);
									s.byId("timeAssignmentLbl").setVisible(false);
									s.byId("timeAssignment").setVisible(false);
								} else {
									s.byId("timeAssignmentLbl").setVisible(true);
									s.byId("timeAssignment").setVisible(true);
								}
							}
						} else {
							if (s.oApplication.getModel("createScreenModel").getProperty("/projects").length === 0) {
								s.byId("accountingInfoPanel").setExpanded(true);
								s.byId("timeAssignmentLbl").setVisible(false);
								s.byId("timeAssignment").setVisible(false);
							} else {
								s.byId("timeAssignmentLbl").setVisible(true);
								s.byId("timeAssignment").setVisible(true);
							}
						}
					});
				},
				valueHelpDataForamtter: function(f, a) {
					if (f) {
						return f + " (" + a + ")";
					}
				},
				durationDateForamtter: function(h, m) {
					return h + ":" + m;
				},
				getProfileFields: function() {
					this.profileFields = [];
					var s = this;
					var a = new sap.ui.model.json.JSONModel();
					this.oApplication.setModel(a, "accountingInfoModel");
					this.oService.getProfileFields(this, this.oApplication.pernr, function(d) {
						var e = {},
							i;
						var b = s.oApplication.getModel("S31modelexch").getData().editentryview;
						var c = s.oApplication.getModel("S31modelexch").getData().copySelected;
						if (b || c) {
							e = s.oApplication.getModel("S31modelexch").getData().editeddata;
							s.validateSaveBtnVisibility();
						}
						for (i = 0; i < d.length; i++) {
							var n = d[i].FieldText;
							var f = d[i].FieldName;
							var g = s.NON_BREAKING_SPACE;
							var h = "";
							var r = d[i].ReadOnly;
							if (s.editCostAssignment) {
								if (s.selectedMainName === f) {
									h = s.selectedMainCode;
									g = s.selectedMainItem;
								} else {
									if ("selectedChildItems" in s) {
										for (var j = 0; j < s.selectedChildNames.length; j++) {
											if (s.selectedChildNames[j] === f) {
												h = s.selectedChildCodes[j];
												g = s.selectedChildItems[j];
											}
										}
									}
								}
							}
							var v = "";
							var k = "";
							if (e && e.entry) {
								if (e.entry.childItems) {
									var l = e.entry.childCodes[e.entry.childNames.indexOf(f)];
									var m = e.entry.childItems[e.entry.childNames.indexOf(f)];
									if (l) {
										v = m + ' (' + l + ')';
									}
									if (m) {
										k = l;
									}
									if (!v) {
										if (f === e.entry.mainName) {
											v = e.entry.mainItem + ' (' + e.entry.mainCode + ')';
											k = e.entry.mainCode;
										}
									}
								} else {
									if (f === e.entry.mainName) {
										v = e.entry.mainItem + ' (' + e.entry.mainCode + ')';
										k = e.entry.mainCode;
									}
								}
							}
							s.profileFields.push({
								name: n,
								selectedName: g,
								fieldName: f,
								listType: "Active",
								labelVisible: true,
								typeVisible: true,
								fieldValue: h,
								value: v,
								valueStateText: k,
								ReadOnly: r.toLowerCase() === "true" ? false : true,
								valueHelp: true
							});
							if (!s.checkDisplayFieldNames(f)) {
								s.profileFields[i].ReadOnly = false;
							}
						}
						a.setProperty("/types", s.profileFields);
						s.oApplication.setModel(a, "accountingInfoModel");
						s.oApplication.getModel("createScreenModel").setProperty("/types", s.profileFields);
						s.getView().setModel(a, "accountingInfoModel");
						s.validateSaveBtnVisibility();
					});
				},
				checkDisplayFieldNames: function(f) {
					var a = ["DISPTEXT", "CPR_", "LTXA1"];
					for (var i = 0; i < a.length; i++) {
						if (f.match(a[i])) {
							return false;
						}
					}
					return true;
				},
				onDone: function() {
					this.entry.showError = false;
					this.entry.error = "";
					this.resetMainAndChildItems();
					var m = true;
					this.entry.notes = this.byId("S31TextArea").getValue();
					m = false;
					var i = this.byId("manualAccountingInfos").getFormElements();
					var v;
					for (var j = 0; j < i.length; j++) {
						var k = i[j].getFields()[0].getName();
						if (i[j].getFields()[0].getValue().split('').indexOf('(') !== -1) {
							v = i[j].getFields()[0].getValueStateText();
						} else {
							v = i[j].getFields()[0].getValue();
						}
						if (!v) {
							v = i[j].getFields()[0].getValue();
						}
						if (v) {
							if (!m) {
								this.entry.mainItem = k;
								this.entry.mainName = k;
								this.entry.mainCode = v;
								m = true;
							} else {
								if (!this.entry.childItems) {
									this.initializeChildItems();
									this.childItemsInitialized = true;
								}
								this.entry.childItems.push(k);
								this.entry.childNames.push(k);
								this.entry.childCodes.push(v);
							}
						}
					}
					if ("childItems" in this.entry) {
						if (this.entry.childItems.length > 1) {
							this.entry.subItems = this.entry.childItems.join(", ");
						} else if (this.entry.childItems.length === 1) {
							this.entry.subItems = this.entry.childItems[0];
						}
					}
					if (m || this.worklistItemSelected) {
						this.onSubmit();
					} else {
						this.initializeChildItems();
					}
				},
				onSubmit: function() {
					this.entry.showError = false;
					this.entry.error = "";
					this.entry.rejectionReason = "";
					this.updatePageData();
				},
				updatePageData: function() {
					var c = this.byId("weeklyCalendar");
					var s = c.getSelectedDates();
					this.entry.selectedDate = s;
					if (!this.isClockEntry() || this.clkTimeDurationFilled) {
						var l;
						if (!this.clkTimeDurationFilled) {
							l = this.byId("decimalTimeEntryValue").getValue();
						} else {
							l = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
						}
						if (l.indexOf(",") > 0) {
							l = l.replace(",", ".");
						}
						this.entry.time = l;
					} else {
						var a = this.byId("startTime").getDateValue(),
							e = this.byId("endTime").getDateValue();
						this.entry.startTime = this.convertTime(a);
						this.entry.endTime = this.convertTime(e);
						var d = (e.getTime() - a.getTime()) / (1000 * 60);
						this.entry.hours = parseInt((d / 60), 10);
						this.entry.minutes = d % 60;
						this.entry.time = "0.0";
					}
					this.entry.hasNotes = (this.entry.notes && this.entry.notes.length > 0) ? true : false;
					this.submitToOdata();
				},
				convertTime: function(d) {
					var t = sap.ui.core.format.DateFormat.getTimeInstance({
						pattern: "HHmmss"
					});
					return t.format(d);
				},
				formatAMPM: function(d) {
					var h = d.getHours();
					var m = d.getMinutes();
					var a = h >= 12 ? 'PM' : 'AM';
					h = h % 12;
					h = h ? h : 12;
					m = m < 10 ? '0' + m : m;
					var s = h + ':' + m + ' ' + a;
					return s;
				},
				submitToOdata: function() {
					var s = this,
						c = this.byId('weeklyCalendar'),
						a = c.getSelectedDates(),
						S, t;
					this.errors = null;
					var b = null,
						i = 0,
						d, e, f, g, h, p, j;
					if (this.isClockEntry() && !this.clkTimeDurationFilled) {
						d = this.byId("startTime").getDateValue();
						e = this.byId("endTime").getDateValue();
					}
					if (!this.isClockEntry() || this.clkTimeDurationFilled) {
						if (this.clkTimeDurationFilled) {
							g = this.getView().byId("ClkTimeDecimalTimeEntryValue").getValue();
						} else {
							g = this.getView().byId("decimalTimeEntryValue").getValue();
						}
						if (g.indexOf(",") > (-1)) {
							g = g.replace(",", ".");
						}
						g = parseFloat(g);
						g = g.toFixed(2);
						h = sap.ca.ui.model.format.NumberFormat.getInstance({
							style: 'standard'
						}).format(g);
						f = h;
					}
					if (!this.releaseAllowed) {
						p = this.oBundle.getText('DRAFT_CONFIRMATION_SUMMARY');
						j = this.oConfiguration.getText("DRAFT_CONFIRMATION");
					} else {
						p = this.oBundle.getText('SUBMISSION_CONFIRMATION_SUMMARY');
						j = this.oConfiguration.getText("SUBMISSION_CONFIRMATION");
					}
					t = sap.ca.ui.model.format.DateFormat.getTimeInstance({
						style: "short"
					});
					if (this.isClockEntry() && !this.clkTimeDurationFilled) {
						if (this.byId("startTime").getDisplayFormat() === "hh:mm a" || this.byId("startTime").getDisplayFormat() === "h:mm a") {
							d = this.formatAMPM(d);
							e = this.formatAMPM(e);
						} else {
							d = t.format(d);
							e = t.format(e);
						}
						S = {
							question: p,
							additionalInformation: [{
								label: this.oBundle.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: a.length.toString()
							}, {
								label: this.oBundle.getText('START_TIME'),
								text: d
							}, {
								label: this.oBundle.getText('END_TIME'),
								text: e
							}],
							showNote: false,
							title: j,
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					} else {
						S = {
							question: p,
							additionalInformation: [{
								label: this.oBundle.getText('DELETE_CONFIRMATION_SUMMARY_ENTRIES'),
								text: a.length.toString()
							}, {
								label: this.oBundle.getText('DURATION'),
								text: f
							}],
							showNote: false,
							title: j,
							confirmButtonLabel: this.oBundle.getText("OK")
						};
					}
					this.openConfirmationPopup(S, function(r) {
						var k = [],
							w = "";
						var o = (s.oApplication.getModel("S31modelexch").getData().editentryview) ? "U" : "C";
						if (a.length !== 0) {
							for (i = 0; i < a.length; i++) {
								s.entry = s.replaceSpecialChar(s.entry);
								w = s.getDateTimeStr(new Date(a[i]));
								k.push(s.setPostObject(s.entry.counter, o, w, s.entry.time, s.entry.mainName, s.entry.mainCode, s.entry.notes, s.entry.startTime,
									s.entry.endTime, s.entry.subItems, s.entry.childCodes, s.entry.childNames));
							}
						}
						if (k.length === 0) {
							b.close();
						} else {
							s.oService.submitTimeEntry(s, k, [], [], function() {
								var l;
								if (!s.releaseAllowed) {
									l = s.oBundle.getText("DRAFT_SUCCESS");
								} else {
									l = s.oBundle.getText("SUBMIT_SUCCESS");
								}
								var m = s.byId("weeklyCalendar");
								var n = m.getCurrentDate();
								var q = n;
								n = q + "offset" + m.getFirstDayOffset();
								var M = new sap.ui.model.json.JSONModel();
								M.setProperty("/currentDate", new Date(q));
								s.oApplication.setModel(M, "S3exchangeModel");
								delete s.entry;
								s.cleanUpOnBack();
								s.oRouter.navTo("S3", {
									context: n
								}, true);
								sap.m.MessageToast.show(l);
							}, function(l, m) {
								var n = s.byId("weeklyCalendar");
								n.unselectAllDates();
								n.toggleDatesSelection(m, true);
							});
						}
					});
				},
				openConfirmationPopup: function(s, a) {
					var b = this;
					var e = [];
					for (var i = 0; i < s.additionalInformation.length; i++) {
						e.push(new sap.m.Label({
							text: s.additionalInformation[i].label,
							design: "Bold"
						}));
						e.push(new sap.m.Text({
							text: s.additionalInformation[i].text
						}));
					}
					var f = new sap.ui.layout.form.SimpleForm({
						minWidth: 1024,
						editable: false,
						maxContainerCols: 2,
						layout: "ResponsiveGridLayout",
						labelSpanL: 7,
						labelSpanM: 7,
						labelSpanS: 7,
						emptySpanL: 1,
						emptySpanM: 1,
						emptySpanS: 1,
						columnsL: 1,
						columnsM: 1,
						columnsS: 1,
						content: e
					});
					var c = new sap.m.Dialog({
						title: s.title,
						content: [f],
						beginButton: new sap.m.Button({
							text: s.confirmButtonLabel,
							press: function() {
								a();
								c.close();
							}
						}),
						endButton: new sap.m.Button({
							text: this.oBundle.getText("CANCEL"),
							press: function() {
								c.close();
							}
						})
					});
					c.addStyleClass("sapUiContentPadding sapUiMediumMarginTopBottom");
					c.open();
				},
				replaceAllOccurances: function(s) {
					if (typeof s === "undefined") {
						return;
					}
					var S = '/';
					var r = '-';
					while (s.indexOf(S) > -1) {
						s = s.replace(S, r);
					}
					return s;
				},
				replaceSpecialChar: function(e) {
					if (typeof e.mainName !== "undefined") {
						e.mainName = this.replaceAllOccurances(e.mainName);
					}
					if (typeof e.subItems !== "undefined") {
						e.subItems = this.replaceAllOccurances(e.subItems);
					}
					if (typeof e.childNames !== "undefined") {
						for (var i = 0; i < e.childNames.length; i++) {
							e.childNames[i] = this.replaceAllOccurances(e.childNames[i]);
						}
					}
					return e;
				},
				getPostData: function(d, e) {
					var p = {};
					p.day = d;
					p.entry = e;
					return p;
				},
				setPostObject: function(C, T, W, a, N, b, n, s, e, c, d, f) {
					var t = {
						Pernr: this.oApplication.pernr,
						Counter: C,
						TimeEntryOperation: T,
						TimeEntryDataFields: {
							WORKDATE: W,
							CATSAMOUNT: "" + a
						}
					};
					if (this.isClockEntry()) {
						t.TimeEntryDataFields.BEGUZ = s;
						t.TimeEntryDataFields.ENDUZ = e;
					}
					t.TimeEntryRelease = " ";
					if (N) {
						if (N.indexOf("-") >= 0) {
							N = N.split("-").join("/");
						}
						if (this.checkFieldName(N) === true) {
							t.TimeEntryDataFields[N] = b;
						}
					}
					if (c && c !== "") {
						for (var i = 0; i < f.length; i++) {
							if (f[i].indexOf("-") >= 0) {
								f[i] = f[i].split("-").join("/");
							}
							if (this.checkFieldName(f[i]) === true) {
								t.TimeEntryDataFields[f[i]] = d[i];
							}
						}
					}
					if (this.worklistItemSelected) {
						t.TimeEntryDataFields = this.addWorklistFields(t.TimeEntryDataFields);
					}
					if (n && n !== "") {
						t.TimeEntryDataFields.LONGTEXT_DATA = n;
						t.TimeEntryDataFields.LONGTEXT = "X";
					}
					if (t.TimeEntryDataFields.hasOwnProperty("SPLIT")) {
						t.TimeEntryDataFields.SPLIT = parseInt(t.TimeEntryDataFields.SPLIT, 10);
					}
					if (this.extHookChangeObjectBeforePost) {
						t = this.extHookChangeObjectBeforePost(t);
					}
					return t;
				},
				checkFieldName: function(f) {
					var c = f;
					if (c.match("DISPTEXT")) {
						return false;
					}
					if (c.match("CPR_OBJTEXT")) {
						return false;
					}
					if (c.match("CPR_TEXT")) {
						return false;
					}
					return true;
				},
				addWorklistFields: function(o) {
					for (var w in this.worklistSelectedObj) {
						if (o.hasOwnProperty(w) || o[w] === "LTXA1") {
							continue;
						} else {
							o[w] = this.worklistSelectedObj[w];
						}
					}
					return o;
				},
				parseDateYYYYMMdd: function(d) {
					var a = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "YYYYMMdd"
					});
					return a.parse(d);
				},
				onCancel: function() {
					var c = this.byId("weeklyCalendar");
					var s = c.getCurrentDate();
					var d = s;
					s = d + "offset" + c.getFirstDayOffset();
					var m = new sap.ui.model.json.JSONModel();
					m.setProperty("/currentDate", new Date(d));
					this.oApplication.setModel(m, "S3exchangeModel");
					this.cleanUpOnBack();
					delete this.entry;
					this.oRouter.navTo("S3", {
						context: s
					}, true);
				},
				onReset: function() {
					this.byId("timeAssignment").setValue("");
					this.byId("createPanel").setHeaderText(this.oBundle.getText("ENTRY_DETAILS"));
					this.byId("decimalTimeEntryValue").setValue("");
					this.byId("startTime").setValue("");
					this.byId("endTime").setValue("");
					this.byId("weeklyCalendar").setDisabledWeekDays([]);
					this.byId("weeklyCalendar").unselectAllDates();
					this.byId("S31TextArea").setValue("");
					this.byId("ClkTimeDecimalTimeEntryValue").setValue("");
					this.byId("ClkTimeDecimalTimeEntryValue").setEnabled(true);
					this.setBtnEnabled("SUBMIT_BTN", false);
					delete this.worklistSelectedObj;
					this.worklistSelectedObj = {};
					this.worklistItemSelected = false;
					var t = this.oApplication.getModel("accountingInfoModel").getData().types;
					for (var i = 0; i < t.length; i++) {
						if (t[i].value !== "" || t[i].valueStateText !== "") {
							t[i].value = "";
							t[i].valueStateText = "";
						}
					}
					if (this.isClockEntry() && this.byId("ClkTimeDecimalTimeEntryValue").getVisible()) {
						this.entry.startTime = "000000";
						this.entry.endTime = "000000";
						this.entry.time = "";
					}
					this.getView().getModel().setProperty("/types", t);
					this.oApplication.getModel("accountingInfoModel").setProperty("/types", t);
				},
				openEditfavDialog: function() {
					if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
						this.getFavoritesCollection();
					}
					var i = new sap.ui.core.Item({
						text: "{name}",
						key: "{id}"
					});
					this.editFavForm = new sap.ui.layout.form.Form({
						maxContainerCols: 2,
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanL: 4,
							emptySpanL: 3,
							labelSpanM: 4,
							emptySpanM: 2,
							columnsL: 1,
							columnsM: 1
						}),
						formContainers: new sap.ui.layout.form.FormContainer({
							formElements: [new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("EXISTING_FAV_NAME")
								}),
								fields: new sap.m.Select().bindAggregation("items", "/favorites", i)
							}), new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("NEW_FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateEditFavSaveBtn, this],
									maxLength: 30
								})
							})]
						})
					}).setModel(this.oApplication.getModel("createScreenModel"));
					this.editFavDialog = new sap.m.Dialog({
						title: this.oBundle.getText("EDIT_FAVORITE"),
						content: [this.editFavForm],
						beginButton: new sap.m.Button({
							text: this.oBundle.getText("SAVE"),
							enabled: false,
							press: [this.updateFavorites, this]
						}),
						endButton: new sap.m.Button({
							text: this.oBundle.getText("CANCEL"),
							press: jQuery.proxy(function() {
								this.editFavDialog.close();
							}, this)
						}),
						afterClose: jQuery.proxy(function() {
							this.editFavDialog.destroy();
						}, this)
					});
					this.editFavDialog.addStyleClass("sapUiContentPadding");
					this.editFavDialog.open();
				},
				validateEditFavSaveBtn: function(e) {
					var n = e.getParameters("value");
					var o = this.editFavForm.getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedKey();
					if (!n.value || o === "") {
						this.editFavDialog.getBeginButton().setEnabled(false);
					} else {
						this.editFavDialog.getBeginButton().setEnabled(true);
					}
				},
				openFavDialog: function() {
					var f = new sap.ui.layout.form.Form({
						maxContainerCols: 2,
						layout: new sap.ui.layout.form.ResponsiveGridLayout({
							labelSpanL: 4,
							emptySpanL: 3,
							labelSpanM: 4,
							emptySpanM: 2,
							columnsL: 1,
							columnsM: 1
						}),
						formContainers: new sap.ui.layout.form.FormContainer({
							formElements: [new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({
									text: this.oBundle.getText("FAVORITE_NAME")
								}),
								fields: new sap.m.Input({
									liveChange: [this.validateSaveFavSaveBtn, this],
									maxLength: 30
								})
							}), new sap.ui.layout.form.FormElement({
								label: new sap.m.Label({}),
								fields: new sap.m.CheckBox({
									text: this.oBundle.getText("SAVE_FAVORITE_WITH_TIME")
								})
							})]
						})
					});
					this.favDialog = new sap.m.Dialog({
						title: this.oBundle.getText("ADD_FAVORITE"),
						type: "Message",
						content: [f],
						beginButton: new sap.m.Button({
							text: this.oBundle.getText("SAVE"),
							enabled: false,
							press: jQuery.proxy(this.addFavorite, this)
						}),
						endButton: new sap.m.Button({
							text: this.oBundle.getText("CANCEL"),
							press: jQuery.proxy(function() {
								this.favDialog.close();
							}, this)
						}),
						afterClose: jQuery.proxy(function() {
							this.favDialog.destroy();
						}, this)
					});
					this.favDialog.addStyleClass("sapUiContentPadding");
					this.favDialog.open();
				},
				validateSaveFavSaveBtn: function(e) {
					var f = e.getParameter("value");
					if (f.trim() !== "") {
						this.favDialog.getBeginButton().setEnabled(true);
					} else {
						this.favDialog.getBeginButton().setEnabled(false);
					}
				},
				addFavorite: function() {
					var f, s = this;
					var n = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getValue();
					var w = this.favDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getSelected();
					f = this.setFavoritePostObject(n);
					var t;
					if (n === "") {
						t = this.oBundle.getText("FAV_NAME_ERROR");
						sap.m.MessageToast.show(t);
					} else if (f === null) {
						t = this.oBundle.getText("FAV_DATA_ERROR");
						sap.m.MessageToast.show(t);
					} else {
						if (w) {
							var a = this.byId("decimalTimeEntryValue").getValue();
							var b = this.byId("startTime").getValue(),
								e = this.byId("endTime").getValue();
							if (!this.isClockEntry() || this.clkTimeDurationFilled) {
								if (this.clkTimeDurationFilled) {
									a = this.byId("ClkTimeDecimalTimeEntryValue").getValue();
								}
								if (a === "" || !this._isValidDecimalNumber(a)) {
									t = this.oBundle.getText("FAV_TIME_ERROR");
									sap.m.MessageToast.show(t);
									return;
								} else {
									f.FavoriteDataFields.CATSHOURS = a;
								}
							} else {
								if (b === "" || e === "" || b === e) {
									t = this.oBundle.getText("FAV_CLOCK_TIME_ERROR");
									sap.m.MessageToast.show(t);
									return;
								} else {
									f.FavoriteDataFields.BEGUZ = b;
									f.FavoriteDataFields.ENDUZ = e;
								}
							}
						}
						if (!this.oService) {
							this.oService = new cfr.etsapp.manage.Service();
						}
						this.oService.createFavorite(this, f, function(d) {
							var c = {
								name: d.Name,
								type: d.ObjType,
								id: d.ID,
								FavoriteDataFields: d.FavoriteDataFields,
								childs: [],
								info: "",
								subText: d.Field_Text,
								active: true
							};
							var F = c.FavoriteDataFields;
							var g = s.oApplication.getModel("createScreenModel").getProperty("/favorites");
							for (var p in f.FavoriteDataFields) {
								if (p !== "CATSHOURS" && p !== "BEGUZ" && p !== "ENDUZ") {
									F[p] = f.FavoriteDataFields[p];
									c.childs.push({
										name: p,
										value: F[p]
									});
								} else {
									if (s.isClockEntry() && !s.clkTimeDurationFilled) {
										var h = sap.ca.ui.model.format.DateFormat.getTimeInstance({
											pattern: "HHmm"
										});
										var i = sap.ca.ui.model.format.DateFormat.getTimeInstance({
											style: "short"
										});
										b = h.parse(b);
										b = i.format(b);
										e = h.parse(e);
										e = i.format(e);
									}
									F[p] = f.FavoriteDataFields[p];
									switch (p) {
										case "CATSHOURS":
											c.info = s.oBundle.getText("TOTAL_RECORDED_HOURS", [f.FavoriteDataFields.CATSHOURS]);
											break;
										case "BEGUZ":
										case "ENDUZ":
											c.info = s.oBundle.getText("WEEK_DATE_RANGE", [b, e]);
									}
								}
							}
							if (!d.Field_Text) {
								var k = c.childs,
									l = "";
								for (var j = 0; j < k.length; j++) {
									l += k[j].name + ":" + k[j].value + ",";
								}
								l = l.substring(0, l.length - 1);
								c.subText = l;
							}
							g.push(c);
							s.byId("timeAssignmentLbl").setVisible(true);
							s.byId("timeAssignment").setVisible(true);
							s.favDialog.close();
							s.oApplication.getModel("createScreenModel").refresh();
						});
					}
				},
				updateFavorites: function() {
					var f = {};
					var i;
					f.Name = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[1].getFields()[0].getValue();
					var o = this.editFavDialog.getContent()[0].getFormContainers()[0].getFormElements()[0].getFields()[0].getSelectedItem().getText();
					var a = this.oApplication.getModel("createScreenModel").getProperty("/favorites");
					f.Pernr = this.oApplication.pernr;
					for (i = 0; i < a.length; i++) {
						if (o === a[i].name) {
							f.ID = a[i].id;
							a[i].name = f.Name;
							if (o === this.byId("timeAssignment").getValue()) {
								this.byId("timeAssignment").setValue(f.Name);
							}
							break;
						}
					}
					if (!this.oService) {
						this.oService = new cfr.etsapp.manage.Service();
					}
					this.oService.updateFavorite(this, f, jQuery.proxy(function() {
						this.oApplication.getModel("createScreenModel").setProperty("/favorites", a);
						this.oApplication.getModel("createScreenModel").refresh();
						this.editFavDialog.close();
					}, this));
				},
				setFavoritePostObject: function(n) {
					var f, a, b, v;
					f = {};
					b = {};
					var t = this.oApplication.getModel("accountingInfoModel").getData().types;
					a = n;
					var c = false;
					for (var i = 0; i < t.length; i++) {
						v = "";
						if (t[i].value !== "" && t[i].valueStateText !== "") {
							if (t[i].value !== "") {
								v = t[i].valueStateText;
								c = true;
							}
							b[t[i].fieldName] = v;
						}
					}
					if (c) {
						f = {
							Pernr: this.oApplication.pernr,
							Name: a,
							FavoriteDataFields: b
						};
					} else {
						f = null;
					}
					return f;
				},
				handleDelete: function(e) {
					var s = this;
					var a = e.getParameter("listItem");
					var b = a.getCustomData()[2].getValue();
					if (!this.oService) {
						this.oService = new cfr.etsapp.manage.Service();
					}
					var f = {
						Name: e.getParameter("listItem").getTitle(),
						ID: b,
						Pernr: this.oApplication.pernr
					};
					this.oService.deleteFavorite(this, f, function() {
						e.getSource().removeItem(a);
						s.favoriteDeletedIds.push(b);
					});
				},
				editFavorites: function(e) {
					var s = this;
					var m = new sap.m.Button({
						text: s.oBundle.getText("DELETE_FAVORITES"),
						press: function(e) {
							s.manageFavorites(e);
							s.oApplication.getModel("createScreenModel").refresh();
							s.actionSheet.close();
						}
					});
					var E = new sap.m.Button({
						text: s.oBundle.getText("EDIT_FAVORITE"),
						press: function(e) {
							s.openEditfavDialog(e);
							s.actionSheet.close();
						}
					});
					var a = new sap.m.Button({
						text: s.oBundle.getText("SAVE_AS_FAV"),
						press: function(e) {
							s.openFavDialog();
							s.actionSheet.close();
						}
					});
					var A = new sap.m.ActionSheet({
						placement: sap.m.PlacementType.Top,
						showCancelButton: true,
						buttons: [E, m, a]
					});
					A.openBy(e.getSource());
					this.actionSheet = A;
				},
				manageFavorites: function() {
					var s = this;
					var c = new sap.m.Button({
						text: this.oBundle.getText("OK")
					});
					if (!this.oApplication.getModel("createScreenModel").getProperty("/favorites")) {
						this.getFavoritesCollection();
					}
					var d = new sap.m.StandardListItem({
						title: "{name}",
						description: "{subText}",
						active: "true",
						info: "{info}",
						customData: [new sap.ui.core.CustomData({
							key: "items",
							value: "{childs}"
						}), new sap.ui.core.CustomData({
							key: "type",
							value: "{type}"
						}), new sap.ui.core.CustomData({
							key: "id",
							value: "{id}"
						})]
					});
					this.favList = new sap.m.List({
						mode: "Delete"
					}).bindAggregation("items", "/favorites", d);
					this.favList.attachDelete(function(a) {
						s.handleDelete(a);
					});
					var e = new sap.m.Dialog({
						title: this.oBundle.getText("FAV_DIALOG_BOX"),
						content: [this.favList],
						beginButton: c,
						afterClose: jQuery.proxy(function() {
							e.destroy();
						}, this)
					});
					e.setModel(this.oApplication.getModel("createScreenModel"));
					c.attachPress(function() {
						if (s.favoriteDeletedIds.length) {
							var f = [],
								g = 0;
							var h = s.oApplication.getModel("createScreenModel").getProperty("/favorites");
							for (g = 0; g < s.favoriteDeletedIds.length; g++) {
								for (var i = 0; i < h.length; i++) {
									if (s.favoriteDeletedIds[g] === h[i].id) {
										f.push(i);
										break;
									}
								}
							}
							f.sort(function(a, b) {
								return b - a;
							});
							for (i = 0; i < f.length; i++) {
								h.splice(f[i], 1);
							}
							s.favoriteDeletedIds = [];
						}
						e.close();
					});
					e.open();
				},
				isClockEntry: function() {
					return this.clockEntry;
				},
				resetMainAndChildItems: function() {
					if ("mainItem" in this.entry) {
						this.deleteMainItem();
					}
					if ("subItems" in this.entry) {
						this.deleteSubItems();
					}
				},
				deleteMainItem: function() {
					delete this.entry.mainItem;
					delete this.entry.mainName;
					delete this.entry.mainCode;
				},
				deleteSubItems: function() {
					delete this.entry.subItems;
					delete this.entry.childItems;
					delete this.entry.childNames;
					delete this.entry.childCodes;
				},
				initializeChildItems: function() {
					this.entry.childItems = [];
					this.entry.childNames = [];
					this.entry.childCodes = [];
				},
				getHderFooterOptions: function() {
					if (this.oApplication.pernr) {
						var c = this.oApplicationFacade.getResourceBundle().getText("CANCEL");
						var r = this.oApplicationFacade.getResourceBundle().getText("RESET");
						var e = this.oApplicationFacade.getResourceBundle().getText("FAVORITE");
						var s = this.oApplication.getModel("S31modelexch");
						var a;
						if (!this.oApplication.getModel("TSM_WEEKLY").getData().releaseAllowed) {
							a = this.oApplicationFacade.getResourceBundle().getText("SAVE_DRAFT");
						} else {
							a = this.oApplicationFacade.getResourceBundle().getText("SUBMIT");
						}
						var b;
						if (!s) {
							b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_CREATE_ENTRY_TITLE");
						} else {
							if (s.getProperty("/editentryview")) {
								b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_EDIT_ENTRY_TITLE_SCREEN");
							} else {
								b = this.oApplicationFacade.getResourceBundle().getText("TIMESHEET_CREATE_ENTRY_TITLE");
							}
						}
						var t = this;
						var v = {
							sId: "SUBMIT_BTN",
							sI18nBtnTxt: a,
							onBtnPressed: function(d) {
								t.onDone(d);
							}
						};
						var o = {
							sI18NFullscreenTitle: b,
							oEditBtn: v,
							buttonList: [{
								sId: "cancelBtn",
								sI18nBtnTxt: c,
								onBtnPressed: function(d) {
									t.onCancel(d);
								}
							}, {
								sId: "resetBtn",
								sI18nBtnTxt: r,
								onBtnPressed: function() {
									t.onReset();
								}
							}],
							onBack: jQuery.proxy(function() {
								this.onNavButton();
							}, this)
						};
						if (this.oApplication.getModel("TSM_WEEKLY").getData().favoriteAvailable) {
							o.buttonList[2] = {
								sId: "EditFavoriteBtn",
								sI18nBtnTxt: e,
								onBtnPressed: function(d) {
									t.editFavorites(d);
								}
							};
						}
						var m = new sap.ui.core.routing.HashChanger();
						var u = m.getHash();
						if (u.indexOf("Shell-runStandaloneApp") >= 0) {
							o.bSuppressBookmarkButton = true;
						}
						if (this.extHookChangeHeaderFooterOptions) {
							o = this.extHookChangeHeaderFooterOptions(o);
						}
						this.setHeaderFooterOptions(o);
					}
				}
			});
		},
		"cfr/etsapp/view/S31.view.xml": '<!--\n\n    Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved\n\n-->\n<sap.ui.core:View controllerName="cfr.etsapp.manage.view.S31"\n\txmlns="sap.m" xmlns:sap.ui.layout.form="sap.ui.layout.form"\n\txmlns:sap.ui.layout="sap.ui.layout" xmlns:sap.me="sap.me"\n\txmlns:sap.ui.core="sap.ui.core">\n\t<Page id="page" title="{i18n>MANUAL_INPUT_EDIT}" showNavButton="true"\n\t\t enableScrolling="true" navButtonPress="onNavButton">\n\t\t<content>\n\t\t\t<sap.me:Calendar id="weeklyCalendar" singleRow="true" \n\t\t\t\tweeksPerRow="2" design="Approval" enableMultiselection="true"\n\t\t\t\tcurrentDate="{ path: \'/start\', formatter:\'.parseDateYYYYMMdd\' }"\n\t\t\t\ttapOnDate="onTapOnDate" changeRange="onChangeRange" hideNavControls="false">\n\t\t\t</sap.me:Calendar>\n\n\n\t\t\t<sap.ui.layout:Grid defaultSpan="L8 M8 S12"\n\t\t\t\tdefaultIndent="L2 M2 S0" width="auto">\n\t\t\t\t<sap.ui.layout:content>\n\t\t\t\t<Panel id = "createPanel" headerText="{i18n>ENTRY_DETAILS}">\n\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="createFormTitle"\n\t\t\t\t\t\tmaxContainerCols="2">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout\n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="2" columnsM="2"/>\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="firstContainer" visible="true">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="timeAssignmentLbl" class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{i18n>SELECT_FAVORITE}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="timeAssignment" \n\t\t\t\t\t\t\t\t\t\t\t\tshowValueHelp="true" valueHelpRequest="onFavoriteInputHelp" valueHelpOnly="true"\n\t\t\t\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onFavoriteItemSelection\'\n\t\t\t\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/decimalTimeEntryVisible}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="decimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="decimalTimeEntryValue" value="{entry>/time}" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement\n\t\t\t\t\t\t\t\t\t\tvisible="{/clockEntry}">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="startTimeLbl" class="sapUiSmallMarginTop" text="{i18n>TIME}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="startTime" type="Time" placeholder="{i18n>FROM}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/startTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t\t<DateTimeInput id="endTime" type="Time" placeholder="{i18n>TO}"\n\t\t\t\t\t\t\t\t\t\t\t\tvalueFormat="HHmmss" value="{entry>/endTime}" change="validate">\n\t\t\t\t\t\t\t\t\t\t\t</DateTimeInput>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement id="ClkTimeDurationEle"\n\t\t\t\t\t\t\t\t\t\tvisible="false">\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label id="ClkTimeDecimalInputLbl" class="sapUiSmallMarginTop" text="{i18n>DURATION}">\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input id="ClkTimeDecimalTimeEntryValue" type="Text"\n\t\t\t\t\t\t\t\t\t\t\t\tchange="onDecimalTimeValueChange">\n\t\t\t\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<!-- extension point for adding Form Elements in the inputs section in the first form -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementForInputs"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label text="{i18n>NOTE}" class="sapUiSmallMarginTop" />\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<TextArea id=\'S31TextArea\' value="{entry>/notes}">\n\n\t\t\t\t\t\t\t\t\t\t\t</TextArea>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:formElements>\n\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t</content>\n\t\t\t\t\t</Panel>\n\t\t\t\t    <Panel id="accountingInfoPanel" expandable="true" expanded="false" headerText="{i18n>COST_ASSIGNMENT}">\n\t\t\t\t\t\t\t\t\t<content>\n\t\t\t\t\t<sap.ui.layout.form:Form id="accountingInfos" \n\t\t\t\t\t\tmaxContainerCols="1">\n\t\t\t\t\t\t<sap.ui.layout.form:layout>\n\t\t\t\t\t\t\t<sap.ui.layout.form:ResponsiveGridLayout \n\t\t\t\t\t\t\t\tlabelSpanL="4" emptySpanL="3" \n\t\t\t\t\t\t\t\tlabelSpanM="4" emptySpanM="2" \n\t\t\t\t\t\t\t\tcolumnsL="1" columnsM="1" />\n\t\t\t\t\t\t</sap.ui.layout.form:layout>\n\t\t\t\t\t\t<sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t<sap.ui.layout.form:FormContainer\n\t\t\t\t\t\t\t\tid="manualAccountingInfos" formElements="{accountingInfoModel>/types}">\n\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t<!-- extension point for additional Form Element for accounting Infos -->\t\n        \t\t                    <sap.ui.core:ExtensionPoint name="extS31FormElementAccountingInfos"></sap.ui.core:ExtensionPoint>\n\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\tweight="8" linebreak="true">\n\t\t\t\t\t\t\t\t\t\t\t</sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:layoutData>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t\t<Label class="sapUiSmallMarginTop"\n\t\t\t\t\t\t\t\t\t\t\t\ttext="{accountingInfoModel>name}">\n\t\t\t\t\t\t\t\t\t\t\t\t<layoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<sap.ui.layout:ResponsiveFlowLayoutData\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tweight="1"></sap.ui.layout:ResponsiveFlowLayoutData>\n\t\t\t\t\t\t\t\t\t\t\t\t</layoutData>\n\t\t\t\t\t\t\t\t\t\t\t</Label>\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:label>\n\t\t\t\t\t\t\t\t\t\t<sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\t<Input showValueHelp="{accountingInfoModel>valueHelp}"\n\t\t\t\t\t\t\t\t\tname="{accountingInfoModel>fieldName}"\n\t\t\t\t\t\t\t\t\tvalueStateText="{accountingInfoModel>valueStateText}"\n\t\t\t\t\t\t\t\t\tvalueHelpRequest="onInputHelp"\n\t\t\t\t\t\t\t\t\tliveChange=\'manualHelpChange\'\n\t\t\t\t\t\t\t\t\tsuggestionItemSelected=\'onManualItemSelection\'\n\t\t\t\t\t\t\t\t\tvalue="{accountingInfoModel>value}"\n\t\t\t\t\t\t\t\t\tenabled="{accountingInfoModel>ReadOnly}">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</Input>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:fields>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormElement>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:FormContainer>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:formContainers>\n\t\t\t\t\t\t\t\t\t</sap.ui.layout.form:Form>\n\t\t\t\t\t\t\t\t\t</content>\n\t\t\t\t\t\t\t\t\t\t</Panel>\n\t\t\t\t</sap.ui.layout:content>\n\t\t\t</sap.ui.layout:Grid>\n\t\t\t\n\t\t</content>\n\t</Page>\n</sap.ui.core:View>'
	}
});