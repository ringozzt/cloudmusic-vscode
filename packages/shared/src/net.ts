import type { IPCEvent } from ".";
import type { NeteaseAPI } from "@cloudmusic/server";

export type CSMessage<T = undefined, U = number | string> = {
  channel: U;
  msg: T;
};

export type CSConnPool = Map<
  number | string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { resolve: (value?: any) => void; reject: (reason?: string) => void }
>;

export type IPCMsg<T = string, U = Record<never, never>> = { t: T } & U;

export type IPCBroadcastMsg =
  | IPCMsg<
      IPCEvent.Control$init,
      { repeat: boolean; like: number; playing: boolean }
    >
  | IPCMsg<IPCEvent.Control$login, { userId: number; nickname: string }>
  | IPCMsg<IPCEvent.Control$logout>
  | IPCMsg<IPCEvent.Play$load>
  | IPCMsg<IPCEvent.Play$repeat, { r: boolean }>
  | IPCMsg<IPCEvent.Queue$add, { items: unknown; index?: number }>
  | IPCMsg<IPCEvent.Queue$clear>
  | IPCMsg<IPCEvent.Queue$delete, { id: string | number }>
  | IPCMsg<IPCEvent.Queue$new, { items: unknown; id?: number }>
  | IPCMsg<IPCEvent.Queue$play, { id: string | number }>
  | IPCMsg<IPCEvent.Queue$random, { items: unknown }>
  | IPCMsg<IPCEvent.Queue$shift, { index: number }>
  | IPCMsg<IPCEvent.Queue$sort, { type: number; order: number }>;

export type IPCClientMsg =
  | IPCMsg<IPCEvent.Control$download, { url: string; path: string }>
  | IPCMsg<IPCEvent.Control$init, { mq: number; cs: number; volume: number }>
  | IPCMsg<IPCEvent.Control$lyric>
  | IPCMsg<IPCEvent.Control$music>
  | IPCMsg<IPCEvent.Play$load, { url: string; local: true }>
  | IPCMsg<IPCEvent.Play$load, { url: string; pid: number; local?: undefined }>
  | IPCMsg<IPCEvent.Play$stop>
  | IPCMsg<IPCEvent.Play$toggle>
  | IPCMsg<IPCEvent.Play$volume, { level: number }>;

export type IPCServerMsg =
  | IPCMsg<IPCEvent.Control$cookie, { cookie: string }>
  | IPCMsg<IPCEvent.Control$init, { repeat: boolean; like: boolean }>
  | IPCMsg<IPCEvent.Control$master, { is?: true }>
  | IPCMsg<IPCEvent.Control$new>
  | IPCMsg<IPCEvent.Play$end>
  | IPCMsg<IPCEvent.Play$load>
  | IPCMsg<IPCEvent.Play$pause>
  | IPCMsg<IPCEvent.Play$play>
  | IPCMsg<IPCEvent.Play$stop>
  | IPCMsg<IPCEvent.Play$volume, { level: number }>;

export type NeteaseAPIKey = keyof typeof NeteaseAPI;

export type NeteaseAPIParameters<T extends NeteaseAPIKey> = Parameters<
  typeof NeteaseAPI[T]
>;

export type NeteaseAPIReturn<
  T extends NeteaseAPIKey,
  R = ReturnType<typeof NeteaseAPI[T]>,
  U = R extends PromiseLike<infer U> ? U : R
> = U;

export type NeteaseAPICMsg<
  T extends NeteaseAPIKey,
  P = NeteaseAPIParameters<T>
> = IPCMsg<IPCEvent.Api$netease, CSMessage<{ i: T; p: P }>>;

export type NeteaseAPISMsg<T extends NeteaseAPIKey> = IPCMsg<
  IPCEvent.Api$netease,
  CSMessage<NeteaseAPIReturn<T>>
>;
