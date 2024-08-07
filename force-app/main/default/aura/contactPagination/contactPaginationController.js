({
	doInit : function(component, event, helper) {
		var PageNumber = component.get("v.PageNumber");
        var pageSize = component.find("pageSize").get("v.value");
        helper.getContactList(component,PageNumber,pageSize);
	},
    onSelectChange : function(component,event,helper){
        var page = 1;
        var pageSize = component.find("pageSize").get("v.value");
        helper.getContactList(component,page,pageSize);
    },
    handlePrev : function(component,event,helper){
        var PageNumber = component.get("v.PageNumber");
        var pageSize = component.find("pageSize").get("v.value");
        PageNumber--;
        helper.getContactList(component,PageNumber,pageSize);
    },
    handleNext : function(component,event,helper){
        var PageNumber = component.get("v.PageNumber");
        var pageSize = component.find("pageSize").get("v.value");
        PageNumber++;
        helper.getContactList(component,PageNumber,pageSize);
    },

})