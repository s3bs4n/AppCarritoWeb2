import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if fields are missing', () => {
    component.loginForm.setValue({ correo: '', clave: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call AuthService.login on submit if form is valid', () => {
    authServiceSpy.login.and.returnValue(true);
    component.loginForm.setValue({ correo: 'test@example.com', clave: '12345' });
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', '12345');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/carrito']);
  });

  it('should show error if login fails', () => {
    authServiceSpy.login.and.returnValue(false);
    component.loginForm.setValue({ correo: 'test@example.com', clave: '12345' });
    component.onSubmit();
    expect(component.error).toBe('Correo o contraseña incorrectos');
  });

  it('should navigate to registro page', () => {
    component.irRegistro();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registro']);
  });

  it('should navigate to contrasenia page', () => {
    component.irContrasenia();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contrasenia']);
  });
});
