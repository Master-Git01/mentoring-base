import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { materialsCardArray } from '../../configurations/materials-card.configuration';
import { MaterialsCardData } from '../../interfaces/materials-card.interface';
import { MaterialsCardComponent } from '../../components/materials-card/materials-card.component';
import { CardClassesData } from '../../interfaces/card-classes.interface';
import { cardClassesArray } from '../../configurations/card-classes.configuration';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgxPaginationModule, NgFor, MaterialsCardComponent, NgClass],

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public readonly materialsCards: MaterialsCardData[] = materialsCardArray;
  public readonly cardClasses: CardClassesData[] = cardClassesArray;

  public currentPage: number = 1;

  getCardMod5(cardId: number): number {
    return cardId % 5;
  }

  trackByCardId(index: number, card: MaterialsCardData): number {
    return card.id;
  }
}
