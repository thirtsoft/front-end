import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffAffaireParmoisComponent } from './chiff-affaire-parmois.component';

describe('ChiffAffaireParmoisComponent', () => {
  let component: ChiffAffaireParmoisComponent;
  let fixture: ComponentFixture<ChiffAffaireParmoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffAffaireParmoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiffAffaireParmoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
