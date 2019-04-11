import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirPostComponent } from './incluir-post.component';

describe('IncluirPostComponent', () => {
  let component: IncluirPostComponent;
  let fixture: ComponentFixture<IncluirPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
