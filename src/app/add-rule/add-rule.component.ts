import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { RuleService } from '../rule.service';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent implements OnInit {
  ruleForm !: FormGroup;
  ruleData!:MatTableDataSource<any>;

  displayColumns: string[] = ['rule_name', 'rule_description', 'rule_status'];
  constructor(private formBuilder: FormBuilder,
    private api: RuleService) { }

  ngOnInit(): void {
    this.ruleForm = this.formBuilder.group({
      rule_name: ['', Validators.required],
      rule_description: ['', Validators.required],
      rule_status: ['', Validators.required],
    })
  }

  addRule() {
    this.api.addRule(this.ruleForm.value)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.ruleData = new MatTableDataSource(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
