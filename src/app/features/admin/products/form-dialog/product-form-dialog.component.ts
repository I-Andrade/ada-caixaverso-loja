import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProductModel } from '../../../../shared/models/product-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  standalone: false,
})
export class ProductFormDialogComponent implements OnChanges {
  private getDefaultFormValues(): Partial<ProductModel> {
    return {
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
    };
  }
  @Input() product: ProductModel | null = null;
  @Input() open = false;
  @Output() close = new EventEmitter<Partial<ProductModel> | null>();

  form: FormGroup;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      image: [''],
      category: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.isEdit = !!this.product;
      this.form.patchValue(this.product || this.getDefaultFormValues());
    }
  }

  submit() {
    if (this.form.valid) {
      const value: Partial<ProductModel> = {
        ...this.form.value,
        price: Number(this.form.value.price),
      };
      this.close.emit(value);
      this.form.reset(this.getDefaultFormValues());
    }
  }

  cancel() {
    this.close.emit(null);
  }
}
