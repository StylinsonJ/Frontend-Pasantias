import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import {ProgressBarModule} from "angular-progress-bar";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatDividerModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        HttpClientModule,
        MatExpansionModule,
        MatDialogModule,
        MatSortModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        ProgressBarModule
    ],
    exports:[
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatDividerModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        HttpClientModule,
        MatExpansionModule,
        MatDialogModule,
        MatSortModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        ProgressBarModule
    ]
})
export class MaterialModule {}