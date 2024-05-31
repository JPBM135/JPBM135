import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CDNRoutes, ImageFormat, type GatewayActivity } from 'discord-api-types/v10';
import type { DataFetcherService } from '../../core/services/data-fetcher/data-fetcher.service';

@Component({
  selector: 'app-discord-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, TranslateModule],
  templateUrl: './discord-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscordCardComponent {
  public static CDN_URL = 'https://cdn.discordapp.com';

  @Input({
    required: true,
  })
  public discordData!: DataFetcherService['discordProxyData'];

  public getActivityMediaUrl(activity: GatewayActivity) {
    if (!activity.assets?.large_image) {
      return;
    }

    if (activity.assets.large_image.startsWith('spotify')) {
      return `https://i.scdn.co/image/${activity.assets.large_image.split(':')[1]}`;
    }

    return (
      DiscordCardComponent.CDN_URL +
      CDNRoutes.applicationAsset(
        activity.application_id!,
        activity.assets!.large_image!,
        ImageFormat.PNG,
      )
    );
  }

  public getUserAvatarUrl(userId: string, avatarHash: string) {
    return DiscordCardComponent.CDN_URL + CDNRoutes.userAvatar(userId, avatarHash, ImageFormat.PNG);
  }

  public statusToIcon(status: string) {
    switch (status) {
      case 'dnd':
        return 'do_not_disturb';
      case 'idle':
        return 'history_toggle_off';
      case 'invisible':
        return 'visibility_off';
      case 'offline':
        return 'offline';
      case 'online':
        return 'check_circle';
      case 'streaming':
        return 'live_tv';
      default:
        return 'help';
    }
  }

  public resolveEmoji(emoji: GatewayActivity['emoji']) {
    if (!emoji) {
      return '';
    }

    if (emoji.id) {
      return (
        DiscordCardComponent.CDN_URL +
        CDNRoutes.emoji(emoji.id, emoji.animated ? ImageFormat.GIF : ImageFormat.PNG)
      );
    }

    return emoji.name;
  }
}
