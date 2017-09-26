export class TransactionDetails {
    id:number;
    creation_date:Date;
    transaction_id:number;
    amount:number;
    received_date :Date;
    schedule_date :Date;
    cancellation_date :Date;
    cancellation_reason :string;
    cancelled_by:number;
    account_id_from:number;
    account_id_to:number;
    account_from:string;
    account_to:string;
    cancelled_by_name:string;
}
