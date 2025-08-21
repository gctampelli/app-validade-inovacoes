import { ListFoodsService } from './../../services/list-foods';
import { Router, Routes } from '@angular/router';
import { ProductDetailList, ProductInfo } from '../../interfaces/product-info';
import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-register-food',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar, ZXingScannerModule],
  templateUrl: './register-food.html',
  styleUrl: './register-food.scss',
})
export class RegisterFood implements OnInit, AfterViewInit, OnDestroy {
  public foodInfoForm: FormGroup;
  public foodDetails: ProductInfo;
  public foodList: Array<ProductDetailList> = [];
  public showInputFields = false;
  public success = false
  public result: string = '';
  public openCamera = false
  public allowedFormats = [BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.AZTEC,
    BarcodeFormat.PDF_417,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.ITF,
    BarcodeFormat.CODABAR,
    BarcodeFormat.RSS_14,
    BarcodeFormat.RSS_EXPANDED,];
  public scannedResult: string | null = null;
  public hasDevices = false;
  public availableDevices: MediaDeviceInfo[] = [];
  public selectedDevice: MediaDeviceInfo | undefined;  
  public foodSelected: ProductDetailList


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly listFoodsService: ListFoodsService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    window.scrollTo(0,0)
    this.cdr.detectChanges();
  }

  public buildForm(): void {
    this.foodSelected =  this.listFoodsService.selectedFood$.value
    const foodCode =  this.foodSelected ?  this.foodSelected.code : '';
    const foodName =  this.foodSelected ?  this.foodSelected.name : ''
    const foodBrand =  this.foodSelected ?  this.foodSelected.brand : ''
    const expirationDate =  this.foodSelected ?  this.foodSelected.expirationDate : ''
    const quantity =   this.foodSelected ?  this.foodSelected.quantity : 1
    this.showInputFields = !! this.foodSelected
  


    this.foodInfoForm = this.formBuilder.group({
      foodCode: [foodCode],
      foodName: [foodName, Validators.required],
      foodBrand: [foodBrand, Validators.required],
      expirationDate: [expirationDate, Validators.required],
      quantity: [quantity, Validators.required],
    });

    if (this.foodSelected) {
      this.foodInfoForm.markAsDirty()
    }
  }

  public searchFoodInformation(): void {
    const foodCode = this.foodInfoForm.controls['foodCode'].value;

    this.listFoodsService
      .getProductByBarcode(foodCode)
      .subscribe((resp: ProductInfo) => {
        if (resp?.product?.product_name !== '') {
          this.foodDetails = resp;
          this.foodInfoForm?.controls['foodName']?.setValue(
            this.foodDetails.product.product_name
          );
          this.foodInfoForm?.controls['foodBrand']?.setValue(
            this.foodDetails.product.brands_tags[0].toUpperCase()
          );
        }
      });
  }

  public addFoodOnList(): void {
    this.success = !this.success
    const foodDetail: ProductDetailList = {
      code: this.foodInfoForm?.controls['foodCode']?.value,
      name: this.foodInfoForm?.controls['foodName']?.value,
      brand: this.foodInfoForm?.controls['foodBrand']?.value,
      expirationDate: this.foodInfoForm?.controls['expirationDate']?.value,
      quantity: this.foodInfoForm?.controls['quantity']?.value,
    };
    this.foodList.push(foodDetail);
    this.listFoodsService.lisfFood$.next(this.foodList);
    this.showSuccessAlert();
  }

  public clearFieldValue(formControlName: string): void {
    this.foodInfoForm.controls[formControlName].reset();
  }

  public redirectToListFood(): void {
    this.router.navigate(['storage-list']);
  }

  public showSuccessAlert() {
    this.success = true
    const alertBox = document.getElementById('alert-success');

    alertBox.style.display = 'block';

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 5000);
  }

  public clearFormValues(): void {
      this.foodInfoForm.reset(); 
      this.foodDetails = null; 
      this.success = !this.success; 
      this.showInputFields = false
      this.scannedResult = ''
  }


  onCodeResult(result: string) {
    this.openCamera = false
    this.scannedResult = result
    this.foodInfoForm?.controls['foodCode']?.setValue(this.scannedResult)
    this.searchFoodInformation()
  }

  onDeviceSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement; 
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === target.value);
  }

  onHasDevices(hasDevices: boolean) {
    this.hasDevices = hasDevices;
  }

  onDevicesFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0]; // Fix: Ensure a device is selected initially
    }
  }

  onError(error: any) {
    console.error('Barcode scanning error:', error);
  }
  ngOnDestroy(): void {
    this.foodInfoForm.reset()
    this.listFoodsService.selectedFood$.next(null)
  }
}
