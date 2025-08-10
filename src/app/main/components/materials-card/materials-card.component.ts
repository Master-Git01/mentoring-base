import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaterialsCardData } from '../../interfaces/materials-card.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-materials-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './materials-card.component.html',
  styleUrl: './materials-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) materialsCard!: MaterialsCardData;
  @Input({ required: true }) cardClasses!: any;
}
