import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if fields are missing', () => {
    component.registroForm.setValue({ correo: '', clave: '', repetir_clave: '' });
    expect(component.registroForm.invalid).toBeTrue();
  });

  it('should validate that passwords match', () => {
    component.registroForm.setValue({ correo: 'test@example.com', clave: '12345', repetir_clave: '54321' });
    expect(component.registroForm.errors).toEqual({ passwordsMismatch: true });
  });

  it('should call AuthService.register on submit if form is valid', () => {
    authServiceSpy.register.and.returnValue(true);
    component.registroForm.setValue({ correo: 'test@example.com', clave: '12345', repetir_clave: '12345' });
    component.onSubmit();
    expect(authServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'test@example.com', '12345');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error if registration fails', () => {
    authServiceSpy.register.and.returnValue(false);
    component.registroForm.setValue({ correo: 'test@example.com', clave: '12345', repetir_clave: '12345' });
    component.onSubmit();
    expect(component.error).toBe('El correo ya está registrado');
  });
});
