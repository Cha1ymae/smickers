import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyProductsComponent } from './only-products.component';

describe('OnlyProductsComponent', () => {
  let component: OnlyProductsComponent;
  let fixture: ComponentFixture<OnlyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
