import {PurchaseItem} from './purchase-item'

export class PurchaseData {

    product_id :number;
    id: number;
    person_id: number;
    description: Text;
    creation_date: Text;
    user_id: number;
    type:  Text;
    person_id_to: number;
    person_name: Text;
    person_name_to: Text;
    user_name: Text;
    details: PurchaseItem[];
    
}
