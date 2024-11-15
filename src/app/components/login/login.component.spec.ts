import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm in constructor', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('correo')).toBeDefined();
    expect(component.loginForm.get('clave')).toBeDefined();
  });

  it('should call login method of AuthService and navigate to carrito on successful login', () => {
    const mockUser = { correo: 'test@test.com', clave: '123456' };
    authService.login.and.returnValue(true);

    component.loginForm.patchValue(mockUser);
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(mockUser.correo, mockUser.clave);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/carrito']);
  });

  it('should set error message on unsuccessful login', () => {
    const mockUser = { correo: 'test@test.com', clave: '123456' };
    authService.login.and.returnValue(false);

    component.loginForm.patchValue(mockUser);
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(mockUser.correo, mockUser.clave);
    expect(component.error).toEqual('Correo o contraseña incorrectos');
  });

  it('should mark form as touched and not call login method if form is invalid', () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
    expect(authService.login).not.toHaveBeenCalled();
  });

});
