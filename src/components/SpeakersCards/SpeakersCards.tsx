import { FocusCards } from "@/components/ui/focus-cards";

export function SpeakersCards() {
  const cards = [
    {
      title: "Persona 1",
      src: "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Persona 2",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Persona 3",
      src: "https://plus.unsplash.com/premium_photo-1705267936133-2235344e0d8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 4",
      src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 5",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Persona 6",
      src: "https://plus.unsplash.com/premium_photo-1689551671548-79ff30459d2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return <FocusCards cards={cards} />;
}
