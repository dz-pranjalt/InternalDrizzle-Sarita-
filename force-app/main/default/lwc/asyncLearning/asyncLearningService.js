import getListContactData from '@salesforce/apex/ContactController.getListContactData';

const getAccounts = () => {
    return getListContactData().then((result) => {
        return result;
    }).catch((error) => {
        console.log('getListContactData', error);
    });
};

export {getAccounts};