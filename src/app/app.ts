import { Component, computed, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApplicationService } from './application';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private applicationService: ApplicationService) {}
  protected readonly title = signal(0);

  protected readonly doubleTitle = computed(() => this.title() * 2);

  protected increment() {
    this.title.set(this.applicationService.increment(this.title()));
  }

  private readonly effect = effect(() => {
    console.log(`Title: ${this.title()}, Double Title: ${this.doubleTitle()}`);
  });
}
