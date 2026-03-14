import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly label = input('Submit');
  readonly type = input<'button' | 'submit' | 'reset'>('submit');
  readonly disabled = input(false);
}
