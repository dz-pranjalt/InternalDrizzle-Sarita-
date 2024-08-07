import { LightningElement, wire } from 'lwc';
import getAcc from '@salesforce/apex/getAccData.getAcc';
export default class ExpandableSectionExample extends LightningElement {

    sections = [
        {
            id: 1,
            label: 'Section 1 in Iteration'
        },
        {
            id: 2,
            label: 'Section 2 in Iteration'
        },
        {
            id: 3,
            label: 'Section 3 in Iteration'
        }
    ];
    @wire(getAcc)
    wireData({data,error}){
        console.log('data data ',data)
        if(data){
            let pp = [];
            for(let i = 0 ;i<data.length;i++){
                console.log('data 23 ',data[i])
                pp.push({
                    id:data[i].Name,
                    label:data[i].Phone

                })
                console.log('pp>>>>',pp);
                this.sections = pp;
                // pp.push({
                //     label:data[key],
                //     value:data[key]
                // })
            }
        }
        if(error){
            console.log('error ',error);
        }
    }
}