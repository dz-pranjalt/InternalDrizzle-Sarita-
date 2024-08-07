import { api, LightningElement, wire } from 'lwc';
import getKnowledge from '@salesforce/apex/communityDemo.getKnowledge';
export default class CommunityDemo extends LightningElement {
    @api knowData;
    @api error;
    @wire(getKnowledge) 
    wiredMethos({data,error}){
        if(data){
                this.knowData = data;
        }
        if(error){
            this.error = error;

        }
    };
    handlclick(event)
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__knowledgeArticlePage',
            attributes: {
                articleType: 'How can I find local bike groups?',
                urlName: 'Check-out-Social-Groups-topic-to-find-local-meetings'
            }
        });
       /* this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Knowledge__kav',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            },
        });*/
    }
}