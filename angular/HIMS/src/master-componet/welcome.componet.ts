import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'welcome',
  standalone: true,
  imports: [FormsModule,
            CommonModule
  ],
  templateUrl: './welcome.html',
})
export class  WelcomeComponent {
  
}
