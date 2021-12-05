export type InitType = QuestionSet |
                       ErrorMessage |
                       undefined;
export type NextType = QuestionSet |
                       SummaryCollection |
                       ErrorMessage |
                       undefined;
export type ResumeType = ResumeSet |
                         ErrorMessage |
                         undefined;

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
  q_umber:     number;
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
