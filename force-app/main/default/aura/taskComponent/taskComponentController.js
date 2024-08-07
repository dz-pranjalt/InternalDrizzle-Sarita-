({
    handleChangeName : function(component, event, helper) {
        var name = component.find("name").get("v.value");
    },
    handleChangeEmail : function(component, event, helper) {
        var email = component.find("email").get("v.value");
    },
    onChange : function(component, event, helper) {
        var options = component.find("pickValues").get("v.value");
    },
    handleSubmit : function(component, event, helper) {
        var action;
        action.setParams({});
        action.setCallBack(this,function(a){
            var state = a.getState();
            if(state === 'SUCCESS'){
                var result = a.getReturnValue();
            }
            else{
                var error = a.getError();
            }
        })
        $A.enqueueAction(action);
    }
})