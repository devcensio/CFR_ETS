/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
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