# Swither-section

Пропсы:

- `sections: {id: string, name: string}[]` - Пропс отвечает за секции.
- `activeSection: string` - Пропс отвечает за айди активной секции.

- `updateActiveSection: EventEmitter<string>` - На выходе получаем новое значение айди активной секции.

За что отвечает:

- Переключений секций

Где используется?

- Positions-Orders

```ts
    public sections: { id: string; name: string }[] = [
    {
      id: 'open-position',
      name: 'Open positions',
    },
    {
      id: 'position-history',
      name: 'Position history',
    },
    {
      id: 'open-orders',
      name: 'Open orders',
    },
    {
      id: 'orders-history',
      name: 'Orders history',
    },
  ];

  public activeSection: string = 'open-position';

  public toggleSection(section: string) {
    this.activeSection = section;
  }


<switcher-section
    [sections]="sections"
    [activeSection]="activeSection"
    (updateActiveSection)="toggleSection($event)"
  />
```
