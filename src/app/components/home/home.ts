import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html', // <--- Si lo renombraste a home.html
  styleUrl: './home.css'       // <--- Si lo renombraste a home.css
})
export class HomeComponent { }
