import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffAffaireParAnnesComponent } from './chiff-affaire-par-annes.component';

describe('ChiffAffaireParAnnesComponent', () => {
  let component: ChiffAffaireParAnnesComponent;
  let fixture: ComponentFixture<ChiffAffaireParAnnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffAffaireParAnnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiffAffaireParAnnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
