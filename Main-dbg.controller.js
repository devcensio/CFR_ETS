/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
sap.ui.controller("cfr.etsapp.manage.Main", {

	onInit: function() {
		jQuery.sap.require("sap.ca.scfld.md.Startup");
		sap.ca.scfld.md.Startup.init("cfr.etsapp.manage", this);
// 		var effectiveUrl = jQuery.sap.getModulePath("cfr.etsapp.manage") + "/" + "css/mts.css";
// 		jQuery.sap.includeStyleSheet(effectiveUrl, "notes_css");
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