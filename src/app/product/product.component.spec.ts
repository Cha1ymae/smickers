import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Component } from '@angular/core';

fdescribe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture.componentInstance.product = {
      id: '1',
      title: 'Nike Jordan',
      description: 'Confort ultime pour vos pieds.',
      photo:
        'https://ci.themadon.com/wp-content/uploads/2023/02/Jordan-4-Rouge-et-Blanc.webp',
      price: 120,
      stock: 10,
      category: 'hiver',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Product card', () => {
    //given
    it('should have a title displayed', () => {
      const buttonTitle = (fixture.nativeElement as HTMLElement).querySelector(
        'h1'
      );
      //when
      //then
      expect(buttonTitle).toBeTruthy();
      expect(buttonTitle?.textContent).toEqual(component.product?.title);
    });
  });

  describe('Product card', () => {
    //given
    it('should have a price displayed', () => {
      const buttonPrice = (fixture.nativeElement as HTMLElement).querySelector(
        'h2'
      );
      //when
      //then
      expect(buttonPrice).toBeTruthy();
      expect(buttonPrice?.textContent).toEqual(component.product?.price?.toString()+ '€'
      );
    });
  });

  describe('Product card', () => {
    //given
    it('should have a description displayed', () => {
      const buttonDescription = (
        fixture.nativeElement as HTMLElement
      ).querySelector('p');
      //when
      //then
      expect(buttonDescription).toBeTruthy();
      expect(buttonDescription?.textContent).toEqual(
        component.product?.description
      );
    });
  });
// faut revoir cette partie :)
  describe('Product card', () => {
    //given
    it('should have an image displayed', () => {
      const image = component.product?.photo;
      //component.product = 
    //  {
     //   ...component.product,
   //     photo:''
  //    }
 //     fixture.detectChanges();
 //     spyOn(component,"productImage").and.returnValue("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Y2SLfdkXPJMxZ2QtRIK1fy2Lvnr6UVgmzQ&s");
  });
  });
});
