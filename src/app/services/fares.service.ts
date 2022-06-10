import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fare } from '../models/fare.model';

@Injectable({
  providedIn: 'root'
})
export class FaresService {
  faresUrl = "https://www.ryanair.com/api/farfnd/3/oneWayFares";
  proxyServer = 'https://cors-anywhere.herokuapp.com/';


  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getFaresData(
    departureAirportIataCode: string | number | boolean,
    priceValueTo: string | number | boolean,
    outboundDepartureDateFrom: string | number | Date | undefined, 
    outboundDepartureDateTo: string | number | Date | undefined): Observable<Fare[]> {
    const params = {
      params: new HttpParams()
        .append('departureAirportIataCode', departureAirportIataCode)
        .append('priceValueTo', priceValueTo)
        .append('language', 'pl')
        .append('outboundDepartureDateFrom', this.datePipe.transform(outboundDepartureDateFrom, 'yyyy-MM-dd') || '')
        .append('outboundDepartureDateTo', this.datePipe.transform(outboundDepartureDateTo, 'yyyy-MM-dd') || '')
    }
    return this.http.get<any>(environment.faresUrl, params).pipe(
      map(response => {
        return response.fares.map((fare: {
          outbound: {
            arrivalAirport: {
              city: { name: string; };
              countryName: string; iataCode: string;
            };
            arrivalDate: string;
            price: {
              value: string; currencySymbol: string;
            };
          };
        }) => {
          return new Fare(
            fare.outbound.arrivalAirport.city.name,
            fare.outbound.arrivalAirport.countryName,
            fare.outbound.arrivalAirport.iataCode,
            fare.outbound.arrivalDate,
            fare.outbound.price.value,
            fare.outbound.price.currencySymbol)
        })
      }))
  }

  getFaresImages() {
    return this.http.get<any>(this.proxyServer + environment.imagesUrl ).pipe(
      map(response => response.destinationInformation))
  }
}
