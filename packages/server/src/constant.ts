import {
  ipcAppspace,
  ipcBroadcastServerId,
  ipcServerId,
} from "@cloudmusic/shared";
import { homedir } from "os";
import { resolve } from "path";

export const ipcServerPath =
  process.platform === "win32"
    ? `\\\\.\\pipe\\${`/tmp/${ipcAppspace}${ipcServerId}`
        .replace(/^\//, "")
        .replace(/\//g, "-")}`
    : `/tmp/${ipcAppspace}${ipcServerId}`;

export const ipcBroadcastServerPath =
  process.platform === "win32"
    ? `\\\\.\\pipe\\${`/tmp/${ipcAppspace}${ipcBroadcastServerId}`
        .replace(/^\//, "")
        .replace(/\//g, "-")}`
    : `/tmp/${ipcAppspace}${ipcBroadcastServerId}`;

export const SETTING_DIR =
  process.env["CM_SETTING_DIR"] || resolve(homedir(), ".cloudmusic");
export const TMP_DIR = resolve(SETTING_DIR, "tmp");
export const CACHE_DIR = resolve(SETTING_DIR, "cache");
export const MUSIC_CACHE_DIR = resolve(CACHE_DIR, "music");
export const LYRIC_CACHE_DIR = resolve(CACHE_DIR, "lyric");

export const RETAIN_FILE = resolve(SETTING_DIR, "retain");
