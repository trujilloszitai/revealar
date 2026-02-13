declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string | string[];
      volume?: number;
      loop?: boolean;
      autoplay?: boolean;
      mute?: boolean;
      rate?: number;
      onload?: () => void;
      onloaderror?: (id: number, error: any) => void;
      onplay?: (id: number) => void;
      onend?: (id: number) => void;
      onpause?: (id: number) => void;
      onstop?: (id: number) => void;
    });
    play(spriteOrId?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    mute(muted?: boolean, id?: number): this | boolean;
    volume(volume?: number, id?: number): this | number;
    fade(from: number, to: number, duration: number, id?: number): this;
    rate(rate?: number, id?: number): this | number;
    seek(seek?: number, id?: number): this | number;
    loop(loop?: boolean, id?: number): this | boolean;
    state(): 'unloaded' | 'loading' | 'loaded';
    playing(id?: number): boolean;
    duration(id?: number): number;
    unload(): void;
    on(event: string, fn: (...args: any[]) => void, id?: number): this;
    off(event: string, fn?: (...args: any[]) => void, id?: number): this;
    once(event: string, fn: (...args: any[]) => void, id?: number): this;
  }
}

declare module 'aos' {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const aos: Aos;
  export default aos;
}

declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface ConfettiCannon {
    (options?: ConfettiOptions): Promise<null>;
    reset(): void;
  }

  const confetti: ConfettiCannon;
  export default confetti;
}
