({
    doInit: function(component, event, helper) {
        var action = component.get("c.getLead");
        action.setCallback(this,function(a){
            var state = a.getState();
            console.log('state ',state);
            if(state === 'SUCCESS'){
                var result = a.getReturnValue();
                console.log('result ',JSON.stringify(a.getReturnValue()));
                component.set("v.accountList",result);
            }
        });
        $A.enqueueAction(action);
    },        
    handleShowPopover : function(component, event, helper) {
        var accId = event.currentTarget.dataset.id;
        var accountEvent = $A.get("e.c:lookupEvent");
        
        accountEvent.setParams({"leadRecId": accId});
        alert(accountEvent)
        accountEvent.fire();
        var modalBody;
        var modalFooter;
        $A.createComponents([
            ["c:loadingrecord",{}]
                                ],
                                function(components, status){
                                if (status === "SUCCESS") {
                                modalBody = components[0];
                                component.find('overlayLib').showCustomModal({
                                header: "Log a Call",
                                body: modalBody,
                                showCloseButton: true,
                                cssClass: "my-modal,my-custom-class,my-other-class",
                                closeCallback: function() {
                                    setTimeout(function(){
                                        overlay.close();
                                    }, 3000);
                                }
                               });
             }
             }
             );
             
             },
             })