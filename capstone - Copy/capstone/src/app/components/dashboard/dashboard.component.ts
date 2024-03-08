import { Component, OnInit } from '@angular/core';
import { BugsService } from 'src/app/shared/services/bugs.service';
import { Bugs } from 'src/app/shared/models/Bugs';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedBugs: Bugs[] = [];
  filteredBugs: Bugs[] = [];
  searchQuery: string = '';
  filterStatus: string = '';
  filterSeverity: string = '';
  selectedBugId: number | null = null;
  projId: number


  searchForm = new FormGroup({
    searchQuery: new FormControl(''),
    filterStatus: new FormControl(''),
    filterSeverity: new FormControl(''),
 });

  constructor(private BugsService: BugsService, private router: Router, private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchBugs();

    this.searchForm.get('searchQuery')?.valueChanges.subscribe(value => {
      this.searchQuery = value;
      this.applySearchs();
    });

    this.searchForm.get('filterSeverity')?.valueChanges.subscribe(() => this.applyFilters());
    this.searchForm.get('filterStatus')?.valueChanges.subscribe(() => this.applyFilters());

    this.ar.paramMap.subscribe((map) => {
      this.projId = +map.get('projectId');
    });
  }

  onBugIdClick(bugId:number): void{
    alert(bugId)
    sessionStorage.setItem('bugId', bugId.toString());
    this.router.navigate([`/dashboard/${this.projId}/bugComment/${bugId}`]);
  }

  fetchBugs(): void {
    let projId = parseInt(sessionStorage.getItem('projId'));
    console.log(projId);

    this.BugsService.getBugsByID(projId).subscribe(
      (bugs: Bugs[]) => {
        this.displayedBugs = bugs;
        this.filteredBugs = bugs;
        console.log(bugs);
      },
      (error) => {
        console.error('Error fetching bugs', error);
      }
    );
  }

  createBug(): void {
    this.router.navigate(['/create']);
  }

  deleteSelectedBugs(): void {
    if (this.selectedBugId) {
      this.BugsService.deleteBug(this.selectedBugId).subscribe(
        () => {
          console.log('Bug deleted');
          this.fetchBugs(); 
        },
        (error) => {
          console.error('Error deleting bug', error);
        }
      );
    }
  }

  applySearchs(): void {
    this.filteredBugs = this.displayedBugs.filter((bug) => {
       const titleMatch = this.searchQuery
         ? bug.title.toLowerCase().includes(this.searchQuery.toLowerCase())
         : true;
   
       return titleMatch;
    });
   }

  applyFilters(): void {
    const filterSeverity = this.searchForm.get('filterSeverity')?.value;
    const filterStatus = this.searchForm.get('filterStatus')?.value;
    this.filteredBugs = this.displayedBugs.filter((bug) => {
      const severityMatch = filterSeverity
        ? bug.severity.toLowerCase() === filterSeverity.toLowerCase()
        : true;
      const statusMatch = filterStatus ? bug.status.toLowerCase() === filterStatus.toLowerCase() : true;

      return severityMatch && statusMatch;
    });
  }
}
