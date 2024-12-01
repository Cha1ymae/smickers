import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-season-carousel',
  imports: [
    CommonModule
  ],
  templateUrl: './season-carousel.component.html',
  styleUrls: ['./season-carousel.component.css']
})
export class SeasonCarouselComponent {
  seasons: { [key: string]: string[] } = {
    été: [
      'https://i.pinimg.com/474x/88/05/73/880573114ca070645798842c4373fa12.jpg',
      'https://i.pinimg.com/474x/f3/1b/76/f31b7646a71eb1acbfec0a51ae1e1316.jpg',
      'https://i.pinimg.com/474x/89/c1/b2/89c1b2c7f610abed75c4f001a9feb01a.jpg'
    ],
    hiver: [
      'https://i.pinimg.com/474x/2a/b2/e4/2ab2e47d08d6b0c1d8e86965a2cfdfdb.jpg',
      'https://i.pinimg.com/736x/d9/eb/71/d9eb71b1c82c2441aab153db60f4ede7.jpg',
      'https://i.pinimg.com/474x/99/e9/72/99e9723ac9e4952da21b500c3e318853.jpg'
    ],
    printemps: [
      'https://i.pinimg.com/474x/fe/ff/d5/feffd561dd1ad3049eef0cafae49b119.jpg',
      'https://i.pinimg.com/474x/f5/cf/d5/f5cfd599dd5c4b67c987598ae166358f.jpg',
      'https://i.pinimg.com/474x/e4/f0/dd/e4f0dd79520a30545db069b2876055e8.jpg'
    ],
    automne: [
      'https://i.pinimg.com/474x/14/ac/42/14ac42cc7cafd45f6caddcb81ab7a3af.jpg',
      'https://i.pinimg.com/474x/ed/a7/68/eda768e762d64bd235efdcdc7ec55596.jpg',
      'https://i.pinimg.com/736x/d8/77/be/d877be1b7c023074623c7bb27a49fa08.jpg'
    ]
  };
  currentSeason: string = 'été'; 
  seasonOrder: string[] = ['été', 'hiver', 'printemps', 'automne']; 
  currentIndex: number = 0; 

  changeSeason() {
    this.currentIndex = (this.currentIndex + 1) % this.seasonOrder.length;
    this.currentSeason = this.seasonOrder[this.currentIndex];
  }

  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => this.changeSeason(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}