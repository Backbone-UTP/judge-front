import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeHeader } from './challenge-header';

describe('ChallengeHeader', () => {
  let component: ChallengeHeader;
  let fixture: ComponentFixture<ChallengeHeader>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ChallengeHeader],
  }).compileComponents();

  fixture = TestBed.createComponent(ChallengeHeader);
  component = fixture.componentInstance;

  fixture.componentRef.setInput('challenge', {
    title: 'Two Sum',
    descriptionParagraphs: [],
    examples: [],
    constraints: [],
    editorSnippet: '',
  });

  fixture.detectChanges();
  await fixture.whenStable();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "—" when value is undefined', () => {
  expect(component.formatCount(undefined)).toBe('—');
});

it('should return "—" when value is null', () => {
  expect(component.formatCount(null as unknown as number)).toBe('—');
});

it('should return the number as string when it is less than 1000', () => {
  expect(component.formatCount(365)).toBe('365');
});

it('should format values greater than or equal to 1000 using K', () => {
  expect(component.formatCount(1500)).toBe('1.5K');
});

it('should format millions using M', () => {
  expect(component.formatCount(1200000)).toBe('1.2M');
});

it('should format exactly 1000 as 1.0K', () => {
  expect(component.formatCount(1000)).toBe('1.0K');
});
});
