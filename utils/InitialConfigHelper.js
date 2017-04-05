/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("cfr.etsapp.manage.utils.InitialConfigHelper");jQuery.sap.require("cfr.etsapp.manage.utils.DataManager");cfr.etsapp.manage.Configuration.extend("cfr.etsapp.manage.utils.InitialConfigHelper",{getText:function(k,p){return this.oBundle.getText(k,p);},getInitialInfoModel:function(){return this.initialInfoModel;},setInitialInfoModel:function(i){this.initialInfoModel=i;},setResourceBundle:function(r){this.oBundle=r;}});