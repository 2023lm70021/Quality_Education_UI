

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService, Video } from '../../services/video.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html', // <-- Use this
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pendingVideos: Video[] = [];

  constructor(private router: Router, private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getPendingVideos().subscribe({
      next: (videos) => this.pendingVideos = videos,
      error: () => this.pendingVideos = []
    });
  }

  approveVideo(videoId: number) {
    this.videoService.approveVideo(videoId).subscribe({
      next: () => {
        this.pendingVideos = this.pendingVideos.filter(v => v.videoId !== videoId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  rejectVideo(videoId: number) {
    this.videoService.rejectVideo(videoId).subscribe({
      next: () => {
        this.pendingVideos = this.pendingVideos.filter(v => v.videoId !== videoId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
