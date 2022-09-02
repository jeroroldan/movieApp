import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import {  map  } from 'rxjs/operators';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL : string = 'http://www.omdbapi.com/?apikey=e56d51ba'

  constructor( private http: HttpClient ) { }

  // e56d51ba

  getMovies(searchTerm: string): Observable<Movie[]>{
    return this.http.get<ApiResponse>(`${this.API_URL }&s=${searchTerm}`).pipe(
      map( response =>{
        return response.Search;
      } )
    )
  }



}

