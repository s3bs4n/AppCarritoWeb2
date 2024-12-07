import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContraseniaComponent } from './contrasenia.component';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContraseniaComponent', () => {
  let component: ContraseniaComponent;
  let fixture: ComponentFixture<ContraseniaComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['recoverPassword']);

    await TestBed.configureTestingModule({
      imports: [ContraseniaComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if no email is provided', () => {
    component.recoverForm.setValue({ email: '' });
    expect(component.recoverForm.invalid).toBeTrue();
  });

  it('should call AuthService.recoverPassword on submit if form is valid', () => {
    authServiceSpy.recoverPassword.and.returnValue('12345');
    component.recoverForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(authServiceSpy.recoverPassword).toHaveBeenCalledWith('test@example.com');
  });

  it('should show success alert with password if recovery is successful', () => {
    spyOn(window, 'alert');
    authServiceSpy.recoverPassword.and.returnValue('12345');
    component.recoverForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Tu contraseña es: 12345');
  });

  it('should show error alert if recovery fails', () => {
    spyOn(window, 'alert');
    authServiceSpy.recoverPassword.and.returnValue(null);
    component.recoverForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('El correo electrónico no está registrado');
  });
});
