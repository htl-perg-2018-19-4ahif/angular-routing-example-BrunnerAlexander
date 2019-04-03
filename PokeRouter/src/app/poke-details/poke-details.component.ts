import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IDetails {
  abilities: IAbilities[];
  name: string;
}

interface IAbilities {
  name: string;
}

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent implements OnInit {
  public id: number;
  public details: IDetails = {name: '', abilities: []};

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    console.log('Created...');
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => (this.id = params.id));
    this.getDatails();
  }

  async getDatails(){
    this.details = await this.http.get<IDetails>("https://pokeapi.co/api/v2/pokemon/" + this.id).toPromise();

  }

}
