import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export class Candidate {
  name: string;
  index: number;
  constructor(name, index) {
    this.name = name;
    this.index = index;
  }
}

export interface Ballot {
  getWinners(validCandidates: Candidate[]): Candidate[];
  getWeight(): number;
}

export class OpaVoteBallot implements Ballot {
  weight: number;
  preferences: number[][];

  constructor(line: string) {
    const fields = line.split(" ");
    this.weight = parseInt(fields.splice(0, 1)[0], 10);
    const terminator = fields.splice(-1, 1)[0];
    if (terminator != "0") {
      throw `Invalid Ballot: ${line}`;
    }
    this.preferences = fields.map(field =>
      field.split("=").map(str => parseInt(str, 10))
    );
  }

  getWinners(validCandidates: Candidate[]): Candidate[] {
    const winners = [];
    const candidatesMap = new Map();
    for (const candidate of validCandidates) {
      candidatesMap.set(candidate.index, candidate);
    }
    for (const preference of this.preferences) {
      for (const index of preference) {
        const candidate = candidatesMap.get(index - 1);
        if (candidate) {
          winners.push(candidate);
        }
      }
      if (winners) {
        return winners;
      }
    }
    return [];
  }

  getWeight(): number {
    return this.weight;
  }
}

export class CivsBallot implements Ballot {
  ranks;
  constructor(line: string) {
    this.ranks = line.split(",").map(str => parseInt(str, 10));
  }

  getWinners(validCandidates: Candidate[]): Candidate[] {
    let bestRank = null;
    const winners = [];
    for (const candidate of validCandidates) {
      const rank = this.ranks[candidate.index];
      if (bestRank == null || bestRank > rank) {
        winners.length = 0;
        winners.push(candidate);
        bestRank = rank;
      } else if (bestRank == rank) {
        winners.push(candidate);
      }
    }
    return winners;
  }

  getWeight(): number {
    return 1;
  }
}

export class Round {
  remainingCandidates: Candidate[] = [];
  validCandidates: Candidate[] = [];
  winner: Candidate = null;
  eliminated: Candidate = null;
  scores: Map<Candidate, number> = new Map();
  constructor(validCandidates: Candidate[], ballots: Ballot[]) {
    this.validCandidates = validCandidates.slice();
    let validBallots = 0;
    for (const candidate of validCandidates) {
      this.scores.set(candidate, 0);
    }
    for (const ballot of ballots) {
      const winners = ballot.getWinners(validCandidates);
      if (winners) {
        const value = ballot.getWeight() / winners.length;
        for (const winner of winners) {
          const oldScore = this.scores.get(winner);
          this.scores.set(winner, oldScore + value);
        }
        validBallots += ballot.getWeight();
      }
    }
    let worstCandidates = [];
    let worstScore = null;
    for (let candidate of validCandidates) {
      const score = this.scores.get(candidate);
      if (score > validBallots / 2) {
        this.winner = candidate;
      }
      if (
        (worstScore == null || score < worstScore) &&
        candidate.name != "NOTA"
      ) {
        if (worstCandidates) {
          this.remainingCandidates = this.remainingCandidates.concat(
            worstCandidates
          );
        }
        worstCandidates = [candidate];
        worstScore = score;
      } else if (score == worstScore) {
        worstCandidates.push(candidate);
      } else {
        this.remainingCandidates.push(candidate);
      }
    }
    const randomIndex = Math.floor(Math.random() * worstCandidates.length);
    this.eliminated = worstCandidates.splice(randomIndex, 1)[0];
    this.remainingCandidates = this.remainingCandidates.concat(worstCandidates);
  }
}

export class Election {
  candidates: Candidate[] = [];
  ballots: Ballot[] = [];
  rounds: Round[] = [];
  winner: Candidate = null;
  title: string;
  constructor(filename: string, contents: string) {
    if (filename.endsWith(".csv")) {
      filename = filename.slice(0, -4);
    }
    this.title = filename;
    const lines = contents.trim().split("\n");
    this.candidates = lines[0]
      .split(",")
      .map((name, index) => new Candidate(name, index));
    this.ballots = lines.splice(1).map(line => new CivsBallot(line));
  }

  runElection() {
    let remainingCandidates = this.candidates.slice();
    while (this.winner == null && remainingCandidates.length > 0) {
      const round = new Round(remainingCandidates, this.ballots);
      this.rounds.push(round);
      remainingCandidates = round.remainingCandidates;
      this.winner = round.winner;
    }
  }
}

@Injectable()
export class ElectionService {
  private elections: Election[] = [];
  private electionsSubject: BehaviorSubject<Election[]> = new BehaviorSubject<
    Election[]
  >(this.elections);
  elections$: Observable<Election[]> = this.electionsSubject.asObservable();

  constructor() {}

  addElection(filename: string, contents: string) {
    const election = new Election(filename, contents);
    election.runElection();
    this.elections.push(election);
    this.electionsSubject.next(this.elections);
  }
}
