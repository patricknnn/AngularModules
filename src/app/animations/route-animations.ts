import { animate, query, style, transition, trigger } from '@angular/animations';

export const routeAnimation =
    trigger('routeAnimation', [
        transition('* => *', [
            query(':enter', [
                style({ opacity: 0 }),
                animate('0.25s', style({ opacity: 1 }))
            ], { optional: true })
        ])
    ]);