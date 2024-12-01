import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Product } from './product/product.types'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, 
    FooterComponent,
    HeaderComponent,
    ProductComponent 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[] = [
    {
      id: '1',
      title: 'Nike Jordan',
      description: 'Confort ultime pour vos pieds.',
      photo: 'https://ci.themadon.com/wp-content/uploads/2023/02/Jordan-4-Rouge-et-Blanc.webp',
      price: 120,
      stock: 10
    },
    {
      id: '2',
      title: 'Adidas Campus',
      description: 'Courrez plus vite avec style.',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaqIFvNrbQXlMSEePlk8TfqOGJc9fLdksedA&s',
      price: 150,
      stock: 5
    },
    {
      id: '3',
      title: 'Puma RS-X',
      description: 'La combinaison parfaite entre confort et design.',
      photo: 'https://www.cdiscount.com/pdt2/2/2/7/1/700x700/mp61639227/rw/baskets-mode-puma-rs-x-eos-jr.jpg',
      price: 100,
      stock: 8
    },
    {
      id: '4',
      title: 'Nike Air Force',
      description: 'Performance et style incomparables.',
      photo: 'https://media.intersport.fr/is/image/intersportfr/DZ7288_9IJ_Q1?$produit_l$&$product_grey$',
      price: 180,
      stock: 15
    },
    {
      id: '5',
      title: 'Nike Jordan',
      description: 'Élégance et confort rétro.',
      photo: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6c7a3a25-1044-4562-bd20-3d4c1356815f/AIR+JORDAN+1+LOW+%28GS%29.png',
      price: 110,
      stock: 7
    },
    {
      id: '6',
      title: 'New Balance ',
      description: 'Un classique du confort et du style.',
      photo: 'https://www.mrkicks.fr/cdn/shop/products/new-balance-530-white-grey-navy-mr-kicks-2.jpg?v=1688932761&width=1500',
      price: 130,
      stock: 12
    },
    {
      id: '7',
      title: 'Under Armour ',
      description: 'Technologie de confort avancée.',
      photo: 'https://underarmour.scene7.com/is/image/Underarmour/3027361-100_PAIR?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688',
      price: 160,
      stock: 6
    },
    {
      id: '8',
      title: 'Asics Gel-Lyte III',
      description: 'Confort et légèreté.',
      photo: 'https://static.qns.digital/img/p/9/4/6/1/0/5/946105-full_product.jpg',
      price: 140,
      stock: 9
    },
    {
      id: '9',
      title: 'Saucony Shadow 6000',
      description: 'Style intemporel et confort maximal.',
      photo: 'data:image/jpeg;base64,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',
      price: 125,
      stock: 14
    },
    {
      id: '10',
      title: 'Vans Old Skool',
      description: 'Un look classique pour tous les jours.',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLsSJgVW6AWd3yheIS5KhJM7PEwbpNKITLg&s',
      price: 85,
      stock: 20
    }
  ];
}
