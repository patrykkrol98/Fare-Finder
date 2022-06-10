import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fare } from '../models/fare.model';
import { FaresService } from '../services/fares.service';

@Component({
  selector: 'app-fares-list',
  templateUrl: './fares-list.component.html',
  styleUrls: ['./fares-list.component.css']
})
export class FaresListComponent implements OnInit {

  fares!: Fare[];
  images: any;
  fareForm!: FormGroup;

  constructor(private faresService: FaresService) { }

  ngOnInit(): void {
    this.fareForm = new FormGroup({
      'priceValueTo': new FormControl(null, Validators.required),
      'departureAirportIataCode': new FormControl(null, Validators.required),
      'outboundDepartureDateFrom': new FormControl(null, Validators.required),
      'outboundDepartureDateTo': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.faresService.getFaresData(
      this.fareForm.get('departureAirportIataCode')?.value,
      this.fareForm.get('priceValueTo')?.value,
      this.fareForm.get('outboundDepartureDateFrom')?.value,
      this.fareForm.get('outboundDepartureDateTo')?.value
    ).subscribe(res => {
      this.fares = res
    });
    if (!this.images) {
    this.faresService.getFaresImages().subscribe(res => {
      this.images = res
      })
    }
  }

  getImageUrl(iataCode: string | number) {
    if (this.images[iataCode] == undefined) {
      return 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';
    }
    return 'https://www.ryanair.com' + this.images[iataCode].imageRegularUrl
  }

  
  
}



