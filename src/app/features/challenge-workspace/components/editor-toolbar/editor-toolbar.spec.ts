import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorToolbar } from './editor-toolbar';
import { LanguageId } from '../../types/challenge.types';

describe('EditorToolbar', () => {
  let component: EditorToolbar;
  let fixture: ComponentFixture<EditorToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorToolbar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('languages', [
      'javascript',
      'python',
    ] as LanguageId[]);

    fixture.componentRef.setInput(
      'selectedLanguage',
      'javascript' as LanguageId,
    );

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language menu', () => {
    expect(component.isLanguageMenuOpen()).toBe(false);

    component.toggleLanguageMenu();

    expect(component.isLanguageMenuOpen()).toBe(true);

    component.toggleLanguageMenu();

    expect(component.isLanguageMenuOpen()).toBe(false);
  });

  it('should emit selected language and close menu', () => {
    let emittedLanguage: LanguageId | undefined;

    component.languageChange.subscribe(language => {
      emittedLanguage = language;
    });

    component.isLanguageMenuOpen.set(true);

    component.changeLanguage('python');

    expect(emittedLanguage).toBe('python');
    expect(component.isLanguageMenuOpen()).toBe(false);
  });

  it('should emit settings click', () => {
    let emitted = false;

    component.settingsClick.subscribe(() => {
      emitted = true;
    });

    component.onSettingsClick();

    expect(emitted).toBe(true);
  });

  it('should emit reset click', () => {
    let emitted = false;

    component.resetClick.subscribe(() => {
      emitted = true;
    });

    component.onResetClick();

    expect(emitted).toBe(true);
  });

  it('should emit expand click', () => {
    let emitted = false;

    component.expandClick.subscribe(() => {
      emitted = true;
    });

    component.onExpandClick();

    expect(emitted).toBe(true);
  });
});