({
    
    doInit: function(component, event, helper) {
        //helper.handleComponentEvent1(component, event, helper);
    },
    onChange: function(component, event, helper) {
        var select1 = component.find("select1").get("v.value")  
        component.set("v.optionsVal",select1);
    },
    handleComponentEvent : function(component, event, helper){
        alert('evtMethod')
        var evt = event.getParam("leadRecId");
        alert('evt',evt);
        if(!$A.util.isUndefinedOrNull(evt)){
            console.log('evt if');
            component.set("v.getId", evt);
        }
        
    },
    handleSubmit : function(component, event, helper) {
        console.log(component.get("v.comments") ,component.get("v.name"),component.get("v.optionsVal"),component.get("v.getId"));
        var action = component.get("c.getTask");
        action.setParams({
            description:component.get("v.comments"),
            name :component.get("v.name"),
            subject :component.get("v.optionsVal")
        });
        action.setCallback(this,function(s){
            var state = s.getState();
            if(state === 'SUCCESS')
            {
                var result = s.getReturnValue();
                /*var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "sObjectName": "Lead",
                    "slideDevName": "related"
                });
                navEvt.fire();*/
            }
            else{
                console.log('Error ');
            }
        });
        $A.enqueueAction(action);
    }
})