import { onMounted, onBeforeUnmount } from "vue";

export function useEventSource(url: string, onMessage: (data: any) => void) {
  let eventSource: EventSource | null = null;

  onMounted(() => {
    eventSource = new EventSource(url);

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
        console.log("check changes", data);
      } catch (error) {
        console.error("Failed", error);
      }
    };

    eventSource.onerror = (err: Event) => {
      console.error("error", err);
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  });

  onBeforeUnmount(() => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  });
}
