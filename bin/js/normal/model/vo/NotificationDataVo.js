function NotificationDataVo() {
	var that = {};
		that.title = "";
		that.content = "";
		that.showOk = true;
		that.showCancel = false;
		that.okCallback = null;
		that.cancelCallback = null;
		that.okLabel = null;
		that.cancelLabel = null;
		that.width = 500;
		that.height = 200;
	return that;
}
