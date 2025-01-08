import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNameComponent } from './player-name.component';

describe('PlayerNameComponent', () => {
  let component: PlayerNameComponent;
  let fixture: ComponentFixture<PlayerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
