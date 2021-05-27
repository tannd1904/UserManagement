import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (form: FormGroup) => {
        const control = form.controls[controlName];
        const matchingControl = form.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({confirmedValidator: true});
        } else {
            matchingControl.setErrors(null);
        }
    }
}