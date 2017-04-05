/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cfr.etsapp.manage.utils.InitialConfigHelper");
jQuery.sap.require("cfr.etsapp.manage.utils.DataManager");
/*global hcm:true */
cfr.etsapp.manage.Configuration.extend("cfr.etsapp.manage.utils.InitialConfigHelper", {
			
		getText : function(sKey, aParams) {
			return this.oBundle.getText(sKey, aParams);
		},
		getInitialInfoModel: function(){
			return this.initialInfoModel;
		},
		setInitialInfoModel: function(initialInfoModel){
			this.initialInfoModel = initialInfoModel;
		},
		setResourceBundle: function(resourceBundle){
			this.oBundle = resourceBundle;
		}
	
});