import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IReturn {
  count: number;
  results: IPokemon[];
}

interface IPokemon {
  id?: number;
  name: string;
  url: string;
}


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
  public pokemonList: IPokemon[] = [];
  public filter: string = "";


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPokemons();
  }

  async fetchPokemons(){
    const temp = await this.http.get<IReturn>("https://pokeapi.co/api/v2/pokemon?limit=10000").toPromise();
    this.pokemonList = temp.results;

    for(let i=0; i<temp.count; i++){
      this.pokemonList[i].id = i;
    }

    if(this.filter !== ""){
      this.pokemonList = this.pokemonList.filter((pokemon) => pokemon.name.includes(this.filter));
    }

  }

}
