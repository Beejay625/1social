export interface VestingSchedule {
  id: string;
  beneficiary: string;
  amount: string;
  startTime: number;
  cliff: number;
  duration: number;
  released: string;
}

export interface VestingRelease {
  id: string;
  scheduleId: string;
  amount: string;
  timestamp: number;
}


