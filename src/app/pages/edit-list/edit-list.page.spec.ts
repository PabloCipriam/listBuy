import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditListPage } from './edit-list.page';

describe('EditListPage', () => {
  let component: EditListPage;
  let fixture: ComponentFixture<EditListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
