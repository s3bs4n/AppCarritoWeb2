import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<any>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registroForm in constructor', () => {
    expect(component.registroForm).toBeDefined();
    expect(component.registroForm.get('correo')).toBeDefined();
    expect(component.registroForm.get('clave')).toBeDefined();
    expect(component.registroForm.get('repetir_clave')).toBeDefined();
  });

  it('should call register method of AuthService and navigate to login on successful registration', () => {
    const mockUser = { correo: 'test@test.com', clave: '123456' };
    authService.register.and.returnValue(true);

    component.registroForm.patchValue(mockUser);
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(mockUser.correo, mockUser.correo, mockUser.clave);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set error message on unsuccessful registration', () => {
    const mockUser = { correo: 'test@test.com', clave: '123456' };
    authService.register.and.returnValue(false);

    component.registroForm.patchValue(mockUser);
    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(mockUser.correo, mockUser.correo, mockUser.clave);
    expect(component.error).toEqual('El correo ya está registrado');
  });

  it('should mark form as touched and not call register method if form is invalid', () => {
    spyOn(component.registroForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
    expect(authService.register).not.toHaveBeenCalled();
  });

  // Agregar más pruebas según sea necesario
});
