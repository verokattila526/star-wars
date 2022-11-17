import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmekComponent } from './filmek.component';

describe('FilmekComponent', () => {
  let component: FilmekComponent;
  let fixture: ComponentFixture<FilmekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
