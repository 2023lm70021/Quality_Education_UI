import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService, Video } from '../../services/video.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;

  constructor(private router: Router, private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getAllVideos().subscribe({
      next: (data) => this.videos = data,
      error: () => this.videos = []
    });
  }

  playVideo(video: Video) {
    console.log('playVideo called with:', video);
    this.selectedVideo = video;
  }

  closePlayer() {
    this.selectedVideo = null;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  getThumbnail(video: Video): string {
    // If you have a thumbnail property, use it. Otherwise, use a placeholder or generate from filePath
    return 'https://img.icons8.com/color/480/video-playlist.png';
  }

  getVideoUrl(video: Video): string {
    // Use the relative streaming API endpoint for Angular proxy
    return `/api/Video/stream/${video.videoId}`;
  }
}
