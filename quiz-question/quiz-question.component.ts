import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import {Question} from '../models/question';
import {Answer} from '../models/answer';
import { Choice } from '../models/choice';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styles: []
})
export class QuizQuestionComponent implements OnInit, OnChanges {
  // Question en cours
  @Input() question: Question;
  // Réponse en cours (réponse "vierge" pour l'instant)
  @Input() answer: Answer;

  @Output() submit = new EventEmitter<Answer>();

  isSubmitted: boolean;

  constructor() {}

  ngOnInit() {
    // à l'initialisation du composant
    this.isSubmitted = this.answer.isAnswered();
  }

  ngOnChanges() {
    // recalcule quand les inputs changent
    this.isSubmitted = this.answer.isAnswered();
  }

  get submitLabel() {
    return !this.isSubmitted ? 'Soumettre' : this.answer.isCorrect ? 'CORRECT' : 'INCORRECT';
  }
  get submitClass() {
    return !this.isSubmitted ? 'btn-primary' : this.answer.isCorrect ? 'btn-success' : 'btn-danger';
  }

  clickChoice(choice: Choice): void {
    // S'il a déjà soumis sa réponse, on quitte
    if (this.isSubmitted) { return; }

    // Si le choix n'est PAS déjà sélectionné,
    // on le stocke dans la réponse
    if (!this.answer.hasChoice(choice)) {
      this.answer.addChoice(choice);
    // Sinon, on le retire de la réponse
    } else {
      this.answer.removeChoice(choice);
    }
  }

  // Appelée au clic sur le bouton "Soumettre"
  submitAnswer() {
    this.isSubmitted = true;
    // transmet la réponse au composant parent
    this.submit.emit(this.answer);
  }

  // Charge une nouvelle question et une nouvelle réponse.
  gotoNextQuestionTEMP() {
    this.question = new Question({
      'id': 35,
      'title': 'Angular est vraiment trop canon.',
      'choices': [
        { 'text': 'Vrai', 'isCorrect': true },
        { 'text': 'Faux'}
      ],
      'explanation': 'À ce stade, comment ne pas en être persuadé ? 😝'
    });
    this.answer = new Answer({
      questionId: 35,
      multipleChoicesAllowed: false
    });
    this.isSubmitted = this.answer.isAnswered();
  }
}
