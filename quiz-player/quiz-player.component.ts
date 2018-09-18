import { Component, OnInit } from '@angular/core';
import { QUIZZES } from '../data/quizzes';
import { Answer } from '../models/answer';
import { AnswersState } from '../services/quiz-state-manager.service';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styles: []
})
export class QuizPlayerComponent implements OnInit {

  // Données d'initialisation
  currentQuiz = QUIZZES[0];
  currentQuestion = this.currentQuiz.questions[0];
  currentAnswer = new Answer({ questionId: this.currentQuestion.id });
  currentAnswers: AnswersState = {};

  isStarted = false;  // quiz démarré ?

  constructor() { }

  ngOnInit() { }

  startQuiz() {
    this.isStarted = true;
  }

  gotoNextQuestion() {
    this.currentQuestion = this.currentQuiz.questions[1];
    this.currentAnswer = new Answer({ questionId: this.currentQuestion.id });
  }

  gotoPreviousQuestion() {}

  // Sauvegarde la réponse reçue de l'enfant
  saveAnswer(answer: Answer) {
    console.log('Réponse reçue de QuizQuestionComponent', answer);
  }

}
