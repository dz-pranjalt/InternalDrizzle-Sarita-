({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAcc");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.accountwrapper',response.getReturnValue())
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log('errors13 ',errors);
            }
            
        });
        $A.enqueueAction(action);
    },
    doInIT : function(component, event, helper) {
        var action = component.get("c.getcon");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.contactwrapper',response.getReturnValue())
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log("Unknown error30 ",errors);
                
            }
        });
        $A.enqueueAction(action);
    },
    dragStart : function(component, event, helper){
        event.dataTransfer.setData('Text',event.target.id);
    },
    allowDrop : function(component, event, helper){
        event.preventDefault();
    },
    onAccDrop : function(component, event, helper){
        console.log(event.dataTransfer.getData('Text',event.target.id));
        helper.updateDraggedAccount(component, event, helper,event.dataTransfer.getData('Text',event.target.id),'Hot')
        helper.updateDraggedContact(component, event, helper,event.dataTransfer.getData('Text',event.target.id),'Web')
    },
    onConDrop : function(component, event, helper){
        console.log(event.dataTransfer.getData('Text',event.target.id));
       helper.updateDraggedAccount(component, event, helper,event.dataTransfer.getData('Text',event.target.id),'Cold')
        helper.updateDraggedContact(component, event, helper,event.dataTransfer.getData('Text',event.target.id),'Phone')
    },
})