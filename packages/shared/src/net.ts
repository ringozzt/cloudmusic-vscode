import type { IPCControl, IPCPlayer, IPCQueue, IPCWasm } from ".";
import type { NeteaseTypings } from "api";

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
  | IPCMsg<IPCPlayer.load>
  | IPCMsg<IPCPlayer.loaded>
  | IPCMsg<IPCPlayer.repeat, { r: boolean }>
  | IPCMsg<IPCQueue.add, { items: readonly unknown[]; index?: number }>
  | IPCMsg<IPCQueue.clear>
  | IPCMsg<IPCQueue.delete, { id: string | number }>
  | IPCMsg<IPCQueue.new, { items: readonly unknown[]; id?: number }>
  | IPCMsg<IPCQueue.play, { id: string | number }>
  | IPCMsg<IPCQueue.shift, { index: number }>;

export type IPCClientMsg =
  | IPCMsg<IPCControl.deleteCache, { key: string }>
  | IPCMsg<IPCControl.download, { url: string; path: string }>
  | IPCMsg<
      IPCControl.setting,
      { mq: number; cs: number; https: boolean; foreign: boolean }
    >
  | IPCMsg<IPCControl.lyric>
  | IPCMsg<IPCControl.music>
  | IPCMsg<IPCControl.netease>
  | IPCMsg<IPCControl.retain, { items?: readonly unknown[] }>
  | IPCMsg<IPCControl.pid, { pid?: string }>
  | IPCMsg<IPCPlayer.load, { url: string; local: true }>
  | IPCMsg<
      IPCPlayer.load,
      { item: NeteaseTypings.SongsItem; pid: number; next: number | undefined }
    >
  | IPCMsg<IPCPlayer.lyricDelay, { delay: number }>
  | IPCMsg<IPCPlayer.playing, { playing: boolean }>
  | IPCMsg<IPCPlayer.position, { pos: number }>
  | IPCMsg<IPCPlayer.stop>
  | IPCMsg<IPCPlayer.toggle>
  | IPCMsg<IPCPlayer.volume, { level: number }>
  | IPCMsg<IPCPlayer.speed, { speed: number }>
  | IPCMsg<IPCQueue.fm, { uid: number; is: boolean }>
  | IPCMsg<IPCQueue.fmNext>;

export type IPCServerMsg =
  | IPCMsg<IPCControl.master, { is?: true }>
  | IPCMsg<
      IPCControl.netease,
      {
        cookies: { uid: number; cookie: string }[];
        profiles: NeteaseTypings.Profile[];
      }
    >
  | IPCMsg<IPCControl.new>
  | IPCMsg<IPCControl.retain, { items: readonly unknown[] }>
  | IPCMsg<IPCPlayer.end, { fail?: true }>
  | IPCMsg<IPCPlayer.loaded>
  | IPCMsg<IPCPlayer.lyric, { lyric: NeteaseTypings.LyricData }>
  | IPCMsg<IPCPlayer.lyricIndex, { idx: number }>
  | IPCMsg<IPCPlayer.pause>
  | IPCMsg<IPCPlayer.play>
  | IPCMsg<IPCPlayer.stop>
  | IPCMsg<IPCPlayer.volume, { level: number }>
  | IPCMsg<IPCPlayer.next>
  | IPCMsg<IPCPlayer.previous>
  | IPCMsg<IPCPlayer.speed, { speed: number }>
  | IPCMsg<IPCQueue.fm, { is: boolean }>
  | IPCMsg<IPCQueue.fmNext, { item: NeteaseTypings.SongsItem }>
  | IPCMsg<IPCWasm.load, { path: string }>
  | IPCMsg<IPCWasm.pause>
  | IPCMsg<IPCWasm.play>
  | IPCMsg<IPCWasm.stop>
  | IPCMsg<IPCWasm.volume, { level: number }>
  | IPCMsg<IPCWasm.speed, { speed: number }>;
