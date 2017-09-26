export class HttpQueryItem {
    
    constructor(private column:string , private value:string , private operation:string = '='){
    }

    equla(httpQueryItem:HttpQueryItem):boolean{
        return this.column == httpQueryItem.column && 
               this.operation == httpQueryItem.operation &&
               this.value   == httpQueryItem.value;
    }
}
