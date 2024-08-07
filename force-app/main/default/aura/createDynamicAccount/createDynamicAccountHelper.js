({
	valideRecords : function(component,event,helper) {
		var isValid = true;
        var accountList = component.get('v.accountList');
        for(var i=0;i<accountList.length;i++){
            if(accountList[i].Name==''){
                isValid = false;
                alert('Name fields can not be blank');
            }
        }
        return isValid;
	},
})