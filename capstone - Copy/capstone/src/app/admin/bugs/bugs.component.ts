import { Component, OnInit } from '@angular/core';
import { BugsService } from 'src/app/shared/services/bugs.service';
import { Bugs } from 'src/app/shared/models/Bugs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss'],
})
export class BugsComponent implements OnInit {
  displayedBugs: Bugs[] = [];
  filteredBugs: Bugs[] = [];
  selectedBugId: number | null = null;

 searchForm = new FormGroup({
    searchQuery: new FormControl(''),
    filterStatus: new FormControl(''),
    filterSeverity: new FormControl(''),
    filterTesterName: new FormControl(''),
    filterDeveloperName: new FormControl(''),
    filterBugId: new FormControl(''),
 });

 constructor(
    private BugsService: BugsService,
    private router: Router,
 ) {}

 ngOnInit(): void {
    this.fetchBugs();
    this.searchForm.get('searchQuery')?.valueChanges.subscribe(value => {
      this.applySearchs();
    });
    this.searchForm.get('filterTesterName')?.valueChanges.subscribe(value => {
      this.applySearchs();
    });
    this.searchForm.get('filterDeveloperName')?.valueChanges.subscribe(value => {
      this.applySearchs();
    });
 }

 fetchBugs(): void {
    console.log('Fetching bugs...');
    this.BugsService.getBugs().subscribe(
      (bugs: Bugs[]) => {
        console.log('Bugs fetched:', bugs);
        this.displayedBugs = bugs;
        this.filteredBugs = bugs;
      },
      (error) => {
        console.error('Error fetching bugs', error);
      }
    );
 }

 createBug(): void {
    this.router.navigate(['/create']);
 }


 deleteSelectedBugs(bugId: number): void {
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
      const titleMatch = this.searchForm.get('searchQuery')?.value
        ? bug.title.toLowerCase().includes(this.searchForm.get('searchQuery')?.value.toLowerCase())
        : true;
      const testerNameMatch = this.searchForm.get('filterTesterName')?.value
        ? bug.testerName.toLowerCase().includes(this.searchForm.get('filterTesterName')?.value.toLowerCase())
        : true;
      const developerNameMatch = this.searchForm.get('filterDeveloperName')?.value
        ? bug.developerName.toLowerCase().includes(this.searchForm.get('filterDeveloperName')?.value.toLowerCase())
        : true;

      return titleMatch && testerNameMatch && developerNameMatch;
    });
 }
}
