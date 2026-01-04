import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'masterpage',
  standalone: true,
  imports: [FormsModule,
            CommonModule,
            RouterModule
  ],
  templateUrl: './master.html',
})
export class MasterComponent {
  
}
