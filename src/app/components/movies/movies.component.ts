import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { tap, map, filter, debounceTime, distinct, switchMap } from 'rxjs/operators';
import { Movie } from '../../interfaces/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('movieSearchInput') movieSearchInput! : ElementRef;
  movies: any = [];
  movieSuscription!: Subscription;

  constructor( private movieService:MovieService ) { }
  ngOnDestroy(): void {
    this.movieSuscription.unsubscribe();
  }


  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.movieSuscription = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event:Event) => {
         const valueEvent = (event.target as HTMLInputElement).value;
         return valueEvent;
      }),
      filter((searchTerm: string) => searchTerm.length > 3),
      debounceTime(500),
      distinct(),
      switchMap((searchTerm: string) => this.movieService.getMovies(searchTerm) 
      )).subscribe((movies: Movie[]) =>{
        this.movies = movies !== undefined ? movies : [];
    })
  }

  // getMovies(search: string){
  //  this.movieService.getMovies(search).subscribe(movies => {
  //     this.movies = movies !== undefined ? movies : [];
  //  })
  // }



}
