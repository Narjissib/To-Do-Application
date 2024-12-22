import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Task {
  taskName: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  taskArray: Task[] = []; // Déclaration explicite du type des éléments du tableau

  constructor() {}

  ngOnInit(): void {
    // Charger les tâches à partir du localStorage lors du chargement du composant
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.taskArray = JSON.parse(savedTasks); // Charger les tâches sauvegardées
    }
  }

  onSubmit(form: NgForm): void {
    const taskName = form.controls['task'].value; // Récupérer le nom de la tâche
    if (taskName) {
      // Ajouter une nouvelle tâche au tableau
      this.taskArray.push({
        taskName: taskName,
        isCompleted: false
      });

      // Sauvegarder les tâches dans localStorage
      this.saveTasksToLocalStorage();

      // Réinitialiser le formulaire
      form.reset();
    }
  }

  onDelete(index: number): void {
    // Supprimer la tâche du tableau
    this.taskArray.splice(index, 1);

    // Sauvegarder les tâches mises à jour dans localStorage
    this.saveTasksToLocalStorage();
  }

  onCheck(index: number): void {
    // Basculer l'état "completed" de la tâche
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;

    // Sauvegarder les tâches mises à jour dans localStorage
    this.saveTasksToLocalStorage();
  }

  private saveTasksToLocalStorage(): void {
    // Sauvegarder les tâches dans localStorage sous forme de chaîne JSON
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }
}
