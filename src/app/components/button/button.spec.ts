import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render submit label by default', () => {
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement as HTMLElement;

    expect(nativeElement.querySelector('.judge-button__label')?.textContent?.trim()).toBe('Submit');
  });

  it('should render configured input values', () => {
    fixture.componentRef.setInput('label', 'Save');
    fixture.componentRef.setInput('type', 'button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement as HTMLElement;
    const button = nativeElement.querySelector('button');

    expect(button?.textContent?.trim()).toContain('Save');
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });
});
