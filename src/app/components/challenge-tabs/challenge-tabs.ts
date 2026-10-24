import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-challenge-tabs',
  standalone: true,
  imports: [],
  templateUrl: './challenge-tabs.html',
  styleUrl: './challenge-tabs.css'
})
export class ChallengeTabs {
  readonly tabActive = input<string>()
  ontabclicker=output<string>()
  tabclicker(tab:string){
    console.log(tab)
    this.ontabclicker.emit(tab)
  }
}
