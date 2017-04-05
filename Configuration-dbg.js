/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cfr.etsapp.manage.Configuration");
jQuery.sap.require("sap.ca.scfld.md.ConfigurationBase");
jQuery.sap.require("sap.ca.scfld.md.app.Application");

sap.ca.scfld.md.ConfigurationBase.extend("cfr.etsapp.manage.Configuration", {

	oServiceParams: {
		serviceList: [
			{
			    name: "ETSAPP_SRV",
                masterCollection: "Favorites",
                serviceUrl: hcm.mytimesheet.Component.getMetadata().getManifestEntry("sap.app").dataSources["ETSAPP_SRV"].uri, //oData service relative path
                isDefault: true,
                mockedDataSource: "/cfr.etsapp.manage/model/metadata.xml"}
		]
	},

	getServiceParams: function () {
		return this.oServiceParams;
	},

	getAppConfig: function() {
		return this.oAppConfig;
	},

	getServiceList: function () {
		return this.oServiceParams.serviceList;
	}

});