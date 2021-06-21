import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Farmacia } from 'src/app/models/farmacia';
import { FarmaciasService } from 'src/app/services/farmacias.service';

@Component({
  selector: 'app-farmacias',
  templateUrl: './farmacias.component.html',
  styleUrls: ['./farmacias.component.css']
})
export class FarmaciasComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'nombre', 'lat', 'lng', 'direccion', 'telefono', 'acciones'];
  dataSource!: MatTableDataSource<Farmacia>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;


  constructor(
    private farmaciasService: FarmaciasService
  ) { }

  ngOnInit(): void {
    this.farmaciasService.getFarmacias().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
