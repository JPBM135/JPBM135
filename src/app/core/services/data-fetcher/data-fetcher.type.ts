import type { GatewayActivity, RESTGetAPIUserResult } from 'discord-api-types/v10';

export interface MetaData {
  projects: Project[];
  skills: string[];
}

export interface Project {
  date: string;
  description: string;
  github: string;
  image: string;
  localizations?: ProjectLocalization[];
  skills: string[];
  title: string;
  url?: string;
}

export interface ProjectLocalization {
  description: string;
  language: string;
  title: string;
}

export interface DiscordUser {
  avatar: string;
  avatar_decoration_data: null;
  bot: boolean;
  clan: null;
  discriminator: string;
  display_name: string;
  global_name: string;
  public_flags: number;
  username: string;
}

export interface SpotifyData {
  album: string;
  album_art_url: string;
  artist: string;
  end: number;
  song: string;
  start: number;
  track_id: string;
}

export interface Data {
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
  activities: GatewayActivity[];
  discord_status: 'dnd' | 'idle' | 'invisible' | 'offline' | 'online' | 'streaming';
  discord_user: RESTGetAPIUserResult;
  kv: Record<string, unknown>;
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

export interface DiscordProxyData {
  data: Data;
  success: boolean;
}
