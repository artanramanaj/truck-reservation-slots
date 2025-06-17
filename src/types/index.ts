export interface Slot {
  id: number | string;
  start_time: string;
  end_time: string;
  category: "green" | "yellow" | "red";
  capacity: {
    current_capacity: number;
    max_capacity: number;
  };
}

export interface GroupedSlots {
  [date: string]: Slot[];
}

export interface SSEUpdate {
  id: number | string;
  currentCapacity: number;
  category: "green" | "yellow" | "red";
}
