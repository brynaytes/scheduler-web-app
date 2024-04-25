import { Component } from '@angular/core';
import { RouterModule ,Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private router: Router){}

  async ngOnInit() {
    localStorage.clear();
    this.router.navigate(['/']);
 }

}
