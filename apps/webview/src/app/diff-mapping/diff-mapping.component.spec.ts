import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffMappingComponent } from './diff-mapping.component';

describe('DiffMappingComponent', () => {
  let component: DiffMappingComponent;
  let fixture: ComponentFixture<DiffMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
