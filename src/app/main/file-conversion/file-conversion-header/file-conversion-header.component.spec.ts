import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConversionHeaderComponent } from './file-conversion-header.component';

describe('FileConversionHeaderComponent', () => {
  let component: FileConversionHeaderComponent;
  let fixture: ComponentFixture<FileConversionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileConversionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileConversionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
