import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Quiz} from '../models/quiz';
import {Question} from '../models/question';
import {QuizSubmission} from '../models/quiz-submission';
import { Answer } from '../models/answer';

@Component({
  selector: 'app-quiz-nav',
  templateUrl: './quiz-nav.component.html',
  styles: []
})
export class QuizNavComponent {
  @Input() quiz: Quiz;           // Current quiz
  @Input() question: Question;   // Current question
  @Input() answers: any;         // All answers submitted so far, keyed by questionId
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() saveQuizSubmission = new EventEmitter<QuizSubmission>();

  get isFirstQuestion(): boolean {
    return this.quiz.questions.indexOf(this.question) === 0;
  }

  get isLastQuestion(): boolean {
    return this.quiz.questions.indexOf(this.question) === (this.quiz.questions.length-1);
  }

  get questionIndex(): number {
    return this.quiz.questions.indexOf(this.question) + 1;
  }

  // Calculate the live, current score.
  get currentScore(): number {
    let score = 0;
    for (const key in this.answers) {
      if (this.answers.hasOwnProperty(key)) {
        const answer = this.answers[key];
        const point: number = answer.isCorrect ? 1 : 0;
        score = score + point;
      }
    }
    return score;
    /*
    return Object.values(this.answers).reduce((acc: number, answer: Answer) => {
      const point: number = answer.isCorrect ? 1 : 0;
      return (acc + point);
    }, 0);
    */
  }

  get isNextButtonDisabled(): boolean {
    // Return true if the current question is NOT answered.
    return !this.answers[this.question.id];
  }

  // Emit the quiz submission.
  submitQuiz() {
    const quizSubmission = new QuizSubmission({
      quizId: this.quiz.id,
      answers: this.answers,
      score: this.currentScore
    });
    this.saveQuizSubmission.emit(quizSubmission);
  }
}
