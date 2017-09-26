export class Transaction {
  id :number;
  description :string;
  creation_date :Date;
  update_date :Date;
  total_amount :number;
  validation_date :Date;
  notes : string;
  user_id : number ;
  person_id : number;
  transaction_type_id : number;
  transaction_type : string;
  user_name : string;
  person_name : string;

  account_id_from : number;
  account_id_to : number;
  numberOfPayments : number;
}
