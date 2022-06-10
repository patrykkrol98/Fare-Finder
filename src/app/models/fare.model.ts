export class Fare {
    destinationCity: string;
    destinationCountry: string;
    iataCode: string;
    arrivalDate: string;
    price: string;
    currencySymbol: string;

    constructor(
        destinationCity: string,
        destinationCountry: string,
        iataCode: string,
        arrivalDate: string,
        price: string,
        currencySymbol: string,
    ) {
        this.destinationCity = destinationCity;
        this.destinationCountry = destinationCountry;
        this.iataCode = iataCode;
        this.arrivalDate = arrivalDate;
        this.price = price;
        this.currencySymbol = currencySymbol;
    }
}