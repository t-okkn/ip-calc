export type InitType   = QuestionSet | ErrorMessage;

export type NextType = QuestionSet |
                       SummaryCollection |
                       ErrorMessage;

export type ResumeType = ResumeSet | ErrorMessage;

export interface ErrorMessage {
  error:   string;
  message: string;
}

export interface QuestionSet {
  id:          string;
  q_number:    number;
  source:      string;
  cidr_bits:   number;
  subnet_mask: string;
}

export interface ResumeSet {
  id:          string;
  q_number:    number;
  source:      string;
  cidr_bits:   number;
  subnet_mask: string;
  elapsed:     number;
}

export interface SummaryCollection {
  id:     string;
  is_end: boolean;
  summary: SummarySet[];
}

export interface SummarySet {
  q_number:     number;
  source:       string;
  cidr_bits:    number;
  subnet_mask:  string;
  correct_nw:   string;
  answer_nw:    string;
  correct_bc:   string;
  answer_bc:    string;
  answered_sec: number;
}

export interface AnswerSet {
  nwaddr_1st: string
  nwaddr_2nd: string
  nwaddr_3rd: string
  nwaddr_4th: string
  bcaddr_1st: string
  bcaddr_2nd: string
  bcaddr_3rd: string
  bcaddr_4th: string
  elapsed:    string
}
