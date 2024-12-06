import { TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistroComponent], // IMPORTA el componente en lugar de declararlo
    });
    const fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
