/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
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
		if (E.response && E.response.message !== "ERR_INTERNET_DISCONNECTED") {
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
			window.online = true;
			s(d.results);
		}, function(e) {
			window.online = false;
			s();
		});
	},
	getWorkDays: function(a, p, b, e, s) {
		var c = this;
		this._initialize(a);
		this.oDataModel.setHeaders({"X-CSRF-Token": "Fetch"});
		this.oDataModel.read("/WorkCalendars", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e + "'"],
			true,
			function(d) {
				window.online = true;
				s(d.results);
			},
			function(E) {
				window.online = false;
				if (E.message === "HTTP request failed") {
					var objectStore = window.oController.myDB.transaction("workingdaysStore").objectStore("workingdaysStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							if (parseInt(cursor.value.Date) >= parseInt(b) && parseInt(cursor.value.Date) <= parseInt(e))
								items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					}
				} else {
					c.processError(E);
				}
			});
	},
	getFavorites: function(a, p, s) {
		this.showBusy();
		var b = this;
		this._initialize(a);
		this.oDataModel.read("/Favorites", null, ["$filter=Pernr eq '" + p + "'"], true, function(d) {
			b.hideBusy();
			window.online = true;
			s(d.results);
		}, function(e) {
			window.online = false;
			b.hideBusy(true);
			if (e.message === "HTTP request failed") {
					var objectStore = window.oController.myDB.transaction("FavoritesStore").objectStore("FavoritesStore");
					var items = [];
					var oJSONModel = new sap.ui.model.json.JSONModel();
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							items.push(cursor.value);
							cursor.continue();
						} else {
							oJSONModel.setData({
								modelData: items
							});
						}
					}
					setTimeout(function(){
					s(oJSONModel.getData().modelData);
					}, 2000);
				} else {
					s.processError(e);
				}
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
		this.oDataModel.read("/TimeDataList", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e + "'"],
			true,
			function(d) {
				window.online = true;
				for (var i = 0; i < d.results.length; i++) {
					d.results[i].Level = d.results[i].Level.toString().trim();
				}
				c.hideBusy();
				s(d.results);
			},
			function(E) {
				window.online = false;
				if (E.message === "HTTP request failed") {
					c.hideBusy(true);
					var objectStore = window.oController.myDB.transaction("timedataStore").objectStore("timedataStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							if (parseInt(cursor.value.Date) >= parseInt(b) && parseInt(cursor.value.Date) <= parseInt(e))
								items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					}
				} else {
					c.hideBusy(true);
					c.processError(E);
				}
			});
	},
	getWorkListCollection: function(a, p, b, e, s) {
		this.showBusy();
		var c = this;
		this._initialize(a);
		this.oDataModel.read("/WorkListCollection", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e +
			"'"
		], true, function(d) {
			window.online = true;
			c.hideBusy();
			s(d.results);
		}, function(E) {
			window.online = false;
				if (E.message === "HTTP request failed") {
					c.hideBusy(true);
					var objectStore = window.oController.myDB.transaction("WorklistStore").objectStore("WorklistStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					};
				} else {
					c.hideBusy(true);
					c.processError(E);
				}
		});
	},
	getProfileFields: function(a, p, s) {
		this.showBusy();
		var b = this;
		this._initialize(a);
		this.oDataModel.read("/ProfileFields", null, ["$filter=Pernr eq '" + p + "'"], true, function(d) {
			b.hideBusy();
			s(d.results);
		}, function(E) {
			if (E.message === "HTTP request failed") {
					b.hideBusy(true);
					var objectStore = window.oController.myDB.transaction("ProfileFieldStore").objectStore("ProfileFieldStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					};
				} else {
					b.hideBusy(true);
					b.processError(E);
				}
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
			if (E.message === "HTTP request failed") {
					d.hideBusy(true);
					var objectStore = window.oController.myDB.transaction("ProfileFieldStore").objectStore("ProfileFieldStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					};
				} else {
					d.hideBusy(true);
					d.processError(E);
				}
		});
	},
	getInitialInfos: function(a, p, b, e) {
		this._initialize(a);
		var s = this;
		this.oDataModel.read("/InitialInfos", null, ["$filter=Pernr eq '" + p + "' and StartDate eq '" + b + "' and EndDate eq '" + e + "'"],
			false,
			function(d) {
				s.oConfiguration.setInitialInfoModel(d.results[0]);
			},
			function(E) {
				if (E.message === "HTTP request failed") {
					var objectStore = window.oController.myDB.transaction("InitialInfoStore").objectStore("InitialInfoStore");
					var items = [];
					objectStore.openCursor().onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
							items.push(cursor.value);
							cursor.continue();
						} else {
							var oJSONModel = new sap.ui.model.json.JSONModel();
							oJSONModel.setData({
								modelData: items
							});
							s(oJSONModel.getData().modelData);
						}
					};
				} else {
					s.processError(E);
				}
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
		this.getPersonellAssignments(a, function(){
		if (window.online === true){
		l.refreshSecurityToken(function() {
			if (k.length !== 0){
			for (var i = 0; i < k.length; i++) {
				g.data = k[i];
				var n = l.createBatchOperation("/TimeEntries", "POST", g.data);
				var p = [];
				p.push(n);
				l.addBatchChangeOperations(p);
			}}
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
					var me = this.oApplication.getModel("TSM_WEEKLY");
					this.oService.getTimeDataList(this, this.oApplication.pernr, this.getDateStr(window.fvar), this.getDateStr(window.lvar), function(d) {
						me.setProperty("/activities", d);
						if (me.getData().workingDayList) {
							s.setWeeklyData(d);
						}
		});
					s();
				}
			}, function(e) {
				g.hideBusy(true);
				g.processError(e);
			});
			}, function(e) {
					g.processError(e);
			}, true);
		}
		else {
			g.hideBusy(true);
			for (var i = 0; i < k.length; i++) {
				g.data = k[i];
				var n = l.createBatchOperation("/TimeEntries", "POST", g.data);
				var p = [];
				p.push(n);
				l.addBatchChangeOperations(p);
			}
			var date = k[0].TimeEntryDataFields.WORKDATE.substring(0, 10);
				date = date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);
				var recnb = 0;
				
				var objectStore = window.oController.myDB.transaction(["timedataStore"], "readwrite").objectStore("timedataStore");
				var index = objectStore.index("FieldValue");

				index.get(k[0].Counter).onsuccess = function(event) {
					recnb = event.target.result.RecordNumber;
				};
				var objectStore = window.oController.myDB.transaction(["timedataStore"], "readwrite").objectStore("timedataStore");
				objectStore.openCursor().onsuccess = function(event) {
					var cursor = event.target.result;
					if (cursor) {
						if (cursor.value.FieldName === "POSID" && cursor.value.RecordNumber === recnb && date === cursor.value.Date){
							cursor.value.FieldValue = k[0].TimeEntryDataFields.POSID;
							var res = cursor.update(cursor.value);
            				res.onsuccess = function(e){
                				console.log("update success!! Posid");
            				}
            				res.onerror = function(e){
            					console.log("update failed!! Posid");
            				}
						}
						if (cursor.value.FieldName === "TIME" && cursor.value.RecordNumber === recnb && date === cursor.value.Date){
							cursor.value.FieldValue = k[0].TimeEntryDataFields.CATSAMOUNT;
							var res = cursor.update(cursor.value);
            				res.onsuccess = function(e){
                				console.log("update success!! Time");
            				}
            				res.onerror = function(e){
            					console.log("update failed!! Time");
            				}
						}
						if (cursor.value.FieldName === "NOTES" && cursor.value.RecordNumber === recnb && date === cursor.value.Date){
							cursor.value.FieldValueText = k[0].TimeEntryDataFields.LONGTEXT_DATA;
							var res = cursor.update(cursor.value);
            				res.onsuccess = function(e){
                				console.log("update success!! Notes");
            				}
            				res.onerror = function(e){
            					console.log("update failed!! Notes");
            				}
						}
						if (cursor.value.FieldName === "STATUS" && cursor.value.RecordNumber === recnb && date === cursor.value.Date){
							cursor.value.FieldValue = "WSYNC";
							cursor.value.FieldValueText = "Version en attende de synchronisation";
							var res = cursor.update(cursor.value);
            				res.onsuccess = function(e){
                				console.log("update success!! Status");
            				}
            				res.onerror = function(e){
            					console.log("update failed!! Status");
            				}
						}
						cursor.continue();
					}
				}
				sap.m.MessageBox.show("Stack Offline", {
								title: g.oBundle.getText("WARNING"),
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function(F) {
									if (F === g.oBundle.getText("OK")) {
										s();
									}
								},
								details: "Le changement à été placé dans la stackOffline et sera synchronisé à la prochaine connexion."
							});
			}
		});
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