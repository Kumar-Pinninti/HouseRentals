import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdsComponent } from './detail-ads.component';

describe('DetailAdsComponent', () => {
  let component: DetailAdsComponent;
  let fixture: ComponentFixture<DetailAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
